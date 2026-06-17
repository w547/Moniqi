<template>
  <div class="prologue-panel">
    <div class="prologue-content">
      <div class="prologue-book-decoration">
        <span class="book-line"></span>
        <span class="book-diamond">◆</span>
        <span class="book-line"></span>
      </div>

      <div class="prologue-title">相遇 · 前置剧情</div>

      <div class="prologue-divider">
        <span class="divider-dot"></span>
        <span class="divider-line"></span>
        <span class="divider-dot"></span>
      </div>

      <div class="prologue-text">
        <p class="prologue-year">2025年，初夏。</p>
        <div class="prologue-section-divider"></div>

        <p>你是<span class="highlight">{{ playerStore.name }}</span>，</p>
        <p>一名<span class="highlight">{{ playerStore.identity }}</span>。</p>
        <div class="prologue-section-divider"></div>

        <p>他是<span class="highlight">{{ boyfriendStore.name }}</span>，</p>
        <p><span class="highlight">{{ boyfriendStore.group }}</span>的成员。</p>
        <div class="prologue-section-divider"></div>

        <p>你们的相遇，</p>
        <p>像所有故事的开头一样偶然——</p>

        <div class="meet-scene-card">
          <p class="meet-scene">{{ meetStory }}</p>
        </div>

        <p>从那天起，</p>
        <p>你的生活轨迹悄然改变。</p>
        <p>在聚光灯照不到的角落，</p>
        <p>一段秘密恋情悄然生长。</p>

        <div class="secret-card">
          <div class="secret-card-icon">🔒</div>
          <p class="secret-card-label">他不能公开恋情的原因</p>
          <p class="secret-card-text">{{ boyfriendStore.secretReason }}</p>
        </div>

        <div class="trait-card">
          <div class="trait-card-icon">💭</div>
          <p class="trait-card-text">他对你的感情，只有他自己真正知道……</p>
        </div>
      </div>

      <button class="start-btn" @click="confirmStart">
        <span class="start-btn-glow"></span>
        <span class="start-btn-text">确认并开始游戏</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/playerStore.js'
import { useBoyfriendStore } from '@/stores/boyfriendStore.js'
import { useGameStore } from '@/stores/gameStore.js'
import { gameEngine } from '@/engine/GameEngine.js'
import { identities } from '@/data/characters/identities.js'

const playerStore = usePlayerStore()
const boyfriendStore = useBoyfriendStore()
const gameStore = useGameStore()

const meetStory = computed(() => {
  const identity = identities.find(i => i.name === playerStore.identity)
  const scene = identity?.meetScene || '偶然的相遇'

  const stories = {
    '粉丝': `那天的${scene}上，\n你在人群中举着他的手幅。\n他走过时，目光在你身上\n多停留了一秒。\n就是那一秒，一切开始了。`,
    '经纪人': `作为${scene}的一部分，\n你每天都能见到他。\n那天加班到深夜，\n他递来一杯热咖啡：\n「辛苦了。」`,
    '演员/歌手同行': `在${scene}的后台，\n你们擦肩而过。\n他认出了你，主动打了招呼。\n后来你们在休息室聊了很久。`,
    '练习生': `在${scene}，\n你们经常擦肩而过。\n他会在你练习时偷偷看你，\n被发现后又慌忙移开视线。`,
    '造型师': `在${scene}里，\n你帮他整理衣领时，\n他突然说：\n「你的手好凉。」\n然后握住了你的手。`,
    '素人': `在${scene}，\n你不小心把咖啡洒在了他身上。\n慌乱道歉时，\n他摘下口罩笑了：\n「没关系，正好我也想换一件。」`,
    '制作人': `在${scene}里，\n你们因为一首歌的编曲争论起来。\n吵完之后，\n他突然说：\n「你很专业，我喜欢。」`,
    '财阀背景': `在${scene}上，\n你代表家族企业出席。\n他作为表演嘉宾登台。\n晚宴结束后，\n他主动走过来交换了联系方式。`
  }

  return stories[playerStore.identity] || `你们在${scene}相遇了。\n那是一个普通的下午，\n但对你来说，\n从此不再普通。`
})

function confirmStart() {
  gameEngine.beginRound()
}
</script>

<style scoped>
.prologue-panel {
  padding: 20px 16px;
  animation: prologueFadeIn 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
}

@keyframes prologueFadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.prologue-content {
  position: relative;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  border-radius: 20px;
  padding: 32px 22px 28px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow:
    0 8px 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
  overflow: hidden;
}

.prologue-book-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}

.book-line {
  width: 32px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(233, 69, 96, 0.4), transparent);
}

.book-diamond {
  font-size: 10px;
  color: rgba(233, 69, 96, 0.6);
}

.prologue-title {
  font-size: 18px;
  font-weight: 700;
  color: #e94560;
  text-align: center;
  letter-spacing: 0.08em;
  text-shadow: 0 0 20px rgba(233, 69, 96, 0.4);
  margin-bottom: 16px;
}

.prologue-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 28px;
}

.divider-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(233, 69, 96, 0.4);
}

.divider-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, rgba(233, 69, 96, 0.3), rgba(233, 69, 96, 0.1), rgba(233, 69, 96, 0.3));
}

.prologue-text {
  font-size: 15px;
  color: rgba(200, 200, 215, 0.85);
  line-height: 2.2;
  text-align: center;
  letter-spacing: 0.04em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

.prologue-text p {
  margin: 0;
}

.prologue-year {
  font-size: 16px;
  font-weight: 600;
  color: rgba(220, 220, 230, 0.9);
  letter-spacing: 0.06em;
}

.prologue-section-divider {
  width: 24px;
  height: 1px;
  margin: 16px auto;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
}

.highlight {
  color: #e94560;
  font-weight: 600;
  text-shadow: 0 0 8px rgba(233, 69, 96, 0.3);
}

.meet-scene-card {
  margin: 16px 0;
  padding: 18px 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  border-left: 2px solid rgba(233, 69, 96, 0.3);
}

.meet-scene {
  color: rgba(200, 200, 215, 0.75);
  font-style: italic;
  line-height: 2;
  white-space: pre-line;
  margin: 0;
}

.secret-card {
  margin: 20px 0 16px;
  padding: 18px 16px;
  background: linear-gradient(135deg, rgba(245, 166, 35, 0.08), rgba(245, 166, 35, 0.02));
  border: 1px solid rgba(245, 166, 35, 0.15);
  border-radius: 14px;
  text-align: center;
}

.secret-card-icon {
  font-size: 18px;
  margin-bottom: 8px;
}

.secret-card-label {
  font-size: 12px;
  color: rgba(245, 166, 35, 0.7);
  margin: 0 0 6px;
  letter-spacing: 0.05em;
}

.secret-card-text {
  font-size: 14px;
  color: #e94560;
  font-weight: 600;
  margin: 0;
}

.trait-card {
  margin: 16px 0;
  padding: 14px 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.005));
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 14px;
  text-align: center;
}

.trait-card-icon {
  font-size: 16px;
  margin-bottom: 6px;
}

.trait-card-text {
  font-size: 13px;
  color: rgba(180, 180, 195, 0.6);
  margin: 0;
  font-style: italic;
}

.start-btn {
  position: relative;
  width: 100%;
  padding: 16px;
  margin-top: 24px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #e94560 0%, #c23152 50%, #8b1a3a 100%);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.06em;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
  box-shadow:
    0 4px 24px rgba(233, 69, 96, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.start-btn-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow:
    0 8px 32px rgba(233, 69, 96, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.start-btn:hover .start-btn-glow {
  opacity: 1;
}

.start-btn:active {
  transform: scale(0.97);
  transition: all 0.1s ease;
}

.start-btn-text {
  position: relative;
  z-index: 1;
}
</style>
