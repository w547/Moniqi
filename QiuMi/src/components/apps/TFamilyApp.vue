<template>
  <div class="app-container">
    <div class="app-header">
      <button class="back-btn" @click="close">
        <span class="back-arrow"></span>
      </button>
      <span class="app-title">{{ feed.group }}</span>
      <div class="header-actions">
        <span class="premium-badge">PREMIUM</span>
        <span class="search-icon"></span>
      </div>
    </div>

    <div class="app-content">
      <div class="community-strip">
        <div class="community-item active">
          <div class="community-avatar" style="background: linear-gradient(135deg, #7c3aed, #a78bfa);">
            <span class="community-avatar-letter">{{ feed.group.charAt(0) }}</span>
          </div>
          <span class="community-name">{{ feed.group }}</span>
          <span class="community-check"></span>
        </div>
        <div class="community-item">
          <div class="community-avatar" style="background: linear-gradient(135deg, #ec4899, #f472b6);">
            <span class="community-avatar-letter">B</span>
          </div>
          <span class="community-name">BLACKPINK</span>
        </div>
        <div class="community-item">
          <div class="community-avatar" style="background: linear-gradient(135deg, #06b6d4, #22d3ee);">
            <span class="community-avatar-letter">S</span>
          </div>
          <span class="community-name">SEVENTEEN</span>
        </div>
        <div class="community-item">
          <div class="community-avatar" style="background: linear-gradient(135deg, #f59e0b, #fbbf24);">
            <span class="community-avatar-letter">N</span>
          </div>
          <span class="community-name">NCT</span>
        </div>
      </div>

      <div class="subscribe-card">
        <div class="subscribe-left">
          <div class="subscribe-star"></div>
          <div class="subscribe-text">
            <div class="subscribe-title">官方会员订阅</div>
            <div class="subscribe-desc">解锁独家内容 &middot; 优先观看</div>
          </div>
        </div>
        <button class="subscribe-btn">订阅</button>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">公告</span>
          <span class="section-badge official-badge">官方</span>
        </div>
        <div class="notice-list">
          <div class="notice-item" v-for="(n, i) in feed.notices" :key="i">
            <div class="notice-icon-wrap">
              <span class="notice-pin"></span>
            </div>
            <div class="notice-body">
              <div class="notice-title-row">
                <span class="notice-title">{{ n.title }}</span>
                <span v-if="n.isNew" class="new-badge">NEW</span>
              </div>
              <span class="notice-date">2026.06.{{ 15 - i }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">成员动态</span>
          <span class="section-count">{{ feed.posts.length }} 条更新</span>
        </div>
        <div class="post-card" v-for="(p, i) in feed.posts" :key="i">
          <div class="post-header">
            <div class="post-avatar" :style="{ background: avatarColors[i % avatarColors.length] }">
              <span class="post-avatar-letter">{{ p.member.charAt(p.member.length - 1) }}</span>
            </div>
            <div class="post-meta">
              <div class="post-member">{{ p.member }}</div>
              <div class="post-time">{{ p.time }}</div>
            </div>
            <div class="post-more"></div>
          </div>
          <div class="post-content">{{ p.content }}</div>
          <div class="post-footer">
            <div class="post-action">
              <span class="post-heart"></span>
              <span class="post-action-text">{{ formatNum(p.likes) }}</span>
            </div>
            <div class="post-action">
              <span class="post-comment-icon"></span>
              <span class="post-action-text">{{ formatNum(Math.floor(p.likes * 0.08)) }}</span>
            </div>
            <div class="post-action">
              <span class="post-share-icon"></span>
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
import { useBoyfriendStore } from '@/stores/boyfriendStore.js'
import { generateTFamilyFeed } from '@/engine/PhoneSystem.js'

const phoneStore = usePhoneStore()
const boyfriendStore = useBoyfriendStore()
const feed = computed(() => generateTFamilyFeed(boyfriendStore.group))

const avatarColors = [
  'linear-gradient(135deg, #7c3aed, #a78bfa)',
  'linear-gradient(135deg, #ec4899, #f472b6)',
  'linear-gradient(135deg, #f59e0b, #fbbf24)',
  'linear-gradient(135deg, #06b6d4, #22d3ee)',
  'linear-gradient(135deg, #10b981, #34d399)',
  'linear-gradient(135deg, #ef4444, #f87171)'
]

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
  background: #0f0a1a;
  z-index: 200;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  padding-top: 48px;
  background: linear-gradient(180deg, #1a1030 0%, #150d28 100%);
  border-bottom: 1px solid rgba(124, 58, 237, 0.2);
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
  border-left: 2px solid #a78bfa;
  border-bottom: 2px solid #a78bfa;
  transform: rotate(45deg);
}

.app-title {
  flex: 1;
  font-size: 17px;
  font-weight: 700;
  color: #e8e0f0;
  letter-spacing: 0.5px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.premium-badge {
  font-size: 9px;
  font-weight: 700;
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.15);
  border: 1px solid rgba(251, 191, 36, 0.3);
  padding: 3px 8px;
  border-radius: 10px;
  letter-spacing: 1px;
}

.search-icon {
  display: block;
  width: 16px;
  height: 16px;
  border: 2px solid #a78bfa;
  border-radius: 50%;
  position: relative;
}

.search-icon::after {
  content: '';
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 7px;
  height: 2px;
  background: #a78bfa;
  border-radius: 1px;
  transform: rotate(45deg);
  transform-origin: left center;
}

.app-content {
  flex: 1;
  overflow-y: auto;
  padding: 14px 14px 20px;
}

.community-strip {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
  margin-bottom: 14px;
  scrollbar-width: none;
}

.community-strip::-webkit-scrollbar {
  display: none;
}

.community-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 56px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.community-item.active {
  opacity: 1;
}

.community-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.community-item.active .community-avatar {
  box-shadow: 0 0 0 2px #7c3aed, 0 0 12px rgba(124, 58, 237, 0.4);
}

.community-avatar-letter {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}

.community-check {
  display: none;
}

.community-item.active .community-check {
  display: block;
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 14px;
  height: 14px;
  background: #7c3aed;
  border-radius: 50%;
  border: 2px solid #0f0a1a;
}

.community-item.active .community-check::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 4px;
  width: 4px;
  height: 7px;
  border-right: 1.5px solid #fff;
  border-bottom: 1.5px solid #fff;
  transform: rotate(45deg);
}

.community-name {
  font-size: 10px;
  color: #a78bfa;
  white-space: nowrap;
  max-width: 56px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.community-item.active .community-name {
  color: #c4b5fd;
  font-weight: 600;
}

.subscribe-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(167, 139, 250, 0.1));
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: 14px;
  padding: 14px 16px;
  margin-bottom: 18px;
}

.subscribe-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.subscribe-star {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.subscribe-star::after {
  content: '';
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 10px solid #fff;
}

.subscribe-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.subscribe-title {
  font-size: 14px;
  font-weight: 700;
  color: #e8e0f0;
}

.subscribe-desc {
  font-size: 11px;
  color: #a78bfa;
}

.subscribe-btn {
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
  color: #fff;
  border: none;
  padding: 8px 18px;
  border-radius: 18px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.5px;
}

.section {
  margin-bottom: 20px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  color: #e8e0f0;
}

.section-count {
  font-size: 11px;
  color: #7c3aed;
}

.official-badge {
  font-size: 10px;
  font-weight: 600;
  color: #7c3aed;
  background: rgba(124, 58, 237, 0.15);
  padding: 3px 8px;
  border-radius: 10px;
  border: 1px solid rgba(124, 58, 237, 0.3);
}

.notice-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.notice-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.notice-icon-wrap {
  width: 32px;
  height: 32px;
  background: rgba(124, 58, 237, 0.15);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notice-pin {
  display: block;
  width: 14px;
  height: 14px;
  border: 2px solid #a78bfa;
  border-radius: 50%;
  position: relative;
}

.notice-pin::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 4px;
  background: #a78bfa;
  border-radius: 50%;
}

.notice-body {
  flex: 1;
  min-width: 0;
}

.notice-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 3px;
}

.notice-title {
  font-size: 13px;
  color: #d4c8e8;
  line-height: 1.4;
}

.new-badge {
  background: #ef4444;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

.notice-date {
  font-size: 11px;
  color: #6b5b8a;
}

.post-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 10px;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.post-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.post-avatar-letter {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
}

.post-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.post-member {
  font-size: 14px;
  font-weight: 600;
  color: #e8e0f0;
}

.post-time {
  font-size: 11px;
  color: #6b5b8a;
}

.post-more {
  width: 18px;
  height: 18px;
  position: relative;
  cursor: pointer;
}

.post-more::before,
.post-more::after,
.post-more {
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-more::before {
  content: '';
  width: 3px;
  height: 3px;
  background: #6b5b8a;
  border-radius: 50%;
  box-shadow: 0 5px 0 #6b5b8a, 0 -5px 0 #6b5b8a;
}

.post-content {
  font-size: 13px;
  color: #c4b5fd;
  line-height: 1.5;
  margin-bottom: 12px;
}

.post-footer {
  display: flex;
  align-items: center;
  gap: 18px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.post-action {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.post-heart {
  display: block;
  width: 14px;
  height: 14px;
  position: relative;
}

.post-heart::before,
.post-heart::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 12px;
  background: #6b5b8a;
  border-radius: 8px 8px 0 0;
}

.post-heart::before {
  left: 0;
  transform: rotate(-45deg);
  transform-origin: bottom right;
}

.post-heart::after {
  right: 0;
  transform: rotate(45deg);
  transform-origin: bottom left;
}

.post-comment-icon {
  display: block;
  width: 14px;
  height: 12px;
  border: 1.5px solid #6b5b8a;
  border-radius: 6px 6px 6px 2px;
  position: relative;
}

.post-comment-icon::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 3px;
  width: 0;
  height: 0;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 4px solid #6b5b8a;
}

.post-share-icon {
  display: block;
  width: 14px;
  height: 14px;
  position: relative;
}

.post-share-icon::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 4px;
  width: 6px;
  height: 6px;
  border: 1.5px solid #6b5b8a;
  border-radius: 50%;
}

.post-share-icon::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 4px;
  width: 6px;
  height: 6px;
  border: 1.5px solid #6b5b8a;
  border-radius: 50%;
}

.post-action-text {
  font-size: 11px;
  color: #6b5b8a;
}
</style>
