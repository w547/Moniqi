<template>
  <div class="home-screen">
    <div class="app-grid">
      <div class="app-icon" @click="openApp('phone')">
        <div class="icon-bg icon-phone">
          <div class="glyph glyph-phone"></div>
        </div>
        <span class="label">电话</span>
      </div>
      <div class="app-icon" @click="openApp('messages')">
        <div class="icon-bg icon-messages">
          <div class="glyph glyph-messages"></div>
        </div>
        <span class="label">短信</span>
        <span v-if="unreadSMS" class="badge">{{ unreadSMS }}</span>
      </div>
      <div class="app-icon" @click="openApp('album')">
        <div class="icon-bg icon-album">
          <div class="glyph glyph-album"></div>
        </div>
        <span class="label">相册</span>
      </div>
      <div class="app-icon" @click="openApp('redbook')">
        <div class="icon-bg icon-redbook">
          <div class="glyph glyph-redbook"></div>
        </div>
        <span class="label">小红书</span>
      </div>
      <div class="app-icon" @click="openApp('douyin')">
        <div class="icon-bg icon-douyin">
          <div class="glyph glyph-douyin"></div>
        </div>
        <span class="label">抖音</span>
      </div>
      <div class="app-icon" @click="openApp('bilibili')">
        <div class="icon-bg icon-bilibili">
          <div class="glyph glyph-bilibili"></div>
        </div>
        <span class="label">B站</span>
      </div>
      <div class="app-icon" @click="openApp('wechat')">
        <div class="icon-bg icon-wechat">
          <div class="glyph glyph-wechat"></div>
        </div>
        <span class="label">微信</span>
        <span v-if="unreadWechat" class="badge">{{ unreadWechat }}</span>
      </div>
      <div class="app-icon" @click="openApp('qq')">
        <div class="icon-bg icon-qq">
          <div class="glyph glyph-qq"></div>
        </div>
        <span class="label">QQ</span>
      </div>
      <div class="app-icon" @click="openApp('neteasemusic')">
        <div class="icon-bg icon-netease">
          <div class="glyph glyph-netease"></div>
        </div>
        <span class="label">网易云</span>
      </div>
      <div class="app-icon" @click="openApp('weibo')">
        <div class="icon-bg icon-weibo">
          <div class="glyph glyph-weibo"></div>
        </div>
        <span class="label">微博</span>
        <span v-if="unreadWeibo" class="badge">{{ unreadWeibo }}</span>
      </div>
      <div class="app-icon" @click="openApp('tfamily')">
        <div class="icon-bg icon-tfamily">
          <div class="glyph glyph-tfamily"></div>
        </div>
        <span class="label">T-FAMILY</span>
      </div>
      <div class="app-icon" @click="openApp('settings')">
        <div class="icon-bg icon-settings">
          <div class="glyph glyph-settings"></div>
        </div>
        <span class="label">设置</span>
      </div>
    </div>

    <div class="page-dots">
      <span class="dot active"></span>
      <span class="dot"></span>
    </div>

    <div class="dock">
      <div class="dock-item" @click="openApp('phone')">
        <div class="dock-icon-bg icon-phone">
          <div class="glyph glyph-phone"></div>
        </div>
      </div>
      <div class="dock-item" @click="openApp('messages')">
        <div class="dock-icon-bg icon-messages">
          <div class="glyph glyph-messages"></div>
        </div>
      </div>
      <div class="dock-item" @click="openApp('wechat')">
        <div class="dock-icon-bg icon-wechat">
          <div class="glyph glyph-wechat"></div>
        </div>
      </div>
      <div class="dock-item" @click="openApp('weibo')">
        <div class="dock-icon-bg icon-weibo">
          <div class="glyph glyph-weibo"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePhoneStore } from '@/stores/phoneStore.js'

const phoneStore = usePhoneStore()

const unreadWechat = computed(() => phoneStore.messages.filter(m => m.unread).length)
const unreadSMS = computed(() => 0)
const unreadWeibo = computed(() => phoneStore.notifications.filter(n => !n.read).length)

function openApp(app) {
  phoneStore.openApp(app)
}
</script>

<style scoped>
.home-screen {
  padding: 20px 18px 0;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  position: relative;
}

.app-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 10px;
  justify-items: center;
  padding-bottom: 16px;
}

.app-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}

.app-icon:active .icon-bg {
  transform: scale(0.88);
  filter: brightness(1.15);
}

.icon-bg {
  width: 60px;
  height: 60px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.18s;
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.3),
    0 1px 3px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  position: relative;
}

.icon-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.08) 100%);
  pointer-events: none;
}

.glyph {
  width: 30px;
  height: 30px;
  position: relative;
  z-index: 1;
}

.label {
  font-size: 11px;
  color: #fff;
  font-weight: 400;
  letter-spacing: 0.1px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  max-width: 70px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.badge {
  position: absolute;
  top: -4px;
  right: 6px;
  background: #ff3b30;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  z-index: 2;
  letter-spacing: 0;
  line-height: 1;
}

/* ============ Icon Background Gradients ============ */

.icon-phone {
  background: linear-gradient(160deg, #5ee85e 0%, #34c759 40%, #248a3d 100%);
}

.icon-messages {
  background: linear-gradient(160deg, #6df26d 0%, #34c759 40%, #1d7a30 100%);
}

.icon-album {
  background: linear-gradient(160deg, #ff9c5b 0%, #ff6b35 25%, #ffcc02 50%, #34c759 75%, #007aff 100%);
}

.icon-redbook {
  background: linear-gradient(160deg, #ff4057 0%, #e8223b 50%, #c41230 100%);
}

.icon-douyin {
  background: linear-gradient(160deg, #2a2a2a 0%, #111 40%, #fe2c55 70%, #ff0050 100%);
}

.icon-bilibili {
  background: linear-gradient(160deg, #ff80ab 0%, #fb7299 50%, #e8537a 100%);
}

.icon-wechat {
  background: linear-gradient(160deg, #5dfc5d 0%, #2dc100 50%, #1a8c00 100%);
}

.icon-qq {
  background: linear-gradient(160deg, #6db3ff 0%, #12b7f5 50%, #0d8bcc 100%);
}

.icon-netease {
  background: linear-gradient(160deg, #ff4040 0%, #d4302f 50%, #a82020 100%);
}

.icon-weibo {
  background: linear-gradient(160deg, #ff6b3d 0%, #ff8200 50%, #e06000 100%);
}

.icon-tfamily {
  background: linear-gradient(160deg, #c084fc 0%, #8b5cf6 50%, #6d28d9 100%);
}

.icon-settings {
  background: linear-gradient(160deg, #b0b0b8 0%, #8e8e93 50%, #636366 100%);
}

/* ============ CSS Glyph Icons ============ */

/* Phone */
.glyph-phone::before {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 18px;
  background: #fff;
  border-radius: 3px;
}
.glyph-phone::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 3px;
  background: #fff;
  border-radius: 1px;
}

/* Messages - speech bubble */
.glyph-messages {
  background: #fff;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  top: 2px;
  left: 2px;
}
.glyph-messages::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 6px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 7px solid #fff;
}

/* Album - flower/petal */
.glyph-album::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 6px;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
}
.glyph-album::after {
  content: '';
  position: absolute;
  top: 2px;
  right: 6px;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50% 50% 0 50%;
  transform: rotate(45deg);
}

/* RedBook - open book */
.glyph-redbook::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 4px;
  width: 10px;
  height: 22px;
  background: #fff;
  border-radius: 2px 4px 4px 2px;
}
.glyph-redbook::after {
  content: '';
  position: absolute;
  top: 2px;
  right: 4px;
  width: 10px;
  height: 22px;
  background: #fff;
  border-radius: 4px 2px 2px 4px;
}

/* Douyin - music note */
.glyph-douyin::before {
  content: '';
  position: absolute;
  top: 3px;
  right: 5px;
  width: 5px;
  height: 5px;
  background: #fff;
  border-radius: 50%;
}
.glyph-douyin::after {
  content: '';
  position: absolute;
  top: 3px;
  right: 5px;
  width: 3px;
  height: 20px;
  background: #fff;
  border-radius: 2px;
}

/* Bilibili - TV screen */
.glyph-bilibili::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 3px;
  width: 24px;
  height: 16px;
  background: #fff;
  border-radius: 3px;
}
.glyph-bilibili::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 4px;
  background: #fff;
  border-radius: 0 0 2px 2px;
}

/* WeChat - chat bubble with dots */
.glyph-wechat {
  background: #fff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  top: 3px;
  left: 3px;
}
.glyph-wechat::before {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 4px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 8px solid #fff;
}
.glyph-wechat::after {
  content: '';
  position: absolute;
  top: 8px;
  left: 6px;
  width: 4px;
  height: 4px;
  background: #2dc100;
  border-radius: 50%;
  box-shadow: 7px 0 0 #2dc100, 3.5px 6px 0 #2dc100;
}

/* QQ - penguin silhouette */
.glyph-qq::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
}
.glyph-qq::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 8px;
  background: #fff;
  border-radius: 0 0 7px 7px;
}

/* Netease Music - musical note */
.glyph-netease::before {
  content: '';
  position: absolute;
  top: 2px;
  right: 4px;
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
}
.glyph-netease::after {
  content: '';
  position: absolute;
  top: 2px;
  right: 4px;
  width: 3px;
  height: 22px;
  background: #fff;
  border-radius: 2px;
}

/* Weibo - eye shape */
.glyph-weibo::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 3px;
  width: 24px;
  height: 12px;
  border: 3px solid #fff;
  border-radius: 50%;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
}
.glyph-weibo::after {
  content: '';
  position: absolute;
  top: 11px;
  left: 11px;
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
}

/* T-FAMILY - star */
.glyph-tfamily {
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 18px solid #fff;
  position: relative;
  top: -2px;
}
.glyph-tfamily::after {
  content: '';
  position: absolute;
  top: 6px;
  left: -12px;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 18px solid #fff;
}

/* Settings - gear */
.glyph-settings {
  width: 22px;
  height: 22px;
  border: 3px solid #fff;
  border-radius: 50%;
  top: 1px;
  left: 1px;
}
.glyph-settings::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
}

/* ============ Page Dots ============ */

.page-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 6px 0 12px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  transition: background 0.3s;
}

.dot.active {
  background: rgba(255, 255, 255, 0.85);
}

/* ============ Dock ============ */

.dock {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: 28px;
  margin-top: auto;
  margin-bottom: 8px;
  box-shadow:
    0 0 0 0.5px rgba(255, 255, 255, 0.15),
    0 2px 12px rgba(0, 0, 0, 0.25);
}

.dock-item {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.dock-item:active .dock-icon-bg {
  transform: scale(0.85);
  filter: brightness(1.2);
}

.dock-icon-bg {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.18s;
  box-shadow:
    0 3px 8px rgba(0, 0, 0, 0.3),
    0 1px 2px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  position: relative;
}

.dock-icon-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.08) 100%);
  pointer-events: none;
}

.dock-icon-bg .glyph {
  width: 26px;
  height: 26px;
}
</style>
