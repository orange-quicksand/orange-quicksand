var app = angular
  .module('uGame', [
    'uGame.home',
    'uGame.game',
    'uGame.login',
    'uGame.register',
    'ui.router',
    'lumx',
    'ngFx',
    'monospaced.qrcode'
  ])
  
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'app/login/LoginTemplate.html',
        controller: 'LoginController'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/register/RegisterTemplate.html',
        controller: 'RegisterController'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/HomeTemplate.html',
        controller: 'HomeController'
      })
      .state('game', {
        url: '/game/:id',
        templateUrl: 'app/game/GameTemplate.html',
        controller: 'GameController'
      });
  });
