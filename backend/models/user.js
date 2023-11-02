import { getDB } from "../db/db";
import bcrypt from "bcryptjs";

export async function createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = { username, password: hashedPassword };
    const result = await getDB().collection("users").insertOne(user);
    return result;
}

export async function findUserByUsername(username) {
    return getDB().collection("users").findOne({ username });
}

export async function findUserById(id) {
    return getDB().collection("users").findOne({ _id: id });
}
