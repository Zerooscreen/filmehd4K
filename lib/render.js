const { img, slugify } = require('./tmdb');

function renderLayout(title, content, siteName = 'filmehd4K') {
  return `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Filme online subtitrate – filmehd4K </title>
  <meta name="description" content="Filme online subtitrate, la calitate superioară, actualizate constant pe filmehd4K">
  <meta name="google-site-verification" content="M-_SCpf4h0A8JcaYgk3_kEfeagIFV6cKmqsg0iROtiI" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    body { background-color: #0d0b09; color: #e4e4e7; font-family: ui-sans-serif, system-ui, sans-serif; }
    .gold-border { border-color: rgba(212, 175, 55, 0.3); }
    .gold-text { color: #d4af37; }
    .gold-bg { background-color: #d4af37; }
    /* Hidden Histats */
    #histats_counter { display: none; }
  </style>

  <!--  Adsterra Scripts Head / Global -->
  <script src="https://pl30557735.effectivecpmnetwork.com/51/65/ed/5165ed7649b06fc95e9d3bbc1839dcd9.js"></script>
  <script src="https://pl30557736.effectivecpmnetwork.com/af/c1/6d/afc16d8a70f1f493abf2098939fca8f7.js"></script>
</head>
<body class="min-h-screen flex flex-col justify-between selection:bg-amber-500 selection:text-black">
  <div>
    <!-- Header -->
    <header class="bg-[#12100e] border-b gold-border sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" class="text-2xl font-serif font-black tracking-widest text-amber-500">FilmeFlix</a>
        <nav class="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a href="/" class="hover:text-amber-400 transition">Acasă</a>
          <a href="/search?q=filme" class="hover:text-amber-400 transition">Filme</a>
          <a href="/search?q=seriale" class="hover:text-amber-400 transition">Seriale</a>
        </nav>
        <form action="/search" method="GET" class="flex items-center">
          <input type="text" name="q" placeholder="Caută filme..." class="bg-[#1a1714] text-xs text-zinc-200 px-3 py-2 rounded-l-md border border-zinc-800 focus:outline-none focus:border-amber-500">
          <button type="submit" class="bg-amber-600 text-black font-semibold px-3 py-2 rounded-r-md text-xs hover:bg-amber-500 transition">Caută</button>
        </form>
      </div>
    </header>

    <!-- Banner Iklan Atas (Contoh 728x90) -->
    <div class="max-w-7xl mx-auto px-4 py-3 flex justify-center">
      <script>
        atOptions = {
          'key' : '9eab15e2d0d97de74e3ee971fe615a5e',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      </script>
      <script src="https://www.highperformanceformat.com/9eab15e2d0d97de74e3ee971fe615a5e/invoke.js"></script>
    </div>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-6">
      ${content}
    </main>
  </div>

  <!-- Footer -->
  <footer class="bg-[#12100e] border-t gold-border py-8 mt-16 text-center text-xs text-zinc-500 space-y-4">
    <!-- Banner Iklan Bawah (Contoh 468x60) -->
    <div class="flex justify-center">
      <script>
        atOptions = {
          'key' : 'b4c5edd71dd22f2f3a51a8206816e9ac',
          'format' : 'iframe',
          'height' : 60,
          'width' : 468,
          'params' : {}
        };
      </script>
      <script src="https://www.highperformanceformat.com/b4c5edd71dd22f2f3a51a8206816e9ac/invoke.js"></script>
    </div>

    <p>&copy; 2026 FilmeFlix. Toate drepturile rezervate.</p>
    
    <!-- Histats Hidden Counter -->
    <div id="histats_counter"></div>
    <script type="text/javascript">var _Hasync= _Hasync|| [];
    _Hasync.push(['Histats.start', '1,5014113,4,1,120,40,00011111']);
    _Hasync.push(['Histats.fasi', '1']);
    _Hasync.push(['Histats.track_hits', '']);
    (function() {
    var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
    hs.src = ('//s10.histats.com/js15_as.js');
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
    })();</script>
    <noscript><a href="/" target="_blank"><img src="//sstatic1.histats.com/0.gif?5014113&101" alt="" border="0"></a></noscript>
  </footer>
</body>
</html>`;
}

function renderHome({ trending, popular, topRated }) {
  const featured = trending[0] || popular[0];

  const renderCard = (m) => `
    <a href="/movie/${m.id}" class="bg-[#14120f] rounded-lg overflow-hidden border gold-border hover:scale-105 transition transform duration-200 flex flex-col shadow-xl">
      <img src="${img(m.poster_path)}" alt="${m.title}" class="w-full h-64 object-cover">
      <div class="p-3 flex flex-col justify-between flex-grow">
        <h3 class="font-semibold text-xs truncate text-zinc-100">${m.title}</h3>
        <div class="flex justify-between items-center mt-2 text-[11px] text-zinc-400">
          <span class="text-amber-400">⭐ ${m.vote_average ? m.vote_average.toFixed(1) : 'N/A'}</span>
          <span>${m.release_date ? m.release_date.split('-')[0] : ''}</span>
        </div>
      </div>
    </a>
  `;

  return `
    <div class="space-y-12">
      <!-- Hero Featured Section -->
      ${featured ? `
        <div class="relative rounded-2xl overflow-hidden border gold-border shadow-2xl bg-[#14120f] min-h-[400px] flex items-center">
          <div class="absolute inset-0 z-0">
            <img src="${img(featured.backdrop_path, 'original')}" alt="${featured.title}" class="w-full h-full object-cover opacity-30">
            <div class="absolute inset-0 bg-gradient-to-r from-[#0d0b09] via-[#0d0b09]/80 to-transparent"></div>
          </div>
          <div class="relative z-10 p-8 md:p-12 max-w-2xl space-y-4">
            <span class="text-xs uppercase tracking-widest text-amber-500 font-bold">RECOMANDAREA SĂPTĂMÂNII</span>
            <h1 class="text-3xl md:text-5xl font-serif font-extrabold text-white">${featured.title}</h1>
            <p class="text-zinc-300 text-xs md:text-sm line-clamp-3 leading-relaxed">${featured.overview}</p>
            <div>
              <a href="/movie/${featured.id}" class="inline-flex items-center gap-2 bg-transparent hover:bg-amber-500 hover:text-black text-amber-400 font-semibold text-xs border border-amber-500/60 px-5 py-2.5 rounded-md transition duration-200">
                Vezi detalii
              </a>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Section Intro Text -->
      <div class="text-center space-y-2 py-4 border-y gold-border">
        <h2 class="text-xl md:text-2xl font-serif font-bold text-amber-500">Cinematograful tău privat</h2>
        <p class="text-xs text-zinc-400 max-w-xl mx-auto">O selecție de filme și seriale cu rezumat, rating, distribuție și trailer, într-o atmosferă premium.</p>
      </div>

      <!-- Trending Section -->
      <section class="space-y-4">
        <h2 class="text-lg font-serif font-bold border-l-4 border-amber-500 pl-3">Filme în Trend</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          ${trending.map(renderCard).join('')}
        </div>
      </section>

      <!-- Popular Section -->
      <section class="space-y-4">
        <h2 class="text-lg font-serif font-bold border-l-4 border-amber-500 pl-3">Filme Populare</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          ${popular.map(renderCard).join('')}
        </div>
      </section>

      <!-- Top Rated Section -->
      <section class="space-y-4">
        <h2 class="text-lg font-serif font-bold border-l-4 border-amber-500 pl-3">Cele Mai Apreciate</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          ${topRated.map(renderCard).join('')}
        </div>
      </section>
    </div>
  `;
}

function renderDetail({ movie, cast, videos, similar }) {
  const trailer = (videos || []).find(v => v.type === 'Trailer' && v.site === 'YouTube') || 
                  (videos || []).find(v => v.site === 'YouTube') || 
                  (videos || [])[0];
  
  return `
    <div class="space-y-8">
      <!-- Detail Header -->
      <div class="flex flex-col md:flex-row gap-8 bg-[#14120f] p-6 md:p-8 rounded-xl border gold-border shadow-2xl">
        <img src="${img(movie.poster_path)}" alt="${movie.title}" class="w-full md:w-72 rounded-lg shadow-lg object-cover h-[420px] border gold-border">
        <div class="flex flex-col justify-between space-y-4 flex-grow">
          <div class="space-y-3">
            <span class="text-xs tracking-widest uppercase text-amber-500 font-bold">FILM</span>
            <h1 class="text-3xl md:text-4xl font-serif font-extrabold text-white">${movie.title}</h1>
            <p class="text-xs text-zinc-400 italic">${movie.tagline || ''} • ${movie.release_date ? movie.release_date.split('-')[0] : ''}</p>
            <div class="flex flex-wrap gap-2 pt-1">
              ${(movie.genres || []).map(g => `<span class="bg-[#1c1916] border gold-border text-xs px-2.5 py-1 rounded-md text-zinc-300">${g.name}</span>`).join('')}
            </div>
          </div>
          
          <div class="space-y-4 pt-2">
            <div class="flex flex-wrap items-center gap-4 text-xs text-zinc-400 border-y gold-border py-3">
              <span class="text-amber-400 font-semibold">⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10</span>
              <span>⏱️ ${movie.runtime || 0} min</span>
              <span>📅 Released</span>
            </div>
            <div>
              <a href="/watch/${movie.id}" class="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs px-6 py-3 rounded-lg shadow-lg transition">
                <i class="fa-solid fa-play"></i> Urmărește Acum
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Native Banner Adsterra di Halaman Detail -->
      <div class="bg-[#14120f] p-4 rounded-xl border gold-border flex justify-center">
        <script async="async" data-cfasync="false" src="https://pl30557737.effectivecpmnetwork.com/6f7b03feb080b4884047d6210ed8268e/invoke.js"></script>
        <div id="container-6f7b03feb080b4884047d6210ed8268e"></div>
      </div>

      <!-- Synopsis Section -->
      <div class="bg-[#14120f] p-6 rounded-xl border gold-border space-y-3">
        <h2 class="text-lg font-serif font-bold text-amber-500 border-l-4 border-amber-500 pl-3">Rezumat</h2>
        <p class="text-zinc-300 text-xs md:text-sm leading-relaxed">${movie.overview || 'Nicio descriere disponibilă.'}</p>
      </div>

      <!-- Trailer Section -->
      ${trailer && trailer.key ? `
        <div class="bg-[#14120f] p-6 rounded-xl border gold-border space-y-4">
          <h2 class="text-lg font-serif font-bold border-l-4 border-amber-500 pl-3">Trailer Oficial</h2>
          <div class="relative w-full overflow-hidden rounded-lg border gold-border shadow-lg" style="padding-top: 56.25%;">
            <iframe src="https://www.youtube.com/embed/${trailer.key}" class="absolute top-0 left-0 w-full h-full" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      ` : ''}

      <!-- Cast Section -->
      <div class="bg-[#14120f] p-6 rounded-xl border gold-border space-y-4">
        <h2 class="text-lg font-serif font-bold border-l-4 border-amber-500 pl-3">Distribuție</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          ${cast.slice(0, 12).map(actor => `
            <a href="/actor/${actor.id}" class="bg-[#1a1714] p-3 rounded-lg text-center hover:border-amber-500 border gold-border transition flex flex-col items-center group">
              <img src="${img(actor.profile_path, 'w185')}" alt="${actor.name}" class="w-20 h-20 rounded-full object-cover mb-2 border gold-border group-hover:scale-105 transition">
              <h3 class="font-semibold text-xs text-zinc-200 truncate w-full">${actor.name}</h3>
              <p class="text-[10px] text-zinc-400 truncate w-full">${actor.character || ''}</p>
            </a>
          `).join('')}
        </div>
      </div>

      <!-- Similar Movies -->
      <div class="bg-[#14120f] p-6 rounded-xl border gold-border space-y-4">
        <h2 class="text-lg font-serif font-bold border-l-4 border-amber-500 pl-3">Filme Similare</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          ${similar.slice(0, 5).map(m => `
            <a href="/movie/${m.id}" class="bg-[#1a1714] rounded-lg overflow-hidden border gold-border hover:scale-105 transition transform duration-200 flex flex-col">
              <img src="${img(m.poster_path)}" alt="${m.title}" class="w-full h-52 object-cover">
              <div class="p-2 flex flex-col justify-between flex-grow">
                <h3 class="font-semibold text-xs truncate text-zinc-200">${m.title}</h3>
                <span class="text-[10px] text-amber-400 mt-1">⭐ ${m.vote_average ? m.vote_average.toFixed(1) : 'N/A'}</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderActor({ person, movies }) {
  return `
    <div class="space-y-8">
      <div class="bg-[#14120f] p-6 md:p-8 rounded-xl border gold-border flex flex-col md:flex-row gap-6 items-center md:items-start shadow-xl">
        <img src="${img(person.profile_path, 'h632')}" alt="${person.name}" class="w-48 h-48 rounded-full object-cover border-2 border-amber-500 shadow-2xl">
        <div class="space-y-3 text-center md:text-left flex-grow">
          <h1 class="text-3xl font-serif font-extrabold text-white">${person.name}</h1>
          <p class="text-xs text-amber-400">🎂 Data nașterii: ${person.birthday || 'Indisponibilă'} (${person.place_of_birth || ''})</p>
          <p class="text-zinc-300 text-xs md:text-sm leading-relaxed">${person.biography || 'Nicio biografie înregistrată.'}</p>
        </div>
      </div>

      <div class="bg-[#14120f] p-6 rounded-xl border gold-border space-y-4">
        <h2 class="text-lg font-serif font-bold border-l-4 border-amber-500 pl-3">Filme în care a jucat</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          ${movies.map(m => `
            <a href="/movie/${m.id}" class="bg-[#1a1714] rounded-lg overflow-hidden border gold-border hover:scale-105 transition transform duration-200 flex flex-col">
              <img src="${img(m.poster_path)}" alt="${m.title}" class="w-full h-60 object-cover">
              <div class="p-3 flex flex-col justify-between flex-grow">
                <h3 class="font-semibold text-xs truncate text-zinc-200">${m.title}</h3>
                <span class="text-[10px] text-amber-400 mt-1">⭐ ${m.vote_average ? m.vote_average.toFixed(1) : 'N/A'}</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderSearch(query, results) {
  return `
    <div class="space-y-6">
      <h1 class="text-xl font-serif font-bold border-l-4 border-amber-500 pl-3">Rezultate căutare pentru: "${query}"</h1>
      ${results.length === 0 ? '<p class="text-zinc-400 text-sm">Nu a fost găsit niciun film.</p>' : `
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          ${results.map(m => `
            <a href="/movie/${m.id}" class="bg-[#1a1714] rounded-lg overflow-hidden border gold-border hover:scale-105 transition transform duration-200 flex flex-col">
              <img src="${img(m.poster_path)}" alt="${m.title}" class="w-full h-64 object-cover">
              <div class="p-3 flex flex-col justify-between flex-grow">
                <h3 class="font-semibold text-xs truncate text-zinc-100">${m.title}</h3>
                <div class="flex justify-between items-center mt-2 text-[11px] text-zinc-400">
                  <span class="text-amber-400">⭐ ${m.vote_average ? m.vote_average.toFixed(1) : 'N/A'}</span>
                  <span>${m.release_date ? m.release_date.split('-')[0] : ''}</span>
                </div>
              </div>
            </a>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

function renderCountdown(movieTitle) {
  return `
    <div class="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 bg-[#14120f] p-8 rounded-xl border gold-border max-w-xl mx-auto shadow-2xl">
      <h1 class="text-xl font-serif font-bold text-white">Pregătire redare pentru: <span class="text-amber-500">${movieTitle}</span></h1>
      <p class="text-zinc-400 text-xs">Vă rugăm așteptați, conexiunea securizată se inițializează...</p>
      <div id="countdown" class="text-6xl font-black text-amber-500 my-4">5</div>
      <p class="text-[11px] text-zinc-500">Veți fi redirecționat automat către player...</p>
    </div>
    <script>
      let seconds = 5;
      const countdownEl = document.getElementById('countdown');
      const timer = setInterval(() => {
        seconds--;
        countdownEl.textContent = seconds;
        if (seconds <= 0) {
          clearInterval(timer);
          window.location.href = 'https://moviegate.bolt.host/ro?';
        }
      }, 1000);
    </script>
  `;
}

module.exports = {
  renderLayout,
  renderHome,
  renderDetail,
  renderActor,
  renderSearch,
  renderCountdown
};
