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


    if(Object.keys(data).length == 0){
        return res.send('oh this is a handle view')
    }

    if(data.signature == sha1([token,data.timestamp,data.nonce].sort().join(''))){
        return res.send(echostr)
    }

    return res.send('failed')


})

app.listen(8000)