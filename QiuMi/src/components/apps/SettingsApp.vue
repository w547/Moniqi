<template>
  <div class="app-container">
    <div class="status-bar">
      <span class="status-time">9:41</span>
      <span class="status-icons">
        <span class="signal-icon"></span>
        <span class="wifi-icon"></span>
        <span class="battery-icon"></span>
      </span>
    </div>

    <div class="app-header">
      <div class="header-left" @click="close">
        <span class="back-arrow"></span>
      </div>
      <div class="header-center">
        <span class="header-title">设置</span>
      </div>
      <div class="header-right"></div>
    </div>

    <div class="app-content">
      <div class="section-label">数据管理</div>
      <div class="setting-group">
        <div class="setting-item" @click="saveGame">
          <div class="setting-icon icon-export">
            <span class="glyph-export"></span>
          </div>
          <span class="setting-text">导出存档</span>
          <span class="chevron"></span>
        </div>
        <div class="setting-divider"></div>
        <div class="setting-item" @click="showLoad = true">
          <div class="setting-icon icon-import">
            <span class="glyph-import"></span>
          </div>
          <span class="setting-text">读取存档</span>
          <span class="chevron"></span>
        </div>
      </div>

      <div class="section-label">关于</div>
      <div class="setting-group">
        <div class="setting-item">
          <div class="setting-icon icon-about">
            <span class="glyph-about"></span>
          </div>
          <span class="setting-text">关于本游戏</span>
          <span class="chevron"></span>
        </div>
        <div class="setting-divider"></div>
        <div class="setting-item">
          <div class="setting-icon icon-version">
            <span class="glyph-version"></span>
          </div>
          <span class="setting-text">版本号</span>
          <span class="setting-value">1.0.0</span>
        </div>
      </div>
    </div>

    <div v-if="showSave" class="modal-overlay" @click.self="showSave = false">
      <div class="modal-panel">
        <div class="modal-header">
          <span class="modal-title">导出存档</span>
          <span class="modal-close" @click="showSave = false"></span>
        </div>
        <div class="modal-body">
          <div class="modal-label">复制以下存档数据：</div>
          <textarea readonly :value="saveJson" ref="saveTextarea" class="modal-textarea"></textarea>
          <button class="modal-btn primary" @click="copySave">复制到剪贴板</button>
          <button class="modal-btn secondary" @click="showSave = false">关闭</button>
        </div>
      </div>
    </div>

    <div v-if="showLoad" class="modal-overlay" @click.self="showLoad = false">
      <div class="modal-panel">
        <div class="modal-header">
          <span class="modal-title">读取存档</span>
          <span class="modal-close" @click="showLoad = false"></span>
        </div>
        <div class="modal-body">
          <div class="modal-label">粘贴存档数据：</div>
          <textarea v-model="loadData" placeholder="粘贴JSON存档..." class="modal-textarea"></textarea>
          <button class="modal-btn primary" @click="doLoad">确认读取</button>
          <button class="modal-btn secondary" @click="showLoad = false">取消</button>
          <p v-if="loadMsg" class="modal-msg">{{ loadMsg }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePhoneStore } from '@/stores/phoneStore.js'
import { gameEngine } from '@/engine/GameEngine.js'

const phoneStore = usePhoneStore()
const showSave = ref(false)
const showLoad = ref(false)
const loadData = ref('')
const loadMsg = ref('')
const saveTextarea = ref(null)

const saveJson = computed(() => {
  return JSON.stringify(gameEngine.exportFullSave(), null, 2)
})

function saveGame() {
  showSave.value = true
  showLoad.value = false
}

function copySave() {
  if (saveTextarea.value) {
    saveTextarea.value.select()
    document.execCommand('copy')
    loadMsg.value = '已复制！'
  }
}

function doLoad() {
  try {
    const data = JSON.parse(loadData.value)
    if (gameEngine.importFullSave(data)) {
      loadMsg.value = '✅ 读取成功！'
    } else {
      loadMsg.value = '❌ 存档版本不兼容'
    }
  } catch (e) {
    loadMsg.value = '❌ 格式错误'
  }
}

function close() { phoneStore.closeApp() }
</script>

<style scoped>
.app-container {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: #f2f2f7; z-index: 200; display: flex; flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.status-bar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 20px 4px; background: #f9f9f9; color: #1a1a1a;
  font-size: 11px; font-weight: 600;
}
.status-icons { display: flex; align-items: center; gap: 5px; }
.signal-icon {
  display: block; width: 14px; height: 10px;
  background: repeating-linear-gradient(to right, #1a1a1a 0px, #1a1a1a 2px, transparent 2px, transparent 3px);
  background-size: 14px 100%;
}
.wifi-icon {
  width: 12px; height: 10px;
  border: 1.5px solid #1a1a1a; border-radius: 50%;
  position: relative;
}
.wifi-icon::after {
  content: ''; position: absolute; top: -4px; left: 50%; transform: translateX(-50%);
  width: 4px; height: 4px; background: #1a1a1a; border-radius: 50%;
}
.battery-icon {
  width: 20px; height: 10px; border: 1.5px solid #1a1a1a; border-radius: 2px;
  position: relative; margin-left: 2px;
}
.battery-icon::before {
  content: ''; position: absolute; right: -3px; top: 50%; transform: translateY(-50%);
  width: 2px; height: 4px; background: #1a1a1a; border-radius: 0 1px 1px 0;
}
.battery-icon::after {
  content: ''; position: absolute; left: 1px; top: 1px; bottom: 1px;
  width: 12px; background: #1a1a1a; border-radius: 1px;
}

.app-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 14px 10px; background: #f9f9f9;
  border-bottom: 0.5px solid #e0e0e0;
}
.header-left { cursor: pointer; padding: 4px; }
.back-arrow {
  display: block; width: 10px; height: 10px;
  border-left: 2px solid #007aff; border-bottom: 2px solid #007aff;
  transform: rotate(45deg);
}
.header-center { flex: 1; text-align: center; }
.header-title { font-size: 17px; font-weight: 700; color: #1a1a1a; }
.header-right { width: 28px; }

.app-content { flex: 1; overflow-y: auto; padding-bottom: 20px; }

.section-label {
  font-size: 13px; font-weight: 600; color: #8e8e93;
  padding: 20px 16px 6px; text-transform: uppercase; letter-spacing: 0.5px;
}

.setting-group {
  background: #fff; margin: 0 16px; border-radius: 12px; overflow: hidden;
}

.setting-item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px; cursor: pointer;
  transition: background 0.15s;
}
.setting-item:active { background: #f5f5f5; }

.setting-divider {
  height: 0.5px; background: #e5e5ea;
  margin-left: 56px;
}

.setting-icon {
  width: 30px; height: 30px; border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.icon-export { background: #007aff; }
.icon-import { background: #34c759; }
.icon-about { background: #ff9500; }
.icon-version { background: #8e8e93; }

.glyph-export {
  display: block; width: 14px; height: 14px; position: relative;
}
.glyph-export::before {
  content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 0; height: 0;
  border-left: 5px solid transparent; border-right: 5px solid transparent;
  border-bottom: 7px solid #fff;
}
.glyph-export::after {
  content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 10px; height: 4px; background: #fff; border-radius: 1px;
}

.glyph-import {
  display: block; width: 14px; height: 14px; position: relative;
}
.glyph-import::before {
  content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 0; height: 0;
  border-left: 5px solid transparent; border-right: 5px solid transparent;
  border-top: 7px solid #fff;
}
.glyph-import::after {
  content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 10px; height: 4px; background: #fff; border-radius: 1px;
}

.glyph-about {
  display: block; width: 4px; height: 4px; background: #fff; border-radius: 50%;
  box-shadow: 0 -6px 0 #fff, 0 6px 0 #fff;
}

.glyph-version {
  display: block; width: 14px; height: 14px; position: relative;
}
.glyph-version::before {
  content: ''; position: absolute; top: 2px; left: 50%; transform: translateX(-50%);
  width: 8px; height: 4px; border: 1.5px solid #fff; border-radius: 2px 2px 0 0;
  border-bottom: none;
}
.glyph-version::after {
  content: ''; position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%);
  width: 12px; height: 6px; border: 1.5px solid #fff; border-radius: 2px;
}

.setting-text { flex: 1; font-size: 15px; font-weight: 500; color: #1a1a1a; }

.setting-value { font-size: 15px; color: #8e8e93; }

.chevron {
  display: block; width: 7px; height: 7px;
  border-right: 1.5px solid #c7c7cc; border-top: 1.5px solid #c7c7cc;
  transform: rotate(45deg); flex-shrink: 0;
}

.modal-overlay {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4); z-index: 300;
  display: flex; align-items: center; justify-content: center;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-panel {
  width: 300px; background: #fff; border-radius: 14px;
  overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.2);
  animation: slideUp 0.25s ease;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  display: flex; align-items: center; justify-content: center;
  padding: 16px 20px 12px; position: relative;
  border-bottom: 0.5px solid #e5e5ea;
}
.modal-title { font-size: 17px; font-weight: 700; color: #1a1a1a; }
.modal-close {
  position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
  width: 24px; height: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.modal-close::before, .modal-close::after {
  content: ''; position: absolute; width: 16px; height: 1.5px; background: #8e8e93; border-radius: 1px;
}
.modal-close::before { transform: rotate(45deg); }
.modal-close::after { transform: rotate(-45deg); }

.modal-body { padding: 16px 20px 20px; }
.modal-label { font-size: 13px; color: #8e8e93; margin-bottom: 8px; }

.modal-textarea {
  width: 100%; height: 120px; padding: 10px 12px;
  border: 1px solid #e0e0e0; border-radius: 10px;
  font-size: 11px; font-family: 'SF Mono', 'Menlo', 'Consolas', monospace;
  resize: vertical; background: #f9f9f9; color: #1a1a1a;
  box-sizing: border-box; outline: none;
}
.modal-textarea:focus { border-color: #007aff; }

.modal-btn {
  display: block; width: 100%; padding: 11px 0; margin-top: 10px;
  border: none; border-radius: 10px; font-size: 15px; font-weight: 600;
  cursor: pointer; font-family: inherit; transition: opacity 0.15s;
}
.modal-btn:active { opacity: 0.7; }
.modal-btn.primary { background: #007aff; color: #fff; }
.modal-btn.secondary { background: #f2f2f7; color: #1a1a1a; }

.modal-msg { text-align: center; margin-top: 10px; font-size: 13px; color: #1a1a1a; }
</style>
