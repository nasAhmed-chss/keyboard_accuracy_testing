// src/components/ResultsPage.js
import React, { useEffect,useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Target, RotateCcw } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

function ResultsPage({ results, onRestart }) {
    if (!results) return null;

    const baseline = results.baseline;
    const adaptive = results.adaptive;
    const [submitted, setSubmitted] = useState(false);

    const name = adaptive?.name || baseline?.name || "User";

    useEffect(() => {
    if (!adaptive) return;

    const sendData = async () => {
        console.log("Uploading to Supabase...");

        const { data, error } = await supabase
            .from("typing_results")
            .insert([
                {
                    name: adaptive.name,
                    accuracy: adaptive.accuracy,
                    wpm: adaptive.wpm,
                    errors: adaptive.errors,
                    key_errors: adaptive.keyErrors,

                    baseline_accuracy: baseline?.accuracy ?? null,
                    baseline_wpm: baseline?.wpm ?? null,
                    baseline_errors: baseline?.errors ?? null,

                    delta_accuracy:
                        baseline ? adaptive.accuracy - baseline.accuracy : null,
                    delta_wpm:
                        baseline ? adaptive.wpm - baseline.wpm : null,
                    delta_errors:
                        baseline ? baseline.errors - adaptive.errors : null,

                    mode: adaptive.mode,
                },
            ]);

        console.log("Insert data:", data);
        console.log("Insert error:", error);
    };

    sendData();

}, [adaptive]);

  



    const accChange = adaptive && baseline ? adaptive.accuracy - baseline.accuracy : 0;
    const wpmChange = adaptive && baseline ? adaptive.wpm - baseline.wpm : 0;
    const errChange = adaptive && baseline ? baseline.errors - adaptive.errors : 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
                min-h-screen p-6 flex items-center justify-center
                bg-gradient-to-br from-[#050507] via-[#0a0a12] to-[#170006]
                text-gray-200 relative overflow-hidden
            "
        >
            {/* GRID */}
            <div className="absolute inset-0 opacity-[0.12] pointer-events-none"
                style={{
                    backgroundImage:
                        `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px"
                }}
            />

            {/* RED GLOW */}
            <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen">
                <img src="/images/red-bokeh.png" className="w-full h-full object-cover" />
            </div>

            <div className="max-w-5xl w-full space-y-12 relative z-10">

                {/* HEADER */}
                <motion.div
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center"
                >
                    <h2 className="text-4xl font-bold text-white drop-shadow-xl">
                        Test Complete!
                    </h2>
                    <p className="text-gray-300 mt-2">
                        Thanks, <span className="text-red-300 font-semibold">{name}</span>.
                        Here’s your improvement summary.
                    </p>
                </motion.div>

                {/* RESULT CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* ACCURACY */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="
                            bg-white/10 backdrop-blur-xl rounded-3xl p-8
                            border border-white/10 shadow-[0_0_35px_rgba(255,0,100,0.35)]
                        "
                    >
                        <Target className="w-12 h-12 text-red-300 mb-3" />
                        <div className="text-4xl font-bold">{adaptive?.accuracy}%</div>
                        <p className="text-red-200 mt-1">Adaptive Accuracy</p>
                        {baseline && (
                            <p className="text-gray-300 text-sm mt-4">
                                Baseline: {baseline.accuracy}% <br />
                                Change: <span className="text-red-300 font-semibold">
                                    {accChange >= 0 ? "+" : ""}{accChange}%
                                </span>
                            </p>
                        )}
                    </motion.div>

                    {/* WPM */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="
                            bg-white/10 backdrop-blur-xl rounded-3xl p-8
                            border border-white/10 shadow-[0_0_35px_rgba(255,0,100,0.35)]
                        "
                    >
                        <TrendingUp className="w-12 h-12 text-purple-300 mb-3" />
                        <div className="text-4xl font-bold">{adaptive?.wpm}</div>
                        <p className="text-purple-200 mt-1">Adaptive WPM</p>
                        {baseline && (
                            <p className="text-gray-300 text-sm mt-4">
                                Baseline: {baseline.wpm} <br />
                                Change: <span className="text-purple-300 font-semibold">
                                    {wpmChange >= 0 ? "+" : ""}{wpmChange}
                                </span>
                            </p>
                        )}
                    </motion.div>

                    {/* ERRORS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="
                            bg-white/10 backdrop-blur-xl rounded-3xl p-8
                            border border-white/10 shadow-[0_0_35px_rgba(255,0,100,0.35)]
                        "
                    >
                        <BarChart3 className="w-12 h-12 text-pink-300 mb-3" />
                        <div className="text-4xl font-bold">{adaptive?.errors}</div>
                        <p className="text-pink-200 mt-1">Adaptive Errors</p>
                        {baseline && (
                            <p className="text-gray-300 text-sm mt-4">
                                Baseline: {baseline.errors} <br />
                                Change: <span className="text-pink-300 font-semibold">
                                    {errChange >= 0 ? "+" : ""}{errChange}
                                </span>
                            </p>
                        )}
                    </motion.div>
                </div>

                {/* RESTART BUTTON */}
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onRestart}
                    className="
                        w-full px-8 py-4 rounded-2xl font-semibold text-white
                        bg-gradient-to-r from-blue-600 to-purple-600
                        shadow-xl hover:shadow-[0_0_35px_rgba(120,0,255,0.6)]
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
