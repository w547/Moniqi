import{k,r as s,g as _}from"./index-D4V6K0xz.js";const M=k("game",()=>{const t=s("title"),e=s(0),n=s(null),i=s(!1),r=s([]),u=_(()=>{if(!n.value)return"";const a=new Date(n.value);return`${a.getFullYear()}年${a.getMonth()+1}月${a.getDate()}日 ${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}`});function l(){e.value=1,n.value=new Date("2025-06-01T10:00:00").getTime(),t.value="prologue"}function f(){e.value++;const a=Math.floor(Math.random()*72+6)*36e5;n.value+=a,t.value="free_action"}function d(a){t.value=a}function p(a){n.value+=a*36e5}function g(){return{version:"0.1.0",round:e.value,gameTime:n.value,phase:t.value,timestamp:Date.now()}}function y(a){return a.version!=="0.1.0"?!1:(e.value=a.round,n.value=a.gameTime,t.value=a.phase,!0)}return{phase:t,round:e,gameTime:n,isPaused:i,saveSlots:r,currentDate:u,startGame:l,nextRound:f,setPhase:d,advanceTime:p,exportSave:g,importSave:y}}),R=k("player",()=>{const t=s(""),e=s(""),n=s(22),i=s(""),r=s(""),u=s(!1),l=s(0),f=s(!1),d=s(!1),p=_(()=>({name:t.value,nickname:e.value,age:n.value,identity:i.value,career:r.value}));function g(o){t.value=o.name||"",e.value=o.nickname||"",n.value=o.age||22,i.value=o.identity||"",r.value=o.career||o.identity||""}function y(o,b=0){u.value=o,l.value=b}function a(o){f.value=o}function h(){return{name:t.value,nickname:e.value,age:n.value,identity:i.value,career:r.value,isPregnant:u.value,pregnancyWeek:l.value,isMarried:f.value,hasChildren:d.value}}function c(o){t.value=o.name,e.value=o.nickname,n.value=o.age,i.value=o.identity,r.value=o.career,u.value=o.isPregnant,l.value=o.pregnancyWeek,f.value=o.isMarried,d.value=o.hasChildren}return{name:t,nickname:e,age:n,identity:i,career:r,isPregnant:u,pregnancyWeek:l,isMarried:f,hasChildren:d,profile:p,setPlayer:g,setPregnant:y,setMarried:a,exportState:h,importState:c}}),C=k("boyfriend",()=>{const t=s(""),e=s(""),n=s(""),i=s(""),r=s(""),u=s(""),l=s(""),f=s(1),d=s(!1),p=_(()=>({name:t.value,callName:e.value,group:n.value,realPersonality:i.value,hiddenTrait:r.value,affectionBasis:u.value,secretReason:l.value}));function g(c){t.value=c.name||"",e.value=c.callName||"",n.value=c.group||"",i.value=c.realPersonality||"",r.value=c.hiddenTrait||"",u.value=c.affectionBasis||"",l.value=c.secretReason||""}function y(){d.value=!0}function a(){return{name:t.value,callName:e.value,group:n.value,realPersonality:i.value,hiddenTrait:r.value,affectionBasis:u.value,secretReason:l.value,relationshipLevel:f.value,isRevealed:d.value}}function h(c){t.value=c.name,e.value=c.callName,n.value=c.group,i.value=c.realPersonality,r.value=c.hiddenTrait,u.value=c.affectionBasis,l.value=c.secretReason,f.value=c.relationshipLevel,d.value=c.isRevealed}return{name:t,callName:e,group:n,realPersonality:i,hiddenTrait:r,affectionBasis:u,secretReason:l,relationshipLevel:f,isRevealed:d,profile:p,setBoyfriend:g,revealTrait:y,exportState:a,importState:h}}),T=k("phone",()=>{const t=s(null),e=s([]),n=s([]),i=s([]),r=s(!1);function u(h){t.value=h}function l(){t.value=null}function f(h){e.value.unshift({id:Date.now(),...h,read:!1,time:new Date().toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit"})})}function d(h){n.value.unshift({id:Date.now(),...h,time:new Date().toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit"})})}function p(h){i.value.unshift({id:Date.now(),...h,time:new Date().toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit"})})}function g(){e.value.forEach(h=>h.read=!0)}function y(){return{notifications:e.value,messages:n.value,calls:i.value}}function a(h){e.value=h.notifications||[],n.value=h.messages||[],i.value=h.calls||[]}return{activeApp:t,notifications:e,messages:n,calls:i,isLocked:r,openApp:u,closeApp:l,addNotification:f,addMessage:d,addCall:p,markAllRead:g,exportState:y,importState:a}}),w=[{id:"player",name:"海王",desc:"表面专一，实则广撒网"},{id:"scumbag",name:"渣男",desc:"自私自利，不负责任"},{id:"avoidant",name:"回避型",desc:"遇到问题就逃避冷暴力"},{id:"workaholic",name:"事业狂魔",desc:"事业永远排第一"},{id:"ac",name:"中央空调",desc:"对谁都温柔体贴"},{id:"bi",name:"双性恋",desc:"隐藏的性取向"},{id:"mommy",name:"妈宝男",desc:"什么都听妈妈的"},{id:"jealous",name:"控制狂",desc:"极度缺乏安全感，控制欲强"}],S=[{id:"true_love",name:"真心相爱",desc:"他是真心喜欢你"},{id:"mutual_benefit",name:"各取所需",desc:"互相利用的关系"},{id:"interest",name:"利益交换",desc:"带有明确目的"},{id:"deception",name:"欺骗",desc:"从一开始就是谎言"},{id:"lonely",name:"寂寞消遣",desc:"只是排解孤独"},{id:"rebound",name:"疗伤替代品",desc:"你是他前任的替代"}],P=["养成系偶像恋爱禁止条款","公司强烈反对并要求保密","事业上升期不能有绯闻","害怕伤害长情养成系粉丝","团体发展考虑，不能影响队友","恋爱状态不稳定，不确定能否长久","家人反对，需要时间说服","合约中有明确禁止恋爱条款"];function j(){return w[Math.floor(Math.random()*w.length)]}function z(){return S[Math.floor(Math.random()*S.length)]}function I(){return P[Math.floor(Math.random()*P.length)]}function m(t){return Math.random()*100<t}function v(t){return t[Math.floor(Math.random()*t.length)]}const L={dating:[{id:"secret_date_car",title:"🚗 车内秘密约会",narrative:`他发来消息：「今晚老地方见？」

你们常去的那条江边小路，
深夜无人，只有车灯和星光。

车窗起了一层薄雾，
他把座椅调低，递来一杯热奶茶。
「今天录节目累死了，
但一想到能见到你，
就又有了力气。」`,choices:[{text:"靠在他肩上，安静地听他讲今天的事",effect:"intimacy+1"},{text:"拿出准备好的小零食，喂他吃",effect:"intimacy+1"},{text:"问他有没有和其他女艺人互动",effect:"tension+1"},{text:"提议开车去更远的地方兜风",effect:"adventure+1"}]},{id:"secret_date_home",title:"🏠 家中秘密相聚",narrative:`难得他有一天假期。

你早早买好了食材，
准备给他做一顿家常菜。

门铃响了，他戴着口罩帽子，
像个做贼的一样闪进来。
「外面好像有人跟着我，
我绕了三圈才敢上来。」`,choices:[{text:"笑着说他是「大明星做贼记」",effect:"mood+1"},{text:"担心地查看窗外有没有可疑的人",effect:"anxiety+1"},{text:"拉他进厨房一起做饭",effect:"intimacy+1"},{text:"让他先去洗个热水澡放松",effect:"care+1"}]},{id:"secret_date_abroad",title:"✈️ 国外短暂自由",narrative:`他要去日本拍杂志，
偷偷帮你订了同班飞机的票。

在异国的街头，
你们终于可以像普通情侣一样，
手牵手走在阳光下。

他给你买了一个冰淇淋，
笑着说：「在这里，
我不是什么偶像，
只是你的男朋友。」`,choices:[{text:"感动地抱住他",effect:"intimacy+2"},{text:"拉着他去拍大头贴留念",effect:"memory+1"},{text:"提醒他注意周围有没有中国粉丝",effect:"caution+1"},{text:"提议去迪士尼乐园玩一整天",effect:"fun+1"}]}],career:[{id:"comeback",title:"🎵 回归期",narrative:`他的新专辑要发了。

这意味着连续几周的打歌、
综艺、签售、粉丝见面会……

他已经三天没怎么睡觉了，
但还是在凌晨给你发了消息：
「还没睡吧？我刚录完音。」`,choices:[{text:"让他早点休息，别太拼了",effect:"care+1"},{text:"给他点一份营养外卖送到公司",effect:"intimacy+1"},{text:"问他新歌是不是写给自己的",effect:"flirt+1"},{text:"抱怨已经好几天没见到他了",effect:"tension+1"}]},{id:"scandal",title:"📰 绯闻风波",narrative:`微博热搜突然出现了他的名字——

#某TNT成员与女演员深夜聚餐#

你点进去一看，
是他在剧组杀青宴上的照片，
旁边坐着女主角。

他很快打来电话：
「你看到了吗？别信那些，
就是剧组聚餐，
大家都在的。」`,choices:[{text:"选择相信他，但心里还是有点不舒服",effect:"trust+1,anxiety+1"},{text:"要求他详细解释当时的情况",effect:"tension+1"},{text:"开玩笑说「那个女演员挺漂亮的」",effect:"jealous+1"},{text:"直接挂掉电话，等他来哄",effect:"drama+1"}]}],crisis:[{id:"sasaeng",title:"🔍 私生饭跟踪",narrative:`你发现最近总有一辆白色面包车
停在你家楼下。

起初你没在意，
直到有一天你出门时，
那辆车缓缓跟了上来。

你的手机收到陌生号码的短信：
「我知道你是谁。
离他远点，否则后果自负。」`,choices:[{text:"立刻打电话告诉他这件事",effect:"share+1"},{text:"报警处理",effect:"safe+1"},{text:"暂时搬到朋友家住几天",effect:"avoid+1"},{text:"回复短信警告对方",effect:"confront+1"}]},{id:"company_pressure",title:"🏢 公司施压",narrative:`他的经纪人约你「喝咖啡」。

咖啡厅里，经纪人开门见山：
「我们知道你们的关系。
他现在是事业最关键的时候，
你应该明白，
如果恋情曝光意味着什么。」

经纪人推过来一张支票。`,choices:[{text:"拒绝支票，表示不会影响他的事业",effect:"dignity+1"},{text:"反问经纪人：他也同意这样做吗？",effect:"doubt+1"},{text:"沉默不语，心里开始动摇",effect:"shake+1"},{text:"直接离席，不想听下去",effect:"anger+1"}]}],life:[{id:"friend_gathering",title:"👯 闺蜜聚会",narrative:`好久不见的闺蜜约你出来。

「你最近怎么神神秘秘的？
是不是谈恋爱了？」

闺蜜们七嘴八舌地八卦起来。

你端着奶茶，
不知道该怎么回答。`,choices:[{text:"含糊地说「有一个在接触的人」",effect:"vague+1"},{text:"直接否认，转移话题",effect:"hide+1"},{text:"忍不住透露了一点点，但没说对方是谁",effect:"share+1"},{text:"说对方是「圈外人」，不想多聊",effect:"lie+1"}]},{id:"work_opportunity",title:"💼 工作机遇",narrative:`你收到了一个不错的工作机会，
但需要去另一个城市半年。

如果接受，你们将面临异地；
如果拒绝，可能会错过职业发展。

他看着你的录取通知，
沉默了很久。`,choices:[{text:"接受机会，相信异地也能维持感情",effect:"ambition+1"},{text:"拒绝机会，觉得现在的关系更重要",effect:"sacrifice+1"},{text:"问他能不能想办法调到那个城市工作",effect:"depend+1"},{text:"提议先试试异地，不行再回来",effect:"pragmatic+1"}]}],industry:[{id:"award_show",title:"🏆 颁奖典礼",narrative:`今晚是年度音乐盛典。

你坐在电视机前，
看着他走上红毯，
西装笔挺，笑容耀眼。

当主持人宣布他获奖时，
你比他还激动。

他的获奖感言里说：
「感谢所有支持我的人，
特别是那个一直在背后
默默陪伴我的人。」

镜头扫过台下，
粉丝们尖叫着，
但你知道那句话是对谁说的。`,choices:[{text:"眼眶湿润，给他发了一条祝贺消息",effect:"touched+1"},{text:"截图他的获奖感言发朋友圈（仅自己可见）",effect:"memory+1"},{text:"担心他那句话会不会引起粉丝猜测",effect:"worry+1"},{text:"打电话给他，亲口说恭喜",effect:"intimacy+1"}]},{id:"other_couple_exposed",title:"💥 同行恋情曝光",narrative:`微博又炸了——

某顶流爱豆被拍到与素人女友同居，
公司紧急发声明否认，
但照片太清楚，粉丝已经炸锅。

你刷着评论区，
看到那些恶毒的留言，
手心开始冒汗。

他发来消息：
「看到热搜了吗？
最近我们更要小心了。」`,choices:[{text:"表示理解，最近减少见面频率",effect:"rational+1"},{text:"感到害怕，问他万一我们也曝光怎么办",effect:"fear+1"},{text:"觉得这是个机会，也许可以顺势公开",effect:"bold+1"},{text:"安慰他不要紧张，一切照常就好",effect:"calm+1"}]}]};function x(t){const e=L[t];return!e||e.length===0?null:v(e)}function B(t){const e=[];if(t%4===0&&e.push(x("dating")),t%3===0&&e.push(x("life")),t%5===0&&e.push(x("career")),t%7===0&&e.push(x("industry")),t%8===0&&m(60)&&e.push(x("crisis")),e.length===0){const n=["dating","life","career"];e.push(x(v(n)))}return e.filter(Boolean)}class A{constructor(){this.reset()}reset(){this.isPregnant=!1,this.week=0,this.usedProtection=null,this.testedPositive=!1,this.toldBoyfriend=!1,this.wentToHospital=!1,this.decision=null}intimacy(e){return this.usedProtection=e,m(e?1:40)}checkSymptoms(){if(!this.isPregnant||this.week<4)return null;const e=["恶心反胃","胸部胀痛","疲劳嗜睡","停经","情绪波动"];return e.slice(0,Math.min(this.week,e.length))}testPregnancy(){return this.isPregnant?m(90):!1}hospitalConfirm(){return this.isPregnant}exportState(){return{isPregnant:this.isPregnant,week:this.week,usedProtection:this.usedProtection,testedPositive:this.testedPositive,toldBoyfriend:this.toldBoyfriend,wentToHospital:this.wentToHospital,decision:this.decision}}importState(e){this.isPregnant=e.isPregnant,this.week=e.week,this.usedProtection=e.usedProtection,this.testedPositive=e.testedPositive,this.toldBoyfriend=e.toldBoyfriend,this.wentToHospital=e.wentToHospital,this.decision=e.decision}}class N{constructor(){this.reset()}reset(){this.status="dating",this.affectionLevel=50,this.trustLevel=50,this.cheatingRisk=0,this.hasCheated=!1,this.proposed=!1,this.married=!1,this.divorced=!1,this.breakupCount=0}updateAffection(e){this.affectionLevel=Math.max(0,Math.min(100,this.affectionLevel+e))}updateTrust(e){this.trustLevel=Math.max(0,Math.min(100,this.trustLevel+e))}increaseCheatingRisk(){return this.cheatingRisk+=v([5,10,15]),this.cheatingRisk>=100&&m(50)?(this.hasCheated=!0,this.cheatingRisk=0,!0):!1}canPropose(e){return e>=30&&this.affectionLevel>=70&&!this.married}propose(){this.proposed=!0,this.status="engaged"}marry(){this.married=!0,this.status="married"}divorce(){this.divorced=!0,this.married=!1,this.status="divorced"}breakup(){this.breakupCount++,this.status="broken_up"}reconcile(){this.status="dating"}exportState(){return{status:this.status,affectionLevel:this.affectionLevel,trustLevel:this.trustLevel,cheatingRisk:this.cheatingRisk,hasCheated:this.hasCheated,proposed:this.proposed,married:this.married,divorced:this.divorced,breakupCount:this.breakupCount}}importState(e){this.status=e.status,this.affectionLevel=e.affectionLevel,this.trustLevel=e.trustLevel,this.cheatingRisk=e.cheatingRisk,this.hasCheated=e.hasCheated,this.proposed=e.proposed,this.married=e.married,this.divorced=e.divorced,this.breakupCount=e.breakupCount}}const E=["#时代少年团_新歌_","#TOP登陆少年_舞台_","#TFBOYS_合体_","#某顶流_疑似恋爱_","#私生饭_跟踪_","#内娱_塌房预警_","#养成系_恋爱禁止_","#打歌节目_一位_","#颁奖典礼_红毯_","#粉丝接机_拥堵_","#偶像_机场时尚_","#新剧_路透_","#综艺_录制_路透_","#演唱会_抢票_","#站姐_神图_"],D=[{user:"娱乐八掌柜",content:"据知情人士透露，某养成系男团成员近期频繁出入某小区，疑似有恋情？🤔",likes:23456,comments:8901},{user:"星闻速递",content:"今日份机场✈️ 哥哥们状态太好了吧！",likes:56789,comments:12345},{user:"追星少女小A",content:"有没有人觉得XX最近状态特别好？恋爱中的男人就是不一样🥰",likes:3456,comments:890},{user:"饭圈观察员",content:"理性讨论：养成系偶像到底能不能谈恋爱？",likes:12345,comments:5678}],F=[{name:"妈妈",group:"家人",lastMsg:"周末回来吃饭吗？",time:"昨天"},{name:"爸爸",group:"家人",lastMsg:"注意安全",time:"周一"},{name:"闺蜜-小雨",group:"朋友",lastMsg:"出来逛街！",time:"2小时前"},{name:"同事-阿琳",group:"工作",lastMsg:"明天会议资料准备好了吗",time:"5小时前"},{name:"大学同学-老王",group:"朋友",lastMsg:"好久不见，最近怎么样",time:"3天前"}],H=[{sender:"1069xxxx",content:"【温馨提示】您的快递已到达小区快递柜，取件码：xxxx"},{sender:"未知号码",content:"我知道你的秘密。你以为藏得很好吗？"},{sender:"银行",content:"您的账户于xx月xx日发生一笔消费，金额：xxx元"},{sender:"运营商",content:"尊敬的用户，您的套餐流量已不足1GB"}],Q=[{title:"今日份直拍！哥哥跳舞太绝了🔥",author:"追星小达人",likes:"12.3w"},{title:"偶遇XX在咖啡店！真人好帅😍",author:"路人甲",likes:"8.9w"},{title:"CP向｜那些年我们磕过的糖🍬",author:"CP粉头子",likes:"5.6w"},{title:"分析贴：XX最近是不是恋爱了？",author:"八卦分析师",likes:"3.4w"}],G=[{title:"偶遇某男团成员！真人比照片帅100倍！",author:"小红薯123",likes:"2.3w",tags:["#偶遇","#男团","#生图"]},{title:"如何判断你的爱豆有没有女朋友？",author:"饭圈观察员",likes:"1.8w",tags:["#追星","#恋爱"]},{title:"今日约会妆容分享💄",author:"美妆达人CC",likes:"5.6w",tags:["#约会妆","#日常妆"]}];function O(){return{hotSearch:v(E),posts:[...D].sort(()=>Math.random()-.5).slice(0,3)}}function V(t){const e=[...F];return t&&m(50)&&e.unshift({name:t,group:"💕",lastMsg:v(["想你了","今天辛苦了","晚安","明天能见面吗？","刚录完节目"]),time:"刚刚"}),e}function X(){return v(H)}function Y(){return[...Q].sort(()=>Math.random()-.5).slice(0,3)}function K(){return[...G].sort(()=>Math.random()-.5).slice(0,3)}function q(t){return{group:t||"时代少年团",notices:[{title:"📢 六月行程安排已更新",isNew:!0},{title:"📢 官方周边预售通知",isNew:!1}],posts:[{member:"成员A",content:"今天练习很充实💪",time:"2小时前",likes:56789},{member:"成员B",content:"晚安🌙",time:"5小时前",likes:45678}]}}function J(){return{recommendations:[{title:"【4K】最新打歌舞台直拍",views:"89.2万"},{title:"【分析】某男团成员微表情解读",views:"45.6万"},{title:"【混剪】那些年我们追过的养成系",views:"123.4万"}]}}class W{constructor(){this.pregnancy=new A,this.relationship=new N,this.eventQueue=[],this.currentEvent=null,this.freeActionsRemaining=3,this.intimacyCooldown=0}get stores(){return{game:M(),player:R(),boyfriend:C(),phone:T()}}startGame(e,n){const{game:i,player:r,boyfriend:u,phone:l}=this.stores;r.setPlayer(e),u.setBoyfriend(n),i.startGame(),this.pregnancy.reset(),this.relationship.reset(),this.eventQueue=[],this.currentEvent=null,this.freeActionsRemaining=3,this.intimacyCooldown=0,l.notifications=[],l.messages=[],l.calls=[],i.setPhase("prologue")}beginRound(){const{game:e,phone:n}=this.stores;this.freeActionsRemaining=3,this.currentEvent=null,this.eventQueue=[],this.syncNotifications(),e.setPhase("free_action")}syncNotifications(){const{phone:e,boyfriend:n}=this.stores;if(m(60)&&e.addNotification({app:"微博",title:"🔥 热搜推送",content:v(["#某男团_回归_","#机场_私生_","#新歌_MV_","#综艺_路透_"])}),m(40)&&e.addMessage({from:n.name,preview:v(["在干嘛？","想你了","今天好累","晚安💤"]),unread:!0}),m(25)&&e.addNotification({app:"微信",title:"新消息",content:v(["闺蜜-小雨：出来玩！","妈妈：吃饭了吗？","同事：文件发你了"])}),m(20)){const i=X();e.addMessage({from:i.sender,preview:i.content.substring(0,20)+"...",unread:!0})}m(15)&&e.addCall({from:v(["妈妈","未知号码","闺蜜-小雨"]),type:"missed",count:1})}getFreeActions(){return[{id:"phone",label:"📱 查看手机",icon:"📱"},{id:"work",label:"💼 处理工作",icon:"💼"},{id:"rest",label:"😴 休息一下",icon:"😴"},{id:"shop",label:"🛍️ 逛街购物",icon:"🛍️"},{id:"exercise",label:"🏃 运动健身",icon:"🏃"},{id:"study",label:"📚 学习充电",icon:"📚"},{id:"visit",label:"🎬 探班男友",icon:"🎬"},{id:"friends",label:"👯 约朋友",icon:"👯"}]}executeFreeAction(e){if(this.freeActionsRemaining<=0)return null;this.freeActionsRemaining--;const{phone:n,boyfriend:i}=this.stores;switch(e){case"phone":return{type:"open_phone",message:"你拿起了手机..."};case"work":return{type:"narrative",message:`你专注地处理了一会儿工作。
忙碌让你暂时忘记了那些烦恼。`};case"rest":return{type:"narrative",message:`你躺在床上休息了一会儿。
难得的安静时光。`};case"shop":return{type:"narrative",message:`你去商场逛了逛。
看到橱窗里好看的衣服，
想着他穿起来会是什么样子。`};case"exercise":return{type:"narrative",message:`你去健身房出了一身汗。
运动后的畅快感让人神清气爽。`};case"study":return{type:"narrative",message:`你静下心来学习了一会儿。
提升自己总是没错的。`};case"visit":return n.addNotification({app:"系统",title:"⚠️ 注意",content:"探班需要提前确认他的行程安排"}),{type:"narrative",message:`你给他发了消息问能不能去探班。
他回复：「今天拍摄排太满了，
改天好吗？对不起...」`};case"friends":return{type:"narrative",message:`你和朋友约了顿饭。
聊着聊着，朋友突然问：
「你最近是不是谈恋爱了？
感觉你整个人都在发光。」
你笑了笑，没有正面回答。`};default:return{type:"narrative",message:"你做了一些日常的事情。"}}}endFreeActions(){const{game:e}=this.stores;return e.setPhase("random_event"),this.eventQueue=B(e.round),this.nextEvent()}nextEvent(){return this.eventQueue.length===0?null:(this.currentEvent=this.eventQueue.shift(),this.currentEvent)}handleChoice(e){if(!this.currentEvent||!this.currentEvent.choices[e])return null;const{game:i}=this.stores;return this.eventQueue.length>0?this.nextEvent():(i.nextRound(),this.beginRound(),{type:"round_end"})}checkIntimacyAvailable(){const{game:e}=this.stores;return e.round%4===0&&this.intimacyCooldown<=0}triggerIntimacy(e){this.intimacyCooldown=4;const n=this.pregnancy.intimacy(e);return n&&(this.pregnancy.isPregnant=!0,this.pregnancy.week=0),{gotPregnant:n,narrative:e?`你们做了安全措施。
在这个特殊的关系里，
每一步都要小心翼翼。`:`你们没有做任何措施。
在那一刻，
理智被抛到了脑后。`}}exportFullSave(){const{game:e,player:n,boyfriend:i,phone:r}=this.stores;return{version:"0.1.0",timestamp:Date.now(),game:e.exportSave(),player:n.exportState(),boyfriend:i.exportState(),phone:r.exportState(),pregnancy:this.pregnancy.exportState(),relationship:this.relationship.exportState()}}importFullSave(e){if(e.version!=="0.1.0")return!1;const{game:n,player:i,boyfriend:r,phone:u}=this.stores;return n.importSave(e.game),i.importState(e.player),r.importState(e.boyfriend),u.importState(e.phone),this.pregnancy.importState(e.pregnancy),this.relationship.importState(e.relationship),!0}}const U=new W;export{j as a,I as b,T as c,R as d,C as e,O as f,U as g,V as h,q as i,J as j,Y as k,K as l,z as r,M as u};
