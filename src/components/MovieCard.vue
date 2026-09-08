
<script setup>
defineProps({
  movie: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article
    class="group relative h-[370px] w-full max-w-[220px] overflow-hidden rounded-[20px] border border-white/10 bg-[#0b0f18] shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_55px_rgba(14,18,32,0.8)]"
  >
    <img
      :src="movie.poster"
      :alt="movie.title"
      class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
    />

    <div class="absolute inset-0 bg-gradient-to-t from-[#070b12] via-[#070b12]/35 to-transparent"></div>

    <div class="absolute inset-x-0 top-0 flex items-center justify-between px-3 pt-3">
      <div class="flex items-center gap-1 rounded-full bg-black/25 px-2 py-1 backdrop-blur-sm">
        <span class="text-[10px] font-black tracking-[-0.08em] text-red-500">N</span>
        <span class="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/80">Series</span>
      </div>
    </div>

    <div class="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
      <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-[0_10px_30px_rgba(255,255,255,0.35)]">
        <svg viewBox="0 0 24 24" class="ml-1 h-5 w-5 fill-current text-[#111827]" aria-hidden="true">
          <path d="M8 5.5v13l10-6.5-10-6.5Z" />
        </svg>
      </div>
    </div>

    <div class="absolute inset-x-0 bottom-0 p-4">
      <h3 class="text-xl font-black tracking-[-0.04em] text-white drop-shadow-md">
        {{ movie.title }}
      </h3>
      <div class="mt-1 flex items-center gap-2 text-[11px] text-white/75">
        <span>{{ movie.genre || 'Crime' }}</span>
        <span class="text-white/45">•</span>
        <span>{{ movie.year || '2024' }}</span>
      </div>
    </div>
  </article>
</template>
