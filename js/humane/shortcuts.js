// Humane.Shortcuts is a central for frequently used patterns in Humane, built using the take(id) command
Humane.Shortcuts = function(element) {
  this._element = element;
  this.add_content_flip = function(flipped_content) {
    when('#' + this._element.id).is_hovered.update(flipped_content).when.is_dehovered.restore()
  }
}