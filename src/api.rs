use std::ops::Add;
use std::time::Duration;
use chrono::Utc;
use rocket::{get, post, State};
use rocket::http::Status;
use rocket::serde::json::Json;
use crate::storage::{DataStorage, User, UserSettings};

#[post("/api/home/<id>/cycles")]
pub async fn add_cycle(id: &str, storage: &State<DataStorage>) -> Status{
    let mut user = match storage.get_user(id){
        Some(user) => user,
        None => return Status::NotFound,
    };

    let now = Utc::now().naive_utc();

    if now < user.last_cycle_done.add(Duration::from_secs(user.user_settings.work_interval_duration as u64)){
        return Status::Forbidden; // Return forbidden if a cycle can't be finished already (to avoid simple manipulations)
    }

    let mut old_level = user.level;
    let level_ups = user.add_cycle();

    if level_ups > 0 {
        for _ in 0..level_ups{
            old_level += 1;
            user.generate_reward(old_level); // Generate reward for each newly reached level
        }
    }

    storage.update_user(user).unwrap();

    Status::Ok
}

#[get("/api/home/<id>")]
pub async fn get_home(id: &str, storage: &State<DataStorage>) -> Result<Json<User>, Status>{
    match storage.get_user(id){
        Some(user) => Ok(Json(user)),
        None => Err(Status::NotFound),
    }
}

#[post("/api/home/<id>/name", data = "<name>")]
pub async fn set_name(id: &str, name: &str, storage: &State<DataStorage>) -> Status{
    let mut user = match storage.get_user(id){
        Some(user) => user,
        None => return Status::NotFound,
    };

    user.name = Some(name.to_string());

    storage.update_user(user).unwrap();
    Status::Ok
}

#[post("/api/home/<id>/settings", data = "<settings>")]
pub async fn set_settings(id: &str, settings: Json<UserSettings>, storage: &State<DataStorage>) -> Status{
    let mut user = match storage.get_user(id){
        Some(user) => user,
        None => return Status::NotFound,
    };
    
    user.user_settings = settings.into_inner();
    
    storage.update_user(user).unwrap();
    Status::Ok
}