<template>
  <div class="app-container">
    <div class="app-header">
      <div class="header-top">
        <button class="back-btn" @click="close">
          <span class="back-arrow"></span>
        </button>
        <div class="search-bar">
          <span class="search-icon"></span>
          <span class="search-placeholder">搜索你感兴趣的内容</span>
        </div>
        <div class="header-avatar">
          <span class="avatar-letter">我</span>
        </div>
      </div>
      <div class="category-tabs">
        <span class="category-tab active">直播</span>
        <span class="category-tab">推荐</span>
        <span class="category-tab">热门</span>
        <span class="category-tab">番剧</span>
        <span class="category-tab">电影</span>
        <span class="category-tab">综艺</span>
      </div>
    </div>

    <div class="app-content">
      <div class="section">
        <div class="section-header">
          <span class="section-title">为你推荐</span>
          <span class="section-more">换一换</span>
        </div>

        <div class="video-card" v-for="(v, i) in feed.recommendations" :key="i">
          <div class="video-thumb" :style="{ background: thumbColors[i % thumbColors.length] }">
            <div class="thumb-overlay">
              <span class="play-btn"></span>
              <span class="video-duration">{{ durations[i % durations.length] }}</span>
              <span class="danmaku-count">
                <span class="danmaku-icon"></span>
                {{ danmakuNums[i % danmakuNums.length] }}
              </span>
            </div>
            <div class="thumb-gradient"></div>
          </div>
          <div class="video-info">
            <div class="video-title">{{ v.title }}</div>
            <div class="video-meta">
              <span class="video-author">
                <span class="up-icon"></span>
                {{ authors[i % authors.length] }}
              </span>
            </div>
            <div class="video-stats">
              <span class="stat-item">
                <span class="play-icon"></span>
                {{ v.views }}
              </span>
              <span class="stat-item">
                <span class="bullet-icon"></span>
                {{ danmakuNums[i % danmakuNums.length] }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePhoneStore } from '@/stores/phoneStore.js'
import { usePlayerStore } from '@/stores/playerStore.js'
import { generateBilibiliFeed } from '@/engine/PhoneSystem.js'

const phoneStore = usePhoneStore()
const playerStore = usePlayerStore()
const feed = computed(() => generateBilibiliFeed(playerStore.identity))

const thumbColors = [
  'linear-gradient(135deg, #2d1b69, #1a0533)',
  'linear-gradient(135deg, #1a3a5c, #0d1f33)',
  'linear-gradient(135deg, #3d1a3d, #1f0d1f)',
  'linear-gradient(135deg, #1a4a3a, #0d261f)',
  'linear-gradient(135deg, #4a2a1a, #26150d)'
]

const durations = ['03:24', '12:56', '05:18', '08:42', '21:09']

const danmakuNums = ['2345', '1.2万', '567', '3.8万', '892']

const authors = ['UP主小A', '影视飓风', '老番茄', '某幻君', '中国BOY']

function close() {
  phoneStore.closeApp()
}
</script>

<style scoped>
.app-container {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #f6f7f9;
  z-index: 200;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.app-header {
  background: #fb7299;
  padding-top: 48px;
  position: relative;
}

.header-top {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px 8px;
}

.back-btn {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.back-arrow {
  display: block;
  width: 8px;
  height: 8px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(45deg);
}

.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 18px;
  padding: 7px 14px;
  cursor: pointer;
}

.search-icon {
  display: block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
}

.search-icon::after {
  content: '';
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 6px;
  height: 2px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 1px;
  transform: rotate(45deg);
  transform-origin: left center;
}

.search-placeholder {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

.header-avatar {
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-letter {
  font-size: 11px;
  color: #fff;
  font-weight: 600;
}

.category-tabs {
  display: flex;
  gap: 0;
  padding: 6px 14px 10px;
  overflow-x: auto;
  scrollbar-width: none;
}

.category-tabs::-webkit-scrollbar {
  display: none;
}

.category-tab {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  padding: 5px 14px;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 14px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.category-tab.active {
  color: #fb7299;
  background: #fff;
  font-weight: 600;
}

.app-content {
  flex: 1;
  overflow-y: auto;
  padding: 14px 14px 20px;
}

.section {
  margin-bottom: 8px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #18191c;
}

.section-more {
  font-size: 12px;
  color: #999;
  cursor: pointer;
}

.video-card {
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
  cursor: pointer;
}

.video-thumb {
  width: 140px;
  height: 78px;
  border-radius: 8px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.thumb-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
}

.thumb-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn {
  display: block;
  width: 36px;
  height: 36px;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 50%;
  position: relative;
  z-index: 2;
}

.play-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 12px solid #fff;
}

.video-duration {
  position: absolute;
  bottom: 6px;
  right: 6px;
  font-size: 10px;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  padding: 2px 6px;
  border-radius: 3px;
  z-index: 2;
}

.danmaku-count {
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 10px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 6px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 3px;
  z-index: 2;
}

.danmaku-icon {
  display: block;
  width: 10px;
  height: 10px;
  position: relative;
}

.danmaku-icon::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 0;
  width: 10px;
  height: 2px;
  background: #fff;
  border-radius: 1px;
}

.danmaku-icon::after {
  content: '';
  position: absolute;
  top: 6px;
  left: 2px;
  width: 6px;
  height: 2px;
  background: #fff;
  border-radius: 1px;
}

.video-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.video-title {
  font-size: 13px;
  font-weight: 500;
  color: #18191c;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-meta {
  display: flex;
  align-items: center;
  gap: 6px;
}

.video-author {
  font-size: 11px;
  color: #9499a0;
  display: flex;
  align-items: center;
  gap: 3px;
}

.up-icon {
  display: block;
  width: 12px;
  height: 12px;
  background: #00aeec;
  border-radius: 50%;
  position: relative;
}

.up-icon::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 3px;
  width: 4px;
  height: 6px;
  border-right: 1.5px solid #fff;
  border-bottom: 1.5px solid #fff;
  transform: rotate(45deg);
}

.video-stats {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-item {
  font-size: 11px;
  color: #9499a0;
  display: flex;
  align-items: center;
  gap: 3px;
}

.play-icon {
  display: block;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 8px solid #9499a0;
}

.bullet-icon {
  display: block;
  width: 12px;
  height: 2px;
  background: #9499a0;
  border-radius: 1px;
  position: relative;
}

.bullet-icon::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 2px;
  width: 8px;
  height: 2px;
  background: #9499a0;
  border-radius: 1px;
}
</style>
