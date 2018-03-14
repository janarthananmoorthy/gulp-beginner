app.controller('myController', myController);

myController.$inject = ['$scope'];

function myController($scope) {
    $scope.name = "hello!";
}