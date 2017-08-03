/**
 * Created by xiaoxiaosu on 17/8/3.
 */


const express = require('express')

const querystring = require('querystring')
const config = require('./config')
const app = express()
const cookieParser = require('cookie-parser')

const Promise = require('bluebird')
const request = require('request')
const request2 = require('superagent')

app.set("view engine", "ejs");
app.use(cookieParser())




const get_access_token = function (req,res) {
    return new Promise((resovle,reject)=>{
        request(config.token_url+'?'+
            querystring.stringify({
                    client_id:config.client_id,
                    redirect_uri:config.redirect_uri,
                    client_secret:config.secret,
                    grant_type:'authorization_code',
                    code:req.query.code
                }),
            function (err,data) {

                if(!err && data.statusCode == 200){
                    var obj = data.body.replace(/^&&&START&&&/,'')
                    resovle(JSON.parse(obj).access_token)
                }else {
                    reject(err)
                }
            }
        )
    })
}

app.use(async function (req,res,next) {
    if(!req.cookies.miauth_token){
        if(req.query.code){
            try {
                var token = await get_access_token(req,res)
                res.cookie('miauth_token',token,{maxAge:60*60*24*30*3})
                next()
            }catch(err) {
                res.send(err)
            }
        }else {
            res.redirect(
                config.authorization_code_url + '?'+ querystring.stringify({
                    client_id:config.client_id,
                    redirect_uri:config.redirect_uri,
                    response_type:'code'
                })
            )
        }
    }else {
        next()
    }
})

app.get('/token',function (req, res) {
    res.send({access_token:req.cookies.miauth_token})
})



const get_profile = function (token) {
    return new Promise((resovle,reject)=>{

        request2
            .get(config.profile_url)
            .query({
                clientId:config.client_id,
                token:token,
                // token:'111',
                response_type:'token',
                _json:true
            })
            .end(function (err, data) {

                if(err){
                    console.log('has error',err)
                    reject(err)
                }else {
                    console.log('no error',data.body)
                    resovle(data.body)
                }
            })


    })
}


const get_phone = function (token) {
    return new Promise((resovle,reject)=>{

        request2
            .get(config.phone_url)
            .query({
                clientId:config.client_id,
                token:token,
                response_type:'token',
                _json:true
            })
            .end(function (err, data) {

                if(err){
                    console.log('has error',err)
                    reject(err)
                }else {
                    console.log('no error',data.body)
                    resovle(data.body)
                }
            })


    })
}

app.get('/profile',async function (req, res) {
    try{
        var data =await get_profile(req.cookies.miauth_token)
        console.log(data)
        res.send(data)
    }catch (e){
        res.send(e)
    }

})


app.get("/",function (req, res) {
    res.render('index')
})


app.listen(9003)