angular.module('home', [])

.controller('HomeController', function ($scope, $http) {
  $http({
    method: 'GET',
    url: '/games'
  })
  .then(function(resp){
    console.log(resp);
  })
});
