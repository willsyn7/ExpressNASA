const express = require('express')
const app = express();
const PORT = 8080;
const path = require(`path`);
const body = require('body-parser')
app.get('/',function(req,res) {
    return res.send((__path.resolve(__dirname,`../Front/index.html`)))
})

ap.get('/app/asteroid',(req,res,next){
    return res.send(())

})



app.get('/style.css',function(req,res){
    return res.send(__path.resolve(__dirname,`../Front/src/App.css`))
})

app.get('/scirpt.ts',function(req,res){
    return res(__path.resolve(__dirname, '../Front/src/App.tsx'))
})

app.listen(PORT, function(){
    return res.send(`${PORT} is listening on`)
})

