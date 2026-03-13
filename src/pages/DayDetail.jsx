import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { dayPlans, getKnowledgeByDay } from '../data/knowledge'
import { getKnowledgeProgress } from '../data/progress'
import './DayDetail.css'

export default function DayDetail() {
  const { dayId } = useParams()
  const day = dayPlans.find(d => d.id === parseInt(dayId))
  const knowledgeList = getKnowledgeByDay(parseInt(dayId))
  const [progress, setProgress] = useState({})

  useEffect(() => {
    const loadProgress = () => {
      const p = {}
      knowledgeList.forEach(k => {
        p[k.id] = getKnowledgeProgress(k.id)
      })
      setProgress(p)
    }
    loadProgress()
    
    const handleStorage = () => loadProgress()
    window.addEventListener('progressUpdate', handleStorage)
    return () => window.removeEventListener('progressUpdate', handleStorage)
  }, [dayId])

  if (!day) {
    return <div className="not-found">未找到该天计划</div>
  }

  const reviewedCount = Object.values(progress).filter(v => v).length

  return (
    <div className="day-detail">
      <Link to="/plan" className="back-btn">‹ 返回计划</Link>

      <header className="day-header">
        <div className="day-badge">Day {day.dayNum}</div>
        <h1>{day.title}</h1>
        <div className="day-topics">
          {day.topics.map((topic, i) => (
            <span key={i} className="topic-chip">{topic}</span>
          ))}
        </div>
        <div className="day-progress">
          已掌握 {reviewedCount} / {knowledgeList.length}
        </div>
      </header>

      <section className="knowledge-section">
        <h2>📖 知识点 ({knowledgeList.length})</h2>
        <div className="knowledge-list">
          {knowledgeList.map(k => (
            <Link key={k.id} to={`/knowledge/${k.id}`} className="knowledge-card">
              <div className="knowledge-header">
                <h3 className="knowledge-title">{k.title}</h3>
                <div className="knowledge-status">
                  {progress[k.id] && <span className="reviewed-icon">✓</span>}
                  <span className={`difficulty-tag ${k.difficulty}`}>
                    {k.difficulty === 'easy' ? '简单' : k.difficulty === 'medium' ? '中等' : '困难'}
                  </span>
                </div>
              </div>
              <p className="knowledge-summary">{k.summary}</p>
              <div className="knowledge-tags">
                {k.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
