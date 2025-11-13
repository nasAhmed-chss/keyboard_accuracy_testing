// src/components/LandingPage.js
import React from 'react';
import { motion } from 'framer-motion';
import { Keyboard, TrendingUp, Target, ArrowRight, Zap } from 'lucide-react';

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
                        <div className="w-80 h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-4 shadow-2xl">
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                                <Keyboard className="w-32 h-32 text-purple-600 opacity-50" />
                            </div>
                        </div>
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

export default LandingPage;
