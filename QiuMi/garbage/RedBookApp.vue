<template>
  <div class="app-container">
    <div class="top-nav">
      <button class="back-btn" @click="close">
        <span class="back-arrow"></span>
      </button>
      <span class="nav-title">发现</span>
      <div class="nav-actions">
        <div class="camera-icon"></div>
      </div>
    </div>

    <div class="search-bar">
      <div class="search-icon"></div>
      <span class="search-placeholder">搜索小红书</span>
    </div>

    <div class="tab-bar">
      <div class="tab-item">关注</div>
      <div class="tab-item active">
        发现
        <span class="tab-underline"></span>
      </div>
      <div class="tab-item">附近</div>
    </div>

    <div class="app-content">
      <div class="waterfall">
        <div class="note-card" v-for="(n, i) in feed" :key="i">
          <div class="note-image" :style="{ paddingBottom: imageRatios[i] }">
            <div class="image-inner" :style="{ background: imageGradients[i] }">
              <div class="image-shine"></div>
            </div>
          </div>
          <div class="note-title">{{ n.title }}</div>
          <div class="note-footer">
            <div class="author-info">
              <div class="author-avatar">{{ n.author[0] }}</div>
              <span class="author-name">{{ n.author }}</span>
            </div>
            <div class="like-info">
              <div class="heart-icon"></div>
              <span class="like-count">{{ n.likes }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <div class="bottom-tab active">
        <div class="bottom-icon home-icon"></div>
        <span>首页</span>
      </div>
      <div class="bottom-tab">
        <div class="bottom-icon shop-icon"></div>
        <span>购物</span>
      </div>
      <div class="bottom-tab center-tab">
        <div class="plus-btn"></div>
      </div>
      <div class="bottom-tab">
        <div class="bottom-icon msg-icon"></div>
        <span>消息</span>
      </div>
      <div class="bottom-tab">
        <div class="bottom-icon me-icon"></div>
        <span>我</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePhoneStore } from '@/stores/phoneStore.js'
import { generateRedbookFeed } from '@/engine/PhoneSystem.js'

const phoneStore = usePhoneStore()
const feed = computed(() => generateRedbookFeed())

const imageRatios = ['133%', '100%', '120%', '140%', '100%', '125%', '110%', '100%', '135%', '100%']
const imageGradients = [
  'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 40%, #f48fb1 100%)',
  'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 40%, #a5d6a7 100%)',
  'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 40%, #ffcc80 100%)',
  'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 40%, #90caf9 100%)',
  'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 40%, #ce93d8 100%)',
  'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 40%, #80deea 100%)',
  'linear-gradient(135deg, #fff8e1 0%, #ffecb3 40%, #ffe082 100%)',
  'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 40%, #f48fb1 100%)',
  'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 40%, #9fa8da 100%)',
  'linear-gradient(135deg, #efebe9 0%, #d7ccc8 40%, #bcaaa4 100%)'
]

function close() { phoneStore.closeApp() }
</script>

<style scoped>
.app-container {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #fff;
  z-index: 200;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  padding-top: 46px;
  background: #fff;
  position: relative;
}

.back-btn {
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-arrow {
  display: block;
  width: 9px;
  height: 9px;
  border-left: 2px solid #333;
  border-bottom: 2px solid #333;
  transform: rotate(45deg);
}

.nav-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 17px;
  font-weight: 700;
  color: #222;
  letter-spacing: 1px;
}

.nav-actions {
  display: flex;
  align-items: center;
}

.camera-icon {
  width: 22px;
  height: 18px;
  background: #333;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
}

.camera-icon::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  border: 1.5px solid #333;
}

.camera-icon::after {
  content: '';
  position: absolute;
  top: -2px;
  right: 2px;
  width: 5px;
  height: 3px;
  background: #333;
  border-radius: 1px;
}

.search-bar {
  display: flex;
  align-items: center;
  margin: 6px 14px 0;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 20px;
  gap: 8px;
}

.search-icon {
  width: 14px;
  height: 14px;
  border: 1.5px solid #999;
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
  height: 1.5px;
  background: #999;
  border-radius: 1px;
  transform: rotate(45deg);
  transform-origin: top left;
}

.search-placeholder {
  font-size: 13px;
  color: #bbb;
  flex: 1;
}

.tab-bar {
  display: flex;
  align-items: center;
  padding: 10px 14px 0;
  gap: 28px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.tab-item {
  font-size: 15px;
  color: #999;
  cursor: pointer;
  padding-bottom: 8px;
  position: relative;
  font-weight: 500;
  transition: color 0.2s;
}

.tab-item.active {
  color: #222;
  font-weight: 700;
}

.tab-underline {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: #ff2442;
  border-radius: 2px;
}

.app-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 8px 8px 0;
  background: #fff;
}

.waterfall {
  column-count: 2;
  column-gap: 8px;
}

.note-card {
  break-inside: avoid;
  margin-bottom: 12px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.15s;
}

.note-image {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.image-inner {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
}

.image-shine {
  position: absolute;
  top: -40%;
  left: -20%;
  width: 60%;
  height: 120%;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.25) 45%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 55%
  );
  transform: rotate(15deg);
}

.note-title {
  font-size: 12px;
  font-weight: 500;
  color: #222;
  padding: 8px 10px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.note-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px 10px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  flex: 1;
}

.author-avatar {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b81, #ff2442);
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.author-name {
  font-size: 10px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.like-info {
  display: flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
}

.heart-icon {
  position: relative;
  width: 12px;
  height: 10px;
}

.heart-icon::before,
.heart-icon::after {
  content: '';
  position: absolute;
  width: 6px;
  height: 9px;
  background: #ccc;
  border-radius: 6px 6px 0 0;
}

.heart-icon::before {
  left: 0;
  transform: rotate(-45deg);
  transform-origin: bottom right;
}

.heart-icon::after {
  right: 0;
  transform: rotate(45deg);
  transform-origin: bottom left;
}

.like-count {
  font-size: 10px;
  color: #bbb;
}

.bottom-bar {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 6px 0 20px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
}

.bottom-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  padding: 2px 10px;
  font-size: 10px;
  color: #999;
  font-weight: 500;
}

.bottom-tab.active {
  color: #ff2442;
}

.bottom-tab.center-tab {
  position: relative;
}

.bottom-icon {
  width: 22px;
  height: 22px;
  position: relative;
}

.home-icon {
  width: 12px;
  height: 10px;
  background: #999;
  position: relative;
  margin-top: 5px;
}

.home-icon::before {
  content: '';
  position: absolute;
  top: -6px;
  left: -3px;
  width: 0;
  height: 0;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-bottom: 6px solid #999;
}

.bottom-tab.active .home-icon {
  background: #ff2442;
}

.bottom-tab.active .home-icon::before {
  border-bottom-color: #ff2442;
}

.shop-icon {
  width: 14px;
  height: 14px;
  border: 1.5px solid #999;
  border-radius: 3px;
  position: relative;
  margin-top: 2px;
}

.shop-icon::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 5px;
  border: 1.5px solid #999;
  border-radius: 3px 3px 0 0;
  border-bottom: none;
}

.bottom-tab.active .shop-icon {
  border-color: #ff2442;
}

.bottom-tab.active .shop-icon::before {
  border-color: #ff2442;
}

.plus-btn {
  width: 38px;
  height: 26px;
  background: linear-gradient(135deg, #ff2442, #ff6b81);
  border-radius: 13px;
  position: relative;
  margin-top: -6px;
  box-shadow: 0 2px 8px rgba(255, 36, 66, 0.35);
}

.plus-btn::before,
.plus-btn::after {
  content: '';
  position: absolute;
  background: #fff;
  border-radius: 1px;
}

.plus-btn::before {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 2px;
}

.plus-btn::after {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 14px;
}

.msg-icon {
  width: 16px;
  height: 12px;
  border: 1.5px solid #999;
  border-radius: 3px;
  position: relative;
  margin-top: 4px;
}

.msg-icon::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -1px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 5px solid #999;
}

.bottom-tab.active .msg-icon {
  border-color: #ff2442;
}

.bottom-tab.active .msg-icon::before {
  border-bottom-color: #ff2442;
}

.me-icon {
  width: 9px;
  height: 9px;
  border: 1.5px solid #999;
  border-radius: 50%;
  position: relative;
  margin-top: 2px;
}

.me-icon::after {
  content: '';
  position: absolute;
  top: 8px;
  left: -5px;
  width: 17px;
  height: 8px;
  border: 1.5px solid #999;
  border-radius: 9px 9px 0 0;
  border-bottom: none;
}

.bottom-tab.active .me-icon {
  border-color: #ff2442;
}

.bottom-tab.active .me-icon::after {
  border-color: #ff2442;
}
</style>
