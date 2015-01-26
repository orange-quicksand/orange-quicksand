angular.module('uGame.game', [])

.controller('GameController', function($scope, $http, $stateParams){
  $http({
    method: 'GET',
    url: '/game' + $stateParams.id
  })
  .then(function(resp){
    console.log(resp);
  });
});