import * as PomodoroTimer from './PomodoroTimer'
import * as CatGenerator from './CatGenerator'
import * as Settings from './Settings'
import {User} from "./CatGenerator";

declare global{
    var data: User;
    var id: string;
    var time_left: number;
    var timer_end: number | null;
}

export async function start() {
    console.log("Starting");

    // Get last part of url
    globalThis.id = window.location.pathname.split('/').filter(Boolean).pop();

    if(!globalThis.id){
        return;
    }

    await CatGenerator.start();
    await PomodoroTimer.init();
    Settings.init();
}

window.addEventListener('DOMContentLoaded', async () => {
    await start();
})

