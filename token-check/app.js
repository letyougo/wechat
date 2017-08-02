/**
 * Created by xiaoxiaosu on 17/8/2.
 */


const url = require("url");
const crypto = require("crypto");
const express =require('express')


function sha1(str){
    var md5sum = crypto.createHash("sha1");
    md5sum.update(str);
    str = md5sum.digest("hex");
    return str;
}

const app = express()

app.get('/',function (req, res) {
    const data = req.query

    const signature = data.signature
    const timestamp = data.timestamp
    const nonce = data.nonce
    const echostr = data.echostr
    const token = 'surui123'


    const list = [token,timestamp,nonce]
    list.sort()

    if(signature == sha1(list.join())){
        res.send(echostr)
    }else {
        res.send('oh failed')
    }

    if(Object.keys(query).length == 0){
        res.send('oh this is a handle view')
    }
})