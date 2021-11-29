//henter express
const express = require('express');
const app = express();
app.use(express.json());

//middelware
app.use(express.static('public'))

//cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());


// Gør så nav bar skifter 
const {checkUser} = require('./logud')
app.get('*', checkUser)

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
const Varer = require('./Models/vare')



//connect til database på nettet
const dbURI = 'mongodb+srv://lucashunt:jsp35hqe@dga.obhbf.mongodb.net/acme?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
 .then((result) => app.listen(3000) )
 .catch((err) => console.log(err))



//kategorier
app.get('/', (req,res) =>{
    res.render('index');
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

//log ud

app.get('/logud', (req,res) =>{
    res.cookie('username', '', { maxAge: 1})
    res.redirect('/')
})





//cookies {maxAge: 1000*60*60*24} httpOnly, Secure = true, only https sikkert rapport
//login side - hvis flere har samme username så er der et problem...
app.post('/login', async (req,res) =>{
    const username = req.body.username
    const password = req.body.password

    Profile.findOne({username: username, password: password})
    .then(result =>{
        console.log(result)
        if(result){
        res.cookie('username', username)
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

    const cookies = req.cookies
//username skal være en variabel i stedet
Profile.findOne({username: cookies.username})
    .then(result =>{
        res.render('Profil', ({name: result.name , address: result.address , username: result.username , password: result.password}))
    })
        .catch((err) =>{
        console.log(err)
    })
    
})


app.get('/RedigerProfil', (req,res)=>{
    
    const cookies = req.cookies
    Profile.findOne({username: cookies.username})
        .then((result) =>{
            res.render('RedigerProfil', ({name: result.name , address: result.address , username: result.username , password: result.password}))
        })
        .catch((err) =>{
            console.log(err)
        })
})

app.delete('/RedigerProfil', (req,res) =>{
    const cookies = req.cookies

    Profile.findOneAndDelete({username: cookies.username})
        .then(result =>{
            res.json({redirect: '/logud'})
            
        })
        .catch((err) =>{
            console.log(err)
        })
})

app.post('/RedigerProfil', (req,res) =>{  
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name
    const address = req.body.address
    const cookies = req.cookies
    Profile.findOneAndUpdate(
        {username: cookies.username}, 
        {username: username, password: password, name: name, address: address})
        .then(result =>{
            res.cookie('username', username)
            res.redirect('/')
        })
        .catch((err) =>{
            console.log(err)
        })
})

app.get('/SeVarer', (req,res) =>{
    const cookies = req.cookies
    Varer.find({user: cookies.username})
        .then((result) =>{
            res.render('SeVarer', {varer: result})
        })
        .catch((err) =>{
            console.log(err);
        })
})

//Opret vare til mongodb

app.post('/Opretvare', (req,res) =>{
    const varer = new Varer(req.body)
    // .save gemmer til databasen then catch promise async
    varer.save()
        .then((result) =>{
            res.redirect('/')
        })
        .catch((err) =>{
            console.log(err);
        })
})


//måske løsning på at vise egne varer og alle varer at lave 2 databaser som den gemmer samtidigt til.

// Viser alle varer der ligger på mongodb under kategory biler
app.get('/biler', (req,res) =>{
    Varer.find({category: 1})
        .then((result) =>{
            res.render('biler', {varer: result})
        })
        .catch((err) =>{
            console.log(err);
        })
})


//viser enkelt vare
app.get('/biler/:id', (req,res)=>{
    const id = req.params.id;
    const cookies = req.cookies
    Varer.findById(id)
        .then(result => {
            res.cookie('id', id)
            res.render('vare', {vare: result})
        })
        .catch((err) =>{
            console.log(err)
        })
        
})



//slet enkelt vare
app.delete('/vare/:id', (req,res) =>{
    const id = req.params.id;
    Varer.findByIdAndDelete(id)
    .then(result =>{
        res.json({redirect: '/biler'})
        
    })
    .catch((err) =>{
        console.log(err)
    })
})

// Opdater vare 
app.post('/biler/:id', async (req,res) =>{  
    const cookies = req.cookies
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const price = req.body.price;

    Varer.findOneAndUpdate({_id: cookies.id}, {name: name, description: description, category: category, price: price})
    .then(result =>{
        res.redirect('/biler')
    })
    .catch((err) =>{
        console.log(err)
    })
})












 