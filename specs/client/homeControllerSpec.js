describe('HomeController', function(){
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
    Game = $injector.get('Game');


    createController = function(){
      return $controller('HomeController', {
        $scope: $scope,
        $state: $state,
        $location: $location,
        Game: Game
      });
    };

  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make initial get request to obtain game data', function(){
    var mockData = [{}, {}, {}];
    $httpBackend.expectGET('/api/games').respond(mockData);
    createController();
    $httpBackend.expectGET('app/login/LoginTemplate.html').respond();
    $httpBackend.flush();
    expect($scope.data).to.eql(mockData);
  });

  it('should have a goToState method', function(){
    createController();
    $httpBackend.expectGET('/api/games').respond([{}]);
    $httpBackend.expectGET('app/login/LoginTemplate.html').respond();
    $httpBackend.flush();
    expect($scope.goToState).to.be.a('function');
  });

  it('should redirect to login if no game data', function(){
    createController();
    $httpBackend.expectGET('/api/games').respond([{}]);
    $httpBackend.expectGET('app/login/LoginTemplate.html').respond();
    $httpBackend.flush();
    expect($state.current.url).to.be('/');
    expect($state.current.templateUrl).to.be('app/login/LoginTemplate.html');
    expect($state.current.name).to.be('login');
  });

});