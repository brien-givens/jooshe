//
//  Jooshe Tables  ||  Javascript Object-Oriented Subclassing of HTML Elements
//
//  Version 1.0.0, 23 December 2013
//
//  Copyright 2013 Brien R. Givens
//
//  Released under the MIT license | http://opensource.org/licenses/MIT
//

createClass("table",function(o,p,q,r){ return element("table",o,[this].concat(p),q,r); },{$:{
expansionElement:"tbody",
appendCell:function(o,p,q,r){ return this.body(0).$.appendCell(o,p,q,r); },
appendRow:function(o,p,q,r){ return this.body(0).$.appendRow(o,p,q,r); },
body:function(i,o,p,q,r){
  var b = /^\[object HTML/.test(Object.prototype.toString.call(o)), x,
  u = this.el,
  v = window[this.expansionElement],
  w = J$.wrap,
  s = v == tbody ? "tBodies" : "childNodes";  // this function is used by other classes
  i = i || 0;
  if(i >= 0 && u[s].length > i) {
    x = u[s][i];
    if(b) u.replaceChild(x,o);
  }
  else {
    x = b ? o : new v(o,p,q);
    if(i < 0 && u[s].length) u.insertBefore(x,u.firstChild);
    else {
      while(u[s].length < i) u.appendChild(new v);
      u.appendChild(x);
    }
  }
  w(x.style,b?p:o);
  w(x,b?q:p);
  w(x.$,b?r:q);
  return x;
},
cell:function(i,j,o,p,q,r){ return this.body(0).$.cell(i,j,o,p,q,r); },
firstCell:function(o,p,q,r){ return this.body(0).$.firstCell(o,p,q,r); },
firstRow:function(o,p,q,r){ return this.body(0).$.firstRow(o,p,q,r); },
foot:function(o,p,q,r){ return this.el.tFoot || this.el.appendChild(new tfoot(o,p,q,r)); },
head:function(o,p,q,r){ return this.el.tHead || this.el.appendChild(new thead(o,p,q,r)); },
lastCell:function(o,p,q,r){ return this.body(0).$.lastCell(o,p,q,r); },
lastRow:function(o,p,q,r){ return this.body(0).$.lastRow(o,p,q,r); },
prependCell:function(o,p,q,r){ return this.body(0).$.prependCell(o,p,q,r); },
prependRow:function(o,p,q,r){ return this.body(0).$.prependRow(o,p,q,r); },
row:function(i,o,p,q,r){ return this.body(0).$.row(i,o,p,q,r); },
setBackground:function(s){ var o = this.el; o.style.backgroundImage = s; return o; }
}});

createClass("tbody",function(o,p,q,r,s){ return element(s || "tbody",o,[this].concat(p),q,r); },{$:{
expansionElement:"tr",expansionMethod:"row",
appendCell:function(o,p,q,r){ return this.lastRow().$.appendCell(o,p,q,r); },
appendRow:function(o,p,q,r){ return this[this.expansionMethod].call(this,this.el.childNodes.length,o,p,q,r); },
cell:function(i,j,o,p,q,r){ return this.row(i).$.cell(j,o,p,q,r); },
firstCell:function(o,p,q,r){ return this.cell(0,0,o,p,q,r); },
firstRow:function(o,p,q,r){ return this.row(0,o,p,q,r); },
lastCell:function(o,p,q,r){ return this.lastRow().$.lastCell(o,p,q,r); },
lastRow:function(o,p,q,r){ var i = this.el.childNodes.length; return this.row(i?i-1:0,o,p,q,r); },
prependCell:function(o,p,q,r){ return this.lastRow().$.prependCell(o,p,q,r); },
prependRow:function(o,p,q,r){ return this[this.expansionMethod].call(this,-1,o,p,q,r); },
row:table.prototype.$.body
}});

createClass("thead",function(o,p,q,r){ return new tbody(o,p,q,r,"thead"); });
createClass("tfoot",function(o,p,q,r){ return new tbody(o,p,q,r,"tfoot"); });

createClass("tr",function(o,p,q,r){ return element("tr",o,[this].concat(p),q,r); },{$:{
expansionElement:"td",expansionMethod:"cell",
appendCell:tbody.prototype.$.appendRow,
cell:table.prototype.$.body,
firstCell:function(o,p,q,r){ return this.cell(0,o,p,q,r); },
lastCell:function(o,p,q,r){ var i = this.el.childNodes.length; return this.cell(i?i-1:0,o,p,q,r); },
prependCell:tbody.prototype.$.prependRow
}});

createClass("td",function(o,p,q,r,s){ var me = element("td",o,[this].concat(p),q,r); if(s)me.$.setImage(s); return me; },{$:{
clear:function(){ var o=this.el; while(o.firstChild) o.removeChild(o.firstChild); },
setBackground:table.prototype.$.setBackground,
setImage:function(s,o,p){ this.clear(); var q=this.el; q.style.textAlign="center"; return q.appendChild(element("img",o,p,null,{src:s})); },
setSprite:function(s,i,j,k,l){ this.clear(); return this.el.appendChild(element("div",{background:"url("+s+") no-repeat "+i+"px "+j+"px",margin:"auto",width:k+"px",height:l+"px"})); }
}});
