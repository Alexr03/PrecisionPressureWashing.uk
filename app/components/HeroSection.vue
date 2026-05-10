<script setup lang="ts">
const heroReady = ref(false)
const heroEl = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)

onMounted(() => {
  requestAnimationFrame(() => {
    heroReady.value = true
  })

  const onMove = (e: MouseEvent) => {
    if (!heroEl.value) return
    const rect = heroEl.value.getBoundingClientRect()
    mouseX.value = (e.clientX - rect.left) / rect.width - 0.5
    mouseY.value = (e.clientY - rect.top) / rect.height - 0.5
  }
  heroEl.value?.addEventListener('mousemove', onMove)
  onBeforeUnmount(() => heroEl.value?.removeEventListener('mousemove', onMove))
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

// Decorative sparkles scattered across hero
const sparkles = [
  { top: '14%', left: '18%', delay: '0s' },
  { top: '22%', left: '78%', delay: '0.6s' },
  { top: '38%', left: '8%', delay: '1.2s' },
  { top: '46%', left: '92%', delay: '0.3s' },
  { top: '62%', left: '24%', delay: '1.8s' },
  { top: '70%', left: '70%', delay: '0.9s' },
  { top: '30%', left: '52%', delay: '2.1s' },
  { top: '78%', left: '40%', delay: '1.5s' },
]

function scrollTo(selector: string) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    id="hero"
    ref="heroEl"
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- Background Layers (always visible, no animation needed) -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-hero-gradient" />

      <!-- Aurora animated multi-radial -->
      <div class="absolute inset-0 bg-aurora opacity-80" />

      <!-- Mouse parallax orbs -->
      <div
        class="absolute top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full
               bg-gradient-radial from-blue-500/25 via-blue-700/8 to-transparent blur-3xl
               transition-transform duration-500 ease-out"
        :style="{ transform: `translate(${mouseX * -40}px, ${mouseY * -30}px)` }"
      />
      <div
        class="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full
               bg-gradient-radial from-cyan-400/18 via-transparent to-transparent blur-3xl
               transition-transform duration-500 ease-out"
        :style="{ transform: `translate(${mouseX * 40}px, ${mouseY * 30}px)` }"
      />
      <div
        class="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full
               bg-gradient-radial from-cyan-400/12 via-transparent to-transparent blur-2xl animate-float-slow"
      />

      <!-- Slow rotating conic ring -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px]
               rounded-full opacity-[0.08] animate-spin-slower pointer-events-none"
        style="background: conic-gradient(from 0deg, transparent 0deg, rgba(96, 165, 250, 0.6) 80deg, transparent 180deg, rgba(34, 211, 238, 0.6) 260deg, transparent 360deg); mask: radial-gradient(circle, transparent 50%, black 50%, black 51%, transparent 51%);"
      />

      <!-- Grid -->
      <div
        class="absolute inset-0 opacity-[0.025]"
        style="
          background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 80px 80px;
        "
      />

      <div class="absolute inset-0 noise-overlay" />

      <!-- Sparkles -->
      <ClientOnly>
        <span
          v-for="(s, i) in sparkles"
          :key="`spk-${i}`"
          class="sparkle"
          :style="{ top: s.top, left: s.left, animationDelay: s.delay }"
        />
      </ClientOnly>

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
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <!-- Live status pill -->
      <div
        class="mb-6 inline-flex"
        :class="heroReady ? 'hero-enter' : ''"
        style="opacity: 0; transform: translateY(40px); --hero-delay: 0s"
      >
        <div class="glow-pill text-xs sm:text-sm">
          <span class="pulse-dot" />
          <span class="text-slate-300 font-display tracking-widest uppercase text-[11px] sm:text-xs">
            Booking jobs across Essex
          </span>
        </div>
      </div>

      <!-- Logo -->
      <div
        class="mb-8 relative"
        :class="heroReady ? 'hero-enter' : ''"
        style="opacity: 0; transform: translateY(40px); --hero-delay: 0.05s"
      >
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-blue-500/15 blur-3xl animate-pulse-glow" />
        </div>
        <img
          src="/logo_full.png"
          alt="Precision Pressure Washing"
          class="relative h-60 sm:h-60 md:h-60 w-auto mx-auto drop-shadow-[0_8px_32px_rgba(59,130,246,0.4)]"
        />
      </div>

      <!-- Heading -->
      <h1
        class="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
               tracking-tight leading-[0.95] mb-6"
        :class="heroReady ? 'hero-enter' : ''"
        style="opacity: 0; transform: translateY(40px); --hero-delay: 0.15s"
      >
        <span class="text-white">Driveway &amp; Patio</span>
        <br />
        <span class="text-gradient-shine">Cleaning Experts</span>
      </h1>

      <!-- Subheading -->
      <p
        class="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-8"
        :class="heroReady ? 'hero-enter' : ''"
        style="opacity: 0; transform: translateY(40px); --hero-delay: 0.28s"
      >
        We'll make your exterior surfaces look like new.
        <br class="hidden sm:block" />
        <span class="text-cyan-300 font-medium">Professional results, every time.</span>
      </p>

      <!-- Trust badges -->
      <div
        class="flex flex-wrap justify-center gap-3 mb-10"
        :class="heroReady ? 'hero-enter' : ''"
        style="opacity: 0; transform: translateY(40px); --hero-delay: 0.38s"
      >
        <span class="glow-pill">
          <svg class="w-4 h-4 text-green-400 drop-shadow-[0_0_6px_rgba(74,222,128,0.6)]" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <span class="text-slate-200 text-xs sm:text-sm font-medium">Fully Insured</span>
        </span>
        <span class="glow-pill">
          <svg class="w-4 h-4 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span class="text-slate-200 text-xs sm:text-sm font-medium">5★ Rated</span>
        </span>
        <span class="glow-pill">
          <svg class="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6c0 1.887.879 3.572 2.25 4.667L4 18h12l-2.25-5.333A5.987 5.987 0 0016 8a6 6 0 00-6-6z"/>
          </svg>
          <span class="text-slate-200 text-xs sm:text-sm font-medium">Free Quotes</span>
        </span>
        <span class="glow-pill">
          <svg class="w-4 h-4 text-blue-400 drop-shadow-[0_0_6px_rgba(96,165,250,0.6)]" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.93-11.412l-1.86-1.86 1.41-1.41 3.27 3.27-3.27 3.27-1.41-1.41 1.86-1.86z" clip-rule="evenodd"/>
            <path d="M5 10a5 5 0 0110 0v.5a.5.5 0 01-1 0V10a4 4 0 10-8 0v.5a.5.5 0 01-1 0V10z"/>
          </svg>
          <span class="text-slate-200 text-xs sm:text-sm font-medium">Local & Reliable</span>
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
          class="flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-300 transition-colors duration-300"
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
