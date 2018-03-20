angular.module('myApp')
		.controller('myController', myController);

myController.$inject = ['$scope'];

function myController($scope) {
    $scope.name = "Welcome!";
}