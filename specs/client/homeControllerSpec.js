describe('HomeController', function(){
  beforeEach(module('uGame'));

  var $controller;
  var $state;
  var Game;
  
  beforeEach(inject(function(_$controller_, $state, Game){
    $controller = _$controller_;
    $state = $state;
    Game = Game;
  }));

  describe('$scope.goToState', function(){
    it('should be a function', function(){
      var $scope = {};
      var controller = $controller('HomeController', {$scope: $scope});
      expect($scope.goToState).to.be.a('function');
    });
  }); 
});