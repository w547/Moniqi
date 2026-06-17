<template>
  <div class="app-container">
    <!-- 微信顶部导航栏 -->
    <div class="top-bar">
      <button class="top-back-btn" @click="close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 6L9 12L15 18" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <span class="top-title">微信</span>
      <div class="top-actions">
        <button class="top-icon-btn" title="搜索" @click="showSearch = !showSearch">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="10" cy="10" r="6" stroke="#fff" stroke-width="2" fill="none"/>
            <line x1="15" y1="15" x2="21" y2="21" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <button class="top-icon-btn" title="添加" @click="showAddMenu = !showAddMenu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <line x1="12" y1="5" x2="12" y2="19" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
            <line x1="5" y1="12" x2="19" y2="12" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 搜索栏 -->
    <div v-if="showSearch" class="search-bar-dropdown">
      <div class="search-input-wrap">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="search-icon-sm">
          <circle cx="10" cy="10" r="6" stroke="#999" stroke-width="2" fill="none"/>
          <line x1="15" y1="15" x2="21" y2="21" stroke="#999" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input v-model="searchText" placeholder="搜索" class="search-input" />
      </div>
    </div>

    <!-- 添加菜单 -->
    <div v-if="showAddMenu" class="add-menu-dropdown" @click.self="showAddMenu = false">
      <div class="add-menu-item" @click="showAddMenu = false; $emit('postMoment')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#07c160" stroke-width="1.5" fill="none"/>
          <path d="M12 8v8M8 12h8" stroke="#07c160" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span>发起群聊</span>
      </div>
      <div class="add-menu-item" @click="showAddMenu = false; $emit('addFriend')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="8" r="3" stroke="#07c160" stroke-width="1.5" fill="none"/>
          <path d="M2 21v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1" stroke="#07c160" stroke-width="1.5" fill="none"/>
          <line x1="17" y1="8" x2="23" y2="8" stroke="#07c160" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="20" y1="5" x2="20" y2="11" stroke="#07c160" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span>添加朋友</span>
      </div>
      <div class="add-menu-item" @click="showAddMenu = false; $emit('scan')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1" stroke="#07c160" stroke-width="1.5" fill="none"/>
          <rect x="14" y="3" width="7" height="7" rx="1" stroke="#07c160" stroke-width="1.5" fill="none"/>
          <rect x="3" y="14" width="7" height="7" rx="1" stroke="#07c160" stroke-width="1.5" fill="none"/>
          <rect x="14" y="14" width="7" height="7" rx="1" stroke="#07c160" stroke-width="1.5" fill="none"/>
        </svg>
        <span>扫一扫</span>
      </div>
    </div>

    <div class="app-content">
      <!-- 聊天列表 -->
      <div class="chat-list">
        <div
          v-for="(chat, i) in filteredChatList"
          :key="chat.name"
          class="chat-item"
          :class="{ pinned: chat.group === '💕' }"
          @click="openChat(chat)"
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

      <!-- 聊天详情 -->
      <div v-if="selectedChat" class="chat-detail">
        <div class="chat-detail-header">
          <button class="nav-back-btn" @click="goBack">
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
              <path d="M10 2L2 10L10 18" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <span class="chat-detail-name">{{ selectedChat.name }}</span>
          <button class="nav-more-btn" @click="showChatMenu = !showChatMenu">⋯</button>
        </div>

        <!-- 聊天菜单 -->
        <div v-if="showChatMenu" class="chat-menu-dropdown" @click.self="showChatMenu = false">
          <div class="chat-menu-item" @click="showChatMenu = false">
            <span>查看聊天记录</span>
          </div>
          <div class="chat-menu-item" @click="showChatMenu = false; shareToMoment()">
            <span>分享到朋友圈</span>
          </div>
          <div class="chat-menu-item" @click="showChatMenu = false">
            <span>置顶聊天</span>
          </div>
          <div class="chat-menu-item danger" @click="showChatMenu = false">
            <span>删除聊天</span>
          </div>
        </div>

        <div class="chat-messages" ref="msgContainer">
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

          <div v-for="(msg, idx) in chatMessages[selectedChat.name]" :key="idx" class="msg sent">
            <div class="msg-body">
              <div class="msg-bubble">
                {{ msg }}
                <span class="bubble-tail-right"></span>
              </div>
            </div>
            <div class="msg-avatar sent-avatar">我</div>
          </div>
        </div>

        <div class="chat-input-bar">
          <button class="input-icon-btn" title="语音">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="1" width="6" height="11" rx="3" stroke="#666" stroke-width="1.5" fill="none"/>
              <path d="M5 11a7 7 0 0 0 14 0" stroke="#666" stroke-width="1.5" stroke-linecap="round" fill="none"/>
              <line x1="12" y1="19" x2="12" y2="23" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="8" y1="23" x2="16" y2="23" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <div class="input-wrapper">
            <input
              v-model="currentReplyText"
              placeholder=""
              @keyup.enter="sendReply"
            />
          </div>
          <button class="input-icon-btn" title="表情">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#666" stroke-width="1.5" fill="none"/>
              <circle cx="8.5" cy="9.5" r="1" fill="#666"/>
              <circle cx="15.5" cy="9.5" r="1" fill="#666"/>
              <path d="M8 14.5c1.5 2 6.5 2 8 0" stroke="#666" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            </svg>
          </button>
          <button class="input-icon-btn" title="更多" @click="showMoreOptions = !showMoreOptions">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#666" stroke-width="1.5" fill="none"/>
              <line x1="12" y1="7.5" x2="12" y2="16.5" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="7.5" y1="12" x2="16.5" y2="12" stroke="#666" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- 更多选项面板 -->
        <div v-if="showMoreOptions" class="more-options-panel" @click.self="showMoreOptions = false">
          <div class="more-option" @click="shareToMoment(); showMoreOptions = false">
            <div class="more-option-icon share-moment-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#07c160" stroke-width="1.5" fill="none"/>
                <path d="M8 12l2.5 2.5L16 9" stroke="#07c160" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span>分享到朋友圈</span>
          </div>
          <div class="more-option" @click="showMoreOptions = false">
            <div class="more-option-icon photo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="#fa9d3b" stroke-width="1.5" fill="none"/>
                <circle cx="8.5" cy="10" r="1.5" fill="#fa9d3b"/>
                <path d="M3 15l5-5 3 3 4-4 6 6" stroke="#fa9d3b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span>照片</span>
          </div>
          <div class="more-option" @click="showMoreOptions = false">
            <div class="more-option-icon camera-icon-more">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="7" width="16" height="12" rx="2" stroke="#1485ee" stroke-width="1.5" fill="none"/>
                <circle cx="12" cy="13" r="3" stroke="#1485ee" stroke-width="1.5" fill="none"/>
                <circle cx="17" cy="10" r="0.5" fill="#1485ee"/>
              </svg>
            </div>
            <span>拍摄</span>
          </div>
          <div class="more-option" @click="showMoreOptions = false">
            <div class="more-option-icon location-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="10" r="3" stroke="#07c160" stroke-width="1.5" fill="none"/>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#07c160" stroke-width="1.5" fill="none"/>
              </svg>
            </div>
            <span>位置</span>
          </div>
        </div>

        <!-- 分享到朋友圈的提示 -->
        <div v-if="showShareToast" class="share-toast" @click="showShareToast = false">
          <div class="toast-icon">✅</div>
          <div class="toast-text">已分享到朋友圈</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive, nextTick } from 'vue'
import { usePhoneStore } from '@/stores/phoneStore.js'
import { useBoyfriendStore } from '@/stores/boyfriendStore.js'
import { usePlayerStore } from '@/stores/playerStore.js'
import { generateWechatMessages } from '@/engine/PhoneSystem.js'

const phoneStore = usePhoneStore()
const boyfriendStore = useBoyfriendStore()
const playerStore = usePlayerStore()
const selectedChat = ref(null)
const currentReplyText = ref('')
const showSearch = ref(false)
const showAddMenu = ref(false)
const showChatMenu = ref(false)
const showMoreOptions = ref(false)
const showShareToast = ref(false)
const searchText = ref('')
const msgContainer = ref(null)

// 每个聊天的消息独立存储，解决跨聊天污染问题
const chatMessages = reactive({})

const chatList = computed(() => generateWechatMessages(boyfriendStore.name, playerStore.identity))

const filteredChatList = computed(() => {
  if (!searchText.value.trim()) return chatList.value
  const kw = searchText.value.toLowerCase()
  return chatList.value.filter(c => c.name.toLowerCase().includes(kw))
})

// 切换聊天时重置状态
function openChat(chat) {
  selectedChat.value = chat
  currentReplyText.value = ''
  showChatMenu.value = false
  showSearch.value = false
  showAddMenu.value = false
  if (!chatMessages[chat.name]) {
    chatMessages[chat.name] = []
  }
}

function goBack() {
  selectedChat.value = null
  currentReplyText.value = ''
  showChatMenu.value = false
  showMoreOptions.value = false
}

function sendReply() {
  const text = currentReplyText.value.trim()
  if (text && selectedChat.value) {
    const name = selectedChat.value.name
    if (!chatMessages[name]) {
      chatMessages[name] = []
    }
    chatMessages[name].push(text)
    currentReplyText.value = '' // 修复Bug-1: 清空输入框
    showMoreOptions.value = false
    // 滚动到底部
    nextTick(() => {
      if (msgContainer.value) {
        msgContainer.value.scrollTop = msgContainer.value.scrollHeight
      }
    })
  }
}

function shareToMoment() {
  showShareToast.value = true
  phoneStore.addNotification({
    app: 'wechat',
    title: '朋友圈',
    content: '已分享到朋友圈',
    type: 'share'
  })
  setTimeout(() => {
    showShareToast.value = false
  }, 2000)
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

/* ===== 顶部导航栏 ===== */
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  padding-top: 48px;
  padding-bottom: 10px;
  background: #1a1a1a;
  color: #fff;
  position: relative;
  z-index: 5;
}

.top-title {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.5px;
  flex: 1;
  text-align: center;
}

.top-back-btn {
  background: none;
  border: none;
  color: #fff;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 6px;
  padding: 0;
  flex-shrink: 0;
  transition: background 0.15s;
}

.top-back-btn:active {
  background: rgba(255,255,255,0.15);
}

.top-actions {
  display: flex;
  gap: 4px;
}

.top-icon-btn {
  background: none;
  border: none;
  color: #fff;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 6px;
  padding: 0;
  transition: background 0.15s;
}

.top-icon-btn:active {
  background: rgba(255,255,255,0.15);
}

/* ===== 搜索栏 ===== */
.search-bar-dropdown {
  background: #fff;
  padding: 8px 16px;
  border-bottom: 0.5px solid #e5e5e5;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.search-input-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 8px 12px;
}

.search-icon-sm {
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  background: none;
  font-size: 14px;
  outline: none;
  color: #333;
  font-family: inherit;
}

/* ===== 添加菜单 ===== */
.add-menu-dropdown {
  position: absolute;
  top: 96px;
  right: 10px;
  background: #3c3c3c;
  border-radius: 8px;
  padding: 4px 0;
  z-index: 300;
  min-width: 140px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  animation: slideDown 0.15s ease;
}

.add-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  transition: background 0.15s;
}

.add-menu-item:active {
  background: rgba(255,255,255,0.1);
}

/* ===== 聊天菜单 ===== */
.chat-menu-dropdown {
  position: absolute;
  top: 96px;
  right: 10px;
  background: #3c3c3c;
  border-radius: 8px;
  padding: 4px 0;
  z-index: 300;
  min-width: 140px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  animation: slideDown 0.15s ease;
}

.chat-menu-item {
  padding: 10px 16px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  transition: background 0.15s;
}

.chat-menu-item:active {
  background: rgba(255,255,255,0.1);
}

.chat-menu-item.danger {
  color: #ff4d4f;
}

/* ===== 主内容区 ===== */
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
  background: linear-gradient(135deg, #07c160, #2dc100);
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

/* ===== 聊天详情 ===== */
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

/* ===== 输入栏 ===== */
.chat-input-bar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 8px;
  padding-bottom: 26px;
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
  border-radius: 4px;
  transition: background 0.15s;
}

.input-icon-btn:active {
  background: #e5e5e5;
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

/* ===== 更多选项 ===== */
.more-options-panel {
  position: absolute;
  bottom: 54px;
  left: 0;
  right: 0;
  background: #f7f7f7;
  border-top: 0.5px solid #d9d9d9;
  padding: 12px 16px;
  display: flex;
  gap: 20px;
  z-index: 220;
  animation: slideUp 0.2s ease;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.more-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 11px;
  color: #666;
  padding: 4px;
  transition: transform 0.15s;
}

.more-option:active {
  transform: scale(0.9);
}

.more-option-icon {
  width: 48px;
  height: 48px;
  background: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

/* ===== 分享Toast ===== */
.share-toast {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,0.78);
  color: #fff;
  padding: 14px 24px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 300;
  animation: toastIn 0.3s ease;
  font-size: 14px;
}

@keyframes toastIn {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

.toast-icon {
  font-size: 28px;
}

.toast-text {
  font-weight: 500;
}
</style>