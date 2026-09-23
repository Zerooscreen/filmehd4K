const express = require('express');
const { tmdb, img, slugify } = require('./lib/tmdb');
const { 
  renderLayout, 
  renderHome, 
  renderDetail, 
  renderActor, 
  renderSearch, 
  renderCountdown 
} = require('./lib/render');

const app = express();
const PORT = process.env.PORT || 8080;
const DOMAIN = 'https://filmehd4K.up.railway.app'; // Sesuaikan dengan domain Railway Anda

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sitemap.xml Route
app.get('/sitemap.xml', async (req, res) => {
  try {
    const [trending, popular] = await Promise.all([
      tmdb('/trending/movie/week'),
      tmdb('/movie/popular')
    ]);

    const movies = [...(trending.results || []), ...(popular.results || [])];
    const uniqueMovies = Array.from(new Map(movies.map(m => [m.id, m])).values());

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/</loc>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;

    uniqueMovies.forEach(m => {
      xml += `  <url>\n`;
      xml += `    <loc>${DOMAIN}/movie/${m.id}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    console.error('Sitemap Error:', err);
    res.status(500).send('Error generating sitemap');
  }
});

// Robots.txt Route
app.get('/robots.txt', (req, res) => {
  const robots = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml`;
  res.header('Content-Type', 'text/plain');
  res.send(robots);
});

// Halaman Utama (Home)
app.get('/', async (req, res) => {
  try {
    const [trending, popular, topRated] = await Promise.all([
      tmdb('/trending/movie/week'),
      tmdb('/movie/popular'),
      tmdb('/movie/top_rated')
    ]);

    const content = renderHome({
      trending: trending.results || [],
      popular: popular.results || [],
      topRated: topRated.results || []
    });

    res.send(renderLayout('filmehd4K — Filme online subtitrate in romana', content));
  } catch (err) {
    console.error('Home Error:', err);
    res.status(500).send('A apărut o eroare pe server.');
  }
});

// Halaman Pencarian
app.get('/search', async (req, res) => {
  try {
    const query = req.query.q || '';
    let results = [];
    if (query) {
      const searchRes = await tmdb('/search/movie', { query });
      results = searchRes.results || [];
    }
    const content = renderSearch(query, results);
    res.send(renderLayout(`Căutare: ${query}`, content));
  } catch (err) {
    console.error('Search Error:', err);
    res.status(500).send('A apărut o eroare pe server.');
  }
});

// Halaman Detail Film
app.get('/movie/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const [movie, credits, videos, similar] = await Promise.all([
      tmdb(`/movie/${movieId}`),
      tmdb(`/movie/${movieId}/credits`),
      tmdb(`/movie/${movieId}/videos`),
      tmdb(`/movie/${movieId}/similar`)
    ]);

    const content = renderDetail({
      movie,
      cast: credits.cast || [],
      videos: videos.results || [],
      similar: similar.results || []
    });

    res.send(renderLayout(movie.title || 'Detalii Film', content));
  } catch (err) {
    console.error('Movie Detail Error:', err);
    res.status(404).send('Filmul nu a fost găsit.');
  }
});

// Halaman Hitung Mundur (Watch Countdown)
app.get('/watch/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await tmdb(`/movie/${movieId}`);
    const content = renderCountdown(movie.title || 'Pregătire redare');
    res.send(renderLayout('Se pregătește redarea', content));
  } catch (err) {
    console.error('Watch Countdown Error:', err);
    res.redirect('https://moviegate.bolt.host/ro?');
  }
});

// Halaman Detail Aktor (Dengan Fallback Inggris jika biografi kosong)
app.get('/actor/:id', async (req, res) => {
  try {
    const actorId = req.params.id;
    const [personRes, personEnRes, movieCredits] = await Promise.all([
      tmdb(`/person/${actorId}`, { language: 'ro-RO' }).catch(() => null),
      tmdb(`/person/${actorId}`, { language: 'en-US' }).catch(() => null),
      tmdb(`/person/${actorId}/movie_credits`)
    ]);

    let person = personRes || {};
    if ((!person.biography || person.biography.trim() === '') && personEnRes && personEnRes.biography) {
      person.biography = personEnRes.biography;
    }

    const uniqueMovies = Array.from(
      new Map((movieCredits.cast || []).map(m => [m.id, m])).values()
    );

    const content = renderActor({
      person,
      movies: uniqueMovies
    });

    res.send(renderLayout(person.name || 'Profil Actor', content));
  } catch (err) {
    console.error('Actor Detail Error:', err);
    res.status(404).send('Informațiile despre actor nu au fost găsite.');
  }
});

app.listen(PORT, () => {
  console.log(`Serverul filmehd4K Frulează pe portul ${PORT}`);
});
