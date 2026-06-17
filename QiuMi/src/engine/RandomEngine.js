const hiddenTraits = [
  { id: 'player', name: '海王', desc: '表面专一，实则广撒网' },
  { id: 'scumbag', name: '渣男', desc: '自私自利，不负责任' },
  { id: 'avoidant', name: '回避型', desc: '遇到问题就逃避冷暴力' },
  { id: 'workaholic', name: '事业狂魔', desc: '事业永远排第一' },
  { id: 'ac', name: '中央空调', desc: '对谁都温柔体贴' },
  { id: 'bi', name: '双性恋', desc: '隐藏的性取向' },
  { id: 'mommy', name: '妈宝男', desc: '什么都听妈妈的' },
  { id: 'jealous', name: '控制狂', desc: '极度缺乏安全感，控制欲强' }
]

const affectionBases = [
  { id: 'true_love', name: '真心相爱', desc: '他是真心喜欢你' },
  { id: 'mutual_benefit', name: '各取所需', desc: '互相利用的关系' },
  { id: 'interest', name: '利益交换', desc: '带有明确目的' },
  { id: 'deception', name: '欺骗', desc: '从一开始就是谎言' },
  { id: 'lonely', name: '寂寞消遣', desc: '只是排解孤独' },
  { id: 'rebound', name: '疗伤替代品', desc: '你是他前任的替代' }
]

const secretReasons = [
  '养成系偶像恋爱禁止条款',
  '公司强烈反对并要求保密',
  '事业上升期不能有绯闻',
  '害怕伤害长情养成系粉丝',
  '团体发展考虑，不能影响队友',
  '恋爱状态不稳定，不确定能否长久',
  '家人反对，需要时间说服',
  '合约中有明确禁止恋爱条款'
]

export function randomHiddenTrait() {
  return hiddenTraits[Math.floor(Math.random() * hiddenTraits.length)]
}

export function randomAffectionBasis() {
  return affectionBases[Math.floor(Math.random() * affectionBases.length)]
}

export function randomSecretReason() {
  return secretReasons[Math.floor(Math.random() * secretReasons.length)]
}

export function chance(probability) {
  return Math.random() * 100 < probability
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
