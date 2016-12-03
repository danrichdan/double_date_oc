/**
 *  profile_service.js - DoubleDate Angular profile service to manage current profile.
 *      This service shares data through the currentProfile variable, and has three major
 *      functional interfaces: add, get, and update.
 */

app.service("profileService", ['$http', '$q', '$log', function($http, $q, $log) {
    $log.log('profileService: constructor');
    var self = this;
    /**
     *  currentProfile - Global object with status.
     *  @type {object}
     */
    this.currentProfile = {
        profileId: null,
        username: null,
        pictureLink: null,
        paragraph: null,

        zipcode: null,
        city: null,
        latitude: null,
        longitude: null,
        distanceMax: null,
        ourAgeMin: null,
        ourAgeMax: null,
        theirAgeMin: null,
        theirAgeMax: null,

        boardGames: false,
        cardGames: false,
        cooking: false,
        conversation: false,
        crafts: false,
        bookClub: false,
        movieNight: false,

        artGalleries: false,
        comedy: false,
        classicalConcerts: false,
        popularConcerts: false,
        ballroomDancing: false,
        countryDancing: false,
        salsaDancing: false,
        casualDining: false,
        fineDining: false,
        karaoke: false,
        liveTheater: false,
        movies: false,
        wineTasting: false,

        bicycling: false,
        bowling: false,
        golf: false,
        hiking: false,
        horsebackRiding: false,
        kayaking: false,
        motorcycling: false,
        racquetball: false,
        tennis: false,
        walking: false,
        
        camping: false,
        rving: false,
        domesticTravel: false,
        travelAbroad: false
    };

    /**
     *  clearCurrentProfile - clear out the global currentProfile object.
     */
    this.clearCurrentProfile = function() {
        this.currentProfile.profileId = null;
        this.currentProfile.username = null;
        this.currentProfile.pictureLink = null;
        this.currentProfile.paragraph = null;

        this.currentProfile.zipcode = null;
        this.currentProfile.city = null;
        this.currentProfile.latitude = null;
        this.currentProfile.longitude = null;
        this.currentProfile.distanceMax = null;
        this.currentProfile.ourAgeMin = null;
        this.currentProfile.ourAgeMax = null;
        this.currentProfile.theirAgeMin = null;
        this.currentProfile.theirAgeMax = null;

        this.currentProfile.boardGames = false;
        this.currentProfile.cardGames = false;
        this.currentProfile.cooking = false;
        this.currentProfile.conversation = false;
        this.currentProfile.crafts = false;
        this.currentProfile.bookClub = false;
        this.currentProfile.movieNight = false;

        this.currentProfile.artGalleries = false;
        this.currentProfile.comedy = false;
        this.currentProfile.classicalConcerts = false;
        this.currentProfile.popularConcerts = false;
        this.currentProfile.ballroomDancing = false;
        this.currentProfile.countryDancing = false;
        this.currentProfile.salsaDancing = false;
        this.currentProfile.casualDining = false;
        this.currentProfile.fineDining = false;
        this.currentProfile.karaoke = false;
        this.currentProfile.liveTheater = false;
        this.currentProfile.movies = false;
        this.currentProfile.wineTasting = false;

        this.currentProfile.bicycling = false;
        this.currentProfile.bowling = false;
        this.currentProfile.golf = false;
        this.currentProfile.hiking = false;
        this.currentProfile.horsebackRiding = false;
        this.currentProfile.kayaking = false;
        this.currentProfile.motorcycling = false;
        this.currentProfile.racquetball = false;
        this.currentProfile.tennis = false;
        this.currentProfile.walking = false;

        this.currentProfile.camping = false;
        this.currentProfile.rving = false;
        this.currentProfile.domesticTravel = false;
        this.currentProfile.travelAbroad = false
    };

    /**
     *  sampleMatchesArray - return data from getSampleMatches.
     *  @type {[object]}
     */
    this.sampleMatches = [];

    /**
     *  get methods
     */
    this.getProfileId =         function() { return this.currentProfile.profileId };
    this.getUsername =          function() { return this.currentProfile.username };
    this.getPictureLink =       function() { return this.currentProfile.pictureLink };
    this.getParagraph =         function() { return this.currentProfile.paragraph };

    this.getZipcode =           function() { console.log('in getZipcode func in profService'); return this.currentProfile.zipcode };
    this.getCity =              function() { return this.currentProfile.city };
    this.getLatitude =          function() { return this.currentProfile.latitude };
    this.getLongitude =         function() { return this.currentProfile.longitude };
    this.getDistanceMax =       function() { return this.currentProfile.distanceMax };
    this.getOurAgeMin =         function() { return this.currentProfile.ourAgeMin };
    this.getOurAgeMax =         function() { return this.currentProfile.outAgeMax };
    this.getTheirAgeMin =       function() { return this.currentProfile.theirAgeMin };
    this.getTheirAgeMax =       function() { return this.currentProfile.theirAgeMax };

    this.getBoardGames =        function() { return this.currentProfile.boardGames };
    this.getCardGames =         function() { return this.currentProfile.cardGames };
    this.getCooking =           function() { return this.currentProfile.cooking };
    this.getConversation =      function() { return this.currentProfile.converations };
    this.getCrafts =            function() { return this.currentProfile.crafts };
    this.getBookClub =          function() { return this.currentProfile.bookClub };
    this.getMovieNight =        function() { return this.currentProfile.movieNight };

    this.getArtGalleries =      function() { return this.currentProfile.artGalleries };
    this.getComedy =            function() { return this.currentProfile.comedy };
    this.getClassicalConcerts = function() { return this.currentProfile.classicalConcerts };
    this.getPopularConcerts =   function() { return this.currentProfile.popularConcerts };
    this.getBallroomDancing =   function() { return this.currentProfile.ballroomDancing };
    this.getCountryDancing =    function() { return this.currentProfile.countryDancing };
    this.getSalsaDancing =      function() { return this.currentProfile.salsaDancing };
    this.getCasualDining =      function() { return this.currentProfile.casualDining };
    this.getFineDining =        function() { return this.currentProfile.fineDining };
    this.getKaraoke =           function() { return this.currentProfile.karaoke };
    this.getLiveTheater =       function() { return this.currentProfile.liveTheater };
    this.getMovies =            function() { return this.currentProfile.movies };
    this.getWineTasting =       function() { return this.currentProfile.wineTasting };

    this.getBicycling =         function() { return this.currentProfile.bicycling };
    this.getBowling =           function() { return this.currentProfile.bowling };
    this.getGolf =              function() { return this.currentProfile.golf };
    this.getHiking =            function() { return this.currentProfile.hiking };
    this.getHorsebackRiding =   function() { return this.currentProfile.horsebackRiding };
    this.getKayaking =          function() { return this.currentProfile.kayaking };
    this.getMotorcycling =      function() { return this.currentProfile.motorcycling };
    this.getRacquetball =       function() { return this.currentProfile.racquetball };
    this.getTennis =            function() { return this.currentProfile.tennis };
    this.getWalking =           function() { return this.currentProfile.walking };

    this.getCamping =           function() { return this.currentProfile.camping };
    this.getRving =             function() { return this.currentProfile.rving };
    this.getDomesticTravel =    function() { return this.currentProfile.domesticTravel };
    this.getTravelAbroad =      function() { return this.currentProfile.travelAbroad };

    /**
     *  setDistanceMax - validate and set distanceMax field.
     *  @param  {int}       distanceMax
     *  @return {boolean}   true if success.
     */
    this.setDistanceMax = function(distanceMax) {
        if (distanceMax >= 1 && distanceMax <= 100) {
            this.distanceMax = distanceMax;
            return true;
        } else {
            return false;
        }
    };

    /**
     *  setOurAge - validate and set ourAgeMin and ourAgeMax fields.
     *  @param  {int}       ourAgeMin
     *  @param  {int}       ourAgeMax
     *  @return {boolean}   true if success.
     */
    this.setOurAge = function(ourAgeMin, ourAgeMax) {
        if (ourAgeMin >= 18 && ourAgeMin <= 99 &&
            ourAgeMax >= ourAgeMin && ourAgeMax <= 99) {
            this.ourAgeMin = ourAgeMin;
            this.ourAgeMax = ourAgeMax;
            return true;
        } else {
            return false;
        }
    };

    /**
     *  setPictureLink - set link to picture where it got uploaded.
     *  @param {string} link - New string to set.
     */
    this.setPictureLink = function(link) {
        $log.log('setPictureLink: ' + link);
        this.currentProfile.pictureLink = link;
    };

    /**
     *  setTheirAge - validate and set theirAgeMin and theirAgeMax fields.
     *  @param  {int}       theirAgeMin
     *  @param  {int}       theirAgeMax
     *  @return {boolean}   true if success.
     */
    this.setTheirAge = function(theirAgeMin, theirAgeMax) {
        if (theirAgeMin >= 18 && theirAgeMin <= 99 &&
            theirAgeMax >= theirAgeMin && theirAgeMax <= 99) {
            this.theirAgeMin = theirAgeMin;
            this.theirAgeMax = theirAgeMax;
            return true;
        } else {
            return false;
        }
    };

    /**
     *  setZipcode - validate and set zipcode field.
     *  @param  {int}       zipcode
     *  @return {boolean}   true if success.
     */
    this.setZipcode = function(zipcode) {
        if (zipcode >= 90000 && zipcode <= 99999) {
            this.zipcode = zipcode;
            return true;
        } else {
            return false;
        }
    };

    /**
     *  add - start an add operation on the currentProfile.
     *  @returns (object) - promise.
     */
    this.add = function() {
        $log.log('add: starting');
        var def = $q.defer();

        $.ajax({
            url: 'profile/add.php',
            method: 'post',
            dataType: 'json',
            cache: false,
            data: {
                profile: this.currentProfile
            },
            success: function(response) {
                $log.log('add: success: ' + response.success);
                if (response.success) {
                    // Save the returned profilel ID.
                    self.currentProfile.profileId = response.profileId;
                    // Save the extra values from the zip code translation.
                    self.currentProfile.city = response.city;
                    self.currentProfile.latitude = response.latitude;
                    self.currentProfile.longitude = response.longitude;

                    def.resolve(response);
                } else {
                    $log.log('add: error: ' + response.message);
                    def.reject('Server error: ' + response.message);
                }
            },
            error: function(response) {
                $log.warn('add: error');
                def.reject('Network error ' + response.status + ': ' + response.statusText);
            }
        });

        return def.promise;
    };

    /**
     *  get - start a get operation on the specified username.
     *  @param username (string)
     *  @returns (object) - promise.
     */
    this.get = function(username) {
        $log.log('get: ' + username);
        // Clear out any existing data in the currentProfile.
        this.clearCurrentProfile();

        var def = $q.defer();

        $.ajax({
            url: 'profile/get.php',
            method: 'post',
            dataType: 'json',
            cache: false,
            data: {
                username: username
            },
            success: function(response) {
                $log.log('get: success: ' + response.success);
                if (response.success) {
                    self.currentProfile = response.profile;
                    def.resolve(response);
                } else {
                    def.reject('Server error: ' + response.message);
                }
            },
            error: function(response) {
                $log.warn('get: error');
                def.reject('Network error ' + response.status + ': ' + response.statusText);
            }
        });

        return def.promise;
    };

    /**
     *  getSampleMatches - start a get sample matches operation based on the currentProfile.
     *  @param profile (object)
     *  @returns (object) - promise.
     */
    this.getSampleMatches = function(profile) {
        $log.log('getSampleMatches');
        // Clear out any existing data in the sampleMatches array.
        this.sampleMatches = [];

        // Create a promise to return to the caller.
        var def = $q.defer();

        // Check the passed parameters.  If any of them are invalid, reject the
        // promise (yes, it i

        $.ajax({
            url: 'profile/sample_matches.php',
            method: 'post',
            dataType: 'json',
            cache: false,
            data: {
                profile: profile
            },
            success: function(response) {
                $log.log('getSampleMatches: success: ' + response.success);
                debugger;
                if (response.success) {
                    self.currentProfile = response.profile;
                    def.resolve(response);
                } else {
                    def.reject('Server error: ' + response.message);
                }
            },
            error: function(response) {
                $log.warn('getSampleMatches: error');
                debugger;
                def.reject('Network error ' + response.status + ': ' + response.statusText);
            }
        });

        return def.promise;
    };

    /**
     *  update - start an update operation on the currentProfile.
     *  @returns (object) - promise.
     */
    this.update = function() {
        $log.log('update: ' + this.currentProfile.username);
        var def = $q.defer();

        $.ajax({
            url: 'profile/update.php',
            method: 'post',
            dataType: 'json',
            cache: false,
            //headers: {'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8'},
            data: {
                profile: this.currentProfile
            },
            success: function(response) {
                $log.log('update: success: ' + response.success);
                if (response.success) {
                    // Save the extra values from the zip code translation.
                    self.currentProfile.city = response.city;
                    self.currentProfile.latitude = response.latitude;
                    self.currentProfile.longitude = response.longitude;

                    def.resolve(response);
                } else {
                    def.reject('Server error: ' + response.message);
                }
            },
            error: function(response) {
                $log.warn('update: error');
                def.reject('Network error ' + response.status + ': ' + response.statusText);
            }
        });

        return def.promise;
    };

}]);
