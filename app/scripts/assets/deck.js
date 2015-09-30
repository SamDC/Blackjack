'use strict';

var playingDeck = [];

//Initial deal.
function Deal(players, callback) {
    
    for(var i = 0; i < 2; i++)
    {
        //Would need some handling incase out of cards, maybe new deck - leave for now to get other bits done.
        players.forEach(function(player) {
            
            player.hand.push(playingDeck[playingDeck.length - 1]);
            var ace = playingDeck[playingDeck.length - 1].value === 1 ? true : false;
            
            player.score = player.score + (ace === true ? 11 : playingDeck[playingDeck.length - 1].value)
            playingDeck.pop();
            
            if(ace)
                player.aces = player.aces + 1;
            
            if(player.score === 21)
                player.blackjack = true;
        });
    }
    
    callback(players);
}

function CheckBust(player) {
    
    console.log(player);
    
    if(player.score > 21) {
        if(player.aces > 0) {
            for(var i = 0; i < player.aces; i++) {
                player.score = player.score - 10;
                if(player.score > 21) {
                    return false;
                }
            }
        }
        return true;
    }
    
    return false;
}

//Get card(s) from deck and then remove them from the deck array - return a hand.
function HitMe(player, callback) {
    
    player.hand.push(playingDeck[playingDeck.length - 1]);
    var ace = playingDeck[playingDeck.length - 1].value === 1 ? true : false;
    
    if(ace)
        player.aces = player.aces + 1;
            
    player.score = player.score + (ace === true ? 11 : playingDeck[playingDeck.length - 1].value);
    player.bust = CheckBust(player);
    playingDeck.pop();
    
    callback(player);
}

function DealerPlay(player, topScore, callback) {
    
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

function CardDisplay(value) {
    
    return value === 1 ? 'A' : value === 11 ? 'J' : value === 12 ? 'Q' : value === 13 ? 'K' : value.toString();
}

//Build the deck and return an array of cards.
function BuildNewDeck() {
    
    var deck = [];
    
    //Construct 52 cards with suits. jacks 11, queens, 12, kings 13.
    for(var i = 1; i <= 13; i++) {
        deck.push({suit: 'S', image:'../images/spade.png', actual: CardDisplay(i), value: i > 10 ? 10 : i }); //spades
        deck.push({suit: 'C', image:'../images/club.png', actual: CardDisplay(i), value: i > 10 ? 10 : i }); //clubs
        deck.push({suit: 'H', image:'../images/spade.png', actual: CardDisplay(i), value: i > 10 ? 10 : i }); //hearts
        deck.push({suit: 'D', image:'../images/diamond.png', actual: CardDisplay(i), value: i > 10 ? 10 : i }); //diamonds
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