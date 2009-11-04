Humane.Handler.Ajax = {
  _ajax_requests: [],
  _ensure_request_registry: function() {
//    if (!this._element._ajax_requests) this._element._ajax_requests = []
  },
  _last_request: function() {
//    this._ensure_request_registry()
  //  return this._element._ajax_requests[this._element._ajax_requests.length - 1]
  },
  fetch: function(url) { 
    this.get(url);
    var self = this;
    return this.each(function() { 
      this._humane_ajax_queue.last().success(function(response) {
        self._update(this._target, response.responseText)
      })
    });
  },
  get: function(url) { 
    var self = this;
    var request_id = 'request_' + Math.random().toString();
    this.each(function() { 
      if (!this._humane_ajax_requests) this._humane_ajax_requests = {}
      if (!this._humane_ajax_queue) this._humane_ajax_queue = []
      // request_id
      this[request_id] = new Humane.Ajax.Request(url, this);
      this._humane_ajax_queue.push(this[request_id])
    });
    return this.attach(function() { this[request_id].get(); });
  },
  into: function(target) {
    return this.each(function() { 
      this._humane_ajax_queue.last()._target = $$(target)
    });
  }
}
// Aliases
Humane.Handler.Ajax.put_response_in = Humane.Handler.Ajax.into

Humane.Handler.include(Humane.Handler.Ajax);

