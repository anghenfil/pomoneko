use rocket::{get, State};
use rocket::http::Status;
use rocket::response::Redirect;
use rocket_dyn_templates::Template;
use crate::storage::{DataStorage, User};

#[get("/")]
pub async fn welcome() -> Template{
    Template::render("welcome", ())
}

#[get("/imprint")]
pub async fn imprint() -> Template{
    Template::render("imprint", ())
}


/// Create a new user
#[get("/new")]
pub async fn new_user(data_storage: &State<DataStorage>) -> Redirect{
    let mut user: User;
    loop{
        user = User::new();
        if !data_storage.id_taken(&user.id){
            break;
        }
    }

    let id = user.id.clone();
    data_storage.add_user(user);
    
    Redirect::to(format!("/home/{}", id))
}

/// Show users home
#[get("/home/<id>")]
pub async fn home(id: String, data_storage: &State<DataStorage>) -> Result<Template, Status>{
    let user = match data_storage.get_user(&id){
        None => {
            return Err(Status::NotFound);
        }
        Some(user) => user,
    };
    
    Ok(Template::render("home", user))
}
