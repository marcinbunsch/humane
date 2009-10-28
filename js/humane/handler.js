// Humane.Handler handles events
Humane.Handler = function(central, element, type) {
  this.klass = 'Humane.Handler'
  // attributes which hold elements
  this._master =  central;
  this._element = element;
  this._type = type;
  // natural language joiners 
  this.and = this;
  this.it = this;
  this.when = central;
  this.attach_ajax = function(call) {
    var req = this._last_request()
    var event_name = this._type.replace(/^ajax:/, '')
    if (req && req._callbacks[event_name]) {
      req._callbacks[event_name].push(call)
    }
    return this;
  }
  // base event handling
  this.attach = function(call) {
    if (this._type.match(/^ajax:/)) {
      return this.attach_ajax(call)
    }
    if (this._element.constructor === Array) {
      var self  = this
      this._element.each(function(el) {
        Event.observe(el, self._type, call);
      })
    } else {
      Event.observe(this._element, this._type, call);
    }
    return this;          
  }
  this.release_event = function(event_type) {
    var self = this
    return this.attach(function() { Event.stopObserving(self._element, event_type); })
  }
  this.release_hovers = function() { return this.release_event('mouseover') }
  this.release_clicks = function() { return this.release_event('click') }
  this.release = function() { return this.release_event(null) }
}

// This method allows the methods to be included from modules
Humane.Handler.include =  function(hash) {
  for (key in hash) { this.prototype[key] = hash[key]; }
}

