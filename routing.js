

var app = angular.module('doubleDateApp',['ngRoute', 'rzModule', 'ui.bootstrap']);

app.controller('routeController',function($scope){
    $scope.message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
});

app.config(function($routeProvider){
    $routeProvider
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
        //route for distance page

        .when('/distance',{
            templateUrl: 'pages/distance.html',
            controller: 'distanceController',
            controllerAs: 'dc'
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
            controller: 'interestsNightOutController',
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
        })
});


// Controllers for the different pages below
app.controller('mainController', function(){
});

app.controller('userLocationController',function(profileService, $location){
    this.userInputZip = parseFloat(profileService.getZipcode());
    console.log("userInputZip : ", this.userInputZip);

    //validate info input, save, url after button click
    this.validateZip = function(input){
        console.log('in validateZip func', input);
        this.inputString = input.toString();
        this.inputLength = input.toString().length; 
        console.log(this.inputLength);
        if(parseInt(this.inputLength) === 5){
            console.log('valid zip');
            console.log(this.inputString, this.inputString[0]);
            if(this.inputString[0]==='9'){
                console.log('first digit of zip is 9');
                return true;
            }else{
                console.log('first digit of zip is NOT 9');
                return false;
            }
        } else{
            console.log('not valid zip');
            return false;
        }
    }
    this.setUserLocation = function(userInputZip){
        console.log('in setUserLocation func', userInputZip);
        if(this.validateZip(userInputZip)===true){
            console.log('validateZip is true');
            profileService.currentProfile.zipcode = userInputZip;
            console.log('profileService.currentProfile.zipcode :', profileService.currentProfile.zipcode);
            $location.url('/distance');
        }
        else{
            console.log('not valid zip to save to user profile');
        }
    }
    //using maxlength instead
    // this.checkMaxZip = function(){
    //     console.log('this.userInputZip.toString().length :', this.userInputZip.toString().length);
    //     if(this.userInputZip.toString().length < 6){
    //         console.log('true');
    //         // this.userInputZip = parseInt(this.zip.toString().substring(0,5));
    //         // console.log(this.userInputZip.toString().substring(0,5));
    //         return true;
    //     }else{
    //         console.log('false length');
    //         return false;
    //     } 
    // }
});


app.controller('distanceController',function(profileService, $location){
    //  check if profileService has maxDistance 
    this.userMaxDistance = profileService.getDistanceMax();
    // this.addCorrectButton();
    console.log('userMaxDistance', this.userDistanceMax);

///DONT NEED THE BELOW BECAUSE WE'RE USING ANGULAR... 
    // this.addCorrectButton = function(user){
    //     console.log('in checkDistance function');
    //     //if profileService has maxDistance, than add class to appropriate button
    //      // if(this.userMaxDistance !== null){
    //      //    console.log('in if statement');
    //      //    if(this.userMaxDistance === 5){
    //      //        console.log('checkDistance is true');
    //      //        return true;
    //      //    }
    //      //    // if(this.userMaxDistance)
    //      //    else{
    //      //        console.log('checkDistance is false');
    //      //        return false;
    //      //    }
    //     }

    this.setDistance = function (){
        console.log('in setDistance');   
        console.log(this.userMaxDistance);
        profileService.currentProfile.distanceMax= this.userMaxDistance;
        console.log('profileService.currentProfile.distanceMax',profileService.currentProfile.distanceMax);
        $location.url('/user_age_range');
    }   
});


app.controller('userAgeController',function(signUpService){
        this.userAge = '__';
});

app.controller('ageController', function(signUpService){
    //if person click then select multiple age ranges below
        this.age = '__';

});

app.controller('interestsHomeController', function(profileService,$log,$location){
    this.$log = $log;

    // functions called from interests_out.html
    //Getting the value from the Service in case it's already been selected
    this.bookClub = profileService.getBookClub();
    console.log('Here is the value in the controller for this.bookClub after the getBookClub function is called : ', this.bookClub);
    this.conversation = profileService.getConversation();
    console.log('Here is the value in the controller for this.conversation after the getConversation function is called : ', this.conversation);
    this.cooking = profileService.getCooking();
    console.log('Here is the value in the controller for this.cooking after the getCooking function is called : ', this.cooking);
    this.crafts = profileService.getCrafts();
    console.log('Here is the value in the controller for this.crafts after the getCrafts function is called : ', this.crafts);
    this.movieNight = profileService.getMovieNight();
    console.log('Here is the value in the controller for this.movieNight after the getMovieNight function is called : ', this.movieNight);
    this.boardGames = profileService.getBoardGames();
    console.log('Here is the value in the controller for this.boardGames after the getBoardGames function is called : ', this.boardGames);
    this.cardGames = profileService.getCardGames();
    console.log('Here is the value in the controller for this.boardGames after the getCardGames function is called : ', this.cardGames);


    //setting values for the service,
    //called from the previous and next buttons
    this.setNightAtHomeInterests = function () {
        profileService.currentProfile.bookClub = this.bookClub;
        profileService.currentProfile.conversation = this.conversation; //This needs to be fixed in the service, I
        // did not want to do it due to possible merge conflicts
        profileService.currentProfile.cooking = this.cooking;
        profileService.currentProfile.crafts = this.crafts;
        profileService.currentProfile.movieNight = this.movieNight;
        profileService.currentProfile.boardGames = this.boardGames;
        profileService.currentProfile.cardGames = this.cardGames;
    }
        //  this.toggleInterest = function(interest){
        //     console.log('interest : ',interest);
        //     if(this.checkInterest(interest)){
        //         var interestIndexToRemove = signUpService.aNightIn.indexOf(interest);
        //         console.log('interestIndexToRemove : ',interestIndexToRemove);
        //         console.log('signUpService.aNightIn : ',signUpService.aNightIn);
        //         signUpService.aNightIn.splice(interestIndexToRemove,1);
        //     } else {
        //         signUpService.aNightIn.push(interest);
        //     }
        //     console.log(' Here is the signUpService.aNightIn : ', signUpService.aNightIn);
        // }
        // this.checkInterest = function(interest){
        //     if(signUpService.aNightIn.indexOf(interest) > -1){
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
});

app.controller('interestsNightOutController', function(profileService,$log,$location){
    this.$log = $log;

    // functions called from interests_out.html
    //Getting the value from the Service in case it's already been selected
    this.artGalleries = profileService.getArtGalleries();
    console.log('Here is the value in the controller for this.artGalleries after the getArtGalleries function is called : ', this.artGalleries);

    this.casualDining = profileService.getCasualDining();
    console.log('Here is the value in the controller for this.casualDining after the getCasualDining function is called : ', this.casualDining);

    this.comedy = profileService.getComedy();
    console.log('Here is the value in the controller for this.comedy after the getComedy function is called : ', this.comedy);

    this.classicalConcerts = profileService.getClassicalConcerts();
    console.log('Here is the value in the controller for this.classicalConcerts after the getClassicalConcerts function is called : ', this.classicalConcerts);

    this.popularConcerts = profileService.getPopularConcerts();
    console.log('Here is the value in the controller for this.popularConcerts after the getPopularConcerts function is called : ', this.popularConcerts);

    this.ballroomDancing = profileService.getBallroomDancing();
    console.log('Here is the value in the controller for this.ballroomDancing after the getBallroomDancing function is called : ', this.ballroomDancing);

    this.countryDancing = profileService.getCountryDancing();
    console.log('Here is the value in the controller for this.countryDancing after the getCountryDancing function is called : ', this.countryDancing);

    this.salsaDancing = profileService.getSalsaDancing();
    console.log('Here is the value in the controller for this.salsaDancing after the getSalsaDancing function is called : ', this.salsaDancing);

    this.fineDining = profileService.getFineDining();
    console.log('Here is the value in the controller for this.fineDining after the getFineDining function is called : ', this.fineDining);

    this.karaoke = profileService.getKaraoke();
    console.log('Here is the value in the controller for this.karaoke after the getKaraoke function is called : ', this.karaoke);

    this.liveTheater = profileService.getLiveTheater();
    console.log('Here is the value in the controller for this.liveTheater after the getLiveTheater function is called : ', this.liveTheater);

    this.movies = profileService.getMovies();
    console.log('Here is the value in the controller for this.movies after the getMovies function is called : ', this.movies);

    this.wineTasting = profileService.getWineTasting();
    console.log('Here is the value in the controller for this.wineTasting after the getWineTasting function is called : ', this.wineTasting);

    //setting values for the service,
    //called from the previous and next buttons
    this.setNightOutInterests = function () {
        profileService.currentProfile.artGalleries = this.artGalleries;
        profileService.currentProfile.casualDining = this.casualDining;
        profileService.currentProfile.comedy = this.comedy;
        profileService.currentProfile.classicalConcerts = this.classicalConcerts;
        profileService.currentProfile.popularConcerts = this.popularConcerts;
        profileService.currentProfile.ballroomDancing = this.ballroomDancing;
        profileService.currentProfile.countryDancing = this.countryDancing;
        profileService.currentProfile.salsaDancing = this.salsaDancing;
        profileService.currentProfile.fineDining = this.fineDining;
        profileService.currentProfile.karaoke = this.karaoke;
        profileService.currentProfile.liveTheater = this.liveTheater;
        profileService.currentProfile.movies = this.movies;
        profileService.currentProfile.wineTasting = this.wineTasting;
    };
});

app.controller('interestsOutdoorsController', function (profileService, $log, $location) {
    this.$log = $log;

    // functions called from interests_outdoors.html
    //Getting the value from the Service in case it's already been selected
    this.bicycling = profileService.getBicycling();
    this.bowling = profileService.getBowling();
    this.golf = profileService.getGolf();
    this.hiking = profileService.getHiking();
    this.horsebackRiding = profileService.getHorsebackRiding();
    this.kayaking = profileService.getKayaking();
    this.motorcycling = profileService.getMotorcycling();
    this.racquetball = profileService.getRacquetball();
    this.tennis = profileService.getTennis();
    this.walking = profileService.getWalking();

    //setting values for the service,
    //called from the previous and next buttons
    this.setOutdoorInterests = function () {
        profileService.currentProfile.bicycling = this.bicycling;
        profileService.currentProfile.bowling = this.bowling;
        profileService.currentProfile.golf = this.golf;
        profileService.currentProfile.hiking = this.hiking;
        profileService.currentProfile.horsebackRiding = this.horsebackRiding;
        profileService.currentProfile.kayaking = this.kayaking;
        profileService.currentProfile.motorcycling = this.motorcycling;
        profileService.currentProfile.racquetball = this.racquetball;
        profileService.currentProfile.tennis = this.tennis;
        profileService.currentProfile.walking = this.walking;
    };
});

app.controller('interestsTravelController', function (profileService, $log, $location) {
    this.$log = $log;

    // functions called from interests_travel.html
    //Getting the value from the Service in case it's already been selected
    this.camping = profileService.getCamping();
    this.domesticTravel = profileService.getDomesticTravel();
    this.rving = profileService.getRving();
    this.travelAbroad = profileService.getTravelAbroad();

    //setting values for the service,
    //called from the previous and next buttons
    this.setTravelInterests = function () {
        profileService.currentProfile.camping = this.camping;
        profileService.currentProfile.domesticTravel = this.domesticTravel;
        profileService.currentProfile.rving = this.rving;
        profileService.currentProfile.travelAbroad = this.travelAbroad;
    };

    //@TODO  -- FINISH THE FUNCTION BELOW
    this.atLeastOneInterestRequired = function () {
        //if(this.camping && this.RV-ing && this.dancing etc. are === false) {alert('Please select at least one
        // interest....');}
        //prevent the button's default behavior
        //maybe use $location to get to the next page?
        //Or maybe create an array which collects values on each view, if empty by the last view, don't move forward

    };
});

app.controller('signUpController', function($scope) {
        //Login Page Controller
});

app.controller('loginController', function($scope){
    //Login Page Controller

});

app.service('signUpService', function(){
    this.aNightIn = [];
    this.aNightOut = [];
    this.stayActive = [];
    this.whenTravelling = [];
    this.locationMiles = '';
    this.userZipCode = '';

});
