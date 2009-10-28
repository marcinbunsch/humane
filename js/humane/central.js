// Humane.Central is the object which exposes all Humane internals via functions and atributes
Humane.Central = function(object) {
  this.klass = 'Humane.Central'
  // elements
  this.object = object
  this.it = this
  // helper methods
  this.get_handler = function(event) { if (event) { return new Humane.Handler(this, object, event); } }
  // init
  this.changes = this.get_handler('change');
  this.is_sent = this.get_handler('submit');
  this.is_clicked =  this.get_handler('click');
  this.is_focused = this.get_handler('focus');
  this.is_hovered = this.get_handler('mouseover');
  this.is_dehovered = this.get_handler('mouseout');
  this.the_request_succeeds = this.get_handler('ajax:success')
  this.the_request_fails = this.get_handler('ajax:failure')
  
}
