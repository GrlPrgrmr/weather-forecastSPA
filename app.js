//Module
var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);

//ROUTES
weatherApp.config(function($routeProvider)
                 {
      $routeProvider
      
      .when('/',{
          templateUrl:'pages/home.htm',
          controller:'homeController'
          
      })
      .when('/forecast',{
          templateUrl:'pages/forecast.htm',
          controller:'forecastController'
          
      })
      .when('/forecast/:days',{
          templateUrl:'pages/forecast.htm',
          controller:'forecastController'
          
      });
    
});



//controllers
weatherApp.controller('homeController',['$scope','$location','cityService',function($scope,$location,cityService){
    
    $scope.city =cityService.city;
    $scope.$watch('city',function(){
        
       cityService.city=$scope.city; 
        
    });
    
    $scope.submit=function(){
        $location.path("/forecast");
        
    };
    
}]);

weatherApp.controller('forecastController',['$scope','cityService','weatherService','$routeParams',function($scope,cityService,weatherService,$routeParams){
    
    $scope.city =cityService.city;
    $scope.days = $routeParams.days|| '2';
    
    $scope.weatherResult = weatherService.GetWeather($scope.city,$scope.days);
    
    $scope.convertToFarhenheit =function(degK){
        
        return Math.round((1.8*(degK-273))+32);
    };
    
    $scope.convertToDate = function(dt){
        
        return new Date(dt*1000);
    };
    
}]);


//DIRECTIVES
weatherApp.directive("weatherReport",function(){
    return {
         restrict:'E',
        templateUrl:'directives/weatherReport.html',
        replace:true,
        scope:{
            weatherDay: "=",
            convertToStandard: "&",
            convertToDate: "&",
            dateFormat: "@"
            
        }
        
    }
    
});
