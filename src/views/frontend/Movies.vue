<script setup>
import { ref, onMounted, computed } from 'vue'
import { getMovies } from '../../services/movieService'
import MovieCard from '../../components/MovieCard.vue'

// =====================================================
// STATE
// =====================================================

const movies = ref([])
const loading = ref(false)
const error = ref(null)
const usingFallback = ref(false)

// =====================================================
// FALLBACK DATA
// =====================================================

const fallbackMovies = [
  {
    id: 1,
    title: 'Lupin',
    genre: 'Crime',
    year: 2024,
    poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    release_date: '2024-01-01'
  },
  {
    id: 2,
    title: 'The Witcher',
    genre: 'Fantasy',
    year: 2023,
    poster: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80',
    release_date: '2023-06-15'
  },
  {
    id: 3,
    title: 'Dark',
    genre: 'Mystery',
    year: 2022,
    poster: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80',
    release_date: '2022-03-20'
  },
  {
    id: 4,
    title: 'Midnight',
    genre: 'Thriller',
    year: 2024,
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
    release_date: '2024-11-10'
  },
  {
    id: 5,
    title: 'No Time',
    genre: 'Action',
    year: 2025,
    poster: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=900&q=80',
    release_date: '2025-05-01'
  },
  {
    id: 6,
    title: 'Shadow',
    genre: 'Drama',
    year: 2021,
    poster: 'https://images.unsplash.com/photo-1524989942931-5e7b02e4e6a9?auto=format&fit=crop&w=900&q=80',
    release_date: '2021-08-12'
  },
]

// =====================================================
// COMPUTED PROPERTIES
// =====================================================

const hasMovies = computed(() => movies.value && movies.value.length > 0)
const showEmptyState = computed(() => !loading.value && !hasMovies && !error.value)

// =====================================================
// METHODS
// =====================================================

const fetchMovies = async () => {
  loading.value = true
  error.value = null
  usingFallback.value = false

  try {
    const response = await getMovies()
    const apiMovies = response?.data?.data || response?.data || []

    // Check if we got valid data from API
    if (Array.isArray(apiMovies) && apiMovies.length > 0) {
      movies.value = apiMovies
    } else {
      // Use fallback data
      movies.value = fallbackMovies
      usingFallback.value = true
    }
  } catch (err) {
    console.error('Failed to fetch movies:', err.message || err)

    // Fallback to static data on error
    movies.value = fallbackMovies
    usingFallback.value = true
    error.value = 'Unable to load movies from server. Showing local data.'
  } finally {
    loading.value = false
  }
}

const retryFetch = () => {
  fetchMovies()
}

// =====================================================
// LIFECYCLE
// =====================================================

onMounted(fetchMovies)
</script>

<template>
  <main class="min-h-screen bg-[#050b12] px-4 py-8 sm:px-6 lg:px-8 pt-20">
    <div class="mx-auto max-w-7xl">

      <!-- Header Section -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.25em] text-[#f4c75a]">
            Watch now
          </p>

          <h1 class="mt-2 text-2xl font-black tracking-[-0.05em] text-white sm:text-3xl">
            Trending movies
          </h1>

          <!-- Fallback indicator -->
          <p v-if="usingFallback" class="mt-2 text-xs text-gray-400">
            📦 Showing local preview movies
          </p>
        </div>

        <button
          type="button"
          class="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 sm:inline-flex"
        >
          See all
        </button>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex min-h-[60vh] w-full items-center justify-center"
      >
        <div class="loader-container">
          <div class="loader-ring"></div>
          <div class="loader-ring"></div>
          <div class="loader-ring"></div>
          <div class="loader-ring"></div>

          <div class="loader-text">
            Cine<span class="text-[#f4c75a]">verse</span>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-6 text-center"
      >
        <p class="text-sm text-yellow-400 mb-4">
          ⚠️ {{ error }}
        </p>
        <button
          @click="retryFetch"
          type="button"
          class="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition text-sm font-medium"
        >
          Try Again
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="showEmptyState"
        class="flex min-h-[60vh] flex-col items-center justify-center text-center"
      >
        <p class="text-gray-500 text-lg">
          No movies available at the moment
        </p>
        <button
          @click="retryFetch"
          type="button"
          class="mt-4 px-4 py-2 rounded-lg bg-[#f4c75a]/10 text-[#f4c75a] hover:bg-[#f4c75a]/20 transition"
        >
          Refresh
        </button>
      </div>

      <!-- Movies Grid -->
      <section
        v-else
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
      >
        <MovieCard
          v-for="movie in movies"
          :key="movie.id || movie.title"
          :movie="movie"
        />
      </section>

    </div>
  </main>
</template>

<style scoped>
/* Loading container */
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 190px;
  height: 190px;
  perspective: 800px;
}

/* Loading text */
.loader-text {
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-transform: lowercase;
  letter-spacing: 2px;
  z-index: 10;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
}

/* Rings */
.loader-ring {
  width: 190px;
  height: 190px;
  border: 1px solid transparent;
  border-radius: 50%;
  position: absolute;
}

/* Ring 1 */
.loader-ring:nth-child(1) {
  border-bottom: 8px solid rgb(255, 141, 249);
  animation: rotate1 2s linear infinite;
}

@keyframes rotate1 {
  from {
    transform: rotateX(50deg) rotateZ(110deg);
  }

  to {
    transform: rotateX(50deg) rotateZ(470deg);
  }
}

/* Ring 2 */
.loader-ring:nth-child(2) {
  border-bottom: 8px solid rgb(255, 65, 106);
  animation: rotate2 2s linear infinite;
}

@keyframes rotate2 {
  from {
    transform: rotateX(20deg) rotateY(50deg) rotateZ(20deg);
  }

  to {
    transform: rotateX(20deg) rotateY(50deg) rotateZ(380deg);
  }
}

/* Ring 3 */
.loader-ring:nth-child(3) {
  border-bottom: 8px solid rgb(0, 255, 255);
  animation: rotate3 2s linear infinite;
}

@keyframes rotate3 {
  from {
    transform: rotateX(40deg) rotateY(130deg) rotateZ(450deg);
  }

  to {
    transform: rotateX(40deg) rotateY(130deg) rotateZ(90deg);
  }
}

/* Ring 4 */
.loader-ring:nth-child(4) {
  border-bottom: 8px solid rgb(252, 183, 55);
  animation: rotate4 2s linear infinite;
}

@keyframes rotate4 {
  from {
    transform: rotateX(70deg) rotateZ(270deg);
  }

  to {
    transform: rotateX(70deg) rotateZ(630deg);
  }
}

/* Mobile */
@media (max-width: 640px) {
  .loader-container {
    width: 150px;
    height: 150px;
  }

  .loader-ring {
    width: 150px;
    height: 150px;
  }

  .loader-text {
    font-size: 12px;
  }
}
</style>
