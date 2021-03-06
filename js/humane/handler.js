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
  this._is_function = function(object) { return object.is_a(Function); };
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
  // modify the contents of an element
  this._modify = function(method, update_selector_or_content, content) {
    var self = this
    
    var return_val = content
    if (content.is_a(Function)) return_val = content(item)
    
    if (typeof(update_selector_or_content) == 'string') {
      update_selector_or_content = $$(update_selector_or_content)
    }
    
    if (update_selector_or_content.constructor === Array) {
      update_selector_or_content.each(function(item) {
        item[method](return_val)
      });
    } else if (typeof(update_selector_or_content) == 'object') {
      var item = update_selector_or_content
      if (!item._originals) item._originals = {};
      if (!item._originals.innerHTML) item._originals.innerHTML = item.innerHTML;
      
      $(update_selector_or_content)[method](return_val)
    }
  };
  // add an event handler which modifies the content of an element when an event occurs
  this.modify = function(method, selector_or_content, content) {
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
      self['_' + method](selector_or_content_for_item, content_for_item);
    });
  };
  // this creates 6 methods: update, insert, prepend and _update, _insert, _prepend
  var self = this;
  ['update', 'insert', 'prepend'].each(function(method) {
    self[method] = function(selector_or_content, content) { return this.modify(method, selector_or_content, content); }
    self['_' + method] = function(selector_or_content, content) { return this._modify(method, selector_or_content, content); }
  });
  // restore the element to the original content
  this.restore = function() {
    return this.attach(function() {
      if (this._originals) {
        this.update(this._originals.innerHTML);
      }
    });
  };
  // fire an alert
  this.alert = function(message) {
    return this.attach(function() { alert(message) });
  };
  // stop event propagation
  this.stop = function() {
    return this.attach(function(e) { e.stop() }) 
  };
  // call an anonymous function or a method of an object it is present in an object
  this.call = function(func_name_or_func) {
    if (func_name_or_func.is_a(Function)) {
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

// This method allows the methods to be included from modules
Humane.Handler.include =  function(hash) {
  for (key in hash) { this.prototype[key] = hash[key]; }
}

