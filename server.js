const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Todo = require('./models/todoSchema');
const Question = require('./models/questionSchema');
const Video = require('./models/videoSchema');
const Article = require('./models/articleSchema');
const { Server } = require('http');

// Express setup
const app = express();
const PORT = process.env.PORT || 4000;

// ejs setup and dotenv setup
app.set("view engine", "ejs");
dotenv.config();

//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + 'styles'));

// Mongo
mongoose.connect(process.env.CONNECTIONSTRING, { useUnifiedTopology: true , useNewUrlParser: true })
    .then((result) => {
        console.log("db running") 

        app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

    }).catch((err) => console.log(err));
    

// Routes
//home page routes
app.get('/', (req, res) => {
    const tasks = Todo.find().sort({createdAt : -1 })
        .then((result) => {
            Question.find().sort({createdAt : -1 }).then(q => {
                res.render('home', {
                    title : 'Home',
                    todos : result,
                    questions : q
                });
            })
    }).catch((err) => console.log(err)); 
        
})

app.get('/delete/todo/:_id', (req, res) => {
    const { _id } = req.params;

    Todo.deleteOne({ _id })
        .then(() => {
            res.redirect('/')})
        .catch((err) => {
            console.log(err);
        })
})

app.get('/delete/question/:_id', (req, res) => {
    const { _id } = req.params;

    Question.deleteOne({ _id })
        .then(() => {
            res.redirect('/')})
        .catch((err) => {
            console.log(err);
        })
})

app.post('/todos', (req, res) => {
    const task = req.body.task;

    const todo = new Todo({
        task: task
    })

    todo.save()
        .then((result) => res.redirect('/'))
        .catch((err) => {
            console.log(err);
        })
})

app.post('/questions', (req, res) => {
    const questionInput = req.body.question;

    const question = new Question({
        question: questionInput
    })

    question.save()
        .then((result) => res.redirect('/'))
        .catch((err) => {
            console.log(err);
        })
})

//video routes
app.get('/videos', (req, res) => {
    Video.find().sort({createdAt : -1 })
        .then( result => {
            res.render('Videos', {
                title : 'Videos',
                vids : result
            })
        }).catch((err) => console.log(err)); 
})

app.post('/videos', (req, res) => {
    const vidTitle = req.body.vidTitle;
    const vidEmbed = req.body.vidEmbed;

    const vid = new Video({
        videoTitle : vidTitle,
        videoEmbed : vidEmbed
    })

    vid.save().then(() => res.redirect('/videos'))
        .catch((err) => {
        console.log(err);
    })
})

app.get('/delete/video/:_id', (req, res) => {
    const { _id } = req.params;
    console.log(req.params._id);

    Video.deleteOne({ _id })
        .then(() => {
            res.redirect('/videos')})
        .catch((err) => {
            console.log(err);
        })
})

//article routes
app.get('/articles', (req, res) => {
    Article.find().sort({createdAt : -1 })
    .then( result => {
        res.render('Articles', {
            title : 'Articles',
            article : result
        })
    }).catch((err) => console.log(err)); 
})

app.post('/articles', (req, res) => {
    const title = req.body.articleTitle;
    const link = req.body.articleURL;

    const article = new Article({
        articleTitle : title,
        articleURL : link
    })

    article.save().then(() => res.redirect('/articles'))
        .catch(err => console.log(err));
})

app.get('/articles/delete/:_id', (req, res) => {
    const id = req.params._id;

    Article.deleteOne({_id : id })
        .then(res.redirect('/articles'))
        .catch(err => console.log(err));
})




