(function() {

  "use strict";

  /**
   * Déclaration du module "app"
   * C'est le module instancié par la directive ng-app dans le fichier
   * index.html. C'est ce module qui instancie ensuite tous les autres modules.
   */
  var module = angular.module('app', []);

  module.controller('helloWorld', ['$scope', function($scope){
      $scope.message = "Hello world!";

  }]);

  /**
   * Provides routes / states
   */
  module.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

    // Rediriger sur la page d'accueil la route demandée n'est pas trouvée
    $urlRouterProvider.otherwise('/');

    // Créer une page de test qui dit "hello", uniquement avec des
    // fonctions anonymes
    $stateProvider.state('hello-world', {
      url: '/hello',
      templateUrl: 'views/hello.html',
      controller: ['$scope', function($scope) {
        $scope.name = 'yann'
      }]
    });

  }]);

  /**
   * Une directive custom dans son plus simple apparat.
   * voir ici : http://www.sitepoint.com/practical-guide-angularjs-directives/
   */
  module.directive('helloSimple', [function() {
    return {
      // E comme "element" : attention, il faudra écrire "<hello-simple></hello-simple>" et
      // pas <helloSimple> !
      restrict: 'E',
      // on remplacera completement notre balise "hello"
      // avec le contenu de "template" ou du fichier indiqué dans "templateUrl"
      replace: true,
      // on peut utiliser TemplateUrl à la place pour indiquer
      // un fichier html à charger
      template: '<h3>Hello World!</h3>'
    };

  }]);

  module.directive('helloColor', function() {
    return {
      // Element OR attribute : <hello-color></hello-color>
      // or <div hello-color></div> sont possibles.
      restrict: 'AE',
      replace: true,
      // on ajoute une variable {{color}}
      templateUrl: 'modules/app/views/helloColorDirective.html',

      // fonction de "compilation", les variables du template
      // sont résolus grâce à cette fonction. On "lie" des variables
      // au scope passé en argument pour les "résoudre".
      //
      // "element" est jQuery ou jQlite
      link: function(scope, element, attrs) {

        scope.hello = 'test';

        // au survol, changer le pointeur de la souris
        element.bind('mouseover', function() {
          scope.hello = 'digestion';
          scope.$apply();
          element.css('cursor', 'pointer');
        });
      }
    };
  });

  module.directive('hoverColor', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        scope.hello = 'test';
        // au survol, changer le pointeur de la souris
        element.bind('mouseover', function() {
          scope.hello = 'digestion';
          scope.$apply();
          element.css('cursor', 'pointer');
        });
      }
    };
  });

  module.directive('odd', function() {
    return {
      restrict: 'A',
      require: "ngModel",
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.odd = function(modelValue) {
          return modelValue % 2 === 1;
        }
      }
    };
  });


  module.constant('CONFIG', {
    foo: 'bar'
  });

})();