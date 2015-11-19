/**
 * Created by juice on 11/19/15.
 */

define(['jquery',
        'underscore',
        'backbone'], function ($, _, Backbone) {

    var NewVehicleView = Backbone.View.extend({

        bus: undefined,

        initialize: function (options) {
            this.bus = options.bus;
            this.bus.on('add-confirmation', this.addConfirmed, this);
        },

        events: {
            'click button': 'handleAdd'
        },

        render: function () {
            var source = $('#new-vehicle-template').html();
            var template = _.template(source);
            this.$el.html(template());
            return this;
        },

        handleAdd: function () {
            var vehicle = this.$el.find('#new-vehicle-entry').val();
            console.log('The value of the new vehicle is: ', vehicle);
            this.bus.trigger('new-vehicle', vehicle);
        },

        addConfirmed: function () {
            //clear out the textbox
            this.$el.find('#new-vehicle-entry').val('');
        }
    });

    return NewVehicleView;
});
