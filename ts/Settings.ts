import * as API from './API'
import * as PomodoroTimer from "./PomodoroTimer";

let work_interval_input = document.getElementById("settings_pomodoro_work_interval") as HTMLInputElement;
let short_break_interval_input = document.getElementById("settings_pomodoro_short_break_interval") as HTMLInputElement;
let long_break_interval_input = document.getElementById("settings_pomodoro_long_break_interval") as HTMLInputElement;
let num_of_work_intervals_input = document.getElementById("settings_pomodoro_num_of_intervals_before_long_break") as HTMLInputElement;
let save_btn = document.getElementById("settings_save") as HTMLElement;
let sound_on_btn = document.getElementById("settings_sound_on") as HTMLButtonElement;
let sound_off_btn = document.getElementById("settings_sound_off") as HTMLButtonElement;
let notifications_on_btn = document.getElementById("settings_notifications_on") as HTMLButtonElement;
let notifications_off_btn = document.getElementById("settings_notifications_off") as HTMLButtonElement;

export function init(){
    refresh_settings();
    sound_on_btn.addEventListener("click", async function(){
        sound_on_btn.classList.add("hide");
        sound_off_btn.classList.remove("hide");
        global.data.user_settings.play_sound = false;
        await API.update_user_settings(global.id, global.data.user_settings);
    });
    sound_off_btn.addEventListener("click", async function(){
        sound_off_btn.classList.add("hide");
        sound_on_btn.classList.remove("hide");
        global.data.user_settings.play_sound = true;
        await API.update_user_settings(global.id, global.data.user_settings);
    });
    notifications_on_btn.addEventListener("click", async function(){
        notifications_on_btn.classList.add("hide");
        notifications_off_btn.classList.remove("hide");
        global.data.user_settings.notifications = false;
        await API.update_user_settings(global.id, global.data.user_settings);
    });
    notifications_off_btn.addEventListener("click", async function(){
        notifications_off_btn.classList.add("hide");
        notifications_on_btn.classList.remove("hide");
        global.data.user_settings.notifications = true;
        PomodoroTimer.setup_notifications().then(r => {});
        await API.update_user_settings(global.id, global.data.user_settings);
    })
    save_btn.addEventListener("click", update_settings_listeners);
}

export function refresh_settings(){
    work_interval_input.value = (globalThis.data.user_settings.work_interval_duration/60).toString();
    short_break_interval_input.value = (globalThis.data.user_settings.short_break_duration/60).toString();
    long_break_interval_input.value = (globalThis.data.user_settings.long_break_duration/60).toString();
    num_of_work_intervals_input.value = globalThis.data.user_settings.num_of_work_intervals_before_long_break.toString();
    if(!global.data.user_settings.play_sound){
        sound_on_btn.classList.add("hide");
        sound_off_btn.classList.remove("hide");
    }
    if(!global.data.user_settings.notifications){
        notifications_on_btn.classList.add("hide");
        notifications_off_btn.classList.remove("hide");
    }
}

async function update_settings_listeners(){
    globalThis.data.user_settings.work_interval_duration = parseInt(work_interval_input.value)*60;
    globalThis.data.user_settings.long_break_duration = parseInt(long_break_interval_input.value)*60;
    globalThis.data.user_settings.short_break_duration = parseInt(short_break_interval_input.value)*60;
    globalThis.data.user_settings.num_of_work_intervals_before_long_break = parseInt(num_of_work_intervals_input.value);

    if(isNaN(parseInt(work_interval_input.value)) || isNaN(parseInt(long_break_interval_input.value)) || isNaN(parseInt(short_break_interval_input.value)) || isNaN(parseInt(num_of_work_intervals_input.value))){
        alert("Please only input numbers :)");
    }
    if(parseInt(work_interval_input.value)  <= 0 || parseInt(long_break_interval_input.value)  <= 0 || parseInt(short_break_interval_input.value) <= 0 || parseInt(num_of_work_intervals_input.value) <= 0){
        alert("The intervals must be greater than 0!");
    }
    await API.update_user_settings(globalThis.id, globalThis.data.user_settings);
    
    await PomodoroTimer.refresh_clock_settings();
}