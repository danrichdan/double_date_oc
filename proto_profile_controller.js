/**
 *  proto_profile_controller.js - DoubleDate prototype for Angular controller to manage current profile.
 *      This module is a prototype controller to test the profile_service,
 *      along with the back end profile/*.php files.
 */

gApp.controller("protoProfileController", function(profileService){
    console.log('protoProfileController: constructor');
    var self = this;

    /**
     *  currentProfile - reference to main profile object in profileService.
     *  @type {Object}
     */
    this.currentProfile = profileService.currentProfile;

    /**
     *  addGetUsername - username from the add-get-username input to use in an Add or Get operation.
     *  @type {string}
     */
    this.addGetUsername = null;

    /**
     *  profileGotten - flag to hold whether we have done a get before we try an update.
     *  @type {boolean}
     */
    this.profileGotten = false;

    /**
     *  addResults      - Results from add operation.
     *  getResults      - Results from get operation.
     *  updateResults   - Results from update operation.
     */
    this.addResults = '';
    this.getResults = '';
    this.updateResults = '';

    /**
     *  onAddButton - click handler.
     */
    this.onAddButton = function() {
        var username = this.addGetUsername;
        this.currentProfile.username = username;
        console.log('onAddButton: ' + username);
        if (!username) {
            self.addResults = 'Please specify a username before clicking on the Add button.';
        } else {
            self.addResults = 'Starting add.';
            profileService.add(this.currentProfile)
                .then(function(response) {
                        console.log('onAddButton: success');
                        self.addResults = 'Success: profileId ' + response.profileId + ' added';
                        self.profileGotten = true;
                    },
                    function(response) {
                        console.log('onAddButton: error: ' + response.message);
                        self.addResults = response;
                    });
        }
    };

    /**
     *  onClearButton - click handler.
     */
    this.onClearButton = function() {
        console.log('onClearButton');
        profileService.clearCurrentProfile();
    };

    /**
     *  onGetButton - click handler.
     */
    this.onGetButton = function() {
        var username = this.addGetUsername;
        console.log('onGetButton: ' + username);
        if (!username) {
            self.getResults = 'Please specify a username before clicking on the Get button.';
        } else {
            self.getResults = 'Starting get.';
            profileService.get(username)
                .then(function(response) {
                        console.log('onGetButton: success');
                        self.getResults = 'Success: updating fields';
                        self.currentProfile = response.profile;
                        self.profileGotten = true;
                    },
                    function(response) {
                        console.log('onGetButton: error: ' + response.message);
                        self.getResults = response;
                    });
        }
    };

    /**
     *  onUpdateButton - click handler.
     */
    this.onUpdateButton = function() {
        console.log('onUpdateButton');
        if (!this.profileGotten) {
            this.updateResults = 'Please do a Get and update fields before clicking on the Update button.';
        } else {
            this.updateResults = 'Starting update.';
            profileService.update(this.currentProfile)
                .then(function(response) {
                    console.log('onUpdateButton: success');
                    self.updateResults = 'Success';
                },
                function(response) {
                    console.log('onUpdateButton: error: ' + response.message);
                    self.updateResults = response;
                });
        }
    };

});