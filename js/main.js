
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.


/********************
 *
 * View objects
 ****************/


var eventBus = _.extend({}, Backbone.Events);

/* Start Application Logic */

var vehicles = new Vehicles([
    {registrationNumber: '9459485', id:'1', color: 'red'},
    {registrationNumber: '9459486', id:'2', color: 'blue'},
    {registrationNumber: '9459487', id:'3', color: 'white'},
    {registrationNumber: '9459488', id:'4', color: 'purple'}
]);

var vehiclesView = new VehiclesView({
    model: vehicles,
    bus: eventBus
});

var newVehicleView = new NewVehicleView({
    bus: eventBus
});

$('#app-container').append(newVehicleView.render().$el);
$('#vehicles').html(vehiclesView.render().$el);
