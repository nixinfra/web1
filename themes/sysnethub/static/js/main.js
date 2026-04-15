/* SysNetHub — main.js */

/* ── SIDEBAR TOGGLE (mobile) ── */
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebarOverlay');
  if (!sb || !ov) return;
  sb.classList.toggle('open');
  ov.classList.toggle('open');
}

/* ── SEARCH ── */
(function initSearch() {
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearch');
  const resultsBox = document.getElementById('searchResults');
  if (!input) return;

  // Build index from Hugo's pages list embedded in the page,
  // or fall back to fetching /index.json if you set up search output.
  let searchIndex = [];

  // Try to fetch /index.json (requires output format in hugo.toml)
  fetch('/index.json')
    .then(r => r.json())
    .then(data => { searchIndex = data; })
    .catch(() => { /* no search index available */ });

  input.addEventListener('input', function() {
    const q = this.value.trim().toLowerCase();
    clearBtn && clearBtn.classList.toggle('visible', q.length > 0);

    if (!q || !resultsBox) return;

    const hits = searchIndex.filter(p =>
      (p.title  && p.title.toLowerCase().includes(q)) ||
      (p.summary && p.summary.toLowerCase().includes(q)) ||
      (p.tags   && p.tags.join(' ').toLowerCase().includes(q))
    ).slice(0, 8);

    if (hits.length === 0) {
      resultsBox.innerHTML = '<div class="search-result-item" style="opacity:.5">Không tìm thấy kết quả</div>';
    } else {
      resultsBox.innerHTML = hits.map(p => {
        const title = p.title.replace(new RegExp(q, 'gi'), m => `<strong>${m}</strong>`);
        return `<a class="search-result-item" href="${p.permalink}">${title}</a>`;
      }).join('');
    }
    resultsBox.classList.add('open');
  });

  // Close on click outside
  document.addEventListener('click', function(e) {
    if (resultsBox && !input.contains(e.target) && !resultsBox.contains(e.target)) {
      resultsBox.classList.remove('open');
    }
  });
})();

function clearSearch() {
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearch');
  const resultsBox = document.getElementById('searchResults');
  if (input) input.value = '';
  if (clearBtn) clearBtn.classList.remove('visible');
  if (resultsBox) resultsBox.classList.remove('open');
}

/* ── COMMENTS (sessionStorage, demo) ── */
function getComments(pageId) {
  try {
    return JSON.parse(sessionStorage.getItem('comments_' + pageId) || '[]');
  } catch(e) { return []; }
}
function saveComments(pageId, list) {
  try { sessionStorage.setItem('comments_' + pageId, JSON.stringify(list)); } catch(e) {}
}

function submitComment(pageId) {
  const name = (document.getElementById('commentName') || {}).value?.trim();
  const text = (document.getElementById('commentText') || {}).value?.trim();
  if (!name || !text) return;

  const list = getComments(pageId);
  list.unshift({
    name, text,
    date: new Date().toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })
  });
  saveComments(pageId, list);

  document.getElementById('commentName').value = '';
  document.getElementById('commentText').value = '';
  renderComments(pageId);
}

function renderComments(pageId) {
  const el = document.getElementById('commentsList');
  if (!el) return;
  const list = getComments(pageId);
  if (!list.length) {
    el.innerHTML = '<div class="no-comments">// Chưa có bình luận. Hãy là người đầu tiên!</div>';
    return;
  }
  el.innerHTML = list.map(c => `
    <div class="comment-item">
      <div class="comment-header">
        <span class="comment-name">${escHtml(c.name)}</span>
        <span class="comment-date">${c.date}</span>
      </div>
      <div class="comment-text">${escHtml(c.text)}</div>
    </div>`).join('');
}

function escHtml(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
