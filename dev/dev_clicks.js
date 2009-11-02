Event.observe($(window), 'load', function() {
  
// When I hover '#clickable'
// It should change content to 'hovered'
// When I dehover it 
// It should change content to original
take('clickable').add_content_flip('Hovered')

// When I hover '#clickable2'
// It should change content to "C'mon, click me"
// When I dehover it 
// It should change content to original
take('clickable2').add_content_flip("C'mon, click me")

// When I click 'clickable'
// Update the status div with 'Fetching...'
// Load '/dev/ajax.txt' into 'result' div
// And prevent the browser from adding a '#' to the url
// When the request goes ok
// Show a box which says 'Request went ok!'    
// And update the status div with 'Success!'
// When the request fails, 
// Show a box which says 'Failed'
// And update the status div with 'Failed!'

// When I click 'clickable'
when('#clickable').is_clicked.
  // Update the status div with 'Fetching...'
  update('request_result', 'Fetching...').
  // Load '/dev/ajax.txt' into 'result' div
  fetch('/dev/ajax.txt').into('result').
  // And prevent the browser from adding a '#' to the url
  and.stop().
    // When the request goes ok
    when.the_request_succeeds.
      // Show a box which says 'Request went ok!'    
      alert('Request went ok!').and.
      // And update the status div with 'Success!'
      update('request_result', 'Success').         
    // When the request fails, 
    when.the_request_fails.
      // Show a box which says 'Failed'
      alert('Failed').
      // And update the status div with 'Failed!'
      update('request_result', 'Failed!')


// When I click '#clickable'
when('#clickable2').is_clicked.
  // Let the user know that we're making a request
  update('request_result', 'Fetching...').
  // make a request for a url that is not there
  get('nonexistingurl').
  // do not follow the link that caused the event
  and.stop().
    // it will throw an error
    when.the_request_fails.
      // And we handle it with a helpful message
      alert('boo').
      // Let the user know it failed        
      update('request_result', 'Failed!')

});