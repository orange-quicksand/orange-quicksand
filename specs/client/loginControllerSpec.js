describe('LoginController', function(){
  beforeEach(module('uGame'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('$scope.user', function(){
    it('should be an object', function(){
      var $scope = {};
      var controller = $controller('LoginController', {$scope: $scope});
      expect($scope.user).to.be.a('object');
    });
  });

  describe('$scope.login', function(){
    it('should be a function', function(){
      var $scope = {};
      var controller = $controller('LoginController', {$scope: $scope});
      expect($scope.login).to.be.a('function');
    });

    it('should only return if user supplied username and password', function(){
      var $scope = {};
      var controller = $controller('LoginController', {$scope: $scope});
      var results = $scope.login();
      expect(results).to.be(false);
    });
    
    it('should only return if user supplied username and password', function(){
      var $scope = {};
      var controller = $controller('LoginController', {$scope: $scope});
      $scope.user.username = 'User1';
      $scope.user.password = 'test';
      var results = $scope.login();
      expect(results).to.be(undefined);
    });
  });
});