Element.prototype.prepend = function(content) { new Insertion.Before(this, content); };
[String, Function, Number, Array].each(function(klass) {
  klass.prototype.is_a = function(type) { return this.constructor === type; };
});
String.prototype.first = function(type) { return this[0]; };