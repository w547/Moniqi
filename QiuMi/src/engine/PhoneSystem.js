import { randomPick, chance } from './RandomEngine.js'

const weiboHotSearch = [
  '#时代少年团_新歌_', '#TOP登陆少年_舞台_', '#TFBOYS_合体_',
  '#某顶流_疑似恋爱_', '#私生饭_跟踪_', '#内娱_塌房预警_',
  '#养成系_恋爱禁止_', '#打歌节目_一位_', '#颁奖典礼_红毯_',
  '#粉丝接机_拥堵_', '#偶像_机场时尚_', '#新剧_路透_',
  '#综艺_录制_路透_', '#演唱会_抢票_', '#站姐_神图_'
]

const weiboPosts = [
  { user: '娱乐八掌柜', content: '据知情人士透露，某养成系男团成员近期频繁出入某小区，疑似有恋情？🤔', likes: 23456, comments: 8901 },
  { user: '星闻速递', content: '今日份机场✈️ 哥哥们状态太好了吧！', likes: 56789, comments: 12345 },
  { user: '追星少女小A', content: '有没有人觉得XX最近状态特别好？恋爱中的男人就是不一样🥰', likes: 3456, comments: 890 },
  { user: '饭圈观察员', content: '理性讨论：养成系偶像到底能不能谈恋爱？', likes: 12345, comments: 5678 }
]

const wechatContacts = [
  { name: '妈妈', group: '家人', lastMsg: '周末回来吃饭吗？', time: '昨天' },
  { name: '爸爸', group: '家人', lastMsg: '注意安全', time: '周一' },
  { name: '闺蜜-小雨', group: '朋友', lastMsg: '出来逛街！', time: '2小时前' },
  { name: '同事-阿琳', group: '工作', lastMsg: '明天会议资料准备好了吗', time: '5小时前' },
  { name: '大学同学-老王', group: '朋友', lastMsg: '好久不见，最近怎么样', time: '3天前' }
]

const smsTemplates = [
  { sender: '1069xxxx', content: '【温馨提示】您的快递已到达小区快递柜，取件码：xxxx' },
  { sender: '未知号码', content: '我知道你的秘密。你以为藏得很好吗？' },
  { sender: '银行', content: '您的账户于xx月xx日发生一笔消费，金额：xxx元' },
  { sender: '运营商', content: '尊敬的用户，您的套餐流量已不足1GB' }
]

const douyinVideos = [
  { title: '今日份直拍！哥哥跳舞太绝了🔥', author: '追星小达人', likes: '12.3w' },
  { title: '偶遇XX在咖啡店！真人好帅😍', author: '路人甲', likes: '8.9w' },
  { title: 'CP向｜那些年我们磕过的糖🍬', author: 'CP粉头子', likes: '5.6w' },
  { title: '分析贴：XX最近是不是恋爱了？', author: '八卦分析师', likes: '3.4w' }
]

const redbookPosts = [
  { title: '偶遇某男团成员！真人比照片帅100倍！', author: '小红薯123', likes: '2.3w', tags: ['#偶遇', '#男团', '#生图'] },
  { title: '如何判断你的爱豆有没有女朋友？', author: '饭圈观察员', likes: '1.8w', tags: ['#追星', '#恋爱'] },
  { title: '今日约会妆容分享💄', author: '美妆达人CC', likes: '5.6w', tags: ['#约会妆', '#日常妆'] }
]

export function generateWeiboFeed() {
  return {
    hotSearch: randomPick(weiboHotSearch),
    posts: [...weiboPosts].sort(() => Math.random() - 0.5).slice(0, 3)
  }
}

export function generateWechatMessages(boyfriendName) {
  const msgs = [...wechatContacts]
  if (boyfriendName && chance(50)) {
    msgs.unshift({
      name: boyfriendName,
      group: '💕',
      lastMsg: randomPick(['想你了', '今天辛苦了', '晚安', '明天能见面吗？', '刚录完节目']),
      time: '刚刚'
    })
  }
  return msgs
}

export function generateSMS() {
  return randomPick(smsTemplates)
}

export function generateDouyinFeed() {
  return [...douyinVideos].sort(() => Math.random() - 0.5).slice(0, 3)
}

export function generateRedbookFeed() {
  return [...redbookPosts].sort(() => Math.random() - 0.5).slice(0, 3)
}

export function generateTFamilyFeed(groupName) {
  return {
    group: groupName || '时代少年团',
    notices: [
      { title: '📢 六月行程安排已更新', isNew: true },
      { title: '📢 官方周边预售通知', isNew: false }
    ],
    posts: [
      { member: '成员A', content: '今天练习很充实💪', time: '2小时前', likes: 56789 },
      { member: '成员B', content: '晚安🌙', time: '5小时前', likes: 45678 }
    ]
  }
}

export function generateBilibiliFeed() {
  return {
    recommendations: [
      { title: '【4K】最新打歌舞台直拍', views: '89.2万' },
      { title: '【分析】某男团成员微表情解读', views: '45.6万' },
      { title: '【混剪】那些年我们追过的养成系', views: '123.4万' }
    ]
  }
}
