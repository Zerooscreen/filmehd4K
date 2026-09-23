(function () {
  // ---------- Search overlay ----------
  const toggleBtn = document.getElementById('search-toggle');
  const overlay = document.getElementById('search-overlay');
  const closeBtn = document.getElementById('search-close');
  const input = document.getElementById('search-input');
  const resultsEl = document.getElementById('search-results');

  function openSearch() {
    overlay.classList.add('open');
    setTimeout(() => input.focus(), 50);
  }
  function closeSearch() {
    overlay.classList.remove('open');
    input.value = '';
    resultsEl.innerHTML = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSearch();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
  });

  let searchTimer = null;
  if (input) {
    input.addEventListener('input', () => {
      clearTimeout(searchTimer);
      const q = input.value.trim();
      if (!q) { resultsEl.innerHTML = ''; return; }
      searchTimer = setTimeout(() => runSearch(q), 300);
    });
  }

  async function runSearch(q) {
    try {
      const res = await fetch('/api/search?q=' + encodeURIComponent(q));
      const data = await res.json();
      renderResults(data.results || []);
    } catch (e) {
      resultsEl.innerHTML = '';
    }
  }

  function renderResults(items) {
    if (!items.length) {
      resultsEl.innerHTML = '<div class="search-result-sub">Niciun rezultat găsit</div>';
      return;
    }
    resultsEl.innerHTML = items.map(item => `
      <a class="search-result-item" href="/${item.type}/${item.id}/${encodeURIComponent(item.slug || '')}">
        <img src="${item.poster}" alt="${item.title}">
        <div>
          <div class="search-result-title">${item.title}</div>
          <div class="search-result-sub">${item.year || ''}</div>
        </div>
      </a>
    `).join('');
  }

  // ---------- Season accordion (TV detail pages) ----------
  const seasonList = document.getElementById('season-list');
  if (seasonList) {
    seasonList.addEventListener('click', async (e) => {
      const head = e.target.closest('.season-head');
      if (!head) return;
      const item = head.closest('.season-item');
      const panel = item.querySelector('.episode-panel');
      const isOpen = item.classList.contains('open');

      if (isOpen) {
        item.classList.remove('open');
        return;
      }
      item.classList.add('open');

      if (panel.dataset.loaded === 'true') return;
      panel.innerHTML = '<div class="empty">Se încarcă...</div>';

      const tvId = item.dataset.tv;
      const seasonNum = item.dataset.season;
      try {
        const res = await fetch(`/api/season/${tvId}/${seasonNum}`);
        const data = await res.json();
        const episodes = data.episodes || [];
        if (!episodes.length) {
          panel.innerHTML = '<div class="empty">Nu există informații despre episoade</div>';
        } else {
          panel.innerHTML = episodes.map(ep => `
            <a href="/watch/${tvId}/${seasonNum}/${ep.number}" class="episode-row" style="text-decoration: none; color: inherit; display: flex; gap: 10px; align-items: center;">
              <img src="${ep.still}" alt="${ep.name}" style="width: 120px; height: 68px; object-fit: cover; border-radius: 4px;">
              <div>
                <div class="ep-title" style="font-weight: bold;">Episodul ${ep.number}: ${ep.name}</div>
                <div class="ep-meta" style="font-size: 11px; color: #a1a1aa;">★ ${ep.rating || 'N/A'} · ${ep.airDate || ''}</div>
                <div class="ep-overview" style="font-size: 11px; color: #71717a; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${ep.overview || 'Fără rezumat'}</div>
              </div>
            </a>
          `).join('');
        }
        panel.dataset.loaded = 'true';
      } catch (err) {
        panel.innerHTML = '<div class="empty">Încărcarea datelor a eșuat</div>';
      }
    });
  }
})();
