Event.observe($(window), 'load', function() {

  when('#example_search_form').is_sent.
    stop().and.preload('#results', { image: '/dev/loader-ccc-on-333.gif', text: 'You wait, we load'}).
    post('/searches').into('#results').
    when.the_request_fails.
      update('#results', 'Failed to get search results')
    
});