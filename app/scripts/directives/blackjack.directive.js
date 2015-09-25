'use strict';

angular.module('blackjackApp').directive('test', function() {
  
    return {
        scope: {
          name: '=?',
          address: '=?'
        },
        link: function(scope, elem, attrs) {
            
        },
        template: 'Name: Sam Address: UK'
    };
});