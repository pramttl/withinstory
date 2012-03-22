//Get API Key
$.ajax({
    url: '/getapikey/',
    success: function(data) {
        auth = {'headers': {'Authorization': 'ApiKey ' + data}};
        username = data.split(':')[0];
        useruri = _.find(app.userCollection.models, function(model){
            if (model.get('username') == username){
                return true;
            }
            else {
                return false;
            }
        }).get('resource_uri');
        $('#login').html('<a href="/logout/">Logout</a>');
    },
    error: function(data, error, response) {
        if (response == 'FORBIDDEN') {
            $('#login').html('<a href="/login/">Login</a>');
        }
        else {
            $('#login').html('<a href="/logout/">Logout</a>');
            alert('There was an error while retrieving your API Key');
        }
    }
});
