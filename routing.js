

var app = angular.module('doubleDateApp',['ngRoute']);

app.controller('routeController',function($scope){
    $scope.message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
});

app.config(function($routeProvider){
    $routeProvider
        //route for location page (new user)
        .when('/', {
            templateUrl: 'pages/welcome.html',
            controller: 'mainController'
        })
        //route for user location page
        .when('/user_location',{
            templateUrl: 'pages/user_location.html',
            controller: 'userLocationController'
        })
        //route for location page
        .when('/location',{
            templateUrl: 'pages/location.html',
            controller: 'locationController'
        })
        //route for user age range page
        .when('/user_age_range',{
            templateUrl: 'pages/user_age_range.html',
            controller: 'ageRangeController'
        })
        //route for age range page
        .when('/age_range',{
            templateUrl: 'pages/age_range.html',
            controller: 'ageRangeController'
        })
        //route for user interests page
        .when('/interests_home',{
            templateUrl: 'pages/interests_home.html',
            controller: 'interestsHomeController'
        })
        //route for interests page
        .when('/interests_out',{
            templateUrl: 'pages/interests_out.html',
            controller: 'interestsOutController'
        })
        //route for interests page
        .when('/interests_outdoors',{
            templateUrl: 'pages/interests_outdoors.html',
            controller: 'interestsOutdoorsController'
        })
        //route for interests page
        .when('/interests_travel',{
            templateUrl: 'pages/interests_travel.html',
            controller: 'interestsTravelController'
        })
        //route for sign up page
        .when('/sign_up',{
            templateUrl: 'pages/sign_up.html',
            controller: 'signUpController'
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
})
    .controller('userLocationController',function($scope){
        //Location Page Controller
        $scope.match_location = 'where are you?';
        //get location input from user
        //store into a variable in controller to pass to service
})
    .controller('locationController',function($scope){
    //Location Page Controller
        $scope.match_location = 'where are you?';
        //get location input from user
    //store into a variable in controller to pass to service
})
    .controller('userAgeRangeController',function($scope){
})
    .controller('ageRangeController', function($scope){
    //if person click then select multiple age ranges below
        $scope.user_age = 'We are __ years old.';
})
    .controller('interestsHomeController', function($scope){
         //Interest Page Controller
})
    .controller('interestsOutController', function($scope){
        //Interest Page Controller
})
    .controller('interestsOutdoorsController', function($scope){
        //Interest Page Controller
})
    .controller('interestsTravelController', function($scope){
        //Interest Page Controller
})
    .controller('signUpController', function($scope) {
        //Login Page Controller
})
    .controller('loginController', function($scope){
    //Login Page Controller

}) ;


