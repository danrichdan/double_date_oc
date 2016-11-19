/**
 *  proto_login_controller.js - DoubleDate prototype for Angular controller to manage logins.
 *      This module is a prototype controller to test the login_service,
 *      along with the back end login_server.php.
 */

gApp.controller("loginController", function(loginService){
    console.log('loginController: constructor');
    var self = this;

    /**
     *  loginStatus - reference to main login status object in loginService.
     *  @type {Object}
     */
    this.loginStatus = loginService.loginStatus;

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
            loginService.doCheckStatus(username)
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
            loginService.doLogin(username, password)
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
        loginService.doLogout()
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