describe('RegisterController', function(){
    
  beforeEach(module('uGame'));

  var $controller;
  var $state;
  var Game;
  var $location;
  var $scope;
  var $httpBackend;
  var $rootScope;

  beforeEach(inject(function($injector){
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $state = $injector.get('$state');
    $httpBackend = $injector.get('$httpBackend');
    $scope = $rootScope.$new();
    $location = $injector.get('$location');
    Game = $injector.get('Game');

    createController = function(){
      return $controller('RegisterController', {
        $scope: $scope,
        $location: $location,
        Game: Game
      });
    };
  }));


  it('should have an user object on the scope', function(){
    createController();
    expect($scope.user).to.be.an('object');
  });

  
  it('should have a register method on the scope', function(){
    createController();
    expect($scope.register).to.be.a('function');
  });

  it('should only return false if register method is called and user did not provide username and password', function(){
    createController();
    var result = $scope.register();
    expect(result).to.be(false);   
  });

  it('should only allow users to register if username and password is unique', function(){
    createController();
    $scope.user.username = 'User1';
    $scope.user.password = 'pass1';
    var result = $scope.register();
    expect(result).to.be(undefined);
  })

});