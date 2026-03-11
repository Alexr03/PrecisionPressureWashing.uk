<script setup lang="ts">
const { jobs } = useJobs()

function scrollToContact() {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="gallery" class="relative py-24 sm:py-32 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#060e1a] via-[#091b35] to-[#060e1a]" />
    <div class="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-cyan-600/5 via-transparent to-transparent blur-3xl" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16 sm:mb-20 scroll-reveal">
        <span class="inline-block text-blue-400 font-display text-sm uppercase tracking-[0.2em] mb-4">
          See The Difference
        </span>
        <h2 class="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight">
          Before & After
        </h2>
        <div class="section-divider mb-6" />
        <p class="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
          Browse our recent jobs and drag the slider to see the transformation.
        </p>
      </div>

      <!-- Job Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <NuxtLink
          v-for="(job, index) in jobs"
          :key="job.id"
          :to="`/gallery/${job.id}`"
          class="scroll-reveal group"
          :class="`stagger-${index + 1}`"
        >
          <div class="glass-card overflow-hidden transition-all duration-500 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
            <!-- Thumbnail — split before/after preview -->
            <div class="relative w-full aspect-[4/3] overflow-hidden">
              <!-- After image (full) -->
              <img
                :src="job.items[0]?.afterImage"
                :alt="`${job.title} — After`"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <!-- Before image (left half) -->
              <div
                class="absolute inset-0"
                style="clip-path: inset(0 50% 0 0)"
              >
                <img
                  :src="job.items[0]?.beforeImage"
                  :alt="`${job.title} — Before`"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <!-- Divider line -->
              <div class="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.4)] z-10" />

              <!-- Before / After labels -->
              <div class="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-display font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full z-[5]">
                Before
              </div>
              <div class="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-display font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full z-[5]">
                After
              </div>

              <!-- Photo count badge -->
              <div class="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-display font-medium px-3 py-1 rounded-full z-[5] flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ job.items.length }} photos
              </div>

              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-14">
                <div class="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                  <span class="text-white text-sm font-display font-semibold">View Gallery</span>
                  <svg class="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Card Info -->
            <div class="p-5">
              <h3 class="font-display font-semibold text-white text-lg mb-1 group-hover:text-blue-400 transition-colors duration-300">
                {{ job.title }}
              </h3>
              <p class="text-slate-400 text-sm leading-relaxed">
                {{ job.description }}
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- CTA -->
      <div class="text-center mt-14 scroll-reveal">
        <p class="text-slate-400 mb-6">Want results like these for your property?</p>
        <a
          href="#contact"
          class="btn-gold"
          @click.prevent="scrollToContact"
        >
          <span>Get Your Free Quote</span>
        </a>
      </div>
    </div>
  </section>
</template>
