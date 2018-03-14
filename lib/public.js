const path        = require('path');
const _           = require('underscore');
const HTTP        = require(path.join(__dirname, 'http'));

module.exports = HTTP.extend(function(options) {
  _.extend(this, options);
}).methods({

  ensureMarketFormat: function(market) {
    if (market.indexOf('-') > -1) {
      return market.split('-').join('_');
    } else {
      return market;
    }
  },

  methodWithParams: function(method, params) {
    var self = this;
    method = [method];
    if (params.market != undefined) {
      params.market = this.ensureMarketFormat(params.market)
      method = method.concat(['/', params.market]);
    }
    if (params.markets) {
      params.markets = _.map(params.markets, function(market) { return self.ensureMarketFormat(market) }).join('-');
      method = method.concat(['/', params.markets]);
    
    }
    if (params.hours != undefined) {
      method = method.concat(['/', params.hours.toString()]);
    }
    if (params.orderCount != undefined) {
      method = method.concat(['/', params.orderCount.toString()]);
    }
    // console.log(method);
    // console.log(params);
    return method.join('');
  },

  url: function(method, query) {
    var u = [this.host, this.api_endpoint, method].join('')
    return u;
  },

  getTradePairs: function(then) {
    this.get({url: this.url('GetTradePairs')}, then);
  },

  getCurrencies: function(then) {
    this.get({url: this.url('GetCurrencies')}, then);
  },

  getMarkets: function(options, then) {
    if (typeof options == 'function') {
      then = options;
      options = {};
    }

    this.get({url: this.url(this.methodWithParams('GetMarkets', options))}, then);
  },

  getMarket: function(options, then) {
    this.get({url: this.url(this.methodWithParams('GetMarket', options))}, then);
  },

  getMarketHistory: function(options, then) {
    this.get({url: this.url(this.methodWithParams('GetMarketHistory', options))}, then);
  },

  getMarketOrders: function(options, then) {
    this.get({url: this.url(this.methodWithParams('GetMarketOrders', options))}, then);
  },

  getMarketOrderGroups: function(options, then) {
    this.get({url: this.url(this.methodWithParams('GetMarketOrderGroups', options))}, then);
  }

}) 
