/*!
* Copyright (c) 2018 W-Kentaro
* Released under the MIT license
* https://opensource.org/licenses/mit-license.php
*/

class ShareTextEmbedded{
  constructor(data) {
    this.GetOG = {
      url: '',
      description: '',
      Get: function () {
        for(let i = 0; i < document.head.children.length; i++){
          if(document.head.children[i].getAttribute('property') === 'og:url'){
            this.url = document.head.children[i].getAttribute('content');
          }
          if(document.head.children[i].getAttribute('property') === 'og:description'){
            this.description = document.head.children[i].getAttribute('content');
          }
        }
      }
    };
    this.GetOG.Get();

    this.init = data.init || false;

    this.url = data.url || this.GetOG.url;
    this.text = data.text || this.GetOG.description;
    this.twitter = {
      elem: data.twitter.elem || `[data-share="twitter"]`,
      url: data.twitter.url || this.url,
      text: data.twitter.text || this.text,
      hash: data.twitter.hash || false,
      via: data.twitter.via || false,
      related: data.twitter.related || false,
    };
    this.facebook = {
      elem: data.facebook.elem || `[data-share="facebook"]`,
      url: data.facebook.url || this.url,
      text: data.facebook.text || this.text,
    };
    this.line = {
      elem: data.line.elem || `[data-share="line"]`,
      url: data.line.url || this.url,
      text: data.line.text || this.text,
      onlyText: data.line.onlyText || false,
    };

    this.shareText = {
      twitter: '',
      facebook: '',
      line: '',
    };
    if(!this.init){
      this.Encode();
    }
  }
  Encode() {
    this.url = encodeURIComponent(this.url);
    this.twitter.url = encodeURIComponent(this.twitter.url);
    this.twitter.text = encodeURIComponent(this.twitter.text);
    this.twitter.hash = this.twitter.hash ? encodeURIComponent(this.twitter.hash) : this.twitter.hash;
    this.twitter.via = this.twitter.via ? encodeURIComponent(this.twitter.via) : this.twitter.via;
    this.twitter.related = this.twitter.related ? encodeURIComponent(this.twitter.related) : this.twitter.related;
    this.facebook.url = encodeURIComponent(this.facebook.url);
    this.facebook.text = encodeURIComponent(this.facebook.text);
    this.line.url = encodeURIComponent(this.line.url);
    this.line.text = encodeURIComponent(this.line.text);

    this.Push();
  }
  Push() {
    this.shareText = {
      twitter: `http://twitter.com/share?url=${this.twitter.url}&text=${this.twitter.text}${this.twitter.hash ? '&hashtags=' + this.twitter.hash : ''}${this.twitter.via ? '&via=' + this.twitter.via : ''}${this.twitter.related ? '&related=' + this.twitter.related : ''}`,
      facebook: `http://www.facebook.com/sharer.php?u=${this.facebook.url}&t=${this.facebook.text}`,
      line: `http://line.me/R/msg/text/?${this.line.text}${this.line.onlyText ? '' : '%20' + this.line.url}`,
    };

    this.Embed(this.twitter.elem, 'twitter');
    this.Embed(this.facebook.elem, 'facebook');
    this.Embed(this.line.elem, 'line');
  }
  Embed(e, sns) {
    const item = document.querySelectorAll(e);
    for(let i = 0; i < item.length; i++){
      if(sns === 'twitter'){
        item[i].setAttribute(`href`, this.shareText.twitter);
      }
      if(sns === 'facebook'){
        item[i].setAttribute(`href`, this.shareText.facebook);
      }
      if(sns === 'line'){
        item[i].setAttribute(`href`, this.shareText.line);
      }
    }
  }
  Init() {
    this.Encode();
  }
}
