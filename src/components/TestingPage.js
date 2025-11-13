// src/components/TestingPage.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TEST_WORDS } from '../data/words';

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

    // Use first 20 words from big list (adjust if you want)
    const testWords = TEST_WORDS.slice(0, 20);

    useEffect(() => {
        setTargetWord(testWords[0]);
    }, []);
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

        setStats((prev) => ({
            ...prev,
            totalChars: prev.totalChars + 1,
            correctChars: prev.correctChars + (isCorrect ? 1 : 0),
            errors: prev.errors + (isCorrect ? 0 : 1),
            keyErrors: {
                ...prev.keyErrors,
                [key]: (prev.keyErrors[key] || 0) + (isCorrect ? 0 : 1)
            }
        }));

        // Grow keys that are error-prone
        if (!isCorrect && expectedChar) {
            setKeySizes((prev) => ({
                ...prev,
                [expectedChar]: Math.min((prev[expectedChar] || 1) + 0.1, 1.3)
            }));
        }

        if (newWord.length === targetWord.length) {
            setTimeout(() => {
                setCurrentWord('');
                if (wordIndex < testWords.length - 1) {
                    const nextIndex = wordIndex + 1;
                    setWordIndex(nextIndex);
                    setTargetWord(testWords[nextIndex]);
                } else {
                    handleFinishTest();
                }
            }, 300);
        }
    };

    const handleFinishTest = () => {
        const durationMinutes = (Date.now() - stats.startTime) / 1000 / 60;
        const wpm =
            durationMinutes === 0
                ? 0
                : Math.round((stats.totalChars / 5) / durationMinutes);
        const accuracy =
            stats.totalChars === 0
                ? 100
                : Math.round((stats.correctChars / stats.totalChars) * 100);

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
                {/* Progress */}
                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                        Word {wordIndex + 1} of {testWords.length}
                    </div>
                    <div className="flex gap-2">
                        {testWords.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full ${idx < wordIndex
                                    ? 'bg-green-500'
                                    : idx === wordIndex
                                        ? 'bg-blue-500'
                                        : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Target word */}
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

                {/* Keyboard */}
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
                    <div className="space-y-2">
                        {keyboardLayout.map((row, rowIdx) => (
                            <div key={rowIdx} className="flex justify-center gap-2">
                                {row.map((key) => {
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

                {/* Live stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 text-center shadow-lg">
                        <div className="text-3xl font-bold text-blue-600">
                            {calculateAccuracy()}%
                        </div>
                        <div className="text-sm text-gray-600">Accuracy</div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 text-center shadow-lg">
                        <div className="text-3xl font-bold text-purple-600">
                            {calculateWPM()}
                        </div>
                        <div className="text-sm text-gray-600">WPM</div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 text-center shadow-lg">
                        <div className="text-3xl font-bold text-pink-600">
                            {stats.errors}
                        </div>
                        <div className="text-sm text-gray-600">Errors</div>
                    </div>
                </div>

                {/* Finish */}
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

export default TestingPage;
