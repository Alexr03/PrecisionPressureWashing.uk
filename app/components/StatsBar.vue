<script setup lang="ts">
const stats = [
  // {
  //   value: 200,
  //   suffix: '+',
  //   label: 'Jobs Completed',
  //   sub: 'Across Essex',
  //   icon: 'jobs',
  //   color: 'from-blue-400 to-cyan-300',
  // },
  {
    value: 5,
    suffix: '★',
    label: 'Average Rating',
    sub: 'From happy customers',
    icon: 'star',
    color: 'from-yellow-400 to-amber-300',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Fully Insured',
    sub: 'Public liability cover',
    icon: 'shield',
    color: 'from-green-400 to-emerald-300',
  },
  // {
  //   value: 24,
  //   suffix: 'h',
  //   label: 'Quote Turnaround',
  //   sub: 'Often same-day',
  //   icon: 'clock',
  //   color: 'from-purple-400 to-fuchsia-300',
  // },
]

// Counter animation: each card animates from 0 to value when visible
const displayValues = ref<number[]>(stats.map(() => 0))
const sectionEl = ref<HTMLElement | null>(null)

function animateCount(idx: number, target: number) {
  const duration = 1600
  const start = performance.now()
  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1)
    // easeOutQuart
    const eased = 1 - Math.pow(1 - t, 4)
    displayValues.value[idx] = Math.round(target * eased)
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  if (!sectionEl.value || typeof IntersectionObserver === 'undefined') {
    stats.forEach((s, i) => animateCount(i, s.value))
    return
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        stats.forEach((s, i) => animateCount(i, s.value))
        io.disconnect()
      }
    })
  }, { threshold: 0.3 })
  io.observe(sectionEl.value)
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <section
    ref="sectionEl"
    class="relative py-16 sm:py-20 overflow-hidden"
  >
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#060e1a] via-[#0a1a36] to-[#060e1a]" />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px] rounded-full bg-gradient-radial from-blue-500/10 via-transparent to-transparent blur-3xl" />

    <!-- Top & bottom accent lines -->
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="scroll-reveal text-center group"
          :class="`stagger-${i + 1}`"
        >
          <div class="glass-card-hover p-6 sm:p-7 h-full flex flex-col items-center">
            <!-- Icon -->
            <div class="relative mb-3">
              <div class="absolute inset-0 rounded-full blur-xl opacity-50 bg-gradient-to-br" :class="stat.color" />
              <div class="relative w-11 h-11 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/10 group-hover:border-cyan-400/40 transition-colors duration-500">
                <svg v-if="stat.icon === 'jobs'" class="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                <svg v-else-if="stat.icon === 'star'" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <svg v-else-if="stat.icon === 'shield'" class="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                <svg v-else class="w-5 h-5 text-fuchsia-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>

            <!-- Number -->
            <div class="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none mb-1">
              <span :class="['bg-gradient-to-br bg-clip-text text-transparent', stat.color]">
                {{ displayValues[i] }}{{ stat.suffix }}
              </span>
            </div>

            <!-- Label -->
            <p class="text-white font-display font-semibold text-sm sm:text-base tracking-wide">
              {{ stat.label }}
            </p>
            <p class="text-slate-500 text-xs mt-0.5">{{ stat.sub }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
