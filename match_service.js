/**
 *  match_service.js - DoubleDate Angular match service to manage matches.
 *      This service shares data through the matches variable, and has three major
 *      functional interfaces:
 *      - calculate: for the given user profile, calculate quality of matches and update the match table.
 *      - get: for the given username, return the next (20) best matches from the match table.
 *      - approve: for a given username, for a target couple, approve or disapprove of that target couple.
 */

app.service("matchService", ['$http', '$q', '$log', function($http, $q, $log) {
    $log.log('matchService: constructor');
    var self = this;

    /**
     *  matches array - return data from getMatches.
     *  @type {[object]}
     */
    this.matches = [];


    /**
     *  clearMatches - clear out the global matches object.
     */
    this.clearMatches = function() {
        this.matches = [];
    };

    /**
     *  calculate - Insert and update the match table based on evaluating other profiles against this target profile.
     *  @returns (object) - promise.
     */
    this.calculate = function(profile) {
        $log.log('calculate: starting');
        var def = $q.defer();

        $.ajax({
            url: 'match/calculate.php',
            method: 'post',
            dataType: 'json',
            cache: false,
            data: {
                profile: profile
            },
            success: function(response) {
                $log.log('calculate: success: ' + response.success);
                if (response.success) {
                    // Note: no data returned that we need to save.
                    def.resolve(response);
                } else {
                    $log.log('calculate: error: ' + response.message);
                    def.reject('Server error: ' + response.message);
                }
            },
            error: function(response) {
                $log.warn('calculate: error');
                def.reject('Network error ' + response.status + ': ' + response.statusText);
            }
        });

        return def.promise;
    };

    /**
     *  get - start a get operation (next 20 best matches) on the specified username.
     *  @param username (string)
     *  @returns (object) - promise.
     */
    this.get = function(username) {
        $log.log('get: ' + username);
        // Clear out any existing data in the current matches.
        this.clearMatches();

        var def = $q.defer();

        $.ajax({
            url: 'match/get.php',
            method: 'post',
            dataType: 'json',
            cache: false,
            data: {
                username: username
            },
            success: function(response) {
                $log.log('get: success: ' + response.success);
                if (response.success) {
                    self.matches = response.matches;
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
 *  approve - for a given username, for a target couple, approve or disapprove of that target couple.
 *  @param username (string)        - User that is logged in.
 *  @param targetUsername {string}  - User that is being evaluated.
 *  @param approve {boolean}        - true to approve, false to reject.
 *  @returns (object) - promise.
 */
    this.approve = function(username, targetUsername, approve) {
        $log.log('approve: ' + username + ', ' + targetUsername + ', ' + approve);

        var def = $q.defer();

        $.ajax({
            url: 'match/approve.php',
            method: 'post',
            dataType: 'json',
            cache: false,
            data: {
                username: username,
                targetUsername: targetUsername,
                approve: approve
            },
            success: function(response) {
                $log.log('approve: success: ' + response.success);
                if (response.success) {
                    def.resolve(response.matches);
                } else {
                    def.reject('Server error: ' + response.message);
                }
            },
            error: function(response) {
                $log.warn('approve: error');
                def.reject('Network error ' + response.status + ': ' + response.statusText);
            }
        });

        return def.promise;
    };
}]);
