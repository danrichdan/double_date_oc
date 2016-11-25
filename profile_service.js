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

        zipCode: null,
        distanceMax: null,
        ourAgeMin: null,
        ourAgeMax: null,
        theirAgeMin: null,
        theirAgeMax: null,

        bicycling: false
    };

    /**
     *  clearCurrentProfile - clear out the global currentProfile object.
     */
    this.clearCurrentProfile = function() {
        this.currentProfile.profileId = null;
        this.currentProfile.username = null;
        this.currentProfile.pictureLink = null;
        this.currentProfile.paragraph = null;

        this.currentProfile.zipCode = null;
        this.currentProfile.distanceMax = null;
        this.currentProfile.ourAgeMin = null;
        this.currentProfile.ourAgeMax = null;
        this.currentProfile.theirAgeMin = null;
        this.currentProfile.theirAgeMax = null;

        this.currentProfile.bicycling = false;
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
                    self.currentProfile.profileId = response.profileId;
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
