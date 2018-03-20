/*global describe, it, beforeEach, inject, expect*/
describe('Controller Test cases', function() {

    var _scope, _controller;

    beforeEach(angular.mock.module('ngRoute'));
    beforeEach(angular.mock.module('myApp'));

    beforeEach(inject(function($controller, $rootScope) {
      _controller = $controller;
      _rootScope = $rootScope;
      _scope = $rootScope.$new();
      _controller('myController', { 
        $scope: _scope 
      });
     // _rootScope.apply();
    }));

    it('scope data validation', function() {
      expect(_scope.name).toEqual("Hello!")
    });
});