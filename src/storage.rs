use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::sync::RwLock;
use chrono::{NaiveDateTime, Utc};
use rand::Rng;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug)]
pub struct DataStorage{
    users: RwLock<HashMap<String, User>>
}

const DATASTORAGE_PATH :&str = "data.json";

impl DataStorage{
    pub fn load_from_disk() -> DataStorage{
        let path = Path::new(DATASTORAGE_PATH);

        if !path.exists(){
            println!("Creating data storage at {}", DATASTORAGE_PATH);
            return DataStorage{
                users: Default::default(),
            }
        }else{
            println!("Loading data storage from {}", DATASTORAGE_PATH);
        }

        DataStorage{
            users: serde_json::from_reader(std::fs::File::open(path).unwrap()).unwrap()
        }
    }

    pub fn save_to_disk(&self){
        let path = PathBuf::from(DATASTORAGE_PATH);
        let data = self.users.read().unwrap().clone();
        rocket::tokio::task::spawn_blocking(move || {
            serde_json::to_writer(std::fs::File::create(&path).unwrap(), &data).unwrap();
        });
    }
    
    pub fn id_taken(&self, id: &str) -> bool{
        self.users.read().unwrap().contains_key(id)
    }

    pub fn add_user(&self, user: User){
        self.users.write().unwrap().insert(user.id.clone(),user);
        self.save_to_disk();
    }

    pub fn get_user(&self, id: &str) -> Option<User>{
        let read_guard = self.users.read().unwrap();
        if let Some(user) = read_guard.get(id) {
            Some(user.clone())
        }else{
            None
        }
    }
    
    pub fn update_user(&self, updated_user: User) -> Result<(), ()>{
        let mut write_guard = self.users.write().unwrap();
        if let Some(user) = write_guard.get_mut(&updated_user.id){
            *user = updated_user;
            drop(write_guard);
            self.save_to_disk();
            Ok(())
        }else{
            Err(())
        }
    }

    pub fn remove_user(&self, id: &str){
        self.users.write().unwrap().remove(id);
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct User{
    pub id: String,
    pub name: Option<String>,
    #[serde(default)]
    pub cycles_done: u32,
    #[serde(default)]
    pub level: u32,
    #[serde(default)]
    pub experience: u32,
    pub active_world: Uuid,
    pub world_data: HashMap<Uuid, World>,
    #[serde(default)]
    pub last_cycle_done: NaiveDateTime,
    #[serde(default)]
    pub user_settings: UserSettings,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum World{
    Standard(StandardWorld)
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct StandardWorld{
    pub cat_tree_entries: Vec<CatTreeEntry>
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum CatTreeEntry{
    CatEntry(Cat)
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Cat{
    pub color: u8,
    pub variant: CatVariant,
}

impl Cat{
    pub fn new_random() -> Cat{
        let mut rand = rand::rng();
        let color = rand.random_range(1..=6);
        let variant = rand.random_range(0..=12);
        Cat{
            color,
            variant: CatVariant::try_from(variant).unwrap(),
        }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum CatVariant{
    Sitting,
    Dancing1,
    Dancing2,
    Sleeping,
    Happy,
    Running,
    Jumping,
    Box1,
    Box2,
    Box3,
    Chilling,
    Surprised,
    Tickle
}

impl TryFrom<u8> for CatVariant{
    type Error = ();

    fn try_from(value: u8) -> Result<Self, Self::Error> {
        match value {
            0 => Ok(CatVariant::Sitting),
            1 => Ok(CatVariant::Dancing1),
            2 => Ok(CatVariant::Dancing2),
            3 => Ok(CatVariant::Sleeping),
            4 => Ok(CatVariant::Happy),
            5 => Ok(CatVariant::Running),
            6 => Ok(CatVariant::Jumping),
            7 => Ok(CatVariant::Box1),
            8 => Ok(CatVariant::Box2),
            9 => Ok(CatVariant::Box3),
            10 => Ok(CatVariant::Chilling),
            11 => Ok(CatVariant::Surprised),
            12 => Ok(CatVariant::Tickle),
            _ => Err(())
        }
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UserSettings{
    #[serde(default)]
    pub work_interval_duration: u16,
    #[serde(default)]
    pub short_break_duration: u16,
    #[serde(default)]
    pub long_break_duration: u16,
    #[serde(default)]
    pub num_of_work_intervals_before_long_break: u16,
    #[serde(default)]
    pub play_sound: bool,
    #[serde(default)]
    pub notifications: bool,
}

impl Default for UserSettings {
    fn default() -> Self {
        UserSettings{
            work_interval_duration: 1500,
            short_break_duration: 300,
            long_break_duration: 1800,
            num_of_work_intervals_before_long_break: 4,
            play_sound: true,
            notifications: false,
        }
    }
}

impl User{
    pub fn new() -> User{
        let mut world_data = HashMap::new();
        let standard_world_id = Uuid::new_v4();

        world_data.insert(standard_world_id, World::Standard(StandardWorld{ cat_tree_entries: vec![] }));

        User{
            id: Self::generate_id(),
            name: None,
            cycles_done: 0,
            level: 0,
            experience: 0,
            last_cycle_done: NaiveDateTime::default(),
            user_settings: Default::default(),
            world_data,
            active_world: standard_world_id,
        }
    }

    /// Adds another completed cycle and the earned xp
    /// Returns the number of level ups earned
    pub fn add_cycle(&mut self) -> u32{
        self.cycles_done += 1;
        self.add_xp()
    }

    const XP_GAIN: u16 = 100;

    /// Adds specified amount of xp to user, returning the number of level ups
    fn add_xp(&mut self) -> u32{
        self.experience = self.experience + Self::XP_GAIN as u32;
        let xp_needed_for_level_up = Self::calc_xp_for_level(self.level+1);
        println!("xp_needed_for_level_up: {}", xp_needed_for_level_up);
        println!("current xp: {}", self.experience);
        
        let mut level_ups = 0;
        loop {
            if self.experience >= xp_needed_for_level_up {
                self.experience = self.experience - xp_needed_for_level_up;
                self.level = self.level + 1;
                level_ups = level_ups+1;
            }else{
                break;
            }
        }

        self.last_cycle_done = Utc::now().naive_utc();

        level_ups
    }

    /// Calculates how many xp are needed to reach the provided level
    fn calc_xp_for_level(level: u32) -> u32{
        // needed XP = level^1,1
        ((Self::XP_GAIN as f32)*(level as f32).powf(1.1)) as u32
    }

    pub fn generate_reward(&mut self, new_level: u32){
       let world_data = match self.world_data.get_mut(&self.active_world){
           Some(world_data) => world_data,
           None => {
               eprintln!("Damaged world data for user {}", self.id);
               return;
           }
       };
       if let World::Standard(standard) = world_data{
           standard.cat_tree_entries.push(CatTreeEntry::CatEntry(Cat::new_random()))
       }
    }

    fn generate_id() -> String{
        let mut rng = rand::rng();

        const CHARSET: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZ\
                            abcdefghijklmnopqrstuvwxyz\
                            0123456789-._~";

        const ID_LEN: usize = 50;

        (0..ID_LEN).map(|_| {
            let num = rng.random_range(0..CHARSET.len());
            CHARSET[num] as char
        }).collect()
    }
}