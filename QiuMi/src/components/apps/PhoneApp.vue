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
        <span class="header-title">最近通话</span>
      </div>
      <div class="header-right">
        <span class="add-icon"></span>
      </div>
    </div>

    <div class="segmented-control">
      <div class="segment active">
        <span>全部</span>
      </div>
      <div class="segment">
        <span>未接</span>
        <span class="segment-badge" v-if="missedCount > 0">{{ missedCount }}</span>
      </div>
    </div>

    <div class="app-content">
      <div class="call-item" v-for="(c, i) in calls" :key="i">
        <div class="call-avatar" :class="'avatar-' + ((i % 5) + 1)">
          <span class="avatar-text">{{ c.from.charAt(0) }}</span>
        </div>
        <div class="call-body">
          <div class="call-name">{{ c.from }}</div>
          <div class="call-meta">
            <span class="call-type-label" :class="c.type">{{ callTypeLabel(c.type) }}</span>
            <span class="call-location" v-if="c.type !== 'missed'">移动</span>
          </div>
        </div>
        <div class="call-right">
          <span class="call-time">{{ c.time }}</span>
          <span class="info-btn"></span>
        </div>
      </div>

      <div v-if="calls.length === 0" class="empty">
        <span class="empty-icon"></span>
        <span class="empty-text">暂无通话记录</span>
      </div>
    </div>

    <div class="bottom-tabs">
      <div class="tab">
        <span class="tab-icon tab-fav"></span>
        <span class="tab-label">个人收藏</span>
      </div>
      <div class="tab active">
        <span class="tab-icon tab-recent"></span>
        <span class="tab-label">最近通话</span>
      </div>
      <div class="tab">
        <span class="tab-icon tab-contacts"></span>
        <span class="tab-label">通讯录</span>
      </div>
      <div class="tab">
        <span class="tab-icon tab-keypad"></span>
        <span class="tab-label">拨号键盘</span>
      </div>
      <div class="tab">
        <span class="tab-icon tab-voicemail"></span>
        <span class="tab-label">语音留言</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePhoneStore } from '@/stores/phoneStore.js'

const phoneStore = usePhoneStore()
const calls = computed(() => phoneStore.calls)

const missedCount = computed(() => calls.value.filter(c => c.type === 'missed').length)

function callTypeLabel(type) {
  if (type === 'missed') return '未接来电'
  if (type === 'outgoing') return '拨出电话'
  return '来电'
}

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
  border-left: 2px solid #007aff; border-bottom: 2px solid #007aff;
  transform: rotate(45deg);
}
.header-center { flex: 1; text-align: center; }
.header-title { font-size: 17px; font-weight: 700; color: #1a1a1a; }
.header-right { padding: 4px; }
.add-icon {
  display: block; width: 18px; height: 18px; position: relative;
}
.add-icon::before, .add-icon::after {
  content: ''; position: absolute; background: #007aff; border-radius: 1px;
}
.add-icon::before { width: 100%; height: 2px; top: 50%; transform: translateY(-50%); }
.add-icon::after { width: 2px; height: 100%; left: 50%; transform: translateX(-50%); }

.segmented-control {
  display: flex; margin: 10px 14px; background: #e9e9eb; border-radius: 8px;
  padding: 2px; gap: 2px;
}
.segment {
  flex: 1; text-align: center; padding: 6px 0; border-radius: 7px;
  font-size: 13px; color: #1a1a1a; cursor: pointer; position: relative;
  transition: background 0.2s;
}
.segment.active { background: #fff; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
.segment-badge {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 16px; height: 16px; background: #ff3b30; color: #fff;
  font-size: 10px; font-weight: 600; border-radius: 8px;
  margin-left: 4px; padding: 0 4px; vertical-align: middle;
}

.app-content { flex: 1; overflow-y: auto; }

.call-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 16px; cursor: pointer;
  border-bottom: 0.5px solid #f0f0f0;
  transition: background 0.15s;
}
.call-item:active { background: #f5f5f5; }

.call-avatar {
  width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.avatar-1 { background: #5ac8fa; }
.avatar-2 { background: #ff9500; }
.avatar-3 { background: #ff3b30; }
.avatar-4 { background: #34c759; }
.avatar-5 { background: #007aff; }

.avatar-text {
  font-size: 16px; font-weight: 600; color: #fff;
}

.call-body { flex: 1; min-width: 0; }
.call-name { font-size: 15px; font-weight: 500; color: #1a1a1a; margin-bottom: 2px; }
.call-meta { display: flex; align-items: center; gap: 6px; }
.call-type-label { font-size: 12px; }
.call-type-label.missed { color: #ff3b30; }
.call-type-label.outgoing { color: #8e8e93; }
.call-type-label.incoming { color: #8e8e93; }
.call-location { font-size: 12px; color: #8e8e93; }

.call-right {
  display: flex; align-items: center; gap: 10px; flex-shrink: 0;
}
.call-time { font-size: 12px; color: #8e8e93; }

.info-btn {
  width: 22px; height: 22px; border: 1.5px solid #c7c7cc; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; position: relative;
}
.info-btn::after {
  content: 'i'; font-size: 13px; font-weight: 600; color: #c7c7cc;
  font-style: italic; font-family: 'Times New Roman', serif;
}

.empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 60px 20px; gap: 12px;
}
.empty-icon {
  width: 48px; height: 48px; border: 2px solid #c7c7cc; border-radius: 50%;
  position: relative;
}
.empty-icon::before {
  content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg);
  width: 18px; height: 12px; border: 2px solid #c7c7cc; border-radius: 3px;
  border-bottom: none; border-right: none;
}
.empty-text { font-size: 15px; color: #8e8e93; }

.bottom-tabs {
  display: flex; background: #f9f9f9; border-top: 0.5px solid #e0e0e0;
  padding: 4px 0; padding-bottom: env(safe-area-inset-bottom, 4px);
}
.tab {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px;
  padding: 4px 0; cursor: pointer; color: #8e8e93;
}
.tab.active { color: #007aff; }
.tab-icon { display: block; width: 22px; height: 22px; position: relative; }

.tab-fav {
  border: 2px solid currentColor; border-radius: 2px;
}
.tab-fav::after {
  content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 8px; height: 8px; background: currentColor; border-radius: 1px;
}

.tab-recent {
  border: 2px solid currentColor; border-radius: 50%;
  position: relative;
}
.tab-recent::before {
  content: ''; position: absolute; top: 3px; left: 50%; transform: translateX(-50%);
  width: 4px; height: 4px; background: currentColor; border-radius: 50%;
}
.tab-recent::after {
  content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 10px; height: 6px; border: 2px solid currentColor; border-radius: 0 0 8px 8px;
  border-top: none;
}

.tab-contacts {
  border: 2px solid currentColor; border-radius: 50%;
  position: relative;
}
.tab-contacts::before {
  content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 6px; height: 6px; background: currentColor; border-radius: 50%;
}
.tab-contacts::after {
  content: ''; position: absolute; bottom: -2px; left: 50%; transform: translateX(-50%);
  width: 12px; height: 6px; border: 2px solid currentColor; border-radius: 0 0 8px 8px;
  border-top: none;
}

.tab-keypad {
  position: relative;
}
.tab-keypad::before {
  content: ''; position: absolute; top: 1px; left: 2px;
  width: 4px; height: 4px; background: currentColor; border-radius: 50%;
  box-shadow: 7px 0 0 currentColor, 14px 0 0 currentColor,
              0 7px 0 currentColor, 7px 7px 0 currentColor, 14px 7px 0 currentColor,
              0 14px 0 currentColor, 7px 14px 0 currentColor, 14px 14px 0 currentColor;
}

.tab-voicemail {
  position: relative;
}
.tab-voicemail::before {
  content: ''; position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%);
  width: 14px; height: 8px; border: 2px solid currentColor; border-radius: 2px;
}
.tab-voicemail::after {
  content: ''; position: absolute; top: 2px; left: 50%; transform: translateX(-50%);
  width: 4px; height: 6px; border: 2px solid currentColor; border-radius: 1px;
  border-bottom: none;
}

.tab-label { font-size: 9px; font-weight: 500; white-space: nowrap; }
</style>
