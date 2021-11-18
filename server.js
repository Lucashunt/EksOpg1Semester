//henter express
const express = require('express');
const app = express();
app.use(express.json());

//middelware
app.use(express.static('public'))

//ejs
app.set('view engine', 'ejs');
app.set('views', 'public')

//middleware takes all the urlencoded data that comes along and passes it into an obejct we can use in the .object body
app.use(express.urlencoded({ extended: true}));


//
app.use((req,res, next) =>{
    console.log('new request made');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    //fordi express ikke ved at det skal gå videre bruger vi next, så det går videre til next middelware
    next();
});

//bruger mongoose og henter model.js
const mongoose = require('mongoose');
const Profile = require('./Models/model')



//connect til database på nettet
const dbURI = 'mongodb+srv://lucashunt:jsp35hqe@dga.obhbf.mongodb.net/acme?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
 .then((result) => app.listen(3000) )
 .catch((err) => console.log(err))



//routes 
 app.get('/', (req,res) =>{
    res.redirect('/profiles');
})

//tager alle profiles for severen og viser på siden
app.get('/profiles', (req,res) =>{
    Profile.find().sort({username: -1})
        .then((result) =>{
            res.render('index', {title: 'all profiles', profiles: result})
        })
        .catch((err) =>{
            console.log(err);
        })
})

//tager det der bliver skrevet i form og gemmer på serveren
app.post('/profiles', (req,res) =>{
    const profile = new Profile(req.body)

    // .save gemmer til databasen then catch promise async
    profile.save()
        .then((result) =>{
            res.redirect('/')
        })
        .catch((err) =>{
            console.log(err);
        })
})

// noget med id
app.get('/profiles/:id', (req,res)=>{
    const id = req.params.id
    Profile.findById(id)
        .then((result) =>{
            res.render('details', ({profile: result, title: 'test'}))
        })
        .catch((err) =>{
            console.log(err)
        })
})

// slet

app.delete('/profiles/:id', (req,res) =>{
    const id = req.params.id;

    Profile.findByIdAndDelete(id)
        .then(result =>{
            res.json({redirect: '/profiles'})
            
        })
        .catch((err) =>{
            console.log(err)
        })
})

//kategorier
app.get('/biler', (req,res) =>{
        res.render('biler')
})
app.get('/cykler', (req,res) =>{
    res.render('cykler')
})
app.get('/Elektronik', (req,res) =>{
    res.render('Elektronik')
})
app.get('/clothes', (req,res) =>{
    res.render('clothes')
})

//andre sider
app.get('/seVarer', (req,res) =>{
    res.render('seVarer')
})


app.get('/Opretvare', (req,res) =>{
    res.render('Opretvare')
})
app.get('/Opretprofil', (req,res) =>{
    res.render('Opretprofil')
})

app.get('/ikkeLoggetInd', (req,res) =>{
    res.render('ikkeLoggetInd')
})
app.get('/login', (req,res) =>{
    res.render('login')
})

//poster ny profil til mongodb
app.post('/Opretprofil', (req,res) =>{
    console.log(req.body)
    const profile = new Profile(req.body)

    // .save gemmer til databasen then catch promise async
    profile.save()
        .then((result) =>{
            res.redirect('/')
        })
        .catch((err) =>{
            console.log(err);
        })
})

//login side
app.post('/login', async (req,res) =>{
    const username = req.body.username
    const password = req.body.password

    Profile.findOne({username: username, password: password})
    .then(result =>{
        console.log(result)
        if(result){
        res.redirect('/Profil')
        } else {
        res.redirect('/login')
        }
    })
    .catch((err) =>{
        console.log(err)
    })

})
app.get('/Profil', async (req,res) =>{

//username skal være en variabel i stedet
Profile.findOne({username: 'Lucas'})
    .then(result =>{
        res.render('Profil', ({name: result.name , address: result.address , username: result.username , password: result.password}))
    })
        .catch((err) =>{
        console.log(err)
    })
    
})

//id side
app.get('/RedigerProfil', async (req,res,next) =>{
    Profile.findOne({username: 'Lucas'})
    .then(result =>{
    res.render('RedigerProfil', ({ID: result._id}) )
    next()
})
    .catch((err) =>{
    console.log(err)
})
})
app.get('/RedigerProfil/:id', (req,res)=>{
    const id = req.params.id
    Profile.findById(id)
        .then((result) =>{
            res.render('RedigerProfil', ({ID: result._id, name: result.name , address: result.address , username: result.username , password: result.password}))
        })
        .catch((err) =>{
            console.log(err)
        })
})

app.delete('/RedigerProfil/:id', (req,res) =>{
    const id = req.params.id;

    Profile.findByIdAndDelete(id)
        .then(result =>{
            res.json({redirect: '/'})
            
        })
        .catch((err) =>{
            console.log(err)
        })
})

app.post('/RedigerProfil/:id', async (req,res) =>{  
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name
    const address = req.body.address
    Profile.findByIdAndUpdate(
        {_id: '6196a32371bc615562a45a83'}, 
        {username: username, password: password, name: name, address: address})
        .then(result =>{
            res.redirect('/Profil')
        })
        .catch((err) =>{
            console.log(err)
        })
})
//profil side

        
   /* .then((result) =>{
        res.redirect('/profil')
    })
    .catch((err) =>{
        console.log(err)
    })
     const password = Profile(req.body.password)

 const found = Profile.find({name: username, password: password})
 if (found){
     res.redirect('/Profil')
 } else {
     alert('forkerte oplysninger')
 }
    */





















 //sender til databasen, og databasen sender tilbage
 
 /*app.get('/login', (req,res) =>{
    const profile = new Profile({
        username: 'hunt',
        password: 'YES',
    });
    profile.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) =>{
            console.log(err);
        });
 })

 //bruger find method til at sende alt fra databasen
 app.get('/find-user', (req,res) =>{
    Profile.find({ username: 'hunt'})
    .then((result) =>{
        res.send(result)
    })
        .catch((err) =>{
            console.log(err);
        });
    
 })
//bruger findById method til at finde en blog
app.get('/test', (req,res) =>{
    Profile.find('lucasProfile')
        .then((result) =>{
            res.send(result)
        })
        .catch((err) =>{
            console.log(err)
        })
})

app.get('/blogs', (req,res) =>{
    Profile.find()
        .then((result) =>{

        })
        .catch((err) => {
            console.log(err);
        });
})
*/