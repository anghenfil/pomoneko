fn main(){
    let res1 = std::process::Command::new("npm")
        .args(&["--prefix", "ts", "run", "build"])
        .output()
        .expect("Failed to compile typescript to javascript with npm run build");

    println!("{} {}", std::str::from_utf8(&res1.stdout).unwrap(), std::str::from_utf8(&res1.stderr).unwrap());
    println!("cargo:rerun-if-changed=ts");
}