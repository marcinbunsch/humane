var Humane = {}

function when(id) {
  object = $$(id);
  if (object.constructor === Array && object.length == 1) { object = object[0]; }
  if (!object) { return null; }
  // create one central per object
  if (!object._humane_central) object._humane_central = new Humane.Central(object);
  return object._humane_central;
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