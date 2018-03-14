const crypto      = require('crypto');
const klass       = require('klass');
const _           = require('underscore');
const querystring = require('querystring');

var createHeaders  = function(url, params) {
}

module.exports = klass(function(options){
  _.extend(this, options);
}).methods({
  sign: function(options) {
    var nonce        = Math.floor(new Date().getTime()).toString();
    var md5          = crypto.createHash('md5').update(JSON.stringify(options.form)).digest();
    var base64String = md5.toString('base64');
    var signature    = this.key + "POST" + encodeURIComponent(options.url).toLowerCase() + nonce + base64String;
    var hmac         = crypto.createHmac('sha256', new Buffer(this.secret, "base64")).update(signature).digest().toString('base64');
    
    return {
      'User-Agent':     'ussballantyne-npm-api-client',
      'Authorization':  "amx " + this.key + ":" + hmac + ":" + nonce.toString(),
      'Content-Length': Buffer.byteLength(JSON.stringify(options))
    }
  }
})
