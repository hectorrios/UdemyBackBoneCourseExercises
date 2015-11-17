
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

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

var Vehicles = Backbone.Collection.extend({
    model: Vehicle,
});

var Car = Vehicle.extend();

var Cars = Vehicles.extend();

var Boat = Vehicle.extend();

var Boats = Vehicles.extend();


/********************
 *
 * View objects
 ****************/


var eventBus = _.extend({}, Backbone.Events);

var HomeView = Backbone.View.extend({
    render: function () {
        var source = $('#home-template').html();
        var template = _.template(source);

        this.$el.html(template());

        return this;
    }
});

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

var CarView = Backbone.View.extend({
    tagName: 'li',

    render: function () {
        var source = $('#car-template').html();
        var template = _.template(source);

        this.$el.html(template(this.model.toJSON()));

        return this;
    }
});

var CarsView = Backbone.View.extend({
    tagName: 'ul',

    render: function () {
        if (this.model) {
            this.model.each(function (car) {
                var carView = new CarView({
                    model: car
                });

                this.$el.append(carView.render().$el);

            }, this);
        }

        return this;
    }
});

var BoatView = Backbone.View.extend({

    tagName: 'li',

    render: function () {
        var source = $('#boat-template').html();
        var template = _.template(source);

        this.$el.html(template(this.model.toJSON()));

        return this;
    }
});

var BoatsView = Backbone.View.extend({
    tagName: 'ul',

    render: function () {
        this.model.each(function (model) {
            var boatView = new BoatView({
                model: model
            });

            this.$el.append(boatView.render().$el);
        }, this);

        return this;
    }
});

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

/* Start Application Logic */


//var vehicles = new Vehicles([
//    {registrationNumber: '9459485', id:'1', color: 'red'},
//    {registrationNumber: '9459486', id:'2', color: 'blue'},
//    {registrationNumber: '9459487', id:'3', color: 'white'},
//    {registrationNumber: '9459488', id:'4', color: 'purple'}
//]);
//
//var vehiclesView = new VehiclesView({
//    model: vehicles,
//    bus: eventBus
//});
//
//var newVehicleView = new NewVehicleView({
//    bus: eventBus
//});
//
//var cars = new Cars([
//    {registrationNumber: '9459485', id:'1', color: 'pink'},
//    {registrationNumber: '9459486', id:'2', color: 'cyan'}
//]);

//$('#app-container').append(newVehicleView.render().$el);
//$('#vehicles').html(vehiclesView.render().$el);


var cars = new Cars([
    {registrationNumber: '9459485', id:'1', color: 'red'},
    {registrationNumber: '9459486', id:'2', color: 'blue'},
    {registrationNumber: '9459487', id:'3', color: 'white'},
    {registrationNumber: '9459488', id:'4', color: 'purple'}
]);

var boats = new Boats([
    {registrationNumber: '00001', id:'6', color: 'yellow'},
    {registrationNumber: '00002', id:'7', color: 'pink'},
    {registrationNumber: '00003', id:'8', color: 'white'},
    {registrationNumber: '00004', id:'9', color: 'black'}
]);

//Define the router
var AppRouter = Backbone.Router.extend({
    routes: {
        "home": "showHome",
        "cars": "showCars",
        "boats": "showBoats"
    },

    showHome: function () {
        $('#app-container').empty();
        console.log('show home route called');
        var homeView = new HomeView();
        $('#app-container').append(homeView.render().$el);
    },

    showCars: function () {
        $('#app-container').empty();
        var carsView = new CarsView({
            model: cars
        });

        $('#app-container').append(carsView.render().$el);
    },

    showBoats: function () {
        $('#app-container').empty();
        var boatsView = new BoatsView({
            model: boats
        });

        $('#app-container').append(boatsView.render().$el);
    }
});

var router = new AppRouter();

//Tell Backbone to start monitoring address changes
Backbone.history.start();