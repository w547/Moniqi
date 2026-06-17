<template>
  <div class="app-container">
    <div class="top-bar">
      <span class="top-title">微信</span>
      <div class="top-actions">
        <button class="top-icon-btn" title="搜索">🔍</button>
        <button class="top-icon-btn" title="添加">＋</button>
      </div>
    </div>

    <div class="app-content">
      <div class="chat-list">
        <div
          v-for="(chat, i) in chatList"
          :key="i"
          class="chat-item"
          :class="{ pinned: chat.group === '💕' }"
          @click="selectedChat = chat"
        >
          <div class="chat-avatar" :class="{ special: chat.group === '💕' }">
            <span class="avatar-placeholder">{{ chat.name.charAt(0) }}</span>
          </div>
          <div class="chat-info">
            <div class="chat-name">{{ chat.name }}</div>
            <div class="chat-preview">{{ chat.lastMsg }}</div>
          </div>
          <div class="chat-meta">
            <div class="chat-time">{{ chat.time }}</div>
            <div v-if="chat.group === '💕'" class="unread-dot"></div>
            <div v-else-if="i === 0" class="unread-badge">1</div>
          </div>
        </div>
      </div>

      <div v-if="selectedChat" class="chat-detail">
        <div class="chat-detail-header">
          <button class="nav-back-btn" @click="selectedChat = null">
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
              <path d="M10 2L2 10L10 18" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <span class="chat-detail-name">{{ selectedChat.name }}</span>
          <button class="nav-more-btn">⋯</button>
        </div>

        <div class="chat-messages">
          <div class="msg-time-label">昨天 20:35</div>

          <div class="msg received">
            <div class="msg-avatar">{{ selectedChat.name.charAt(0) }}</div>
            <div class="msg-body">
              <div class="msg-bubble">
                {{ selectedChat.lastMsg }}
                <span class="bubble-tail-left"></span>
              </div>
            </div>
          </div>

          <div v-if="showReply" class="msg sent">
            <div class="msg-body">
              <div class="msg-bubble">
                {{ replyText }}
                <span class="bubble-tail-right"></span>
              </div>
            </div>
            <div class="msg-avatar sent-avatar">我</div>
          </div>
        </div>

        <div class="chat-input-bar">
          <button class="input-icon-btn" title="语音">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="1" width="6" height="11" rx="3" stroke="#666" stroke-width="1.5" fill="none"/>
              <path d="M5 11a7 7 0 0 0 14 0" stroke="#666" stroke-width="1.5" stroke-linecap="round" fill="none"/>
              <line x1="12" y1="19" x2="12" y2="23" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="8" y1="23" x2="16" y2="23" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <div class="input-wrapper">
            <input
              v-model="replyText"
              placeholder=""
              @keyup.enter="sendReply"
            />
          </div>
          <button class="input-icon-btn" title="表情">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#666" stroke-width="1.5" fill="none"/>
              <circle cx="8.5" cy="9.5" r="1" fill="#666"/>
              <circle cx="15.5" cy="9.5" r="1" fill="#666"/>
              <path d="M8 14.5c1.5 2 6.5 2 8 0" stroke="#666" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            </svg>
          </button>
          <button class="input-icon-btn" title="更多">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#666" stroke-width="1.5" fill="none"/>
              <line x1="12" y1="7.5" x2="12" y2="16.5" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="7.5" y1="12" x2="16.5" y2="12" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePhoneStore } from '@/stores/phoneStore.js'
import { useBoyfriendStore } from '@/stores/boyfriendStore.js'
import { generateWechatMessages } from '@/engine/PhoneSystem.js'

const phoneStore = usePhoneStore()
const boyfriendStore = useBoyfriendStore()
const selectedChat = ref(null)
const replyText = ref('')
const showReply = ref(false)

const chatList = computed(() => generateWechatMessages(boyfriendStore.name))

function sendReply() {
  if (replyText.value.trim()) {
    showReply.value = true
  }
}

function close() {
  phoneStore.closeApp()
}
</script>

<style scoped>
.app-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 200;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", "Microsoft YaHei", sans-serif;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  padding-top: 48px;
  padding-bottom: 10px;
  background: #1a1a1a;
  color: #fff;
}

.top-title {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.top-actions {
  display: flex;
  gap: 8px;
}

.top-icon-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  padding: 0;
  line-height: 1;
}

.app-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.chat-list {
  height: 100%;
  overflow-y: auto;
  background: #fff;
  -webkit-overflow-scrolling: touch;
}

.chat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #fff;
  cursor: pointer;
  transition: background 0.15s;
  position: relative;
}

.chat-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 76px;
  right: 0;
  height: 0.5px;
  background: #e5e5e5;
}

.chat-item:active {
  background: #ededed;
}

.chat-item.pinned {
  background: #f5f5f5;
}

.chat-avatar {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  background: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.chat-avatar.special {
  background: linear-gradient(135deg, #ff6b81, #ff9a9e);
}

.avatar-placeholder {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
}

.chat-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.chat-name {
  font-size: 16px;
  font-weight: 400;
  color: #181818;
  line-height: 1.3;
}

.chat-preview {
  font-size: 13px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.3;
}

.chat-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
}

.chat-time {
  font-size: 12px;
  color: #b0b0b0;
  white-space: nowrap;
}

.unread-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f43530;
}

.unread-badge {
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  background: #f43530;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  line-height: 1;
}

.chat-detail {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ededed;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(0, 0, 0, 0.015) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(0, 0, 0, 0.01) 0%, transparent 50%);
  display: flex;
  flex-direction: column;
  z-index: 210;
}

.chat-detail-header {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 12px;
  padding-top: 48px;
  padding-bottom: 10px;
  background: #1a1a1a;
  color: #fff;
}

.nav-back-btn {
  background: none;
  border: none;
  padding: 8px 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-detail-name {
  flex: 1;
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  margin-right: 36px;
}

.nav-more-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  padding: 8px 6px;
  cursor: pointer;
  line-height: 1;
}

.chat-messages {
  flex: 1;
  padding: 12px 14px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.msg-time-label {
  text-align: center;
  font-size: 12px;
  color: #b0b0b0;
  margin-bottom: 16px;
  margin-top: 4px;
}

.msg {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 8px;
}

.msg.received {
  justify-content: flex-start;
}

.msg.sent {
  justify-content: flex-end;
}

.msg-avatar {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  flex-shrink: 0;
}

.sent-avatar {
  background: #07c160;
}

.msg-body {
  max-width: 70%;
  position: relative;
}

.msg-bubble {
  padding: 10px 13px;
  font-size: 15px;
  line-height: 1.45;
  word-break: break-word;
  position: relative;
}

.msg.received .msg-bubble {
  background: #fff;
  border-radius: 4px 16px 16px 16px;
  color: #181818;
}

.msg.sent .msg-bubble {
  background: #95ec69;
  border-radius: 16px 4px 16px 16px;
  color: #181818;
}

.bubble-tail-left {
  position: absolute;
  top: 0;
  left: -6px;
  width: 0;
  height: 0;
  border-top: 6px solid #fff;
  border-left: 6px solid transparent;
}

.bubble-tail-right {
  position: absolute;
  top: 0;
  right: -6px;
  width: 0;
  height: 0;
  border-top: 6px solid #95ec69;
  border-right: 6px solid transparent;
}

.chat-input-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  padding-bottom: 28px;
  background: #f7f7f7;
  border-top: 0.5px solid #d9d9d9;
}

.input-icon-btn {
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.input-wrapper {
  flex: 1;
}

.input-wrapper input {
  width: 100%;
  padding: 9px 12px;
  border: 0.5px solid #e0e0e0;
  border-radius: 6px;
  background: #fff;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
}

.input-wrapper input:focus {
  border-color: #07c160;
}
</style>
