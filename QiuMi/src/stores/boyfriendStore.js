import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBoyfriendStore = defineStore('boyfriend', () => {
  const name = ref('')
  const callName = ref('')
  const group = ref('')
  const realPersonality = ref('')
  const hiddenTrait = ref('')
  const affectionBasis = ref('')
  const secretReason = ref('')
  const relationshipLevel = ref(1)
  const isRevealed = ref(false)

  const profile = computed(() => ({
    name: name.value,
    callName: callName.value,
    group: group.value,
    realPersonality: realPersonality.value,
    hiddenTrait: hiddenTrait.value,
    affectionBasis: affectionBasis.value,
    secretReason: secretReason.value
  }))

  function setBoyfriend(data) {
    name.value = data.name || ''
    callName.value = data.callName || ''
    group.value = data.group || ''
    realPersonality.value = data.realPersonality || ''
    hiddenTrait.value = data.hiddenTrait || ''
    affectionBasis.value = data.affectionBasis || ''
    secretReason.value = data.secretReason || ''
  }

  function revealTrait() {
    isRevealed.value = true
  }

  function exportState() {
    return {
      name: name.value,
      callName: callName.value,
      group: group.value,
      realPersonality: realPersonality.value,
      hiddenTrait: hiddenTrait.value,
      affectionBasis: affectionBasis.value,
      secretReason: secretReason.value,
      relationshipLevel: relationshipLevel.value,
      isRevealed: isRevealed.value
    }
  }

  function importState(data) {
    name.value = data.name
    callName.value = data.callName
    group.value = data.group
    realPersonality.value = data.realPersonality
    hiddenTrait.value = data.hiddenTrait
    affectionBasis.value = data.affectionBasis
    secretReason.value = data.secretReason
    relationshipLevel.value = data.relationshipLevel
    isRevealed.value = data.isRevealed
  }

  return {
    name, callName, group, realPersonality, hiddenTrait,
    affectionBasis, secretReason, relationshipLevel, isRevealed,
    profile,
    setBoyfriend, revealTrait,
    exportState, importState
  }
})
