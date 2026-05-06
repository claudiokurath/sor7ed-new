'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'

const tools = [
  { id: 'executive-function-triage', emoji: '🧩', name: 'Executive Function Triage', desc: 'Sort overwhelming tasks into now, later, never', keyword: 'TRIAGE', category: 'Keep Going', difficulty: 'Easy' },
  { id: 'dopamine-menu', emoji: '🎯', name: 'Dopamine Menu Generator', desc: 'Fix decision fatigue with a personalised activity menu', keyword: 'DOPAMINE', category: 'Keep Going', difficulty: 'Easy' },
  { id: 'difficult-message', emoji: '💬', name: 'Difficult Message', desc: 'Write the message you've been avoiding', keyword: 'TALK', category: 'Be Connected', difficulty: 'Medium' },
  { id: 'decision-clarity', emoji: '🔮', name: 'Decision Clarity', desc: 'Cut through decision paralysis fast', keyword: 'PATTERN', category: 'Keep Going', difficulty: 'Medium' },
  { id: 'burnout-reset', emoji: '🔥', name: 'Burnout Reset', desc: 'Assess your burnout level and get a recovery plan', keyword: 'BURNOUT', category: 'Feel Good', difficulty: 'Medium' },
  { id: 'sleep-reset', emoji: '😴', name: 'Sleep Reset', desc: 'Step-by-step protocol to fix your sleep', keyword: 'SLEEP', category: 'Feel Good', difficulty: 'Hard' },
]

const categories = ['All', 'Keep Going', 'Feel Good', 'Spend Smart', 'Be Connected']

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredTool, setHoveredTool] = useState(null)

  const filteredTools = useMemo(() => tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.keyword.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  }), [searchTerm, selectedCategory])

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="border-b border-white/10 py-16 px-6 pt-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-[#FFC107] rounded-full animate-pulse" />
            <span className="text-[#FFC107] text-sm font-bold uppercase tracking-widest">SOR7ED · Tool Library</span>
          </div>
          <h1 style={{ fontFamily: 'League Gothic, sans-serif' }} className="text-6xl md:text-8xl uppercase text-white mb-6">
            The <span className="text-[#FFC107]">Arsenal.</span>
          </h1>
          <p className="text-white/60 text-xl max-w-3xl">
            Practical tools for ADHD, autism, and dyslexia. Sign up free to unlock your full results on WhatsApp.
          </p>
        </div>
      </div>

      <div className="sticky top-16 z-40 bg-black/95 backdrop-blur border-b border-white/10 py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input type="text" placeholder="Search tools or keywords..."
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/40 focus:border-[#FFC107] focus:outline-none transition-all" />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">✕</button>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat ? 'bg-[#FFC107] text-black' : 'bg-white/5 text-white/60 hover:text-white border border-white/20'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <p className="text-white/40 text-sm mt-4">{filteredTools.length} tools available</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <div key={tool.id}
              onMouseEnter={() => setHoveredTool(tool.id)}
              onMouseLeave={() => setHoveredTool(null)}
              className="group bg-black border-2 border-white/10 rounded-2xl p-6 hover:border-[#FFC107] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,193,7,0.15)] transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`text-5xl transition-transform duration-300 ${hoveredTool === tool.id ? 'scale-110 rotate-12' : ''}`}>{tool.emoji}</div>
                <div className="text-right">
                  <span className="font-mono text-xs bg-[#FFC107]/10 text-[#FFC107] px-3 py-1 rounded-full border border-[#FFC107]/30">{tool.keyword}</span>
                  <div className={`text-xs mt-2 px-2 py-1 rounded-full ${
                    tool.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    tool.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>{tool.difficulty}</div>
                </div>
              </div>
              <h3 className="font-bold text-white text-xl mb-2 group-hover:text-[#FFC107] transition-colors">{tool.name}</h3>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">{tool.desc}</p>
              <div className="flex gap-3">
                <Link href={`/tools/${tool.id}`}
                  className="flex-1 bg-[#FFC107] text-black py-3 rounded-xl font-black text-sm uppercase text-center hover:scale-105 transition-all">
                  Try It →
                </Link>
                <Link href={`/tools/${tool.id}`}
                  className="border border-white/20 text-white/60 px-4 py-3 rounded-xl text-sm hover:border-white hover:text-white transition-all">
                  Info
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}