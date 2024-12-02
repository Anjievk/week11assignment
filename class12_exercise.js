const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  /*
We will create an application that lists arrays within an object as looping through objects are useful
We will use for (let key in obj)

This application will allow hosts to give add users to their chat server, assign roles through permissions that are true or untrue

CHALLENGE,
Make a function and command to turn all permissions off and all permissions on

CHALLENGE 2,
Using the role object, make commands to assign different roles by looping through the settings and assing the values of the chosen role 

  */

//Planning 
// 5 main functions: 
// createUsers() with _command === "create" =>  Adds a new user to the users list using the .push() function.
// assignRole() with _command === "assign role" => adding new role or assign with moderator, simple, coAdmin; add const of 6 settings
// listUsers() with _command === "list users" => show a list of all users with their roles.
// assignPermissions() with _command === "assign permissions"  => toggle individual permissions for a user 
// showPermissions() with _command === "show permissions" => show the role, and list of permissions for a user
// Challenge: create function toggleAllPermissions() with _command === "turn permissions" => Turn all permissions either on or off



let users = [];

// CHALLENGE 2: Roles and their default permissions
let role = {
  moderator: {
    darkMode: true,
    sensitivityAmount: false,
    editAccounts: true,
    deleteAccounts: false,
    createChannels: false,
    editChannels: true,
  },

  simple: {
    darkMode: true,
    sensitivityAmount: false,
    editAccounts: false,
    deleteAccounts: false,
    createChannels: false,
    editChannels: false,
  },

  coAdmin: {
    darkMode: true,
    sensitivityAmount: true,
    editAccounts: true,
    deleteAccounts: false,
    createChannels: true,
    editChannels: true,
  },
};

// Function to create users
function createUsers() {
  readline.question("What is the name of the user? ", (name) => {
    if (name) {
      users.push({ name: name, role: "simple", permissions: { ...role.simple } });
      console.log(`User '${name}' added to the chat server with the default 'simple' role.`);
    } else {
      console.log("User name cannot be empty!");
    }
    StartApp();
  });
}

// Function to assign roles
function assignRole() {
  readline.question("Enter the username to assign a role: ", (userName) => {
    const user = users.find((u) => u.name === userName);
    if (!user) {
      console.log(`User '${userName}' not found.`);
      return StartApp();
    }

    readline.question(
      "Enter the role to assign (moderator, simple, coAdmin, or type 'add' to create a new role): ",
      (roleName) => {
        if (role[roleName]) {
          user.role = roleName;
          user.permissions = { ...role[roleName] }; // Copy role's permissions
          console.log(`Role '${roleName}' assigned to '${userName}'.`);
          StartApp();
        } else if (roleName === "add") {
          readline.question("Enter the name of the new role: ", (newRole) => {
            if (role[newRole]) {
              console.log(`Role '${newRole}' already exists!`);
              StartApp();
            } else {
              role[newRole] = {
                darkMode: false,
                sensitivityAmount: false,
                editAccounts: false,
                deleteAccounts: false,
                createChannels: false,
                editChannels: false,
              };

              console.log(`Role '${newRole}' has been added successfully!`);
              console.log(`${newRole}:`, role[newRole]);
              StartApp();
            }
          });
        } else {
          console.log(`Role '${roleName}' does not exist.`);
          StartApp();
        }
      }
    );
  });
}

// Function to list users
function listUsers() {
  if (users.length === 0) {
    console.log("No users have been added.");
  } else {
    console.log("Current Users: ");
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} - Role: ${user.role}`);
    });
  }
  StartApp();
}

// Function to assign permissions
function assignPermissions() {
  readline.question("Enter the name of the user to modify permissions: ", (userName) => {
    const user = users.find((u) => u.name === userName);
    if (!user) {
      console.log(`User '${userName}' not found.`);
      return StartApp();
    }

    console.log("Current Permissions:");
    for (let key in user.permissions) {
      console.log(`${key}: ${user.permissions[key]}`);
}

function togglePermissions() {
  readline.question("Enter the permission to toggle (or type 'done' to finish): ", (permission) => {
    if (permission === "done") {
    return StartApp();
    } else if (user.permissions.hasOwnProperty(permission)) {
    user.permissions[permission] = !user.permissions[permission];
    console.log(`Permission '${permission}' toggled to ${user.permissions[permission]}.`);
    } else {
    console.log(`Permission '${permission}' does not exist.`);
    }
    togglePermissions();
    }
);
}

    togglePermissions();
  });
}

// Function to show all permissions
function showPermissions() {
  console.log("User Permissions:");
  users.forEach((user) => {
    console.log(`Name: ${user.name}, Role: ${user.role}`);
    for (let key in user.permissions) {
      console.log(`  ${key}: ${user.permissions[key]}`);
    }
  });
  StartApp();
}

// Function to toggle all permissions on/off
function toggleAllPermissions() {
  readline.question("Enter the username to modify all permissions: ", (userName) => {
    const user = users.find((u) => u.name === userName);
    if (!user) {
      console.log(`User '${userName}' not found.`);
      return StartApp();
    }

    readline.question("Turn all permissions (on/off): ", (toggle) => {
      const toggleValue = toggle.toLowerCase() === "on";
      for (let key in user.permissions) {
        user.permissions[key] = toggleValue;
      }
      console.log(`All permissions turned '${toggle}' for '${userName}'.`);
      StartApp();
    });
  });
}

// Start application loop
function StartApp() {
  readline.question("What would you like to do? ", (command) => {
    if (command === "create") {
      createUsers();
    } else if (command === "assign role") {
      assignRole();
    } else if (command === "list users") {
      listUsers();
    } else if (command === "assign permissions") {
      assignPermissions();
    } else if (command === "turn permissions") {
      toggleAllPermissions();
    } else if (command === "show permissions") {
      showPermissions();
    } else if (command === "quit") {
      readline.close();
    } else {
      console.log("Invalid command. Please try again.");
      StartApp();
    }
  });
}

StartApp();
