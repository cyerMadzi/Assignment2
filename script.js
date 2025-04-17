const letters = ['A','B','C','D','E','F','G','H'];
const cards = [...letters, ...letters].sort(() => 0.5 - Math.random());
const gameBoard = document.getElementById('gameBoard');
let flippedCards = [];
let lockBoard = false;

function createCard(letter) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.letter = letter;
  card.innerHTML = `
    <img src="Images/Card1.jpg" class="front" width="150" height="230" />
    <div class="back">${letter}</div>
  `;
  card.addEventListener('click', flipCard);
  return card;
}

function flipCard() {
  if (lockBoard || this.classList.contains('flipped') || flippedCards.length === 2) return;

  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    lockBoard = true;
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.letter === card2.dataset.letter) {
    card1.classList.add('matched');
    card2.classList.add('matched');
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  flippedCards = [];
  lockBoard = false;

  if (document.querySelectorAll('.matched').length === 16) {
    alert('🎉 Congratulations! You matched all the cards!');
  }
}

// Start Game button
document.querySelector('.Start').addEventListener('click', () => {
  gameBoard.innerHTML = '';
  cards.sort(() => 0.5 - Math.random());
  cards.forEach(letter => {
    const card = createCard(letter);
    gameBoard.appendChild(card);
  });
});

// Restart = reload
document.querySelector('.Restart').addEventListener('click', () => {
  location.reload();
});

// End = disable
document.querySelector('.EndGame').addEventListener('click', () => {
  alert("Game Over!");
  gameBoard.innerHTML = '';
});
