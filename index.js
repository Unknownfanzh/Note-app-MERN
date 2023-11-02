import express from "express";
import session from "express-session";
import path from "path";
import bodyParser from "body-parser";
import passport from "./passport/passport.js";
import { connectToDB } from "./db/db.js";
import router from "./routes/user-routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(
  session({
    key: "user-id",
    name: "yay-session",
    secret: "No secret",
    saveUninitialized: false,
    proxy: true,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "front", "dist")));
app.use('/api', router); 

(async () => {
    try {
      await connectToDB();
      app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error("Error initializing server:", error);
    }
  })();

