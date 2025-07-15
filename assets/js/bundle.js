/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/

// UNUSED EXPORTS: start

;// ./CatGenerator.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var character_name = document.getElementsByClassName("name")[0];
function start() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, show_tree()];
                case 1:
                    _a.sent();
                    character_name.addEventListener("click", edit_name_listener);
                    character_name.addEventListener("input", save_changed_name_listener);
                    return [2 /*return*/];
            }
        });
    });
}
function edit_name_listener() {
    character_name.contentEditable = "true";
}
function save_changed_name_listener() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Changed name to:" + character_name.innerText);
                    return [4 /*yield*/, send_set_name(globalThis.id, character_name.innerText)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function cat_variant_to_class_name(variant) {
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
var cat_tree_right = document.getElementsByClassName("cat_tree_right")[0];
var cat_tree_left = document.getElementsByClassName("cat_tree_left")[0];
var level_txt = document.getElementsByClassName("level")[0];
var xp_bar = document.getElementsByClassName("bar")[0];
function refresh_character_bar(user_data) {
    level_txt.innerText = "Level " + user_data.level.toString();
    var xp_needed_for_next_level = 100 * (Math.pow(user_data.level + 1, 1.1));
    var xp_percent = user_data.experience / xp_needed_for_next_level;
    var xp_bubbles_filled = Math.floor(xp_percent * 8);
    console.log("Percent: " + xp_percent + " XP Bubbles Filled:" + xp_bubbles_filled);
    xp_bar.style.backgroundImage = "url(\"/assets/img/levelbar" + xp_bubbles_filled + ".png\")";
    if (user_data.name) {
        character_name.innerText = user_data.name;
    }
    else {
        character_name.innerText = "Click to set a name";
    }
}
function show_tree() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, world_data, right, _i, _b, entry, new_cat_html;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = __webpack_require__.g;
                    return [4 /*yield*/, fetch_saved_data(globalThis.id)];
                case 1:
                    _a.data = _c.sent();
                    refresh_character_bar(__webpack_require__.g.data);
                    cat_tree_right.innerHTML = "";
                    cat_tree_left.innerHTML = "";
                    world_data = __webpack_require__.g.data.world_data[__webpack_require__.g.data.active_world];
                    if (world_data.Standard) {
                        right = false;
                        for (_i = 0, _b = world_data.Standard.cat_tree_entries; _i < _b.length; _i++) {
                            entry = _b[_i];
                            if (entry.CatEntry) {
                                new_cat_html = "<div class=\"cat_tree_plank\"><div class=\"cat" + entry.CatEntry.color + " " + cat_variant_to_class_name(entry.CatEntry.variant) + "\"></div></div>";
                                if (right) {
                                    cat_tree_right.innerHTML = new_cat_html + cat_tree_right.innerHTML;
                                }
                                else {
                                    cat_tree_left.innerHTML = new_cat_html + cat_tree_left.innerHTML;
                                }
                            }
                            right = !right;
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}

;// ./API.ts
var API_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var API_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

function fetch_saved_data(id) {
    return API_awaiter(this, void 0, void 0, function () {
        var response;
        return API_generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/home/".concat(id, "/"))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function send_set_name(id, name) {
    return API_awaiter(this, void 0, void 0, function () {
        var response;
        return API_generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/home/".concat(id, "/name"), {
                        method: "POST",
                        body: name
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function add_finished_cycle() {
    return API_awaiter(this, void 0, void 0, function () {
        var response;
        return API_generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/home/".concat(globalThis.id, "/cycles"), {
                        method: 'POST',
                    })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 2];
                    throw new Error(response.statusText);
                case 2: return [4 /*yield*/, show_tree()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function update_user_settings(id, settings) {
    return API_awaiter(this, void 0, void 0, function () {
        var response;
        return API_generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/home/".concat(globalThis.id, "/settings"), {
                        method: 'POST',
                        body: JSON.stringify(settings)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return [2 /*return*/];
            }
        });
    });
}

;// ./Settings.ts
var Settings_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Settings_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var work_interval_input = document.getElementById("settings_pomodoro_work_interval");
var short_break_interval_input = document.getElementById("settings_pomodoro_short_break_interval");
var long_break_interval_input = document.getElementById("settings_pomodoro_long_break_interval");
var num_of_work_intervals_input = document.getElementById("settings_pomodoro_num_of_intervals_before_long_break");
var save_btn = document.getElementById("settings_save");
var sound_on_btn = document.getElementById("settings_sound_on");
var sound_off_btn = document.getElementById("settings_sound_off");
var notifications_on_btn = document.getElementById("settings_notifications_on");
var notifications_off_btn = document.getElementById("settings_notifications_off");
function init() {
    refresh_settings();
    sound_on_btn.addEventListener("click", function () {
        return Settings_awaiter(this, void 0, void 0, function () {
            return Settings_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sound_on_btn.classList.add("hide");
                        sound_off_btn.classList.remove("hide");
                        __webpack_require__.g.data.user_settings.play_sound = false;
                        return [4 /*yield*/, update_user_settings(__webpack_require__.g.id, __webpack_require__.g.data.user_settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    sound_off_btn.addEventListener("click", function () {
        return Settings_awaiter(this, void 0, void 0, function () {
            return Settings_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sound_off_btn.classList.add("hide");
                        sound_on_btn.classList.remove("hide");
                        __webpack_require__.g.data.user_settings.play_sound = true;
                        return [4 /*yield*/, update_user_settings(__webpack_require__.g.id, __webpack_require__.g.data.user_settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    notifications_on_btn.addEventListener("click", function () {
        return Settings_awaiter(this, void 0, void 0, function () {
            return Settings_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        notifications_on_btn.classList.add("hide");
                        notifications_off_btn.classList.remove("hide");
                        __webpack_require__.g.data.user_settings.notifications = false;
                        return [4 /*yield*/, update_user_settings(__webpack_require__.g.id, __webpack_require__.g.data.user_settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    notifications_off_btn.addEventListener("click", function () {
        return Settings_awaiter(this, void 0, void 0, function () {
            return Settings_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        notifications_off_btn.classList.add("hide");
                        notifications_on_btn.classList.remove("hide");
                        __webpack_require__.g.data.user_settings.notifications = true;
                        setup_notifications().then(function (r) { });
                        return [4 /*yield*/, update_user_settings(__webpack_require__.g.id, __webpack_require__.g.data.user_settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    save_btn.addEventListener("click", update_settings_listeners);
}
function refresh_settings() {
    work_interval_input.value = (globalThis.data.user_settings.work_interval_duration / 60).toString();
    short_break_interval_input.value = (globalThis.data.user_settings.short_break_duration / 60).toString();
    long_break_interval_input.value = (globalThis.data.user_settings.long_break_duration / 60).toString();
    num_of_work_intervals_input.value = globalThis.data.user_settings.num_of_work_intervals_before_long_break.toString();
    if (!__webpack_require__.g.data.user_settings.play_sound) {
        sound_on_btn.classList.add("hide");
        sound_off_btn.classList.remove("hide");
    }
    if (!__webpack_require__.g.data.user_settings.notifications) {
        notifications_on_btn.classList.add("hide");
        notifications_off_btn.classList.remove("hide");
    }
}
function update_settings_listeners() {
    return Settings_awaiter(this, void 0, void 0, function () {
        return Settings_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    globalThis.data.user_settings.work_interval_duration = parseInt(work_interval_input.value) * 60;
                    globalThis.data.user_settings.long_break_duration = parseInt(long_break_interval_input.value) * 60;
                    globalThis.data.user_settings.short_break_duration = parseInt(short_break_interval_input.value) * 60;
                    globalThis.data.user_settings.num_of_work_intervals_before_long_break = parseInt(num_of_work_intervals_input.value);
                    if (isNaN(parseInt(work_interval_input.value)) || isNaN(parseInt(long_break_interval_input.value)) || isNaN(parseInt(short_break_interval_input.value)) || isNaN(parseInt(num_of_work_intervals_input.value))) {
                        alert("Please only input numbers :)");
                    }
                    if (parseInt(work_interval_input.value) <= 0 || parseInt(long_break_interval_input.value) <= 0 || parseInt(short_break_interval_input.value) <= 0 || parseInt(num_of_work_intervals_input.value) <= 0) {
                        alert("The intervals must be greater than 0!");
                    }
                    return [4 /*yield*/, update_user_settings(globalThis.id, globalThis.data.user_settings)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, refresh_clock_settings()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}

;// ./PomodoroTimer.ts
var PomodoroTimer_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var PomodoroTimer_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var control_button_start = document.getElementById("pomodoro_timer_controls_start");
var control_button_pause = document.getElementById("pomodoro_timer_controls_pause");
var control_button_cancel = document.getElementById("pomodoro_timer_controls_cancel");
var control_button_skip = document.getElementById("pomodoro_control_next_interval");
var pomodoro_clock_minutes1 = document.getElementById("pomodoro_clock_minutes1");
var pomodoro_clock_minutes2 = document.getElementById("pomodoro_clock_minutes2");
var pomodoro_clock_seconds1 = document.getElementById("pomodoro_clock_seconds1");
var pomodoro_clock_seconds2 = document.getElementById("pomodoro_clock_seconds2");
var pomodoro_timer_status = document.getElementById("pomodoro_timer_status");
var TimerStatus;
(function (TimerStatus) {
    TimerStatus[TimerStatus["Ready"] = 0] = "Ready";
    TimerStatus[TimerStatus["Working"] = 1] = "Working";
    TimerStatus[TimerStatus["WorkingPaused"] = 2] = "WorkingPaused";
    TimerStatus[TimerStatus["WorkingEnded"] = 3] = "WorkingEnded";
    TimerStatus[TimerStatus["Pause"] = 4] = "Pause";
    TimerStatus[TimerStatus["PausePaused"] = 5] = "PausePaused";
    TimerStatus[TimerStatus["PauseEnded"] = 6] = "PauseEnded";
})(TimerStatus || (TimerStatus = {}));
var work_cycles_done = 0;
var current_state = TimerStatus.Ready;
var clock_interval;
function PomodoroTimer_init() {
    return PomodoroTimer_awaiter(this, void 0, void 0, function () {
        return PomodoroTimer_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    globalThis.time_left = globalThis.data.user_settings.work_interval_duration;
                    return [4 /*yield*/, refresh_clock()];
                case 1:
                    _a.sent();
                    add_listeners();
                    return [2 /*return*/];
            }
        });
    });
}
function add_listeners() {
    control_button_start.addEventListener("click", PomodoroTimer_start);
    control_button_pause.addEventListener("click", pause);
    control_button_cancel.addEventListener("click", cancel);
    control_button_skip.addEventListener("click", skip);
}
/**
 *   Called when timer affecting settings got changed
 *   If currently in ready or break ended state refresh next interval time
 *   Do nothing if a work/break interval is currently running
 */
function refresh_clock_settings() {
    return PomodoroTimer_awaiter(this, void 0, void 0, function () {
        return PomodoroTimer_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (current_state == TimerStatus.Ready || current_state == TimerStatus.PauseEnded) {
                        time_left = globalThis.data.user_settings.work_interval_duration;
                    }
                    else if (current_state == TimerStatus.WorkingEnded) {
                        if (work_cycles_done < globalThis.data.user_settings.num_of_work_intervals_before_long_break) {
                            globalThis.time_left = globalThis.data.user_settings.short_break_duration;
                        }
                        else {
                            globalThis.time_left = globalThis.data.user_settings.long_break_duration;
                        }
                    }
                    return [4 /*yield*/, refresh_clock()];
                case 1:
                    _a.sent();
                    refresh_current_phase();
                    return [2 /*return*/];
            }
        });
    });
}
function PomodoroTimer_start() {
    return PomodoroTimer_awaiter(this, void 0, void 0, function () {
        return PomodoroTimer_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(current_state == TimerStatus.Ready || current_state == TimerStatus.PauseEnded)) return [3 /*break*/, 2];
                    // Start next work cycle
                    current_state = TimerStatus.Working;
                    return [4 /*yield*/, start_clock(globalThis.time_left)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 2:
                    if (!(current_state == TimerStatus.WorkingEnded)) return [3 /*break*/, 4];
                    // Start pause
                    current_state = TimerStatus.Pause;
                    return [4 /*yield*/, start_clock(globalThis.time_left)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 4:
                    if (!(current_state == TimerStatus.WorkingPaused)) return [3 /*break*/, 6];
                    // Unpause after pausing working state
                    current_state = TimerStatus.Working;
                    return [4 /*yield*/, start_clock(globalThis.time_left)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 6:
                    if (!(current_state == TimerStatus.PausePaused)) return [3 /*break*/, 8];
                    current_state = TimerStatus.Pause;
                    return [4 /*yield*/, start_clock(globalThis.time_left)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    control_button_start.classList.add("hide");
                    control_button_cancel.classList.remove("hide");
                    control_button_pause.classList.remove("hide");
                    refresh_current_phase();
                    return [2 /*return*/];
            }
        });
    });
}
function pause() {
    return PomodoroTimer_awaiter(this, void 0, void 0, function () {
        return PomodoroTimer_generator(this, function (_a) {
            // Update status
            if (current_state == TimerStatus.Working) {
                current_state = TimerStatus.WorkingPaused;
            }
            if (current_state == TimerStatus.Pause) {
                current_state = TimerStatus.PausePaused;
            }
            // Stop clock:
            clearInterval(clock_interval);
            control_button_pause.classList.add("hide");
            control_button_start.classList.remove("hide");
            refresh_current_phase();
            return [2 /*return*/];
        });
    });
}
function cancel() {
    return PomodoroTimer_awaiter(this, void 0, void 0, function () {
        return PomodoroTimer_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clearInterval(clock_interval);
                    if (current_state == TimerStatus.Working || current_state == TimerStatus.WorkingPaused) {
                        globalThis.time_left = globalThis.data.user_settings.work_interval_duration;
                        current_state = TimerStatus.PauseEnded;
                    }
                    else {
                        if (work_cycles_done < globalThis.data.user_settings.num_of_work_intervals_before_long_break) {
                            globalThis.time_left = globalThis.data.user_settings.short_break_duration;
                        }
                        else {
                            globalThis.time_left = globalThis.data.user_settings.long_break_duration;
                        }
                        current_state = TimerStatus.WorkingEnded;
                    }
                    return [4 /*yield*/, refresh_clock()];
                case 1:
                    _a.sent();
                    control_button_pause.classList.add("hide");
                    control_button_start.classList.remove("hide");
                    control_button_cancel.classList.add("hide");
                    refresh_current_phase();
                    return [2 /*return*/];
            }
        });
    });
}
function skip() {
    return PomodoroTimer_awaiter(this, void 0, void 0, function () {
        return PomodoroTimer_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clearInterval(clock_interval);
                    if (current_state == TimerStatus.Working || current_state == TimerStatus.WorkingPaused || current_state == TimerStatus.Ready || current_state == TimerStatus.PauseEnded || current_state == TimerStatus.PausePaused) {
                        work_cycles_done = work_cycles_done + 1;
                        if (work_cycles_done < globalThis.data.user_settings.num_of_work_intervals_before_long_break) {
                            globalThis.time_left = globalThis.data.user_settings.short_break_duration;
                        }
                        else {
                            globalThis.time_left = globalThis.data.user_settings.long_break_duration;
                        }
                        current_state = TimerStatus.WorkingEnded;
                    }
                    else {
                        if (work_cycles_done >= globalThis.data.user_settings.num_of_work_intervals_before_long_break) {
                            work_cycles_done = 0;
                        }
                        globalThis.time_left = globalThis.data.user_settings.work_interval_duration;
                        current_state = TimerStatus.PauseEnded;
                    }
                    return [4 /*yield*/, refresh_clock()];
                case 1:
                    _a.sent();
                    control_button_pause.classList.add("hide");
                    control_button_start.classList.remove("hide");
                    control_button_cancel.classList.add("hide");
                    refresh_current_phase();
                    return [2 /*return*/];
            }
        });
    });
}
function refresh_clock() {
    return PomodoroTimer_awaiter(this, void 0, void 0, function () {
        var minutes, seconds, minutes_digits, seconds_digits;
        return PomodoroTimer_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    minutes = Math.floor(globalThis.time_left / 60);
                    seconds = globalThis.time_left % 60;
                    minutes_digits = minutes.toString().split('').map(Number);
                    seconds_digits = seconds.toString().split('').map(Number);
                    if (minutes_digits.length < 2) {
                        minutes_digits.unshift(0);
                    }
                    if (seconds_digits.length < 2) {
                        seconds_digits.unshift(0);
                    }
                    pomodoro_clock_minutes1.innerText = minutes_digits[0].toString();
                    pomodoro_clock_minutes2.innerText = minutes_digits[1].toString();
                    pomodoro_clock_seconds1.innerText = seconds_digits[0].toString();
                    pomodoro_clock_seconds2.innerText = seconds_digits[1].toString();
                    if (!(globalThis.time_left <= 0 && clock_interval)) return [3 /*break*/, 2];
                    clearInterval(clock_interval);
                    clock_interval = null;
                    return [4 /*yield*/, finish_interval()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function refresh_current_phase() {
    if (current_state == TimerStatus.Working || current_state == TimerStatus.WorkingPaused || current_state == TimerStatus.Ready || current_state == TimerStatus.PauseEnded) {
        pomodoro_timer_status.innerText = "Current: Working Phase " + (work_cycles_done + 1);
    }
    else {
        if (work_cycles_done < globalThis.data.user_settings.num_of_work_intervals_before_long_break) {
            // Short pause
            pomodoro_timer_status.innerText = "Current: Short Break";
        }
        else {
            pomodoro_timer_status.innerText = "Current: Long Break";
        }
    }
}
function start_clock(duration_in_seconds) {
    return PomodoroTimer_awaiter(this, void 0, void 0, function () {
        return PomodoroTimer_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    globalThis.time_left = duration_in_seconds;
                    globalThis.timer_end = Date.now() + (duration_in_seconds * 1000);
                    return [4 /*yield*/, refresh_clock()];
                case 1:
                    _a.sent();
                    clock_interval = setInterval(function () {
                        // Calculate seconds till timer_end
                        var now = Date.now();
                        globalThis.time_left = Math.round((globalThis.timer_end - now) / 1000);
                        refresh_clock();
                    }, 500);
                    return [2 /*return*/];
            }
        });
    });
}
function finish_interval() {
    return PomodoroTimer_awaiter(this, void 0, void 0, function () {
        return PomodoroTimer_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(current_state == TimerStatus.Working)) return [3 /*break*/, 2];
                    work_cycles_done = work_cycles_done + 1;
                    current_state = TimerStatus.WorkingEnded;
                    refresh_current_phase();
                    if (work_cycles_done < globalThis.data.user_settings.num_of_work_intervals_before_long_break) {
                        globalThis.time_left = globalThis.data.user_settings.short_break_duration;
                    }
                    else {
                        globalThis.time_left = globalThis.data.user_settings.long_break_duration;
                    }
                    notify("Work Interval finished! 🥳").then();
                    return [4 /*yield*/, add_finished_cycle()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    if (current_state == TimerStatus.Pause) {
                        current_state = TimerStatus.PauseEnded;
                        if (work_cycles_done >= globalThis.data.user_settings.num_of_work_intervals_before_long_break) {
                            work_cycles_done = 0;
                        }
                        notify("Break finished! 🥲").then();
                        refresh_current_phase();
                        globalThis.time_left = globalThis.data.user_settings.work_interval_duration;
                    }
                    _a.label = 3;
                case 3: return [4 /*yield*/, refresh_clock()];
                case 4:
                    _a.sent();
                    control_button_cancel.classList.add("hide");
                    control_button_start.classList.remove("hide");
                    control_button_pause.classList.add("hide");
                    return [2 /*return*/];
            }
        });
    });
}
function play_sound() {
    return PomodoroTimer_awaiter(this, void 0, void 0, function () {
        var audio;
        return PomodoroTimer_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    audio = new Audio('/assets/sounds/bell1.mp3');
                    return [4 /*yield*/, audio.play()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Plays sound and/or shows notification if enabled in user settings
  */
function notify(msg) {
    return PomodoroTimer_awaiter(this, void 0, void 0, function () {
        var _;
        return PomodoroTimer_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (globalThis.data.user_settings.play_sound) {
                        play_sound().then();
                    }
                    if (!("Notification" in window)) {
                        console.log("You browser doesn't support notifications :(");
                        return [2 /*return*/];
                    }
                    if (!(Notification.permission !== "granted")) return [3 /*break*/, 2];
                    return [4 /*yield*/, setup_notifications()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (globalThis.data.user_settings.notifications) {
                        _ = new Notification("Pomoneko", {
                            body: msg,
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function setup_notifications() {
    return PomodoroTimer_awaiter(this, void 0, void 0, function () {
        var res, not;
        return PomodoroTimer_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(Notification.permission !== "granted")) return [3 /*break*/, 2];
                    return [4 /*yield*/, Notification.requestPermission()];
                case 1:
                    res = _a.sent();
                    if (res !== "granted") {
                        globalThis.data.user_settings.notifications = false;
                        refresh_settings();
                    }
                    else {
                        not = new Notification("Pomoneko", {
                            body: "Notifications for Pomoneko enabled!",
                        });
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}

;// ./Start.ts
var Start_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Start_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



function Start_start() {
    return Start_awaiter(this, void 0, void 0, function () {
        return Start_generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Starting");
                    // Get last part of url
                    globalThis.id = window.location.pathname.split('/').filter(Boolean).pop();
                    if (!globalThis.id) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, start()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, PomodoroTimer_init()];
                case 2:
                    _a.sent();
                    init();
                    return [2 /*return*/];
            }
        });
    });
}
window.addEventListener('DOMContentLoaded', function () { return Start_awaiter(void 0, void 0, void 0, function () {
    return Start_generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Start_start()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });

/******/ })()
;
//# sourceMappingURL=bundle.js.map