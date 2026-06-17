import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGameStore = defineStore('game', () => {
  const phase = ref('title')
  const round = ref(0)
  const gameTime = ref(null)
  const isPaused = ref(false)
  const saveSlots = ref([])

  const currentDate = computed(() => {
    if (!gameTime.value) return ''
    const d = new Date(gameTime.value)
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  })

  function startGame() {
    round.value = 1
    gameTime.value = new Date('2025-06-01T10:00:00').getTime()
    phase.value = 'prologue'
  }

  function nextRound() {
    round.value++
    const advance = Math.floor(Math.random() * 72 + 6) * 3600000
    gameTime.value += advance
    phase.value = 'free_action'
  }

  function setPhase(p) {
    phase.value = p
  }

  function advanceTime(hours) {
    gameTime.value += hours * 3600000
  }

  function exportSave() {
    return {
      version: '0.1.0',
      round: round.value,
      gameTime: gameTime.value,
      phase: phase.value,
      timestamp: Date.now()
    }
  }

  function importSave(data) {
    if (data.version !== '0.1.0') return false
    round.value = data.round
    gameTime.value = data.gameTime
    phase.value = data.phase
    return true
  }

  return {
    phase, round, gameTime, isPaused, saveSlots,
    currentDate,
    startGame, nextRound, setPhase, advanceTime,
    exportSave, importSave
  }
})
