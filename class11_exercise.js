const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
/*
We will create an application where we will register people into an array. 
We will have a function that allows the host to check the registry to see all the user registered.
Use a for loop to go through all the users registered

This application also allows the host add users to the banned list and check them when they need to

CHALLENGE, when adding a user, if the user exist in the ban list, do not add the user
- hint, you will need a boolean to check... let checkBan = false...

CHALLENGE 2, use the settings to allow the adding the go through or not
*/


// Planning
// AddUserToRegistry() => Add: Adds a user to the registry (if banned and registration is disabled).
// CheckRegistry() => check: Check how many name in the registed list for(let i=0; i<users.length; i++)
// BanUser() => Adds a user to the banned list
// CheckBanned() => check banned names in to list 

// Challenge 
// let checkBans=banned.includes(_registry) => check if the user exists in the banned list
//  if(checkBans) => name is in the banned list now
// else => push , "name is registered"

//Challenge 2 
// Use settings.addRegistry => to enable or disable adding names 


let users = [];
let banned = [];
let settings = {
  addRegistry:true,
  checkRegistry:true,
  banPerson:true,
  checkBans:true
}

function AddUserToRegistry() {
      readline.question('What is the registry? ', _registry => {
        if(!settings.addRegistry) {
          console.log('Adding users is now disabled.');
          return StartApp();
        }
        let checkBans=banned.includes(_registry)
        if(checkBans){
          console.log(`${_registry} is in the banned list now!`);
        } else {
          users.push(_registry);
          console.log(`${_registry} is registered.`);
        }
        StartApp();
      })
}

function CheckRegistry() {
  console.log('How many names is in Registry list? ', users.length);
  for(let i=0; i<users.length; i++){
    console.log(`The user is ${users[i]}`);
  }
  StartApp();
  //loop through all the users and log them
}

function BanUser(){
  //use readline to prompt for the name of the user to be banned
      readline.question('What is the registry to be banned? ', _banned => {
          banned.push(_banned);
          console.log(`${_banned} is banned.`);
          StartApp();
      })
}

function CheckBanned(){
  console.log('How many names is in Banned list? ', banned.length);
  for(let i=0; i<banned.length; i++){
    console.log(`The banned user is ${banned[i]}`);
  }
  StartApp();
  //loop through all the banned users and log them
}



function StartApp() {
  readline.question("What would you like to do? ", (_command) => {
    
    //add other commands here to add

  
    if (_command === "quit") {
      readline.close();
    } else if(_command === "add"){
      AddUserToRegistry();
    } else if(_command === "check"){
      CheckRegistry();
    } else if(_command === "ban"){
      BanUser();
    } else if(_command === "check ban"){
      CheckBanned();
    } else if (_command === "switch"){
      settings.addRegistry=!settings.addRegistry;
      StartApp();
    } else {
      console.log("Unknown. Please try again !!!");
      StartApp();
    }
    
  });
}

StartApp();
