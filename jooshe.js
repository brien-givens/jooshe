//
//  Jooshe  ||  Javascript Object-Oriented Subclassing of HTML Elements
//
//  Version 1.0.0, 19 December 2013
//
//  Copyright 2013 Brien R. Givens
//
//  Released under the MIT license | http://opensource.org/licenses/MIT
//

var J$ = {

  wrap:
    function(o,p){
      if(p) for(var i in p)
        if(Object.prototype.toString.call(p[i]) == "[object Object]")
          { if(!(i in o)) o[i] = {}; J$.wrap(o[i],p[i]); }
      else o[i] = p[i];
    }

};

function createClass(className,fn,o,p) {

  fn = fn || function(){};
  window[className] = fn;
  var q = fn.prototype, w = J$.wrap;
  if(p) w(q, o.prototype);
  if(o) w(q, p || o);
  if(!("$" in q)) q.$ = {};
  q.$.__class__ = fn;
  q.$.__parentClass__ = p ? o : null;

}

function element(tag, a, b, c, d) {

  var i, j, k, me = document.createElement(tag), o = me.style,
  f = function(a){ return Object.prototype.toString.call(a) == "[object Array]" ? a : [a]; },
  w = J$.wrap;

  o.boxSizing = "borderBox";
  o.margin = 0;
  if(tag == "button") o.whiteSpace = "nowrap";
  else if(tag == "table") { me.cellPadding = 0; me.cellSpacing = 0; }

  a = f(a);
  for(i=0;i<a.length;i++) w(o,a[i]);

  me.$ = {el: me};

  b = f(b);
  for(i=0;i<b.length;i++) if(b[i]) for(j in b[i])
    if(j == "$") w(me.$, b[i].$);
    else if(j == "listeners") for(k in b[i][j]) me.addEventListener(k, b[i][j][k]);
    else if(j == "style") w(o, b[i][j]);
    else me[j] = b[i][j];

  c = f(c);
  for(i=0;i<c.length;i++) w(me.$,c[i]);

  d = f(d);
  for(i=0;i<d.length;i++) w(me, d[i]);

  return me;

}
