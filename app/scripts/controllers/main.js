'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blackjackApp
 */
angular.module('blackjackApp')
  .controller('MainCtrl', function ($scope, $mdDialog) {
    
    $scope.players;
    $scope.playerCounter = 0;
    $scope.inProgress = false;
    
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'views/templates/newGame.template.html',
      parent: angular.element(document.body),
      clickOutsideToClose:false
    })
    .then(function(answer) {
        $scope.players = answer;
        $scope.players.push({id: answer.length + 1, name: 'Dealer', score: 0, hand: []});
        Play();
    }, function() {
        $scope.status = 'You cancelled the dialog.';
    });
    
    function Play() {
            
        Deck(function(built) {
            if(built) {
                Deal($scope.players, function (players) {
                    $scope.players = players;
                    $scope.inProgress = true;
                });
            } else {
                console.log('err, something bad happened');
            }
        }); 
    }
    
    $scope.HitMeClick = function() {
        HitMe($scope.players[$scope.playerCounter], function(player){
            $scope.players[$scope.playerCounter] = player;
        });
    }
    
    $scope.Stick = function() {
        $scope.playerCounter++;
    }
});

function DialogController($scope, $mdDialog) {
    
    $scope.players = [];
    $scope.playersCount = 0;

    $scope.$watchCollection(
        'playersCounter',
        function( newValue, oldValue ) {
            if(newValue != undefined) {
                if(newValue.count > $scope.playersCount) {
                    $scope.players.push({id: newValue.count, name: 'Player ' + newValue.count, score: 0, hand: []});
                    $scope.playersCount++;
                }
                else {
                    $scope.players.pop();
                    $scope.playersCount--;
                }
            }
        }
    );
    
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
}
