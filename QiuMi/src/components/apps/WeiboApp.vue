<template>
  <div class="app-container">
    <div class="top-nav">
      <button class="back-btn" @click="close">
        <span class="back-arrow"></span>
      </button>
      <span class="nav-title">微博</span>
      <div class="nav-actions">
        <div class="search-icon"></div>
      </div>
    </div>

    <div class="app-content">
      <div class="hot-search-section">
        <div class="section-header">
          <span class="section-title">热搜榜</span>
          <span class="hot-badge">热</span>
        </div>
        <div class="hot-list">
          <div class="hot-item" v-for="(tag, i) in feed.hotSearch" :key="i">
            <span class="hot-rank" :class="{ 'top3': i < 3 }">{{ i + 1 }}</span>
            <span class="hot-tag">{{ tag.replace(/_/g, ' ') }}</span>
            <span class="hot-heat" v-if="i < 3">
              <span class="heat-bar" :style="{ width: (100 - i * 20) + '%' }"></span>
            </span>
            <span class="hot-count" v-else>{{ Math.floor(Math.random() * 50 + 10) }}万</span>
          </div>
        </div>
      </div>

      <div class="posts-section">
        <div class="post-card" v-for="(post, i) in feed.posts" :key="i">
          <div class="post-header">
            <div class="avatar">{{ post.user[0] }}</div>
            <div class="user-info">
              <div class="username-row">
                <span class="username">{{ post.user }}</span>
                <span class="verified-badge">V</span>
              </div>
              <span class="post-time">{{ i === 0 ? '5分钟前' : i === 1 ? '18分钟前' : '32分钟前' }}</span>
            </div>
            <button class="follow-btn" :class="{ followed: i === 0 }">{{ i === 0 ? '已关注' : '+ 关注' }}</button>
          </div>
          <div class="post-body">
            <div class="post-text">{{ post.content }}</div>
            <div class="post-image" v-if="i === 0">
              <div class="image-placeholder"></div>
            </div>
          </div>
          <div class="post-actions">
            <div class="action-item">
              <div class="action-icon repost-icon"></div>
              <span>{{ formatNum(Math.floor(post.likes / 3)) }}</span>
            </div>
            <div class="action-item">
              <div class="action-icon comment-icon"></div>
              <span>{{ formatNum(post.comments) }}</span>
            </div>
            <div class="action-item">
              <div class="action-icon like-icon"></div>
              <span>{{ formatNum(post.likes) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-tab-bar">
      <div class="tab-item active">
        <div class="tab-icon home-icon"></div>
        <span class="tab-label">首页</span>
      </div>
      <div class="tab-item">
        <div class="tab-icon discover-icon"></div>
        <span class="tab-label">发现</span>
      </div>
      <div class="tab-item">
        <div class="tab-icon message-icon"></div>
        <span class="tab-label">消息</span>
      </div>
      <div class="tab-item">
        <div class="tab-icon profile-icon"></div>
        <span class="tab-label">我</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePhoneStore } from '@/stores/phoneStore.js'
import { generateWeiboFeed } from '@/engine/PhoneSystem.js'

const phoneStore = usePhoneStore()
const feed = computed(() => generateWeiboFeed())

function formatNum(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + 'w'
  return String(n)
}

function close() {
  phoneStore.closeApp()
}
</script>

<style scoped>
.app-container {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #f8f8f8;
  z-index: 200;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  padding-top: 48px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.back-btn {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-arrow {
  display: block;
  width: 8px;
  height: 8px;
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
  color: #ff8200;
  letter-spacing: 2px;
}

.nav-actions {
  display: flex;
  align-items: center;
}

.search-icon {
  width: 18px;
  height: 18px;
  border: 2px solid #666;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
}

.search-icon::after {
  content: '';
  position: absolute;
  bottom: -3px;
  right: -3px;
  width: 7px;
  height: 2px;
  background: #666;
  border-radius: 1px;
  transform: rotate(45deg);
  transform-origin: top left;
}

.app-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.hot-search-section {
  background: #fff;
  margin-bottom: 8px;
  padding: 14px 16px 10px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #222;
}

.hot-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: linear-gradient(135deg, #ff3300, #ff8200);
  border-radius: 4px;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
}

.hot-list {
  display: flex;
  flex-direction: column;
}

.hot-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.hot-item:last-child {
  border-bottom: none;
}

.hot-rank {
  font-size: 16px;
  font-weight: 800;
  color: #999;
  min-width: 20px;
  text-align: center;
  font-style: italic;
}

.hot-rank.top3 {
  color: #ff8200;
}

.hot-tag {
  flex: 1;
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hot-heat {
  width: 48px;
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
  flex-shrink: 0;
}

.heat-bar {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #ff3300, #ff8200);
  border-radius: 2px;
}

.hot-count {
  font-size: 11px;
  color: #bbb;
  flex-shrink: 0;
}

.posts-section {
  background: #fff;
}

.post-card {
  padding: 14px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.post-card:last-child {
  border-bottom: none;
}

.post-header {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8200, #ffb347);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.username-row {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 2px;
}

.username {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  background: #1d9bf0;
  border-radius: 50%;
  color: #fff;
  font-size: 9px;
  font-weight: 800;
  flex-shrink: 0;
}

.post-time {
  font-size: 11px;
  color: #bbb;
}

.follow-btn {
  padding: 4px 12px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  flex-shrink: 0;
  border: 1px solid #ff8200;
  background: #fff;
  color: #ff8200;
  transition: all 0.15s;
}

.follow-btn.followed {
  background: #f5f5f5;
  border-color: #ddd;
  color: #999;
}

.post-body {
  margin-bottom: 10px;
}

.post-text {
  font-size: 15px;
  color: #222;
  line-height: 1.65;
  word-break: break-word;
}

.post-image {
  margin-top: 10px;
}

.image-placeholder {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  border-radius: 6px;
  border: 1px solid #eee;
}

.post-actions {
  display: flex;
  justify-content: space-around;
  padding-top: 4px;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #999;
  cursor: pointer;
}

.action-icon {
  width: 16px;
  height: 16px;
  position: relative;
}

.repost-icon {
  border: 1.5px solid #999;
  border-radius: 3px;
}

.repost-icon::before,
.repost-icon::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
}

.repost-icon::before {
  left: -5px;
  top: 3px;
  border-right: 5px solid #999;
}

.repost-icon::after {
  right: -5px;
  top: 3px;
  border-left: 5px solid #999;
}

.comment-icon {
  width: 14px;
  height: 11px;
  border: 1.5px solid #999;
  border-radius: 3px;
  position: relative;
  top: 2px;
}

.comment-icon::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 3px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #999;
}

.like-icon {
  position: relative;
  top: 1px;
}

.like-icon::before,
.like-icon::after {
  content: '';
  position: absolute;
  width: 7px;
  height: 10px;
  border: 1.5px solid #999;
  border-radius: 7px 7px 0 0;
  border-bottom: none;
}

.like-icon::before {
  left: 0;
  transform: rotate(-45deg);
  transform-origin: bottom right;
}

.like-icon::after {
  right: 0;
  transform: rotate(45deg);
  transform-origin: bottom left;
}

.bottom-tab-bar {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 6px 0 20px;
  background: #fff;
  border-top: 1px solid #eee;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  padding: 2px 12px;
}

.tab-label {
  font-size: 10px;
  color: #999;
  font-weight: 500;
}

.tab-item.active .tab-label {
  color: #ff8200;
  font-weight: 600;
}

.tab-icon {
  width: 22px;
  height: 22px;
  position: relative;
}

.home-icon {
  width: 12px;
  height: 9px;
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

.tab-item.active .home-icon,
.tab-item.active .home-icon::before {
  background: #ff8200;
  border-bottom-color: #ff8200;
}

.discover-icon {
  width: 16px;
  height: 16px;
  border: 2px solid #999;
  border-radius: 50%;
  position: relative;
}

.discover-icon::before,
.discover-icon::after {
  content: '';
  position: absolute;
  background: #999;
}

.discover-icon::before {
  top: 50%;
  left: 3px;
  right: 3px;
  height: 1.5px;
  transform: translateY(-50%);
}

.discover-icon::after {
  left: 50%;
  top: 3px;
  bottom: 3px;
  width: 1.5px;
  transform: translateX(-50%);
}

.tab-item.active .discover-icon {
  border-color: #ff8200;
}

.tab-item.active .discover-icon::before,
.tab-item.active .discover-icon::after {
  background: #ff8200;
}

.message-icon {
  width: 16px;
  height: 12px;
  border: 1.5px solid #999;
  border-radius: 3px;
  position: relative;
  margin-top: 4px;
}

.message-icon::before {
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

.tab-item.active .message-icon {
  border-color: #ff8200;
}

.tab-item.active .message-icon::before {
  border-bottom-color: #ff8200;
}

.profile-icon {
  width: 9px;
  height: 9px;
  border: 1.5px solid #999;
  border-radius: 50%;
  position: relative;
  margin-top: 2px;
}

.profile-icon::after {
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

.tab-item.active .profile-icon {
  border-color: #ff8200;
}

.tab-item.active .profile-icon::after {
  border-color: #ff8200;
}
</style>
