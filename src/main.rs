#![feature(duration_constructors_lite)]

use rocket::{launch, routes};
use rocket::fs::FileServer;
use rocket_dyn_templates::Template;
use crate::storage::DataStorage;

pub mod start;
pub mod storage;
pub mod api;
#[launch]
fn rocket() -> _ {
    let data_storage = DataStorage::load_from_disk();
    
    rocket::build()
        .attach(Template::fairing())
        .manage(data_storage)
        .mount("/assets", FileServer::from("assets"))
        .mount("/", routes![start::welcome, start::home, start::new_user, api::get_home, api::add_cycle, api::set_name, api::set_settings, start::imprint])
}
