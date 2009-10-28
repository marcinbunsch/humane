Humane.Ajax = {}
Humane.Ajax.Request = function(url, target) {
  this.klass = 'Humane.Ajax.Request'
  this._url    = url;
  this._target = target;
  this._callbacks = { 'success': [], 'failure': [] }
  this._request = null;
  this.call = function() {
    var self = this;
    this._request = new Ajax.Request(this._url, {
       method: 'get',
       onSuccess: function(transport) {
         if (self._target) self._target.update(transport.responseText)
         if (self._callbacks['success'].length > 0) {
           self._callbacks['success'].each(function(call) { call(transport); })
         }
       },
       onFailure: function(transport) {
         if (self._callbacks['failure'].length > 0) {
           self._callbacks['failure'].each(function(call) { call(transport); })
         }
       }
     });
  }
}