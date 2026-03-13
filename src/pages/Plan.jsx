import { Link } from 'react-router-dom'
import { dayPlans, getKnowledgeByDay } from '../data/knowledge'
import './Plan.css'

export default function Plan() {
  return (
    <div className="plan">
      <header className="plan-header">
        <h1>📚 学习计划</h1>
        <p>{dayPlans.length} 天完整备考路线</p>
      </header>

      <div className="plan-list">
        {dayPlans.map((day, index) => {
          const knowledgeList = getKnowledgeByDay(day.id)
          const reviewedCount = knowledgeList.filter(k => k.isReviewed).length
          const isCompleted = reviewedCount === knowledgeList.length && knowledgeList.length > 0

          return (
            <Link key={day.id} to={`/day/${day.id}`} className={`plan-card ${isCompleted ? 'completed' : ''}`}>
              <div className="plan-day">
                <span className="day-num">Day {day.dayNum}</span>
                {isCompleted && <span className="completed-badge">✓</span>}
              </div>
              <div className="plan-content">
                <h3 className="plan-title">{day.title}</h3>
                <div className="plan-topics">
                  {day.topics.slice(0, 3).map((topic, i) => (
                    <span key={i} className="topic-pill">{topic}</span>
                  ))}
                  {day.topics.length > 3 && (
                    <span className="topic-more">+{day.topics.length - 3}</span>
                  )}
                </div>
              </div>
              <div className="plan-arrow">›</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
