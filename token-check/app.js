/**
 * Created by xiaoxiaosu on 17/8/2.
 */


const url = require("url");

const express =require('express')
const sha1= require('sha1')

const app = express()

app.get('/',function (req, res) {
    const data = req.query

    const token = 'surui123'


    if(data.signature == sha1([token,data.timestamp,data.nonce].sort().join(''))){
        res.send(echostr)
    }else {
        res.send('failed')
    }

    if(Object.keys(query).length == 0){
        res.send('oh this is a handle view')
    }
})

app.listen(8000)