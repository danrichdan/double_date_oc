/**
 *  proto_profile_controller.js - DoubleDate prototype for Angular controller to manage current profile.
 *      This module is a prototype controller to test the profile_service,
 *      along with the back end profile/*.php files.
 */

gApp.controller("protoProfileController", function($scope, profileService){
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
     *  uploadResults   - Results from Dropzone upload operation.
     */
    this.addResults = '';
    this.getResults = '';
    this.updateResults = '';
    this.uploadResults = '';

    /**
     *  Dropzone
     */
    Dropzone.autoDiscover = false;
    this.pictureDropzone = new Dropzone("#picture-dropzone-div", {
        url: 'profile/upload.php',
        maxFilesize: 2, // MB.
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
                console.log('Dropzone: success: ' + newLink);
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
            console.log('Dropzone: accept: ' + file);
            done();
        },
        init: function() {
            console.log('Dropzone: init: ' + this);
        }

    });

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