import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { dayPlans, knowledgeData } from '../data/knowledge'
import { getProgress, getReviewedCount, getTotalKnowledgeCount, getKnowledgeProgress } from '../data/progress'
import './Home.css'

export default function Home() {
  const [progress, setProgress] = useState({})
  
  useEffect(() => {
    setProgress(getProgress())
    // 监听进度变化
    const handleStorage = () => setProgress(getProgress())
    window.addEventListener('storage', handleStorage)
    window.addEventListener('progressUpdate', handleStorage)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('progressUpdate', handleStorage)
    }
  }, [])

  const totalDays = dayPlans.length
  const totalKnowledge = getTotalKnowledgeCount()
  const reviewedCount = getReviewedCount()
  const progressPercent = Math.round((reviewedCount / totalKnowledge) * 100)
  
  // 今天是第1天 (3月13日)
  const todayPlan = dayPlans[0]
  const dayNum = 1

  // 获取今日知识点的学习状态
  const todayKnowledge = knowledgeData.filter(k => k.dayId === 1)
  const todayReviewed = todayKnowledge.filter(k => progress[k.id]).length

  return (
    <div className="home">
      <header className="home-header">
        <div className="logo">🏗️</div>
        <h1>架构师备考通</h1>
        <p className="subtitle">63天冲刺 · 高级系统架构设计师</p>
      </header>

      <section className="progress-section">
        <div className="progress-header">
          <span>学习进度</span>
          <span className="progress-percent">{progressPercent}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <p className="progress-text">已掌握 {reviewedCount} / {totalKnowledge} 个知识点</p>
      </section>

      <section className="today-section">
        <h2>📅 今日学习 Day {dayNum}</h2>
        <Link to={`/day/${todayPlan.id}`} className="today-card">
          <div className="today-day">{todayPlan.title}</div>
          <div className="today-topics">
            {todayPlan.topics.map((t, i) => (
              <span key={i} className="topic-tag">{t}</span>
            ))}
          </div>
          <div className="today-progress">
            {todayReviewed}/{todayKnowledge.length} 已掌握
          </div>
          <div className="today-arrow">→</div>
        </Link>
      </section>

      <section className="schedule-section">
        <h2>📋 冲刺计划</h2>
        <div className="schedule-grid">
          <div className="schedule-item">
            <div className="schedule-num">25</div>
            <div className="schedule-label">基础复习</div>
            <div className="schedule-desc">第1-25天</div>
          </div>
          <div className="schedule-item">
            <div className="schedule-num">25</div>
            <div className="schedule-label">强化训练</div>
            <div className="schedule-desc">第26-50天</div>
          </div>
          <div className="schedule-item">
            <div className="schedule-num">13</div>
            <div className="schedule-label">冲刺模拟</div>
            <div className="schedule-desc">第51-63天</div>
          </div>
        </div>
      </section>

      <section className="quick-stats">
        <div className="stat-item">
          <div className="stat-num">{totalDays}</div>
          <div className="stat-label">总天数</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">{totalKnowledge}</div>
          <div className="stat-label">知识点</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">{reviewedCount}</div>
          <div className="stat-label">已掌握</div>
        </div>
      </section>

      <section className="reviewed-section">
        <h2>✅ 已掌握知识点</h2>
        <div className="reviewed-list">
          {Object.entries(progress).filter(([_, v]) => v).map(([id]) => {
            const k = knowledgeData.find(k => k.id === parseInt(id))
            if (!k) return null
            return (
              <Link key={id} to={`/knowledge/${id}`} className="reviewed-item">
                <span className="reviewed-title">{k.title}</span>
                <span className="reviewed-arrow">›</span>
              </Link>
            )
          })}
          {reviewedCount === 0 && (
            <div className="no-reviewed">暂无学习记录，快去学习吧！</div>
          )}
        </div>
      </section>
    </div>
  )
}
