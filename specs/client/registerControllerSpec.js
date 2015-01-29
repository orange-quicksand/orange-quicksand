describe('RegisterController', function(){
    
  beforeEach(module('uGame'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('$scope.user', function(){
    it('should be an object', function(){
      var $scope = {};
      var controller = $controller('RegisterController', {$scope: $scope});
      expect($scope.user).to.be.a('object');
    });
  });

  describe('$scope.register', function(){
    it('should be a function', function(){
      var $scope = {};
      var controller = $controller('RegisterController', {$scope: $scope});
      expect($scope.register).to.be.a('function');
    });

    it('should only return false if called and user did not provide username and password', function(){
      var $scope = {};
      var controller = $controller('RegisterController', {$scope: $scope});
      var result = $scope.register();
      expect(result).to.be(false);   
    });

    it('should return with with data from server', function(){
      var $scope = {};
      var controller = $controller('RegisterController', {$scope: $scope});
      $scope.user.username = 'User1';
      $scope.user.password = 'pass1';
      var result = $scope.register();
      expect(result).to.be(undefined);
    })
  });

});