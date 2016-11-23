var app = angular.module('doubleDateApp',['ngRoute']);

app.controller('routeController',function($scope){
    $scope.message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
});

app.config(function($routeProvider){
    $routeProvider
        //route for protoTypePage1
        .when('/',{
            templateUrl: 'protoTypePage1.html',
            controller: 'mainController'
        })
        //route for protoTypePage2
        .when('/page2',{
            templateUrl: 'protoTypePage2.html',
            controller: 'page2Controller'
        })
        .otherwise({
            redirectTo: "/"
        });
});

// Controllers for the different pages below
app.controller('mainController',function($scope){
    //Page1 Controller
    $scope.user_age = 'Please select a range that reflects your age.';
    $scope.match_age = 'Please select the age range for couples you are interested.';
}).controller('page2Controller', function($scope){
    //Page2 Controller
    $scope.message = 'Routing is still working!  Yeah! Page2';
});

