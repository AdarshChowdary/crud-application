import { query } from "express";
import { client } from "../db.js";

export const getAllUsers = async () => {
  try {
    const users = await client.query("SELECT * FROM users");
    return users.rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createAUser = async (userData) => {
  try {
    const { name, email, job, rate, isactive } = userData;

    const query =
      "INSERT INTO users (name, email, job, rate, isactive) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [name, email, job, rate, isactive];

    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateAUser = async (userData, id) => {
  try {
    const { name, email, job, rate, isactive } = userData;

    const query =
      "UPDATE users SET name = $1, email = $2, job = $3, rate = $4, isactive = $5 WHERE id = $6 RETURNING *";
    const values = [name, email, job, rate, isactive, id];

    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteAUser = async (id) => {
  try {
    const { rowCount } = await client.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);
    return rowCount > 0;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const getAUserById = async (id) => {
  try {
    const query = "SELECT * FROM users WHERE id = $1";
    const values = [id];

    const user = await client.query(query, values);
    // return user.rows[0] would return just the first user object.
    // We use [0] because:
    // 1. When querying by ID, we expect only one result
    // 2. If no user is found, rows[0] will be undefined, which is a good way to indicate "no user found"
    // Return null if no user found, otherwise return the user
    return user.rows.length ? user.rows[0] : null;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const searchUsers = async (searchParams) => {
  try {
    let query = "SELECT * FROM users WHERE 1=1";
    const values = [];
    let paramCount = 1;

    // Add search conditions based on provided parameters
    if (searchParams.id) {
      query += ` AND id = $${paramCount}`;
      values.push(parseInt(searchParams.id));
      paramCount++;
    }

    if (searchParams.name) {
      query += ` AND name ILIKE $${paramCount}`;
      values.push(`%${searchParams.name}%`);
      paramCount++;
    }

    if (searchParams.email) {
      query += ` AND email ILIKE $${paramCount}`;
      values.push(`%${searchParams.email}%`);
      paramCount++;
    }

    if (searchParams.job) {
      query += ` AND job ILIKE $${paramCount}`;
      values.push(`%${searchParams.job}%`);
      paramCount++;
    }

    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};
