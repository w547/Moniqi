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
        <span class="hamburger-icon"></span>
      </div>
      <div class="header-tabs">
        <span class="htab active">我的</span>
        <span class="htab">发现</span>
        <span class="htab">云村</span>
        <span class="htab">视频</span>
      </div>
      <div class="header-right">
        <span class="search-icon-sm"></span>
      </div>
    </div>

    <div class="app-content">
      <div class="banner-carousel">
        <div class="banner-slide">
          <div class="banner-bg"></div>
          <div class="banner-dots">
            <span class="dot active"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>

      <div class="quick-actions">
        <div class="action-item">
          <span class="action-icon icon-fm"></span>
          <span class="action-label">私人FM</span>
        </div>
        <div class="action-item">
          <span class="action-icon icon-daily"></span>
          <span class="action-label">每日推荐</span>
        </div>
        <div class="action-item">
          <span class="action-icon icon-chart"></span>
          <span class="action-label">排行榜</span>
        </div>
        <div class="action-item">
          <span class="action-icon icon-live"></span>
          <span class="action-label">直播</span>
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">推荐歌单</span>
          <span class="section-more">更多 &gt;</span>
        </div>
        <div class="playlist-scroll">
          <div class="playlist-card" v-for="(p, i) in playlists" :key="i">
            <div class="pl-cover" :class="'cover-' + ((i % 3) + 1)">
              <span class="pl-play-icon"></span>
              <span class="pl-count">{{ p.desc }}</span>
            </div>
            <div class="pl-name">{{ p.name }}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">好友动态</span>
          <span class="section-more">更多 &gt;</span>
        </div>
        <div class="dynamic-list">
          <div class="dynamic-item" v-for="(d, i) in dynamics" :key="i">
            <div class="d-avatar" :class="'d-avatar-' + ((i % 3) + 1)"></div>
            <div class="d-body">
              <div class="d-user">{{ d.user }}</div>
              <div class="d-content">{{ d.content }}</div>
            </div>
            <div class="d-arrow"></div>
          </div>
        </div>
      </div>

      <div class="content-spacer"></div>
    </div>

    <div class="mini-player">
      <div class="player-cover"></div>
      <div class="player-info">
        <div class="player-title">告白气球</div>
        <div class="player-artist">周杰伦</div>
      </div>
      <div class="player-controls">
        <span class="ctrl-play"></span>
        <span class="ctrl-next"></span>
      </div>
      <div class="player-progress">
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePhoneStore } from '@/stores/phoneStore.js'

const phoneStore = usePhoneStore()

const playlists = ref([
  { name: '他的歌单', desc: '32首' },
  { name: '深夜emo专用', desc: '18首' },
  { name: '一起听过的歌', desc: '12首' }
])

const dynamics = ref([
  { user: '他', content: '分享了一首《告白气球》' },
  { user: '闺蜜', content: '这首歌太好听了！' }
])

function close() { phoneStore.closeApp() }
</script>

<style scoped>
.app-container {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: #f5f5f5; z-index: 200; display: flex; flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.status-bar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 20px 4px; background: #d43c33; color: #fff;
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
  padding: 6px 14px 8px; background: #d43c33;
}
.header-left { cursor: pointer; padding: 4px; flex-shrink: 0; }
.hamburger-icon {
  display: flex; flex-direction: column; gap: 4px; width: 20px;
}
.hamburger-icon::before, .hamburger-icon::after {
  content: ''; display: block; height: 2px; background: #fff; border-radius: 1px;
}
.hamburger-icon::before { width: 100%; }
.hamburger-icon::after { width: 60%; }

.header-tabs {
  flex: 1; display: flex; gap: 14px; justify-content: center;
}
.htab {
  font-size: 14px; color: rgba(255,255,255,0.6); cursor: pointer; white-space: nowrap;
}
.htab.active { color: #fff; font-weight: 600; font-size: 15px; }

.header-right { flex-shrink: 0; padding: 4px; }
.search-icon-sm {
  width: 16px; height: 16px; border: 2px solid #fff; border-radius: 50%;
  position: relative; display: block;
}
.search-icon-sm::after {
  content: ''; position: absolute; bottom: -3px; right: -3px;
  width: 6px; height: 2px; background: #fff; border-radius: 1px; transform: rotate(45deg);
}

.app-content { flex: 1; overflow-y: auto; }

.banner-carousel { padding: 10px 14px; }
.banner-slide {
  position: relative; border-radius: 12px; overflow: hidden;
  height: 130px;
}
.banner-bg {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #d43c33, #e85d50, #f08080, #d43c33);
  background-size: 300% 300%;
  animation: banner-shift 6s ease infinite;
}
@keyframes banner-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.banner-dots {
  position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 6px;
}
.dot {
  width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.4);
}
.dot.active { background: #fff; width: 16px; border-radius: 3px; }

.quick-actions {
  display: flex; justify-content: space-around; padding: 14px 10px;
  background: #fff; margin: 0 14px; border-radius: 12px;
}
.action-item {
  display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer;
}
.action-icon {
  width: 36px; height: 36px; border-radius: 50%; display: block;
}
.icon-fm { background: linear-gradient(135deg, #ff6b6b, #ee5a24); position: relative; }
.icon-fm::after {
  content: ''; position: absolute; top: 50%; left: 55%; transform: translate(-50%, -50%);
  width: 0; height: 0; border-left: 8px solid #fff;
  border-top: 5px solid transparent; border-bottom: 5px solid transparent;
}
.icon-daily { background: linear-gradient(135deg, #f093fb, #f5576c); position: relative; }
.icon-daily::after {
  content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 10px; height: 10px; background: #fff; border-radius: 2px;
}
.icon-chart { background: linear-gradient(135deg, #4facfe, #00f2fe); position: relative; }
.icon-chart::before {
  content: ''; position: absolute; bottom: 8px; left: 8px;
  width: 6px; height: 10px; background: #fff; border-radius: 1px;
}
.icon-chart::after {
  content: ''; position: absolute; bottom: 8px; left: 16px;
  width: 6px; height: 16px; background: #fff; border-radius: 1px;
}
.icon-live { background: linear-gradient(135deg, #a18cd1, #fbc2eb); position: relative; }
.icon-live::after {
  content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 12px; height: 12px; border: 2px solid #fff; border-radius: 50%;
}
.action-label { font-size: 11px; color: #666; }

.section { margin-top: 16px; }
.section-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 14px; margin-bottom: 10px;
}
.section-title { font-size: 15px; font-weight: 700; color: #1a1a1a; }
.section-more {
  font-size: 11px; color: #999; border: 1px solid #e5e5e5;
  border-radius: 10px; padding: 2px 8px;
}

.playlist-scroll {
  display: flex; gap: 10px; overflow-x: auto; padding: 0 14px;
  scrollbar-width: none; -ms-overflow-style: none;
}
.playlist-scroll::-webkit-scrollbar { display: none; }

.playlist-card { flex-shrink: 0; width: 110px; cursor: pointer; }
.pl-cover {
  width: 110px; height: 110px; border-radius: 10px; position: relative; overflow: hidden;
}
.cover-1 { background: linear-gradient(135deg, #667eea, #764ba2); }
.cover-2 { background: linear-gradient(135deg, #f093fb, #f5576c); }
.cover-3 { background: linear-gradient(135deg, #4facfe, #00f2fe); }

.pl-play-icon {
  position: absolute; bottom: 6px; right: 6px;
  width: 24px; height: 24px; background: rgba(255,255,255,0.9); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.pl-play-icon::after {
  content: ''; width: 0; height: 0;
  border-left: 8px solid #d43c33;
  border-top: 5px solid transparent; border-bottom: 5px solid transparent;
  margin-left: 2px;
}
.pl-count {
  position: absolute; top: 6px; right: 6px;
  font-size: 10px; color: #fff; background: rgba(0,0,0,0.3);
  padding: 1px 5px; border-radius: 8px;
}
.pl-name {
  font-size: 12px; color: #333; margin-top: 6px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

.dynamic-list {
  margin: 0 14px; background: #fff; border-radius: 12px; overflow: hidden;
}
.dynamic-item {
  display: flex; align-items: center; gap: 10px; padding: 12px 14px;
  border-bottom: 0.5px solid #f0f0f0; cursor: pointer;
}
.dynamic-item:last-child { border-bottom: none; }
.dynamic-item:active { background: #f9f9f9; }

.d-avatar {
  width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
}
.d-avatar-1 { background: linear-gradient(135deg, #ff9a9e, #fad0c4); }
.d-avatar-2 { background: linear-gradient(135deg, #a18cd1, #fbc2eb); }
.d-avatar-3 { background: linear-gradient(135deg, #84fab0, #8fd3f4); }

.d-body { flex: 1; min-width: 0; }
.d-user { font-size: 13px; font-weight: 600; color: #d43c33; margin-bottom: 2px; }
.d-content { font-size: 12px; color: #666; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.d-arrow {
  width: 6px; height: 6px; border-right: 1.5px solid #ccc;
  border-top: 1.5px solid #ccc; transform: rotate(45deg); flex-shrink: 0;
}

.content-spacer { height: 60px; }

.mini-player {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 52px; background: #fefefe; border-top: 0.5px solid #e5e5e5;
  display: flex; align-items: center; gap: 10px; padding: 0 14px;
  box-shadow: 0 -1px 4px rgba(0,0,0,0.04);
}
.player-cover {
  width: 38px; height: 38px; border-radius: 6px; flex-shrink: 0;
  background: linear-gradient(135deg, #d43c33, #e85d50);
  position: relative; overflow: hidden;
}
.player-cover::after {
  content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(45deg);
  width: 12px; height: 12px; background: rgba(255,255,255,0.3); border-radius: 2px;
}
.player-info { flex: 1; min-width: 0; }
.player-title { font-size: 13px; font-weight: 500; color: #1a1a1a; }
.player-artist { font-size: 11px; color: #999; }
.player-controls { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
.ctrl-play {
  width: 28px; height: 28px; border: 2px solid #d43c33; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.ctrl-play::after {
  content: ''; width: 0; height: 0;
  border-left: 8px solid #d43c33;
  border-top: 5px solid transparent; border-bottom: 5px solid transparent;
  margin-left: 2px;
}
.ctrl-next {
  width: 20px; height: 20px; position: relative;
}
.ctrl-next::before {
  content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 0; height: 0;
  border-left: 7px solid #999;
  border-top: 5px solid transparent; border-bottom: 5px solid transparent;
}
.ctrl-next::after {
  content: ''; position: absolute; top: 50%; left: calc(50% + 5px); transform: translate(-50%, -50%);
  width: 0; height: 0;
  border-left: 7px solid #999;
  border-top: 5px solid transparent; border-bottom: 5px solid transparent;
}
.player-progress {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
}
.progress-bar { width: 100%; height: 100%; background: #eee; }
.progress-fill { width: 35%; height: 100%; background: #d43c33; }
</style>
