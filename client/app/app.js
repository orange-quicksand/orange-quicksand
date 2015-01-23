var app = angular
  .module('uGame', [
    'ui.router',
    'lumx'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/HomeTemplate.html',
        controller: 'HomeController'
      })
      .state('game', {
        url: '/game/:id',
        templateUrl: 'game/GameTemplate.html',
        controller: 'GameController'
      });
  });
