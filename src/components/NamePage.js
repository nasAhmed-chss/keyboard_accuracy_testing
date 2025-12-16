// src/components/NamePage.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Layers, ArrowDownCircle } from "lucide-react";

function NamePage({ onSubmitName }) {
    const [name, setName] = useState('');
    const [touched, setTouched] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched(true);
        if (!name.trim()) return;
        onSubmitName(name.trim());
    };

    const showError = touched && !name.trim();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="
                min-h-screen flex items-center justify-center p-6
                bg-gradient-to-br from-[#06060A] via-[#0A0A14] to-[#150005]
                relative overflow-hidden
            "
        >

            <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{
                    backgroundImage:
                        `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px"
                }}
            />

            <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40">
                <img src="/images/red-bokeh.png" className="w-full h-full object-cover" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="
                    relative z-10 max-w-md w-full 
                    bg-white/15 backdrop-blur-2xl
                    rounded-3xl p-10 
                    shadow-[0_0_40px_rgba(255,0,120,0.25)]
                    border border-white/20 
                    ring-1 ring-red-500/20
                    hover:shadow-[0_0_55px_rgba(255,0,120,0.4)]
                "
            >
              
                <h2 className="text-3xl font-bold bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg mb-4 text-center">
                    Before we begin…
                </h2>

      
                <p className="text-gray-200/90 mb-6 text-center leading-relaxed text-sm">
                    This study includes <strong className="text-red-300">two short typing tests</strong> designed  
                    to measure how adaptive keyboards can improve typing performance.
                </p>

         
                <div className="space-y-5 mb-8">

      
                    <div className="flex items-start gap-4">
                        <div className="p-2 rounded-xl bg-red-400/20 border border-red-500/30">
                            <Layers className="w-6 h-6 text-red-300" />
                        </div>
                        <p className="text-gray-200 text-sm leading-relaxed">
                            <strong className="text-red-300">Baseline Test</strong>:  
                            A standard on-screen keyboard to measure your natural  
                            <strong className="text-red-300"> speed</strong>, 
                            <strong className="text-red-300"> accuracy</strong>, and  
                            <strong className="text-red-300"> error rate</strong>.
                        </p>
                    </div>

                    <div className="flex justify-center opacity-60">
                        <ArrowDownCircle className="w-6 h-6 text-red-300" />
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-2 rounded-xl bg-pink-400/20 border border-pink-500/30">
                            <Activity className="w-6 h-6 text-pink-300" />
                        </div>
                        <p className="text-gray-200 text-sm leading-relaxed">
                            <strong className="text-pink-300">Adaptive Test</strong>:  
                            A dynamic keyboard where keys automatically  
                            <strong className="text-pink-300"> enlarge </strong>  
                            when you make mistakes — helping reduce errors.
                        </p>
                    </div>

                    <p className="text-center text-gray-300 text-sm mt-4">
                        We'll then <strong className="text-red-300">compare your results </strong>  
                        to see how adaptive resizing affects performance.
                    </p>
                </div>


                <form onSubmit={handleSubmit} className="space-y-6">

                    <label className="block text-sm font-medium text-gray-200 tracking-wide">
                        Your Name
                    </label>

                    <motion.div
                        whileFocus={{ scale: 1.01 }}
                        className="
                            rounded-2xl bg-white/10 text-white px-4 py-3 
                            border border-white/20 
                            focus-within:ring-2 focus-within:ring-red-500/60 
                            focus-within:border-transparent
                            shadow-inner shadow-black/40
                        "
                    >
                        <input
                            type="text"
                            className="w-full bg-transparent outline-none placeholder-gray-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => setTouched(true)}
                            placeholder="e.g., Jane Doe"
                        />
                    </motion.div>

                    {showError && (
                        <p className="text-xs text-red-400 -mt-4">Name is required.</p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="
                            w-full px-6 py-4
                            bg-gradient-to-r from-blue-600 to-purple-600
                            text-white font-semibold text-lg rounded-2xl
                            shadow-[0_10px_25px_rgba(80,0,220,0.35)]
                            hover:shadow-[0_10px_35px_rgba(110,0,255,0.55)]
                            transition-all
                        "
                    >
                        Start Typing Test
                    </motion.button>

                </form>
            </motion.div>

        </motion.div>
    );
}

export default NamePage;
