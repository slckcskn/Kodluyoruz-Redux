import { createSlice } from "@reduxjs/toolkit";
import data from "../wordData.json";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const speedSlice = createSlice({
  name: "speedTest",
  initialState: {
    words: shuffleArray(data.words),
    inputValue: "",
    currentIndex: 0,
    time: 60,
    isActive: false,
    isFinished: false,
    keyCount: 0,
    dks: 0,
    correct: 0,
    wrong: 0,
    wordStatus: [],
  },
  reducers: {
    calculateDks: (state) => {
      state.dks = state.keyCount / 5;
    },
    incrementKeyCount: (state, action) => {
      state.keyCount += action.payload;
    },
    decrementTime: (state) => {
      if (state.time > 0) {
        state.time -= 1;
      }
    },
    resetTime: (state) => {
      state.words = shuffleArray([...data.words]);
      state.time = 60;
      state.wordStatus = [];
      state.correct = 0;
      state.wrong = 0;
      state.keyCount = 0;
      state.dks = 0;
      state.currentIndex = 0;
      state.isActive = false;
      state.inputValue = "";
      state.isFinished = false;
    },
    correctWord: (state, action) => {
      if (state.time > 0) {
        const i = action.payload;
        state.wordStatus[i] = "success";
        state.correct += 1;
      }
    },
    wrongWord: (state, action) => {
      if (state.time > 0) {
        const i = action.payload;
        state.wordStatus[i] = "danger";
        state.wrong += 1;
      }
    },
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
    setIsFinished: (state, action) => {
      state.isFinished = action.payload;
    },
  }
});

export const { decrementTime, incrementKeyCount, correctWord, wrongWord, resetTime, calculateDks, setInputValue, setIsActive, setIsFinished } = speedSlice.actions;
export default speedSlice.reducer;
