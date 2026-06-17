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
        <span class="header-title">相册</span>
      </div>
      <div class="header-right">
        <span class="select-text">选择</span>
      </div>
    </div>

    <div class="segmented-control">
      <div class="segment active">
        <span>照片</span>
      </div>
      <div class="segment">
        <span>相簿</span>
      </div>
    </div>

    <div class="app-content">
      <div class="album-grid">
        <div class="album-item" v-for="i in 12" :key="i">
          <div class="photo" :class="'photo-' + i"></div>
        </div>
      </div>

      <div class="section-label">我的相簿</div>

      <div class="album-list">
        <div class="album-row" v-for="album in albums" :key="album.name">
          <div class="album-thumb">
            <div class="album-thumb-main" :class="'grad-' + album.gradient"></div>
            <div class="album-thumb-overlay"></div>
          </div>
          <div class="album-info">
            <span class="album-name">{{ album.name }}</span>
            <span class="album-count">{{ album.count }}</span>
          </div>
          <span class="chevron"></span>
        </div>
      </div>

      <div class="section-label">共享相簿</div>

      <div class="private-album">
        <div class="private-icon">
          <span class="lock-icon"></span>
        </div>
        <div class="private-info">
          <span class="private-text">私密相册</span>
          <span class="private-hint">需要密码才能查看</span>
        </div>
        <span class="chevron"></span>
      </div>
    </div>

    <div class="bottom-tabs">
      <div class="tab active">
        <span class="tab-icon tab-library"></span>
        <span class="tab-label">图库</span>
      </div>
      <div class="tab">
        <span class="tab-icon tab-for-you"></span>
        <span class="tab-label">为你推荐</span>
      </div>
      <div class="tab">
        <span class="tab-icon tab-albums"></span>
        <span class="tab-label">相簿</span>
      </div>
      <div class="tab">
        <span class="tab-icon tab-search"></span>
        <span class="tab-label">搜索</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePhoneStore } from '@/stores/phoneStore.js'
const phoneStore = usePhoneStore()
function close() { phoneStore.closeApp() }

const albums = [
  { name: '最近项目', count: '23', gradient: 1 },
  { name: '收藏', count: '12', gradient: 2 },
  { name: '自拍', count: '8', gradient: 3 },
  { name: '截图', count: '45', gradient: 4 },
  { name: '微信', count: '67', gradient: 5 },
]
</script>

<style scoped>
.app-container {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: #f2f2f7; z-index: 200; display: flex; flex-direction: column;
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
.select-text { font-size: 15px; color: #007aff; font-weight: 500; cursor: pointer; }

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

.app-content { flex: 1; overflow-y: auto; }

.album-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;
  margin: 0 0 20px 0;
}
.album-item { aspect-ratio: 1; overflow: hidden; }
.photo { width: 100%; height: 100%; }

.photo-1 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.photo-2 { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
.photo-3 { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.photo-4 { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
.photo-5 { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
.photo-6 { background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%); }
.photo-7 { background: linear-gradient(135deg, #fccb90 0%, #d57eeb 100%); }
.photo-8 { background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%); }
.photo-9 { background: linear-gradient(135deg, #f9d423 0%, #ff4e50 100%); }
.photo-10 { background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%); }
.photo-11 { background: linear-gradient(135deg, #fddb92 0%, #d1fdff 100%); }
.photo-12 { background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%); }

.section-label {
  font-size: 13px; font-weight: 600; color: #8e8e93;
  padding: 8px 16px 6px; text-transform: uppercase; letter-spacing: 0.5px;
}

.album-list {
  background: #fff; margin: 0 16px; border-radius: 12px; overflow: hidden;
}

.album-row {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 16px; cursor: pointer;
  border-bottom: 0.5px solid #f0f0f0;
  transition: background 0.15s;
}
.album-row:last-child { border-bottom: none; }
.album-row:active { background: #f5f5f5; }

.album-thumb {
  width: 44px; height: 44px; border-radius: 6px; overflow: hidden;
  position: relative; flex-shrink: 0;
}
.album-thumb-main { width: 100%; height: 100%; }
.album-thumb-overlay {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.05);
}

.grad-1 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.grad-2 { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
.grad-3 { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.grad-4 { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
.grad-5 { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }

.album-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.album-name { font-size: 15px; font-weight: 500; color: #1a1a1a; }
.album-count { font-size: 12px; color: #8e8e93; }

.chevron {
  display: block; width: 7px; height: 7px;
  border-right: 1.5px solid #c7c7cc; border-top: 1.5px solid #c7c7cc;
  transform: rotate(45deg); flex-shrink: 0;
}

.private-album {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 16px; margin: 0 16px 20px;
  background: #fff; border-radius: 12px; cursor: pointer;
  transition: background 0.15s;
}
.private-album:active { background: #f5f5f5; }

.private-icon {
  width: 44px; height: 44px; border-radius: 6px;
  background: #f2f2f7; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.lock-icon {
  display: block; width: 16px; height: 20px; position: relative;
}
.lock-icon::before {
  content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 10px; height: 8px; border: 2px solid #8e8e93; border-radius: 4px 4px 0 0;
  border-bottom: none;
}
.lock-icon::after {
  content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 16px; height: 12px; background: #8e8e93; border-radius: 3px;
}

.private-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.private-text { font-size: 15px; font-weight: 500; color: #1a1a1a; }
.private-hint { font-size: 12px; color: #8e8e93; }

.bottom-tabs {
  display: flex; background: #f9f9f9; border-top: 0.5px solid #e0e0e0;
  padding: 4px 0; padding-bottom: env(safe-area-inset-bottom, 4px);
}
.tab {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px;
  padding: 4px 0; cursor: pointer; color: #8e8e93;
}
.tab.active { color: #007aff; }
.tab-icon { display: block; width: 24px; height: 24px; position: relative; }

.tab-library {
  border: 2px solid currentColor; border-radius: 3px;
  position: relative;
}
.tab-library::after {
  content: ''; position: absolute; top: 2px; left: 2px;
  width: 6px; height: 6px; background: currentColor; border-radius: 1px;
}

.tab-for-you {
  border: 2px solid currentColor; border-radius: 50%;
  position: relative;
}
.tab-for-you::before {
  content: ''; position: absolute; top: 3px; left: 50%; transform: translateX(-50%);
  width: 4px; height: 4px; background: currentColor; border-radius: 50%;
}
.tab-for-you::after {
  content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 10px; height: 6px; border: 2px solid currentColor; border-radius: 0 0 8px 8px;
  border-top: none;
}

.tab-albums {
  border: 2px solid currentColor; border-radius: 3px;
  position: relative;
}
.tab-albums::before {
  content: ''; position: absolute; top: 3px; left: 3px;
  width: 6px; height: 6px; background: currentColor; border-radius: 1px;
}
.tab-albums::after {
  content: ''; position: absolute; bottom: 3px; right: 3px;
  width: 6px; height: 6px; background: currentColor; border-radius: 1px;
}

.tab-search {
  border: 2px solid currentColor; border-radius: 50%;
  position: relative;
}
.tab-search::after {
  content: ''; position: absolute; bottom: 1px; right: 1px;
  width: 5px; height: 2px; background: currentColor; border-radius: 1px;
  transform: rotate(45deg); transform-origin: right center;
}

.tab-label { font-size: 9px; font-weight: 500; white-space: nowrap; }
</style>
