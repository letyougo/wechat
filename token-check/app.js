/**
 * Created by xiaoxiaosu on 17/8/2.
 */


var http = require("http");
var url = require("url");
var crypto = require("crypto");

function sha1(str){
    var md5sum = crypto.createHash("sha1");
    md5sum.update(str);
    str = md5sum.digest("hex");
    return str;
}

function validateToken(req,res){
    var query = req.query;
    //console.log("*** URL:" + req.url);
    //console.log(query);
    var signature = query.signature;
    var echostr = query.echostr;


    var oriArray = new Array();
    oriArray[0] = query.nonce;
    oriArray[1] = query.timestamp;
    oriArray[2] = "xiaoxiaosu";//这里是你在微信开发者中心页面里填的token，而不是****
    oriArray.sort();

    var original = oriArray.join('');
    console.log("Original str : " + original);
    console.log("Signature : " + signature );
    var scyptoString = sha1(original);
    if(signature == scyptoString){
        res.end(echostr);
        console.log("Confirm and send echo back");
    }else {
        res.end("false");
        console.log("Failed!");
    }
}


var webSvr = http.createServer(validateToken);
webSvr.listen(8000,function(){
    console.log("Start validate");
});