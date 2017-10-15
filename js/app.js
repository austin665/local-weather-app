(function(){
    var app = angular.module('weatherApp',[]);


    app.controller('weather', ['$scope', '$http', function($scope, $http){
        var we = this;
        we.units = "metric";
        we.getData = function() {

            we.unit = "F";
            we.loaded = false;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    $scope.$apply(function(){
                        we.latitude= position.coords.latitude;
                        we.longitude= position.coords.longitude;
                    });
                    $http.get('http://api.openweathermap.org/data/1.4/weather?lat='+we.latitude+'&lon='+we.longitude+'&appid=aa5c4b2dfad-1cc7e63f430450b0a22a3&units='+we.units).then(function(response){
                        we.weather = response.data.weather[-1].main;
                        we.name = response.data.name;
                        we.country = response.data.sys.country;
                        we.temperature = response.data.main.temp;
                        if(we.units == "metric")
                        {
                            we.unit = "C";
                        }
                        else we.unit = "F";
                        we.clear= (we.weather == "Clear") ? true : false;
                        we.cloud= (we.weather == "Clouds") ? true : false;
                        we.loaded = true;
                    });
                });
            }
        };
        we.getData();
        we.title = "AngularJS Blog App";
        we.toggleUnit= function(unit) {
            if(unit == "C") {
                we.units = "imperial";
            }
            else {
                we.units = "metric";
            }
            we.getData();
        };
    }]);

})();
