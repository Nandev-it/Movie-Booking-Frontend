<script setup>
import { ref, onMounted } from 'vue'
import { getMovies } from '../../services/movieService'
import Header from '../../components/Header.vue'
import MovieCard from '../../components/MovieCard.vue'

const movies = ref([])
const loading = ref(false)
const error = ref('')

const fallbackMovies = [
  {
    id: 1,
    title: 'Lupin',
    genre: 'Crime',
    year: 2024,
    poster:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'The Witcher',
    genre: 'Fantasy',
    year: 2023,
    poster:
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: 'Dark',
    genre: 'Mystery',
    year: 2022,
    poster:
      'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    title: 'Midnight',
    genre: 'Thriller',
    year: 2024,
    poster:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    title: 'No Time',
    genre: 'Action',
    year: 2025,
    poster:
      'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    title: 'Shadow',
    genre: 'Drama',
    year: 2021,
    poster:
      'https://images.unsplash.com/photo-1524989942931-5e7b02e4e6a9?auto=format&fit=crop&w=900&q=80',
  },
]

const fetchMovies = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await getMovies()
    movies.value = response?.data?.length ? response.data : fallbackMovies
  } catch (err) {
    console.error('API Error:', err)
    movies.value = fallbackMovies
    error.value = ''
  } finally {
    loading.value = false
  }
}

onMounted(fetchMovies)
</script>

<template>
  <Header />

  <main class="min-h-screen bg-[#050b12] px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.25em] text-[#f4c75a]">Watch now</p>
          <h1 class="mt-2 text-2xl font-black tracking-[-0.05em] text-white sm:text-3xl">Trending movies</h1>
        </div>

        <button
          type="button"
          class="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 sm:inline-flex"
        >
          See all
        </button>
      </div>

      <div v-if="loading" class="text-sm text-white/70">Loading movies...</div>

      <div v-else-if="error" class="text-sm text-red-400">{{ error }}</div>

      <section v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <MovieCard v-for="movie in movies" :key="movie.id || movie.title" :movie="movie" />
      </section>
    </div>
  </main>
</template>
