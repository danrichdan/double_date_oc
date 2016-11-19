/**
 *  login_service.js - DoubleDate Angular login service to manage logins.
 *      This sevice shares data through the loginStatus variable, and has three major
 *      functional interfaces: doLogin, doLogout, and doCheckStatus.
 */

gApp.service("loginService", ['$http', '$q', '$log', function($http, $q, $log) {
    //$log.log('loginService: constructor');
    var self = this;

    /**
     *  gLoginStatus - Global object with status.
     *  @type {object}
     */
    this.loginStatus = {
        loggedIn: false,
        username: null,
        name: null,
        userId: null,
        userLevel: null,
        message: null
    };

    /**
     *  Quick 'get' functions for any code that is not maintaining a reference to loginStatus.
     */
    this.isLoggedIn     = function() { return this.loginStatus.loggedIn };
    this.getUsername    = function() { return this.loginStatus.username };
    this.getName        = function() { return this.loginStatus.name };
    this.getUserId      = function() { return this.loginStatus.userId };
    this.getUserLevel   = function() { return this.loginStatus.userLevel };

    /**
     *  clearLoginStatus - clear out the global loginStatus object.
     */
    this.clearLoginStatus = function() {
        this.loginStatus.loggedIn = false;
        this.loginStatus.username = null;
        this.loginStatus.name = null;
        this.loginStatus.name = null;
        this.loginStatus.userLevel = null;
        this.loginStatus.message = null;
    };

    /**
     *  doCheckStatus - start a check status on the current username.
     *  @param username (string)
     *  @returns (object) - promise.
     *  Note that this will only check if the specified username is logged in.  If a different user is
     *  logged in, the check will still return an error.
     */
    this.doCheckStatus = function(username) {
        //$log.log('doCheckStatus: ' + username);
        var def = $q.defer();

        $.ajax({
            url: 'login_handler.php',
            method: 'post',
            dataType: 'json',
            cache: false,
            data: {
                username: username
            },
            success: function(response) {
                //$log.log('doCheckStatus: success: ' + response.success);
                if (response.success) {
                    def.resolve(response);
                } else {
                    def.reject('Server error: ' + response.message);
                }
            },
            error: function(response) {
                //$log.warn('doCheckStatus: error');
                def.reject('Network error ' + response.status + ': ' + response.statusText);
            }
        });

        return def.promise;
    };

    /**
     *  doLogin - start a login with the current username and password.
     *  @param username (string)
     *  @param password (string)
     *  @returns (object) - promise.
     */
    this.doLogin = function(username, password) {
        //$log.log('doLogin: ' + username + ' / ' + password);
        var def = $q.defer();

        $.ajax({
            url: 'login_handler.php',
            method: 'post',
            dataType: 'json',
            cache: false,
            //headers: {'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8'},
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                //$log.log('doLogin: success: ' + response.success);
                if (response.success) {
                    self.loginStatus.loggedIn = true;
                    self.loginStatus.username = response.username;
                    self.loginStatus.name = response.name;
                    self.loginStatus.userId = response.userId;
                    self.loginStatus.userLevel = response.userLevel;

                    def.resolve(response);
                } else {
                    def.reject('Server error: ' + response.message);
                }
            },
            error: function(response) {
                //$log.warn('doLogin: error');
                def.reject('Network error ' + response.status + ': ' + response.statusText);
            }
        });

        return def.promise;
    };

    /**
     *  doLogout - start a logout.
     *  @returns (object) - promise.
     */
    this.doLogout = function() {
        //$log.log('doLogout');
        var def = $q.defer();

        $.ajax({
            url: 'login_handler.php',
            method: 'post',
            dataType: 'json',
            cache: false,
            data: {},
            success: function(response) {
                //$log.log('doLogout: success: ' + response.success);
                self.clearLoginStatus();
                if (response.success) {
                    def.resolve(response);
                } else {
                    def.reject('Server error: ' + response.message);
                }
            },
            error: function(response) {
                //$log.warn('doLogout: error');
                self.clearLoginStatus();
                def.reject('Network error ' + response.status + ': ' + response.statusText);
            }
        });

        return def.promise;
    };

}]);
