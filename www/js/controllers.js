angular.module('ionic.beacon', [])
    .controller("ionic.beacon", ['$scope', '$rootScope', '$ionicPlatform', '$cordovaBeacon'],
    function ($scope, $rootScope, $ionicPlatform, $cordovaBeacon) {

        $scope.beacons = {};

        $ionicPlatform.ready(function () {
            $cordovaBeacon.requestWhenInUseAuthorization();

            $rootScope.$on('$cordovaBeacon:didRangeBeaconsInRegion', function (event, pluginResult) {
                var uniqueBeaconKey;

                for (var i = 0; i < pluginResult.beacons.length; i++) {
                    uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" +
                        pluginResult.beacons[i].minor;
                    $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
                }

                $scope.$apply();
            });

            $cordovaBeacon.startRangingBeaconsInRegion(
                $cordovaBeacon.createBeaconRegion("testing", "61687109-905F-4436-91F8-E602F514C96D")
            );
        });
    });