Humane.Handler.Attributes = {
  // attributes
  _store_original: function(key) {
    if (!this._element._originals) { this._element._originals = []; } 
    if (!this._element._originals[key]) { this._element._originals[key] = this._element[key]; }
  },
  _get_original: function(key) {    
    return this._element._originals[key]
  },
  attr: function(attr_name, attr_value) {
    this._store_original(attr_name)
    var self = this
    return this.attach(function() { self._element[attr_name] = attr_value })
  },
  restore_original: function(attr_name) {
    var self = this
    return this.attach(function() {           
      attr_value = self._get_original(attr_name);
      if (attr_value) { self._element[attr_name] = attr_value; }
    })
  },  
  // manipulation
  change_content_to: function(content) { 
    this._store_original('innerHTML')
    var that = this
    that._element.invoke(function(item) {    
      that.attach(function() { 
        return_val = content
        if (typeof(content) == 'function') { return_val = content(item) }
        item.update(return_val)   
      })
    });
    return this;
  },
  change_content_of_to: function(id, content) { 
    return this.attach(function() { 
      var element = $(id)
      return_val = content
      if (typeof(content) == 'function') { return_val = content(element) }
      element.update(return_val) 
    })
  },
  update: function(id_or_content, content) {
    return (content ? this.change_content_of_to(id_or_content, content) : this.change_content_to(id_or_content))
  },
  restore_original_content: function() { return this.restore_original('innerHTML') },
  revert: function() { return this.restore_original('innerHTML') },
  restore_original_src: function() { return this.restore_original('src') },
  src: function(new_src) { return this.attr('src', new_src)  }
}

Humane.Handler.include(Humane.Handler.Attributes);


