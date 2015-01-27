angular.module('uGame.game', [])

.controller('GameController', function($scope, $http, $stateParams){
  $http({
    method: 'GET',
    url: '/api/game/' + $stateParams.id
  })
  .then(function(resp){
    console.log(resp);
  });
});