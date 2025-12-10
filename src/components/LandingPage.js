import React, { useState, useEffect } from 'react';
import { ArrowRight, BarChart3, Keyboard, Layers, Sparkles, Target, TrendingDown, Zap } from 'lucide-react';
import keyboard4k from '../images/keyboard-4k.jpg';


export default function AdaptiveKeyboardLanding({ onStartTest }) {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});



  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section with Background */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
    backgroundImage: `url(${keyboard4k})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}>
        {/* Animated Background Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black/60 to-blue-900/40"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translateY(${scrollY * 0.3}px)`
          }} />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div
            style={{
              opacity: Math.max(0, 1 - scrollY / 500),
              transform: `translateY(${scrollY * 0.2}px)`
            }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300 font-medium">CSE 518 Research Project</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(34,211,238,0.5)] animate-pulse">
                Adaptive Key
              </span>
              <br />
              <span className="text-white">Resizing</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionary touchscreen keyboard that learns from your mistakes
              and adapts in real-time to reduce typing errors
            </p>

            {/* Author Info */}
            <p className="text-gray-400 mb-12">
              By Naseer Ahmed • Dr. Xiaojun Bi • September 2025
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
              onClick={() => window.open('/research.pdf', '_blank')}
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                Explore the Research
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
              onClick={onStartTest}
              className="px-8 py-4 border-2 border-purple-500/50 rounded-full font-semibold text-lg hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-sm">
                View Demo
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-20 animate-bounce">
              <div className="w-6 h-10 border-2 border-purple-400 rounded-full mx-auto flex justify-center">
                <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Statement Section */}
      <section className="relative py-32 bg-gradient-to-b from-black to-purple-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              The Problem
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Typing on touchscreen keyboards remains a frustrating experience for millions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers className="w-8 h-8" />,
                title: "Finger Size Variation",
                description: "Different finger sizes make it difficult to accurately hit small keys on touchscreen keyboards"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Grip Postures",
                description: "Various holding positions lead to inconsistent typing accuracy and recurring errors"
              },
              {
                icon: <TrendingDown className="w-8 h-8" />,
                title: "Limited Screen Space",
                description: "Compact layouts force keys to be smaller, increasing the chance of mistypes"
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-red-500/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-red-500/20"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${idx * 0.2}s both`
                }}
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-red-400">{item.icon}</div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Current Solutions Callout */}
          <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30">
            <p className="text-xl text-center text-gray-300">
              <span className="font-bold text-yellow-400">Existing solutions like autocorrect and predictive text</span> often create new problems by incorrectly altering intended words
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="relative py-32 bg-gradient-to-b from-purple-950/20 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 mb-6 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300 font-medium">Our Solution</span>
            </div>
        <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent leading-tight pb-3">
              Intelligence at Your Fingertips
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A keyboard that learns your unique typing patterns and adapts to minimize errors
            </p>
          </div>

          {/* How It Works */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-4xl font-bold mb-8">How It Works</h3>
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Monitor Input Patterns",
                    desc: "The system continuously tracks your typing behavior in real-time"
                  },
                  {
                    step: "02",
                    title: "Identify Error-Prone Keys",
                    desc: "Lightweight algorithms recognize which characters you frequently mistype"
                  },
                  {
                    step: "03",
                    title: "Dynamic Key Adjustment",
                    desc: "Problem keys automatically enlarge while less error-prone keys shrink proportionally"
                  },
                  {
                    step: "04",
                    title: "Continuous Optimization",
                    desc: "The keyboard adapts over time, constantly improving accuracy"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Demo Area */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/30 backdrop-blur-xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <Keyboard className="w-32 h-32 mx-auto mb-6 text-purple-400 animate-pulse" />
                  <p className="text-lg text-gray-300">Adaptive Key Visualization</p>
                  <p className="text-sm text-gray-500 mt-2">Real-time adjustment based on user behavior</p>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}} />
            </div>
          </div>

          {/* Example Scenario */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 backdrop-blur-xl">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-3">Example in Action</h4>
                <p className="text-lg text-gray-300 leading-relaxed">
                  If you consistently mistype the letter <span className="px-2 py-1 bg-red-500/20 rounded border border-red-500/30 font-mono">'x'</span>, 
                  the system will automatically increase its size while proportionally reducing nearby keys. 
                  The success rate is monitored continuously, ensuring optimal keyboard layout for your unique typing style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Methodology Section */}
      <section className="relative py-32 bg-gradient-to-b from-black to-blue-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent leading-tight pb-2">
              Research Approach
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Rigorous evaluation through controlled studies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-500 hover:scale-105">
              <BarChart3 className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Evaluation Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <p className="text-lg text-gray-300"><strong>Typing Speed:</strong> Words per minute (WPM)</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <p className="text-lg text-gray-300"><strong>Error Rate:</strong> Percentage of mistyped characters</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <p className="text-lg text-gray-300"><strong>Success Rate:</strong> Improvement tracking over time</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-500 hover:scale-105">
              <Target className="w-12 h-12 text-cyan-400 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Study Design</h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                Multiple controlled studies comparing the adaptive keyboard against static keyboard layouts
              </p>
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <p className="text-gray-300">
                  <strong className="text-cyan-400">Hypothesis:</strong> Adaptive key resizing will reduce error rates while maintaining or improving typing speed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expected Impact Section */}
      <section className="relative py-32 bg-gradient-to-b from-blue-950/20 to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight pb-2">
            Expected Impact
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {[
              { value: "↓ 40%", label: "Error Reduction", color: "from-green-400 to-emerald-400" },
              { value: "↑ 25%", label: "Typing Confidence", color: "from-blue-400 to-cyan-400" },
              { value: "→ 100%", label: "Speed Maintained", color: "from-purple-400 to-pink-400" }
            ].map((stat, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:scale-105 transition-transform duration-300">
                <div className={`text-5xl font-bold mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <p className="text-lg text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            By addressing errors at the source—the keyboard layout itself—we aim to create a more intuitive and personalized typing experience for all users
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-20 bg-gradient-to-t from-purple-900/20 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Typing?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join the future of adaptive touchscreen keyboards
          </p>
          <button className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto">
            Get Early Access
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}