import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TEST_WORDS } from '../data/words';

function TestingPage({ onComplete, mode = 'adaptive' }) {
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

    const testWords = TEST_WORDS.slice(0, 20);

    useEffect(() => {
        setTargetWord(testWords[0]);
    }, []);

    const keyboardLayout = [
        ['q','w','e','r','t','y','u','i','o','p'],
        ['a','s','d','f','g','h','j','k','l'],
        ['z','x','c','v','b','n','m']
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

        if (mode === 'adaptive' && !isCorrect && expectedChar) {
            setKeySizes((prev) => ({
                ...prev,
                [expectedChar]: Math.min((prev[expectedChar] || 1) + 0.1, 1.3)
            }));
        }

        if (newWord.length === targetWord.length) {
            setTimeout(() => {
                setCurrentWord('');
                if (wordIndex < testWords.length - 1) {
                    const next = wordIndex + 1;
                    setWordIndex(next);
                    setTargetWord(testWords[next]);
                } else {
                    handleFinishTest();
                }
            }, 300);
        }
    };

    const handleFinishTest = () => {
        const mins = (Date.now() - stats.startTime) / 1000 / 60;

        const wpm =
            mins === 0 ? 0 : Math.round((stats.totalChars / 5) / mins);

        const accuracy =
            stats.totalChars === 0
                ? 100
                : Math.round((stats.correctChars / stats.totalChars) * 100);

        onComplete({
            mode,
            accuracy,
            wpm,
            errors: stats.errors,
            keyErrors: stats.keyErrors
        });
    };

    const calcAcc = () =>
        stats.totalChars === 0
            ? 100
            : Math.round((stats.correctChars / stats.totalChars) * 100);

    const calcWPM = () => {
        const mins = (Date.now() - stats.startTime) / 1000 / 60;
        return mins === 0 ? 0 : Math.round((stats.totalChars / 5) / mins);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="
                min-h-screen flex flex-col items-center justify-center p-6
                bg-gradient-to-br from-[#1a0b2e] via-[#3d0c49] to-[#5e0b3a]
                text-gray-200
            "
        >
            <div className="max-w-2xl w-full space-y-10">

                {/* Mode Label */}
                <div className="text-center text-sm text-pink-300 tracking-wider opacity-80">
                    {mode === 'baseline' ? "Baseline Typing Test" : "Adaptive Typing Test"}
                </div>

                {/* Progress */}
                <div className="flex justify-between items-center text-gray-300">
                    <div>Word {wordIndex + 1} of {testWords.length}</div>

                    <div className="flex gap-2">
                        {testWords.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full ${
                                    idx < wordIndex
                                        ? 'bg-green-400'
                                        : idx === wordIndex
                                            ? 'bg-blue-400'
                                            : 'bg-gray-600'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Word Card */}
                <motion.div
                    key={targetWord}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="
                        bg-white/10 backdrop-blur-xl
                        p-8 text-center rounded-3xl
                        shadow-[0_0_25px_rgba(255,0,120,0.25)]
                        border border-white/10
                    "
                >
                    <p className="text-sm text-gray-300">Type this word:</p>

                    <div className="text-4xl font-bold tracking-wide mt-2">
                        {targetWord.split('').map((char, i) => (
                            <span
                                key={i}
                                className={
                                    i < currentWord.length
                                        ? currentWord[i] === char
                                            ? 'text-green-400'
                                            : 'text-red-400'
                                        : 'text-gray-100'
                                }
                            >
                                {char}
                            </span>
                        ))}
                    </div>

                    <div className="mt-4 text-2xl text-gray-400 min-h-8">
                        {currentWord || "_"}
                    </div>
                </motion.div>

                {/* Keyboard Panel */}
                <div
                    className="
                        bg-white/10 backdrop-blur-xl p-6 rounded-3xl
                        shadow-[0_0_20px_rgba(0,0,0,0.3)] border border-white/10
                    "
                >
                    <div className="space-y-2">
                        {keyboardLayout.map((row, r) => (
                            <div key={r} className="flex justify-center gap-2">
                                {row.map((key) => {
                                    const scale = mode === 'adaptive'
                                        ? keySizes[key] || 1
                                        : 1;

                                    return (
                                        <motion.button
                                            key={key}
                                            whileTap={{ scale: 0.85 }}
                                            animate={{ scale }}
                                            onClick={() => handleKeyPress(key)}
                                            className="
                                                bg-gradient-to-br from-[#ffffff11] to-[#cccccc22]
                                                text-gray-200 uppercase font-semibold
                                                rounded-xl shadow-md hover:shadow-lg
                                                hover:bg-[#ffffff22]
                                                transition-all backdrop-blur-lg
                                            "
                                            style={{
                                                width: `${42 * scale}px`,
                                                height: `${50 * scale}px`,
                                                fontSize: `${17 * scale}px`
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

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: "Accuracy", value: `${calcAcc()}%`, color: "text-blue-300" },
                        { label: "WPM", value: calcWPM(), color: "text-purple-300" },
                        { label: "Errors", value: stats.errors, color: "text-pink-300" }
                    ].map((s, idx) => (
                        <div
                            key={idx}
                            className="
                                bg-white/10 backdrop-blur-xl p-4 rounded-2xl text-center
                                shadow-[0_0_20px_rgba(0,0,0,0.3)] border border-white/10
                            "
                        >
                            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
                            <div className="text-sm text-gray-300">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Finish Button */}
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleFinishTest}
                    className="
                        w-full px-6 py-4 rounded-2xl
                        bg-gradient-to-r from-blue-600 to-purple-600
                        text-white font-semibold shadow-xl
                        hover:shadow-[0_0_35px_rgba(120,0,255,0.6)]
                        transition-all
                    "
                >
                    Finish Test
                </motion.button>
            </div>
        </motion.div>
    );
}

export default TestingPage;
