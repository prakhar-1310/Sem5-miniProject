const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");
const methodOverride = require('method-override');
const authRoutes = require("./routes/authRoutes");
const {v4:uuid}= require('uuid');
const path=require('path');
require("dotenv").config();

const app = express();
connectDB();


app.use(methodOverride('_method'));


var events = [
    {
        id : uuid(),
        Event : "Hackathon",
        des : "Date: 5/10/2025"
    },
    {
        id : uuid(),
        Event : "BootCamp",
        des : "Date: 10/10/2025"
    }
]

// Set EJS as view engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "campusconnectsecret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
     cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);


// student
app.get('/student/events',(req,res)=>{
  res.render('student/events',{events});
})
app.get('/event/:id/register', (req,res)=>{
    let {id} = req.params;
    let found = events.find(event => event.id === id);
    console.log(found);
    
    res.render('eventReg', {found});
})


// admin
app.get('/admin/events',(req,res)=>{
  res.render('admin/events',{events});
})

app.get('/event/:id/edit', (req,res)=>{
    let {id} = req.params;
    let found = events.find(event => event.id === id);
    res.render('admin/edit', {found});
})

app.patch('/event/:id', (req,res)=>{
    let {id} = req.params;
    let found = events.find(event => event.id === id);
    let {des} = req.body;
    found.des= des;
    res.redirect('/admin/events');
})

app.delete('/event/:id', (req,res)=>{
    let {id} = req.params;
    let newArray = events.filter(blog=> blog.id != id)
    events = newArray;
    res.redirect('/admin/events');
})


// Routes
app.use("/", authRoutes);

// Home redirect
// app.get("/", (req, res) => res.redirect("/landing"));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 5000}`);
});
