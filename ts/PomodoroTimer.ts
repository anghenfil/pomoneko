import * as API from './API'
import * as Settings from './Settings'

const control_button_start = document.getElementById("pomodoro_timer_controls_start") as HTMLButtonElement;
const control_button_pause = document.getElementById("pomodoro_timer_controls_pause") as HTMLButtonElement;
const control_button_cancel = document.getElementById("pomodoro_timer_controls_cancel") as HTMLButtonElement;
const control_button_skip = document.getElementById("pomodoro_control_next_interval") as HTMLButtonElement;
const pomodoro_clock_minutes1 = document.getElementById("pomodoro_clock_minutes1") as HTMLElement;
const pomodoro_clock_minutes2 = document.getElementById("pomodoro_clock_minutes2") as HTMLElement;
const pomodoro_clock_seconds1 = document.getElementById("pomodoro_clock_seconds1") as HTMLElement;
const pomodoro_clock_seconds2 = document.getElementById("pomodoro_clock_seconds2") as HTMLElement;
const pomodoro_timer_status = document.getElementById("pomodoro_timer_status") as HTMLElement;
enum TimerStatus{
    Ready,
    Working,
    WorkingPaused,
    WorkingEnded,
    Pause,
    PausePaused,
    PauseEnded,
}

let work_cycles_done: number = 0;
let current_state : TimerStatus = TimerStatus.Ready;
let clock_interval: string | number | NodeJS.Timeout;

export async function init(){
    globalThis.time_left = globalThis.data.user_settings.work_interval_duration;
    await refresh_clock();
    add_listeners();
}

function add_listeners(){
    control_button_start.addEventListener("click", start);
    control_button_pause.addEventListener("click", pause);
    control_button_cancel.addEventListener("click", cancel);
    control_button_skip.addEventListener("click", skip);
}

/**
 *   Called when timer affecting settings got changed
 *   If currently in ready or break ended state refresh next interval time
 *   Do nothing if a work/break interval is currently running
 */
export async function refresh_clock_settings(){
    if(current_state == TimerStatus.Ready || current_state == TimerStatus.PauseEnded){
        time_left = globalThis.data.user_settings.work_interval_duration;
    }else if(current_state == TimerStatus.WorkingEnded){
        if(work_cycles_done < globalThis.data.user_settings.num_of_work_intervals_before_long_break){
            globalThis.time_left = globalThis.data.user_settings.short_break_duration;
        }else{
            globalThis.time_left = globalThis.data.user_settings.long_break_duration;
        }
    }
    await refresh_clock();
    refresh_current_phase();
}

async function start(){
    // Either start pause or next work cycle
    if(current_state == TimerStatus.Ready || current_state == TimerStatus.PauseEnded){
        // Start next work cycle
        current_state = TimerStatus.Working;
        await start_clock(globalThis.time_left);
    }else if(current_state == TimerStatus.WorkingEnded){
        // Start pause
        current_state = TimerStatus.Pause;
        await start_clock(globalThis.time_left);
    }else if(current_state == TimerStatus.WorkingPaused){
        // Unpause after pausing working state
        current_state = TimerStatus.Working;
        await start_clock(globalThis.time_left);
    }else if(current_state == TimerStatus.PausePaused){
        current_state = TimerStatus.Pause;
        await start_clock(globalThis.time_left);
    }
    control_button_start.classList.add("hide");
    control_button_cancel.classList.remove("hide");
    control_button_pause.classList.remove("hide");
    refresh_current_phase();
}

async function pause(){
    // Update status
    if(current_state == TimerStatus.Working){
        current_state = TimerStatus.WorkingPaused;
    }
    if(current_state == TimerStatus.Pause){
        current_state = TimerStatus.PausePaused;
    }
    // Stop clock:
    clearInterval(clock_interval);
    control_button_pause.classList.add("hide");
    control_button_start.classList.remove("hide");
    refresh_current_phase();
}

async function cancel(){
    clearInterval(clock_interval);

    if(current_state == TimerStatus.Working || current_state == TimerStatus.WorkingPaused){
        globalThis.time_left = globalThis.data.user_settings.work_interval_duration;
        current_state = TimerStatus.PauseEnded;
    }else{
        if(work_cycles_done < globalThis.data.user_settings.num_of_work_intervals_before_long_break){
            globalThis.time_left = globalThis.data.user_settings.short_break_duration;
        }else{
            globalThis.time_left = globalThis.data.user_settings.long_break_duration;
        }
        current_state = TimerStatus.WorkingEnded;
    }

    await refresh_clock();

    control_button_pause.classList.add("hide");
    control_button_start.classList.remove("hide");
    control_button_cancel.classList.add("hide");

    refresh_current_phase();
}

async function skip(){
    clearInterval(clock_interval);

    if(current_state == TimerStatus.Working || current_state == TimerStatus.WorkingPaused || current_state == TimerStatus.Ready || current_state == TimerStatus.PauseEnded || current_state == TimerStatus.PausePaused){
        work_cycles_done = work_cycles_done+1;
        if(work_cycles_done < globalThis.data.user_settings.num_of_work_intervals_before_long_break){
            globalThis.time_left = globalThis.data.user_settings.short_break_duration;
        }else{
            globalThis.time_left = globalThis.data.user_settings.long_break_duration;
        }
        current_state = TimerStatus.WorkingEnded;
    }else{
        if(work_cycles_done >= globalThis.data.user_settings.num_of_work_intervals_before_long_break){
            work_cycles_done = 0;
        }
        globalThis.time_left = globalThis.data.user_settings.work_interval_duration;
        current_state = TimerStatus.PauseEnded;
    }

    await refresh_clock();

    control_button_pause.classList.add("hide");
    control_button_start.classList.remove("hide");
    control_button_cancel.classList.add("hide");

    refresh_current_phase();
}

export async function refresh_clock(){
    let minutes = Math.floor(globalThis.time_left / 60); // e.g. 62/60 -> 1,03 -> 1
    let seconds = globalThis.time_left % 60;

    let minutes_digits = minutes.toString().split('').map(Number);
    let seconds_digits = seconds.toString().split('').map(Number);

    if(minutes_digits.length < 2){
        minutes_digits.unshift(0);
    }
    if(seconds_digits.length < 2){
        seconds_digits.unshift(0);
    }

    pomodoro_clock_minutes1.innerText = minutes_digits[0].toString();
    pomodoro_clock_minutes2.innerText = minutes_digits[1].toString();
    pomodoro_clock_seconds1.innerText = seconds_digits[0].toString();
    pomodoro_clock_seconds2.innerText = seconds_digits[1].toString();

    // Stop interval when timer has ended
    if(globalThis.time_left <= 0 && clock_interval){
        clearInterval(clock_interval);
        clock_interval = null;
        await finish_interval();
    }
}

function refresh_current_phase(){
    if(current_state == TimerStatus.Working || current_state == TimerStatus.WorkingPaused || current_state == TimerStatus.Ready || current_state == TimerStatus.PauseEnded){
        pomodoro_timer_status.innerText = "Current: Working Phase "+(work_cycles_done+1);
    }else{
        if(work_cycles_done < globalThis.data.user_settings.num_of_work_intervals_before_long_break){
            // Short pause
            pomodoro_timer_status.innerText = "Current: Short Break";
        }else{
            pomodoro_timer_status.innerText = "Current: Long Break";
        }
    }
}

async function start_clock(duration_in_seconds: number){
    globalThis.time_left = duration_in_seconds;
    globalThis.timer_end = Date.now()+(duration_in_seconds*1000);

    await refresh_clock();
    clock_interval = setInterval(function(){
        // Calculate seconds till timer_end
        let now = Date.now();
        globalThis.time_left = Math.round((globalThis.timer_end - now)/1000);
        refresh_clock();
    }, 500);
}

async function finish_interval(){
    if(current_state == TimerStatus.Working){
        work_cycles_done = work_cycles_done+1;
        current_state = TimerStatus.WorkingEnded;
        refresh_current_phase();

        if(work_cycles_done < globalThis.data.user_settings.num_of_work_intervals_before_long_break){
            globalThis.time_left = globalThis.data.user_settings.short_break_duration;
        }else{
            globalThis.time_left = globalThis.data.user_settings.long_break_duration;
        }

        notify("Work Interval finished! 🥳").then();

        await API.add_finished_cycle();
    }else if(current_state == TimerStatus.Pause){
        current_state = TimerStatus.PauseEnded;

        if(work_cycles_done >= globalThis.data.user_settings.num_of_work_intervals_before_long_break){
            work_cycles_done = 0;
        }

        notify("Break finished! 🥲").then();

        refresh_current_phase();

        globalThis.time_left = globalThis.data.user_settings.work_interval_duration;
    }


    await refresh_clock();

    control_button_cancel.classList.add("hide");
    control_button_start.classList.remove("hide");
    control_button_pause.classList.add("hide");
}

async function play_sound(){
    let audio = new Audio('/assets/sounds/bell1.mp3');
    await audio.play();
}

/**
 * Plays sound and/or shows notification if enabled in user settings
  */
async function notify(msg: string){
    if(globalThis.data.user_settings.play_sound) {
        play_sound().then();
    }

    if(!("Notification" in window)){
        console.log("You browser doesn't support notifications :(");
        return
    }

    if(Notification.permission !== "granted") {
        await setup_notifications();
    }
    if(globalThis.data.user_settings.notifications){
        let _ = new Notification("Pomoneko", {
            body: msg,
        });
    }
}

export async function setup_notifications(){
    if(Notification.permission !== "granted"){
        let res = await Notification.requestPermission();
        if(res !== "granted"){
            globalThis.data.user_settings.notifications = false;
            Settings.refresh_settings();
        }else{
            let not = new Notification("Pomoneko", {
                body: "Notifications for Pomoneko enabled!",
            });
        }
    }
}