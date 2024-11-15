import * as clientService from "../services/clientServices.js";

export const getUsers = async (req, res) => {
  try {
    const users = await clientService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsers controller:", error);
    res.status(500).json({ error: "Internal server error", status: 500 });
  }
};

export const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await clientService.createAUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error in createUser controller:", error);
    res.status(500).json({ error: "Internal server error", status: 500 });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userData = req.body;
    const userId = req.params.id;
    const updatedUser = await clientService.updateAUser(userData, userId);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found", status: 404 });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateUser controller:", error);
    res.status(500).json({ error: "Internal server error", status: 500 });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await clientService.deleteAUser(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found", status: 404 });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error("Error in deleteUser controller:", error);
    res.status(500).json({ error: "Internal server error", status: 500 });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.query.id;
    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID is required", status: 400 });
    }
    const user = await clientService.getAUserById(parseInt(userId));
    if (!user) {
      return res.status(404).json({ error: "User not found", status: 404 });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserById controller:", error);
    res.status(500).json({ error: "Internal server error", status: 500 });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const searchParams = {
      id: req.query.id,
      name: req.query.name,
      email: req.query.email,
      job: req.query.job,
    };

    // Check if at least one search parameter is provided
    if (!Object.values(searchParams).some((param) => param)) {
      return res.status(400).json({
        error:
          "At least one search parameter (id, name, email, or job) is required",
        status: 400,
      });
    }

    const users = await clientService.searchUsers(searchParams);

    if (users.length === 0) {
      return res.status(404).json({
        error: "No users found matching the criteria",
        status: 404,
      });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in searchUsers controller:", error);
    res.status(500).json({
      error: "Internal server error",
      status: 500,
    });
  }
};
