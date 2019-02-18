//
// Blackjack by RR
//

// Card variables
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'],
    values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 
              'Nine', 'Eight', 'Seven', 'Six', 'Five', 
              'Four', 'Three', 'Two'];

// DOM variables
let message = document.getElementById('message'),
    dealerCardsMessage = document.getElementById('dealer-cards'),
    playerCardsMessage = document.getElementById('player-cards'),
    dealerScoreMessage = document.getElementById('dealer-score'),
    playerScoreMessage = document.getElementById('player-score'),
    winnerAnnouncement = document.getElementById('winner-announcement'),
    newGameButton = document.getElementById('new-game-button'),
    hitButton = document.getElementById('hit-button'),
    stayButton = document.getElementById('stay-button'),
    gameTable = document.getElementById('game-table');

// Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

gameTable.style.display = 'none';
winnerAnnouncement.style.display = 'none';
hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

newGameButton.addEventListener('click', function() {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);

    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];

    winnerAnnouncement.innerText = 'Best of luck!';

    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    showStatus();
});


hitButton.addEventListener('click', function() {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
  });
  
  stayButton.addEventListener('click', function() {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
  });  

function createDeck() {
  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      let card = {
        suit: suits[i],
        value: values[j]
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
        let x = Math.trunc(Math.random() * deck.length);
        let y = deck[x];
        deck[x] = deck[i];
        deck[i] = y;
    }
}

function getCardString(card) {
  return card.value + ' of ' + card.suit;
}

function getCardNumericValue(card) {
    switch(card.value) {
      case 'Ace':
        return 1;
      case 'Two':
        return 2;
      case 'Three':
        return 3;
      case 'Four':
        return 4;
      case 'Five':
        return 5;
      case 'Six':
        return 6;
      case 'Seven':
        return 7;
      case 'Eight':
        return 8;
      case 'Nine':
        return 9;
      default:
      return 10;
    }
  }
  
  function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (var i = 0; i < cardArray.length; i++) {
      let card = cardArray[i];
      score += getCardNumericValue(card);
      if (card.value === 'Ace') {
        hasAce = true;
      }
    }
    if (hasAce && score + 10 <= 21) {
      return score + 10;
    }
    return score;
  }
  
  function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
  }
  
  function checkForEndOfGame() {
    updateScores();
    if(gameOver){
    
    while(dealerScore < playerScore
    && playerScore <= 21
    && dealerScore <= 21) {
      dealerCards.push(getNextCard());
      updateScores();
      }
    }
    
    if (playerScore > 21) {
      playerWon = false;
      gameOver = true;
    }
    else if (dealerScore > 21) {
      playerWon = true;
      gameOver = true;
    }
    else if (gameOver) {
      
      if(playerScore>dealerScore) {
        playerWon = true;
      }
      else {
        playerWon = false;
      }
    }
  }
  
function showStatus() {
    if (!gameStarted) {
        message.innerText = "Welcome to Blackjack!";
        winnerAnnouncement.style.display = 'none';
        return;
    }

    let dealerCardString = '';
    
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardString += getCardString(dealerCards[i]) + '\n';
    }

    let playerCardString = '';
    for (let i = 0; i < playerCards.length; i++) {
        playerCardString += getCardString(playerCards[i]) + '\n';
    }

    updateScores();

    message.innerText = 'Try to get up to 21 points from your cards and beat the dealer.'
    gameTable.style.display = 'flex';

    dealerCardsMessage.innerText = dealerCardString;
    dealerScoreMessage.innerText = dealerScore;

    playerCardsMessage.innerText = playerCardString;
    playerScoreMessage.innerText = playerScore;

    /*
                        'Dealer has:\n' +
                        dealerCardString +
                        '(score: ' + dealerScore + ')\n\n' +

                        'Player has:\n' +
                        playerCardString +
                        '(score: ' + playerScore + ')\n\n';
    */
    winnerAnnouncement.style.display = 'block';

    if (playerScore === 21 && playerCards.length === 2) {
        winnerAnnouncement.innerText = 'BLACKJACK! YOU WON!';
        message.innerText = 'OMG! Lucky you!'
        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }

    if (gameOver) {
        if (playerWon) {
            winnerAnnouncement.innerText = 'YOU WIN!';
            message.innerText = 'Congrats! That was awesome!';
        } else {
            winnerAnnouncement.innerText = 'DEALER WINS';
            message.innerText = "That's fine! Try once again!";
        }
        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }
}

function getNextCard() {
    return deck.shift();
  }
  