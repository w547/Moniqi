import { useGameStore } from '@/stores/gameStore.js'
import { usePlayerStore } from '@/stores/playerStore.js'
import { useBoyfriendStore } from '@/stores/boyfriendStore.js'
import { usePhoneStore } from '@/stores/phoneStore.js'
import { getEventsByRound } from './EventManager.js'
import { PregnancySystem } from './PregnancySystem.js'
import { RelationshipSystem } from './RelationshipSystem.js'
import {
  generateWeiboFeed, generateWechatMessages, generateSMS,
  generateDouyinFeed, generateRedbookFeed, generateTFamilyFeed,
  generateBilibiliFeed
} from './PhoneSystem.js'
import { randomPick, chance } from './RandomEngine.js'

export class GameEngine {
  constructor() {
    this.pregnancy = new PregnancySystem()
    this.relationship = new RelationshipSystem()
    this.eventQueue = []
    this.currentEvent = null
    this.freeActionsRemaining = 3
    this.intimacyCooldown = 0
  }

  get stores() {
    return {
      game: useGameStore(),
      player: usePlayerStore(),
      boyfriend: useBoyfriendStore(),
      phone: usePhoneStore()
    }
  }

  startGame(playerData, boyfriendData) {
    const { game, player, boyfriend, phone } = this.stores

    player.setPlayer(playerData)
    boyfriend.setBoyfriend(boyfriendData)
    game.startGame()

    this.pregnancy.reset()
    this.relationship.reset()
    this.eventQueue = []
    this.currentEvent = null
    this.freeActionsRemaining = 3
    this.intimacyCooldown = 0

    phone.notifications = []
    phone.messages = []
    phone.calls = []

    game.setPhase('prologue')
  }

  beginRound() {
    const { game, phone } = this.stores
    this.freeActionsRemaining = 3
    this.currentEvent = null
    this.eventQueue = []

    this.syncNotifications()

    game.setPhase('free_action')
  }

  syncNotifications() {
    const { phone, boyfriend } = this.stores

    if (chance(60)) {
      phone.addNotification({
        app: '微博',
        title: '🔥 热搜推送',
        content: randomPick(['#某男团_回归_', '#机场_私生_', '#新歌_MV_', '#综艺_路透_'])
      })
    }

    if (chance(40)) {
      phone.addMessage({
        from: boyfriend.name,
        preview: randomPick(['在干嘛？', '想你了', '今天好累', '晚安💤']),
        unread: true
      })
    }

    if (chance(25)) {
      phone.addNotification({
        app: '微信',
        title: '新消息',
        content: randomPick(['闺蜜-小雨：出来玩！', '妈妈：吃饭了吗？', '同事：文件发你了'])
      })
    }

    if (chance(20)) {
      const sms = generateSMS()
      phone.addMessage({
        from: sms.sender,
        preview: sms.content.substring(0, 20) + '...',
        unread: true
      })
    }

    if (chance(15)) {
      phone.addCall({
        from: randomPick(['妈妈', '未知号码', '闺蜜-小雨']),
        type: 'missed',
        count: 1
      })
    }
  }

  getFreeActions() {
    return [
      { id: 'phone', label: '📱 查看手机', icon: '📱' },
      { id: 'work', label: '💼 处理工作', icon: '💼' },
      { id: 'rest', label: '😴 休息一下', icon: '😴' },
      { id: 'shop', label: '🛍️ 逛街购物', icon: '🛍️' },
      { id: 'exercise', label: '🏃 运动健身', icon: '🏃' },
      { id: 'study', label: '📚 学习充电', icon: '📚' },
      { id: 'visit', label: '🎬 探班男友', icon: '🎬' },
      { id: 'friends', label: '👯 约朋友', icon: '👯' }
    ]
  }

  executeFreeAction(actionId) {
    if (this.freeActionsRemaining <= 0) return null
    this.freeActionsRemaining--

    const { phone, boyfriend } = this.stores

    switch (actionId) {
      case 'phone':
        return { type: 'open_phone', message: '你拿起了手机...' }
      case 'work':
        return { type: 'narrative', message: '你专注地处理了一会儿工作。\n忙碌让你暂时忘记了那些烦恼。' }
      case 'rest':
        return { type: 'narrative', message: '你躺在床上休息了一会儿。\n难得的安静时光。' }
      case 'shop':
        return { type: 'narrative', message: '你去商场逛了逛。\n看到橱窗里好看的衣服，\n想着他穿起来会是什么样子。' }
      case 'exercise':
        return { type: 'narrative', message: '你去健身房出了一身汗。\n运动后的畅快感让人神清气爽。' }
      case 'study':
        return { type: 'narrative', message: '你静下心来学习了一会儿。\n提升自己总是没错的。' }
      case 'visit':
        phone.addNotification({
          app: '系统',
          title: '⚠️ 注意',
          content: '探班需要提前确认他的行程安排'
        })
        return { type: 'narrative', message: '你给他发了消息问能不能去探班。\n他回复：「今天拍摄排太满了，\n改天好吗？对不起...」' }
      case 'friends':
        return { type: 'narrative', message: '你和朋友约了顿饭。\n聊着聊着，朋友突然问：\n「你最近是不是谈恋爱了？\n感觉你整个人都在发光。」\n你笑了笑，没有正面回答。' }
      default:
        return { type: 'narrative', message: '你做了一些日常的事情。' }
    }
  }

  endFreeActions() {
    const { game } = this.stores
    game.setPhase('random_event')
    this.eventQueue = getEventsByRound(game.round)
    return this.nextEvent()
  }

  nextEvent() {
    if (this.eventQueue.length === 0) {
      return null
    }
    this.currentEvent = this.eventQueue.shift()
    return this.currentEvent
  }

  handleChoice(choiceIndex) {
    if (!this.currentEvent) return null
    const choice = this.currentEvent.choices[choiceIndex]
    if (!choice) return null

    const { game } = this.stores

    if (this.eventQueue.length > 0) {
      return this.nextEvent()
    }

    game.nextRound()
    this.beginRound()
    return { type: 'round_end' }
  }

  checkIntimacyAvailable() {
    const { game } = this.stores
    return game.round % 4 === 0 && this.intimacyCooldown <= 0
  }

  triggerIntimacy(usedProtection) {
    this.intimacyCooldown = 4
    const gotPregnant = this.pregnancy.intimacy(usedProtection)
    if (gotPregnant) {
      this.pregnancy.isPregnant = true
      this.pregnancy.week = 0
    }
    return {
      gotPregnant,
      narrative: usedProtection
        ? '你们做了安全措施。\n在这个特殊的关系里，\n每一步都要小心翼翼。'
        : '你们没有做任何措施。\n在那一刻，\n理智被抛到了脑后。'
    }
  }

  exportFullSave() {
    const { game, player, boyfriend, phone } = this.stores
    return {
      version: '0.1.0',
      timestamp: Date.now(),
      game: game.exportSave(),
      player: player.exportState(),
      boyfriend: boyfriend.exportState(),
      phone: phone.exportState(),
      pregnancy: this.pregnancy.exportState(),
      relationship: this.relationship.exportState()
    }
  }

  importFullSave(data) {
    if (data.version !== '0.1.0') return false
    const { game, player, boyfriend, phone } = this.stores
    game.importSave(data.game)
    player.importState(data.player)
    boyfriend.importState(data.boyfriend)
    phone.importState(data.phone)
    this.pregnancy.importState(data.pregnancy)
    this.relationship.importState(data.relationship)
    return true
  }
}

export const gameEngine = new GameEngine()
