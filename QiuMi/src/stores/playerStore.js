import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const name = ref('')
  const nickname = ref('')
  const age = ref(22)
  const identity = ref('')
  const career = ref('')
  const isPregnant = ref(false)
  const pregnancyWeek = ref(0)
  const isMarried = ref(false)
  const hasChildren = ref(false)

  const profile = computed(() => ({
    name: name.value,
    nickname: nickname.value,
    age: age.value,
    identity: identity.value,
    career: career.value
  }))

  function setPlayer(data) {
    name.value = data.name || ''
    nickname.value = data.nickname || ''
    age.value = data.age || 22
    identity.value = data.identity || ''
    career.value = data.career || data.identity || ''
  }

  function setPregnant(val, week = 0) {
    isPregnant.value = val
    pregnancyWeek.value = week
  }

  function setMarried(val) {
    isMarried.value = val
  }

  function exportState() {
    return {
      name: name.value,
      nickname: nickname.value,
      age: age.value,
      identity: identity.value,
      career: career.value,
      isPregnant: isPregnant.value,
      pregnancyWeek: pregnancyWeek.value,
      isMarried: isMarried.value,
      hasChildren: hasChildren.value
    }
  }

  function importState(data) {
    name.value = data.name
    nickname.value = data.nickname
    age.value = data.age
    identity.value = data.identity
    career.value = data.career
    isPregnant.value = data.isPregnant
    pregnancyWeek.value = data.pregnancyWeek
    isMarried.value = data.isMarried
    hasChildren.value = data.hasChildren
  }

  return {
    name, nickname, age, identity, career,
    isPregnant, pregnancyWeek, isMarried, hasChildren,
    profile,
    setPlayer, setPregnant, setMarried,
    exportState, importState
  }
})
