var app = angular.module('doubleDateApp',['ngRoute']);

app.controller('routeController',function($scope){
    $scope.message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
});

app.config(function($routeProvider){
    $routeProvider
        //route for location page (new user)
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })
        .when('/location',{
            templateUrl: 'pages/location.html',
            controller: 'locationController'
        })
        //route for age range page
        .when('/age_range',{
            templateUrl: 'pages/age_range.html',
            controller: 'ageRangeController'
        })
        //route for interests page
        .when('/interests',{
            templateUrl: 'pages/interests.html',
            controller: 'interestsController'
        })
        //route for login page (returning user)
        .when('/login',{
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        })
        .otherwise({
            redirectTo: "/"
        });
});

// Controllers for the different pages below
app.controller('mainController', function($scope){

}).controller('locationController',function($scope){
    //Location Page Controller
    $scope.match_location = 'Where Are You?';
    //get location input from user
    //store into a variable in controller to pass to service

}).controller('ageRangeController', function($scope){
    //if person click then select multiple age ranges below
    $scope.user_age = 'What age ranges are we looking for?';
    $scope.match_age = 'We are looking for people who are (pick multiple)';
}).controller('interestsController', function($scope){
    //Interest Page Controller
    $scope.interests = 'What Do You Like to Do?';
    $scope.interests2 = 'Click on one or more of the following things you are interested in doing with other couples.';
}).controller('loginController', function($scope){
    //Login Page Controller

}) ;


