import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Keyboard, BarChart3, TrendingUp, Target, RotateCcw } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

function ResultsPage({ results, onRestart }) {
    if (!results) return null;

    const baseline = results.baseline;
    const adaptive = results.adaptive;

    const name = adaptive?.name || baseline?.name || "User";

    useEffect(() => {
        if (!adaptive) return;

        const save = async () => {
            try {
                await supabase.from('typing_results').insert([{
                    name: adaptive.name,
                    accuracy: adaptive.accuracy,
                    wpm: adaptive.wpm,
                    errors: adaptive.errors,
                    key_errors: adaptive.keyErrors
                }]);
            } catch (err) {
                console.error("Supabase save error:", err);
            }
        };

        save();
    }, [adaptive]);

    const accChange = adaptive && baseline ? adaptive.accuracy - baseline.accuracy : 0;
    const wpmChange = adaptive && baseline ? adaptive.wpm - baseline.wpm : 0;
    const errChange = adaptive && baseline ? baseline.errors - adaptive.errors : 0;

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
            <div className="max-w-5xl w-full space-y-12">

                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <h2 className="text-4xl font-bold text-white drop-shadow-lg">
                        Test Complete!
                    </h2>

                    <p className="text-gray-300 mt-2">
                        Thanks, <span className="text-pink-300 font-semibold">{name}</span>.
                        Here's how your typing improved.
                    </p>
                </motion.div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Accuracy */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="
                            bg-white/10 backdrop-blur-xl rounded-3xl p-8
                            shadow-[0_0_30px_rgba(255,0,120,0.25)]
                            border border-white/10 text-white
                        "
                    >
                        <Target className="w-12 h-12 mb-4 text-pink-300" />
                        <div className="text-4xl font-bold">{adaptive?.accuracy}%</div>
                        <div className="text-pink-200 mt-1">Adaptive Accuracy</div>

                        {baseline && (
                            <p className="mt-4 text-gray-300 text-sm">
                                Baseline: {baseline.accuracy}% <br />
                                Change: <span className="text-pink-300 font-semibold">
                                    {accChange >= 0 ? "+" : ""}{accChange}%
                                </span>
                            </p>
                        )}
                    </motion.div>

                    {/* WPM */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="
                            bg-white/10 backdrop-blur-xl rounded-3xl p-8
                            shadow-[0_0_30px_rgba(120,0,255,0.25)]
                            border border-white/10 text-white
                        "
                    >
                        <TrendingUp className="w-12 h-12 mb-4 text-purple-300" />
                        <div className="text-4xl font-bold">{adaptive?.wpm}</div>
                        <div className="text-purple-200 mt-1">Adaptive WPM</div>

                        {baseline && (
                            <p className="mt-4 text-gray-300 text-sm">
                                Baseline: {baseline.wpm} <br />
                                Change: <span className="text-purple-300 font-semibold">
                                    {wpmChange >= 0 ? "+" : ""}{wpmChange}
                                </span>
                            </p>
                        )}
                    </motion.div>

                    {/* Errors */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="
                            bg-white/10 backdrop-blur-xl rounded-3xl p-8
                            shadow-[0_0_30px_rgba(255,0,80,0.25)]
                            border border-white/10 text-white
                        "
                    >
                        <BarChart3 className="w-12 h-12 mb-4 text-red-300" />
                        <div className="text-4xl font-bold">{adaptive?.errors}</div>
                        <div className="text-red-200 mt-1">Adaptive Errors</div>

                        {baseline && (
                            <p className="mt-4 text-gray-300 text-sm">
                                Baseline: {baseline.errors} <br />
                                Change: <span className="text-red-300 font-semibold">
                                    {errChange >= 0 ? "+" : ""}{errChange}
                                </span>
                            </p>
                        )}
                    </motion.div>
                </div>

                {/* Restart Button */}
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onRestart}
                    className="
                        w-full px-8 py-4 rounded-2xl
                        bg-gradient-to-r from-blue-600 to-purple-600
                        text-white font-semibold shadow-xl
                        hover:shadow-[0_0_35px_rgba(120,0,255,0.6)]
                        transition-all flex items-center justify-center gap-3
                    "
                >
                    <RotateCcw className="w-5 h-5" />
                    Restart Test
                </motion.button>

            </div>
        </motion.div>
    );
}

export default ResultsPage;
