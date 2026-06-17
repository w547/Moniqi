import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePhoneStore = defineStore('phone', () => {
  const activeApp = ref(null)
  const notifications = ref([])
  const messages = ref([])
  const calls = ref([])
  const isLocked = ref(false)

  function openApp(appName) {
    activeApp.value = appName
  }

  function closeApp() {
    activeApp.value = null
  }

  function addNotification(notif) {
    notifications.value.unshift({
      id: Date.now(),
      ...notif,
      read: false,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    })
  }

  function addMessage(msg) {
    messages.value.unshift({
      id: Date.now(),
      ...msg,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    })
  }

  function addCall(call) {
    calls.value.unshift({
      id: Date.now(),
      ...call,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    })
  }

  function markAllRead() {
    notifications.value.forEach(n => n.read = true)
  }

  function exportState() {
    return {
      notifications: notifications.value,
      messages: messages.value,
      calls: calls.value
    }
  }

  function importState(data) {
    notifications.value = data.notifications || []
    messages.value = data.messages || []
    calls.value = data.calls || []
  }

  return {
    activeApp, notifications, messages, calls, isLocked,
    openApp, closeApp, addNotification, addMessage, addCall,
    markAllRead,
    exportState, importState
  }
})
