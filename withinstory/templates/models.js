// Models & Collections:

window.User = Backbone.Model.extend({
    urlRoot: apiUrl + 'userprofile/'
});

window.UserCollection = Backbone.Collection.extend({
    model: User,
    url: apiUrl + 'userprofile/',
    parse: function(response){
        return response.objects;
    }
});

window.Story = Backbone.Model.extend({
    urlRoot: apiUrl + 'story/',
    defaults: {
        'id': null,
        'title': 'Story Title',
        'introduction': 'Introduction',
        'body': 'Body of Story'
    }
});

window.StoryCollection = Backbone.Collection.extend({
    model: Story,
    url: apiUrl + 'story/',
    parse: function(response){
        return response.objects;
    }
});
