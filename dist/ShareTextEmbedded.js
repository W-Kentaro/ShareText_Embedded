'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
* Copyright (c) 2018 W-Kentaro
* Released under the MIT license
* https://opensource.org/licenses/mit-license.php
*/

var ShareTextEmbedded = function () {
  function ShareTextEmbedded() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, ShareTextEmbedded);

    this.GetOG = {
      url: '',
      description: '',
      get: function get() {
        for (var i = 0; i < document.head.children.length; i++) {
          if (document.head.children[i].getAttribute('property') === 'og:url') {
            this.url = document.head.children[i].getAttribute('content');
          }
          if (document.head.children[i].getAttribute('property') === 'og:description') {
            this.description = document.head.children[i].getAttribute('content');
          }
        }
      }
    };
    this.GetOG.get();

    this.isInit = data.init || false;

    this.url = data.url ? encodeURIComponent(data.url) : encodeURIComponent(this.GetOG.url);
    this.text = data.text ? encodeURIComponent(data.text) : encodeURIComponent(this.GetOG.description);
    this.twitter = data.twitter || false;
    this.twitter = this.twitter === 'disable' ? false : {
      elem: this.twitter.elem || '[data-share="twitter"]',
      url: this.twitter.url ? encodeURIComponent(this.twitter.url) : this.url,
      text: this.twitter.text === null ? null : this.twitter.text ? encodeURIComponent(this.twitter.text) : this.text,
      hash: this.twitter.hash ? encodeURIComponent(this.twitter.hash) : false,
      via: this.twitter.via ? encodeURIComponent(this.twitter.via) : false,
      related: this.twitter.related ? encodeURIComponent(this.twitter.related) : false
    };
    this.facebook = data.facebook || false;
    this.facebook = this.facebook === 'disable' ? false : {
      elem: this.facebook.elem || '[data-share="facebook"]',
      url: this.facebook.url ? encodeURIComponent(this.facebook.url) : this.url,
      text: this.facebook.text ? encodeURIComponent(this.facebook.text) : this.text
    };
    this.line = data.line || false;
    this.line = this.line === 'disable' ? false : {
      elem: this.line.elem || '[data-share="line"]',
      url: this.line.url === null ? null : this.line.url ? encodeURIComponent(this.line.url) : this.url,
      text: this.line.text ? encodeURIComponent(this.line.text) : this.text
    };
    this.URL = {
      twitter: 'http://twitter.com/share?url=' + this.twitter.url + (this.twitter.text === null ? '' : '&text=' + this.twitter.text) + (this.twitter.hash ? '&hashtags=' + this.twitter.hash : '') + (this.twitter.via ? '&via=' + this.twitter.via : '') + (this.twitter.related ? '&related=' + this.twitter.related : ''),
      facebook: 'http://www.facebook.com/sharer.php?u=' + this.facebook.url + '&t=' + this.facebook.text,
      line: 'http://line.me/R/msg/text/?' + this.line.text + (this.line.url === null ? '' : '%20' + this.line.url)
    };
    if (!this.isInit) {
      this.init();
    }
  }

  _createClass(ShareTextEmbedded, [{
    key: 'push',
    value: function push() {
      if (this.twitter) {
        this.embed(this.twitter.elem, 'twitter');
      }
      if (this.facebook) {
        this.embed(this.facebook.elem, 'facebook');
      }
      if (this.line) {
        this.embed(this.line.elem, 'line');
      }
    }
  }, {
    key: 'embed',
    value: function embed(e, sns) {
      var item = document.querySelectorAll(e);
      for (var i = 0; i < item.length; i++) {
        if (sns === 'twitter') {
          item[i].setAttribute('href', this.URL.twitter);
        }
        if (sns === 'facebook') {
          item[i].setAttribute('href', this.URL.facebook);
        }
        if (sns === 'line') {
          item[i].setAttribute('href', this.URL.line);
        }
      }
    }
  }, {
    key: 'init',
    value: function init() {
      this.push();
    }
  }, {
    key: 'update',
    value: function update(data) {
      var before = {
        url: this.url,
        text: this.text,
        twitter: this.twitter,
        facebook: this.facebook,
        line: this.line
      };
      this.url = data.url || before.url;

      this.text = data.text || before.text;

      this.twitter = data.twitter || before.twitter;
      this.twitter = {
        elem: this.twitter.elem || before.twitter.elem,
        url: this.twitter.url ? encodeURIComponent(this.twitter.url) : before.twitter.url,
        text: this.twitter.text === null ? null : this.twitter.text ? encodeURIComponent(this.twitter.text) : before.twitter.text,
        hash: this.twitter.hash ? encodeURIComponent(this.twitter.hash) : before.twitter.hash,
        via: this.twitter.via ? encodeURIComponent(this.twitter.via) : before.twitter.via,
        related: this.twitter.related ? encodeURIComponent(this.twitter.related) : before.twitter.related
      };
      this.facebook = data.facebook || before.facebook;
      this.facebook = {
        elem: this.facebook.elem || before.facebook.elem,
        url: this.facebook.url ? encodeURIComponent(this.facebook.url) : before.facebook.url,
        text: this.facebook.text ? encodeURIComponent(this.facebook.text) : before.facebook.text
      };
      this.line = data.line || before.line;
      this.line = {
        elem: this.line.elem || before.line.elem,
        url: this.line.url === null ? null : this.line.url ? encodeURIComponent(this.line.url) : before.line.url,
        text: this.line.text ? encodeURIComponent(this.line.text) : before.line.text
      };

      this.URL = {
        twitter: 'http://twitter.com/share?url=' + this.twitter.url + (this.twitter.text === null ? '' : '&text=' + this.twitter.text) + (this.twitter.hash ? '&hashtags=' + this.twitter.hash : '') + (this.twitter.via ? '&via=' + this.twitter.via : '') + (this.twitter.related ? '&related=' + this.twitter.related : ''),
        facebook: 'http://www.facebook.com/sharer.php?u=' + this.facebook.url + '&t=' + this.facebook.text,
        line: 'http://line.me/R/msg/text/?' + this.line.text + (this.line.url === null ? '' : '%20' + this.line.url)
      };
    }
  }]);

  return ShareTextEmbedded;
}();