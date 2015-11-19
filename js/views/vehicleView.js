/**
 * Created by juice on 11/19/15.
 */

var VehicleView = Backbone.View.extend({
    tagName: 'li',
    className: 'vehicle',

    events: {
        'click button' : 'deleteHandler'
    },

    attributes: function () {
        return {
            'data-color': this.model.get('color'),
            'id': this.model.get('id')
        };
    },

    render: function () {
        //fetch the vehicle-template
        var source = $('#vehicle-template').html();
        var template = _.template(source);

        this.$el.html(template(this.model.toJSON()));

        return this;
    },

    deleteHandler: function () {
        console.log('Delete Handler was called for model with id: ',
            this.model.get('id'));
        //Call the logical delete method to signal that the model is gone.
        this.model.logicalDelete();
    }
});
