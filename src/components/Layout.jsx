import { Outlet, NavLink } from 'react-router-dom'
import './Layout.css'

export default function Layout() {
  return (
    <div className="layout">
      <main className="main-content">
        <Outlet />
      </main>
      <nav className="tab-bar">
        <NavLink to="/" end className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}>
          <span className="tab-icon">🏠</span>
          <span className="tab-label">首页</span>
        </NavLink>
        <NavLink to="/plan" className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}>
          <span className="tab-icon">📚</span>
          <span className="tab-label">学习</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}>
          <span className="tab-icon">👤</span>
          <span className="tab-label">我的</span>
        </NavLink>
      </nav>
    </div>
  )
}
