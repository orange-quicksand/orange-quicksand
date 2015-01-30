describe('LoginController', function(){
  beforeEach(module('uGame'));

  var $controller;
  var $state;
  var Game;
  var $location;
  var $scope;
  var $httpBackend;
  var $rootScope;
  var $interval;

  beforeEach(inject(function($injector){
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $state = $injector.get('$state');
    $httpBackend = $injector.get('$httpBackend');
    $scope = $rootScope.$new();
    $interval = $injector.get('$interval');
    $location = $injector.get('$location');
    Game = $injector.get('Game');


    createController = function(){
      return $controller('LoginController', {
        $scope: $scope,
        $location: $location,
        Game: Game,
        $interval: $interval,
        $state: $state
      });
    };
  }));


  it('should should have a user object on the scope', function(){
    createController();
    expect($scope.user).to.be.an('object');
  });

  
  it('should have a login method on the scope', function(){
    createController()
    expect($scope.login).to.be.a('function');
  });  

  it('should return false if user supplied incorrect username and password', function(){
    createController();
    var results = $scope.login();
    expect(results).to.be(false);
  });
    
  it('should only login if user supplied unique username and password', function(){
    createController();
    $scope.user.username = 'User1';
    $scope.user.password = 'test';
    var results = $scope.login();
    expect(results).to.be(undefined);
  });

});