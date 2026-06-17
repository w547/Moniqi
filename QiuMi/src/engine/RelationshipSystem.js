import { chance, randomPick } from './RandomEngine.js'

export class RelationshipSystem {
  constructor() {
    this.reset()
  }

  reset() {
    this.status = 'dating'
    this.affectionLevel = 50
    this.trustLevel = 50
    this.cheatingRisk = 0
    this.hasCheated = false
    this.proposed = false
    this.married = false
    this.divorced = false
    this.breakupCount = 0
  }

  updateAffection(delta) {
    this.affectionLevel = Math.max(0, Math.min(100, this.affectionLevel + delta))
  }

  updateTrust(delta) {
    this.trustLevel = Math.max(0, Math.min(100, this.trustLevel + delta))
  }

  increaseCheatingRisk() {
    this.cheatingRisk += randomPick([5, 10, 15])
    if (this.cheatingRisk >= 100 && chance(50)) {
      this.hasCheated = true
      this.cheatingRisk = 0
      return true
    }
    return false
  }

  canPropose(round) {
    return round >= 30 && this.affectionLevel >= 70 && !this.married
  }

  propose() {
    this.proposed = true
    this.status = 'engaged'
  }

  marry() {
    this.married = true
    this.status = 'married'
  }

  divorce() {
    this.divorced = true
    this.married = false
    this.status = 'divorced'
  }

  breakup() {
    this.breakupCount++
    this.status = 'broken_up'
  }

  reconcile() {
    this.status = 'dating'
  }

  exportState() {
    return {
      status: this.status,
      affectionLevel: this.affectionLevel,
      trustLevel: this.trustLevel,
      cheatingRisk: this.cheatingRisk,
      hasCheated: this.hasCheated,
      proposed: this.proposed,
      married: this.married,
      divorced: this.divorced,
      breakupCount: this.breakupCount
    }
  }

  importState(data) {
    this.status = data.status
    this.affectionLevel = data.affectionLevel
    this.trustLevel = data.trustLevel
    this.cheatingRisk = data.cheatingRisk
    this.hasCheated = data.hasCheated
    this.proposed = data.proposed
    this.married = data.married
    this.divorced = data.divorced
    this.breakupCount = data.breakupCount
  }
}
