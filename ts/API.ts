import * as CatGenerator from "./CatGenerator";
import {UserSettings} from "./CatGenerator";

export async function fetch_saved_data(id: string){
    const response = await fetch(`/api/home/${id}/`);

    if(!response.ok){
        throw new Error(response.statusText);
    }

    return await response.json() as CatGenerator.User
}

export async function send_set_name(id: string, name: string){
    const response = await fetch(`/api/home/${id}/name`,{
        method: "POST",
        body: name
    });

    if(!response.ok){
        throw new Error(response.statusText);
    }
}

export async function add_finished_cycle(){
    const response = await fetch(`/api/home/${globalThis.id}/cycles`, {
        method: 'POST',
    });
    if(!response.ok){
        throw new Error(response.statusText);
    }else{
        await CatGenerator.show_tree();
    }
}

export async function update_user_settings(id: string, settings: UserSettings){
    const response = await fetch(`/api/home/${globalThis.id}/settings`, {
        method: 'POST',
        body: JSON.stringify(settings)
    });
    if(!response.ok){
        throw new Error(response.statusText);
    }
}