<script setup>
import { ref, onMounted } from 'vue'
import { getMovies } from '../../services/movieService'
import MovieCard from '../../components/MovieCard.vue'

// =====================================================
// STATE
// =====================================================

const movies = ref([])
const loading = ref(false)
const error = ref(null)

// =====================================================
// GET MOVIES FROM LARAVEL API
// =====================================================

const fetchMovies = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await getMovies()

    console.log('Movies API response:', response.data)

    // Laravel returns:
    // [
    //   {
    //     id: 1,
    //     title: "...",
    //     description: "...",
    //     duration: 120,
    //     genre: "...",
    //     release_date: "...",
    //     poster: "..."
    //   }
    // ]

    movies.value = Array.isArray(response.data)
      ? response.data
      : response.data.data || []

  } catch (err) {
    console.error('Failed to fetch movies:', err)

    error.value = 'Unable to load movies from server.'
  } finally {
    loading.value = false
  }
}

// =====================================================
// RETRY
// =====================================================

const retryFetch = () => {
  fetchMovies()
}

// =====================================================
// LIFECYCLE
// =====================================================

onMounted(() => {
  fetchMovies()
})
</script>

<template>
  <main class="min-h-screen bg-[#050b12] px-4 py-8 pt-20 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">

      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <p
            class="text-xs font-semibold uppercase tracking-[0.25em] text-[#f4c75a]"
          >
            Watch now
          </p>

          <h1
            class="mt-2 text-2xl font-black tracking-[-0.05em] text-white sm:text-3xl"
          >
            Trending movies
          </h1>
        </div>

        <button
          type="button"
          class="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 sm:inline-flex"
        >
          See all
        </button>
      </div>

      <!-- Loading -->
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

      <!-- Error -->
      <div
        v-else-if="error"
        class="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center"
      >
        <p class="mb-4 text-sm text-red-400">
          ⚠️ {{ error }}
        </p>

        <button
          @click="retryFetch"
          type="button"
          class="rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/30"
        >
          Try Again
        </button>
      </div>

      <!-- No movies -->
      <div
        v-else-if="movies.length === 0"
        class="flex min-h-[60vh] flex-col items-center justify-center text-center"
      >
        <p class="text-lg text-gray-500">
          No movies available at the moment
        </p>

        <button
          @click="retryFetch"
          type="button"
          class="mt-4 rounded-lg bg-[#f4c75a]/10 px-4 py-2 text-[#f4c75a] transition hover:bg-[#f4c75a]/20"
        >
          Refresh
        </button>
      </div>

      <!-- Movies -->
      <section
        v-else
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
      >
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        />
      </section>

    </div>
  </main>
</template>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 190px;
  height: 190px;
  perspective: 800px;
}

.loader-text {
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-transform: lowercase;
  letter-spacing: 2px;
  z-index: 10;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
}

.loader-ring {
  width: 190px;
  height: 190px;
  border: 1px solid transparent;
  border-radius: 50%;
  position: absolute;
}

.loader-ring:nth-child(1) {
  border-bottom: 8px solid rgb(255, 141, 249);
  animation: rotate1 2s linear infinite;
}

.loader-ring:nth-child(2) {
  border-bottom: 8px solid rgb(255, 65, 106);
  animation: rotate2 2s linear infinite;
}

.loader-ring:nth-child(3) {
  border-bottom: 8px solid rgb(0, 255, 255);
  animation: rotate3 2s linear infinite;
}

.loader-ring:nth-child(4) {
  border-bottom: 8px solid rgb(252, 183, 55);
  animation: rotate4 2s linear infinite;
}

@keyframes rotate1 {
  from {
    transform: rotateX(50deg) rotateZ(110deg);
  }

  to {
    transform: rotateX(50deg) rotateZ(470deg);
  }
}

@keyframes rotate2 {
  from {
    transform: rotateX(20deg) rotateY(50deg) rotateZ(20deg);
  }

  to {
    transform: rotateX(20deg) rotateY(50deg) rotateZ(380deg);
  }
}

@keyframes rotate3 {
  from {
    transform: rotateX(40deg) rotateY(130deg) rotateZ(450deg);
  }

  to {
    transform: rotateX(40deg) rotateY(130deg) rotateZ(90deg);
  }
}

@keyframes rotate4 {
  from {
    transform: rotateX(70deg) rotateZ(270deg);
  }

  to {
    transform: rotateX(70deg) rotateZ(630deg);
  }
}

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