/**
 *  proto_user_controller.js - DoubleDate prototype for Angular controller to manage current user.
 *      This module is a prototype controller to test the user_service,
 *      along with the back end user/*.php files.
 */

gApp.controller("protoUserController", function(userService){
    console.log('protoUserController: constructor');
    var self = this;

    /**
     *  userStatus - reference to main user status object in userService.
     *  @type {Object}
     */
    this.userStatus = userService.userStatus;

    /**
     *  username - username from text input.
     *  password - password from text input.
     *  @type (string)
     *  @type (string)
     */
    this.username = null;
    this.password = null;

    /**
     *  checkStatusResults - Results from check status operation.
     *  loginResults - Results from login operation.
     *  logoutResults - Results from logout operation.
     */
    this.checkStatusResults = '';
    this.loginResults = '';
    this.logoutResults = '';

    /**
     *  onCheckStatusButton - click handler.
     */
    this.onCheckStatusButton = function() {
        console.log('onCheckStatusButton');
        var username = $('#username').val();
        if (!username) {
            self.checkStatusResults = 'Please specify a username.';
        } else {
            self.checkStatusResults = 'Starting status check.';
            userService.doCheckStatus(username)
                .then(function(response) {
                        console.log('onCheckStatusButton: success');
                        self.checkStatusResults = 'Success: username ' + response.username + ' is logged in';
                    },
                    function(response) {
                        console.log('onCheckStatusButton: error');
                        self.checkStatusResults = response;
                    });
        }
    };

    /**
     *  onLogInButton - click handler.
     */
    this.onLogInButton = function() {
        console.log('onLogInButton');
        var username = $('#username').val();
        var password = $('#password').val();
        if (!username || !password) {
            this.loginResults = 'Please specify a username and password.';
        } else {
            this.loginResults = 'Starting login.';
            userService.doLogin(username, password)
                .then(function(response) {
                    console.log('onLogInButton: success');
                    self.loginResults = 'Success: user ID is ' + response.userId;
                },
                function(response) {
                    console.log('onLogInButton: error');
                    self.loginResults = response;
                });
        }
    };

    /**
     *  onLogOutButton - click handler.
     */
    this.onLogOutButton = function() {
        console.log('onLogOutButton');
        this.logoutResults = 'Starting logout.';
        userService.doLogout()
            .then(function(response) {
                    console.log('onLogOutButton: success');
                    self.logoutResults = 'Success: ' + response.message;
                },
                function(response) {
                    console.log('onLogOutButton: error');
                    self.logoutResults = response;
                });
    };

});