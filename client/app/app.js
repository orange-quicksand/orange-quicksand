var app = angular.module('uGame', [
    'ui.router',
    'lumx',
    'home'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home/HomeTemplate.html',
        controller: 'HomeController'
      })
      .state('game', {
        url: '/game/:id',
        templateUrl: 'app/game/GameTemplate.html',
        controller: 'GameController'
      });
  });
