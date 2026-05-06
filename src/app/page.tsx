'use client'
import { useState } from 'react'
import Link from 'next/link'

const painPoints = [
  { id: 'paralyzed', emoji: '🧠', text: "I can't start anything", keyword: 'TRIAGE', solution: "Sort your chaos into now, later, never", branch: 'Keep Going' },
  { id: 'overwhelmed', emoji: '📋', text: "Everything is too much", keyword: 'OVERWHELM', solution: "Emergency protocol for when it all piles up", branch: 'Keep Going' },
  { id: 'money', emoji: '💸', text: "Money keeps disappearing", keyword: 'MONEY', solution: "See the hidden cost of ADHD and stop the bleed", branch: 'Spend Smart' },
  { id: 'rejection', emoji: '💬', text: "Someone is mad at me", keyword: 'FEELINGS', solution: "Scripts for when your brain screams they hate me", branch: 'Be Connected' },
  { id: 'burnout', emoji: '🔥', text: "I'm completely exhausted", keyword: 'BURNOUT', solution: "Check your burnout level and get a recovery plan", branch: 'Feel Good' },
  { id: 'focus', emoji: '😵', text: "My brain won't focus", keyword: 'FOCUS', solution: "Target the exact executive function that's struggling", branch: 'Keep Going' },
]

export default function ActionHomepage() {
  const [selectedPain, setSelectedPain] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const selectedTool = painPoints.find(p => p.id === selectedPain)

  const handlePainSelect = (painId) => {
    if (selectedPain === painId) return
    setShowResult(false)
    setTimeout(() => { setSelectedPain(painId); setShowResult(true) }, 150)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* Floating Keywords Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
        {['TRIAGE', 'BURNOUT', 'DOPAMINE', 'FEELINGS', 'SLEEP', 'OVERWHELM'].map((kw, i) => (
          <span key={kw} className="absolute text-6xl text-[#FFC107] font-black"
            style={{ left: `${(i * 17) % 85}%`, top: `${(i * 23) % 70}%`, fontFamily: 'League Gothic, sans-serif', transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (i * 5)}deg)` }}>
            {kw}
          </span>
        ))}
      </div>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24">
        <div className="relative z-10 max-w-6xl mx-auto w-full">

          <div className="inline-flex items-center gap-3 bg-[#FFC107]/10 border border-[#FFC107]/30 rounded-full px-6 py-3 mb-8">
            <div className="w-3 h-3 bg-[#FFC107] rounded-full animate-pulse" />
            <span className="text-[#FFC107] font-bold text-sm uppercase tracking-widest">25+ Protocols Ready</span>
          </div>

          <h1 style={{ fontFamily: 'League Gothic, sans-serif' }} className="text-6xl md:text-[8rem] lg:text-[10rem] uppercase leading-[0.8] tracking-tighter mb-8">
            <span className="text-white">WHAT</span>
            <span className="text-[#FFC107] block">HURTS</span>
            <span className="text-white block">TODAY?</span>
          </h1>

          <p className="text-white/60 text-xl md:text-2xl mb-4 max-w-3xl">
            Click the thing that's screaming loudest in your brain right now.
          </p>
          <p className="text-[#FFC107] font-bold text-lg mb-12">
            We'll give you the exact protocol you need.
          </p>

          {/* Pain point grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {painPoints.map((pain) => (
              <button key={pain.id} onClick={() => handlePainSelect(pain.id)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 active:scale-95 text-left ${
                  selectedPain === pain.id
                    ? 'bg-[#FFC107] border-[#FFC107] text-black shadow-[0_20px_40px_rgba(255,193,7,0.3)]'
                    : 'bg-black/40 border-white/20 text-white hover:border-[#FFC107]/60'
                }`}>
                <div className="text-4xl mb-3">{pain.emoji}</div>
                <div className={`font-bold text-sm leading-tight ${selectedPain === pain.id ? 'text-black' : 'text-white'}`}>
                  {pain.text}
                </div>
                <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                  selectedPain === pain.id ? 'bg-black text-[#FFC107] opacity-100' : 'bg-[#FFC107]/20 text-[#FFC107] opacity-0 group-hover:opacity-100'
                }`}>
                  {pain.keyword}
                </div>
              </button>
            ))}
          </div>

          {/* Result panel */}
          {showResult && selectedTool && (
            <div className="bg-gradient-to-r from-[#FFC107] to-yellow-400 rounded-3xl p-8 md:p-12 text-black animate-sor7ed-in">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                <div className="flex-1">
                  <span className="text-black/60 text-sm font-bold uppercase tracking-widest block mb-3">⚡ Protocol Found</span>
                  <h2 style={{ fontFamily: 'League Gothic, sans-serif' }} className="text-4xl md:text-6xl lg:text-7xl uppercase font-black leading-none mb-4">
                    {selectedTool.keyword}
                  </h2>
                  <p className="text-black/80 text-lg md:text-xl mb-2">{selectedTool.solution}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="bg-black text-[#FFC107] px-3 py-1 rounded-full text-xs font-bold">{selectedTool.branch}</span>
                    <span className="text-black/50 text-xs">Sign up free to receive it on WhatsApp</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 min-w-fit">
                  <Link href="/signup"
                    className="bg-black text-[#FFC107] px-8 py-4 rounded-xl font-black text-lg uppercase tracking-wide hover:scale-105 transition-all text-center shadow-lg">
                    Get This Protocol Free →
                  </Link>
                  <Link href="/blog"
                    className="border-2 border-black text-black px-8 py-4 rounded-xl font-bold text-center hover:bg-black hover:text-[#FFC107] transition-all">
                    Read the Article
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Fallback CTA */}
          {!showResult && (
            <div className="text-center">
              <p className="text-white/40 mb-6">Or jump straight in</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tools" className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:border-[#FFC107] hover:text-[#FFC107] transition-all">
                  Browse All Tools
                </Link>
                <Link href="/signup" className="border-2 border-[#FFC107] text-[#FFC107] px-8 py-4 rounded-xl font-bold hover:bg-[#FFC107] hover:text-black transition-all">
                  Create Free Account
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sticky bottom bar */}
      <section className="sticky bottom-0 z-50 bg-black/90 backdrop-blur border-t border-white/10 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-sm hidden sm:block">Quick:</span>
            {['TRIAGE', 'BURNOUT', 'FEELINGS'].map(kw => (
              <button key={kw}
                onClick={() => handlePainSelect(painPoints.find(p => p.keyword === kw)?.id ?? '')}
                className="bg-white/5 hover:bg-[#FFC107] hover:text-black text-[#FFC107] px-3 py-2 rounded-lg text-sm font-mono transition-all">
                {kw}
              </button>
            ))}
          </div>
          <Link href="/signup" className="bg-[#FFC107] text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-all">
            Get Started Free
          </Link>
        </div>
      </section>

    </div>
  )
}