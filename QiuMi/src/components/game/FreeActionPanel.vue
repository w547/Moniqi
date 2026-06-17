<template>
  <div class="free-action-panel">
    <div class="fa-header">
      <span class="fa-title">自由行动</span>
      <div class="fa-ap-counter">
        <span class="fa-ap-label">行动点</span>
        <span class="fa-ap-dots">
          <span
            v-for="i in maxAP"
            :key="i"
            class="fa-ap-dot"
            :class="{ active: i <= remaining }"
          ></span>
        </span>
      </div>
    </div>
    <div class="fa-grid">
      <button
        v-for="action in actions"
        :key="action.id"
        class="fa-btn"
        :disabled="remaining <= 0"
        @click="doAction(action.id)"
      >
        <span class="fa-icon-area">
          <span class="fa-icon">{{ action.icon }}</span>
        </span>
        <span class="fa-label">{{ action.label }}</span>
      </button>
    </div>
    <button class="end-fa-btn" @click="endFreeActions">
      <span class="end-fa-btn-text">结束自由行动</span>
      <span class="end-fa-btn-sub">进入事件阶段</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { gameEngine } from '@/engine/GameEngine.js'

const actions = computed(() => gameEngine.getFreeActions())
const remaining = computed(() => gameEngine.freeActionsRemaining)
const maxAP = computed(() => gameEngine.maxFreeActions || 4)

function doAction(actionId) {
  gameEngine.executeFreeAction(actionId)
}

function endFreeActions() {
  gameEngine.endFreeActions()
}
</script>

<style scoped>
.free-action-panel {
  margin: 16px 20px;
  padding: 20px 18px;
  background: linear-gradient(180deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95));
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

.fa-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.fa-title {
  font-size: 15px;
  font-weight: 600;
  color: rgba(220, 220, 230, 0.9);
  letter-spacing: 0.04em;
}

.fa-ap-counter {
  display: flex;
  align-items: center;
  gap: 8px;
}

.fa-ap-label {
  font-size: 11px;
  color: rgba(200, 200, 215, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.fa-ap-dots {
  display: flex;
  gap: 5px;
}

.fa-ap-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.fa-ap-dot.active {
  background: #e94560;
  box-shadow: 0 0 8px rgba(233, 69, 96, 0.5);
  animation: dotPulse 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
}

@keyframes dotPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.4); }
  100% { transform: scale(1); }
}

.fa-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}

.fa-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.01));
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.22, 0.61, 0.36, 1);
  font-family: inherit;
}

.fa-btn:hover:not(:disabled) {
  border-color: rgba(233, 69, 96, 0.3);
  background: linear-gradient(180deg, rgba(233, 69, 96, 0.1), rgba(233, 69, 96, 0.03));
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.fa-btn:active:not(:disabled) {
  transform: scale(0.95);
  transition: all 0.1s ease;
}

.fa-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.fa-icon-area {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
}

.fa-btn:hover:not(:disabled) .fa-icon-area {
  background: linear-gradient(135deg, rgba(233, 69, 96, 0.15), rgba(233, 69, 96, 0.05));
  border-color: rgba(233, 69, 96, 0.2);
}

.fa-icon {
  font-size: 22px;
  line-height: 1;
}

.fa-label {
  font-size: 11px;
  color: rgba(200, 200, 215, 0.7);
  font-weight: 500;
  letter-spacing: 0.03em;
  text-align: center;
  line-height: 1.3;
}

.end-fa-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #e94560 0%, #c23152 50%, #8b1a3a 100%);
  color: #fff;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.25s cubic-bezier(0.22, 0.61, 0.36, 1);
  box-shadow:
    0 4px 20px rgba(233, 69, 96, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.end-fa-btn:hover {
  transform: translateY(-1px);
  box-shadow:
    0 6px 28px rgba(233, 69, 96, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.end-fa-btn:active {
  transform: scale(0.97);
  transition: all 0.1s ease;
}

.end-fa-btn-text {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.end-fa-btn-sub {
  font-size: 11px;
  font-weight: 400;
  opacity: 0.75;
  letter-spacing: 0.03em;
}
</style>
