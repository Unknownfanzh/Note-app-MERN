import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "./passport/passport.js";
import { connectToDB } from "./db/db.js";
import router from "./routes/user-routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
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
app.use(router);

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

