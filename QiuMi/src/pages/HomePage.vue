<template>
  <div class="home-page">
    <div class="title-area">
      <div class="subtitle">🏢 时代峰峻 · 楼娱</div>
      <h1 class="main-title">👰 嫂子模拟器</h1>
      <p class="tagline">在聚光灯照不到的角落<br>体验一段秘密恋情的酸甜苦辣</p>
    </div>

    <div class="menu-buttons">
      <button class="btn btn-primary" @click="newGame">
        ✨ 开始新游戏
      </button>
      <button class="btn btn-secondary" @click="loadGame">
        📂 读取存档
      </button>
      <button class="btn btn-ghost" @click="showAbout = !showAbout">
        ℹ️ 关于
      </button>
    </div>

    <div v-if="showAbout" class="about-panel">
      <p>🎮 <b>嫂子模拟器</b> v0.1.0</p>
      <p>沉浸式体验内娱爱豆秘密女友的日常</p>
      <p>⚠️ 本游戏纯属虚构</p>
      <p>所有角色设定基于公开信息</p>
    </div>

    <div v-if="showLoad" class="load-panel">
      <h3>📂 读取存档</h3>
      <p>请粘贴之前导出的存档数据：</p>
      <textarea v-model="saveData" placeholder="粘贴JSON存档数据..."></textarea>
      <div class="load-actions">
        <button class="btn btn-primary" @click="confirmLoad">确认读取</button>
        <button class="btn btn-ghost" @click="showLoad = false">取消</button>
      </div>
      <p v-if="loadError" class="error">{{ loadError }}</p>
    </div>

    <div class="footer">
      <p>📱 建议使用手机浏览以获得最佳体验</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { gameEngine } from '@/engine/GameEngine.js'

const router = useRouter()
const showAbout = ref(false)
const showLoad = ref(false)
const saveData = ref('')
const loadError = ref('')

function newGame() {
  router.push('/create')
}

function loadGame() {
  showLoad.value = true
  loadError.value = ''
}

function confirmLoad() {
  try {
    const data = JSON.parse(saveData.value)
    if (gameEngine.importFullSave(data)) {
      router.push('/game')
    } else {
      loadError.value = '存档版本不兼容'
    }
  } catch (e) {
    loadError.value = '存档数据格式错误，请检查'
  }
}
</script>

<style scoped>
.home-page {
  width: 100%;
  max-width: 420px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: #fff;
}

.title-area {
  text-align: center;
  margin-bottom: 48px;
}

.subtitle {
  font-size: 14px;
  color: #e94560;
  letter-spacing: 4px;
  margin-bottom: 12px;
}

.main-title {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(135deg, #e94560, #f5a623);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
}

.tagline {
  font-size: 15px;
  color: #a0a0b8;
  line-height: 1.8;
}

.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 280px;
}

.btn {
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.btn-primary {
  background: linear-gradient(135deg, #e94560, #c23152);
  color: #fff;
  box-shadow: 0 4px 15px rgba(233, 69, 96, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(233, 69, 96, 0.6);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-ghost {
  background: transparent;
  color: #a0a0b8;
}

.btn-ghost:hover {
  color: #fff;
}

.about-panel {
  margin-top: 24px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  text-align: center;
  font-size: 13px;
  color: #a0a0b8;
  line-height: 1.8;
}

.load-panel {
  margin-top: 24px;
  width: 100%;
  max-width: 320px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.load-panel h3 {
  margin-bottom: 12px;
  font-size: 16px;
}

.load-panel textarea {
  width: 100%;
  height: 120px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 12px;
  resize: vertical;
  font-family: monospace;
}

.load-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.load-actions .btn {
  flex: 1;
  padding: 10px;
  font-size: 14px;
}

.error {
  color: #e94560;
  font-size: 13px;
  margin-top: 8px;
}

.footer {
  margin-top: 48px;
  font-size: 12px;
  color: #555;
}
</style>
