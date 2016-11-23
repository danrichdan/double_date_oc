/**
 *  user_service.js - DoubleDate Angular user service to manage current user.
 *      This service shares data through the userStatus variable, and has four major
 *      functional interfaces: doLogin, doLogout, doCheckStatus.
 */

gApp.service("userService", ['$http', '$q', '$log', function($http, $q, $log) {
    $log.log('userService: constructor');
    var self = this;

    /**
     *  userStatus - Global object with status.
     *  @type {object}
     */
    this.userStatus = {
        loggedIn: false,
        username: null,
        name: null,
        userId: null,
        userLevel: null,
        message: null
    };

    /**
     *  Quick 'get' functions for any code that is not maintaining a reference to userStatus.
     */
    this.isLoggedIn     = function() { return this.userStatus.loggedIn };
    this.getUsername    = function() { return this.userStatus.username };
    this.getName        = function() { return this.userStatus.name };
    this.getUserId      = function() { return this.userStatus.userId };
    this.getUserLevel   = function() { return this.userStatus.userLevel };

    /**
     *  clearUserStatus - clear out the global userStatus object.
     */
    this.clearUserStatus = function() {
        this.userStatus.loggedIn = false;
        this.userStatus.username = null;
        this.userStatus.name = null;
        this.userStatus.name = null;
        this.userStatus.userLevel = null;
        this.userStatus.message = null;
    };

    /**
     *  doCheckStatus - start a check status on the current username.
     *  @param username (string)
     *  @returns (object) - promise.
     *  Note that this will only check if the specified username is logged in.  If a different user is
     *  logged in, the check will still return an error.
     */
    this.doCheckStatus = function(username) {
        $log.log('doCheckStatus: ' + username);
        var def = $q.defer();

        $.ajax({
            url: 'user/check_status.php',
            method: 'post',
            dataType: 'json',
            cache: false,
            data: {
                username: username
            },
            success: function(response) {
                $log.log('doCheckStatus: success: ' + response.success);
                if (response.success) {
                    def.resolve(response);
                } else {
                    def.reject('Server error: ' + response.message);
                }
            },
            error: function(response) {
                $log.warn('doCheckStatus: error');
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
        $log.log('doLogin: ' + username + ' / ' + password);
        var def = $q.defer();

        $.ajax({
            url: 'user/login.php',
            method: 'post',
            dataType: 'json',
            cache: false,
            //headers: {'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8'},
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                $log.log('doLogin: success: ' + response.success);
                if (response.success) {
                    self.userStatus.loggedIn = true;
                    self.userStatus.username = response.username;
                    self.userStatus.name = response.name;
                    self.userStatus.userId = response.userId;
                    self.userStatus.userLevel = response.userLevel;

                    def.resolve(response);
                } else {
                    def.reject('Server error: ' + response.message);
                }
            },
            error: function(response) {
                $log.warn('doLogin: error');
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
        $log.log('doLogout');
        var def = $q.defer();

        $.ajax({
            url: 'user/logout.php',
            method: 'post',
            dataType: 'json',
            cache: false,
            data: {},
            success: function(response) {
                $log.log('doLogout: success: ' + response.success);
                self.clearUserStatus();
                if (response.success) {
                    def.resolve(response);
                } else {
                    def.reject('Server error: ' + response.message);
                }
            },
            error: function(response) {
                $log.warn('doLogout: error');
                self.clearUserStatus();
                def.reject('Network error ' + response.status + ': ' + response.statusText);
            }
        });

        return def.promise;
    };

}]);
