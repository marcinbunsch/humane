Humane.Handler.Effects = {
  hide: function(call) { 
    return this.send('hide') 
  },
  show: function(call) { 
    return this.send('show') 
  }
}

Humane.Handler.include(Humane.Handler.Effects);