describe('GameController', function(){
  beforeEach(module('uGame'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('$scope.loadGame', function(){
    it('should be a function', function(){
      var $scope = {};
      var controller = $controller('GameController', {$scope: $scope});
      expect($scope.loadGame).to.be.a('function');
    });
  });

  describe('$scope.getGameBoyAPI', function(){
    it('should be a function', function(){
      var $scope = {};
      var controller = $controller('GameController', {$scope: $scope});
      expect($scope.getGameBoyAPI).to.be.a('function');      
    })

    // it('should load game when called', function(){
    //   var $scope = {};
    //   var controller = $controller('GameController', {$scope: $scope});
    
    // });

  });

});