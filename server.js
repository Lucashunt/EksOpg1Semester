//henter express
const express = require('express');
const app = express();
app.use(express.json());

//bruger mongoose og henter model.js
const mongoose = require('mongoose');
const Blog = require('./Models/model')



//connect til database på nettet
const dbURI = 'mongodb+srv://lucashunt:jsp35hqe@dga.obhbf.mongodb.net/acme?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
 .then((result) => app.listen(3000) )
 .catch((err) => console.log(err))


 //sender til databasen, og databasen sender tilbage
 app.get('/add-blog', (req,res) =>{
    const blog = new Blog({
        title: 'new blog 3',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });
    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) =>{
            console.log(err);
        });
 })

 //bruger find method til at sende alt fra databasen
 app.get('/all-blogs', (req,res) =>{
    Blog.find()
        .then((result) =>{
            res.send(result)
        })
        .catch((err) =>{
            console.log(err);
        });
    
 })
//bruger findById method til at finde en blog
app.get('/single-blog', (req,res) =>{
    Blog.findById('618974c119b1e9cd69da0efe')
        .then((result) =>{
            res.send(result)
        })
        .catch((err) =>{
            console.log(err)
        })
})

app.get('/blogs', (req,res) =>{
    Blog.find()
        .then((result) =>{

        })
        .catch((err) => {
            console.log(err);
        });
})