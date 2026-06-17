import { randomPick, chance } from './RandomEngine.js'

const eventPools = {
  dating: [
    {
      id: 'secret_date_car',
      title: '🚗 车内秘密约会',
      narrative: '他发来消息：「今晚老地方见？」\n\n你们常去的那条江边小路，\n深夜无人，只有车灯和星光。\n\n车窗起了一层薄雾，\n他把座椅调低，递来一杯热奶茶。\n「今天录节目累死了，\n但一想到能见到你，\n就又有了力气。」',
      choices: [
        { text: '靠在他肩上，安静地听他讲今天的事', effect: 'intimacy+1' },
        { text: '拿出准备好的小零食，喂他吃', effect: 'intimacy+1' },
        { text: '问他有没有和其他女艺人互动', effect: 'tension+1' },
        { text: '提议开车去更远的地方兜风', effect: 'adventure+1' }
      ]
    },
    {
      id: 'secret_date_home',
      title: '🏠 家中秘密相聚',
      narrative: '难得他有一天假期。\n\n你早早买好了食材，\n准备给他做一顿家常菜。\n\n门铃响了，他戴着口罩帽子，\n像个做贼的一样闪进来。\n「外面好像有人跟着我，\n我绕了三圈才敢上来。」',
      choices: [
        { text: '笑着说他是「大明星做贼记」', effect: 'mood+1' },
        { text: '担心地查看窗外有没有可疑的人', effect: 'anxiety+1' },
        { text: '拉他进厨房一起做饭', effect: 'intimacy+1' },
        { text: '让他先去洗个热水澡放松', effect: 'care+1' }
      ]
    },
    {
      id: 'secret_date_abroad',
      title: '✈️ 国外短暂自由',
      narrative: '他要去日本拍杂志，\n偷偷帮你订了同班飞机的票。\n\n在异国的街头，\n你们终于可以像普通情侣一样，\n手牵手走在阳光下。\n\n他给你买了一个冰淇淋，\n笑着说：「在这里，\n我不是什么偶像，\n只是你的男朋友。」',
      choices: [
        { text: '感动地抱住他', effect: 'intimacy+2' },
        { text: '拉着他去拍大头贴留念', effect: 'memory+1' },
        { text: '提醒他注意周围有没有中国粉丝', effect: 'caution+1' },
        { text: '提议去迪士尼乐园玩一整天', effect: 'fun+1' }
      ]
    }
  ],
  career: [
    {
      id: 'comeback',
      title: '🎵 回归期',
      narrative: '他的新专辑要发了。\n\n这意味着连续几周的打歌、\n综艺、签售、粉丝见面会……\n\n他已经三天没怎么睡觉了，\n但还是在凌晨给你发了消息：\n「还没睡吧？我刚录完音。」',
      choices: [
        { text: '让他早点休息，别太拼了', effect: 'care+1' },
        { text: '给他点一份营养外卖送到公司', effect: 'intimacy+1' },
        { text: '问他新歌是不是写给自己的', effect: 'flirt+1' },
        { text: '抱怨已经好几天没见到他了', effect: 'tension+1' }
      ]
    },
    {
      id: 'scandal',
      title: '📰 绯闻风波',
      narrative: '微博热搜突然出现了他的名字——\n\n#某TNT成员与女演员深夜聚餐#\n\n你点进去一看，\n是他在剧组杀青宴上的照片，\n旁边坐着女主角。\n\n他很快打来电话：\n「你看到了吗？别信那些，\n就是剧组聚餐，\n大家都在的。」',
      choices: [
        { text: '选择相信他，但心里还是有点不舒服', effect: 'trust+1,anxiety+1' },
        { text: '要求他详细解释当时的情况', effect: 'tension+1' },
        { text: '开玩笑说「那个女演员挺漂亮的」', effect: 'jealous+1' },
        { text: '直接挂掉电话，等他来哄', effect: 'drama+1' }
      ]
    }
  ],
  crisis: [
    {
      id: 'sasaeng',
      title: '🔍 私生饭跟踪',
      narrative: '你发现最近总有一辆白色面包车\n停在你家楼下。\n\n起初你没在意，\n直到有一天你出门时，\n那辆车缓缓跟了上来。\n\n你的手机收到陌生号码的短信：\n「我知道你是谁。\n离他远点，否则后果自负。」',
      choices: [
        { text: '立刻打电话告诉他这件事', effect: 'share+1' },
        { text: '报警处理', effect: 'safe+1' },
        { text: '暂时搬到朋友家住几天', effect: 'avoid+1' },
        { text: '回复短信警告对方', effect: 'confront+1' }
      ]
    },
    {
      id: 'company_pressure',
      title: '🏢 公司施压',
      narrative: '他的经纪人约你「喝咖啡」。\n\n咖啡厅里，经纪人开门见山：\n「我们知道你们的关系。\n他现在是事业最关键的时候，\n你应该明白，\n如果恋情曝光意味着什么。」\n\n经纪人推过来一张支票。',
      choices: [
        { text: '拒绝支票，表示不会影响他的事业', effect: 'dignity+1' },
        { text: '反问经纪人：他也同意这样做吗？', effect: 'doubt+1' },
        { text: '沉默不语，心里开始动摇', effect: 'shake+1' },
        { text: '直接离席，不想听下去', effect: 'anger+1' }
      ]
    }
  ],
  life: [
    {
      id: 'friend_gathering',
      title: '👯 闺蜜聚会',
      narrative: '好久不见的闺蜜约你出来。\n\n「你最近怎么神神秘秘的？\n是不是谈恋爱了？」\n\n闺蜜们七嘴八舌地八卦起来。\n\n你端着奶茶，\n不知道该怎么回答。',
      choices: [
        { text: '含糊地说「有一个在接触的人」', effect: 'vague+1' },
        { text: '直接否认，转移话题', effect: 'hide+1' },
        { text: '忍不住透露了一点点，但没说对方是谁', effect: 'share+1' },
        { text: '说对方是「圈外人」，不想多聊', effect: 'lie+1' }
      ]
    },
    {
      id: 'work_opportunity',
      title: '💼 工作机遇',
      narrative: '你收到了一个不错的工作机会，\n但需要去另一个城市半年。\n\n如果接受，你们将面临异地；\n如果拒绝，可能会错过职业发展。\n\n他看着你的录取通知，\n沉默了很久。',
      choices: [
        { text: '接受机会，相信异地也能维持感情', effect: 'ambition+1' },
        { text: '拒绝机会，觉得现在的关系更重要', effect: 'sacrifice+1' },
        { text: '问他能不能想办法调到那个城市工作', effect: 'depend+1' },
        { text: '提议先试试异地，不行再回来', effect: 'pragmatic+1' }
      ]
    }
  ],
  industry: [
    {
      id: 'award_show',
      title: '🏆 颁奖典礼',
      narrative: '今晚是年度音乐盛典。\n\n你坐在电视机前，\n看着他走上红毯，\n西装笔挺，笑容耀眼。\n\n当主持人宣布他获奖时，\n你比他还激动。\n\n他的获奖感言里说：\n「感谢所有支持我的人，\n特别是那个一直在背后\n默默陪伴我的人。」\n\n镜头扫过台下，\n粉丝们尖叫着，\n但你知道那句话是对谁说的。',
      choices: [
        { text: '眼眶湿润，给他发了一条祝贺消息', effect: 'touched+1' },
        { text: '截图他的获奖感言发朋友圈（仅自己可见）', effect: 'memory+1' },
        { text: '担心他那句话会不会引起粉丝猜测', effect: 'worry+1' },
        { text: '打电话给他，亲口说恭喜', effect: 'intimacy+1' }
      ]
    },
    {
      id: 'other_couple_exposed',
      title: '💥 同行恋情曝光',
      narrative: '微博又炸了——\n\n某顶流爱豆被拍到与素人女友同居，\n公司紧急发声明否认，\n但照片太清楚，粉丝已经炸锅。\n\n你刷着评论区，\n看到那些恶毒的留言，\n手心开始冒汗。\n\n他发来消息：\n「看到热搜了吗？\n最近我们更要小心了。」',
      choices: [
        { text: '表示理解，最近减少见面频率', effect: 'rational+1' },
        { text: '感到害怕，问他万一我们也曝光怎么办', effect: 'fear+1' },
        { text: '觉得这是个机会，也许可以顺势公开', effect: 'bold+1' },
        { text: '安慰他不要紧张，一切照常就好', effect: 'calm+1' }
      ]
    }
  ]
}

export function getRandomEvent(category) {
  const pool = eventPools[category]
  if (!pool || pool.length === 0) return null
  return randomPick(pool)
}

export function getEventsByRound(round) {
  const events = []

  if (round % 4 === 0) {
    events.push(getRandomEvent('dating'))
  }

  if (round % 3 === 0) {
    events.push(getRandomEvent('life'))
  }

  if (round % 5 === 0) {
    events.push(getRandomEvent('career'))
  }

  if (round % 7 === 0) {
    events.push(getRandomEvent('industry'))
  }

  if (round % 8 === 0 && chance(60)) {
    events.push(getRandomEvent('crisis'))
  }

  if (events.length === 0) {
    const categories = ['dating', 'life', 'career']
    events.push(getRandomEvent(randomPick(categories)))
  }

  return events.filter(Boolean)
}
