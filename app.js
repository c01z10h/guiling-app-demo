const app = document.querySelector('#app');

const state = {
  screen: 'splash',
  onboarding: 0,
  selectedState: '',
  selectedTime: 5,
  activeNav: 'home',
  filter: '全部',
  playing: true,
  seconds: 192,
  feeling: 4,
  toast: '',
};

const preview = new URLSearchParams(location.search);
if (preview.has('screen')) {
  state.screen = preview.get('screen');
  state.activeNav = ['explore', 'history', 'profile'].includes(state.screen) ? state.screen : 'home';
  state.selectedState = preview.get('selected') === '0' ? '' : '紧张焦虑';
  state.selectedTime = Number(preview.get('time')) || 5;
  state.seconds = Number(preview.get('seconds')) || 192;
  state.playing = preview.get('paused') !== '1';
}

const icons = {
  settings: '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3v-4h.08a1.7 1.7 0 0 0 1.56-1.03 1.7 1.7 0 0 0-.34-1.88L4.24 7l2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.57h.01A1.7 1.7 0 0 0 10 3V3h4v.08A1.7 1.7 0 0 0 15 4.64a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9v.01A1.7 1.7 0 0 0 21 10h.01v4h-.08A1.7 1.7 0 0 0 19.4 15Z"/>',
  back: '<path d="m15 18-6-6 6-6"/>',
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/>',
  explore: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  history: '<path d="M4 5h16v15H4zM8 3v4M16 3v4M4 10h16"/>',
  profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M15 9l5-5"/>',
  play: '<path d="m9 7 8 5-8 5Z"/>',
  pause: '<path d="M9 7v10M15 7v10"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',
};

const icon = (name) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;
const streak = () => `<div class="streak" aria-label="连续练习 3 天">${Array.from({length: 7}, (_, i) => `<span class="streak-dot ${i < 2 ? 'done' : i === 2 ? 'today' : ''}"></span>`).join('')}</div>`;

function topbar(title = '', left = '', right = '') {
  return `<header class="topbar">
    ${left ? `<button class="icon-btn" data-action="${left}" aria-label="返回">${icon('back')}</button>` : '<span class="topbar-spacer"></span>'}
    <h1>${title}</h1>
    ${right ? `<button class="icon-btn" data-action="${right}" aria-label="设置">${icon('settings')}</button>` : '<span class="topbar-spacer"></span>'}
  </header>`;
}

function nav() {
  const items = [['home','home','首页'], ['explore','explore','探索'], ['history','history','记录'], ['profile','profile','我的']];
  return `<nav class="bottom-nav">${items.map(([id, ico, label]) => `<button class="nav-item ${state.activeNav === id ? 'active' : ''}" data-nav="${id}">${icon(ico)}<span>${label}</span></button>`).join('')}</nav>`;
}

function splash() {
  return `<section class="screen splash"><div class="splash-inner"><div class="breath-orb"><span class="orb-core"></span></div><h1 class="brand display">归零</h1><p class="tagline">随时归零，然后回来</p><div class="loading"></div></div></section>`;
}

const onboard = [
  ['停下来，也是一种前进', '给自己几分钟，让纷乱的念头慢慢沉淀。'],
  ['跟随呼吸，回到此刻', '无需做到完美，只要听见身体正在发生什么。'],
  ['把平静，带回生活', '选择当下的状态，我们会为你准备合适的练习。'],
];

function onboarding() {
  const [title, copy] = onboard[state.onboarding];
  return `<section class="screen onboarding">
    <button class="skip" data-action="home">跳过</button>
    <div class="onboard-art"><div class="zen-art"><span></span><span></span><span></span></div></div>
    <div class="onboard-copy"><p class="eyebrow">0${state.onboarding + 1} / 03</p><h2 class="display">${title}</h2><p>${copy}</p></div>
    <div class="pager">${onboard.map((_, i) => `<span class="${i === state.onboarding ? 'active' : ''}"></span>`).join('')}</div>
    <button class="btn btn-primary btn-lg btn-block" data-action="next-onboard">${state.onboarding === 2 ? '开始归零' : '下一步'}</button>
  </section>`;
}

const states = [['😣','紧张焦虑'], ['🫧','疲惫乏力'], ['◌','难以专注'], ['〰','烦躁不安'], ['☾','难以入眠'], ['△','压力山大'], ['⌁','迷茫不确定'], ['○','想要保持']];
function home() {
  return `<section class="screen">
    ${topbar('归零', '', 'toast-settings')}
    <div class="page-content">
      <p class="greeting">今天也要<br>好好照顾自己。</p>
      <p class="section-label">我现在感觉…</p>
      <div class="state-grid">${states.map(([emoji, label]) => `<button class="state-chip ${state.selectedState === label ? 'selected' : ''}" data-state="${label}"><span class="emoji">${emoji}</span><span>${label}</span></button>`).join('')}</div>
      <p class="section-label">或者，直接选时长</p>
      <div class="time-row">${[3,5,10,15].map(t => `<button class="time-chip ${state.selectedTime === t ? 'selected' : ''}" data-time="${t}"><strong>${t}</strong><small>分钟</small></button>`).join('')}</div>
      ${state.selectedState ? `<article class="recommend-card"><div class="rec-icon">${icon('target')}</div><h3>${state.selectedState === '紧张焦虑' ? '焦虑释放呼吸' : '当下觉察练习'}</h3><p>${state.selectedTime}分钟 · ${state.selectedState === '紧张焦虑' ? '4-7-8 呼吸法帮你平静' : '温柔地回到当下'}</p><div class="rec-footer"><span class="rating">★ 4.7 · 10.1万人</span><button class="btn btn-primary" data-action="detail">开始归零 →</button></div></article>` : ''}
      ${streak()}
    </div>${nav()}${toast()}
  </section>`;
}

function detail() {
  return `<section class="screen"><div class="detail-hero">${topbar('', 'home', 'toast-favorite')}</div><div class="detail-body">
    <p class="eyebrow">BREATHING · ${state.selectedTime} MIN</p><h2 class="display">${state.selectedState === '紧张焦虑' ? '焦虑释放呼吸' : '晨间呼吸练习'}</h2>
    <span class="meta">★ 4.8 · 12.3 万人练习过</span>
    <p class="description">让注意力安静地落在一呼一吸之间。跟随舒缓的节奏，释放积压的紧张，找回身体里本就存在的平静。</p>
    <ul class="benefits"><li>舒缓紧张与焦虑</li><li>恢复专注和清晰</li><li>适合工作前或睡前</li></ul>
    <button class="btn btn-primary btn-lg btn-block" data-action="practice">开始归零 · ${state.selectedTime} 分钟</button>
  </div>${toast()}</section>`;
}

function practice() {
  const total = state.selectedTime * 60;
  const progress = Math.max(0, Math.round((1 - state.seconds / total) * 100));
  const mm = String(Math.floor(state.seconds / 60)).padStart(2, '0');
  const ss = String(state.seconds % 60).padStart(2, '0');
  return `<section class="screen practice">${topbar('', 'detail', '')}<div class="practice-content">
    <div class="timer-ring ${state.playing ? '' : 'paused'}" style="--progress:${100 - progress}"><svg viewBox="0 0 240 240"><circle class="ring-bg" cx="120" cy="120" r="106"/><circle class="ring-progress" cx="120" cy="120" r="106"/></svg><div><div class="timer-number">${mm}:${ss}</div><div class="timer-state">${state.playing ? '剩余' : '已暂停'}</div></div></div>
    <h2>晨间呼吸练习</h2><p class="practice-copy">闭上眼睛，放松肩膀。<br>慢慢吸气，再缓缓呼出。</p>
    <div class="practice-progress"><span style="width:${progress}%"></span></div>
    <div class="practice-controls"><button class="end-btn" data-action="complete">结束练习</button><button class="play-btn" data-action="toggle-play" aria-label="${state.playing ? '暂停' : '继续'}">${icon(state.playing ? 'pause' : 'play')}</button><span></span></div>
  </div></section>`;
}

function complete() {
  return `<section class="screen complete"><div class="check-circle">${icon('check')}</div><h2 class="display">归零完成</h2><p>你练习了 ${state.selectedTime} 分钟</p><div class="feeling-label">这次感觉怎么样？</div><div class="feelings">${['😣','😔','😐','😊','☺️'].map((f, i) => `<button class="feeling ${state.feeling === i ? 'selected' : ''}" data-feeling="${i}">${f}</button>`).join('')}</div>${streak()}<div class="complete-actions"><button class="btn btn-primary btn-lg btn-block" data-action="repeat">再归零一次</button><button class="btn btn-ghost btn-block" data-action="home">回到首页</button></div></section>`;
}

const practices = [
  ['晨间唤醒','5 分钟 · 开启清醒的一天'], ['焦虑释放呼吸','5 分钟 · 找回内在平静'], ['午间复位','3 分钟 · 给大脑一点空白'], ['深度专注','10 分钟 · 进入心流之前'], ['温柔入眠','15 分钟 · 放下今天'],
];
function explore() {
  const filters = ['全部','晨间唤醒','舒缓焦虑','专注','睡眠'];
  const shown = state.filter === '全部' ? practices : state.filter === '晨间唤醒' ? [practices[0], practices[2]] : practices.slice(1, 3);
  return `<section class="screen">${topbar('探索')}<div class="page-content"><input class="search" placeholder="搜索练习" aria-label="搜索练习"><div class="filter-row">${filters.map(f => `<button class="filter ${state.filter === f ? 'active' : ''}" data-filter="${f}">${f}</button>`).join('')}</div><div class="practice-list">${shown.map(([name, meta], i) => `<button class="practice-item" data-practice="${i}"><span class="item-art">${icon('target')}</span><span><h3>${name}</h3><p>${meta}</p></span><span class="arrow">›</span></button>`).join('')}</div></div>${nav()}</section>`;
}

function history() {
  const days = ['一','二','三','四','五','六','日'];
  const nums = [29,30,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2];
  return `<section class="screen">${topbar('记录')}<div class="page-content"><div class="stats-card"><span>七月练习概览</span><div class="stats-grid"><div class="stat"><strong>12</strong><small>次归零</small></div><div class="stat"><strong>68</strong><small>分钟</small></div><div class="stat"><strong>3</strong><small>连续天数</small></div></div></div><div class="calendar"><div class="calendar-head"><strong>2026 年 7 月</strong><span class="subtle">‹　›</span></div><div class="calendar-grid">${days.map(d=>`<span class="week">${d}</span>`).join('')}${nums.map((n,i)=>`<span class="day ${i<2||i>32?'other':([4,7,10,13,17,20,22,24,26].includes(i)?'done':'')} ${i===29?'today':''}">${n}</span>`).join('')}</div></div></div>${nav()}</section>`;
}

function profile() {
  return `<section class="screen">${topbar('我的', '', 'toast-settings')}<div class="page-content"><div class="profile-head"><div class="avatar">零</div><h2>归零的人</h2><p>和自己相处的第 28 天</p></div><div class="menu"><button data-action="toast-reminder"><span>每日提醒</span><span>08:30　›</span></button><button data-action="toast-theme"><span>外观主题</span><span>跟随系统　›</span></button><button data-action="toast-sound"><span>声音与触感</span><span>›</span></button><button data-action="toast-about"><span>关于归零</span><span>v1.0　›</span></button></div></div>${nav()}${toast()}</section>`;
}

function toast() { return state.toast ? `<div class="toast">${state.toast}</div>` : ''; }

function render() {
  const views = { splash, onboarding, home, detail, practice, complete, explore, history, profile };
  app.innerHTML = `<div class="phone">${views[state.screen]()}</div>`;
}

let timer;
function startTimer() {
  clearInterval(timer);
  if (state.screen !== 'practice' || !state.playing) return;
  timer = setInterval(() => {
    state.seconds -= 1;
    if (state.seconds <= 0) {
      clearInterval(timer);
      state.screen = 'complete';
      render();
      return;
    }
    const total = state.selectedTime * 60;
    const progress = Math.max(0, Math.round((1 - state.seconds / total) * 100));
    const timerNumber = document.querySelector('.timer-number');
    const progressFill = document.querySelector('.practice-progress span');
    const timerRing = document.querySelector('.timer-ring');
    if (timerNumber) timerNumber.textContent = `${String(Math.floor(state.seconds / 60)).padStart(2, '0')}:${String(state.seconds % 60).padStart(2, '0')}`;
    if (progressFill) progressFill.style.width = `${progress}%`;
    if (timerRing) timerRing.style.setProperty('--progress', 100 - progress);
  }, 1000);
}

function go(screen) {
  state.screen = screen;
  if (screen === 'home') state.activeNav = 'home';
  render();
  startTimer();
}

app.addEventListener('click', (event) => {
  const el = event.target.closest('button');
  if (!el) return;
  if (el.dataset.state) { state.selectedState = el.dataset.state; render(); return; }
  if (el.dataset.time) { state.selectedTime = Number(el.dataset.time); render(); return; }
  if (el.dataset.feeling) { state.feeling = Number(el.dataset.feeling); render(); return; }
  if (el.dataset.filter) { state.filter = el.dataset.filter; render(); return; }
  if (el.dataset.practice !== undefined) { state.selectedState = '想要保持'; go('detail'); return; }
  if (el.dataset.nav) { state.activeNav = el.dataset.nav; go(el.dataset.nav); return; }
  const action = el.dataset.action;
  if (!action) return;
  if (action === 'next-onboard') { state.onboarding < 2 ? (state.onboarding++, render()) : go('home'); }
  else if (action === 'practice' || action === 'repeat') { state.seconds = state.selectedTime * 60; state.playing = true; go('practice'); }
  else if (action === 'toggle-play') { state.playing = !state.playing; render(); startTimer(); }
  else if (['home','detail','complete'].includes(action)) go(action);
  else if (action.startsWith('toast-')) { state.toast = { 'toast-settings':'设置即将开放', 'toast-favorite':'已收藏这项练习', 'toast-reminder':'提醒设置即将开放', 'toast-theme':'更多主题正在准备中', 'toast-sound':'声音设置即将开放', 'toast-about':'归零 v1.0 · 安静地回来' }[action]; render(); setTimeout(()=>{state.toast='';render();}, 1900); }
});

render();
if (!preview.has('screen')) {
  setTimeout(() => { if (state.screen === 'splash') go('onboarding'); }, 1800);
}
