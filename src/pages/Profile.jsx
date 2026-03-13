import { useState, useEffect } from 'react'
import { dayPlans, knowledgeData } from '../data/knowledge'
import { 
  getReviewedCount, 
  getTotalKnowledgeCount, 
  getReminderSettings, 
  saveReminderSettings,
  getReviewCandidates 
} from '../data/progress'
import './Profile.css'

export default function Profile() {
  const [settings, setSettings] = useState({
    enabled: true,
    time: '09:00',
    interval: 1
  })
  const [reviewCount, setReviewCount] = useState(0)

  useEffect(() => {
    setSettings(getReminderSettings())
    setReviewCount(getReviewCandidates().length)
  }, [])

  const handleToggle = () => {
    const newSettings = { ...settings, enabled: !settings.enabled }
    setSettings(newSettings)
    saveReminderSettings(newSettings)
  }

  const handleTimeChange = (e) => {
    const newSettings = { ...settings, time: e.target.value }
    setSettings(newSettings)
    saveReminderSettings(newSettings)
  }

  const handleIntervalChange = (e) => {
    const newSettings = { ...settings, interval: parseInt(e.target.value) }
    setSettings(newSettings)
    saveReminderSettings(newSettings)
  }

  const totalKnowledge = getTotalKnowledgeCount()
  const reviewedCount = getReviewedCount()
  const progress = Math.round((reviewedCount / totalKnowledge) * 100)
  
  const stats = [
    { label: '学习天数', value: dayPlans.length, icon: '📅' },
    { label: '知识点', value: totalKnowledge, icon: '📚' },
    { label: '已掌握', value: reviewedCount, icon: '✅' },
    { label: '完成率', value: `${progress}%`, icon: '📈' },
  ]

  // 随机获取一个复习知识点
  const reviewCandidate = getReviewCandidates()[0]

  return (
    <div className="profile">
      <header className="profile-header">
        <div className="avatar">🏗️</div>
        <h1>架构师备考</h1>
        <p>高级系统架构设计师</p>
      </header>

      <section className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card">
            <span className="stat-icon">{stat.icon}</span>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      {reviewCandidate && settings.enabled && (
        <section className="review-section">
          <h2>🎯 今日复习</h2>
          <div className="review-card">
            <div className="review-title">{reviewCandidate.title}</div>
            <div className="review-summary">{reviewCandidate.summary}</div>
            <a href={`#/knowledge/${reviewCandidate.id}`} className="review-link">
              去复习 →
            </a>
          </div>
        </section>
      )}

      <section className="settings-section">
        <h2>⚙️ 复习提醒</h2>
        
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-icon">🔔</span>
            <div>
              <div className="setting-title">每日复习提醒</div>
              <div className="setting-desc">随机推送已学知识点复习</div>
            </div>
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={settings.enabled}
              onChange={handleToggle}
            />
            <span className="slider"></span>
          </label>
        </div>

        {settings.enabled && (
          <>
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-icon">⏰</span>
                <div className="setting-title">提醒时间</div>
              </div>
              <input 
                type="time" 
                value={settings.time}
                onChange={handleTimeChange}
                className="time-input"
              />
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-icon">📅</span>
                <div className="setting-title">复习间隔</div>
              </div>
              <select 
                value={settings.interval}
                onChange={handleIntervalChange}
                className="interval-select"
              >
                <option value={1}>每天</option>
                <option value={2}>每2天</option>
                <option value={3}>每3天</option>
                <option value={7}>每周</option>
              </select>
            </div>
          </>
        )}
      </section>

      <section className="tips-section">
        <h2>💡 备考建议</h2>
        <div className="tip-card">
          <p>• 每天坚持学习1-2个知识点</p>
          <p>• 重点攻克标记为"困难"的知识点</p>
          <p>• 定期复习已学内容加深记忆</p>
          <p>• 结合实际项目理解抽象概念</p>
        </div>
      </section>

      <footer className="profile-footer">
        <p>祝你考试顺利！🎉</p>
        <p className="version">架构师备考通 v1.1</p>
      </footer>
    </div>
  )
}
