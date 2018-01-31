'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',

  'myApp.version',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider

    .when('/', {
      templateUrl : 'index.html',
      controller : 'IndexCtrl'
    })
  $locationProvider.html5Mode(true);
}])
