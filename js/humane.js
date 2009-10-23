var Humane = {}

// Humane.Central is the object which exposes all Humane internals via functions and atributes
Humane.Central = function(object) {
  this.object = object
  this.it = this
  this.is_clicked = new Humane.EventHandler(this, object, 'click')
  this.is_focused = new Humane.EventHandler(this, object, 'focus')
  this.is_hovered = new Humane.EventHandler(this, object, 'mouseover')
  this.is_dehovered = new Humane.EventHandler(this, object, 'mouseout')
}

Humane.Ajax = {}
Humane.Ajax.Request = function(url, target) {
  this._url    = url;
  this._target = target;
  this._callbacks = { 'success': [] }
  this.call = function() {
    var self = this;
    new Ajax.Request(this._url, {
       method: 'get',
       onSuccess: function(transport) {
         if (self._target) self._target.update(transport.responseText)
         if (self.callbacks['success'].length > 0) {
           self.callbacks['success'].each(function(call) { call(); })
         }
       }
     });
  }
}

Humane.Ajax.Callbacks = {}
Humane.Ajax.Callbacks.Success = function(handler) {
  this.handler = handler;
  this.alert = function(msg) {
    alert(msg);
    return this.handler
  }
}
// Humane.EventHandler handles events
Humane.EventHandler = function(master, element, type) {
  // ajax handlers
  this.on_success = new Humane.Ajax.Callbacks.Success(this);
  this.master = master;
  this.element = element;
  this.type = type;
  this.and = this;
  this.it = this;
  this.when = master;
  this._ajax_requests = []
  this._last_request = function() {
    return this._ajax_requests[this._ajax_requests.length - 1]
  }
  this.release_event = function(event_type) {
    var self = this
    return this.attach(function() { Event.stopObserving(self.element, event_type); })
  }
  this.release_hovers = function() { return this.release_event('mouseover') }
  this.release_clicks = function() { return this.release_event('click') }
  this.release = function() { return this.release_event(null) }
  this.attach = function(call) {
    if (this.element.constructor === Array) {
      var self  = this
      this.element.each(function(el) {
        Event.observe(el, self.type, call);
      })
    } else {
      Event.observe(this.element, this.type, call);
    }
    return this;          
  }
  this._store_original = function(key) {
    if (!this.element._originals) { this.element._originals = []; } 
    if (!this.element._originals[key]) { this.element._originals[key] = this.element[key] }
  }
  this._get_original = function(key) {
    return this.element._originals[key]
  }
  this.alert = function(msg) { 
    return this.attach(function() { alert(msg); }) 
  };
  this.stop = function() { 
    return this.attach(function(e) { e.stop() }) 
  };
  this.call = function(call) { 
    return this.attach(call) 
  };
  this.hide = function(call) { 
    return this.send('hide') 
  };
  this.show = function(call) { 
    return this.send('show') 
  };
  this.restore_original_src = function() {
    return this.restore_original('src')
  }
  this.src = function(new_src) {
    return this.attr('src', new_src)
  }
  this.attr = function(attr_name, attr_value) {
    this._store_original(attr_name)
    var self = this
    return this.attach(function() { self.element[attr_name] = attr_value })
  };
  this.restore_original = function(attr_name) {
    var self = this
    return this.attach(function() { 
      attr_value = self._get_original(attr_name)
      if (attr_value) { self.element[attr_name] = attr_value; }
    })
  }
  this.change_content_to = function(content) { 
    this._store_original('innerHTML')
    var that = this
    return this.attach(function() { 
      return_val = content
      if (typeof(content) == 'function') { return_val = content(this.element) }
      that.element.update(return_val) 
    })
  };
  this.update_with = this.change_content_to
  this.restore_original_content = function() {
    return this.restore_original('innerHTML')
  }
  this.fetch = function(url) { 
    var that = this
    var request = new Humane.Ajax.Request(url, this.element)
    this._ajax_requests.push(request)
    return this.attach(function() { request.call(); })
  };
  this.into = function(target) {
    var req = this._last_request()
    if (req) req._target = $(target)
    return this;
  }
  this.send = function(method) { 
    var that = this
    return this.attach(function() { this[method]() }) 
  };
}
// EventHandler.prototype.do = function(callback) { Event.observe(this.element, this.type, callback); }
function when(id) {
  object = $$(id);
  if (object.constructor === Array && object.length == 1) { object = object[0]; }
  if (!object) { return null; }
  return new Humane.Central(object)
}



//
// when('img').is_hovered.hide()
// when('img').is_dehovered.show()
// when('#logo_img').is_hovered.src('/images/default_photo.png').when.is_dehovered.restore_original_src()
// when('#boo').is_dehovered.update_with('dehovered').and.when.is_hovered.update_with('hovered').and.when.is_clicked.change_content_to('Loading').and.fetch('/robots.txt').and.release() 
// when('#minisearch').is_focused.release().when.is_hovered.alert('foo')
//