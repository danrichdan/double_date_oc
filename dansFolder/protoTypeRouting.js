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
        .when('/page3',{
            templateUrl: 'proto_page_3.html',
            controller: 'page3Controller'
        })
        .otherwise({
            redirectTo: "/"
        });
});

// Controllers for the different pages below
app.controller('mainController',function($scope){
    //Page1 Controller
    $scope.user_age = 'What age ranges are we looking for?';
    $scope.match_age = 'We are looking for people who are (pick multiple)';
}).controller('page2Controller', function($scope){
    //Page2 Controller
    $scope.match_location = 'Where Are You?';
}).controller('page3Controller', function($scope){
    $scope.interests = 'Please select any activities that you\'re interested in doing.';
    //Page3 Controller
    //Get Information from this page
    $scope.interest = interest;

});

