<template>
  <div class="notification-banner" v-if="latestNotif" @click="dismiss">
    <div class="notif-app-icon">
      <span class="notif-app-emoji">{{ appIcon }}</span>
    </div>
    <div class="notif-content">
      <div class="notif-header">
        <span class="notif-app-name">{{ latestNotif.app }}</span>
        <span class="notif-time">{{ latestNotif.time }}</span>
      </div>
      <div class="notif-title">{{ latestNotif.title }}</div>
      <div class="notif-body">{{ latestNotif.content }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePhoneStore } from '@/stores/phoneStore.js'

const phoneStore = usePhoneStore()

const latestNotif = computed(() => {
  const unread = phoneStore.notifications.filter(n => !n.read)
  return unread.length > 0 ? unread[0] : null
})

const appIcon = computed(() => {
  const app = latestNotif.value?.app || ''
  const icons = {
    '微信': '💬',
    '短信': '📩',
    '微博': '📢',
    '电话': '📞',
    '系统': '⚙️',
  }
  return icons[app] || '🔔'
})

function dismiss() {
  if (latestNotif.value) {
    latestNotif.value.read = true
  }
}
</script>

<style scoped>
.notification-banner {
  margin: 10px 16px;
  padding: 14px 16px;
  background: rgba(28, 28, 40, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  animation: notifSlideDown 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
  transition: all 0.2s ease;
}

.notification-banner:active {
  transform: scale(0.98);
  background: rgba(28, 28, 40, 0.9);
}

@keyframes notifSlideDown {
  from {
    transform: translateY(-24px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.notif-app-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notif-app-emoji {
  font-size: 20px;
  line-height: 1;
}

.notif-content {
  flex: 1;
  min-width: 0;
}

.notif-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.notif-app-name {
  font-size: 12px;
  font-weight: 600;
  color: rgba(200, 200, 215, 0.7);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.notif-time {
  font-size: 11px;
  color: rgba(180, 180, 195, 0.45);
  white-space: nowrap;
  flex-shrink: 0;
}

.notif-title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(240, 240, 245, 0.95);
  margin-bottom: 3px;
  letter-spacing: 0.02em;
  line-height: 1.3;
}

.notif-body {
  font-size: 13px;
  color: rgba(180, 180, 195, 0.7);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 0.02em;
}
</style>
