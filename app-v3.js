const root = document.querySelector('#app');

const store = {
  view: 'splash',
  onboard: 0,
  nav: 'home',
  mood: 3,
  duration: 5,
  playing: true,
  seconds: 192,
  category: '为你推荐',
  feeling: 4,
  toast: '',
};

const query = new URLSearchParams(location.search);
if (query.has('screen')) {
  store.view = query.get('screen');
  store.nav = ['explore', 'history', 'profile'].includes(store.view) ? store.view : 'home';
  store.seconds = Number(query.get('seconds')) || 192;
  store.playing = query.get('paused') !== '1';
}

const paths = {
  home: '<path d="M3.5 10.5 12 3l8.5 7.5v9a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5z"/><path d="M9 21v-7h6v7"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  chart: '<path d="M4 19V9M10 19V5M16 19v-7M22 19V3"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-4v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.5V3h4v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
  arrow: '<path d="m15 18-6-6 6-6"/>',
  play: '<path d="m9 7 8 5-8 5Z"/>',
  pause: '<path d="M9 7v10M15 7v10"/>',
  spark: '<path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4zM19 16l.6 1.9 1.9.6-1.9.6L19 22l-.6-1.9-1.9-.6 1.9-.6z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  flame: '<path d="M13 22c4-1 7-4 7-9 0-3-1.5-6-4-8 .2 3-1.2 5-3 6 .2-4-2-7-5-9 .2 4-3 7-3 12 0 4 3 7 8 8Z"/>',
  wave: '<path d="M3 12c2.3-5 4.7-5 7 0s4.7 5 7 0 4.7-5 7 0"/>',
};
const ico = n => `<svg class="g-icon" viewBox="0 0 24 24" aria-hidden="true">${paths[n]}</svg>`;

const moods = [
  {face:'😞', label:'低落', color:'#7f9ca3'},
  {face:'😕', label:'疲惫', color:'#87d3c3'},
  {face:'😐', label:'平常', color:'#b7d9d0'},
  {face:'🙂', label:'不错', color:'#e9c973'},
  {face:'😊', label:'很好', color:'#e6a187'},
];

const practices = [
  {title:'焦虑释放呼吸', meta:'5 分钟 · 呼吸', color:'violet', symbol:'⌁'},
  {title:'城市静音片刻', meta:'3 分钟 · 正念', color:'cyan', symbol:'◌'},
  {title:'温柔进入睡眠', meta:'15 分钟 · 睡眠', color:'peach', symbol:'☾'},
  {title:'专注启动练习', meta:'10 分钟 · 专注', color:'blue', symbol:'△'},
];

function shell(content, className = '') {
  return `<div class="g-shell ${className}"><div class="g-noise"></div>${content}${store.toast ? `<div class="g-toast">${store.toast}</div>` : ''}</div>`;
}

function glassHeader(title = '', back = '') {
  return `<header class="g-header">${back ? `<button class="g-round" data-action="${back}" aria-label="返回">${ico('arrow')}</button>` : '<span class="g-head-space"></span>'}<h1>${title}</h1><button class="g-round" data-action="notify" aria-label="通知">${ico('bell')}</button></header>`;
}

function bottomNav() {
  const items = [['home','home','今天'],['explore','compass','发现'],['history','chart','轨迹'],['profile','user','我的']];
  return `<nav class="g-nav">${items.map(([id, iconName, text]) => `<button class="${store.nav === id ? 'active' : ''}" data-nav="${id}">${ico(iconName)}<span>${text}</span></button>`).join('')}</nav>`;
}

function splash() {
  return shell(`<section class="g-screen g-splash"><div class="g-brand-orbit"><span></span><span></span><img src="./logo/2.0/guiling-logo-night.svg" alt="归零 Logo"></div><p class="g-kicker">MINDFUL MOMENTS</p><h1>归零</h1><p>把城市调成静音<br>回到自己的呼吸里</p><div class="g-loader"><i></i></div></section>`, 'theme-dusk');
}

const onboardingData = [
  ['暂停，不代表落后','从三分钟开始，为忙碌的大脑留下一块空白。','01'],
  ['听见身体的信号','记录此刻的感受，让练习真正回应你的需要。','02'],
  ['带着平静再出发','建立属于你的归零节奏，把松弛带回都市生活。','03'],
];
function onboarding() {
  const [title, copy, num] = onboardingData[store.onboard];
  return shell(`<section class="g-screen g-onboard"><header><span>${num} / 03</span><button data-action="home">跳过</button></header><div class="g-onboard-art art-${store.onboard}"><div class="g-orb-a"></div><div class="g-orb-b"></div><div class="g-orb-core">${store.onboard === 0 ? ico('pause') : store.onboard === 1 ? ico('wave') : ico('spark')}</div></div><div class="g-onboard-copy"><p class="g-kicker">YOUR DAILY RESET</p><h2>${title}</h2><p>${copy}</p><div class="g-pages">${onboardingData.map((_,i)=>`<i class="${i===store.onboard?'active':''}"></i>`).join('')}</div><button class="g-main-btn" data-action="next-onboard">${store.onboard === 2 ? '开始体验' : '继续'} <span>↗</span></button></div></section>`, `onboard-theme-${store.onboard}`);
}

function moodCard() {
  return `<section class="g-card g-mood-card"><div class="g-card-head"><div><span class="g-label">今日状态</span><h2>你现在感觉怎么样？</h2></div><button class="g-mini-action" data-action="mood-save">记录</button></div><div class="g-moods">${moods.map((m,i)=>`<button class="${store.mood===i?'selected':''}" data-mood="${i}" style="--mood:${m.color}"><span>${m.face}</span><small>${m.label}</small></button>`).join('')}</div></section>`;
}

function home() {
  const chosen = moods[store.mood];
  return shell(`<section class="g-screen g-scroll"><header class="g-home-head"><div class="g-avatar">零<span></span></div><div><p>晚上好，都市旅人</p><h1>留一点时间<br>给自己。</h1></div><button class="g-round" data-action="notify" aria-label="通知">${ico('bell')}<i></i></button></header><main class="g-home-content">${moodCard()}<section class="g-dashboard-row"><article class="g-card g-reset-card"><div class="g-breathe-mini"><span></span><b>${chosen.face}</b></div><div><span class="g-label">为你推荐</span><h3>${store.mood < 2 ? '松开紧绷的身体' : '保持此刻的状态'}</h3><p>一次 ${store.duration} 分钟的呼吸练习</p></div><button data-action="practice">${ico('play')}</button></article><article class="g-card g-streak-card"><span class="g-label">连续归零</span><strong>3<small>天</small></strong><div>${[1,1,1,0,0,0,0].map((x,i)=>`<i class="${x?'done':''} ${i===2?'today':''}"></i>`).join('')}</div></article></section><div class="g-section-title"><div><span class="g-label">DISCOVER</span><h2>今晚，试试这些</h2></div><button data-nav="explore">查看全部</button></div><div class="g-practice-scroll">${practices.slice(0,3).map((p,i)=>practiceCard(p,i)).join('')}</div></main>${bottomNav()}</section>`, 'theme-home');
}

function practiceCard(p, i) {
  return `<button class="g-practice-card ${p.color}" data-detail="${i}"><div class="g-art-symbol"><span>${p.symbol}</span><i></i></div><div><span>${p.meta}</span><h3>${p.title}</h3></div><b>↗</b></button>`;
}

function explore() {
  const categories = ['为你推荐','缓解焦虑','提升专注','轻柔睡眠'];
  return shell(`<section class="g-screen g-scroll">${glassHeader('发现')}<main class="g-sub-content"><label class="g-search">${ico('search')}<input placeholder="搜索练习、场景或情绪" /></label><div class="g-categories">${categories.map(c=>`<button class="${store.category===c?'active':''}" data-category="${c}">${c}</button>`).join('')}</div><article class="g-feature"><div class="g-feature-art"><i></i><i></i><span>${ico('spark')}</span></div><div><span class="g-label">EDITOR'S PICK · 08 MIN</span><h2>让脑海里的噪音<br>慢慢退到远处</h2><p>城市静音 · 沉浸式呼吸</p><button data-detail="1">开始练习 ${ico('play')}</button></div></article><div class="g-section-title"><div><span class="g-label">COLLECTION</span><h2>精选练习</h2></div><span>12 个</span></div><div class="g-explore-grid">${practices.map((p,i)=>practiceCard(p,i)).join('')}</div></main>${bottomNav()}</section>`, 'theme-explore');
}

function history() {
  const bars=[34,58,42,78,64,88,55];
  return shell(`<section class="g-screen g-scroll"><div class="g-history-hero">${glassHeader('你的轨迹')}<div class="g-history-copy"><span class="g-label">JULY OVERVIEW</span><h2>每一次停下来<br>都算数。</h2></div><div class="g-chart"><div class="g-chart-y"><span>15</span><span>10</span><span>5</span><span>0</span></div><div class="g-bars">${bars.map((b,i)=>`<div><i style="height:${b}%" class="${i===5?'hot':''}"></i><small>${['一','二','三','四','五','六','日'][i]}</small></div>`).join('')}</div></div></div><main class="g-history-body"><div class="g-stat-grid"><article><span>本月归零</span><strong>12<small>次</small></strong><em>↗ 20%</em></article><article><span>平静时长</span><strong>68<small>分</small></strong><em>最佳月份</em></article></div><section class="g-card g-calendar-mini"><div class="g-card-head"><div><span class="g-label">STREAK</span><h2>本周节奏</h2></div><b>3 / 7</b></div><div class="g-week">${['一','二','三','四','五','六','日'].map((d,i)=>`<div class="${i<3?'done':''} ${i===2?'today':''}"><span>${d}</span><i>${i<3?'✓':''}</i></div>`).join('')}</div></section></main>${bottomNav()}</section>`, 'theme-history');
}

function profile() {
  return shell(`<section class="g-screen g-scroll">${glassHeader('我的')}<main class="g-sub-content"><section class="g-profile-card"><div class="g-profile-avatar">零<i></i></div><span class="g-label">MEMBER SINCE JUL 2026</span><h2>归零的人</h2><p>在城市里，练习温柔地回来。</p><div><span><strong>28</strong><small>相伴天数</small></span><span><strong>12</strong><small>完成练习</small></span><span><strong>3</strong><small>连续天数</small></span></div></section><section class="g-settings-list"><button data-action="reminder"><i class="lavender">${ico('bell')}</i><span><b>每日提醒</b><small>每天 21:30</small></span><em>›</em></button><button data-action="sound"><i class="mint">${ico('wave')}</i><span><b>声音与触感</b><small>雨声 · 轻触感</small></span><em>›</em></button><button data-action="appearance"><i class="peach">${ico('spark')}</i><span><b>外观与氛围</b><small>暮色玻璃</small></span><em>›</em></button><button data-action="about"><i class="blue">${ico('settings')}</i><span><b>关于归零</b><small>版本 2.0</small></span><em>›</em></button></section></main>${bottomNav()}</section>`, 'theme-profile');
}

function detail() {
  const p=practices[Number(store.selectedPractice)||0];
  return shell(`<section class="g-screen g-scroll g-detail"><div class="g-detail-art ${p.color}">${glassHeader('', 'back-home')}<div class="g-planet"><i></i><i></i><span>${p.symbol}</span></div><p>01 — GUIDED PRACTICE</p></div><main class="g-detail-sheet"><span class="g-label">${p.meta.toUpperCase()}</span><h1>${p.title}</h1><p class="g-detail-desc">让注意力离开纷乱的念头，落回身体和呼吸。你不需要清空大脑，只需要给自己一点空间。</p><div class="g-benefit-row"><span>${ico('clock')} 随时可练</span><span>${ico('spark')} 舒缓压力</span></div><div class="g-duration"><span class="g-label">选择时长</span><div>${[3,5,10,15].map(n=>`<button class="${store.duration===n?'active':''}" data-duration="${n}"><b>${n}</b><small>分钟</small></button>`).join('')}</div></div><button class="g-main-btn" data-action="practice">开始归零 <span>${ico('play')}</span></button></main></section>`, 'theme-detail');
}

function practice() {
  const total=store.duration*60;
  const elapsed=Math.max(0,total-store.seconds);
  const progress=Math.round((elapsed/total)*100);
  const mm=String(Math.floor(store.seconds/60)).padStart(2,'0');
  const ss=String(store.seconds%60).padStart(2,'0');
  return shell(`<section class="g-screen g-practice"><header><button class="g-round" data-action="detail" aria-label="返回">${ico('arrow')}</button><span>呼吸练习</span><button class="g-round" data-action="sound" aria-label="声音">${ico('wave')}</button></header><div class="g-practice-stage"><div class="g-breath-space ${store.playing?'breathing':''}"><i></i><i></i><i></i><div><span>${store.playing?'吸气 · 停留 · 呼气':'练习已暂停'}</span><strong class="g-timer">${mm}:${ss}</strong><small>剩余时间</small></div></div><h1>把注意力<br>交还给呼吸</h1><p>放松肩膀，跟随光圈的节奏。</p></div><footer class="g-practice-controls"><button data-action="complete">结束</button><button class="g-play" data-action="toggle-play" aria-label="${store.playing?'暂停':'继续'}">${ico(store.playing?'pause':'play')}</button><button data-action="sound">雨声</button><div class="g-progress"><i style="width:${progress}%"></i></div></footer></section>`, 'theme-practice');
}

function complete() {
  return shell(`<section class="g-screen g-complete"><div class="g-confetti"><i></i><i></i><i></i><i></i></div><div class="g-complete-icon">${ico('check')}</div><span class="g-label">SESSION COMPLETE</span><h1>你回来了。</h1><p>这 ${store.duration} 分钟，是今天送给自己的礼物。</p><section class="g-card"><span>现在感觉怎么样？</span><div>${moods.map((m,i)=>`<button class="${store.feeling===i?'selected':''}" data-feeling="${i}">${m.face}</button>`).join('')}</div></section><div class="g-complete-actions"><button class="g-main-btn" data-action="repeat">再来一次 <span>${ico('play')}</span></button><button data-action="home">回到今天</button></div></section>`, 'theme-complete');
}

function render() {
  const pages={splash,onboarding,home,explore,history,profile,detail,practice,complete};
  root.innerHTML=pages[store.view]();
}

let interval;
function startTimer(){
  clearInterval(interval);
  if(store.view!=='practice'||!store.playing)return;
  interval=setInterval(()=>{
    store.seconds--;
    if(store.seconds<=0){clearInterval(interval);store.view='complete';render();return;}
    const timer=document.querySelector('.g-timer');
    if(timer)timer.textContent=`${String(Math.floor(store.seconds/60)).padStart(2,'0')}:${String(store.seconds%60).padStart(2,'0')}`;
  },1000);
}

function go(view){store.view=view;if(['home','explore','history','profile'].includes(view))store.nav=view;render();startTimer();}
function showToast(text){store.toast=text;render();setTimeout(()=>{store.toast='';render();},1800);}

root.addEventListener('click',e=>{
  const el=e.target.closest('button'); if(!el)return;
  if(el.dataset.nav){go(el.dataset.nav);return;}
  if(el.dataset.mood!==undefined){store.mood=Number(el.dataset.mood);render();return;}
  if(el.dataset.feeling!==undefined){store.feeling=Number(el.dataset.feeling);render();return;}
  if(el.dataset.category){store.category=el.dataset.category;render();return;}
  if(el.dataset.duration){store.duration=Number(el.dataset.duration);render();return;}
  if(el.dataset.detail!==undefined){store.selectedPractice=Number(el.dataset.detail);go('detail');return;}
  const action=el.dataset.action;
  if(action==='next-onboard'){store.onboard<2?(store.onboard++,render()):go('home');}
  else if(action==='home'||action==='back-home')go('home');
  else if(action==='detail')go('detail');
  else if(action==='practice'||action==='repeat'){store.seconds=store.duration*60;store.playing=true;go('practice');}
  else if(action==='toggle-play'){store.playing=!store.playing;render();startTimer();}
  else if(action==='complete')go('complete');
  else if(action==='mood-save')showToast('今天的状态已经记下了');
  else if(action)showToast({'notify':'今天没有新的提醒','sound':'雨声氛围已开启','reminder':'提醒设置即将开放','appearance':'当前使用归零青绿主题','about':'归零 2.0 · 为城市留白'}[action]||'功能正在准备中');
});

render();
if(!query.has('screen'))setTimeout(()=>{if(store.view==='splash')go('onboarding');},1800);
