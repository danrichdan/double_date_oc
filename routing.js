

var app = angular.module('doubleDateApp',['ngRoute', 'rzModule', 'ui.bootstrap']);

app.controller('routeController',function(){

});

app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'pages/welcome.html',
            controller: 'mainController'
        })
        //route for user location page
        .when('/our_location',{
            templateUrl: 'pages/our_location.html',
            controller: 'ourLocationController',
            controllerAs: 'olc'
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
        .when('/user_fyi',{
            templateUrl: 'pages/user_fyi.html',
            controller: 'userFyiController',
            controllerAs: 'uf'
        })
        //route for sample matches page
        .when('/sample_match',{
            templateUrl: 'pages/sample_match.html',
            controller: 'sampleMatchController',
            controllerAs: 'smc'
        })
        //route for sign up email
        .when('/signup_email',{
            templateUrl: 'pages/signup_email.html',
            controller: 'signupEmailController',
            controllerAs: 'suec'
        })
        // route for password
        .when('/signup_password',{
            templateUrl: 'pages/signup_password.html',
            controller: 'signupPasswordController',
            controllerAs: 'supc'
        })
        // route for sign up paragraph
        .when('/signup_paragraph',{
            templateUrl: 'pages/signup_paragraph.html',
            controller: 'signupParagraphController',
            controllerAs: 'spc'
        })
        // route for sign up picture
        .when('/signup_picture',{
            templateUrl: 'pages/signup_picture.html',
            controller: 'signupPictureController',
            controllerAs: 'sup'
        })
        .when('/terms', {
            templateUrl: 'pages/terms.html',
            controller: 'termsController',
            controllerAs: 'tc'
        })
        //route for login page (returning user)
        .when('/login',{
            templateUrl: 'pages/login.html',
            controller: 'loginController',
            controllerAs: 'lc'
        })
        //route for (real) matches page
        .when('/match',{
            templateUrl: 'pages/match.html',
            controller: 'matchController',
            controllerAs: 'mc'
        })
        //route for administrator functions
        .when('/administrator',{
            templateUrl: 'pages/administrator.html',
            controller: 'administratorController',
            controllerAs: 'ac'
        })
        //route for moderator functions
        .when('/moderator',{
            templateUrl: 'pages/moderator.html',
            controller: 'moderatorController',
            controllerAs: 'modc'
        })
        //route for Frequently Asked Questions
        .when('/faq',{
            templateUrl: 'pages/faq.html',
            controller: 'faqController',
            controllerAs: 'faq'
        })
        //route for the signup name view
        .when('/signup_name', {
            templateUrl: 'pages/signup_name.html',
            controller: 'signupNameController',
            controllerAs: 'sunc'
        })
        //route for the user summary view
        .when('/user_summary', {
            templateUrl: 'pages/user_summary.html',
            controller: 'userSummaryController',
            controllerAs: 'usc'
        })
        .when('/edit_profile', {
            templateUrl: 'pages/edit_profile.html',
            controller: 'editProfileController',
            controllerAs: 'epc'
        })
        .otherwise({
            redirectTo: "/"
        })
});


// Controllers for the different pages below
app.controller('mainController', function() {
    setTimeout(function () {
        $('.body-wineglass').fadeOut(1000)}, 3000)
});

app.controller('ourLocationController',function(profileService, $location){
    this.ourInputZip = parseFloat(profileService.getZipcode());
    ////console.log("ourInputZip : ", this.ourInputZip);
    var self = this;
    this.correctZip = true;

    //validate info input, save, url after button click
    this.validateZip = function(){
        //console.log('in validateZip func', this.ourInputZip);
        var inputString = this.ourInputZip.toString();
        var inputLength = inputString.length; 
        if(parseInt(inputLength) === 5){
            if(inputString[0]==='9'){
                //console.log('first digit of zip is 9');
                self.correctZip = true;
            }
            else{
                //console.log('first digit of zip is NOT 9');
                // return false;
                self.correctZip = false;
            }
        } 
        else{
            //console.log('not valid zip');
            // return false;
            self.correctZip = false;
            }
        };

    this.setOurLocation = function(ourInputZip){
        this.validateZip();
        //console.log('in setOurLocation func', ourInputZip);
        if(self.correctZip===true){
            //console.log('validateZip is true');
            profileService.currentProfile.zipcode = ourInputZip;
            //console.log('profileService.currentProfile.zipcode :', profileService.currentProfile.zipcode);
            $location.url('/distance');
        }
        else{
            //console.log('not valid zip to save to our profile');
        }
    }
});





app.controller('distanceController',function(profileService, $location){
    // this.selectedButton = ;
    //  check if profileService has maxDistance 
    var self = this;
    var tempMaxDistance = profileService.getDistanceMax();
    console.log('tempMaxDistance', tempMaxDistance);
    if(tempMaxDistance==null){
        this.userMaxDistance = '__';
    }
    else{
        this.userMaxDistance = tempMaxDistance;
    };
    //console.log('userMaxDistance', this.userMaxDistance);
    this.setDistance = function (){
        //console.log('self.userMaxDistance', self.userMaxDistance);
        profileService.currentProfile.distanceMax= this.userMaxDistance;
        //console.log('profileService.currentProfile.distanceMax',profileService.currentProfile.distanceMax);
        $location.url('/our_age_range');
    }   
});


app.controller('ourAgeController',function(profileService, $location){
    this.ourAgeMin = profileService.getOurAgeMin();
    this.ourAgeMax = profileService.getOurAgeMax();
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
            return " "+ '__';
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
        profileService.currentProfile.ourAgeMin = this.ourAgeMin;
        profileService.currentProfile.ourAgeMax = this.ourAgeMax; 
        //console.log('profileService.currentProfile.ourAgeMin :', profileService.currentProfile.ourAgeMin, 'profileService.currentProfile.ourAgeMax :', profileService.currentProfile.ourAgeMax);
        $location.url('/their_age_range');
    }
});

app.controller('theirAgeController', function(profileService, $location){
    //if person click then select multiple age ranges below
    this.theirAgeMin = profileService.getTheirAgeMin();
    this.theirAgeMax = profileService.getTheirAgeMax();
    //console.log('theirAgeRange start: ' + profileService.getTheirAgeMin() + '-' + profileService.getTheirAgeMax());

    this.rangeButtonClicked = function(min, max) {
        //console.log('Starting range: ' + this.theirAgeMin + ', ' + this.theirAgeMax);
        if (this.theirAgeMin <= min && this.theirAgeMax >= max) {
            // This button was already highlighted; remove the range.
            //console.log('removing their age range: ' + min + ', ' + max);
            if (this.theirAgeMin === min && this.theirAgeMax === max) {
                // Only this range was selected, so revert to null.
                this.theirAgeMin = this.theirAgeMax = null;
            } else {
                if (this.theirAgeMin === min) {
                    // Removing lowest range.
                    this.theirAgeMin = max + 1;
                }
                if (this.theirAgeMax === max) {
                    // Removing highest range.
                    this.theirAgeMax = min - 1;
                }
            }
        } else {
            // This button was not highlighted; add the range.
            //console.log('adding their age range: ' + min + ', ' + max);
            if (this.theirAgeMin === null) {
                this.theirAgeMin = min;
            } else {
                this.theirAgeMin = Math.min(this.theirAgeMin, min);
            }

            if (this.theirAgeMax === null) {
                this.theirAgeMax = max;
            } else {
                this.theirAgeMax = Math.max(this.theirAgeMax, max);
            }
        }
        //console.log('Ending range: ' + this.theirAgeMin + ', ' + this.theirAgeMax);
    };

    this.theirAgeRange = function(){
        if (this.theirAgeMin && this.theirAgeMax){
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
    };

    this.setTheirAge = function(){
        profileService.setTheirAge(this.theirAgeMin, this.theirAgeMax);
        //console.log('theirAgeRange end: ' + profileService.getTheirAgeMin() + '-' + profileService.getTheirAgeMax());
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
        //console.log('atHomeInterestTotal : ', this.atHomeInterestTotal);
        return this.atHomeInterestTotal;
    };

    //setting values for the service,
    this.setNightAtHomeInterests = function () {
        profileService.currentProfile.bookClub = this.bookClub;
        profileService.currentProfile.conversation = this.conversation;
        profileService.currentProfile.cooking = this.cooking;
        profileService.currentProfile.crafts = this.crafts;
        profileService.currentProfile.movieNight = this.movieNight;
        profileService.currentProfile.boardGames = this.boardGames;
        profileService.currentProfile.cardGames = this.cardGames;

    };

    this.atHomeInterestButtonClicked = function(){
        this.setNightAtHomeInterests();
        this.atHomeInterestCount();
    };

    this.setUrl = function(){
        $location.url('/interests_out');
    };
});

app.controller('interestsNightOutController', function(profileService,userService, $log,$location){
    this.$log = $log;
    this.loggedIn = userService.isLoggedIn();
    console.log('User is logged in : ', this.loggedIn);

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

    //Sums up the interests for this view
    this.aNightOutInterestCount = function() {
        this.aNightOutInterestTotal = (profileService.currentProfile.artGalleries ? 1 : 0) +
            (profileService.currentProfile.casualDining ? 1 : 0) +
            (profileService.currentProfile.comedy ? 1 : 0) +
            (profileService.currentProfile.classicalConcerts ? 1 : 0) +
            (profileService.currentProfile.popularConcerts ? 1 : 0) +
            (profileService.currentProfile.ballroomDancing ? 1 : 0) +
            (profileService.currentProfile.countryDancing ? 1 : 0) +
            (profileService.currentProfile.salsaDancing ? 1 : 0) +
            (profileService.currentProfile.fineDining ? 1 : 0) +
            (profileService.currentProfile.karaoke ? 1 : 0) +
            (profileService.currentProfile.liveTheater ? 1 : 0) +
            (profileService.currentProfile.movies ? 1 : 0) +
            (profileService.currentProfile.wineTasting ? 1 : 0);
        //console.log('aNightOutInterestTotal : ', this.aNightOutInterestTotal);
        return this.aNightOutInterestTotal;
    };

    //setting values for the service,
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

    this.aNightOutInterestButtonClicked = function(){
        this.setNightOutInterests();
        this.aNightOutInterestCount();
    };

    this.setUrl = function(){
        $location.url('/interests_outdoors');
    };

    this.clickSaveButton = function () {
        this.setNightOutInterests();
        profileService.update();
        $location.url('/edit_profile');
    };
});

app.controller('interestsOutdoorsController', function (profileService, userService, $log, $location) {
    this.$log = $log;
    this.loggedIn = userService.isLoggedIn();

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

    //Sums up the interests for this view
    this.outdoorInterestCount = function () {
        this.outdoorInterestTotal = (profileService.currentProfile.bicycling ? 1 : 0) +
            (profileService.currentProfile.bowling ? 1 : 0) +
            (profileService.currentProfile.golf ? 1 : 0) +
            (profileService.currentProfile.hiking ? 1 : 0) +
            (profileService.currentProfile.horsebackRiding ? 1 : 0) +
            (profileService.currentProfile.kayaking ? 1 : 0) +
            (profileService.currentProfile.motorcycling ? 1 : 0) +
            (profileService.currentProfile.racquetball ? 1 : 0) +
            (profileService.currentProfile.tennis ? 1 : 0) +
            (profileService.currentProfile.walking ? 1 : 0);
        //console.log('outdoorInterestTotal : ', this.outdoorInterestTotal);
        return this.outdoorInterestTotal;
    };

    //setting values for the service,
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

    this.outdoorInterestButtonClicked = function () {
        this.setOutdoorInterests();
        this.outdoorInterestCount();
    };

    this.setUrl = function () {
        $location.url('/interests_travel');
    };

    this.clickSaveButton = function () {
        this.setOutdoorInterests();
        profileService.update();
        $location.url('/edit_profile');
    };
});

app.controller('interestsTravelController', function (profileService, userService, $log, $location) {
    this.$log = $log;
    this.loggedIn = userService.isLoggedIn();

    // functions called from interests_travel.html
    //Getting the value from the Service in case it's already been selected
    this.camping = profileService.getCamping();
    this.domesticTravel = profileService.getDomesticTravel();
    this.rving = profileService.getRving();
    this.travelAbroad = profileService.getTravelAbroad();

    //Sums up the interests for this view
    this.travelInterestCount = function() {
        this.travelInterestTotal = (profileService.currentProfile.camping ? 1 : 0) +
            (profileService.currentProfile.domesticTravel ? 1 : 0) +
            (profileService.currentProfile.rving ? 1 : 0) +
            (profileService.currentProfile.travelAbroad ? 1 : 0);
        //console.log('travelInterestTotal : ', this.travelInterestTotal);
        return this.travelInterestTotal;
    };

    //setting values for the service,
    this.setTravelInterests = function () {
        profileService.currentProfile.camping = this.camping;
        profileService.currentProfile.domesticTravel = this.domesticTravel;
        profileService.currentProfile.rving = this.rving;
        profileService.currentProfile.travelAbroad = this.travelAbroad;
    };

    // This section is for validating that at least one interest is selected
    //and counts the total interests
    this.interestCount = function() {
        var count = profileService.interestCount();
        //console.log('Interest count total : ', count);
        return count;
    };

    this.travelInterestButtonClicked = function(){
        this.setTravelInterests();
        this.travelInterestCount();
    };

    this.setUrl = function(){
        this.interestCount();
         $location.url('/user_fyi');
    };

    this.clickSaveButton = function(){
        this.setTravelInterests();
        profileService.update();
        $location.url('/edit_profile');
    };
});

app.controller('userFyiController', function(){
});

app.controller('sampleMatchController', function(profileService) {
    var self = this;
    this.results = 'searching...';
    this.waiting = true;
    this.sampleMatches = [];
    this.currentProfile = profileService.getCurrentProfile();

    profileService.getSampleMatches(this.currentProfile)
        .then(function(response) {
                //console.log('sampleMatchController: success');
                self.sampleMatches = response.matches;
                self.results = self.sampleMatches.length + ' sample matches:';
                self.waiting = false;
            },
            function(response) {
                //console.log('sampleMatchController: error: ' + response);
                self.sampleMatchesResults = response;
                self.results = 'no matches available at this time; you can go back and select more interests, ' +
                    'or just sign up and then check back later for new matches';
                self.results += ' (' + response + ')';
                self.waiting = false;
            });
});

app.controller('signupEmailController', function(userService, $location){
    var self = this;
    self.emailAddress = userService.getEmail();
    this.displayEmail = function(){
        if(this.emailAddress){
        return this.emailAddress;
        }
         else{
             return '';
        }
    };

    this.validate = false;
    // this.ourEmail = '';
    this.validate_email = function() {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //console.log(self.emailAddress);
        var isValid = regex.test(self.emailAddress);
        //console.log('isValid is', isValid);
        if (!isValid) {
            //invalid input
            // $('.error').show();
            //console.log('email is invalid');
            this.validate = true;
        }
        else {
            //valid input
            // $('.error').hide();
            //console.log('email is valid');
            this.validate = false;
            userService.userStatus.email = self.emailAddress; 
            //console.log('userService.userStatus.email', userService.userStatus.email);
            $location.url('/signup_password');
        }
    }   
});

app.controller('signupPasswordController', function(userService, $location) {
    this.validPassword = true;
    this.matchingPassword = true;
    this.ourPassword = '';
    this.confirmPassword = '';
    this.validate_password = function() {
        var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;//8 characters, uppercase, lowercase, number
        var pass = this.ourPassword;
        var conf = this.confirmPassword;
        //if pass==conf, then return true, if not return false
        this.matchingPassword = (pass==conf);
        //if pass.match(pattern), then return true if not return false
        this.validPassword = (pass.match(pattern));
        if( this.validPassword && this.matchingPassword){
            userService.userStatus.password = this.ourPassword;
            $location.url('/signup_paragraph');
        }
    }
});

app.controller('signupParagraphController', function(profileService, $log, $location){
    this.validationText = true;
    this.validationText = true;
    this.maxLength = 200;

      //Get the paragraph value from the service
    this.paragraph = profileService.getParagraph();

      //Set the paragraph value in the service
    this.setDescriptionParagraph = function (){
        profileService.currentProfile.paragraph = this.paragraph;
    };

      //paragraph validation
    this.validateParagraph = function(){
        if(this.paragraph.length < 50) {
            //console.log('Please add a paragraph that is greater than 50 characters.');
            this.validationText = false;
            return true;
        } else {
            $location.url('/signup_picture');
        }
    };

    this.showValidationText = function(){
        if(this.paragraph.length > 0 && this.paragraph.length < 50 ) {
            //console.log('Please add a paragraph of at least 50 characters.');
            var showValidationText = false;
            return showValidationText;
        };
    };

    this.signUpParagraphButtonClick = function(){
        this.setDescriptionParagraph();
        this.validateParagraph();
    };
});

app.controller('signupPictureController', function (profileService, $log, $location, $scope) {
    var self = this;
    // Link to picture to allow data binding.
    this.pictureLink = null;

    this.setUrl = function(){
        $location.url('/terms');
    };
    /**
     *  Dropzone
     */
    Dropzone.autoDiscover = false;
    this.pictureDropzone = new Dropzone("#picture-dropzone-div", {
        url: 'profile/upload.php',
        maxFilesize: 3, // MB.
        paramName: 'file',
        maxFiles: 1,
        maxfilesexceeded: function(file) {
            alert('Only one file is allowed.');
        },
        success: function(response) {
            var responseObj = JSON.parse(response.xhr.response);

            // Remove the existing file from the Dropzone.
            this.removeAllFiles();

            if (responseObj.success) {
                var newLink = responseObj.newLink;
                //console.log('Dropzone: success: ' + newLink);
                self.pictureLink = newLink;
                self.uploadResults = 'Success, new link: ' + newLink;
            }
            // Error from upload.php
            else {
                console.warn('Dropzone: error: ' + responseObj.message);
                self.uploadResults = 'Error: ' + responseObj.message;
            }

            // Dropzone operates outside of the digest cycle, so we have to manually declare changes.
            profileService.setPictureLink(newLink);
            $scope.$apply();
        },
        acceptedFiles: 'image/*,.jpg,.jpeg,.gif,.png',
        accept: function(file, done) {
            //console.log('Dropzone: accept: ' + file);
            done();
        },
        init: function() {
            //console.log('Dropzone: init: ' + this);
        }

    });

});

app.controller('termsController', function(profileService, $log, $location){
    this.$log = $log;

    //setting value for the service,
    this.setAcceptedTerms = function () {
        profileService.currentProfile.acceptedTerms = this.acceptedTerms;
    };

    this.termsButtonClicked = function(){
        $location.url('/user_summary');
    };
});

app.controller('faqController', function(){

});


app.controller('loginController', function($location, userService){
    //Login Page Controller
    var self = this;
    this.username = '';
    this.password = '';
    this.invalidParams = false;
    this.loginFailed = false;

    // Note that the login has two parts for a normal user: log in the user, and get the profile.
    this.doLogin = function() {
        self.loginFailed = self.profileFailed = self.invalidParams = false;
        if (this.username === '' || this.password === '') {
            this.invalidParams = true;
        }
        else {
            userService.login(this.username, this.password)
                .then(function(response) {
                        //console.log('doLogin: success, userLevel: ' + userService.getUserLevel());
                        // Go to the next page based on what level of user we are.
                        switch (userService.getUserLevel()) {
                            case 'administrator':
                                $location.url('/administrator');
                                break;
                            case 'moderator':
                                $location.url('/moderator');
                                break;
                            case 'normal':
                            default:
                                $location.url('/match');
                                break;
                        }
                    },
                    function(response) {
                        //console.log('doLogin: error');
                        self.loginFailed = true;
                    });

        }
    };
});

app.controller('matchController', function(profileService, matchService) {
    var self = this;
    this.results = 'calculating...';
    this.matches = [];
    this.currentProfile = profileService.getCurrentProfile();

    // getMatches is called automatically during controller startup (after the calculate),
    // and can be initiated again from the button to refresh / get more matches.
    this.getMatches = function() {
        var username = this.currentProfile.username;
        //console.log('getMatches: ' + username);
        this.matches = [];
        this.results = 'getting matches...';

        matchService.get(username)
            .then(function (response) {
                    //console.log('getMatches: success');
                    self.matches = response.matches;
                    self.results = 'Success: matches returned: ' + self.matches.length;
                    for (var i = 0; i < self.matches.length; i++) {
                        var match = self.matches[i];
                        match.commonInterestString = profileService.getCommonInterestString(
                            self.currentProfile, match);
                    }
                },
                function (response) {
                    //console.log('getMatches: error: ' + response);
                    self.results = 'no matches available at this time';
                    self.results += ' (' + response + ')';
                });

    };

    // approve and reject functions: second parameter is true to approve and false to reject.
    this.approveOrReject = function(matchIndex, approve) {
        var username = this.currentProfile.username;
        var match = this.matches[matchIndex];
        var targetUsername = match['username'];
        //console.log('approveOrReject: ' + username + ' --> ' + targetUsername + ' = ' + approve);
        matchService.approve(username, targetUsername, approve)
            .then(function (response) {
                    //console.log('approveOrReject: success');
                    match.approveOrRejectResults = (approve ? 'approved' : 'rejected');
                },
                function (response) {
                    //console.log('approveOrReject: error: ' + response);
                    self.approveRejectResults[matchIndex] = response;
                    match.approveOrRejectResults = (approve ? 'approve' : 'reject') + ' operation failed (' +
                        response + ')';
                });

    };

    // This code runs when this controller starts.
    matchService.calculate(this.currentProfile)
        .then(function(response) {
                //console.log('match calculate: success');
                self.results = 'Success: match database updated';
                self.getMatches();
            },
            function(response) {
                //console.log('match calculate: error: ' + response);
                self.results = 'no matches available at this time';
                self.results += ' (' + response + ')';
            });

});
app.controller('signupNameController', function(userService, $location, $log){
    this.$log = $log;
    this.name = userService.getName();
        this.setName = function () {
            userService.userStatus.name = this.name;
        };
    this.nameButtonClicked = function(){
        this.validateName();
        this.setName();

    };
    this.validateName = function(){
        if(this.name === null){
            this.addResults = true;
            //console.log('Here is the result of calling the validateName function', this.addResults);
        } else {
            $location.url('/signup_email');
        }
    };

});

app.controller('userSummaryController', function(userService, profileService, $location, $log){
    var self = this;
    this.$log = $log;
    this.username = null;
    this.addError = false;
    this.addErrorMessage = null;

    this.summaryButtonClicked = function(){
        $location.url('/match');
    };

    userService.add(userService.getName(), userService.getPassword(), userService.getEmail())
        .then(function(response) {
                //console.log('onAddUserButton: success');
                self.username = response.username;
                //console.log('Here is the userName: ', self.username);

                // Got the username from the add user; set that username in the profile.
                profileService.currentProfile.username = self.username;

                profileService.add(profileService.currentProfile)
                    .then(function(response) {
                            //console.log('addProfile: success');
                        },
                        function(response) {
                            //console.log('addProfile: error: ' + response.message);
                            self.addErrorMessage = response;
                            self.addError = true;
                        });

            },
            function(response) {
                //console.log('addProfile: error');
                self.addErrorMessage = response;
                self.addError = true;
            });

});

app.controller('editProfileController',function(){

});
app.controller('administratorController', function(){

});

app.controller('moderatorController', function(){

});

