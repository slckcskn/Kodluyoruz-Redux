
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { decrementTime, resetTime, correctWord, wrongWord, incrementKeyCount, calculateDks, setInputValue, setIsActive } from './redux/speedSlice';

function App() {
  const dispatch = useDispatch();
  const words = useSelector((state) => state.speed.words);
  const time = useSelector((state) => state.speed.time);
  const keyCount = useSelector((state) => state.speed.keyCount);
  const dks = useSelector((state) => state.speed.dks);
  const correct = useSelector((state) => state.speed.correct);
  const wrong = useSelector((state) => state.speed.wrong);
  const wordStatus = useSelector((state) => state.speed.wordStatus);
  const currentIndex = useSelector((state) => state.speed.correct + state.speed.wrong);
  const isActive = useSelector((state) => state.speed.isActive);
  const [modalVisible, setModalVisible] = useState(false);
  const [lang, setLang] = useState('TR');
  const [inputValue, setInputValueLocal] = useState('');

  useEffect(() => {
    if (isActive && time > 0) {
      const intervalId = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isActive, dispatch, time]);

  const handleReset = () => {
    dispatch(resetTime());
    setInputValueLocal('');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValueLocal(value);

    if (time > 0) {
      if (!isActive) {
        dispatch(setIsActive(true));
      }

      if (value.endsWith(' ')) {
        const wordObj = words[currentIndex];
        if (!wordObj) return;
        
        const typed = value.trim();
        const isCorrect = lang === 'TR' ? typed === wordObj.turkish : typed === wordObj.english;
        
        if (isCorrect) {
          dispatch(correctWord(currentIndex));
          dispatch(incrementKeyCount((lang === 'TR' ? wordObj.turkish.length : wordObj.english.length) + 1));
        } else {
          dispatch(wrongWord(currentIndex));
          dispatch(incrementKeyCount((lang === 'TR' ? wordObj.turkish.length : wordObj.english.length) + 1));
        }
        setInputValueLocal('');
      }
    }
  };

  useEffect(() => {
    if (time === 0 && isActive) {
      dispatch(calculateDks());
      setModalVisible(true);
    }
  }, [time, isActive, dispatch]);

  const resetGame = () => {
    setModalVisible(false);
    handleReset();
  };

  const calculateWPM = () => correct;
  const calculateAccuracy = () => {
    const total = correct + wrong;
    return total === 0 ? 0 : ((correct / total) * 100).toFixed(2);
  };

  const langChange = (e) => {
    setLang(e.target.value);
    handleReset();
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] font-sans text-[#1f2937]">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-12 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3 text-[#2563EB]">
            <div className="bg-[#adc7ff] p-2 rounded-lg text-white">
              <img src="/logo3.png" alt="Logo" className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold">TypeSpeed Master</h1>
          </div>
          {/* Daha sonra eklenebilir */}
          {/* <nav className="hidden md:flex gap-8">
            <a href="#" className="font-bold text-[#2563EB] border-b-2 border-[#2563EB] pb-1">Practice</a>
            <a href="#" className="text-gray-500 hover:text-[#2563EB] transition-colors">Leaderboard</a>
          </nav> */}
          {/* <div className="flex gap-4 text-gray-500">
            <button className="hover:text-gray-700"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></button>
            <button className="hover:text-gray-700"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></button>
          </div> */}
        </header>

        {/* Main Interface */}
        <div className="flex flex-col items-center">
          <div className="w-full">
            {/* Language Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center gap-4">
              <div className="relative ml-4">
                <select 
                  value={lang}
                  onChange={langChange}
                  className="bg-[#10B981] text-white px-4 py-2 rounded-lg appearance-none cursor-pointer pr-8"
                >
                  <option value="TR">Türkçe</option>
                  <option value="EN">English</option>
                </select>
              </div>
              <span className="text-gray-400 text-sm">Test dilini değiştirin</span>
            </div>

            {/* Words Area */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-6 relative overflow-hidden h-56">
              <div className="flex flex-wrap gap-2 gap-y-4 content-start">
                {words.slice(currentIndex, currentIndex + 33).map((word, idx) => {
                  const realIndex = currentIndex + idx;
                  const isCurrentWord = realIndex === currentIndex;
                  const isCorrect = wordStatus && wordStatus[realIndex] === 'success';
                  const isWrong = wordStatus && wordStatus[realIndex] === 'danger';
                  const isCompleted = isCorrect || isWrong;

                  return (
                    <span
                      key={realIndex}
                      className={`px-3 py-2 rounded text-lg font-medium whitespace-nowrap transition-all duration-300
                        ${isCompleted ? 'animate-exitWord opacity-0 scale-75' : 'opacity-100 scale-100'}
                        ${isCurrentWord && !isCompleted ? 'bg-blue-500 text-white shadow-lg ring-2 ring-blue-300 font-bold' : ''}
                        ${isCorrect ? 'bg-green-500 text-white' : ''}
                        ${isWrong ? 'bg-red-500 text-white' : ''}
                        ${!isCurrentWord && !isCompleted ? 'bg-gray-300 text-gray-700' : ''}
                      `}
                    >
                      {lang === 'TR' ? word.turkish : word.english}
                    </span>
                  );
                })}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
            </div>

            {/* Input Area */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  className="flex-1 text-xl px-6 py-4 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
                  value={inputValue}
                  onChange={handleChange}
                  disabled={time === 0}
                  placeholder={isActive ? '' : 'Yazmaya başlayın...'}
                  autoFocus
                />
                <div className="bg-gray-800 text-white w-24 rounded-lg flex items-center justify-center text-2xl font-bold">
                  {time}
                </div>
                <button 
                  onClick={handleReset}
                  className="bg-[#2563EB] text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {time === 0 && isActive && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
              <div className="bg-[#2563EB] text-white px-6 py-4 flex justify-between items-center">
                <span className="font-bold text-lg">Sonuç</span>
                
              </div>
              <div className="p-8 text-center">
                <div className="mb-6">
                  <h2 className="text-6xl font-bold text-green-600 mb-2">{calculateWPM()} DKS</h2>
                  <p className="text-gray-500">(dakikada yazılan kelime)</p>
                </div>
                
                <div className="space-y-4 border-y border-gray-100 py-6 my-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tuş Vuruşu</span>
                    <span className="font-bold text-gray-800">
                      <span className="text-green-600">({keyCount})</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Doğruluk</span>
                    <span className="font-bold text-gray-800">{calculateAccuracy()}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Doğru kelime</span>
                    <span className="font-bold text-green-600">{correct}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Yanlış kelime</span>
                    <span className="font-bold text-red-500">{wrong}</span>
                  </div>
                </div>

                <button 
                  onClick={resetGame} 
                  className="w-full bg-[#2563EB] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-colors text-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  Tekrar Dene
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-200 text-center text-gray-400 text-sm">
          <p className="mb-4">© 2026 TypeSpeed Master. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
