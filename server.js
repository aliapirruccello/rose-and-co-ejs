const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const { collection } = require("./models/Post");
const { ObjectId } = require("mongodb");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//OAuth authentications routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/spreadsheets.readonly'], accessType: 'offline', prompt: 'consent' }));
app.get('/auth/google/callback', passport.authenticate( 'google', {
  successRedirect: '/myclients',
  failureRedirect: '/authgoogle/failure'
}));

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

// //Setup Search capability from DB to find client 

// app.get("/search", async (request, response) => {
//   try {
//     let result = await collection.aggregate([
//       {
//         "$Search" : {
//           "autocomplete" : {
//             "query": `${request.query.query}`,
//             "path": "clientName",
//             "fuzzy": {
//               "maxEdits":2,
//               "prefixLength": 3
//             }
//           }
//         }
//       }
//     ]).toArray()
//     response.send(result)
//   } catch (error) {
//     response.status(500).send({message: error.message})
//   }
// })

//bring back data from the selection

// app.get("/get/:id", async (request, response) => {
//   try {
//     let result = await collection.findOne({
//       "_id" : ObjectId(request.params.id)
//     })
//     response.send(result)
//   } catch (error){
//     response.status(500).send({message: error.message})
//   }
// })

//SET GLOBAL VARIABLE
app.use(function(req, res, next){
  res.locals.user = req.user || null
  next()
})

const PORT = process.env.PORT || 3000

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT} mode on PORT ${PORT}`);
});
