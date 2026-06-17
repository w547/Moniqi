import { randomPick, chance } from './RandomEngine.js'

// ===== 通用内容（不受身份影响）=====

const weiboHotSearch = [
  '#时代少年团_新歌_', '#TOP登陆少年_舞台_', '#TFBOYS_合体_',
  '#某顶流_疑似恋爱_', '#私生饭_跟踪_', '#内娱_塌房预警_',
  '#养成系_恋爱禁止_', '#打歌节目_一位_', '#颁奖典礼_红毯_',
  '#粉丝接机_拥堵_', '#偶像_机场时尚_', '#新剧_路透_',
  '#综艺_录制_路透_', '#演唱会_抢票_', '#站姐_神图_'
]

const smsTemplates = [
  { sender: '1069xxxx', content: '【温馨提示】您的快递已到达小区快递柜，取件码：xxxx' },
  { sender: '未知号码', content: '我知道你的秘密。你以为藏得很好吗？' },
  { sender: '银行', content: '您的账户于xx月xx日发生一笔消费，金额：xxx元' },
  { sender: '运营商', content: '尊敬的用户，您的套餐流量已不足1GB' }
]

// ===== 各身份对应的微信联系人 =====
const identityContacts = {
  fan: [
    { name: '妈妈', group: '家人', lastMsg: '周末回来吃饭吗？', time: '昨天' },
    { name: '闺蜜-小雨', group: '朋友', lastMsg: '今天抢到票了吗？', time: '2小时前' },
    { name: '站姐-小A', group: '朋友', lastMsg: '今天的图修好了！等下发你', time: '5小时前' },
    { name: '大学同学-老王', group: '朋友', lastMsg: '好久不见，最近怎么样', time: '3天前' }
  ],
  manager: [
    { name: '老板', group: '工作', lastMsg: '下个月的行程安排发我', time: '昨天' },
    { name: '艺人统筹-小周', group: '工作', lastMsg: '下周综艺录制时间确认', time: '2小时前' },
    { name: '品牌方-李总', group: '工作', lastMsg: '代言合同已发邮箱', time: '5小时前' },
    { name: '闺蜜-小雨', group: '朋友', lastMsg: '出来逛街！', time: '昨天' }
  ],
  actor: [
    { name: '经纪人-王姐', group: '工作', lastMsg: '明天试镜时间改到下午2点', time: '昨天' },
    { name: '化妆师-小美', group: '工作', lastMsg: '明天拍摄需要提前一小时', time: '2小时前' },
    { name: '闺蜜-小雨', group: '朋友', lastMsg: '新剧什么时候播？', time: '昨天' },
    { name: '剧组群', group: '工作', lastMsg: '明天通告已发', time: '3小时前' }
  ],
  trainee: [
    { name: '妈妈', group: '家人', lastMsg: '注意身体，别太累了', time: '昨天' },
    { name: '练习生-小莉', group: '朋友', lastMsg: '月末评价准备好了吗', time: '2小时前' },
    { name: '舞蹈老师', group: '工作', lastMsg: '明天加练，记得准时', time: '5小时前' },
    { name: '高中同学-小张', group: '朋友', lastMsg: '什么时候出道啊？', time: '1周前' }
  ],
  stylist: [
    { name: '经纪人-陈姐', group: '工作', lastMsg: '明天造型方案发你了', time: '昨天' },
    { name: '助理-小刘', group: '工作', lastMsg: '新到的服装已经整理好了', time: '2小时前' },
    { name: '闺蜜-小雨', group: '朋友', lastMsg: '周末去逛街吗？', time: '昨天' },
    { name: '同行-阿Ken', group: '朋友', lastMsg: '推荐一个超好用的发胶', time: '3天前' }
  ],
  civilian: [
    { name: '妈妈', group: '家人', lastMsg: '周末回来吃饭吗？', time: '昨天' },
    { name: '爸爸', group: '家人', lastMsg: '注意安全', time: '周一' },
    { name: '闺蜜-小雨', group: '朋友', lastMsg: '出来逛街！', time: '2小时前' },
    { name: '同事-阿琳', group: '工作', lastMsg: '明天会议资料准备好了吗', time: '5小时前' },
    { name: '大学同学-老王', group: '朋友', lastMsg: '好久不见，最近怎么样', time: '3天前' }
  ],
  producer: [
    { name: '音乐总监-张老师', group: '工作', lastMsg: '新歌demo听了吗？', time: '昨天' },
    { name: '编曲师-小赵', group: '工作', lastMsg: '副歌部分需要调整', time: '2小时前' },
    { name: '唱片公司-林总', group: '工作', lastMsg: '专辑发行时间确认', time: '昨天' },
    { name: '闺蜜-小雨', group: '朋友', lastMsg: '最近忙吗？', time: '3天前' }
  ],
  chaebol: [
    { name: '爸爸', group: '家人', lastMsg: '今晚慈善晚宴别忘了', time: '昨天' },
    { name: '秘书-张小姐', group: '工作', lastMsg: '明天的行程已安排好', time: '2小时前' },
    { name: '闺蜜-小雨', group: '朋友', lastMsg: '新开的餐厅去试试？', time: '昨天' },
    { name: '基金会-王理事', group: '工作', lastMsg: '下月捐赠仪式出席确认', time: '3天前' }
  ]
}

// ===== 各身份对应的微博帖子 =====
const identityWeiboPosts = {
  fan: [
    { user: '娱乐八掌柜', content: '据知情人士透露，某养成系男团成员近期频繁出入某小区，疑似有恋情？', likes: 23456, comments: 8901 },
    { user: '星闻速递', content: '今日份机场✈️ 哥哥们状态太好了吧！', likes: 56789, comments: 12345 },
    { user: '追星少女小A', content: '有没有人觉得XX最近状态特别好？恋爱中的男人就是不一样', likes: 3456, comments: 890 }
  ],
  manager: [
    { user: '娱乐八掌柜', content: '据传某顶流即将签约新公司，背后是金牌经纪人在运作', likes: 34567, comments: 12345 },
    { user: '行业观察', content: '娱乐圈经纪人格局或将大洗牌', likes: 12345, comments: 2345 },
    { user: '星闻速递', content: '某品牌发布会，经纪人全程陪同，专业度满分', likes: 23456, comments: 4567 }
  ],
  actor: [
    { user: '娱乐八掌柜', content: '某新剧开机，主演阵容曝光', likes: 56789, comments: 12345 },
    { user: '星闻速递', content: '今日红毯，谁是你心中的最佳造型？', likes: 45678, comments: 8901 },
    { user: '追剧达人', content: '这部剧真的太好看了！演技炸裂', likes: 34567, comments: 6789 }
  ],
  trainee: [
    { user: '练习生观察', content: '某公司月末评价视频流出，新一批练习生实力惊人', likes: 34567, comments: 8901 },
    { user: '星闻速递', content: '新一季选秀节目即将开始，你准备好了吗？', likes: 56789, comments: 12345 },
    { user: '追梦少女', content: '在练习室流过多少汗，舞台就会有多闪耀', likes: 23456, comments: 3456 }
  ],
  stylist: [
    { user: '时尚圈内人', content: '某红毯造型获好评，造型师功不可没', likes: 34567, comments: 5678 },
    { user: '潮流前线', content: '今年秋冬流行趋势，你get了吗？', likes: 45678, comments: 7890 },
    { user: '美妆达人CC', content: '今日约会妆容分享，高级感满满', likes: 56789, comments: 12345 }
  ],
  civilian: [
    { user: '娱乐八掌柜', content: '据知情人士透露，某养成系男团成员近期频繁出入某小区', likes: 23456, comments: 8901 },
    { user: '星闻速递', content: '今日份机场✈️ 哥哥们状态太好了吧！', likes: 56789, comments: 12345 },
    { user: '追星少女小A', content: '偶遇了一个明星！真人好帅！', likes: 3456, comments: 890 }
  ],
  producer: [
    { user: '音乐圈内人', content: '某歌手新专辑制作人曝光，豪华阵容引期待', likes: 34567, comments: 5678 },
    { user: '星闻速递', content: '年度最佳制作人奖项花落谁家？', likes: 23456, comments: 4567 },
    { user: '乐评人老张', content: '最近华语乐坛质量回升，制作人功不可没', likes: 12345, comments: 2345 }
  ],
  chaebol: [
    { user: '娱乐八掌柜', content: '某财阀千金现身慈善晚宴，与某男星互动引猜测', likes: 45678, comments: 12345 },
    { user: '财经八卦', content: '豪门与娱乐圈的跨界合作越来越多了', likes: 23456, comments: 3456 },
    { user: '星闻速递', content: '某品牌发布会，座上宾阵容豪华', likes: 34567, comments: 5678 }
  ]
}

// ===== 各身份对应的抖音视频 =====
const identityDouyin = {
  fan: [
    { title: '今日份直拍！哥哥跳舞太绝了', author: '追星小达人', likes: '12.3w' },
    { title: '偶遇XX在咖啡店！真人好帅', author: '路人甲', likes: '8.9w' },
    { title: 'CP向｜那些年我们磕过的糖', author: 'CP粉头子', likes: '5.6w' }
  ],
  manager: [
    { title: '经纪人vlog｜我的工作日常', author: '职场日记', likes: '3.4w' },
    { title: '艺人行程安排大揭秘', author: '行业八卦', likes: '8.9w' },
    { title: '娱乐圈职场生存指南', author: '打工人日常', likes: '2.1w' }
  ],
  actor: [
    { title: '今日份演技练习', author: '演员日常', likes: '15.6w' },
    { title: '片场vlog｜拍摄的一天', author: '剧组日常', likes: '12.3w' },
    { title: '台词训练小技巧分享', author: '表演课代表', likes: '8.9w' }
  ],
  trainee: [
    { title: '练习室日常｜今天也是努力的一天', author: '追梦练习生', likes: '5.6w' },
    { title: '月末评价舞蹈考核', author: '练习室日记', likes: '8.9w' },
    { title: '练习生的一天vlog', author: '梦想家', likes: '3.4w' }
  ],
  stylist: [
    { title: '今日造型分享｜明星同款妆容', author: '美妆博主', likes: '12.3w' },
    { title: '后台揭秘｜明星造型全过程', author: '时尚圈', likes: '8.9w' },
    { title: '秋冬穿搭灵感合集', author: '穿搭达人', likes: '5.6w' }
  ],
  civilian: [
    { title: '街拍偶遇神秘帅哥', author: '路人甲', likes: '3.4w' },
    { title: '日常vlog｜咖啡店的一天', author: '生活记录者', likes: '2.1w' },
    { title: '闺蜜逛街日记', author: '小确幸', likes: '1.2w' }
  ],
  producer: [
    { title: '录音棚vlog｜新歌制作中', author: '音乐制作人', likes: '8.9w' },
    { title: '编曲技巧分享', author: '音乐人日常', likes: '5.6w' },
    { title: '华语乐坛新趋势分析', author: '乐评人', likes: '3.4w' }
  ],
  chaebol: [
    { title: '我的日常｜豪车出行', author: '名媛生活', likes: '15.6w' },
    { title: '慈善晚宴vlog', author: '上流日记', likes: '12.3w' },
    { title: '顶级餐厅探店合集', author: '美食家', likes: '8.9w' }
  ]
}

// ===== 各身份对应的小红书帖子 =====
const identityRedbook = {
  fan: [
    { title: '偶遇某男团成员！真人比照片帅100倍！', author: '小红薯123', likes: '2.3w', tags: ['#偶遇', '#男团', '#生图'] },
    { title: '如何判断你的爱豆有没有女朋友？', author: '饭圈观察员', likes: '1.8w', tags: ['#追星', '#恋爱'] },
    { title: '今日约会妆容分享', author: '美妆达人CC', likes: '5.6w', tags: ['#约会妆', '#日常妆'] }
  ],
  manager: [
    { title: '职场穿搭｜经纪人的一周OOTD', author: '职场丽人', likes: '1.2w', tags: ['#职场穿搭', '#经纪人'] },
    { title: '如何高效管理艺人行程', author: '行业干货', likes: '2.3w', tags: ['#职场', '#管理'] },
    { title: '商务谈判技巧分享', author: '职场进阶', likes: '1.8w', tags: ['#商务', '#谈判'] }
  ],
  actor: [
    { title: '演员的自我修养｜日常练习', author: '演员日记', likes: '3.4w', tags: ['#演员', '#练习'] },
    { title: '片场好物分享', author: '剧组日常', likes: '2.1w', tags: ['#片场', '#好物'] },
    { title: '保持身材的秘密', author: '健身达人', likes: '5.6w', tags: ['#健身', '#身材管理'] }
  ],
  trainee: [
    { title: '练习生减肥食谱分享', author: '练习生日常', likes: '3.4w', tags: ['#减肥', '#食谱'] },
    { title: '舞蹈练习小技巧', author: '舞蹈生', likes: '2.1w', tags: ['#舞蹈', '#练习'] },
    { title: '练习室护肤routine', author: '护肤达人', likes: '1.8w', tags: ['#护肤', '#日常'] }
  ],
  stylist: [
    { title: '明星同款造型解析', author: '时尚造型师', likes: '3.4w', tags: ['#造型', '#明星同款'] },
    { title: '2024秋冬流行趋势', author: '潮流前线', likes: '2.1w', tags: ['#时尚', '#趋势'] },
    { title: '化妆师才知道的小技巧', author: '美妆达人CC', likes: '5.6w', tags: ['#化妆', '#技巧'] }
  ],
  civilian: [
    { title: '街角咖啡店打卡', author: '生活记录者', likes: '1.2w', tags: ['#咖啡店', '#打卡'] },
    { title: '今日份穿搭分享', author: '穿搭小白', likes: '2.3w', tags: ['#穿搭', '#日常'] },
    { title: '一个人的周末', author: '独居日记', likes: '1.8w', tags: ['#周末', '#独居'] }
  ],
  producer: [
    { title: '录音棚设备分享', author: '音乐制作人', likes: '2.3w', tags: ['#录音棚', '#设备'] },
    { title: '音乐制作流程揭秘', author: '行业干货', likes: '1.8w', tags: ['#音乐', '#制作'] },
    { title: '创作灵感来源', author: '音乐人', likes: '3.4w', tags: ['#创作', '#灵感'] }
  ],
  chaebol: [
    { title: '我的衣帽间', author: '名媛日常', likes: '5.6w', tags: ['#衣帽间', '#奢侈品'] },
    { title: '顶级酒店下午茶体验', author: '生活家', likes: '3.4w', tags: ['#下午茶', '#酒店'] },
    { title: '慈善晚宴妆容分享', author: '优雅日记', likes: '2.1w', tags: ['#晚宴', '#妆容'] }
  ]
}

// ===== B站推荐 =====
const identityBilibili = {
  fan: [
    { title: '【4K】最新打歌舞台直拍', views: '89.2万' },
    { title: '【分析】某男团成员微表情解读', views: '45.6万' },
    { title: '【混剪】那些年我们追过的养成系', views: '123.4万' }
  ],
  manager: [
    { title: '【纪录片】娱乐圈经纪人幕后故事', views: '56.7万' },
    { title: '【分析】艺人商业价值评估', views: '23.4万' },
    { title: '【干货】艺人经纪行业入门指南', views: '12.3万' }
  ],
  actor: [
    { title: '【演技赏析】教科书级别的表演', views: '89.2万' },
    { title: '【幕后】剧组拍摄全记录', views: '45.6万' },
    { title: '【教学】演员台词训练方法', views: '34.5万' }
  ],
  trainee: [
    { title: '【练习室】最新舞蹈练习视频', views: '56.7万' },
    { title: '【翻跳】最新回归曲舞蹈', views: '78.9万' },
    { title: '【日常】练习生的一天vlog', views: '23.4万' }
  ],
  stylist: [
    { title: '【教程】明星同款妆容教学', views: '67.8万' },
    { title: '【分享】造型师的好物推荐', views: '34.5万' },
    { title: '【解析】红毯造型大赏', views: '45.6万' }
  ],
  civilian: [
    { title: '【Vlog】一个人的周末日常', views: '12.3万' },
    { title: '【探店】隐藏在城市角落的美食', views: '34.5万' },
    { title: '【开箱】本月购物分享', views: '23.4万' }
  ],
  producer: [
    { title: '【教程】音乐制作入门指南', views: '56.7万' },
    { title: '【解析】一首歌的诞生全过程', views: '78.9万' },
    { title: '【设备】录音棚设备推荐', views: '34.5万' }
  ],
  chaebol: [
    { title: '【开箱】最新豪车试驾体验', views: '123.4万' },
    { title: '【Vlog】我的日常一天', views: '89.2万' },
    { title: '【探访】顶级豪宅内部设计', views: '67.8万' }
  ]
}

// ===== 导出函数 =====

export function getIdentityData(identity) {
  return {
    contacts: identityContacts[identity] || identityContacts.civilian,
    weiboPosts: identityWeiboPosts[identity] || identityWeiboPosts.civilian,
    douyin: identityDouyin[identity] || identityDouyin.civilian,
    redbook: identityRedbook[identity] || identityRedbook.civilian,
    bilibili: identityBilibili[identity] || identityBilibili.civilian
  }
}

export function generateWeiboFeed(identity) {
  const data = getIdentityData(identity)
  return {
    hotSearch: randomPick(weiboHotSearch),
    posts: [...data.weiboPosts].sort(() => Math.random() - 0.5).slice(0, 3)
  }
}

export function generateWechatMessages(boyfriendName, identity) {
  const data = getIdentityData(identity)
  const msgs = [...data.contacts]
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

export function generateDouyinFeed(identity) {
  const data = getIdentityData(identity)
  return [...data.douyin].sort(() => Math.random() - 0.5).slice(0, 3)
}

export function generateRedbookFeed(identity) {
  const data = getIdentityData(identity)
  return [...data.redbook].sort(() => Math.random() - 0.5).slice(0, 3)
}

export function generateTFamilyFeed(groupName) {
  return {
    group: groupName || '时代少年团',
    notices: [
      { title: '📢 六月行程安排已更新', isNew: true },
      { title: '📢 官方周边预售通知', isNew: false }
    ],
    posts: [
      { member: '成员A', content: '今天练习很充实', time: '2小时前', likes: 56789 },
      { member: '成员B', content: '晚安', time: '5小时前', likes: 45678 }
    ]
  }
}

export function generateBilibiliFeed(identity) {
  const data = getIdentityData(identity)
  return {
    recommendations: [...data.bilibili]
  }
}