Humane.Ajax.Callbacks = {}
Humane.Ajax.Callbacks.Success = function(handler) {
  this.handler = handler;
  this.meanwhile = handler;
  this.alert = function(msg) {
    return this.handler 
  }
}