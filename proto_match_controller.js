/**
 *  proto_match_controller.js - DoubleDate prototype for Angular controller to manage matches.
 *      This module is a prototype controller to test the match_service,
 *      along with the back end match/*.php files.
 */

app.controller("protoMatchController", function($scope, profileService, matchService){
    console.log('protoMatchController: constructor');
    var self = this;

    /**
     *  profileUsername - value from the profile-username input.
     *  @type {String}
     */
    this.profileUsername = null;

    /**
     *  currentProfile - reference to main profile object in profileService.
     *  @type {Object}
     */
    this.currentProfile = null;

    /**
     *  profileGotten - flag to hold whether we have done a Get Profile before we try to Calculate Matches.
     *  @type {boolean}
     */
    this.profileGotten = false;

    /**
     *  matchesCalculated - flag to hold whether we have done a Calculate Matches before we try to Get Matches.
     *  @type {boolean}
     */
    this.matchesCalculated = false;

    /**
     *  getProfileResults       - Results from Get Profile operation.
     *  calculateMatchesResults - Results from Calculate Matches operation.
     *  getMatchesResults       - Results from Get Matches operation.
     */
    this.getProfilesResults = '';
    this.calculateMatchesResults = '';
    this.getMatchesResults = '';

    /**
     *  matches - return data from getMatches.
     *  @type {[object]}
     */
    this.matches = [];

    /**
     *  onGetProfileButton - click handler.
     *  Note that this is only for the prototype.  In the real program, we will already have a user
     *  logged in or just created and logged in, and we will be getting matches for that user.
     */
    this.onGetProfileButton = function() {
        var username = this.profileUsername;
        console.log('onGetProfileButton: ' + username);
        if (!username) {
            self.getProfileResults = 'Please specify a username before clicking on the Get Profile button.';
        } else {
            self.getProfileResults = 'Starting Get Profile.';
            profileService.get(username)
                .then(function(response) {
                        console.log('onGetProfileButton: success');
                        self.getProfileResults = 'Success: displaying profile fields';
                        self.currentProfile = response.profile;
                        self.profileGotten = true;
                    },
                    function(response) {
                        console.log('onGetProfileButton: error: ' + response);
                        self.getProfileResults = response;
                    });
        }
    };

    /**
     *  onCalculateMatchesButton - click handler.
     */
    this.onCalculateMatchesButton = function() {
        if (!this.profileGotten) {
            self.calculateMatchesResults = 'Please use Get Profile before clicking on Calculate Matches.';
        } else {
            var username = this.currentProfile.Username;
            console.log('onCalculateMatchesButton: ' + username);
            self.calculateMatchesResults = 'Starting calculate matches.';
            matchService.calculate(this.currentProfile)
                .then(function(response) {
                        console.log('onCalculateMatchesButton: success');
                        self.calculateMatchesResults = 'Success';
                        self.matchesCalculated = true;
                    },
                    function(response) {
                        console.log('onCalculateMatchesButton: error: ' + response.message);
                        self.calculateMatchesResults = response;
                    });
        }
    };

    /**
     *  onGetMatchesButton - click handler.
     */
    this.onGetMatchesButton = function() {
        if (!this.profileGotten) {
            self.getMatchesResults = 'Please use Get Profile before clicking on Get Matches.';
        } else if (!this.matchesCalculated) {
            self.getMatchesResults = 'Please use Calculate Matches before clicking on Get Matches.';
        } else {
            var username = this.currentProfile.Username;
            console.log('onGetMatchesButton');
            self.getMatchesResults = 'Starting get matches.';
            matchService.getMatches(username)
                .then(function (response) {
                        console.log('onGetMatchesButton: success');
                        self.matches = response.matches;
                        self.getMatchesResults = 'Success: matches returned: ' + self.matches.length;
                    },
                    function (response) {
                        console.log('onGetMatchesButton: error: ' + response);
                        self.getMatchesResults = response;
                    });
        }
    };

});