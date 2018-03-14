const path        = require('path');
const klass       = require('klass');
var Public        = require(path.join(__dirname, 'lib', 'public'));
var Private       = require(path.join(__dirname, 'lib', 'private'));
var api = {};

module.exports = klass(function(options) {
  if (options == undefined) {
    options = {};
  }
  
  
  if (options.verbose == undefined) {
    this.verbose = options.verbose;
  } else {
    this.verbose = false;
  }

  api.public   = new Public();
  api.private  = new Private(options);

}).methods({

  getCurrencies: function(then) {
    api.public.getCurrencies(then);
  },
  
  getTradePairs: function(then) {
    api.public.getTradePairs(then);
  },
  
  getMarkets: function(options, then) {
    api.public.getMarkets(options, then)
  },
  
  getMarket: function(options, then) {
    api.public.getMarket(options, then);
  },
  
  getMarketHistory: function(options, then) {
    api.public.getMarketHistory(options, then);
  },
  
  getMarketOrders: function(options, then) {
    api.public.getMarketOrders(options, then);
  },
  
  getMarketOrderGroups: function(options, then) {
    api.public.getMarketOrderGroups(options, then);
  },
  
  getBalance: function(options, then) {
    api.private.getBalance(options, then);
  },
  
  getDepositAddress: function(options, then) {
    api.private.getDepositAddress(options, then);
  },
  
  getOpenOrders: function(options, then) {
    api.private.getOpenOrders(options, then);
  },
  
  getTradeHistory: function(options, then) {
    api.private.getTradeHistory(options, then);
  },
  
  getTransactions: function(options, then) {
    api.private.getTransactions(options, then); 
  },
  
  submitTrade: function(options, then) {
    api.private.submitTrade(options, then);
  },
  
  cancelTrade: function(options, then) {
    api.private.cancelTrade(options, then);
  },
  
  submitTip: function(options, then) {
    api.private.submitTip(options, then);
  },
  
  submitWithdraw: function(options, then) {
    api.private.submitWithdraw(options, then)
  },
  
  submitTransfer: function(options, then) {
    api.private.submitTransfer(options, then);
  }

}) 
