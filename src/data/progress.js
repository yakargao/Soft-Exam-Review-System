import { useState, useEffect } from 'react'
import { dayPlans, knowledgeData } from '../data/knowledge'

// 学习状态管理
const STORAGE_KEY = 'arch-prep-progress'

export function getProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function toggleKnowledgeReview(knowledgeId) {
  const progress = getProgress()
  progress[knowledgeId] = !progress[knowledgeId]
  saveProgress(progress)
  return progress[knowledgeId]
}

export function getReviewedKnowledge() {
  const progress = getProgress()
  return knowledgeData.filter(k => progress[k.id])
}

export function getReviewedCount() {
  return getReviewedKnowledge().length
}

export function getTotalKnowledgeCount() {
  return knowledgeData.length
}

export function getKnowledgeProgress(knowledgeId) {
  const progress = getProgress()
  return progress[knowledgeId] || false
}

// 复习提醒相关
const REMINDER_KEY = 'arch-prep-reminder'

export function getReminderSettings() {
  try {
    const data = localStorage.getItem(REMINDER_KEY)
    return data ? JSON.parse(data) : { enabled: true, time: '09:00', interval: 1 }
  } catch {
    return { enabled: true, time: '09:00', interval: 1 }
  }
}

export function saveReminderSettings(settings) {
  localStorage.setItem(REMINDER_KEY, JSON.stringify(settings))
}

// 获取需要复习的知识点（已学习但需要复习的）
export function getReviewCandidates() {
  const progress = getProgress()
  const reviewed = Object.entries(progress).filter(([_, v]) => v).map(([k]) => parseInt(k))
  
  // 找出已学习但需要复习的
  const candidates = knowledgeData.filter(k => reviewed.includes(k.id))
  
  // 乱序
  return candidates.sort(() => Math.random() - 0.5)
}
