import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, BarChart3, TrendingUp, Target, ArrowRight, RotateCcw, Zap } from 'lucide-react';

// Main App Component with Page Navigation
export default function AdaptiveKeyboardApp() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [testResults, setTestResults] = useState(null);

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  const handleTestComplete = (results) => {
    setTestResults(results);
    setCurrentPage('results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-sans">
      <AnimatePresence mode="wait">
        {currentPage === 'landing' && (
          <LandingPage key="landing" onStartTest={() => navigateToPage('testing')} />
        )}
        {currentPage === 'testing' && (
          <TestingPage key="testing" onComplete={handleTestComplete} />
        )}
        {currentPage === 'results' && (
          <ResultsPage 
            key="results" 
            results={testResults} 
            onRestart={() => navigateToPage('testing')} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// 1️⃣ Landing Page Component
function LandingPage({ onStartTest }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12"
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left side - Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
          >
            CSE 518 Research Project
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Adaptive Key Resizing
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Improving mobile typing accuracy through real-time key resizing and behavioral analytics
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="text-sm">Error Reduction</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span className="text-sm">Speed Maintained</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Zap className="w-5 h-5 text-pink-600" />
              <span className="text-sm">Real-time Adaptation</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartTest}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all flex items-center gap-3"
          >
            Start Test
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Right side - Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="hidden md:flex items-center justify-center"
        >
          <div className="relative">
            {/* iPhone-style mockup */}
            <div className="w-80 h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-4 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <Keyboard className="w-32 h-32 text-purple-600 opacity-50" />
              </div>
            </div>
            {/* Floating accent elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl shadow-lg"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// 2️⃣ Testing Page Component
function TestingPage({ onComplete }) {
  const [currentWord, setCurrentWord] = useState('');
  const [targetWord, setTargetWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [stats, setStats] = useState({
    totalChars: 0,
    correctChars: 0,
    errors: 0,
    startTime: Date.now(),
    keyErrors: {}
  });
  const [keySizes, setKeySizes] = useState({});
  
  // Test words
  const testWords = ['hello', 'world', 'typing', 'keyboard', 'mobile', 'speed', 'accuracy', 'test'];
  
  useEffect(() => {
    setTargetWord(testWords[0]);
  }, []);

  // Keyboard layout
  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  const handleKeyPress = (key) => {
    const newWord = currentWord + key;
    setCurrentWord(newWord);
    
    const expectedChar = targetWord[currentWord.length];
    const isCorrect = key === expectedChar;
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalChars: prev.totalChars + 1,
      correctChars: prev.correctChars + (isCorrect ? 1 : 0),
      errors: prev.errors + (isCorrect ? 0 : 1),
      keyErrors: {
        ...prev.keyErrors,
        [key]: (prev.keyErrors[key] || 0) + (isCorrect ? 0 : 1)
      }
    }));

    // Adaptive resizing logic - enlarge error-prone keys
    if (!isCorrect) {
      setKeySizes(prev => ({
        ...prev,
        [expectedChar]: Math.min((prev[expectedChar] || 1) + 0.1, 1.3)
      }));
    }

    // Check if word is complete
    if (newWord.length === targetWord.length) {
      setTimeout(() => {
        setCurrentWord('');
        if (wordIndex < testWords.length - 1) {
          setWordIndex(wordIndex + 1);
          setTargetWord(testWords[wordIndex + 1]);
        } else {
          // Test complete
          handleFinishTest();
        }
      }, 300);
    }
  };

  const handleFinishTest = () => {
    const duration = (Date.now() - stats.startTime) / 1000 / 60; // minutes
    const wpm = Math.round((stats.totalChars / 5) / duration);
    const accuracy = Math.round((stats.correctChars / stats.totalChars) * 100);
    
    onComplete({
      accuracy,
      wpm,
      errors: stats.errors,
      keyErrors: stats.keyErrors
    });
  };

  const calculateAccuracy = () => {
    if (stats.totalChars === 0) return 100;
    return Math.round((stats.correctChars / stats.totalChars) * 100);
  };

  const calculateWPM = () => {
    const duration = (Date.now() - stats.startTime) / 1000 / 60;
    if (duration === 0) return 0;
    return Math.round((stats.totalChars / 5) / duration);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center p-6"
    >
      <div className="max-w-2xl w-full space-y-8">
        {/* Progress indicator */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">Word {wordIndex + 1} of {testWords.length}</div>
          <div className="flex gap-2">
            {testWords.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx < wordIndex ? 'bg-green-500' : 
                  idx === wordIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Target word display */}
        <motion.div
          key={targetWord}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl text-center"
        >
          <p className="text-sm text-gray-600 mb-2">Type this word:</p>
          <div className="text-4xl font-bold text-gray-900 tracking-wider">
            {targetWord.split('').map((char, idx) => (
              <span
                key={idx}
                className={
                  idx < currentWord.length
                    ? currentWord[idx] === char
                      ? 'text-green-600'
                      : 'text-red-600'
                    : 'text-gray-900'
                }
              >
                {char}
              </span>
            ))}
          </div>
          <div className="mt-4 text-2xl text-gray-400 min-h-8">
            {currentWord || '_'}
          </div>
        </motion.div>

        {/* Adaptive Keyboard */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
          <div className="space-y-2">
            {keyboardLayout.map((row, rowIdx) => (
              <div key={rowIdx} className="flex justify-center gap-2">
                {row.map(key => {
                  const scale = keySizes[key] || 1;
                  return (
                    <motion.button
                      key={key}
                      whileTap={{ scale: 0.9 }}
                      animate={{ scale }}
                      onClick={() => handleKeyPress(key)}
                      className="bg-gradient-to-br from-white to-gray-100 hover:from-blue-50 hover:to-purple-50 text-gray-800 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all uppercase"
                      style={{
                        width: `${40 * scale}px`,
                        height: `${48 * scale}px`,
                        fontSize: `${16 * scale}px`
                      }}
                    >
                      {key}
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 text-center shadow-lg">
            <div className="text-3xl font-bold text-blue-600">{calculateAccuracy()}%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 text-center shadow-lg">
            <div className="text-3xl font-bold text-purple-600">{calculateWPM()}</div>
            <div className="text-sm text-gray-600">WPM</div>
          </div>
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 text-center shadow-lg">
            <div className="text-3xl font-bold text-pink-600">{stats.errors}</div>
            <div className="text-sm text-gray-600">Errors</div>
          </div>
        </div>

        {/* Finish Test Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleFinishTest}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
        >
          Finish Test
        </motion.button>
      </div>
    </motion.div>
  );
}

// 3️⃣ Results Page Component
function ResultsPage({ results, onRestart }) {
  if (!results) return null;

  // Get top 3 most mistyped keys
  const topErrors = Object.entries(results.keyErrors || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center p-6"
    >
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Test Complete!</h2>
          <p className="text-gray-600">Here are your results</p>
        </motion.div>

        {/* Metric Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-2xl"
          >
            <Target className="w-12 h-12 mb-4 opacity-80" />
            <div className="text-5xl font-bold mb-2">{results.accuracy}%</div>
            <div className="text-blue-100">Accuracy Rate</div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl"
          >
            <TrendingUp className="w-12 h-12 mb-4 opacity-80" />
            <div className="text-5xl font-bold mb-2">{results.wpm}</div>
            <div className="text-purple-100">Words per Minute</div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-3xl p-8 text-white shadow-2xl"
          >
            <BarChart3 className="w-12 h-12 mb-4 opacity-80" />
            <div className="text-5xl font-bold mb-2">{results.errors}</div>
            <div className="text-pink-100">Total Errors</div>
          </motion.div>
        </div>

        {/* Most Mistyped Keys */}
        {topErrors.length > 0 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Keyboard className="w-6 h-6 text-purple-600" />
              Most Mistyped Keys
            </h3>
            <div className="space-y-4">
              {topErrors.map(([key, count], idx) => (
                <div key={key} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-white font-bold text-xl uppercase shadow-lg">
                    {key}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 font-semibold">Key: {key.toUpperCase()}</span>
                      <span className="text-gray-600">{count} errors</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / Math.max(...topErrors.map(e => e[1]))) * 100}%` }}
                        transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-600 bg-blue-50 rounded-xl p-4">
              💡 <strong>Adaptive Feature:</strong> These keys would be automatically enlarged in future typing sessions to reduce errors.
            </p>
          </motion.div>
        )}

        {/* Restart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRestart}
          className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
        >
          <RotateCcw className="w-5 h-5" />
          Restart Test
        </motion.button>
      </div>
    </motion.div>
  );
}