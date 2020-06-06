const path =require('path');
const express = require('express');
const hbs = require('hbs');
const port = 3000;
const herokuPort = process.env.PORT ||3000;
const getCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');


const publicPath = (path.join(__dirname,'../public'));
const viewPath = (path.join(__dirname,'../templates/views'));
const partialsPath = (path.join(__dirname,'../templates/partials'));
const app = express();

hbs.registerPartials(partialsPath);
app.set('view engine','hbs');
app.set('views', viewPath)

//to serve the static files
app.use(express.static(publicPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Siddhnat Gelye',
        name:'Siddhu gelye  dveloper '
    });
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'The Indian ',
        name:'Sidhant Gelye'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:"You need help we are here "
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must enter the address'
        })
    }
    else{
        getCode((req.query.address),(error, {longitude,latitude,location} = { } )=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            else{
                forecast(latitude ,longitude, (error,d)=>{
                    if(error){
                        return res.send({
                            error:error
                        })
                    }
                    else{
                        const {temperature,feelslike} = d;
                        return res.send({
                            latitude:latitude,
                            longitude:longitude,
                            temperature:temperature,
                            location:location,
                            feelslike:feelslike
                        })
                        // console.log(`longitude=${longitude} latitude =${latitude}`)
                        // console.log(`${d.weather_descriptions[0]} here  is ${d.temperature } deg C outside  and feels like ${d.feelslike} deg C in ${location} `);
                    }
                })
            }
        })
    }
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must enter the search Query'
        })
    }
    else{
        console.log(req.query.search)
        res.send({
            products:[]
        })
    }
    
})

app.get('/help/*',(req,res)=>{
    res.render('helpError');
})

app.get('*',(req,res)=>{
    res.render('Error');
})

app.listen(herokuPort, ()=>console.log(`Example port listening at https://localhost:${herokuPort}`));

