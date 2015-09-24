'use strict';

var playingDeck = [];

//Initial deal.
function Deal(players, callback) {
    
    for(var i = 0; i < 2; i++)
    {
        //Would need some handling incase out of cards, maybe new deck - leave for now to get other bits done.
        players.forEach(function(player) {
            player.hand.push(playingDeck[playingDeck.length - 1]);
            player.score = player.score + playingDeck[playingDeck.length - 1].value
            playingDeck.pop();
        });
    }
    
    callback(players);
}

//Get card(s) from deck and then remove them from the deck array - return a hand.
function HitMe(player, callback) {
    
    player.hand.push(playingDeck[playingDeck.length - 1]);
    player.score = player.score + playingDeck[playingDeck.length - 1].value
    playingDeck.pop();
    
    callback(player);
}

//Fisher-Yates shuffle. I took this from http://bost.ocks.org/mike/shuffle/
function Shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

//Build the deck and return an array of cards.
function BuildNewDeck() {
    
    var deck = [];
    
    //Construct 52 cards with suits. jacks 11, queens, 12, kings 13.
    for(var i = 1; i <= 13; i++) {
        deck.push({suit: 'S', actual: i, value: i > 10 ? 10 : i }); //spades
        deck.push({suit: 'C', actual: i, value: i > 10 ? 10 : i }); //clubs
        deck.push({suit: 'H', actual: i, value: i > 10 ? 10 : i }); //hearts
        deck.push({suit: 'D', actual: i, value: i > 10 ? 10 : i }); //diamonds
    }
    
    return deck;
}

function Deck(callback) {
    
    //create new deck of cards and shuffle ready to deal.
    playingDeck = Shuffle(BuildNewDeck());
    
    callback(true);
}

function GetDeck() {
    
    return playingDeck;
}