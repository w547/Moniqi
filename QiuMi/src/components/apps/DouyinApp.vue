<template>
  <div class="app-container">
    <div class="top-bar">
      <div class="top-tabs">
        <span class="top-tab active">推荐</span>
        <span class="top-tab">关注</span>
      </div>
      <div class="search-icon"></div>
    </div>

    <div class="video-feed">
      <div class="video-card" v-for="(v, i) in feed" :key="i">
        <div class="video-placeholder" :style="{ background: gradients[i % gradients.length] }">
          <div class="play-icon"></div>
        </div>

        <div class="video-overlay"></div>

        <div class="right-sidebar">
          <div class="sidebar-avatar">{{ v.author[0] }}</div>
          <div class="sidebar-action" @click="toggleLike(i)">
            <div class="icon-heart" :class="{ liked: likedVideos[i] }"></div>
            <span class="action-count" :class="{ 'liked-count': likedVideos[i] }">{{ likedVideos[i] ? incrementDouyinLike(v.likes) : v.likes }}</span>
          </div>
          <div class="sidebar-action">
            <div class="icon-comment"></div>
            <span class="action-count">{{ getCommentCount(v) }}</span>
          </div>
          <div class="sidebar-action" @click="shareVideo(v)">
            <div class="icon-share"></div>
            <span class="action-count">分享</span>
          </div>
          <div class="music-disc-wrap">
            <div class="music-disc">
              <div class="disc-center"></div>
            </div>
          </div>
        </div>

        <div class="video-info">
          <div class="info-username">@{{ v.author }}</div>
          <div class="info-caption">{{ v.title }}</div>
          <div class="info-music">
            <div class="music-note-icon"></div>
            <div class="music-marquee-wrap">
              <span class="music-marquee-text">{{ getMusicName(v) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <div class="bottom-tab active">
        <div class="tab-icon-home"></div>
        <span class="tab-label">首页</span>
      </div>
      <div class="bottom-tab">
        <div class="tab-icon-friends"></div>
        <span class="tab-label">朋友</span>
      </div>
      <div class="bottom-tab">
        <div class="tab-icon-plus-wrap">
          <div class="tab-icon-plus"></div>
        </div>
      </div>
      <div class="bottom-tab">
        <div class="tab-icon-inbox"></div>
        <span class="tab-label">消息</span>
      </div>
      <div class="bottom-tab">
        <div class="tab-icon-profile"></div>
        <span class="tab-label">我</span>
      </div>
    </div>

    <div v-if="showShareToast" class="share-toast" @click="showShareToast = false">
      <div class="toast-icon">✅</div>
      <div class="toast-text">已分享到抖音</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePhoneStore } from '@/stores/phoneStore.js'
import { usePlayerStore } from '@/stores/playerStore.js'
import { generateDouyinFeed } from '@/engine/PhoneSystem.js'

const phoneStore = usePhoneStore()
const playerStore = usePlayerStore()
const feed = computed(() => generateDouyinFeed(playerStore.identity))
const showShareToast = ref(false)
const likedVideos = ref({})

const gradients = [
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #2d1b2e 0%, #1a1a3e 50%, #1b2838 100%)',
  'linear-gradient(135deg, #1b2838 0%, #2d1b2e 50%, #1a1a2e 100%)',
  'linear-gradient(135deg, #0f3460 0%, #1a1a2e 50%, #16213e 100%)'
]

function getCommentCount(v) {
  const likesStr = String(v.likes)
  const num = parseFloat(likesStr)
  if (likesStr.includes('w')) {
    return (num * 0.3).toFixed(1) + 'w'
  }
  return String(Math.floor(num * 0.3))
}

function getMusicName(v) {
  return '@' + v.author + '创作的原声'
}

function toggleLike(i) {
  likedVideos.value[i] = !likedVideos.value[i]
}

function incrementDouyinLike(likesStr) {
  if (likesStr.includes('w')) {
    const num = parseFloat(likesStr)
    return (num + 0.1).toFixed(1) + 'w'
  }
  const num = parseInt(likesStr)
  return isNaN(num) ? likesStr : String(num + 1)
}

function shareVideo(v) {
  showShareToast.value = true
  phoneStore.addNotification({
    app: 'douyin',
    title: '抖音',
    content: '已分享视频: ' + v.title.slice(0, 20) + '...',
    type: 'share'
  })
  setTimeout(() => { showShareToast.value = false }, 2000)
}

function close() { phoneStore.closeApp() }
</script>

<style scoped>
.app-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  z-index: 200;
  overflow: hidden;
}

.top-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px 12px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 70%, transparent 100%);
}

.top-tabs {
  display: flex;
  align-items: center;
  gap: 28px;
}

.top-tab {
  font-size: 16px;
  color: rgba(255,255,255,0.65);
  font-weight: 400;
  cursor: pointer;
  position: relative;
  padding-bottom: 4px;
  transition: color 0.2s;
  user-select: none;
}

.top-tab.active {
  color: #fff;
  font-weight: 600;
  font-size: 17px;
}

.top-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2.5px;
  background: #fff;
  border-radius: 2px;
}

.search-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.8);
  border-radius: 50%;
  cursor: pointer;
}

.search-icon::after {
  content: '';
  position: absolute;
  bottom: -3px;
  right: -3px;
  width: 8px;
  height: 2px;
  background: rgba(255,255,255,0.8);
  border-radius: 1px;
  transform: rotate(45deg);
  transform-origin: left center;
}

.video-feed {
  height: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.video-feed::-webkit-scrollbar {
  display: none;
}

.video-card {
  height: 100%;
  scroll-snap-align: start;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.video-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-icon {
  width: 60px;
  height: 60px;
  border: 3px solid rgba(255,255,255,0.5);
  border-radius: 50%;
  position: relative;
  opacity: 0.6;
}

.play-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-left: 20px solid rgba(255,255,255,0.5);
}

.video-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45%;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
  pointer-events: none;
}

.right-sidebar {
  position: absolute;
  right: 10px;
  bottom: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 10;
}

.sidebar-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: linear-gradient(135deg, #ff6b9d, #c44dff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  position: relative;
}

.sidebar-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.icon-heart {
  width: 28px;
  height: 28px;
  position: relative;
}

.icon-heart::before,
.icon-heart::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 24px;
  background: #fff;
  border-radius: 16px 16px 0 0;
}

.icon-heart::before {
  left: 10px;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}

.icon-heart::after {
  left: 2px;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}

.icon-heart.liked::before,
.icon-heart.liked::after {
  background: #ff2d55;
}

.liked-count {
  color: #ff2d55 !important;
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

.icon-comment {
  width: 28px;
  height: 24px;
  position: relative;
}

.icon-comment::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 18px;
  border: 2.5px solid #fff;
  border-radius: 8px;
}

.icon-comment::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 6px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 7px solid #fff;
}

.icon-share {
  width: 26px;
  height: 26px;
  position: relative;
}

.icon-share::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 10px solid #fff;
}

.icon-share::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 10px;
  border: 2.5px solid #fff;
  border-radius: 3px;
  border-top: none;
}

.action-count {
  font-size: 11px;
  color: #fff;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
}

.music-disc-wrap {
  margin-top: 6px;
}

.music-disc {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #2a2a2a;
  border: 3px solid rgba(255,255,255,0.5);
  position: relative;
  animation: discSpin 4s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
}

.disc-center {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff2d55;
}

@keyframes discSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.video-info {
  position: absolute;
  bottom: 100px;
  left: 12px;
  right: 70px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-username {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
}

.info-caption {
  font-size: 13px;
  color: rgba(255,255,255,0.9);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
}

.info-music {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
}

.music-note-icon {
  width: 14px;
  height: 14px;
  position: relative;
  flex-shrink: 0;
}

.music-note-icon::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 3px;
  height: 10px;
  background: #fff;
  border-radius: 2px;
}

.music-note-icon::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 0;
  width: 3px;
  height: 8px;
  background: #fff;
  border-radius: 2px;
}

.music-marquee-wrap {
  overflow: hidden;
  flex: 1;
  min-width: 0;
}

.music-marquee-text {
  display: inline-block;
  white-space: nowrap;
  font-size: 12px;
  color: rgba(255,255,255,0.85);
  animation: marquee 8s linear infinite;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
}

@keyframes marquee {
  0% { transform: translateX(60%); }
  100% { transform: translateX(-100%); }
}

.bottom-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 8px 8px 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 70%, transparent 100%);
}

.bottom-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  min-width: 48px;
}

.bottom-tab.active .tab-label {
  color: #fff;
  font-weight: 600;
}

.tab-label {
  font-size: 10px;
  color: rgba(255,255,255,0.6);
  font-weight: 400;
  transition: color 0.2s;
}

.tab-icon-home {
  width: 22px;
  height: 22px;
  position: relative;
}

.tab-icon-home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #fff;
}

.tab-icon-home::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 10px;
  background: #fff;
  border-radius: 0 0 2px 2px;
}

.tab-icon-friends {
  width: 22px;
  height: 22px;
  position: relative;
}

.tab-icon-friends::before {
  content: '';
  position: absolute;
  top: 0;
  left: 2px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.6);
}

.tab-icon-friends::after {
  content: '';
  position: absolute;
  top: 0;
  right: 2px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.6);
}

.tab-icon-plus-wrap {
  width: 40px;
  height: 28px;
  background: #fff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-icon-plus {
  width: 16px;
  height: 16px;
  position: relative;
}

.tab-icon-plus::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 16px;
  height: 2.5px;
  background: #000;
  border-radius: 2px;
}

.tab-icon-plus::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 2.5px;
  height: 16px;
  background: #000;
  border-radius: 2px;
}

.tab-icon-inbox {
  width: 22px;
  height: 22px;
  position: relative;
}

.tab-icon-inbox::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.6);
  border-radius: 2px;
}

.tab-icon-inbox::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-bottom: 7px solid rgba(255,255,255,0.6);
}

.tab-icon-profile {
  width: 22px;
  height: 22px;
  position: relative;
}

.tab-icon-profile::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.6);
}

.tab-icon-profile::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 8px;
  border-radius: 9px 9px 0 0;
  border: 2px solid rgba(255,255,255,0.6);
  border-bottom: none;
}
</style>
