Humane.Handler = function(central, collection, type) {
  this.klass = 'Humane.Handler'
  // private
  this._central = central;
  this._collection = collection;
  this._type = type;
  // natural language joiners
  this.and  = this;
  this.it   = this;
  this.when = central;
  this._is_function = function(object) { return typeof(object) == 'function'; };
  this._is_string = function(object) { return typeof(object) == 'string'; };
  this.attach = function(call) {
    if (this._type.match(/^ajax:/)) return this.attach_ajax(call)
    var self  = this;
    this._collection.invoke(function(el) {
      Event.observe(el, self._type, call);
    })
    return this;          
  };
  this.attach_ajax = function(call) {
    var event_name = this._type.replace(/^ajax:/, '')
    return this.each(function() { 
      var last = this._humane_ajax_queue.last()
      if (last && last[event_name]) last[event_name](call)
      
    });
  }
  this.each = function(call) {
    var self  = this;
    this._collection.invoke(function(el) {
      el._adhoc_each_callback = call;
      el._adhoc_each_callback();
      el._adhoc_each_callback = null;
    })
    return this;          
  };
  // attr
  this._update = function(update_selector_or_content, content) {
    var self = this
    if (update_selector_or_content.constructor === Array) {
      update_selector_or_content.each(function(item) {
        item.update(content)
      });
    } else if (typeof(update_selector_or_content) == 'object') {
      var item = update_selector_or_content
      if (!item._originals) item._originals = {};
      if (!item._originals.innerHTML) item._originals.innerHTML = item.innerHTML;
      var return_val = content
      if (self._is_function(content)) return_val = content(item)
      $(update_selector_or_content).update(return_val)
    } 
  };
  this.update = function(selector_or_content, content) {
    var self = this;
    return this.attach(function() {
      // content not specified, it can be found in selector_or_content, apply it to subject
      if (!content) {
        var selector_or_content_for_item = $(this);
        var content_for_item = selector_or_content;
      } else {
      // content and selector specified, use supplied selector
        var selector_or_content_for_item = $$(selector_or_content);
        var content_for_item = content;
      }
      self._update(selector_or_content_for_item, content_for_item);
    });
  };
  this.restore = function() {
    return this.attach(function() {
      if (this._originals) {
        this.update(this._originals.innerHTML);
      }
    });
  };
  this.alert = function(message) {
    return this.attach(function() { alert(message) });
  };
  this.stop = function() {
    return this.attach(function(e) { e.stop() }) 
  };
  this.call = function(func_name_or_func) {
    if (this._is_function(func_name_or_func)) {
      this.attach(function() { func_name_or_func(this); });
    } else {
      this.attach(function() { this[func_name_or_func](); });
    }
    return this;
  };
  this.release_event = function(event_type) {
    return this.attach(function() { Event.stopObserving(this, event_type); })
  };
  this.release_hovers = function() { return this.release_event('mouseover') };
  this.release_clicks = function() { return this.release_event('click') };
  this.release = function() { return this.release_event(null) };
}
/*
// Humane.Handler handles events
Humane.Handler = function(central, collection, type) {
  this.klass = 'Humane.Handler'
  // attributes which hold elements
  this._master =  central;
  this._element = collection;
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
*/
// This method allows the methods to be included from modules
Humane.Handler.include =  function(hash) {
  for (key in hash) { this.prototype[key] = hash[key]; }
}

