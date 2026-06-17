<template>
  <div class="choice-panel" v-if="choices.length > 0">
    <div class="choice-label">请做出你的选择</div>
    <button
      v-for="(choice, index) in choices"
      :key="index"
      class="choice-btn"
      @click="selectChoice(index)"
    >
      <span class="choice-left-accent"></span>
      <span class="choice-letter">{{ letters[index] }}</span>
      <span class="choice-text">{{ choice.text }}</span>
      <span class="choice-arrow">›</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { gameEngine } from '@/engine/GameEngine.js'

const letters = ['A', 'B', 'C', 'D']

const choices = computed(() => {
  return gameEngine.currentEvent?.choices || []
})

function selectChoice(index) {
  gameEngine.handleChoice(index)
}
</script>

<style scoped>
.choice-panel {
  margin: 16px 20px;
  padding: 20px 18px;
  background: linear-gradient(180deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95));
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

.choice-label {
  font-size: 13px;
  font-weight: 500;
  color: rgba(200, 200, 215, 0.7);
  margin-bottom: 14px;
  letter-spacing: 0.06em;
  text-align: center;
  text-transform: uppercase;
}

.choice-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.01));
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.22, 0.61, 0.36, 1);
  text-align: left;
  font-family: inherit;
  overflow: hidden;
}

.choice-btn:last-child {
  margin-bottom: 0;
}

.choice-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(233, 69, 96, 0.08), rgba(233, 69, 96, 0.02));
  opacity: 0;
  transition: opacity 0.25s ease;
}

.choice-btn:hover {
  border-color: rgba(233, 69, 96, 0.3);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.03));
  transform: translateX(4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.choice-btn:hover::before {
  opacity: 1;
}

.choice-btn:active {
  transform: scale(0.98) translateX(2px);
  transition: all 0.1s ease;
  border-color: rgba(233, 69, 96, 0.5);
  background: linear-gradient(135deg, rgba(233, 69, 96, 0.15), rgba(233, 69, 96, 0.05));
}

.choice-left-accent {
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 3px;
  border-radius: 0 2px 2px 0;
  background: linear-gradient(180deg, rgba(233, 69, 96, 0.6), rgba(233, 69, 96, 0.2));
  opacity: 0;
  transition: opacity 0.25s ease;
}

.choice-btn:hover .choice-left-accent {
  opacity: 1;
}

.choice-letter {
  position: relative;
  z-index: 1;
  font-size: 13px;
  font-weight: 700;
  color: #e94560;
  min-width: 28px;
  height: 28px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(233, 69, 96, 0.2), rgba(233, 69, 96, 0.08));
  border: 1px solid rgba(233, 69, 96, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.25s ease;
}

.choice-btn:hover .choice-letter {
  background: radial-gradient(circle, rgba(233, 69, 96, 0.35), rgba(233, 69, 96, 0.15));
  border-color: rgba(233, 69, 96, 0.5);
  box-shadow: 0 0 12px rgba(233, 69, 96, 0.3);
}

.choice-text {
  position: relative;
  z-index: 1;
  flex: 1;
  font-size: 14px;
  color: rgba(220, 220, 230, 0.9);
  line-height: 1.6;
  letter-spacing: 0.02em;
}

.choice-arrow {
  position: relative;
  z-index: 1;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.15);
  transition: all 0.25s ease;
  flex-shrink: 0;
}

.choice-btn:hover .choice-arrow {
  color: rgba(233, 69, 96, 0.6);
  transform: translateX(2px);
}
</style>
