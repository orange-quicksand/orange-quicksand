angular.module('uGame.home', [])

.controller('HomeController', function ($scope, $http, $interval, $state) {
  $http({
    method: 'GET',
    url: '/api/games'
  })
  .then(function(resp){
    $scope.data = resp.data;
    console.log($scope.data);
  });

  var array = ['I', 'we', 'They', 'U'];
  var i = -1;

  $interval(function(){
    if(i >= array.length){
      i = -1;
    }
    i++;
    $scope.changedWords = array[i];
  }, 500, 4);


  $scope.goToState = function(id){
   $state.go('game', {id: id});
  };
});
