<script setup lang="ts">
const heroReady = ref(false)

onMounted(() => {
  // Small delay to let the page settle, then trigger all hero animations
  requestAnimationFrame(() => {
    heroReady.value = true
  })
})

// Static water droplets (no Math.random to avoid SSR/client mismatch)
const droplets = [
  { id: 0, left: '5%', delay: '0s', duration: '4.2s', distance: '500px', size: '3px', opacity: 0.4 },
  { id: 1, left: '12%', delay: '1.2s', duration: '5.1s', distance: '450px', size: '2px', opacity: 0.3 },
  { id: 2, left: '20%', delay: '0.5s', duration: '3.8s', distance: '600px', size: '4px', opacity: 0.5 },
  { id: 3, left: '28%', delay: '2.1s', duration: '4.5s', distance: '350px', size: '3px', opacity: 0.35 },
  { id: 4, left: '35%', delay: '0.8s', duration: '5.5s', distance: '550px', size: '2px', opacity: 0.25 },
  { id: 5, left: '42%', delay: '3.0s', duration: '4.0s', distance: '480px', size: '5px', opacity: 0.45 },
  { id: 6, left: '50%', delay: '1.5s', duration: '6.0s', distance: '520px', size: '3px', opacity: 0.3 },
  { id: 7, left: '58%', delay: '0.3s', duration: '4.8s', distance: '400px', size: '4px', opacity: 0.5 },
  { id: 8, left: '65%', delay: '2.5s', duration: '3.5s', distance: '460px', size: '2px', opacity: 0.35 },
  { id: 9, left: '72%', delay: '1.8s', duration: '5.3s', distance: '550px', size: '3px', opacity: 0.4 },
  { id: 10, left: '78%', delay: '0.7s', duration: '4.3s', distance: '380px', size: '5px', opacity: 0.3 },
  { id: 11, left: '85%', delay: '3.5s', duration: '5.8s', distance: '500px', size: '2px', opacity: 0.25 },
  { id: 12, left: '92%', delay: '1.0s', duration: '4.6s', distance: '430px', size: '4px', opacity: 0.45 },
  { id: 13, left: '8%', delay: '4.0s', duration: '3.9s', distance: '470px', size: '3px', opacity: 0.3 },
  { id: 14, left: '48%', delay: '2.8s', duration: '5.0s', distance: '540px', size: '2px', opacity: 0.35 },
  { id: 15, left: '88%', delay: '0.2s', duration: '4.1s', distance: '390px', size: '4px', opacity: 0.4 },
]

function scrollTo(selector: string) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- Background Layers (always visible, no animation needed) -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-hero-gradient" />

      <div
        class="absolute top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full
               bg-gradient-radial from-blue-600/12 via-blue-800/5 to-transparent blur-3xl"
      />
      <div
        class="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full
               bg-gradient-radial from-blue-500/8 via-transparent to-transparent blur-3xl"
      />
      <div
        class="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full
               bg-gradient-radial from-cyan-500/5 via-transparent to-transparent blur-2xl animate-float-slow"
      />

      <div
        class="absolute inset-0 opacity-[0.02]"
        style="
          background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 80px 80px;
        "
      />

      <div class="absolute inset-0 noise-overlay" />

      <ClientOnly>
        <div
          v-for="drop in droplets"
          :key="drop.id"
          class="water-droplet"
          :style="{
            left: drop.left,
            top: '-10px',
            '--delay': drop.delay,
            '--duration': drop.duration,
            '--distance': drop.distance,
            width: drop.size,
            height: drop.size,
            opacity: drop.opacity,
          }"
        />
      </ClientOnly>
    </div>

    <!-- Hero Content -->
    <!--
      KEY FIX: Each element has style="opacity:0; transform:translateY(40px)"
      inline so that SSR HTML is ALREADY hidden on first paint. No flash.
      When .hero-go is added, the CSS animation takes over smoothly.
    -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <!-- Logo -->
      <div
        class="mb-8"
        :class="heroReady ? 'hero-enter' : ''"
        style="opacity: 0; transform: translateY(40px); --hero-delay: 0.05s"
      >
        <img
          src="/logo_full.png"
          alt="Precision Pressure Washing"
          class="h-60 sm:h-60 md:h-60 w-auto mx-auto drop-shadow-2xl"
        />
      </div>

      <!-- Heading -->
      <h1
        class="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
               tracking-tight leading-[0.95] mb-6"
        :class="heroReady ? 'hero-enter' : ''"
        style="opacity: 0; transform: translateY(40px); --hero-delay: 0.15s"
      >
        <span class="text-white">Driveway & Patio</span>
        <br />
        <span class="text-gradient-blue">Cleaning Experts</span>
      </h1>

      <!-- Subheading -->
      <p
        class="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-4"
        :class="heroReady ? 'hero-enter' : ''"
        style="opacity: 0; transform: translateY(40px); --hero-delay: 0.28s"
      >
        We'll make your exterior surfaces look like new.
        <br class="hidden sm:block" />
        Professional results, every time.
      </p>

      <!-- Trust badges -->
      <div
        class="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 text-sm text-slate-500"
        :class="heroReady ? 'hero-enter' : ''"
        style="opacity: 0; transform: translateY(40px); --hero-delay: 0.38s"
      >
        <span class="flex items-center gap-1.5">
          <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          Fully Insured
        </span>
        <span class="flex items-center gap-1.5">
          <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          Free Quotes
        </span>
        <span class="flex items-center gap-1.5">
          <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          Local & Reliable
        </span>
      </div>

      <!-- CTA Buttons -->
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        :class="heroReady ? 'hero-enter' : ''"
        style="opacity: 0; transform: translateY(40px); --hero-delay: 0.48s"
      >
        <a href="#contact" class="btn-gold w-full sm:w-auto" @click.prevent="scrollTo('#contact')">
          <span class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            Get a Free Quote
          </span>
        </a>
        <a href="tel:07912606539" class="btn-outline w-full sm:w-auto">
          <span class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            07912 606539
          </span>
        </a>
      </div>

      <!-- Scroll indicator -->
      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2"
        :class="heroReady ? 'hero-enter' : ''"
        style="opacity: 0; transform: translateY(40px); --hero-delay: 0.7s"
      >
        <a
          href="#services"
          class="flex flex-col items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors"
          @click.prevent="scrollTo('#services')"
        >
          <span class="text-xs uppercase tracking-widest font-display">Explore</span>
          <svg class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
