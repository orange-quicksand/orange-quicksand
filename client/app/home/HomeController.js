angular.module('uGame.home', [])

.controller('HomeController', function ($scope, $http) {
  $http({
    method: 'GET',
    url: '/api/games'
  })
  .then(function(resp){
    console.log(resp);
  });
});
