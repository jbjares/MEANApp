/**
 * Created by jbjares on 03/04/2015.
 */
angular.module('app',['ngResource','ngRoute']);

angular.module('app').config(function($routeProvider,$locationProvider){
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $routeProvider
        .when('/',{templateUrl:'/partials/main',controller:'mainCtrl'});


});

angular.module('app').controller('mainCtrl',function($scope){
    $scope.myVar = "Hello Angular";
});