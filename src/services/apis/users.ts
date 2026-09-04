import { db } from "@/services/db/db";
import { User } from "@/types";
import * as bcrypt from "bcryptjs";


async function createUser(
  name: string,
  age: number,
  email: string,
  password: string,
) {

    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new Error("User already exists");
    }
    await db.runAsync(
        "INSERT INTO users (name, age, email, password) VALUES (?, ?, ?, ?)",
        [name, age, email, hashedPassword],
    );
}


async function getUserByEmail(email: string) {
  const result = await db.getFirstAsync<User>(
    "SELECT * FROM users WHERE email = ?",
    [email],
  );
  return result;
}

async function loginUser(email: string, password: string) {

    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return user;
    } else {
      throw new Error("Invalid email or password");
    }
}






export { createUser, getUserByEmail, loginUser };
