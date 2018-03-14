const path          = require('path');
const _             = require('underscore');
const Authenticated = require(path.join(__dirname, 'authenticated'));

module.exports = Authenticated.extend(function(options) {
  _.extend(this, options);
  this.api_endpoint = '/api/';
}).methods({

  url: function(method, query) {
    var u = [this.host, this.api_endpoint, method].join('')
    return u;
  },

  getBalance: function(options, then) {
    this.post({url: this.url('GetBalance'), form: options}, then)  
  },

  getDepositAddress: function(options, then) {
    this.post({url: this.url('GetDepositAddress'), form: options}, then)  
  },

  getOpenOrders: function(options, then) {
    this.post({url: this.url('GetOpenOrders'), form: options}, then)  
  },

  getTradeHistory: function(options, then) {
    this.post({url: this.url('GetTradeHistory'), form: options}, then)  
  },

  getTransactions: function(options, then) {
    this.post({url: this.url('GetTransactions'), form: options}, then)  
  },

  submitTrade: function(options, then) {
    this.post({url: this.url('SubmitTrade'), form: options}, then)  
  },

  cancelTrade: function(options, then) {
    this.post({url: this.url('CancelTrade'), form: options}, then)  
  },

  submitTip: function(options, then) {
    this.post({url: this.url('SubmitTip'), form: options}, then)  
  },

  submitWithdraw: function(options, then) {
    this.post({url: this.url('SubmitWithdraw'), form: options}, then)  
  },

  submitTransfer: function(options, then) {
    this.post({url: this.url('SubmitTransfer'), form: options}, then)  
  }



}) 

