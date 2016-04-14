// Generated by CoffeeScript 1.10.0
(function() {
  var cheerio, cookie, fs, headers, info, next, redirect, rem, request, xjtu;

  request = require('superagent');

  cheerio = require('cheerio');

  cookie = require('cookie');

  fs = require('fs');

  info = {
    username: 'lihanyuan',
    password: 'xHC-o89-G3o-98F'
  };

  headers = {
    Connection: 'keep-alive',
    'Cache-Control': 'max-age=0',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6'
  };

  rem = {
    CASJID: null,
    CASTGC: null
  };

  next = function(p) {
    return request.post("https://cas.xjtu.edu.cn/login").set(headers).set('Cookie', rem.CASJID).type('form').send(p).redirects(0).end(function(err, res) {
      if (!err) {
        rem.CASTGC = res.headers['set-cookie'][1].match(/^CASTGC=[\da-z-A-Z]+/)[0];
        // console.log(rem.CASTGC);
        return redirect("http://xkfw.xjtu.edu.cn/xsxk/index.xk");
      } else {
        // return console.error("error");
      }
    });
  };

  redirect = function(web) {
    return request.get(web).set(headers).set("Cookie", rem.CASTGC + ";" + rem.CASJID).end(function(err, res) {
      if (!err) {
        // return console.log(res);
      } else {
        // return console("get no web");
      }
    });
  };

  request.get('https://cas.xjtu.edu.cn/login').set(headers).redirects(0).end(function(err, res) {
    var $, posthead;
    if (!err) {
      rem.CASJID = res.headers['set-cookie'][0].match(/^JSESSIONID=[\dA-Z]+/)[0];
      $ = cheerio.load(res.text);
      posthead = {
        lt: $('input[name="lt"]').attr('value'),
        execution: $('input[name="execution"]').attr('value'),
        _eventId: $('input[name="_eventId"]').attr('value'),
        submit: $('input[name="submit"]').attr('value'),
        username: info.username,
        password: info.password,
        code: ''
      };
      return next(posthead);
    } else {
      throw "Can not connect to the https://cas.xjtu.edu.cn/login";
    }
  });

  xjtu = (function() {
    function xjtu(args) {}

    xjtu.prototype.setinfo = function(username, password) {
      this.username = username;
      this.password = password;
    };

    xjtu.headers = require('./lib/headers');

    xjtu.personal = {
      username: null,
      password: null
    };

    xjtu.cookie = {
      cas: null,
      xkfw: null
    };

    return xjtu;

  })();

  var a = new xjtu();
  console.log(a.headers);

}).call(this);
