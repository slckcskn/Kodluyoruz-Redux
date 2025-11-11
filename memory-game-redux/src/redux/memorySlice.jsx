import { createSlice } from '@reduxjs/toolkit'
import frameworksData from '../utils/frameworks.json';

// Rastgele belirlenen sayı kadar framework seçen fonksiyon
function getRandomFrameworks(arr, n) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

// Diziyi karıştıran fonksiyon (Fisher-Yates)
function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Tek bir fonksiyon: her çağrıldığında yeni bir, iki kopyalı ve karıştırılmış deste üretir
function shuffledCard() {
  const randomFrameworks = getRandomFrameworks(frameworksData.frameworks, 10);
  // 2 ile çarp (her framework'ü iki kez ekle) ve başlangıç durumlarını ata
  const doubledFrameworks = [...randomFrameworks, ...randomFrameworks].map((item, idx) => ({
    ...item,
    id: idx + 1,
    isFlipped: false,
    isMatched: false,
  }));
  // Yeniden karıştır ve döndür
  return shuffleArray(doubledFrameworks);
}

export const counterSlice = createSlice({
  name: 'memory',
  initialState: {
    cards: shuffledCard(),
    score: 200,
    selectedCards: [],
  },

  reducers: {
    resetGame: (state) => {
      state.score = 200;
      state.cards = shuffledCard();
      state.selectedCards = [];
    },
    openCard: (state, action) => {
      const selectedCard = state.cards.find((card) => card.id === action.payload);
      if (selectedCard) {
        // Seçilmiş kartı tekrar seçilmesini engelleme
        const alreadySelected = state.selectedCards.some(c => c.id === selectedCard.id);
        if (!alreadySelected) {
          // Döndü mü?
          selectedCard.isFlipped = true;
          state.selectedCards = [...state.selectedCards, selectedCard];
        }
      }
    },
    closeCard: (state) => {
      // Eşlenmedi
      state.score -= 10;
      state.selectedCards.forEach(card => {
        const target = state.cards.find(c => c.id === card.id);
        if (target && !target.isMatched) 
          target.isFlipped = false;
      });
      state.selectedCards = [];
    },
    correctMatch: (state) => {
      state.score += 50;
      // Eşlendi diye işaretle
      state.selectedCards.forEach(card => {
        const target = state.cards.find(c => c.id === card.id);
        if (target) 
          target.isMatched = true;
      });
      state.selectedCards = [];
    },
    
  }

})

export const { resetGame, openCard, closeCard, correctMatch } = counterSlice.actions

export default counterSlice.reducer