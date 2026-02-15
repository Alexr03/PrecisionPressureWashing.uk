<script setup lang="ts">
const services = [
  {
    title: 'Driveways',
    description: 'Restore your driveway to its original condition. We remove years of built-up dirt, oil stains, moss and algae — leaving a clean, safe surface.',
    icon: 'driveway',
  },
  {
    title: 'Patios',
    description: 'Transform your patio from dull and green to fresh and inviting. Perfect for entertaining or simply enjoying your outdoor space again.',
    icon: 'patio',
  },
  {
    title: 'Paths',
    description: 'Eliminate slippery moss and grime from paths and walkways. Improve safety and kerb appeal with a professional deep clean.',
    icon: 'path',
  },
  {
    title: 'Decking',
    description: 'Bring weathered, grey decking back to life. Our gentle but effective cleaning process removes algae without damaging the wood.',
    icon: 'decking',
  },
]
</script>

<template>
  <section id="services" class="relative py-24 sm:py-32 overflow-hidden">
    <!-- Background accents -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-radial from-blue-600/5 via-transparent to-transparent blur-3xl" />
    <div class="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-radial from-cyan-500/3 via-transparent to-transparent blur-3xl" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16 sm:mb-20 scroll-reveal">
        <span class="inline-block text-blue-400 font-display text-sm uppercase tracking-[0.2em] mb-4">
          What We Do
        </span>
        <h2 class="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight">
          Our Services
        </h2>
        <div class="section-divider mb-6" />
        <p class="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
          From driveways to decking, we use professional-grade equipment to deliver
          outstanding results on every surface.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="(service, index) in services"
          :key="service.title"
          class="scroll-reveal group"
          :class="`stagger-${index + 1}`"
        >
          <div class="glass-card-hover p-8 h-full flex flex-col items-center text-center">
            <!-- Icon -->
            <div class="relative mb-6">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center
                          border border-blue-500/10 group-hover:border-blue-400/30 transition-all duration-500
                          group-hover:shadow-lg group-hover:shadow-blue-500/10">
                <!-- Driveway -->
                <svg v-if="service.icon === 'driveway'" class="w-8 h-8 text-blue-400 transition-colors group-hover:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                <!-- Patio -->
                <svg v-else-if="service.icon === 'patio'" class="w-8 h-8 text-blue-400 transition-colors group-hover:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
                </svg>
                <!-- Path -->
                <svg v-else-if="service.icon === 'path'" class="w-8 h-8 text-blue-400 transition-colors group-hover:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
                <!-- Decking -->
                <svg v-else class="w-8 h-8 text-blue-400 transition-colors group-hover:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
              </div>
              <!-- Decorative dot -->
              <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500/40 group-hover:bg-blue-400/60 transition-colors duration-500" />
            </div>

            <!-- Title -->
            <h3 class="font-display font-semibold text-xl text-white mb-3 tracking-wide">
              {{ service.title }}
            </h3>

            <!-- Description -->
            <p class="text-slate-400 text-sm leading-relaxed flex-1">
              {{ service.description }}
            </p>

            <!-- Hover indicator -->
            <div class="mt-6 flex items-center gap-1.5 text-blue-400/0 group-hover:text-blue-400 transition-all duration-500 text-sm font-medium">
              <span>Learn more</span>
              <svg class="w-4 h-4 transform translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
