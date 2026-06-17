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
      <div class="header-avatar" @click="close">
        <span class="avatar-inner"></span>
      </div>
      <div class="header-search">
        <span class="search-icon"></span>
        <span class="search-placeholder">搜索</span>
      </div>
      <div class="header-plus">
        <span class="plus-icon"></span>
      </div>
    </div>

    <div class="app-content">
      <div class="chat-item" v-for="(c, i) in contacts" :key="i">
        <div class="avatar" :class="'avatar-' + ((i % 4) + 1)">
          <span class="online-dot" v-if="i !== 1"></span>
        </div>
        <div class="info">
          <div class="top-row">
            <span class="name">{{ c.name }}</span>
            <span class="time">{{ c.time }}</span>
          </div>
          <div class="preview">{{ c.lastMsg }}</div>
        </div>
      </div>
    </div>

    <div class="bottom-tabs">
      <div class="tab active">
        <span class="tab-icon tab-msg"></span>
        <span class="tab-label">消息</span>
        <span class="tab-badge">2</span>
      </div>
      <div class="tab">
        <span class="tab-icon tab-contacts"></span>
        <span class="tab-label">联系人</span>
      </div>
      <div class="tab">
        <span class="tab-icon tab-discover"></span>
        <span class="tab-label">动态</span>
        <span class="tab-dot"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePhoneStore } from '@/stores/phoneStore.js'

const phoneStore = usePhoneStore()

const contacts = ref([
  { name: '家族群', lastMsg: '妈妈：周末回来吃饭', time: '昨天' },
  { name: '高中同学群', lastMsg: '老王：好久不见啊', time: '3天前' },
  { name: '站姐群', lastMsg: '今天的图修好了！', time: '1小时前' },
  { name: '大学室友群', lastMsg: '下个月聚会？', time: '周一' }
])

function close() { phoneStore.closeApp() }
</script>

<style scoped>
.app-container {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: #f6f6f6; z-index: 200; display: flex; flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.status-bar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 20px 4px; background: #12b7f5; color: #fff;
  font-size: 11px; font-weight: 600;
}
.status-icons { display: flex; align-items: center; gap: 5px; }
.signal-icon {
  display: block; width: 14px; height: 10px;
  background: repeating-linear-gradient(to right, #fff 0px, #fff 2px, transparent 2px, transparent 3px);
  background-size: 14px 100%;
}
.wifi-icon {
  width: 12px; height: 10px;
  border: 1.5px solid #fff; border-radius: 50%;
  position: relative;
}
.wifi-icon::after {
  content: ''; position: absolute; top: -4px; left: 50%; transform: translateX(-50%);
  width: 4px; height: 4px; background: #fff; border-radius: 50%;
}
.battery-icon {
  width: 20px; height: 10px; border: 1.5px solid #fff; border-radius: 2px;
  position: relative; margin-left: 2px;
}
.battery-icon::before {
  content: ''; position: absolute; right: -3px; top: 50%; transform: translateY(-50%);
  width: 2px; height: 4px; background: #fff; border-radius: 0 1px 1px 0;
}
.battery-icon::after {
  content: ''; position: absolute; left: 1px; top: 1px; bottom: 1px;
  width: 12px; background: #fff; border-radius: 1px;
}

.app-header {
  display: flex; align-items: center; gap: 10px;
  padding: 6px 14px 10px; background: #12b7f5;
}
.header-avatar {
  width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,0.25);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0; cursor: pointer;
}
.avatar-inner {
  width: 16px; height: 16px; border-radius: 50%; background: #fff;
  position: relative; top: -4px;
}
.avatar-inner::after {
  content: ''; position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%);
  width: 22px; height: 12px; background: #fff; border-radius: 0 0 11px 11px;
}
.header-search {
  flex: 1; display: flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.2); border-radius: 6px; padding: 7px 10px;
  color: rgba(255,255,255,0.7); font-size: 13px;
}
.search-icon {
  width: 12px; height: 12px; border: 1.5px solid rgba(255,255,255,0.7); border-radius: 50%;
  position: relative; flex-shrink: 0;
}
.search-icon::after {
  content: ''; position: absolute; bottom: -3px; right: -3px;
  width: 5px; height: 1.5px; background: rgba(255,255,255,0.7);
  border-radius: 1px; transform: rotate(45deg);
}
.search-placeholder { font-size: 12px; }
.header-plus {
  width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.plus-icon {
  position: relative; width: 16px; height: 16px;
}
.plus-icon::before, .plus-icon::after {
  content: ''; position: absolute; background: #fff; border-radius: 1px;
}
.plus-icon::before { width: 100%; height: 2px; top: 50%; transform: translateY(-50%); }
.plus-icon::after { width: 2px; height: 100%; left: 50%; transform: translateX(-50%); }

.app-content { flex: 1; overflow-y: auto; background: #fff; }

.chat-item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px; cursor: pointer;
  border-bottom: 0.5px solid #f0f0f0;
  transition: background 0.15s;
}
.chat-item:active { background: #f5f5f5; }

.avatar {
  width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0;
  position: relative;
}
.avatar-1 { background: linear-gradient(135deg, #ff9a9e, #fad0c4); }
.avatar-2 { background: linear-gradient(135deg, #a18cd1, #fbc2eb); }
.avatar-3 { background: linear-gradient(135deg, #fbc2eb, #a6c1ee); }
.avatar-4 { background: linear-gradient(135deg, #84fab0, #8fd3f4); }

.online-dot {
  position: absolute; bottom: 1px; right: 1px;
  width: 11px; height: 11px; background: #5cdb5c; border-radius: 50%;
  border: 2px solid #fff;
}

.info { flex: 1; min-width: 0; }
.top-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
.name { font-size: 15px; font-weight: 500; color: #1a1a1a; }
.time { font-size: 11px; color: #b0b0b0; flex-shrink: 0; margin-left: 8px; }
.preview { font-size: 13px; color: #999; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.bottom-tabs {
  display: flex; background: #fafafa; border-top: 0.5px solid #e5e5e5;
  padding: 4px 0; padding-bottom: env(safe-area-inset-bottom, 4px);
}
.tab {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px;
  padding: 4px 0; cursor: pointer; position: relative; color: #999;
}
.tab.active { color: #12b7f5; }
.tab-icon { display: block; width: 22px; height: 22px; position: relative; }

.tab-msg {
  border: 2px solid currentColor; border-radius: 5px;
  position: relative;
}
.tab-msg::after {
  content: ''; position: absolute; bottom: -2px; left: 50%; transform: translateX(-50%) rotate(45deg);
  width: 6px; height: 6px; border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor; background: #fafafa;
}

.tab-contacts {
  border: 2px solid currentColor; border-radius: 50%;
  position: relative;
}
.tab-contacts::before {
  content: ''; position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%);
  width: 10px; height: 6px; border: 2px solid currentColor; border-radius: 0 0 8px 8px;
  border-top: none; background: #fafafa;
}

.tab-discover {
  border: 2px solid currentColor; border-radius: 50%;
  position: relative;
}
.tab-discover::before {
  content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 4px; height: 4px; background: currentColor; border-radius: 50%;
}
.tab-discover::after {
  content: ''; position: absolute; top: -2px; right: -2px;
  width: 6px; height: 6px; background: currentColor; border-radius: 50%;
}

.tab-label { font-size: 10px; font-weight: 500; }

.tab-badge {
  position: absolute; top: 0; right: calc(50% - 16px);
  min-width: 16px; height: 16px; background: #ff3b30; color: #fff;
  font-size: 10px; font-weight: 600; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; padding: 0 4px;
}
.tab-dot {
  position: absolute; top: 2px; right: calc(50% - 14px);
  width: 7px; height: 7px; background: #ff3b30; border-radius: 50%;
}
</style>
