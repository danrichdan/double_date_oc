

var app = angular.module('doubleDateApp',['ngRoute', 'rzModule', 'ui.bootstrap']);

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
            controller: 'userLocationController',
            controllerAs: 'ulc'
        })
        //route for location page

        .when('/location',{
            templateUrl: 'pages/location.html',
            controller: 'locationController',
            controllerAs: 'lc'
        })
        //route for user age range page
        .when('/user_age_range',{
            templateUrl: 'pages/user_age_range.html',
            controller: 'userAgeController',
            controllerAs: 'uac'
        })
        //route for age range page
        .when('/age_range',{
            templateUrl: 'pages/age_range.html',
            controller: 'ageController',
            controllerAs: 'ac'
        })
        //route for user interests page
        .when('/interests_home',{
            templateUrl: 'pages/interests_home.html',
            controller: 'interestsHomeController',
            controllerAs: 'ihc'
        })
        //route for interests page
        .when('/interests_out',{
            templateUrl: 'pages/interests_out.html',
            controller: 'interestsOutController',
            controllerAs: 'ioc'
        })
        //route for interests page
        .when('/interests_outdoors',{
            templateUrl: 'pages/interests_outdoors.html',
            controller: 'interestsOutdoorsController',
            controllerAs: 'iod'
        })
        //route for interests page
        .when('/interests_travel',{
            templateUrl: 'pages/interests_travel.html',
            controller: 'interestsTravelController',
            controllerAs: 'itc'
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
app.controller('mainController', function(){

}).controller('userLocationController',function(){
        //Location Page Controller
        //get location input from user
        //store into a variable in controller to pass to service
}).controller('locationController',function(signUpService){
        //get location input from user
        this.miles = '__';

    //store into a variable in controller to pass to service
}).controller('userAgeController',function(signUpService){
        this.userAge = '__';

}).controller('ageController', function($scope){v
    //if person click then select multiple age ranges below
        this.age = '__';

}).controller('interestsHomeController', function(signUpService){
         this.toggleInterest = function(interest){
            console.log('interest : ',interest);
            if(this.checkInterest(interest)){
                var interestIndexToRemove = signUpService.aNightIn.indexOf(interest);
                console.log('interestIndexToRemove : ',interestIndexToRemove);
                console.log('signUpService.aNightIn : ',signUpService.aNightIn);
                signUpService.aNightIn.splice(interestIndexToRemove,1);
            } else {
                signUpService.aNightIn.push(interest);
            }
            console.log(' Here is the signUpService.aNightIn : ', signUpService.aNightIn);
        }
        this.checkInterest = function(interest){
            if(signUpService.aNightIn.indexOf(interest) > -1){
                return true;
            } else {
                return false;
            }
        }
})
    .controller('interestsOutController', function(signUpService){
        this.toggleInterest = function(interest){
            console.log('interest : ',interest);
            if(this.checkInterest(interest)){
                var interestIndexToRemove = signUpService.aNightOut.indexOf(interest);
                console.log('interestIndexToRemove : ',interestIndexToRemove);
                console.log('signUpService.aNightOut : ',signUpService.aNightOut);
                signUpService.aNightOut.splice(interestIndexToRemove,1);
            } else {
                signUpService.aNightOut.push(interest);
            }
            console.log(' Here is the signUpService.aNightOut : ', signUpService.aNightOut);
        }
        this.checkInterest = function(interest){
            if(signUpService.aNightOut.indexOf(interest) > -1){
                return true;
            } else {
                return false;
            }
        }
}).controller('interestsOutdoorsController', function(signUpService){
        this.toggleInterest = function(interest){
        console.log('interest : ',interest);
        if(this.checkInterest(interest)){
            var interestIndexToRemove = signUpService.stayActive.indexOf(interest);
            console.log('interestIndexToRemove : ',interestIndexToRemove);
            console.log('signUpService.stayActive : ',signUpService.stayActive);
            signUpService.stayActive.splice(interestIndexToRemove,1);
        } else {
            signUpService.stayActive.push(interest);
        }
        console.log(' Here is the signUpService.stayActive : ', signUpService.stayActive);
    }
    this.checkInterest = function(interest){
        if(signUpService.stayActive.indexOf(interest) > -1){
            return true;
        } else {
            return false;
        }
    }
}).controller('interestsTravelController', function(signUpService){
    this.toggleInterest = function(interest){
        console.log('interest : ',interest);
        if(this.checkInterest(interest)){
            var interestIndexToRemove = signUpService.whenTravelling.indexOf(interest);
            console.log('interestIndexToRemove : ',interestIndexToRemove);
            console.log('signUpService.whenTravelling : ',signUpService.whenTravelling);
            signUpService.whenTravelling.splice(interestIndexToRemove,1);
        } else {
            signUpService.whenTravelling.push(interest);
        }
        console.log(' Here is the signUpService.stayActive : ', signUpService.whenTravelling);
    }
    this.checkInterest = function(interest){
        console.log('checkInterest function is being called!');
        if(signUpService.whenTravelling.indexOf(interest) > -1){
            console.log('CheckInterest is true');
            return true;
        } else {
            console.log('CheckInterest is false');
            return false;
        }
    }
}).controller('signUpController', function($scope) {
        //Login Page Controller
}).controller('loginController', function($scope){
    //Login Page Controller

});

app.service('signUpService', function(){
    this.aNightIn = [];
    this.aNightOut = [];
    this.stayActive = [];
    this.whenTravelling = [];
    // this.locationMiles = null;

});
