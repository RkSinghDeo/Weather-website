const express= require('express');
const path=require('path');
const hbs = require('hbs');
const { error } = require('console');
const geocode= require('./utils/geocode')
const forcast=require('./utils/forcast');

const app=express();
const port=process.env.PORT|| 3000
//define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public');
const veiwsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',veiwsPath)
hbs.registerPartials(partialsPath);
//setup static directory to server

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>
{res.render('index',{
        tittle: 'weather app',
        name:'Ramneek'
    })
})

app.get('/help',(req,res)=>
{

    res.render('help',{
        helpText:'helpful data',
        tittle: 'Help  page ',
        name:'Ramneek'
    })
    })

app.get('/about',(req,res)=>
    {
    
        res.render('about',{
            tittle: 'About page',
            name:'Ramneek'
        })
        })
app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send(
            {
                error: 'location not provided'
            }
        )
    }
const address=req.query.address;
if(!address)
{
    res.send(
        {
            error:'Address not provided'
        });
}
else
{
geocode(address,(error,gdata)=>
{
    if(error)
    {return res.send(
        {
            error:'Geocode not working'
        });
        }
    forcast(gdata.longitude,gdata.latitude,(error,data)=>
    {
        if(error)
        {return res.send(
            {
                error:'forcast did not processed'
            });
        }
        res.send({
            location:gdata.location,
            forcast:` ${data.discription} , current temprature-->${data.currentTemprature}  feels like-->${data.feelsLike}`,
            address:address,
          })
   // console.log(` ${gdata.location}-->  ${data.discription}  current temprature-->${data.currentTemprature}  feels like-->${data.feelsLike}`);
    })

});
}

   
})


app.get('/product',(req,res)=>
{
    if(!req.query.search)
    {
      return  res.send(
            {
                error:'you must provide search term'
            }
        )
    }
    console.log(req.query.search)
    res.send(
        {
            products : []
        } 

    )
})


app.get('/help/*',(req,res)=>{
    res.render('error',
        {
            errormessage:'PAGE NOT FOUND ',
            name:'ramneek',
             tittle:'404',
        }
    )
    })
app.get('*',(req,res)=>{
res.render('error',
{
    errormessage:' NOT FOUND IN HELP DOCUMENT ',
    name:'ramneek',
    tittle:'404'
})
})



app.listen(port,()=>{
console.log(`server is up on port ${port}.`)
})