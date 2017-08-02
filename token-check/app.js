/**
 * Created by xiaoxiaosu on 17/8/2.
 */


const url = require("url");

const express =require('express')
const sha1= require('sha1')

const app = express()

app.get('/',function (req, res) {
    const data = req.query

    const token = 'xiaoxiaosu'


    if(Object.keys(data).length == 0){
        return res.send('oh this is a handle view')
    }

    var code = sha1([token,data.timestamp,data.nonce].sort().join(''))
    console.log(data.signature,':',code)

    if(data.signature == code){
        return res.send(data.echostr)
    }

    return res.send('failed')


})

app.listen(8000)