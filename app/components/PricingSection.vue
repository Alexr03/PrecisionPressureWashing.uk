<script setup lang="ts">
const tiers = [
  {
    name: 'Residential',
    subtitle: 'Homes & Gardens',
    description: 'Perfect for homeowners looking to refresh their outdoor surfaces.',
    includes: [
      'Driveways up to any size',
      'Patios & garden paths',
      'Front & back entrances',
      'Moss & algae treatment',
      'Post-clean tidy up',
    ],
    highlighted: false,
  },
  {
    name: 'Full Property',
    subtitle: 'Most Popular',
    description: 'Complete exterior cleaning for a total property transformation.',
    includes: [
      'All driveways & paths',
      'Patio & decking areas',
      'Wall & fence base wash',
      'Deep moss & weed removal',
      'Sealant advice included',
      'Priority booking',
    ],
    highlighted: true,
  },
  {
    name: 'Commercial',
    subtitle: 'Businesses & Landlords',
    description: 'Keep your commercial premises looking professional and safe.',
    includes: [
      'Car parks & forecourts',
      'Shop fronts & entrances',
      'Shared pathways & yards',
      'Regular maintenance plans',
      'Health & safety compliance',
    ],
    highlighted: false,
  },
]
</script>

<template>
  <section id="pricing" class="relative py-24 sm:py-32 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#060e1a] via-[#0a1628] to-[#060e1a]" />
    <div class="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-radial from-blue-600/5 via-transparent to-transparent blur-3xl" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16 sm:mb-20 scroll-reveal">
        <span class="inline-block text-blue-400 font-display text-sm uppercase tracking-[0.2em] mb-4">
          Simple & Transparent
        </span>
        <h2 class="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight">
          Our Pricing
        </h2>
        <div class="section-divider mb-6" />
        <p class="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
          Every job is unique, so we provide free, no-obligation quotes tailored to your property.
          Here's what we offer.
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        <div
          v-for="(tier, index) in tiers"
          :key="tier.name"
          class="scroll-reveal relative"
          :class="[
            `stagger-${index + 1}`,
            tier.highlighted ? 'md:-mt-4 md:mb-4' : '',
          ]"
        >
          <div
            class="h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-500"
            :class="[
              tier.highlighted
                ? 'bg-gradient-to-b from-blue-600/15 to-blue-900/10 border-2 border-blue-500/30 shadow-xl shadow-blue-500/10'
                : 'glass-card-hover',
            ]"
          >
            <!-- Popular badge -->
            <div v-if="tier.highlighted" class="bg-gradient-to-r from-blue-500 to-cyan-400 text-center py-2">
              <span class="text-xs font-display font-bold uppercase tracking-widest text-white">
                Most Popular
              </span>
            </div>

            <div class="p-8 flex flex-col flex-1">
              <!-- Tier header -->
              <div class="mb-6">
                <h3 class="font-display font-bold text-2xl text-white mb-1">
                  {{ tier.name }}
                </h3>
                <p class="text-blue-400 text-sm font-medium">{{ tier.subtitle }}</p>
              </div>

              <!-- Description -->
              <p class="text-slate-400 text-sm leading-relaxed mb-6">
                {{ tier.description }}
              </p>

              <!-- Includes list -->
              <ul class="space-y-3 mb-8 flex-1">
                <li
                  v-for="item in tier.includes"
                  :key="item"
                  class="flex items-start gap-3"
                >
                  <svg class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-slate-300 text-sm">{{ item }}</span>
                </li>
              </ul>

              <!-- CTA -->
              <a
                href="#contact"
                :class="tier.highlighted ? 'btn-gold w-full' : 'btn-primary w-full'"
                @click.prevent="document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })"
              >
                <span>Request Free Quote</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Limited offer banner -->
      <!-- <div class="scroll-reveal">
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 border border-yellow-500/20 p-8 sm:p-10 text-center">
          <div class="absolute inset-0 animate-shimmer" />
          
          <div class="relative z-10">
            <div class="inline-flex items-center gap-2 bg-yellow-500/15 rounded-full px-4 py-1.5 mb-4">
              <span class="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span class="text-yellow-400 text-xs font-display uppercase tracking-widest font-bold">Limited Time Offer</span>
            </div>
            <h3 class="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
              New Customer Discount
            </h3>
            <p class="text-slate-400 max-w-xl mx-auto mb-6">
              Get a special discount as a new customer. Contact us today and mention this offer 
              when booking your free quote.
            </p>
            <a
              href="#contact"
              class="btn-gold"
              @click.prevent="document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })"
            >
              <span class="flex items-center gap-2">
                Claim Your Discount
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>
