var path    = require('path');
var mockery = require('mockery');
var should  = require('chai').should();
var request = require('request-mockery');
var assert  = require('assert');
var _       = require('underscore');
const url   = require('url');
const querystring = require('querystring');

describe('Cryptopia', function() {
    var Cryptopia, keys;
    before(function(){
      mockery.enable({
	warnOnReplace: false,
	warnOnUnregistered: false,
	useCleanCache: true
      });
      // request.verbosity(true)
      mockery.registerMock('request', request);
      keys = {
        "key": "test",
        "secret": "test"
      }
      Cryptopia = require(path.join(__dirname, '..', 'index'));
      
    });

  after(function(){
    mockery.disable();
  }); 

  describe('Public', function() {
    it('GetCurrencies', function(done) {
      var cryptopia = new Cryptopia(keys)
      cryptopia.getCurrencies(function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://cryptopia.co.nz/api/GetCurrencies')
        done();
      })
    });
    
    it('GetTradePairs', function(done) {
      var cryptopia = new Cryptopia(keys)
      cryptopia.getTradePairs(function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://cryptopia.co.nz/api/GetTradePairs')
        done();
      })
    });

    it('GetMarkets', function(done) {
      var cryptopia = new Cryptopia(keys)
      cryptopia.getMarkets(function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://cryptopia.co.nz/api/GetMarkets')
        done();
      })
    });
    it('GetMarket', function(done) {
      var cryptopia = new Cryptopia(keys)
      cryptopia.getMarket({market: 'DOT-BTC'}, function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://cryptopia.co.nz/api/GetMarket/DOT_BTC')
        done();
      })
   
    });
    it('GetMarketHistory', function(done) {
      var cryptopia = new Cryptopia(keys)
      cryptopia.getMarketHistory({market: 'DOT-BTC', hours: 24}, function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://cryptopia.co.nz/api/GetMarketHistory/DOT_BTC/24')
        done();
      })
   
    });
    it('GetMarketOrders', function(done) {
      var cryptopia = new Cryptopia(keys)
      cryptopia.getMarketOrders({market: 'ETH-BTC', orderCount: 100}, function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://cryptopia.co.nz/api/GetMarketOrders/ETH_BTC/100')
        done();
      })   
    });
    it('GetMarketOrderGroups', function(done) {
      var cryptopia = new Cryptopia(keys)
      cryptopia.getMarketOrderGroups({markets: ['ETH-BTC'], orderCount: 100}, function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://cryptopia.co.nz/api/GetMarketOrderGroups/ETH_BTC/100')
        done();
      })   
    });
  });

  describe('Private', function() {
    it('GetBalance', function(done) {
      var cryptopia = new Cryptopia(keys)
      cryptopia.getBalance({currency: 'ETH'}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        parsed.query = querystring.parse(parsed.url.query);
        assert.equal(parsed.url.pathname, '/api/GetBalance')
        assert.equal(result.form.currency, 'ETH');
        assert.equal((_.keys(result.headers).indexOf('Authorization') > -1), true);
        done();
      })   
    });
    it('GetDepositAddress', function(done) {
      var cryptopia = new Cryptopia(keys)
      cryptopia.getDepositAddress({currency: 'ETH'}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        parsed.query = querystring.parse(parsed.url.query);
        assert.equal(parsed.url.pathname, '/api/GetDepositAddress')
        assert.equal(result.form.currency, 'ETH');
        assert.equal((_.keys(result.headers).indexOf('Authorization') > -1), true);
        done();
      })   
    });
    it('GetOpenOrders', function(done) {
      var cryptopia = new Cryptopia(keys)
      cryptopia.getOpenOrders({market: 'test'}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        assert.equal(result.form.market, 'test');
        assert.equal(parsed.url.pathname, '/api/GetOpenOrders')
        assert.equal((_.keys(result.headers).indexOf('Authorization') > -1), true);
        done();
      })   
    });

    it('GetTradeHistory', function(done) {
      var cryptopia = new Cryptopia(keys)
      cryptopia.getTradeHistory({market: 'test'}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        assert.equal(result.form.market, 'test');
        assert.equal(parsed.url.pathname, '/api/GetTradeHistory')
        assert.equal((_.keys(result.headers).indexOf('Authorization') > -1), true);
        done();
      })   
    });

    it('GetTransactions', function(done) {
      var cryptopia = new Cryptopia(keys)
      cryptopia.getTransactions({type: 'Deposit'}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        assert.equal(result.form.type, 'Deposit');
        assert.equal(parsed.url.pathname, '/api/GetTransactions')
        assert.equal((_.keys(result.headers).indexOf('Authorization') > -1), true);
        done();
      })   
    });

    it('SubmitTrade', function(done) {
      var cryptopia = new Cryptopia(keys)
      cryptopia.submitTrade({Market: 'test', Type: 'Buy', Rate: 0.00000034, Amount: 123.00000000}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        assert.equal(result.form.Market, 'test');
        assert.equal(result.form.Type, 'Buy');
        assert.equal(result.form.Rate, 0.00000034);
        assert.equal(result.form.Amount, 123.00000000);
        assert.equal(parsed.url.pathname, '/api/SubmitTrade')
        assert.equal((_.keys(result.headers).indexOf('Authorization') > -1), true);
        done();
      })   
    });

    it('CancelTrade', function(done) {
      var cryptopia = new Cryptopia(keys)
      cryptopia.cancelTrade({OrderId: 'test', Type: 'All'}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        assert.equal(result.form.OrderId, 'test');
        assert.equal(result.form.Type, 'All');
        assert.equal(parsed.url.pathname, '/api/CancelTrade')
        assert.equal((_.keys(result.headers).indexOf('Authorization') > -1), true);
        done();
      })   
    });

    it('SubmitTip', function(done) {
      var cryptopia = new Cryptopia(keys)
      cryptopia.submitTip({Currency: 'ETH', ActiveUsers: 2, Amount: 1}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        assert.equal(result.form.Currency, 'ETH');
        assert.equal(result.form.ActiveUsers, 2);
        assert.equal(result.form.Amount, 1);
        assert.equal(parsed.url.pathname, '/api/SubmitTip')
        assert.equal((_.keys(result.headers).indexOf('Authorization') > -1), true);
        done();
      })   
    });

    it('SubmitWithdraw', function(done) {
      var cryptopia = new Cryptopia(keys)
      cryptopia.submitWithdraw({Currency: 'ETH', Address: 'test', Amount: 1}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        assert.equal(result.form.Currency, 'ETH');
        assert.equal(result.form.Address, 'test');
        assert.equal(result.form.Amount, 1);
        assert.equal(parsed.url.pathname, '/api/SubmitWithdraw')
        assert.equal((_.keys(result.headers).indexOf('Authorization') > -1), true);
        done();
      })   
    });

    it('SubmitTransfer', function(done) {
      var cryptopia = new Cryptopia(keys)
      cryptopia.submitTransfer({Currency: 'ETH', Username: 'test', Amount: 1}, function(err, result) {
        assert.equal(result.method, 'POST');
        var parsed = {};
        parsed.url = url.parse(result.url);
        assert.equal(result.form.Currency, 'ETH');
        assert.equal(result.form.Username, 'test');
        assert.equal(result.form.Amount, 1);
        assert.equal(parsed.url.pathname, '/api/SubmitTransfer')
        assert.equal((_.keys(result.headers).indexOf('Authorization') > -1), true);
        done();
      })   
    });







  });
});
