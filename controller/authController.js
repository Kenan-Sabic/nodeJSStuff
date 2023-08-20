import express from "express";
import { SALT_ROUNDS, SECRET } from "../constants.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
    const { password, ...user } = req.body;

    let db = fs.readFileSync("./db.json", "utf-8");
    const parsedDb = JSON.parse(db);

    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const userToSave = {
            ...user,
            password: hashedPassword,
            id: uuidv4()
        }
        parsedDb.users.push(userToSave);

        fs.writeFileSync("./db.json", JSON.stringify(parsedDb, null, "\t"));
        res.setHeader("Content-Type", "text/json");
        console.log("Added user");
        console.log(userToSave);
        res.status(200).send("Added user " + JSON.stringify(user));
        res.end();
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};


export const logIn = async (req, res) => {
    const { email, password } = req.body;

    let db = fs.readFileSync("./db.json", "utf-8");
    const parsedDb = JSON.parse(db);

    const user = parsedDb.users.find((user) => user.email === email);
    console.log(user);
    console.log(password);

    const match = await bcrypt.compare(user.password, password);

    if (match) {
        const token = jwt.sign(
            {
                data: { id: user.id },
            }, SECRET, { expiresIn: '1h' })
        
        console.log(token);
        res.status(200).send(token);
    


} else {
    res.status(401).send('Login failed');
    }
  };

export const validate = (req, res) => {


    const token = req.body;

    try{
    const decoded = jwt.verify(token, SECRET);
    if (decoded){
        res.status(200).send('Valid token');
    }
    }
    catch (err) {
        res.status(401).send('Login failed');
    }

    console.log(decoded);





}