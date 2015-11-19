/**
 * Created by juice on 11/19/15.
 */

define(['jquery',
        'underscore',
        'backbone',
        'collections/vehicles',
        'models/vehicle',
        'views/vehicleView'
        ], function ($, _, Backbone, Vehicles, Vehicle, VehicleView) {

    var VehiclesView = Backbone.View.extend({
        tagName: 'ul',

        bus: undefined,

        initialize: function (options) {
            this.model.on('remove', this.removeHandler, this);
            this.bus = options.bus;
            this.bus.on('new-vehicle', this.addVehicle, this);
        },

        render: function () {
            this.model.each(function (vehicle) {
                var vehicleView = new VehicleView({
                    model: vehicle
                });

                this.$el.append(vehicleView.render().$el);
            }, this);

            return this;
        },

        addVehicle: function (registrationNumber) {
            var newVehicle = new Vehicle({
                id: Date.now(),
                registrationNumber: registrationNumber
            });

            this.model.add(newVehicle,
                {
                    at: 0
                });
            console.log('Add vehicle method called with reg number: ',
                registrationNumber);
            //Add to the DOM
            this.$el.prepend(new VehicleView({model: newVehicle}).render().$el);

            //trigger an event that the vehicle was added
            this.bus.trigger('add-confirmation');
        },

        removeHandler: function (vehicleModel) {
            //Get rid of it
            console.log('remove handler was called on the VehiclesView');
            this.$el.find('#' + vehicleModel.get('id')).remove();
        }

    });

    return VehiclesView;
})

