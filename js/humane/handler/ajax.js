Humane.Handler.Ajax = {
  _ajax_requests: [],
  _ensure_request_registry: function() {
    if (!this._element._ajax_requests) this._element._ajax_requests = []
  },
  _last_request: function() {
    this._ensure_request_registry()
    return this._element._ajax_requests[this._element._ajax_requests.length - 1]
  },
  fetch: function(url) { 
    this._ensure_request_registry()
    var that = this;
    var request = new Humane.Ajax.Request(url, this._element);
    this._element._ajax_requests.push(request);
    return this.attach(function() { request.call(); });
  },
  get: function(url) { 
    this._ensure_request_registry()
    var that = this;
    var request = new Humane.Ajax.Request(url);
    this._element._ajax_requests.push(request);
    return this.attach(function() { request.call(); });
  },
  into: function(target) {
    this._ensure_request_registry()
    var req = this._last_request();
    if (req) req._target = $(target);
    return this;
  }
}
//Humane.Handler.Ajax.on = {
//  success: Humane.Handler.Ajax.on_ajax_success;
//}
Humane.Handler.include(Humane.Handler.Ajax);

