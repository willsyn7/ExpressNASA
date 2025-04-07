const express = require('express')
require('dotenv').config({ path: '../../.env' });
const app = express();
const PORT = 8080;
const path = require(`path`);
const bodyParser = require('body-parser'); // Rename to bodyParser
app.use(bodyParser.json());
const dataRoutes = require('./routes/dataroutes');

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json())

app.get('/',function(req,res) {
    return res.send((__path.resolve(__dirname,`../Front/index.html`)))
})

app.use('/dataroutes',dataRoutes)
console.log('NASA_API_KEY:', process.env.NASA_API_KEY);


app.get('/style.css',function(req,res){
    return res.send(__path.resolve(__dirname,`../Front/src/App.css`))
})

app.get('/scirpt.ts',function(req,res){
    return res(__path.resolve(__dirname, '../Front/src/App.tsx'))
})

app.get((req,res,next)=> {
    return res.status(404).send(`Error Code 400`)
})
app.use((err,req,res,next) =>{
    const defaulterror = {
        log : 'Global Error Handler',
        status : 500,
        message : {
            err : `Reached Global Error Handler`
        },

    };
    const errorObj = Object.assign({},defaulterror,err);
    return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, function(){
    console.log(`${PORT} is listening on`)
})

