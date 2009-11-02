Humane.Ajax = {}
Humane.Ajax.Request = function(url, caller_element) {
  this.klass = 'Humane.Ajax.Request'
  this._url    = url;
  this._callbacks = { 'success': [], 'failure': [], 'complete': [] }
  this._request = null;
  this._element = caller_element;
  this._target = caller_element;
  this.success = function(callback) {
    this._callbacks['success'].push(callback)
    return this;
  };
  this.failure = function(callback) {
    this._callbacks['failure'].push(callback)
    return this;
  };
  this._run_callbacks = function(type, transport) {
    if (this._callbacks[type].length > 0) { 
      var self = this;
      this._callbacks[type].each(function(call) { 
        var temp_func_name = '_ahdoc_' + type + '_callback_' + Math.round(Math.random() * 100000)
        self[temp_func_name] = call; self[temp_func_name](transport); self[temp_func_name] = null;
      });
    }
  };
  this.call = function(url, method, parameters) {
    var self = this;
    this._request = new Ajax.Request(this._url, {
       method: method,
       parameters: parameters,
       onComplete: function(transport) { self._run_callbacks('complete', transport); },
       onSuccess: function(transport) { self._run_callbacks('success', transport); },
       onFailure: function(transport) { self._run_callbacks('failure', transport); }
    });
    return this;
  }
  this.get = function() {
    var self = this;
    return this.call(this._url, 'get');
  },
  this.post = function(data) {
    var self = this;
    var serialized = $(this._element.id).serialize()
    return this.call(this._url, 'post', serialized);
  }
}