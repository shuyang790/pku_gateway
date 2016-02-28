angular.module('app.controllers', [])

.controller('pKUGatewayToolCtrl', function($scope, $http) {
    $scope.formData = {'username1':'1300012959', 'password':'pkupassword3'};

    function toQueryString(obj) {
        var parts = [];
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
            }
        }
        return parts.join("&");
    }


    $scope.processForm = function() {
        $scope.formData.username = $scope.formData.username1 + "|;kiDrqvfi7d$v0p5Fg72Vwbv2;|" + $scope.formData.password + "|;kiDrqvfi7d$v0p5Fg72Vwbv2;|15";
        $http({
          method  : 'POST',
          url     : 'https://its.pku.edu.cn/cas/login',
          data    : toQueryString($scope.formData),  // pass in data as strings
          headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
         })
          .success(function(data) {
            console.log(data);

            if (!data.success) {
              // if not successful, bind errors to error variables
              $scope.errorname = data.errors.username1
            } else {
              // if successful, bind success message to message
              $scope.message = "success " + data.message;
            }
          })
          .error(function(data) {
              $scope.message = "error ";
          })


        };


})
