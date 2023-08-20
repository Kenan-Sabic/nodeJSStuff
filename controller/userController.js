import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export const getUsers = (req, res) => {
  console.log("Retreving all users");
  const db = fs.readFileSync("./db.json", "utf8");
  const { users } = JSON.parse(db);
  res.setHeader("Content-Type", "text/json");
  res.status(200).send("Users list: \n" + JSON.stringify(users));
  res.end();
};

export const getUserById = (req, res) => {
  console.log("Requested user - " + req.params.id);
  const user = req.body;
  const id = req.params.id;
  const db = fs.readFileSync("./db.json", "utf8");
  const parsedDb = JSON.parse(db);
  const index = parsedDb.users.findIndex((user) => user.id == id);
  res.setHeader("Content-Type", "text/json");
  if (index > -1) {
    console.log(parsedDb.users[index]);
    res
      .status(200)
      .send("Requested user data: \n" + JSON.stringify(parsedDb.users[index]));
    res.end();
  } else {
    console.log("User not found");
    res.status(404).send("User not found");
    res.end();
  }
};

export const createUser = (req, res) => {
  const db = fs.readFileSync("./db.json", "utf8");
  const parsedDb = JSON.parse(db);
  let user = req.body;
  user.id = uuidv4();

  if (parsedDb.users) {
    parsedDb?.users?.push(user);
  } else {
    parsedDb.users = [];
  }
  fs.writeFileSync("./db.json", JSON.stringify(parsedDb, null, "\t"));
  res.setHeader("Content-Type", "text/json");
  console.log("Added user");
  console.log(user);
  res.status(200).send("Added user " + JSON.stringify(user));
  res.end();
};

export const updateUser = (req, res) => {
  console.log("Requested user update for - " + req.params.id);
  const user = req.body;
  const id = req.params.id;

  const db = fs.readFileSync("./db.json", "utf8");
  const parsedDb = JSON.parse(db);

  const index = parsedDb.users.findIndex((user) => user.id == id);

  res.setHeader("Content-Type", "text/json");
  if (index > -1) {
    for (const [key, value] of Object.entries(user)) {
      parsedDb.users[index][key] = value;
    }
    res
      .status(200)
      .write("Updated user to - " + JSON.stringify(parsedDb.users[index]));
    res.end();

    fs.writeFileSync("./db.json", JSON.stringify(parsedDb, null, "\t"));
    console.log("Updated user to:");
    console.log(parsedDb.users[index]);
  } else {
    console.log("User not found");
    res.status(404).send("User not found");
    res.end();
  }
};

export const deleteUser = (req, res) => {
  console.log('Deleting user -' + req.params.id);
  
  const id = req.params.id;
  const db = fs.readFileSync("./db.json", "utf8");
  const parsedDb = JSON.parse(db);
  const index = parsedDb.users.findIndex((user) => user.id == id);

  res.setHeader("Content-Type", "text/json");

  if (index > -1) {
    parsedDb.users.splice(index, 1); 
    res.status(200).send("Successfully deleted user " + req.params.id);
    console.log("Successfully deleted user");
    res.end();
    fs.writeFileSync("./db.json", JSON.stringify(parsedDb, null, "\t"));
  } else {
    res.status(404).write('User not found');
    console.log('User not found');
    res.end()
  }
};

export const putUser = (req, res) => {
  const user = req.body;
  const id = req.params.id;

  const db = fs.readFileSync("./db.json", "utf8");
  const parsedDb = JSON.parse(db);

  const index = parsedDb.users.findIndex((user) => user.id == id);
  parsedDb.users[index] = user;

  fs.writeFileSync("./db.json", JSON.stringify(parsedDb, null, "\t"));

  res.setHeader("Content-Type", "text/json");

  console.log('Put user - ' + JSON.stringify(user));
  res.end('Put user - ' + JSON.stringify(user));
};
