import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { getDB } from "../db/db.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const db = getDB();
    const user = await db.collection("users").findOne({ username });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return done(null, user);
      }
    }
    return done(null, false);
  })
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const db = getDB();
  const o_id = new ObjectId(id);
  const user = await db.collection("users").findOne({ _id: o_id });
  if (!user) {
    return done(null, false);
  }
  done(null, user);
});

export default passport;
