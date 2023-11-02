import express from "express";
import passport from "../passport/passport.js";
import bcrypt from "bcryptjs";
import { getDB } from "../db/db.js";
import { ObjectId } from "mongodb";
const router = express.Router();

// ... (other routes)

router.post("/register", async (req, res) => {
  try {
    const db = getDB();
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const user = {
      username: req.body.username,
      password: hashedPassword,
    };
    const result = await db.collection("users").insertOne(user);
    res.status(201).send({ message: "User created successfully", result });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// User login route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    if (!user) {
      console.error("Authentication failed: Invalid username or password");
      return res.status(401).send("Unauthorized");
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }
      console.log("User login success");
      console.log(user);
      res.send("Successfully Authenticated");
    });
  })(req, res, next);
});

router.get("/user", (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

router.get("/auth", (req, res) => {
  if (req.isAuthenticated()) {
    // If the user is logged in, we'll send back some info about the user.
    res.status(200).json({
      success: true,
      message: "User is authenticated",
      user: req.user.username, // assuming 'user' is the object attached to the request session, and it contains 'username'
    });
  } else {
    // If the user is not authenticated, then respond with a message indicating so.
    res.status(401).json({
      success: false,
      message: "User is not authenticated",
    });
  }
});
router.get("/logout", function (req, res, next) {
  // Passport exposes a logout() method on req, that can be called from any route handler which needs to terminate a login session.
  // Invoking logout() will remove the req.user property and clear the login session (if any).
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("You need to sign in first");
}

// Route for adding a list (protected route)
router.post("/add-note", isAuthenticated, async (req, res) => {
  const db = getDB();
  const { title, description, date } = req.body;
  const userId = req.user._id.toString(); // Convert userId to a string
  console.log(`Received title: ${title}, description: ${description}`);
  console.log(`Received userId: ${userId}`);

  const newList = { userId, title, description, date: new Date(`${date}`) };
  const result = await db
    .collection("notes")
    .insertOne(newList)
    .then((result) => {
      res.status(201).send("List created");
    })
    .catch((error) => {
      res.status(500).send("List creation failed");
    });
});

// Route for getting the lists of the logged-in user (protected route)
router.get("/notes", isAuthenticated, async (req, res) => {
  const db = getDB();
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }

    const userId = req.user._id.toString();
    console.log(`User ID: ${userId}`);

    const userNotes = await db.collection("notes").find({ userId }).toArray();
    res.status(200).json(userNotes);
  } catch (error) {
    console.error("Error fetching user notes:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/notes/:noteId", isAuthenticated, async (req, res) => {
    const db = getDB();
    try {
      const noteId = new ObjectId(req.params.noteId);
      const userId = req.user._id.toString();
      
      const result = await db.collection("notes").findOneAndDelete({ _id: noteId, userId });
      if (result) {
        res.status(200).send("Note deleted successfully");
      } else {
        res.status(404).send("Note not found or unauthorized");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      res.status(500).send("Internal Server Error");
    }
  });
// ... (other routes as in your initial code)
router.put("/notes/:noteId", isAuthenticated, async (req, res) => {
    const db = getDB();
    try {
      const noteId = new ObjectId(req.params.noteId);
      const userId = req.user._id.toString();
      const { title, description } = req.body;
  
      const result = await db.collection("notes").findOneAndUpdate(
        { _id: noteId, userId },
        { $set: { title, description } },
        { returnOriginal: false }
      );
  
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("Note not found or unauthorized");
      }
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).send("Internal Server Error");
    }
  });
export default router;
