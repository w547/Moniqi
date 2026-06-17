import { chance } from './RandomEngine.js'

export class PregnancySystem {
  constructor() {
    this.reset()
  }

  reset() {
    this.isPregnant = false
    this.week = 0
    this.usedProtection = null
    this.testedPositive = false
    this.toldBoyfriend = false
    this.wentToHospital = false
    this.decision = null
  }

  intimacy(usedProtection) {
    this.usedProtection = usedProtection
    if (usedProtection) {
      return chance(1)
    }
    return chance(40)
  }

  checkSymptoms() {
    if (!this.isPregnant || this.week < 4) return null
    const symptoms = ['恶心反胃', '胸部胀痛', '疲劳嗜睡', '停经', '情绪波动']
    return symptoms.slice(0, Math.min(this.week, symptoms.length))
  }

  testPregnancy() {
    if (!this.isPregnant) return false
    return chance(90)
  }

  hospitalConfirm() {
    return this.isPregnant
  }

  exportState() {
    return {
      isPregnant: this.isPregnant,
      week: this.week,
      usedProtection: this.usedProtection,
      testedPositive: this.testedPositive,
      toldBoyfriend: this.toldBoyfriend,
      wentToHospital: this.wentToHospital,
      decision: this.decision
    }
  }

  importState(data) {
    this.isPregnant = data.isPregnant
    this.week = data.week
    this.usedProtection = data.usedProtection
    this.testedPositive = data.testedPositive
    this.toldBoyfriend = data.toldBoyfriend
    this.wentToHospital = data.wentToHospital
    this.decision = data.decision
  }
}
