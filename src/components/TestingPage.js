// src/components/TestingPage.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TEST_WORDS } from '../data/words';
import IOSKeyboard from "./IOSKeyboard";

function TestingPage({ onComplete, mode = 'adaptive' }) {
    const MAX_KEY_SCALE = 1.3;
    const SCALE_STEP = 0.1;

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

    const testWords = React.useMemo(
  () => [...TEST_WORDS].sort(() => Math.random() - 0.5).slice(0, 20),
  []
);


    useEffect(() => {
        setTargetWord(testWords[0]);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
    const values = Object.values(keySizes);
    if (values.length === 0) return;

    const maxScale = Math.max(...values);
    const MAX_KEY_SCALE = 1.3;

    if (maxScale > MAX_KEY_SCALE) {
        setKeySizes(prev => {
            const normalized = {};
            for (let k in prev) {
                normalized[k] = prev[k] > 1 ? Math.max(1, prev[k] * 0.95) : 1;

            }
            return normalized;
        });
    }
}, [keySizes]);



    const keyboardLayout = [
        ['q','w','e','r','t','y','u','i','o','p'],
        ['a','s','d','f','g','h','j','k','l'],
        ['z','x','c','v','b','n','m']
    ];

    const handleKeyPress = (key) => {
        const newWord = currentWord + key;
        setCurrentWord(newWord);

        const expected = targetWord[currentWord.length];
        const isCorrect = key === expected;

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

        if (mode === "adaptive" && !isCorrect && expected) {
            setKeySizes(prev => ({
                ...prev,
                [expected]: Math.min((prev[expected] || 1) + 0.1, 1.3)
            }));
        }

    if (mode === "adaptive" && isCorrect) {
        setKeySizes(prev => {
            const current = prev[key] || 1;

            if (current <= 1) return prev;

            return {
                ...prev,
                [key]: Math.max(current - 0.05, 1)
            };
        });
    }


        if (newWord.length === targetWord.length) {
            setTimeout(() => {
                setCurrentWord('');
                if (wordIndex < testWords.length - 1) {
                    const next = wordIndex + 1;
                    setWordIndex(next);
                    setTargetWord(testWords[next]);
                } else {
                    handleFinish();
                }
            }, 300);
        }
    };

    const handleFinish = () => {
        const duration = (Date.now() - stats.startTime) / 1000 / 60;
        const wpm = duration === 0 ? 0 : Math.round((stats.totalChars / 5) / duration);
        const accuracy = stats.totalChars === 0
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
        const duration = (Date.now() - stats.startTime) / 1000 / 60;
        return duration === 0 ? 0 : Math.round((stats.totalChars / 5) / duration);
    };

    return (
        
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
                min-h-[var(--app-height)] p-1 flex flex-col items-center justify-center
                bg-gradient-to-br from-[#050507] via-[#0a0a12] to-[#170006]
                text-gray-200 relative overflow-hidden
            "
        >

            <div className="absolute inset-0 opacity-[0.12] pointer-events-none"
                style={{
                    backgroundImage:
                        `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px"
                }}
            />

            <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen">
                <img src="/images/red-bokeh.png" className="w-full h-full object-cover" />
            </div>

           <div
                className="
                    w-full                       /* FUL width on all screens */
                    max-w-none                   /* Remove max-width restriction */
                    md:max-w-2xl                 /* Only cap width on desktop */
                    space-y-6
                    relative z-10 
                    flex-1
                    overflow-y-auto
                    pb-[300px]
                "
            >





               <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="
                    text-center 
                    text-2xl sm:text-3xl font-bold 
                    tracking-wide 
                    mb-4
                    bg-gradient-to-r from-purple-400 via-pink-400 to-red-400
                    bg-clip-text text-transparent
                    drop-shadow-[0_0_15px_rgba(255,60,120,0.45)]
                "
            >
                {mode === "baseline" ? "Baseline Typing Test" : "Adaptive Typing Test"}

                <div className="mx-auto mt-3 w-96 h-[3px] rounded-full 
                    bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                    shadow-[0_0_18px_rgba(255,60,120,0.7)]">
                </div>
            </motion.div>

                <div className="flex justify-between text-gray-300 text-xs sm:text-sm whitespace-nowrap">
                    <div>Word {wordIndex + 1} of {testWords.length}</div>
                    <div className="flex gap-2">
                        {testWords.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                    i < wordIndex
                                        ? "bg-green-400"
                                        : i === wordIndex
                                            ? "bg-red-300"
                                            : "bg-gray-600"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: "Accuracy", value: `${calcAcc()}%`, color: "text-blue-300" },
                        { label: "WPM", value: calcWPM(), color: "text-purple-300" },
                        { label: "Errors", value: stats.errors, color: "text-red-300" }
                    ].map((s, i) => (
                        <div
                            key={i}
                            className="
                                bg-white/10 backdrop-blur-xl p-2 rounded-2xl text-center
                                border border-white/10 shadow-[0_0_20px_rgba(255,0,80,0.25)]
                            "
                        >
                            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
                            <div className="text-sm text-gray-300">{s.label}</div>
                        </div>
                    ))}
                </div>

                <motion.div
                    key={targetWord}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="
                        p-8 rounded-3xl bg-white/10 backdrop-blur-xl
                        border border-white/10 shadow-[0_0_35px_rgba(255,0,100,0.3)]
                        text-center
                    "
                >
                    <p className="text-sm text-gray-300">Type this word:</p>

                    <div className="text-4xl font-bold tracking-widest mt-2">
                        {targetWord.split('').map((char, i) => (
                            <span
                                key={i}
                                className={
                                    i < currentWord.length
                                        ? currentWord[i] === char
                                            ? "text-green-400"
                                            : "text-red-400"
                                        : "text-gray-100"
                                }
                            >
                                {char}
                            </span>
                        ))}
                    </div>

                    <div className="mt-3 text-2xl text-gray-400 min-h-8">
                        {currentWord || "_"}
                    </div>
                </motion.div>
  
             <div
                className="
                    fixed bottom-0 left-0 right-0 w-full px-2 pb-6
                    backdrop-blur-xl
                    border-t border-white/10

                    md:static md:w-[480px] md:mx-auto
                    md:rounded-3xl 
                    md:border md:border-white/10 

                    /* Remove dark background */
                    bg-transparent

                    /* Add neon underglow */
                    md:shadow-[0_0_40px_10px_rgba(255,0,120,0.25)]
                    block md:hidden
                "
                >




                <IOSKeyboard
                    mode={mode}
                    keySizes={keySizes}
                    onKeyPress={handleKeyPress}
                />
            </div>

            <div
                className="
                    hidden md:flex
                    fixed bottom-0 left-0 right-0
                    h-[180px]
                    bg-black/20 backdrop-blur-xl border-t border-white/10
                    text-center items-center justify-center
                    text-gray-300 text-sm
                "
            >
                Custom keyboard is only available on iOS.
            </div>


                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleFinish}
                    className="
                        w-full px-6 py-4 rounded-2xl font-semibold text-white
                        bg-gradient-to-r from-blue-600 to-purple-600
                        shadow-xl hover:shadow-[0_0_35px_rgba(120,0,255,0.6)]
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
