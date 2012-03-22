// Views:
window.StoryDetailView = Backbone.View.extend({
    template: '<input type="hidden" id="id" value="<%= id %>">' + 
              '<input type="text" id="title" value="<%= title %>">' +
              '<br><input type="text" id="introduction" value="<%= introduction %>"><br>' +
              '<textarea id="body"><%= body %></textarea>' +
              '<br><button class="save">Save</button>',
    events: {
        'click .save': 'saveStory'
    },
    saveStory: function() {
        this.model.set({
            'title': $('#title').val(),
            'introduction': $('#introduction').val(),
            'body': $('#body').val()
        });
        this.model.save({'author': useruri}, {
            'headers': auth.headers,
            'success': function() {
                alert('Story successfully saved.');
            }
        });
    },
    render: function() {
        $(this.el).html(_.template(this.template, this.model.toJSON()));
        return this;
    }
});

window.StoryListItemView = Backbone.View.extend({
    tagName: 'li',
    events: {
        'click .delete': 'deleteStory'
    },
    template: '<a href="#/story/<%= id %>/"><%= title %></a>' + 
              '<span class="delete">Delete</span>',
    render: function() {
        $(this.el).html(_.template(this.template, this.model.toJSON()));
        return this;
    },
    deleteStory: function() {
        this.model.destroy({
            'success': function (){
                alert('Story deleted successfully');
                window.location = '/';
            },
            'error': function (){
                alert('You are not the author of this story.')
            },
            'headers': auth.headers
        });
    }
});

window.StoryListView = Backbone.View.extend({
    tagName: 'ul',
    render: function() {
        $(this.el).html('');
        _.each(this.collection.models, function(model){
            $(this.el).append(new StoryListItemView({'model': model}).render().el);
        }, this);
        return this;
    }
});

