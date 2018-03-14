const path          = require('path');
const _             = require('underscore');
const HTTP          = require(path.join(__dirname, 'http'));
const Signature     = require(path.join(__dirname, 'signature'));
var nonce           = require('nonce')();

module.exports = HTTP.extend(function(options) {
  _.extend(this, options);
}).methods({

  url: function(method, query) {
    var u = [this.host, this.api_endpoint, method].join('')
    if (query == undefined) {
      query.apikey = this.key;
      query.nonce = nonce();
    }
    return [u,"?", querystring.stringify(query)].join('');
  },

  headers: function(options) {
    var signer = new Signature({key: this.key, secret: this.secret});
    return signer.sign(options);
  }  
}) 
