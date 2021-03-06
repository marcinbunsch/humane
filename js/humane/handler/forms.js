Humane.Handler.Forms = {
  preload: function(selector, options) {
    var preload_opts = { content: 'Loading...' }
    var type = typeof(options)
    if (type == 'string') {
      preload_opts.text = options 
    } else if (type == 'object') {
      preload_opts = options 
    }
    var preload_html = ''
    preload_html = '<span class="preloader">'
    if (preload_opts.image) preload_html += '<img src="' + preload_opts.image + '" class="preloader_image" alt="' + preload_opts.text + '" />'
    if (preload_opts.text) preload_html += '<span class="label">' + preload_opts.text + '</span>'
    preload_html += '</span>'
    var self = this
    return this.attach(function() { 
      self._update(selector, preload_html)
    })
  },
  post: function(url) { 
    var self = this;
    var request_id = 'request_' + Math.random().toString();
    this.each(function() { 
      if (!this._humane_ajax_requests) this._humane_ajax_requests = {};
      if (!this._humane_ajax_queue) this._humane_ajax_queue = [];
      // request_id
      this[request_id] = new Humane.Ajax.Request(url, this).success(function(response) {
        self._update(this._target, response.responseText)
      });
      this._humane_ajax_queue.push(this[request_id]);
    });
    return this.attach(function() { this[request_id].post(); });
  }
}

Humane.Handler.include(Humane.Handler.Forms);