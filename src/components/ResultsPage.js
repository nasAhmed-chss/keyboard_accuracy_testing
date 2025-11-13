// src/components/ResultsPage.js
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Keyboard, BarChart3, TrendingUp, Target, RotateCcw } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

function ResultsPage({ results, onRestart }) {
    if (!results) return null;

    const { name, accuracy, wpm, errors, keyErrors } = results;

    // Save to Supabase once
    useEffect(() => {
        const saveResults = async () => {
            try {
                await supabase.from('typing_results').insert([
                    {
                        name,
                        accuracy,
                        wpm,
                        errors,
                        key_errors: keyErrors
                    }
                ]);
            } catch (err) {
                console.error('Error saving results:', err);
            }
        };

        saveResults();
    }, [name, accuracy, wpm, errors, keyErrors]);

    const topErrors = Object.entries(keyErrors || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    const maxErrorCount =
        topErrors.length > 0 ? Math.max(...topErrors.map((e) => e[1])) : 1;

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
                    <h2 className="text-4xl font-bold text-gray-900 mb-1">
                        Test Complete!
                    </h2>
                    <p className="text-gray-600">
                        Thanks, <span className="font-semibold">{name}</span>. Here are your results.
                    </p>
                </motion.div>

                {/* Metrics */}
                <div className="grid md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-2xl"
                    >
                        <Target className="w-12 h-12 mb-4 opacity-80" />
                        <div className="text-5xl font-bold mb-2">{accuracy}%</div>
                        <div className="text-blue-100">Accuracy Rate</div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl"
                    >
                        <TrendingUp className="w-12 h-12 mb-4 opacity-80" />
                        <div className="text-5xl font-bold mb-2">{wpm}</div>
                        <div className="text-purple-100">Words per Minute</div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-3xl p-8 text-white shadow-2xl"
                    >
                        <BarChart3 className="w-12 h-12 mb-4 opacity-80" />
                        <div className="text-5xl font-bold mb-2">{errors}</div>
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
                                            <span className="text-gray-700 font-semibold">
                                                Key: {key.toUpperCase()}
                                            </span>
                                            <span className="text-gray-600">{count} errors</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{
                                                    width: `${(count / maxErrorCount) * 100}%`
                                                }}
                                                transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
                                                className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 text-sm text-gray-600 bg-blue-50 rounded-xl p-4">
                            💡 <strong>Adaptive Feature:</strong> These keys would be automatically enlarged in
                            future typing sessions to reduce errors.
                        </p>
                    </motion.div>
                )}

                {/* Restart */}
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

export default ResultsPage;
