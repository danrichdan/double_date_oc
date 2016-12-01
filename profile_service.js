/**
 *  profile_service.js - DoubleDate Angular profile service to manage current profile.
 *      This service shares data through the currentProfile variable, and has three major
 *      functional interfaces: add, get, and update.
 */

gApp.service("profileService", ['$http', '$q', '$log', function($http, $q, $log) {
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
     *  setPictureLink - set link to picture where it got uploaded.
     *  @param {string} link - New string to set.
     */
    this.setPictureLink = function(link) {
        $log.log('setPictureLink: ' + link);
        this.currentProfile.pictureLink = link;
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
