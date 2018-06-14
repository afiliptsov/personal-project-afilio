require("dotenv").config();

const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");

const session = require("express-session");
const passport = require("passport");

const { getUser, strat, logout } = require(`${__dirname}/controllers/authCtrl`);
const {
  getAllItems,
  createItem,
  getItem
} = require(`${__dirname}/controllers/itemCtrl`);
const {
  addImage,
  getImageByPostId
} = require(`${__dirname}/controllers/imageCtrl`);
const { addProfileInfo } = require(`${__dirname}/controllers/profileCtrl`);

const port = process.env.port || 3001;

const app = express();

//Massive is ORM Object Relational Mapper. Wrapper over database instance which gives tools to interact with it.
massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(console.log);

app.use(json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strat);

//serializeUser - Place where we decide how users object looks like.
passport.serializeUser((user, done) => {
  console.log(user);
  const db = app.get("db");
  db.getUserByAuthid([user.id])
    .then(response => {
      if (!response[0]) {
        db.addUserByAuthid([user.displayName, user.id, user.picture])
          .then(res => {
            // console.log(res);
            done(null, res[0]);
          })
          .catch(err => {
            console.log("err caught");
            console.log(err);
          });
      } else return done(null, response[0]);
    })
    .catch(err => console.log(err));
});

passport.deserializeUser((user, done) => done(null, user));

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/",
    failureRedirect: "/login"
  })
);

app.get("/api/me", getUser); //Method located at controllers/authCtrl

app.get("/logout", logout);

app.get("/api/item", getAllItems);

app.get("/api/item/:id", getItem);

app.put("/api/profile/:id", addProfileInfo);

app.post("/api/additem", createItem);

app.post("/api/addimage", addImage);

app.get("/api/getimage/:id", getImageByPostId);

//Just a Testing endpoint
// app.get("/api/test", (req, res, next) => {
//   res.status(200).json("Success");
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
