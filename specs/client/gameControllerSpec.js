describe('GameController', function(){
  beforeEach(module('uGame'));


  var $controller;
  var $stateParams;
  var Game;
  var $location;
  var $scope;
  var $httpBackend;
  var $rootScope;
  var $window;


  beforeEach(inject(function($injector){
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $stateParams = $injector.get('$stateParams');
    $httpBackend = $injector.get('$httpBackend');
    $scope = $rootScope.$new();
    Game = $injector.get('Game');


    createController = function(){
      return $controller('GameController', {
        $scope: $scope,
        $location: $location,
        $window: $window,
        $stateParams: $stateParams,
        Game: Game
      });
    };

  }));

  
  it('should have a loadGame method on the scope', function(){
    createController();
    expect($scope.loadGame).to.be.a('function');
  });

  it('should have a getGameBoyAPI method on the scope', function(){
    createController();
    expect($scope.getGameBoyAPI).to.be.a('function');
  });
  
});