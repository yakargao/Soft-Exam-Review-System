import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getKnowledgeById, dayPlans } from '../data/knowledge'
import { getKnowledgeProgress, toggleKnowledgeReview } from '../data/progress'
import './KnowledgeDetail.css'

export default function KnowledgeDetail() {
  const { id } = useParams()
  const knowledge = getKnowledgeById(id)
  const [isReviewed, setIsReviewed] = useState(false)
  
  useEffect(() => {
    setIsReviewed(getKnowledgeProgress(parseInt(id)))
  }, [id])

  const handleToggleReview = () => {
    const newState = toggleKnowledgeReview(parseInt(id))
    setIsReviewed(newState)
    window.dispatchEvent(new Event('progressUpdate'))
  }
  
  if (!knowledge) {
    return <div className="not-found">未找到该知识点</div>
  }

  const day = dayPlans.find(d => d.id === knowledge.dayId)

  // 简单的Markdown渲染
  const renderContent = (content) => {
    const lines = content.split('\n')
    let html = []
    let inList = false

    lines.forEach((line) => {
      if (line.startsWith('### ')) {
        if (inList) { html.push('</ul>'); inList = false }
        html.push(`<h3>${line.slice(4)}</h3>`)
      } else if (line.startsWith('## ')) {
        if (inList) { html.push('</ul>'); inList = false }
        html.push(`<h2>${line.slice(3)}</h2>`)
      } else if (line.startsWith('# ')) {
        if (inList) { html.push('</ul>'); inList = false }
        html.push(`<h1>${line.slice(2)}</h1>`)
      }
      else if (line.match(/^[-*] /)) {
        if (!inList) { inList = true; html.push('<ul>') }
        html.push(`<li>${line.slice(2)}</li>`)
      } 
      else if (line.startsWith('---')) {
        if (inList) { html.push('</ul>'); inList = false }
        html.push('<hr/>')
      }
      else if (line.trim() === '') {
        if (inList) { html.push('</ul>'); inList = false }
      }
      else {
        if (inList) { html.push('</ul>'); inList = false }
        let formatted = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/`(.*?)`/g, '<code class="inline-code">$1</code>')
        html.push(`<p>${formatted}</p>`)
      }
    })

    if (inList) html.push('</ul>')
    return html.join('')
  }

  return (
    <div className="knowledge-detail">
      <Link to={`/day/${knowledge.dayId}`} className="back-btn">‹ 返回知识点列表</Link>

      <header className="detail-header">
        <div className="header-tags">
          <span className={`difficulty-badge ${knowledge.difficulty}`}>
            {knowledge.difficulty === 'easy' ? '简单' : knowledge.difficulty === 'medium' ? '中等' : '困难'}
          </span>
        </div>
        <h1>{knowledge.title}</h1>
        <p className="summary">{knowledge.summary}</p>
        {day && <div className="source-day">📅 Day {day.dayNum} · {day.title}</div>}
      </header>

      <article className="content" dangerouslySetInnerHTML={{ __html: renderContent(knowledge.content) }} />

      <footer className="detail-footer">
        <div className="tags-row">
          {knowledge.tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
      </footer>

      {/* 悬浮按钮 */}
      <button 
        className={`review-btn-float ${isReviewed ? 'reviewed' : ''}`}
        onClick={handleToggleReview}
      >
        {isReviewed ? '✓ 已掌握' : '○ 标记已掌握'}
      </button>
    </div>
  )
}
