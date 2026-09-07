/* ════════════════════════════════════════════════════════════════
   CredResolve Voice AI — Application Logic
   Dedicated Single Page Voice Bot Caller with API bot hooks.
   ════════════════════════════════════════════════════════════════ */

// ─── Official Voice AI Endpoints ────────────────────────────────
const STORAGE_KEY = 'credresolve_voice_bots_v3';
const OFFICIAL_BOTS = [
  {
    id: 'bot_loan_sales',
    name: 'Loan Sales Bot',
    number: '+918037785510',
    desc: 'Instant loan eligibility qualification, interest rate advisory & disbursement guidance',
    badge: 'Loan Sales',
    color: '#F97316',
    createdAt: new Date().toISOString()
  },
  {
    id: 'bot_customer_support',
    name: 'Customer support Bot',
    number: '+918047092020',
    desc: '24/7 automated account assistance, dispute queries & instant query resolution',
    badge: 'Support 24/7',
    color: '#3B82F6',
    createdAt: new Date().toISOString()
  },
  {
    id: 'bot_predue',
    name: 'Predue Bot',
    number: '+918037749756',
    desc: 'Early pre-due payment reminders, date extensions & digital pay links before due date',
    badge: 'Pre-due Bucket',
    color: '#10B981',
    createdAt: new Date().toISOString()
  },
  {
    id: 'bot_overdue',
    name: 'Overdue Bot',
    number: '+918065970526',
    desc: 'Delinquency recovery, promise-to-pay arrangements & customized settlement waivers',
    badge: 'Overdue Bucket',
    color: '#EA580C',
    createdAt: new Date().toISOString()
  }
];

let bots = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
if (!bots || !Array.isArray(bots) || bots.length === 0) {
  bots = OFFICIAL_BOTS;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bots));
}

// ─── Render Voice Bots ──────────────────────────────────────────
function formatPhoneDisplay(num) {
  const clean = num.replace(/\s+/g, '');
  if (clean.startsWith('+91') && clean.length === 13) {
    return `+91 ${clean.slice(3, 8)} ${clean.slice(8)}`;
  }
  return num;
}

function renderUserBots() {
  const grid = document.getElementById('user-bot-grid');
  const empty = document.getElementById('user-empty');

  if (!grid) return;

  if (bots.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }

  if (empty) empty.style.display = 'none';

  grid.innerHTML = bots.map((bot, i) => `
    <div class="user-bot-card animate-in" style="animation-delay:${i * 0.08}s" onclick="openCallModal('${bot.id}')">
      <div class="card-header-row">
        <div class="bot-avatar-container">
          <div class="bot-avatar" style="background:${bot.color}">
            ${getInitials(bot.name)}
          </div>
          <span class="pulse-status-badge"></span>
        </div>

        <div class="voice-ai-equalizer" title="Voice AI Active">
          <span class="eq-bar eb-1"></span>
          <span class="eq-bar eb-2"></span>
          <span class="eq-bar eb-3"></span>
          <span class="eq-bar eb-4"></span>
          <span class="eq-bar eb-5"></span>
        </div>

        <div class="live-agent-tag">
          <span class="tag-dot"></span>
          ${escapeHtml(bot.badge || 'Voice AI')}
        </div>
      </div>

      <div class="user-bot-info">
        <h3 class="bot-title">${escapeHtml(bot.name)}</h3>
        <p class="bot-desc">${escapeHtml(bot.desc || 'Voice AI agent ready for real-time conversation.')}</p>
        
        <div class="bot-specs-row">
          <span class="spec-pill">
            <span class="badge-dot green-pulse" style="width:6px;height:6px;display:inline-block;flex-shrink:0;"></span>
            Instant Voice Line
          </span>
          <span class="spec-tag">Zero Wait</span>
        </div>
      </div>

      <div class="call-action-trigger">
        <span class="call-cta-text">Start Call</span>
        <div class="user-call-icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.01-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.1.31.03.66-.25 1.02l-2.2 2.2z"/></svg>
        </div>
      </div>
    </div>
  `).join('');
}

// ─── Call Modal ─────────────────────────────────────────────────
function openCallModal(botId) {
  const bot = bots.find(b => b.id === botId);
  if (!bot) return;

  const nameEl = document.getElementById('call-bot-name');
  const numEl = document.getElementById('call-bot-number');
  const statusEl = document.getElementById('call-status');
  const avatar = document.getElementById('call-avatar-inner');
  const btn = document.getElementById('call-btn');
  const modal = document.getElementById('call-modal');

  if (nameEl) nameEl.textContent = bot.name;
  if (numEl) numEl.textContent = formatPhoneDisplay(bot.number);
  if (statusEl) statusEl.innerHTML = '<span class="call-status-dot"></span> Live AI Voice Line • Ready to Connect';

  if (avatar) {
    avatar.style.background = bot.color;
    avatar.innerHTML = `<span style="font-size:1.5rem;font-weight:800;letter-spacing:1px;color:#fff">${getInitials(bot.name)}</span>`;
  }

  document.querySelectorAll('.call-ring').forEach(r => {
    r.style.borderColor = bot.color;
  });

  const cleanNumber = bot.number.replace(/\s+/g, '');
  if (btn) btn.href = 'tel:' + cleanNumber;

  if (modal) modal.classList.add('open');
}

function closeCallModal() {
  const modal = document.getElementById('call-modal');
  if (modal) modal.classList.remove('open');
}

function closeCallModalOutside(e) {
  if (e.target === e.currentTarget) closeCallModal();
}

// ─── Extensible API for Bots (Adding/Updating via API) ───────────
window.setVoiceBots = function(botList) {
  if (Array.isArray(botList)) {
    bots = botList;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bots));
    renderUserBots();
    showToast(`✅ ${botList.length} Voice Bots loaded`);
  }
};

window.addVoiceBot = function(bot) {
  if (bot && bot.name && bot.number) {
    bot.id = bot.id || 'bot_' + Date.now().toString(36);
    bot.color = bot.color || '#F97316';
    bots.push(bot);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bots));
    renderUserBots();
    showToast(`✅ Added bot "${bot.name}"`);
  }
};

window.getVoiceBots = function() {
  return [...bots];
};

// ─── Utilities ──────────────────────────────────────────────────
function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ─── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderUserBots();
});
