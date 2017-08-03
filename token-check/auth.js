/**
 * Created by xiaoxiaosu on 17/8/3.
 */

const config = require('./config')
const sha1 = require('sha1')

var auth = function (req,res,next) {
    const data = req.query
    if(Object.keys(data).length == 0){
        return res.send('oh this is a handle view')
    }

    var code = sha1([config.token,data.timestamp,data.nonce].sort().join(''))
    console.log(data.signature,':',code)

    if(data.signature == code){

        return next()
    }

    return res.send('failed')
}

module.exports = auth