/**
 * Created by juice on 11/19/15.
 */

define(['underscore',
    'backbone',
    'models/vehicle'], function (_, Backbone, Vehicle) {

    var Vehicles = Backbone.Collection.extend({
        model: Vehicle,
    });

    return Vehicles;
});
