<template>
  <div class="narrative-panel" v-if="narrative">
    <div class="narrative-vignette"></div>
    <div class="narrative-title">{{ narrative.title }}</div>
    <div class="narrative-divider"></div>
    <div class="narrative-text" v-html="formattedText"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { gameEngine } from '@/engine/GameEngine.js'

const narrative = computed(() => gameEngine.currentEvent)

const formattedText = computed(() => {
  if (!narrative.value) return ''
  return narrative.value.narrative.replace(/\n/g, '<br>')
})
</script>

<style scoped>
.narrative-panel {
  position: relative;
  margin: 16px 20px;
  padding: 28px 24px 24px;
  background: linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
  overflow: hidden;
  animation: narrativeFadeIn 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.narrative-vignette {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.5) 100%);
  pointer-events: none;
  z-index: 1;
}

.narrative-title {
  position: relative;
  z-index: 2;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #e94560;
  text-align: center;
  text-shadow: 0 0 20px rgba(233, 69, 96, 0.5), 0 0 40px rgba(233, 69, 96, 0.2);
  margin-bottom: 16px;
}

.narrative-divider {
  position: relative;
  z-index: 2;
  width: 48px;
  height: 2px;
  margin: 0 auto 20px;
  background: linear-gradient(90deg, transparent, rgba(233, 69, 96, 0.5), transparent);
  border-radius: 1px;
}

.narrative-text {
  position: relative;
  z-index: 2;
  font-size: 15px;
  color: rgba(220, 220, 230, 0.92);
  line-height: 2.1;
  letter-spacing: 0.03em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  max-width: 32em;
  word-break: break-all;
  animation: textReveal 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.15s both;
}

@keyframes narrativeFadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes textReveal {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
