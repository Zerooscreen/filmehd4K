const TMDB_API_KEY = process.env.TMDB_API_KEY || '513182919ede525d4b5c8292e15b3c06';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

async function tmdb(endpoint, params = {}) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', TMDB_API_KEY);
  
  if (!params.language) {
    url.searchParams.append('language', 'ro-RO');
  }

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value);
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`TMDB Error: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

function img(path, size = 'w500') {
  if (!path) return 'https://placehold.co/500x750/17171b/8d8a92?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

function slugify(text = '') {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function getMovieDetails(id) {
  return await tmdb(`/movie/${id}`);
}

async function getMovieCredits(id) {
  const data = await tmdb(`/movie/${id}/credits`);
  return data.cast || [];
}

async function getMovieVideos(id) {
  const data = await tmdb(`/movie/${id}/videos`);
  return data.results || [];
}

async function getSimilarMovies(id) {
  const data = await tmdb(`/movie/${id}/similar`);
  return data.results || [];
}

module.exports = { 
  tmdb, 
  img, 
  slugify, 
  getMovieDetails, 
  getMovieCredits, 
  getMovieVideos, 
  getSimilarMovies 
};
