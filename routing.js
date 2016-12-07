

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
        //route for our age range page
        .when('/our_age_range',{
            templateUrl: 'pages/our_age_range.html',
            controller: 'ourAgeController',
            controllerAs: 'oac'
        })
        //route for their age range page
        .when('/their_age_range',{
            templateUrl: 'pages/their_age_range.html',
            controller: 'theirAgeController',
            controllerAs: 'tac'
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
        .when('/before_sample_match',{
            templateUrl: 'pages/before_sample_match.html',
            controller: 'beforeSampleMatchController',
            controllerAs: 'bsmc'
        })
        //route for sample matches page
        .when('/sample_match',{
            templateUrl: 'pages/sample_match.html',
            controller: 'sampleMatchController',
            controllerAs: 'smc'
        })
        //route for sign up page
        // .when('/sign_up',{
        //     templateUrl: 'pages/sign_up.html',
        //     controller: 'signUpController'
        // })
        .when('/signup_email',{
            templateUrl: 'pages/signup_email.html',
            controller: 'signupEmailController',
            controllerAs: 'suec'
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
        $location.url('/our_age_range');
    }   
});


app.controller('ourAgeController',function(profileService, $location){
    this.ourAgeMin = profileService.getOurAgeMin();
    this.ourAgeMax = profileService.getOurAgeMax();
    console.log(this.ourAgeMin);
    console.log(this.ourAgeMax);
    this.ourAgeRange = function(){
        if(this.ourAgeMin && this.ourAgeMax){
            if(this.ourAgeMax =='100'){
            return this.ourAgeMin+'+';
            }
            else{
            return this.ourAgeMin+'-'+this.ourAgeMax;
            }
        }
        else{
            return '__';
        }
    }
    this.ourAgeRangeExists = function(){
        if(this.ourAgeMin && this.ourAgeMax){
            return true;
        }
        else{
            return false;
        }
    }

    this.setOurAge = function(){
        console.log('in setOurAge');
        profileService.currentProfile.ourAgeMin = this.ourAgeMin;
        profileService.currentProfile.ourAgeMax = this.ourAgeMax; 
        console.log('profileService.currentProfile.ourAgeMin :', profileService.currentProfile.ourAgeMin, 'profileService.currentProfile.ourAgeMax :', profileService.currentProfile.ourAgeMax);
        $location.url('/their_age_range');
    }
});

app.controller('theirAgeController', function(profileService, $location){
    //if person click then select multiple age ranges below
    this.theirAgeMin = profileService.getTheirAgeMin();
    this.theirAgeMax = profileService.getTheirAgeMax();
    console.log('profileService.getTheirAgeMin()', profileService.getTheirAgeMin());
    console.log('profileService.currentProfile.theirAgeMin',profileService.currentProfile.theirAgeMin);
    console.log('profileService.currentProfile.theirAgeMax',profileService.currentProfile.theirAgeMax);


    this.theirAgeRange = function(){
        console.log('in theirAgeRange');
       if(this.theirAgeMin && this.theirAgeMax){
            if(this.theirAgeMax == '100'){
                return this.theirAgeMin+"+";
            }
            else{
                return this.theirAgeMin+"-"+this.theirAgeMax;
            }
        }
        else{
            return "__";
        }
    }

    this.setTheirAge = function(){
        profileService.currentProfile.theirAgeMin = this.theirAgeMin;
        profileService.currentProfile.theirAgeMax = this.theirAgeMax;
        console.log('profileService.currentProfile.theirAgeMin',profileService.currentProfile.theirAgeMin);
        console.log('profileService.currentProfile.theirAgeMax',profileService.currentProfile.theirAgeMax);
        $location.url('/interests_home');
    }
});

app.controller('interestsHomeController', function(profileService,$log,$location){
    this.$log = $log;

    // functions called from interests_out.html
    //Getting the value from the Service in case it's already been selected
    this.bookClub = profileService.getBookClub();
    this.conversation = profileService.getConversation();
    this.cooking = profileService.getCooking();
    this.crafts = profileService.getCrafts();
    this.movieNight = profileService.getMovieNight();
    this.boardGames = profileService.getBoardGames();
    this.cardGames = profileService.getCardGames();

    //Sums up the interests for this view
    this.atHomeInterestCount = function() {
        this.atHomeInterestTotal = (profileService.currentProfile.boardGames ? 1 : 0) +
            (profileService.currentProfile.cardGames ? 1 : 0) +
            (profileService.currentProfile.cooking ? 1 : 0) +
            (profileService.currentProfile.conversation ? 1 : 0) +
            (profileService.currentProfile.crafts ? 1 : 0) +
            (profileService.currentProfile.bookClub ? 1 : 0) +
            (profileService.currentProfile.movieNight ? 1 : 0);
        console.log('atHomeInterestTotal : ', this.atHomeInterestTotal);
        return this.atHomeInterestTotal;
    };

    //setting values for the service,
    //called from the previous and next buttons
    this.setNightAtHomeInterests = function () {
        profileService.currentProfile.bookClub = this.bookClub;
        profileService.currentProfile.conversation = this.conversation;
        profileService.currentProfile.cooking = this.cooking;
        profileService.currentProfile.crafts = this.crafts;
        profileService.currentProfile.movieNight = this.movieNight;
        profileService.currentProfile.boardGames = this.boardGames;
        profileService.currentProfile.cardGames = this.cardGames;
    };

    //Total number of interests, will probably only call this from the submit button eventually.
    this.interestCount = function() {
        this.count = profileService.interestCount();
        console.log('interestCount : ', this.count);
        return this.count;

    };

    this.atHomeInterestButtonClicked = function(){
        this.setNightAtHomeInterests();
        this.atHomeInterestCount();
        this.interestCount();
    };

});

app.controller('interestsNightOutController', function(profileService,$log,$location){
    this.$log = $log;

    // functions called from interests_out.html
    //Getting the value from the Service in case it's already been selected
    this.artGalleries = profileService.getArtGalleries();
    this.casualDining = profileService.getCasualDining();
    this.comedy = profileService.getComedy();
    this.classicalConcerts = profileService.getClassicalConcerts();
    this.popularConcerts = profileService.getPopularConcerts();
    this.ballroomDancing = profileService.getBallroomDancing();
    this.countryDancing = profileService.getCountryDancing();
    this.salsaDancing = profileService.getSalsaDancing();
    this.fineDining = profileService.getFineDining();
    this.karaoke = profileService.getKaraoke();
    this.liveTheater = profileService.getLiveTheater();
    this.movies = profileService.getMovies();
    this.wineTasting = profileService.getWineTasting();

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
    // This section is for validating that at least one interest is selected
    this.interestCount = function() {
        var count = profileService.interestCount();
        console.log('Interest count total : ', count);
        return count;

        //this.validateInterest(count);
    };
    //this.validateInterest = function (count){
    // if(count == 0){
    //     $location.url('/interests_outdoors');
    //     alert('You need to select an interest!');
    //     return count;
    // }
    // else {
    //     $location.url('/interests_travel');
    //     return count;
    // }
   // }
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



});

app.controller('beforeSampleMatchController', function(){
})

app.controller('sampleMatchController', function() {
});

app.controller('signupEmailController', function(){
    this.validate = false;
    this.ourEmail = '';
    this.validate_email = function() {
        console.log('inside validate_email controller');
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(this.ourEmail);
        var isValid = regex.test(this.ourEmail);
        console.log('isValid is', isValid);
        if (!isValid) {
            //invalid input
            // $('.error').show();
            console.log('true');
            this.validate = true;
            // return true;
           
        }
        else {
            //valid input
            // $('.error').hide();
            console.log('false');
            this.validate = false;
        }
    }   
})


app.controller('loginController', function(){
    //Login Page Controller

});

