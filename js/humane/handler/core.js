Humane.Handler.Core = {
  // core
  alert: function(msg) { 
    return this.attach(function() { alert(msg); }) 
  },
  stop: function() { 
    return this.attach(function(e) { e.stop() }) 
  },
  call: function(call) { 
    return this.attach(call) 
  },
  send: function(method) { 
    var that = this
    return this.attach(function() { this[method]() }) 
  }
}

Humane.Handler.include(Humane.Handler.Core);

