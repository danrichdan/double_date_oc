var app = angular.module('doubleDateApp',['ngRoute']);

app.controller('routeController',function($scope){
    $scope.message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
});

app.config(function($routeProvider){
    $routeProvider
        //route for location page
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
        .otherwise({
            redirectTo: "/"
        });
});

// Controllers for the different pages below
app.controller('mainController', function($scope){

}).controller('locationController',function($scope){
    //Location Page Controller
    $scope.user_age = 'What age ranges are we looking for?';
    $scope.match_age = 'We are looking for people who are (pick multiple)';
}).controller('ageRangeController', function($scope){
    //Page2 Controller
    $scope.match_location = 'Where Are You?';
}).controller('interestsController', function($scope){
    //Interest Page Controller
    $scope.interests = 'What Do You Like to Do?';
    $scope.interests2 = 'Click on one or more of the following things you are interested in doing with other couples.';
});

