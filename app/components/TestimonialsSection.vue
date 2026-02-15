<script setup lang="ts">
const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Local Resident',
    text: 'Absolutely brilliant job on our driveway! It looks brand new. The team were professional, on time, and left everything tidy. Would highly recommend to anyone.',
    rating: 5,
  },
  {
    name: 'James T.',
    location: 'Local Resident',
    text: 'Had our patio and paths done — the difference is incredible. You don\'t realise how dirty they\'ve got until you see the before and after. Great value for money too.',
    rating: 5,
  },
  {
    name: 'Linda & Steve P.',
    location: 'Local Residents',
    text: 'We\'ve used Precision twice now for our driveway and decking. Always reliable, always a fantastic finish. Wouldn\'t go anywhere else. Five stars!',
    rating: 5,
  },
]
</script>

<template>
  <section id="testimonials" class="relative py-24 sm:py-32 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#060e1a] via-[#091b35] to-[#060e1a]" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16 sm:mb-20 scroll-reveal">
        <span class="inline-block text-blue-400 font-display text-sm uppercase tracking-[0.2em] mb-4">
          Happy Customers
        </span>
        <h2 class="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight">
          What People Say
        </h2>
        <div class="section-divider" />
      </div>

      <!-- Testimonials Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.name"
          class="scroll-reveal"
          :class="`stagger-${index + 1}`"
        >
          <div class="glass-card p-8 h-full flex flex-col">
            <!-- Stars -->
            <div class="flex gap-1 mb-5">
              <svg
                v-for="star in testimonial.rating"
                :key="star"
                class="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>

            <!-- Quote -->
            <blockquote class="text-slate-300 text-sm leading-relaxed mb-6 flex-1 italic">
              "{{ testimonial.text }}"
            </blockquote>

            <!-- Author -->
            <div class="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                <span class="text-white font-display font-bold text-sm">
                  {{ testimonial.name.charAt(0) }}
                </span>
              </div>
              <div>
                <p class="text-white font-medium text-sm">{{ testimonial.name }}</p>
                <p class="text-slate-500 text-xs">{{ testimonial.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
