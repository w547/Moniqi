<template>
  <div class="app-container">
    <div class="status-bar">
      <span class="status-time">9:41</span>
      <span class="status-icons">
        <span class="signal-icon"></span>
        <span class="wifi-icon"></span>
        <span class="battery-icon"></span>
      </span>
    </div>

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
      <div class="msg-item" v-for="(m, i) in messages" :key="i">
        <div class="msg-avatar" :class="'avatar-' + ((i % 5) + 1)">
          <span class="avatar-text">{{ m.from.charAt(0) }}</span>
        </div>
        <div class="msg-body">
          <div class="msg-top">
            <span class="msg-sender">{{ m.from }}</span>
            <span class="msg-time">{{ m.time }}</span>
          </div>
          <div class="msg-preview">{{ m.preview }}</div>
        </div>
        <div class="msg-chevron"></div>
      </div>

      <div v-if="messages.length === 0" class="empty">
        <span class="empty-icon"></span>
        <span class="empty-text">暂无信息</span>
      </div>
    </div>

    <div class="bottom-bar">
      <div class="bb-tab active">
        <span class="bb-icon bb-star"></span>
      </div>
      <div class="bb-tab">
        <span class="bb-icon bb-recent"></span>
      </div>
      <div class="bb-tab">
        <span class="bb-icon bb-contacts"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePhoneStore } from '@/stores/phoneStore.js'

const phoneStore = usePhoneStore()
const messages = computed(() => phoneStore.messages)

function close() { phoneStore.closeApp() }
</script>

<style scoped>
.app-container {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: #fff; z-index: 200; display: flex; flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.status-bar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 20px 4px; background: #f9f9f9; color: #1a1a1a;
  font-size: 11px; font-weight: 600;
}
.status-icons { display: flex; align-items: center; gap: 5px; }
.signal-icon {
  display: block; width: 14px; height: 10px;
  background: repeating-linear-gradient(to right, #1a1a1a 0px, #1a1a1a 2px, transparent 2px, transparent 3px);
  background-size: 14px 100%;
}
.wifi-icon {
  width: 12px; height: 10px;
  border: 1.5px solid #1a1a1a; border-radius: 50%;
  position: relative;
}
.wifi-icon::after {
  content: ''; position: absolute; top: -4px; left: 50%; transform: translateX(-50%);
  width: 4px; height: 4px; background: #1a1a1a; border-radius: 50%;
}
.battery-icon {
  width: 20px; height: 10px; border: 1.5px solid #1a1a1a; border-radius: 2px;
  position: relative; margin-left: 2px;
}
.battery-icon::before {
  content: ''; position: absolute; right: -3px; top: 50%; transform: translateY(-50%);
  width: 2px; height: 4px; background: #1a1a1a; border-radius: 0 1px 1px 0;
}
.battery-icon::after {
  content: ''; position: absolute; left: 1px; top: 1px; bottom: 1px;
  width: 12px; background: #1a1a1a; border-radius: 1px;
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

.msg-avatar {
  width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.avatar-1 { background: #5ac8fa; }
.avatar-2 { background: #ff9500; }
.avatar-3 { background: #ff3b30; }
.avatar-4 { background: #34c759; }
.avatar-5 { background: #007aff; }

.avatar-text {
  font-size: 18px; font-weight: 600; color: #fff;
}

.msg-body { flex: 1; min-width: 0; }
.msg-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
.msg-sender { font-size: 15px; font-weight: 500; color: #1a1a1a; }
.msg-time { font-size: 12px; color: #8e8e93; flex-shrink: 0; margin-left: 8px; }
.msg-preview {
  font-size: 13px; color: #8e8e93;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
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

.bottom-bar {
  display: flex; background: #f9f9f9; border-top: 0.5px solid #e0e0e0;
  padding: 6px 0; padding-bottom: env(safe-area-inset-bottom, 6px);
}
.bb-tab { flex: 1; display: flex; align-items: center; justify-content: center; padding: 6px 0; }
.bb-icon { display: block; width: 22px; height: 22px; position: relative; }

.bb-star {
  border: 2px solid #34c759; border-radius: 3px;
  position: relative;
}
.bb-star::after {
  content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 8px; height: 8px; background: #34c759; border-radius: 1px;
}

.bb-recent {
  border: 2px solid #8e8e93; border-radius: 50%;
  position: relative;
}
.bb-recent::before {
  content: ''; position: absolute; top: 2px; left: 50%; transform: translateX(-50%);
  width: 6px; height: 6px; border: 1.5px solid #8e8e93; border-radius: 50%;
}
.bb-recent::after {
  content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 10px; height: 6px; border: 1.5px solid #8e8e93; border-radius: 0 0 8px 8px;
  border-top: none;
}

.bb-contacts {
  border: 2px solid #8e8e93; border-radius: 50%;
  position: relative;
}
.bb-contacts::before {
  content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 6px; height: 6px; background: #8e8e93; border-radius: 50%;
}
.bb-contacts::after {
  content: ''; position: absolute; bottom: -2px; left: 50%; transform: translateX(-50%);
  width: 12px; height: 6px; border: 1.5px solid #8e8e93; border-radius: 0 0 8px 8px;
  border-top: none;
}
</style>
