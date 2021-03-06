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
        acceptedTerms: null,
        profileId: null,
        username: null,
        pictureLink: null,
        paragraph: '',

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
        this.currentProfile.acceptedTerms = true;
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
    this.getAcceptedTerms =     function() { return this.currentProfile.acceptedTerms };
    this.getCurrentProfile =    function() { return this.currentProfile };
    this.getProfileId =         function() { return this.currentProfile.profileId };
    this.getUsername =          function() { return this.currentProfile.username };
    this.getPictureLink =       function() { return this.currentProfile.pictureLink };
    this.getParagraph =         function() { return this.currentProfile.paragraph };

    this.getZipcode =           function() { return this.currentProfile.zipcode };
    this.getCity =              function() { return this.currentProfile.city };
    this.getLatitude =          function() { return this.currentProfile.latitude };
    this.getLongitude =         function() { return this.currentProfile.longitude };
    this.getDistanceMax =       function() { return this.currentProfile.distanceMax };
    this.getOurAgeMin =         function() { return this.currentProfile.ourAgeMin };
    this.getOurAgeMax =         function() { return this.currentProfile.ourAgeMax };
    this.getTheirAgeMin =       function() { return this.currentProfile.theirAgeMin };
    this.getTheirAgeMax =       function() { return this.currentProfile.theirAgeMax };

    this.getBoardGames =        function() { return this.currentProfile.boardGames };
    this.getCardGames =         function() { return this.currentProfile.cardGames };
    this.getCooking =           function() { return this.currentProfile.cooking };
    this.getConversation =      function() { return this.currentProfile.conversation };
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
     *  interestCount - count the profile's interests (used in validation).
     *  @return {int}   count of booleans set.
     */
    this.interestCount = function(){
        console.log('interestCount function is being called: ');
        var total = (this.currentProfile.boardGames ? 1 : 0) +
        (this.currentProfile.cardGames ? 1 : 0) +
        (this.currentProfile.cooking ? 1 : 0) +
        (this.currentProfile.conversation ? 1 : 0) +
        (this.currentProfile.crafts ? 1 : 0) +
        (this.currentProfile.bookClub ? 1 : 0) +
        (this.currentProfile.movieNight ? 1 : 0) +

        (this.currentProfile.artGalleries ? 1 : 0) +
        (this.currentProfile.comedy ? 1 : 0) +
        (this.currentProfile.classicalConcerts ? 1 : 0) +
        (this.currentProfile.popularConcerts ? 1 : 0) +
        (this.currentProfile.ballroomDancing ? 1 : 0) +
        (this.currentProfile.countryDancing ? 1 : 0) +
        (this.currentProfile.salsaDancing ? 1 : 0) +
        (this.currentProfile.casualDining ? 1 : 0) +
        (this.currentProfile.fineDining ? 1 : 0) +
        (this.currentProfile.karaoke ? 1 : 0) +
        (this.currentProfile.liveTheater ? 1 : 0) +
        (this.currentProfile.movies ? 1 : 0) +
        (this.currentProfile.wineTasting ? 1 : 0) +

        (this.currentProfile.bicycling ? 1 : 0) +
        (this.currentProfile.bowling ? 1 : 0) +
        (this.currentProfile.golf ? 1 : 0) +
        (this.currentProfile.hiking ? 1 : 0) +
        (this.currentProfile.horsebackRiding ? 1 : 0) +
        (this.currentProfile.kayaking ? 1 : 0) +
        (this.currentProfile.motorcycling ? 1 : 0) +
        (this.currentProfile.racquetball ? 1 : 0) +
        (this.currentProfile.tennis ? 1 : 0) +
        (this.currentProfile.walking ? 1 : 0) +

        (this.currentProfile.camping ? 1 : 0) +
        (this.currentProfile.rving ? 1 : 0) +
        (this.currentProfile.domesticTravel ? 1 : 0) +
        (this.currentProfile.travelAbroad ? 1 : 0);
         return total;
    };

    /**
     *  getCommonInterestString - build a string of common interests between two profiles.
     *  @param  {object}    profile1
     *  @param  {object}    profile2
     *  @return {string}    space-separated list of common interests.
     */
    this.getCommonInterestString = function(profile1, profile2){
        var retString = 
            ((profile1.boardGames && profile2.boardGames) ? "board games, " : "") +
            ((profile1.cardGames && profile2.cardGames) ? "card games, " : "") +
            ((profile1.cooking && profile2.cooking) ? "cooking, " : "") +
            ((profile1.conversation && profile2.conversation) ? "conversation, " : "") +
            ((profile1.crafts && profile2.crafts) ? "crafts, " : "") +
            ((profile1.bookClub && profile2.bookClub) ? "book club, " : "") +
            ((profile1.movieNight && profile2.movieNight) ? "movie night, " : "") +

            ((profile1.artGalleries && profile2.artGalleries) ? "art galleries, " : "") +
            ((profile1.comedy && profile2.comedy) ? "comedy, " : "") +
            ((profile1.classicalConcerts && profile2.classicalConcerts) ? "classical concerts, " : "") +
            ((profile1.popularConcerts && profile2.popularConcerts) ? "popular concerts, " : "") +
            ((profile1.ballroomDancing && profile2.ballroomDancing) ? "ballroom dancing, " : "") +
            ((profile1.countryDancing && profile2.countryDancing) ? "country dancing, " : "") +
            ((profile1.salsaDancing && profile2.salsaDancing) ? "salsa dancing, " : "") +
            ((profile1.casualDining && profile2.casualDining) ? "casual dining, " : "") +
            ((profile1.fineDining && profile2.fineDining) ? "fine dining, " : "") +
            ((profile1.karaoke && profile2.karaoke) ? "karaoke, " : "") +
            ((profile1.liveTheater && profile2.liveTheater) ? "live theater, " : "") +
            ((profile1.movies && profile2.movies) ? "movies, " : "") +
            ((profile1.wineTasting && profile2.wineTasting) ? "wine tasting, " : "") +

            ((profile1.bicycling && profile2.bicycling) ? "bicycling, " : "") +
            ((profile1.bowling && profile2.bowling) ? "bowling, " : "") +
            ((profile1.golf && profile2.golf) ? "golf, " : "") +
            ((profile1.hiking && profile2.hiking) ? "hiking, " : "") +
            ((profile1.horsebackRiding && profile2.horsebackRiding) ? "horseback riding, " : "") +
            ((profile1.kayaking && profile2.kayaking) ? "kayaking, " : "") +
            ((profile1.motorcycling && profile2.motorcycling) ? "motorcycling, " : "") +
            ((profile1.racquetball && profile2.racquetball) ? "racquetball, " : "") +
            ((profile1.tennis && profile2.tennis) ? "tennis, " : "") +
            ((profile1.walking && profile2.walking) ? "walking, " : "") +

            ((profile1.camping && profile2.camping) ? "camping, " : "") +
            ((profile1.rving && profile2.rving) ? "RVing, " : "") +
            ((profile1.domesticTravel && profile2.domesticTravel) ? "domestic travel, " : "") +
            ((profile1.travelAbroad && profile2.travelAbroad) ? "travel abroad, " : "");
        // Remove trailing comma and space.
        retString = retString.slice(0,-2);
        return retString;
    };

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
        if (ourAgeMin >= 18 && ourAgeMin <= 100 &&
            ourAgeMax >= ourAgeMin && ourAgeMax <= 100) {
            this.currentProfile.ourAgeMin = ourAgeMin;
            this.currentProfile.ourAgeMax = ourAgeMax;
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
        if (theirAgeMin >= 18 && theirAgeMin <= 100 &&
            theirAgeMax >= theirAgeMin && theirAgeMax <= 100) {
            this.currentProfile.theirAgeMin = theirAgeMin;
            this.currentProfile.theirAgeMax = theirAgeMax;
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
                    // Save the returned profile ID.
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
                if (response.success) {
                    self.sampleMatches = response.matches;
                    def.resolve(response);
                } else {
                    // Tolerate normal "no matches found" without calling it a "Server error".
                    if (response.message == 'No matches found') {
                        def.reject(response.message);
                    } else {
                        def.reject('Server error: ' + response.message);
                    }
                }
            },
            error: function(response) {
                $log.warn('getSampleMatches: error');
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
