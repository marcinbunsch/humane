Humane.Collection = function(collection) {
  this.klass = 'Humane.Collection'
  this._collection = collection
  this.invoke = function(function_or_method) {
    for (var i = this._collection.length - 1; i >= 0; i--){
      if (typeof(function_or_method)) {
        function_or_method(this._collection[i]);
      } else {
        this._collection[i][function_or_method]();
      }
    };
  }
};
