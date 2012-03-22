
// Fragmented URIs - Backbone Routers:
var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'start',
        '/story/new/': 'newStory',
        '/story/:id/': 'story'
    },
    newStory: function() {
        this.newStoryView = new StoryDetailView({'model': new Story()});
        $('#content').html(this.newStoryView.render().el);
    },
    setup: function(callback, obj) {
        if (this.storyCollection && this.userCollection) {
            if (callback) callback(obj);
        }
        else {
            // TODO: Refactoring to accomodate arbit collection fetch async
            this.storyCollection = new StoryCollection();
            this.userCollection = new UserCollection();
            this.userCollection.fetch({
                'async': false
            });
            this.storyCollection.fetch({
                'success': function() {
                    if (callback) {
                        callback(obj);
                    }
                }
            });
        }
    },
    start: function() {
        this.setup(function(obj){
            obj.storyListView = new StoryListView({collection: obj.storyCollection});
            $('#content').html(obj.storyListView.render().el);
        }, this);
    },
    story: function(id) {
        this.setup(function(obj){
            var model = _.find(obj.storyCollection.models, function(model){
                if (model.id == id) {
                    return true;
                }
                else {
                    return false;
                }
            });
            if (model) {
                $('#content').html(new StoryDetailView({model: model}).render().el);
            }
        }, this);
    }
});
var app = new AppRouter();
Backbone.history.start();
