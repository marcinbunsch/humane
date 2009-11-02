var Humane = {}

function when(id) {
  object = $$(id);
  if (object.constructor !== Array) { object = [object]; }
  if (!object) { return null; }
  // create one central per object
  if (!object._humane_central) object._humane_central = new Humane.Central(object);
  return object._humane_central;
}

function take(id) {
  object = $(id)
  if (!object) return null;
  if (!object._humane_shortcuts) object._humane_shortcuts = new Humane.Shortcuts(object);
  return object._humane_shortcuts;
}
//when(something). is_clicked.change_content_to('Loading').and.fetch('/robots.txt').into('result').and.release() 

//
// when('img').is_hovered.hide()
// when('img').is_dehovered.show()
// when('#logo_img').is_hovered.src('/images/default_photo.png').when.is_dehovered.restore_original_src()
// when('#boo').is_dehovered.update_with('dehovered').and.when.is_hovered.update_with('hovered').and.when.is_clicked.change_content_to('Loading').and.fetch('/robots.txt').and.release() 
// when('#minisearch').is_focused.release().when.is_hovered.alert('foo')
//
// Humane.Central -> Humane.EventHandler