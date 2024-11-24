
const favoriteNumber = 7;
fetch(`http://numbersapi.com/${favoriteNumber}?json`)
  .then(response => response.json())
  .then(data => {
    console.log(data.text);
    document.body.innerHTML += `<p>${data.text}</p>`;
  });

const numbers = [3, 5, 10];
fetch(`http://numbersapi.com/${numbers.join(",")}?json`)
  .then(response => response.json())
  .then(data => {
    for (let num in data) {
      console.log(data[num]);
      document.body.innerHTML += `<p>${data[num]}</p>`;
    }
  });

Promise.all([
  fetch(`http://numbersapi.com/${favoriteNumber}?json`).then(res => res.json()),
  fetch(`http://numbersapi.com/${favoriteNumber}?json`).then(res => res.json()),
  fetch(`http://numbersapi.com/${favoriteNumber}?json`).then(res => res.json()),
  fetch(`http://numbersapi.com/${favoriteNumber}?json`).then(res => res.json())
])
  .then(facts => {
    facts.forEach(fact => {
      console.log(fact.text);
      document.body.innerHTML += `<p>${fact.text}</p>`;
    });
  });


fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
  .then(response => response.json())
  .then(data => {
    const card = data.cards[0];
    console.log(`${card.value} of ${card.suit}`);
  });

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(response => response.json())
  .then(deck => {
    const deckId = deck.deck_id;
    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(response => response.json())
      .then(data1 => {
        const card1 = data1.cards[0];
        console.log(`${card1.value} of ${card1.suit}`);
        return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
          .then(response => response.json())
          .then(data2 => {
            const card2 = data2.cards[0];
            console.log(`${card2.value} of ${card2.suit}`);
          });
      });
  });

let deckId;
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(response => response.json())
  .then(deck => {
    deckId = deck.deck_id;
    document.body.innerHTML += '<button id="draw-card">Draw a Card</button>';
    document.body.innerHTML += '<div id="cards"></div>';

    document.getElementById('draw-card').addEventListener('click', () => {
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(response => response.json())
        .then(data => {
          if (data.cards.length === 0) {
            alert('No more cards in the deck!');
            return;
          }
          const card = data.cards[0];
          const cardHtml = `<p>${card.value} of ${card.suit}</p><img src="${card.image}" alt="${card.value} of ${card.suit}">`;
          document.getElementById('cards').innerHTML += cardHtml;
        });
    });
  });
