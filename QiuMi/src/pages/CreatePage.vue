<template>
  <div class="create-page">
    <div class="header">
      <button class="back-btn" @click="$router.push('/')">← 返回</button>
      <h2>✨ 创建你的角色</h2>
    </div>

    <div class="form-container">
      <div class="step" v-if="step === 1">
        <h3>👤 基本信息</h3>

        <div class="form-group">
          <label>你的姓名</label>
          <input v-model="playerName" placeholder="输入你的名字" />
        </div>

        <div class="form-group">
          <label>男友对你的称呼</label>
          <input v-model="playerNickname" placeholder="例如：宝宝、亲爱的" />
        </div>

        <div class="form-group">
          <label>年龄</label>
          <input v-model.number="playerAge" type="number" min="18" max="40" placeholder="18+" />
        </div>

        <button class="btn btn-primary" @click="step = 2" :disabled="!canProceed1">
          下一步 →
        </button>
      </div>

      <div class="step" v-if="step === 2">
        <h3>💼 选择你的身份</h3>
        <p class="step-desc">不同身份会影响初始剧情和事件</p>

        <div class="identity-grid">
          <div
            v-for="id in identities"
            :key="id.id"
            class="identity-card"
            :class="{ selected: selectedIdentity === id.id }"
            @click="selectedIdentity = id.id"
          >
            <span class="id-icon">{{ id.icon }}</span>
            <span class="id-name">{{ id.name }}</span>
            <span class="id-desc">{{ id.desc }}</span>
          </div>
        </div>

        <div class="step-actions">
          <button class="btn btn-ghost" @click="step = 1">← 上一步</button>
          <button class="btn btn-primary" @click="step = 3" :disabled="!selectedIdentity">
            下一步 →
          </button>
        </div>
      </div>

      <div class="step" v-if="step === 3">
        <h3>💕 选择你的男友</h3>
        <p class="step-desc">选择一位时代峰峻男爱豆</p>

        <div class="group-tabs">
          <button
            v-for="g in groups"
            :key="g.key"
            class="group-tab"
            :class="{ active: activeGroup === g.key }"
            @click="activeGroup = g.key"
          >
            {{ g.label }}
          </button>
        </div>

        <div class="member-grid">
          <div
            v-for="m in currentMembers"
            :key="m.id"
            class="member-card"
            :class="{ selected: selectedBoyfriend === m.id }"
            @click="selectedBoyfriend = m.id"
          >
            <span class="member-name">{{ m.name }}</span>
            <span class="member-group">{{ m.group }}</span>
            <span class="member-pos">{{ m.position }}</span>
          </div>
        </div>

        <div class="form-group" v-if="selectedBoyfriend">
          <label>你对他的称呼</label>
          <input v-model="boyfriendCallName" placeholder="例如：欧巴、哥哥、老公" />
        </div>

        <div class="step-actions">
          <button class="btn btn-ghost" @click="step = 2">← 上一步</button>
          <button class="btn btn-primary" @click="step = 4" :disabled="!canProceed3">
            下一步 →
          </button>
        </div>
      </div>

      <div class="step" v-if="step === 4">
        <h3>📋 确认信息</h3>

        <div class="confirm-card">
          <div class="confirm-row">
            <span class="label">姓名</span>
            <span class="value">{{ playerName }}</span>
          </div>
          <div class="confirm-row">
            <span class="label">称呼</span>
            <span class="value">{{ playerNickname }}</span>
          </div>
          <div class="confirm-row">
            <span class="label">年龄</span>
            <span class="value">{{ playerAge }}岁</span>
          </div>
          <div class="confirm-row">
            <span class="label">身份</span>
            <span class="value">{{ identityName }}</span>
          </div>
          <div class="confirm-row">
            <span class="label">男友</span>
            <span class="value">{{ boyfriendName }}</span>
          </div>
          <div class="confirm-row">
            <span class="label">对他的称呼</span>
            <span class="value">{{ boyfriendCallName }}</span>
          </div>
        </div>

        <p class="secret-note">
          🔒 系统将随机生成：<br>
          感情基础 · 隐藏人设 · 保密原因<br>
          <small>这些将在游戏中逐步揭晓</small>
        </p>

        <div class="step-actions">
          <button class="btn btn-ghost" @click="step = 3">← 上一步</button>
          <button class="btn btn-start" @click="startGame">
            🎮 开始游戏
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { identities } from '@/data/characters/identities.js'
import { boyfriends } from '@/data/characters/boyfriends.js'
import { randomHiddenTrait, randomAffectionBasis, randomSecretReason } from '@/engine/RandomEngine.js'
import { gameEngine } from '@/engine/GameEngine.js'

const router = useRouter()

const step = ref(1)
const playerName = ref('')
const playerNickname = ref('')
const playerAge = ref(22)
const selectedIdentity = ref('')
const selectedBoyfriend = ref('')
const boyfriendCallName = ref('')
const activeGroup = ref('tnt')

const groups = [
  { key: 'tfboys', label: 'TFBOYS' },
  { key: 'tnt', label: 'TNT时代少年团' },
  { key: 'top', label: 'TOP登陆少年' },
  { key: 'tf_ing', label: 'TF-ing厂牌' },
  { key: 'solo', label: 'Solo艺人' }
]

const canProceed1 = computed(() => playerName.value && playerNickname.value && playerAge.value >= 18)
const canProceed3 = computed(() => selectedBoyfriend.value && boyfriendCallName.value)

const currentMembers = computed(() => {
  return boyfriends[activeGroup.value]?.members || []
})

const identityName = computed(() => {
  return identities.find(i => i.id === selectedIdentity.value)?.name || ''
})

const boyfriendName = computed(() => {
  for (const key of Object.keys(boyfriends)) {
    const found = boyfriends[key].members.find(m => m.id === selectedBoyfriend.value)
    if (found) return found.name
  }
  return ''
})

function getBoyfriendData() {
  for (const key of Object.keys(boyfriends)) {
    const found = boyfriends[key].members.find(m => m.id === selectedBoyfriend.value)
    if (found) return found
  }
  return null
}

function startGame() {
  const bf = getBoyfriendData()
  const trait = randomHiddenTrait()
  const basis = randomAffectionBasis()
  const reason = randomSecretReason()

  const playerData = {
    name: playerName.value,
    nickname: playerNickname.value,
    age: playerAge.value,
    identity: identityName.value,
    career: identityName.value
  }

  const boyfriendData = {
    name: bf.name,
    callName: boyfriendCallName.value,
    group: bf.group,
    realPersonality: bf.personality,
    hiddenTrait: trait.name,
    affectionBasis: basis.name,
    secretReason: reason
  }

  gameEngine.startGame(playerData, boyfriendData)
  router.push('/game')
}
</script>

<style scoped>
.create-page {
  width: 100%;
  max-width: 420px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  overflow-y: auto;
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.back-btn {
  background: none;
  border: none;
  color: #a0a0b8;
  font-size: 16px;
  cursor: pointer;
  font-family: inherit;
}

.header h2 {
  font-size: 18px;
  font-weight: 700;
}

.form-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.step h3 {
  font-size: 20px;
  margin-bottom: 8px;
}

.step-desc {
  font-size: 13px;
  color: #a0a0b8;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #a0a0b8;
  margin-bottom: 6px;
}

.form-group input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 15px;
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: #e94560;
}

.identity-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
}

.identity-card {
  padding: 14px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.identity-card:hover {
  background: rgba(255, 255, 255, 0.08);
}

.identity-card.selected {
  border-color: #e94560;
  background: rgba(233, 69, 96, 0.15);
}

.id-icon {
  font-size: 28px;
  display: block;
  margin-bottom: 6px;
}

.id-name {
  font-size: 14px;
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
}

.id-desc {
  font-size: 11px;
  color: #a0a0b8;
  display: block;
}

.group-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.group-tab {
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: #a0a0b8;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.group-tab.active {
  background: #e94560;
  border-color: #e94560;
  color: #fff;
}

.member-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;
}

.member-card {
  padding: 14px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.member-card:hover {
  background: rgba(255, 255, 255, 0.08);
}

.member-card.selected {
  border-color: #e94560;
  background: rgba(233, 69, 96, 0.15);
}

.member-name {
  font-size: 15px;
  font-weight: 600;
  display: block;
  margin-bottom: 4px;
}

.member-group {
  font-size: 11px;
  color: #a0a0b8;
  display: block;
}

.member-pos {
  font-size: 11px;
  color: #e94560;
  display: block;
  margin-top: 2px;
}

.step-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.step-actions .btn {
  flex: 1;
}

.btn {
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #e94560, #c23152);
  color: #fff;
}

.btn-ghost {
  background: rgba(255, 255, 255, 0.08);
  color: #a0a0b8;
}

.confirm-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.confirm-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.confirm-row:last-child {
  border-bottom: none;
}

.confirm-row .label {
  color: #a0a0b8;
  font-size: 14px;
}

.confirm-row .value {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}

.secret-note {
  text-align: center;
  font-size: 13px;
  color: #f5a623;
  line-height: 1.8;
  margin-bottom: 20px;
}

.secret-note small {
  color: #a0a0b8;
}

.btn-start {
  background: linear-gradient(135deg, #f5a623, #e94560);
  color: #fff;
  font-size: 17px;
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
}
</style>
