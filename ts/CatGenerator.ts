import * as API from './API';


let character_name = document.getElementsByClassName("name")[0] as HTMLElement;

export async function start(){
    await show_tree();
    character_name.addEventListener("click", edit_name_listener);
    character_name.addEventListener("input", save_changed_name_listener);
}

function edit_name_listener(){
    character_name.contentEditable = "true";
}

async function save_changed_name_listener(){
    console.log("Changed name to:"+character_name.innerText);
    await API.send_set_name(globalThis.id, character_name.innerText)
}

export interface UserSettings {
    work_interval_duration: number; // Rust: u16
    short_break_duration: number;
    long_break_duration: number;
    num_of_work_intervals_before_long_break: number;
    play_sound: boolean;
    notifications: boolean;
}

export interface User {
    id: string;
    name: string | null;
    cycles_done: number;
    level: number;
    experience: number;
    active_world: string;
    world_data: Record<string, World>; // Uuid → World, als string→World-Map
    last_cycle_done: string; // ISO-8601 Datumsstring
    user_settings: UserSettings;
}


// genau wie Serde (internally tagged enum)
export type World = { Standard: StandardWorld };

export interface StandardWorld {
    cat_tree_entries: CatTreeEntry[];
}

export type CatTreeEntry = { CatEntry: Cat };

export interface Cat {
    color: number;
    variant: CatVariant;
}

export type CatVariant =
    | "Sitting"
    | "Dancing1"
    | "Dancing2"
    | "Sleeping"
    | "Happy"
    | "Running"
    | "Jumping"
    | "Box1"
    | "Box2"
    | "Box3"
    | "Chilling"
    | "Surprised"
    | "Tickle";

function cat_variant_to_class_name(variant: CatVariant): string {
    switch (variant) {
        case "Sitting":
            return "cat-sitting";
        case "Dancing1":
            return "cat-dancing-1";
        case "Dancing2":
            return "cat-dancing-2";
        case "Sleeping":
            return "cat-sleeping";
        case "Happy":
            return "cat-happy";
        case "Running":
            return "cat-running";
        case "Jumping":
            return "cat-jumping";
        case "Box1":
            return "cat-box-1";
        case "Box2":
            return "cat-box-2";
        case "Box3":
            return "cat-box-3";
        case "Chilling":
            return "cat-chilling";
        case "Surprised":
            return "cat-surprised";
        case "Tickle":
            return "cat-tickle";
    }
}


let cat_tree_right = document.getElementsByClassName("cat_tree_right")[0] as HTMLElement;
let cat_tree_left = document.getElementsByClassName("cat_tree_left")[0] as HTMLElement;
let level_txt = document.getElementsByClassName("level")[0] as HTMLElement;
let xp_bar = document.getElementsByClassName("bar")[0] as HTMLElement;

function refresh_character_bar(user_data: User){
    level_txt.innerText = "Level "+user_data.level.toString();
    let xp_needed_for_next_level = 100*(Math.pow(user_data.level+1, 1.1));
    let xp_percent = user_data.experience/xp_needed_for_next_level;
    let xp_bubbles_filled = Math.floor(xp_percent*8);
    console.log("Percent: "+xp_percent+" XP Bubbles Filled:"+xp_bubbles_filled);
    xp_bar.style.backgroundImage = "url(\"/assets/img/levelbar"+xp_bubbles_filled+".png\")";
    if(user_data.name){
        character_name.innerText = user_data.name;
    }else{
        character_name.innerText = "Click to set a name";
    }
}

export async function show_tree(){
    global.data = await API.fetch_saved_data(globalThis.id);


    refresh_character_bar(global.data);

    cat_tree_right.innerHTML = "";
    cat_tree_left.innerHTML = "";

    let world_data = global.data.world_data[global.data.active_world];
    if(world_data.Standard){
        let right = false;
        for(let entry of world_data.Standard.cat_tree_entries){
            if(entry.CatEntry){
                let new_cat_html = "<div class=\"cat_tree_plank\"><div class=\"cat"+entry.CatEntry.color+" "+cat_variant_to_class_name(entry.CatEntry.variant)+"\"></div></div>"
                if(right) {
                    cat_tree_right.innerHTML = new_cat_html+cat_tree_right.innerHTML;
                }else{
                    cat_tree_left.innerHTML = new_cat_html+cat_tree_left.innerHTML;
                }
            }

            right = !right;
        }
    }
}