angular.module('myApp', ['ngRoute']);

// app.config(['$routeProvider', function($routeProvider) {
//     $routeProvider.
//     when('/showBikeModels', {
//         templateUrl: 'partials/show_models.html',
//         controller: 'ShowModelsController',
//         modelType: 'BIKE'
//     }).
//     when('/showCarModels', {
//         templateUrl: 'partials/show_models.html',
//         controller: 'ShowModelsController',
//         modelType: 'CAR'
//     }).
//     when('/addOrder', {
//         templateUrl: 'partials/add_order.html',
//         controller: 'AddOrderController'
//     }).
//     when('/showOrders/:orderId', {
//         templateUrl: 'partials/show_models.html',
//         controller: 'ShowModelsController'
//     }).
//     when('/customer', {
//         templateUrl: 'partials/customer.html',
//         controller: 'customer'
//     }).
//     otherwise({
//         redirectTo: '/showBikeModels'
//     });
// }]);