/**
 *  user_service.js - DoubleDate Angular user service to manage current user.
 *      This service shares data through the userStatus variable, and has four major
 *      functional interfaces: add, checkStatus, login, logout.
 */

app.service("userService", ['$http', '$q', '$log', 'profileService', function($http, $q, $log, profileService) {
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
        this.userStatus.userId = null;
        this.userStatus.userLevel = null;
        this.userStatus.message = null;
    };

    /**
     *  add - start an add operation.
     *  @param name (string)        - Given name (not username) of user to add.
     *  @param password (string)    - Password of user to add.
     *  @param email (string)       - Email address to add.
     *  @returns (object) - promise.
     *  Defaults to adding at userLevel=normal; eventually returns ID and username added.
     */
    this.add = function(name, password, email) {
        $log.log('add: ' + name + ', ' + password + ', ' + email);
        var def = $q.defer();

        $.ajax({
            url: 'user/add.php',
            method: 'post',
            dataType: 'json',
            cache: false,
            data: {
                name: name,
                password: password,
                email: email
            },
            success: function(response) {
                $log.log('add: success: ' + response.success);
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
                $log.warn('add: error');
                def.reject('Network error ' + response.status + ': ' + response.statusText);
            }
        });

        return def.promise;
    };

    /**
     *  checkStatus - start a check status on the current username.
     *  @param username (string)
     *  @returns (object) - promise.
     *  Note that this will only check if the specified username is logged in.  If a different user is
     *  logged in, the check will still return an error.
     */
    this.checkStatus = function(username) {
        $log.log('checkStatus: ' + username);
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
                $log.log('checkStatus: success: ' + response.success);
                if (response.success) {
                    def.resolve(response);
                } else {
                    def.reject('Server error: ' + response.message);
                }
            },
            error: function(response) {
                $log.warn('checkStatus: error');
                def.reject('Network error ' + response.status + ': ' + response.statusText);
            }
        });

        return def.promise;
    };

    /**
     *  login - start a login with the current username and password.
     *  @param username (string)
     *  @param password (string)
     *  @returns (object) - promise.
     */
    this.login = function(username, password) {
        $log.log('login: ' + username + ' / ' + password);
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
                $log.log('login: success: ' + response.success);
                if (response.success) {
                    self.userStatus.loggedIn = true;
                    self.userStatus.username = response.username;
                    self.userStatus.name = response.name;
                    self.userStatus.userId = response.userId;
                    self.userStatus.userLevel = response.userLevel;

                    // Now that we have the user logged in, if this is a normal user, get the profile.
                    if (response.userLevel === 'normal') {
                        profileService.get(username)
                            .then(function(response2) {
                                    console.log('login: get profile: success');
                                    def.resolve(response);
                                },
                                function(response2) {
                                    console.log('login: get profile: error: ' + response2);
                                    def.reject('Profile server error: ' + response2);
                                });
                    }
                    else {
                        // Administator or moderator logged in; we are already done.
                        def.resolve(response);
                    }

                } else {
                    def.reject('User server error: ' + response.message);
                }
            },
            error: function(response) {
                $log.warn('login: error');
                def.reject('Network error ' + response.status + ': ' + response.statusText);
            }
        });

        return def.promise;
    };

    /**
     *  logout - start a logout.
     *  @returns (object) - promise.
     */
    this.logout = function() {
        $log.log('logout');
        var def = $q.defer();

        $.ajax({
            url: 'user/logout.php',
            method: 'post',
            dataType: 'json',
            cache: false,
            data: {},
            success: function(response) {
                $log.log('logout: success: ' + response.success);
                self.clearUserStatus();
                if (response.success) {
                    def.resolve(response);
                } else {
                    def.reject('Server error: ' + response.message);
                }
            },
            error: function(response) {
                $log.warn('logout: error');
                self.clearUserStatus();
                def.reject('Network error ' + response.status + ': ' + response.statusText);
            }
        });

        return def.promise;
    };

}]);
