import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Plan from './pages/Plan'
import DayDetail from './pages/DayDetail'
import KnowledgeDetail from './pages/KnowledgeDetail'
import Profile from './pages/Profile'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="plan" element={<Plan />} />
        <Route path="day/:dayId" element={<DayDetail />} />
        <Route path="knowledge/:id" element={<KnowledgeDetail />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}
