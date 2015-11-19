/**
 * Created by juice on 11/19/15.
 */

define(['underscore',
        'backbone'], function(_, Backbone) {

    var Vehicle = Backbone.Model.extend({
        //urlRoot: 'https://agile-sea-9448.herokuapp.com/api/vehicles',

        defaults: {
            "deleteFlag": false
        },

        validate: function (attrs) {
            if (_.isUndefined(attrs.registrationNumber) ||
                _.isNull(attrs.registrationNumber)) {
                return 'Registration Number is required and cannot be null';
            }
        },

        start: function () {
            console.log('Vehicle Started');
        },

        logicalDelete: function () {
            this.set('deleteFlag', true);
            this.trigger('destroy', this);
        }
    });

    return Vehicle;
});

