require("dotenv").config(); // FIX: load env
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const helmet = require("helmet");
const AllRouters = require("./routes/app");
const { passportInit } = require("./passport.config");
const { notFoundError, errorHandler } = require("./err-handling");

const app = express();

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/passport-js")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => {
    console.error("mongo connection failed:", err);
    process.exit(1);
  });

// FIX: security headers
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// FIX: real session store instead of MemoryStore
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        process.env.MONGO_URI || "mongodb://localhost:27017/passport-js",
      ttl: 24 * 60 * 60, // 1 day
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// FIX: expose passport to routes (used in auth.routes.js)
app.locals.passport = passport;

app.use(AllRouters());

app.use(notFoundError);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // FIX: backticks
  console.log(`listening on port ${PORT}`);
});
