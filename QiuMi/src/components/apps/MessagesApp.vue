<template>
  <div class="app-container">
    <!-- 短信列表 -->
    <div v-if="!selectedMsg" class="list-view">
      <div class="app-header">
        <div class="header-left" @click="close">
          <span class="back-arrow"></span>
        </div>
        <div class="header-center">
          <span class="header-title">信息</span>
        </div>
        <div class="header-right">
          <span class="compose-icon"></span>
        </div>
      </div>

      <div class="search-bar">
        <span class="search-icon"></span>
        <span class="search-text">搜索</span>
      </div>

      <div class="app-content">
        <div
          class="msg-item"
          :class="{ 'msg-sasaeng': m.isSasaeng }"
          v-for="(m, i) in messages"
          :key="i"
          @click="openMessage(m, i)"
        >
          <div class="msg-avatar" :class="[m.isSasaeng ? 'avatar-sasaeng' : 'avatar-' + ((i % 5) + 1)]">
            <span class="avatar-text">{{ m.from.charAt(0) }}</span>
          </div>
          <div class="msg-body">
            <div class="msg-top">
              <span class="msg-sender" :class="{ 'sasaeng-sender': m.isSasaeng }">{{ m.from }}</span>
              <span class="msg-time">{{ m.time || '刚刚' }}</span>
            </div>
            <div class="msg-preview" :class="{ 'sasaeng-preview': m.isSasaeng }">{{ m.preview }}</div>
          </div>
          <div v-if="m.unread" class="unread-dot"></div>
          <div class="msg-chevron"></div>
        </div>

        <div v-if="messages.length === 0" class="empty">
          <span class="empty-icon"></span>
          <span class="empty-text">暂无信息</span>
        </div>
      </div>
    </div>

    <!-- 短信详情 -->
    <div v-else class="detail-view">
      <div class="detail-header">
        <button class="detail-back" @click="goBack">←</button>
        <span class="detail-title">{{ selectedMsg.from }}</span>
        <div class="detail-spacer"></div>
      </div>

      <div class="detail-content">
        <div v-if="selectedMsg.isSasaeng" class="sasaeng-warning">
          <span class="warning-icon">⚠️</span>
          <span>此号码未在通讯录中</span>
        </div>

        <div class="detail-bubble-wrap">
          <div class="detail-bubble" :class="{ 'sasaeng-bubble': selectedMsg.isSasaeng }">
            {{ selectedMsg.content }}
          </div>
          <div class="detail-time">{{ selectedMsg.time || '刚刚' }}</div>
        </div>
      </div>

      <div class="detail-actions">
        <button class="action-btn" @click="replyMessage">回复</button>
        <button class="action-btn danger" @click="deleteMessage">删除</button>
        <button class="action-btn" @click="blockMessage">阻止此号码</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePhoneStore } from '@/stores/phoneStore.js'

const phoneStore = usePhoneStore()
const messages = computed(() => phoneStore.messages)
const selectedMsg = ref(null)
const selectedIndex = ref(-1)

function openMessage(m, i) {
  selectedMsg.value = { ...m }
  selectedIndex.value = i
}

function goBack() {
  selectedMsg.value = null
  selectedIndex.value = -1
}

function replyMessage() {
  phoneStore.addNotification({
    app: 'messages',
    title: '信息',
    content: '已发送回复',
    type: 'reply'
  })
  goBack()
}

function deleteMessage() {
  if (selectedIndex.value >= 0) {
    phoneStore.messages.splice(selectedIndex.value, 1)
  }
  goBack()
}

function blockMessage() {
  phoneStore.addNotification({
    app: 'messages',
    title: '信息',
    content: '已阻止此号码',
    type: 'block'
  })
  if (selectedIndex.value >= 0) {
    phoneStore.messages.splice(selectedIndex.value, 1)
  }
  goBack()
}

function close() { phoneStore.closeApp() }
</script>

<style scoped>
.app-container {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: #fff; z-index: 200; display: flex; flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

/* ===== 列表视图 ===== */
.list-view {
  display: flex; flex-direction: column; height: 100%;
}

.app-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 14px 10px; background: #f9f9f9;
  border-bottom: 0.5px solid #e0e0e0;
}
.header-left { cursor: pointer; padding: 4px; }
.back-arrow {
  display: block; width: 10px; height: 10px;
  border-left: 2px solid #34c759; border-bottom: 2px solid #34c759;
  transform: rotate(45deg);
}
.header-center { flex: 1; text-align: center; }
.header-title { font-size: 17px; font-weight: 700; color: #1a1a1a; }
.header-right { padding: 4px; }
.compose-icon {
  display: block; width: 20px; height: 20px; position: relative;
}
.compose-icon::before {
  content: ''; position: absolute; top: 2px; left: 2px;
  width: 14px; height: 12px; border: 2px solid #34c759; border-radius: 3px;
}
.compose-icon::after {
  content: ''; position: absolute; bottom: 2px; left: 8px;
  width: 8px; height: 8px; border-right: 2px solid #34c759;
  border-bottom: 2px solid #34c759; transform: rotate(45deg);
}

.search-bar {
  display: flex; align-items: center; gap: 6px;
  margin: 8px 14px; padding: 7px 12px;
  background: #f0f0f0; border-radius: 10px;
}
.search-icon {
  width: 12px; height: 12px; border: 1.5px solid #8e8e93; border-radius: 50%;
  position: relative; flex-shrink: 0;
}
.search-icon::after {
  content: ''; position: absolute; bottom: -3px; right: -3px;
  width: 5px; height: 1.5px; background: #8e8e93;
  border-radius: 1px; transform: rotate(45deg);
}
.search-text { font-size: 13px; color: #8e8e93; }

.app-content { flex: 1; overflow-y: auto; }

.msg-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 16px; cursor: pointer;
  border-bottom: 0.5px solid #f0f0f0;
  transition: background 0.15s;
}
.msg-item:active { background: #f5f5f5; }
.msg-item.msg-sasaeng { background: #fff5f5; }

.msg-avatar {
  width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.avatar-1 { background: #5ac8fa; }
.avatar-2 { background: #ff9500; }
.avatar-3 { background: #ff3b30; }
.avatar-4 { background: #34c759; }
.avatar-5 { background: #007aff; }
.avatar-sasaeng { background: #ff3b30; }

.avatar-text {
  font-size: 18px; font-weight: 600; color: #fff;
}

.msg-body { flex: 1; min-width: 0; }
.msg-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
.msg-sender { font-size: 15px; font-weight: 500; color: #1a1a1a; }
.sasaeng-sender { color: #ff3b30; font-weight: 600; }
.msg-time { font-size: 12px; color: #8e8e93; flex-shrink: 0; margin-left: 8px; }
.msg-preview {
  font-size: 13px; color: #8e8e93;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.sasaeng-preview { color: #ff3b30; }

.unread-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #007aff; flex-shrink: 0;
}

.msg-chevron {
  width: 6px; height: 6px; border-right: 1.5px solid #c7c7cc;
  border-top: 1.5px solid #c7c7cc; transform: rotate(45deg); flex-shrink: 0;
}

.empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 60px 20px; gap: 12px;
}
.empty-icon {
  width: 48px; height: 48px; border: 2px solid #c7c7cc; border-radius: 50%;
  position: relative;
}
.empty-icon::after {
  content: ''; position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%);
  width: 12px; height: 6px; border: 2px solid #c7c7cc; border-radius: 0 0 8px 8px;
  border-top: none;
}
.empty-text { font-size: 15px; color: #8e8e93; }

/* ===== 详情视图 ===== */
.detail-view {
  display: flex; flex-direction: column; height: 100%;
}

.detail-header {
  display: flex; align-items: center;
  padding: 8px 14px 10px;
  background: #f9f9f9;
  border-bottom: 0.5px solid #e0e0e0;
}

.detail-back {
  background: none; border: none;
  font-size: 18px; color: #34c759;
  cursor: pointer; padding: 4px 8px;
}

.detail-title {
  flex: 1; text-align: center;
  font-size: 17px; font-weight: 700; color: #1a1a1a;
}

.detail-spacer { width: 32px; }

.detail-content {
  flex: 1; overflow-y: auto;
  padding: 20px 16px;
  background: #f5f5f5;
}

.sasaeng-warning {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 14px; margin-bottom: 16px;
  background: #fff3f3; border-radius: 10px;
  font-size: 13px; color: #ff3b30;
  border: 1px solid #ffcdd2;
}

.warning-icon { font-size: 16px; }

.detail-bubble-wrap {
  display: flex; flex-direction: column;
  align-items: flex-start;
}

.detail-bubble {
  padding: 12px 16px; border-radius: 16px 16px 16px 4px;
  background: #fff; color: #1a1a1a;
  font-size: 15px; line-height: 1.5; max-width: 85%;
  word-break: break-word;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.sasaeng-bubble {
  background: #fff5f5;
  border: 1px solid #ffcdd2;
  color: #d32f2f;
}

.detail-time {
  font-size: 12px; color: #8e8e93;
  margin-top: 6px; margin-left: 4px;
}

.detail-actions {
  display: flex; gap: 8px;
  padding: 12px 16px;
  padding-bottom: 28px;
  background: #fff;
  border-top: 0.5px solid #e0e0e0;
}

.action-btn {
  flex: 1; padding: 10px 0;
  border: 1px solid #d0d0d0; border-radius: 8px;
  background: #fff; font-size: 13px; font-weight: 500;
  color: #1a1a1a; cursor: pointer;
  text-align: center;
  transition: background 0.15s;
}
.action-btn:active { background: #f0f0f0; }
.action-btn.danger { color: #ff3b30; border-color: #ffcdd2; }
.action-btn.danger:active { background: #fff5f5; }
</style>