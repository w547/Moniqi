<template>
  <div class="phone-frame">
    <div class="dynamic-island">
      <div class="dynamic-island-camera"></div>
    </div>

    <StatusBar />

    <div class="phone-screen" ref="screenRef">
      <NotificationBanner />

      <HomeScreen v-if="!phoneStore.activeApp && gameStore.phase !== 'prologue'" />

      <NarrativePanel v-if="showNarrative" />

      <ChoicePanel v-if="showChoices" />

      <FreeActionPanel v-if="gameStore.phase === 'free_action' && !phoneStore.activeApp" />

      <ProloguePanel v-if="gameStore.phase === 'prologue'" />

      <WeiboApp v-if="phoneStore.activeApp === 'weibo'" />
      <WeChatApp v-if="phoneStore.activeApp === 'wechat'" />
      <TFamilyApp v-if="phoneStore.activeApp === 'tfamily'" />
      <BilibiliApp v-if="phoneStore.activeApp === 'bilibili'" />
      <DouyinApp v-if="phoneStore.activeApp === 'douyin'" />
      <RedBookApp v-if="phoneStore.activeApp === 'redbook'" />
      <QQApp v-if="phoneStore.activeApp === 'qq'" />
      <NeteaseMusicApp v-if="phoneStore.activeApp === 'neteasemusic'" />
      <MessagesApp v-if="phoneStore.activeApp === 'messages'" />
      <PhoneApp v-if="phoneStore.activeApp === 'phone'" />
      <AlbumApp v-if="phoneStore.activeApp === 'album'" />
      <SettingsApp v-if="phoneStore.activeApp === 'settings'" />
    </div>

    <!-- 手机底部导航栏：返回 / Home / 多任务 -->
    <div class="phone-nav-bar">
      <button class="nav-btn" @click="goBack" title="返回">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M15 6L9 12L15 18" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="nav-btn nav-home" @click="goHome" title="主屏幕">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="#fff" stroke-width="2" fill="none"/>
          <path d="M3 16h18" stroke="#fff" stroke-width="2"/>
        </svg>
      </button>
      <button class="nav-btn" @click="showRecentApps" title="多任务">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="3" width="9" height="8" rx="1.5" stroke="#fff" stroke-width="2" fill="none"/>
          <rect x="13" y="3" width="9" height="8" rx="1.5" stroke="#fff" stroke-width="2" fill="none"/>
          <rect x="7" y="13" width="10" height="8" rx="1.5" stroke="#fff" stroke-width="2" fill="none"/>
        </svg>
      </button>
    </div>

    <div class="phone-home-bar">
      <div class="home-indicator"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore.js'
import { usePhoneStore } from '@/stores/phoneStore.js'
import StatusBar from './StatusBar.vue'
import HomeScreen from './HomeScreen.vue'
import NotificationBanner from './NotificationBanner.vue'
import NarrativePanel from '@/components/game/NarrativePanel.vue'
import ChoicePanel from '@/components/game/ChoicePanel.vue'
import FreeActionPanel from '@/components/game/FreeActionPanel.vue'
import ProloguePanel from '@/components/game/ProloguePanel.vue'
import WeiboApp from '@/components/apps/WeiboApp.vue'
import WeChatApp from '@/components/apps/WeChatApp.vue'
import TFamilyApp from '@/components/apps/TFamilyApp.vue'
import BilibiliApp from '@/components/apps/BilibiliApp.vue'
import DouyinApp from '@/components/apps/DouyinApp.vue'
import RedBookApp from '@/components/apps/RedBookApp.vue'
import QQApp from '@/components/apps/QQApp.vue'
import NeteaseMusicApp from '@/components/apps/NeteaseMusicApp.vue'
import MessagesApp from '@/components/apps/MessagesApp.vue'
import PhoneApp from '@/components/apps/PhoneApp.vue'
import AlbumApp from '@/components/apps/AlbumApp.vue'
import SettingsApp from '@/components/apps/SettingsApp.vue'

const gameStore = useGameStore()
const phoneStore = usePhoneStore()

function goBack() {
  if (phoneStore.activeApp) {
    phoneStore.closeApp()
  }
}

function goHome() {
  phoneStore.closeApp()
}

function showRecentApps() {
  // 回到主屏幕
  phoneStore.closeApp()
}

const showNarrative = computed(() => {
  return gameStore.phase === 'random_event' && !phoneStore.activeApp
})

const showChoices = computed(() => {
  return gameStore.phase === 'random_event' && !phoneStore.activeApp
})
</script>

<style scoped>
.phone-frame {
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 44px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow:
    0 0 0 1px #3a3a3c,
    0 0 0 3px #1c1c1e,
    0 0 0 5px #2c2c2e,
    0 0 0 6px #1a1a1c,
    0 0 0 8px #0d0d0d,
    0 0 0 9px #2a2a2c,
    0 0 0 10px #000,
    0 4px 12px rgba(0, 0, 0, 0.6),
    0 8px 28px rgba(0, 0, 0, 0.5),
    0 20px 60px rgba(0, 0, 0, 0.45),
    0 40px 100px rgba(0, 0, 0, 0.35);
}

.phone-frame::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 44px;
  padding: 2px;
  background: linear-gradient(
    165deg,
    #8e8e93 0%,
    #636366 8%,
    #aeaeb2 18%,
    #48484a 30%,
    #7d7d80 42%,
    #98989d 55%,
    #545456 68%,
    #8a8a8e 80%,
    #6e6e73 90%,
    #98989d 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 101;
}

.phone-frame::after {
  content: '';
  position: absolute;
  inset: 9px;
  border-radius: 36px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  pointer-events: none;
  z-index: 102;
}

.dynamic-island {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 126px;
  height: 34px;
  background: #000;
  border-radius: 20px;
  z-index: 100;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.dynamic-island-camera {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background: radial-gradient(
    circle at 35% 35%,
    #1a1a2e 0%,
    #0d0d1a 40%,
    #000 100%
  );
  border-radius: 50%;
  box-shadow:
    inset 0 0 2px rgba(20, 20, 60, 0.8),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

.phone-screen {
  flex: 1;
  background:
    linear-gradient(
      170deg,
      #1a1a2e 0%,
      #16213e 15%,
      #0f3460 30%,
      #1a1a2e 50%,
      #16213e 65%,
      #0f3460 85%,
      #1a1a2e 100%
    );
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  padding-top: 54px;
  box-shadow:
    inset 0 0 80px rgba(0, 0, 0, 0.35),
    inset 0 0 30px rgba(0, 0, 0, 0.25),
    inset 0 0 4px rgba(0, 0, 0, 0.4);
}

.phone-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #000;
  padding: 6px 0 4px;
  border-top: 0.5px solid rgba(255,255,255,0.08);
}

.nav-btn {
  background: none;
  border: none;
  color: #fff;
  width: 44px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.15s;
  padding: 0;
}

.nav-btn:active {
  background: rgba(255,255,255,0.12);
}

.nav-home {
  border: 1.5px solid rgba(255,255,255,0.2);
  border-radius: 50%;
  width: 38px;
  height: 38px;
}

.phone-home-bar {
  height: 34px;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.home-indicator {
  width: 134px;
  height: 5px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 100px;
  box-shadow:
    0 0 2px rgba(255, 255, 255, 0.15),
    0 0 6px rgba(255, 255, 255, 0.05);
}
</style>
