const express = require('express');
const hbs  = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
    });
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
    });

//Middle ware starts    
    
app.use(express.static(__dirname+ '/public'));
app.use((req,res,next)=>{
    var now = new Date().toString();
    var logInfo = `${now} : ${req.method} ${req.path}` ;
    fs.appendFile('server.log',logInfo + '\n', (err)=>{
        if(err){
            console.log('Unable to append to Server.log.')
        }
    });
    console.log(logInfo);
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintainence.hbs');
// });



//Middleware Ends

app.set('view engine','hbs');
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'Home Page Dynamic',
    
    welcomeMessage: 'Welcome to Home Page'
  });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page Dynamic'
    });
});

app.listen(port,()=>{
   console.log(`Server is up on the port ${port}`)
});