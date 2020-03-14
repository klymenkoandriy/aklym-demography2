var app = angular.module('myApp', ['ngRoute', 'ngAnimate']);

app.constant('REQUEST_TEMPLATE', 'http://inqstatsapi.inqubu.com?api_key=064ac316eb276e54');
app.constant('COUNTRIES_URL', '../data/country-codes.json');
app.constant('PROPERTIES_URL', '../data/properties.json');

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
    	name: 'home',
        templateUrl : "home.html"
    })
    .when("/home", {
    	name: 'home',
        templateUrl : "home.html"
    })
    .when("/population", {
    	name: 'population',
        templateUrl : "population.html"
    })
    .when("/choose", {
    	name: 'choose',
        templateUrl : "choose.html"
    })
});

