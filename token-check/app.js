/**
 * Created by xiaoxiaosu on 17/8/2.
 */


const url = require("url");

const express =require('express')
const sha1= require('sha1')
const config = require('./config')
const app = express()
const xmlparser = require('express-xml-bodyparser');

const auth = require('./auth')


app.use(auth)
app.use(xmlparser())

app.use(function (req, res) {
    var message = req.body.xml
    var content = {
        "你是":'我是小小苏',
        "你是?":'我是小小苏',
        "你是谁":"我是小小苏",
        "你是谁?":"我是小小苏",
        '你是干啥的':"我是条咸鱼",
        '你是干啥的?':"我是条咸鱼",
        '你女朋友是谁':"哈哈，她是个美女",
        '你女朋友是谁?':"哈哈，她是个美女",
        "你妈妈是谁":"她的名字是肖小娇",
        "你妈妈是谁?":"她的名字是肖小娇",
        "你爸爸是谁":"她的名字是苏后胜",
        "你妈妈是谁?":"她的名字是苏后胜"
    }
    var createTime = new Date().getTime();
    var reply = content[message.content] || '你在说啥，我听不懂'
    var txt = `
        <xml>
        <ToUserName><![CDATA[${message.fromusername[0]}]]></ToUserName>
        <FromUserName><![CDATA[${message.tousername[0]}]]></FromUserName>
        <CreateTime>${createTime}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${reply}]]></Content>
        </xml>
`
    console.log(txt)
    res.send(txt)
})

app.listen(9003)