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
    
    var topScore = 0;
    
    $scope.players;
    $scope.playerCounter = 0;
    $scope.inProgress = false;
    $scope.score =  [];
    
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'views/templates/newGame.template.html',
      parent: angular.element(document.body),
      clickOutsideToClose:false
    })
    .then(function(answer) {
        $scope.players = answer;
        $scope.players.push({id: answer.length + 1, name: 'Dealer', score: 0, hand: [], blackjack: false, bust: false, aces: 0});
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
    
    function ResetPlayers() {
        
        $scope.players.forEach(function(player) {
            player. score = 0;
            player.hand = [];
            player.aces = 0;
            player. blackjack = false;
            player.bust = false;
        });
        $scope.score = [];
    }
    
    $scope.HitMeClick = function() {
        HitMe($scope.players[$scope.playerCounter], function(player){
            $scope.players[$scope.playerCounter] = player;
        });
    }
    
    $scope.Stick = function(player) {
        $scope.score.push({name: player.name, score: player.score});
        topScore = player.score <= 21 ? (topScore < player.score ? player.score : topScore) : topScore;
        $scope.playerCounter++;
        if($scope.playerCounter === $scope.players.length - 1) {
            DealerPlay($scope.players[$scope.playerCounter], topScore, function(winner) {
                
            });
        }
    }
    
    $scope.Next = function(player) {
        $scope.score.push({name: player.name, score: player.score});
        console.log($scope.playerCounter + ' ' + $scope.players.length);
        if($scope.playerCounter === $scope.players.length - 1) {
            ResetPlayers();
            $scope.playerCounter = 0;
            Play();
        } else {
            $scope.playerCounter++;
        }
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
                    $scope.players.push({id: newValue.count, name: 'Player ' + newValue.count, score: 0, hand: [], blackjack: false, bust: false, aces: 0});
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
