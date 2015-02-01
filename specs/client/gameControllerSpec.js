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
  var $timeout;


  beforeEach(inject(function($injector){
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $stateParams = $injector.get('$stateParams');
    $httpBackend = $injector.get('$httpBackend');
    $timeout = $injector.get('$timeout');
    $scope = $rootScope.$new();
    $location = $injector.get('$location');
    Game = $injector.get('Game');


    createController = function(){
      return $controller('GameController', {
        $scope: $scope,
        $location: $location,
        $window: $window,
        $stateParams: $stateParams,
        $timeout: $timeout,
        Game: Game
      });
    };

  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  
  it('should have a loadGame method on the scope', function(){
    createController();
    expect($scope.getAndStartGame).to.be.a('function');
  });

  it('should have a getGameBoyAPI method on the scope', function(){
    createController();
    expect($scope.getGameBoyAPI).to.be.a('function');
  });

  it('should call loadGame when getGameBoyAPI is called', function(){
    // createController();
    // $scope.getGameBoyAPI();
    // console.log($scope.API);
    // expect($scope.loadGame).to.be.a('function');
  });

  it('should have a hideMenu method on the scope', function(){
    createController();
    expect($scope.hideMenu).to.be.a('function');
  });

  it('should hide hide menu when method is called', function(){
    createController();
    $scope.hideMenu();
    expect($scope.menuIsShown).to.be(false);
  });

  it('should load game when method is called', function(){
    $stateParams.id = 4;
    var mockData = [{title: '', game: ''}]
    $httpBackend.expectGet('/api/game/' + $stateParams.id).respond(mockData);
    createController();
    $scope.loadGame();
    $httpBackend.expectGet('/api/game/' + $stateParams.id).respond();
    expect($scope.API.init).to.be.a('function');
    expect($scope.gameInfo).to.be.an('object');
    expect($scope.gameInfo.title).to.be.a('string');
  });
  
  it('should have a showMenuWhileMoving method on the scope', function(){
    createController();
    expect($scope.showMenuWhileMoving).to.be.a('function');
  });


  it('should have a goHome method on the scope', function(){
    createController();
    expect($scope.goHome).to.be.a('function');
  });

  it('should have a togglePinMenu method on the scope', function(){
    createController();
    expect($scope.togglePinMenu).to.be.a('function');
  });


});