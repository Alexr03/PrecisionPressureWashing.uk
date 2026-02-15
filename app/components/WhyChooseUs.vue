<script setup lang="ts">
const features = [
  {
    title: 'Fully Insured',
    description: 'Complete peace of mind. We carry full public liability insurance to protect you and your property.',
    icon: 'shield',
  },
  {
    title: 'Free Quotes',
    description: 'No obligation, no hidden costs. We provide honest, upfront quotes before any work begins.',
    icon: 'quote',
  },
  {
    title: 'Professional Equipment',
    description: 'Industrial-grade pressure washers and surface cleaners for a deeper, more even clean every time.',
    icon: 'equipment',
  },
  {
    title: 'Friendly Local Service',
    description: 'We\'re a local business that takes pride in serving our community with reliable, quality work.',
    icon: 'local',
  },
]

const benefits = [
  'Removes dirt, moss & algae',
  'Improves appearance instantly',
  'Makes surfaces safer',
  'Adds value to your home',
]
</script>

<template>
  <section id="why-us" class="relative py-24 sm:py-32 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#060e1a] via-[#091b35] to-[#060e1a]" />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-blue-600/6 via-transparent to-transparent blur-3xl" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16 sm:mb-20 scroll-reveal">
        <span class="inline-block text-blue-400 font-display text-sm uppercase tracking-[0.2em] mb-4">
          The Precision Difference
        </span>
        <h2 class="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight">
          Why Choose Us?
        </h2>
        <div class="section-divider mb-6" />
        <p class="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
          Is your driveway or patio looking dirty, slippery or tired?
          We deliver results you can see — and surfaces you can trust.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          class="scroll-reveal text-center"
          :class="`stagger-${index + 1}`"
        >
          <div class="glass-card-hover p-8 h-full">
            <!-- Icon circle -->
            <div class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center mx-auto mb-5
                        border border-blue-500/15">
              <!-- Shield -->
              <svg v-if="feature.icon === 'shield'" class="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <!-- Quote / Pound -->
              <svg v-else-if="feature.icon === 'quote'" class="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <!-- Equipment / Wrench -->
              <svg v-else-if="feature.icon === 'equipment'" class="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <!-- Local / Home -->
              <svg v-else class="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>

            <h3 class="font-display font-semibold text-lg text-white mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-slate-400 text-sm leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Benefits bar -->
      <div class="scroll-reveal">
        <div class="glass-card p-8 sm:p-10">
          <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div class="flex-shrink-0 text-center lg:text-left">
              <h3 class="font-display font-semibold text-xl text-white mb-1">
                What You Get
              </h3>
              <p class="text-slate-500 text-sm">Results you can see instantly</p>
            </div>
            <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                v-for="(benefit, i) in benefits"
                :key="benefit"
                class="flex items-center gap-3 scroll-reveal"
                :class="`stagger-${i + 1}`"
              >
                <div class="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/15 flex items-center justify-center">
                  <svg class="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-slate-300 text-sm font-medium">{{ benefit }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
