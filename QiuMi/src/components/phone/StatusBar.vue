<template>
  <div class="status-bar">
    <span class="time">{{ timeDisplay }}</span>
    <div class="icons">
      <div class="signal-bars">
        <span v-for="i in 4" :key="i" class="bar" :class="'bar-' + i"></span>
      </div>
      <div class="wifi-icon">
        <span class="wifi-arc arc-1"></span>
        <span class="wifi-arc arc-2"></span>
        <span class="wifi-arc arc-3"></span>
      </div>
      <div class="battery">
        <div class="battery-body">
          <div class="battery-fill" :style="{ width: batteryLevel + '%' }"></div>
        </div>
        <div class="battery-cap"></div>
        <span class="battery-text">{{ batteryLevel }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore.js'

const gameStore = useGameStore()

const timeDisplay = computed(() => {
  if (!gameStore.gameTime) return '10:00'
  const d = new Date(gameStore.gameTime)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
})

const batteryLevel = computed(() => {
  return Math.max(10, 100 - (gameStore.round * 3) % 90)
})
</script>

<style scoped>
.status-bar {
  height: 44px;
  padding: 0 16px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
}

.time {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.3px;
  font-variant-numeric: tabular-nums;
}

.icons {
  display: flex;
  align-items: center;
  gap: 6px;
}

.signal-bars {
  display: flex;
  align-items: flex-end;
  gap: 1.5px;
  height: 12px;
}

.bar {
  width: 2.5px;
  background: #fff;
  border-radius: 0.5px;
}

.bar-1 { height: 4px; }
.bar-2 { height: 6px; }
.bar-3 { height: 9px; }
.bar-4 { height: 12px; }

.wifi-icon {
  width: 16px;
  height: 12px;
  position: relative;
}

.wifi-arc {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border: 1.5px solid transparent;
  border-top-color: #fff;
  border-radius: 50%;
}

.arc-1 {
  width: 4px;
  height: 4px;
  bottom: 4px;
}

.arc-2 {
  width: 8px;
  height: 8px;
  bottom: 2px;
}

.arc-3 {
  width: 12px;
  height: 12px;
  bottom: 0;
}

.battery {
  display: flex;
  align-items: center;
  gap: 1px;
}

.battery-body {
  width: 22px;
  height: 11px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 3px;
  padding: 1.5px;
  box-sizing: border-box;
}

.battery-fill {
  height: 100%;
  background: #34c759;
  border-radius: 1px;
}

.battery-cap {
  width: 2px;
  height: 4px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 0 1px 1px 0;
  margin-left: -1px;
}

.battery-text {
  font-size: 11px;
  font-weight: 500;
  color: #fff;
  text-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.5);
  margin-left: 2px;
}
</style>
