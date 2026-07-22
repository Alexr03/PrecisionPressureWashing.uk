<script setup lang="ts">
useSeoMeta({
  title: 'Precision Pressure Washing | Temporarily Offline',
  ogTitle: 'Precision Pressure Washing | Temporarily Offline',
  description: 'Our website is temporarily offline while we restructure. Please check back soon or contact us directly on 07912 606539.',
  ogDescription: 'Our website is temporarily offline while we restructure. Please check back soon or contact us directly on 07912 606539.',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <main class="relative min-h-screen overflow-hidden flex items-center justify-center">
    <div class="absolute inset-0 bg-hero-gradient" />
    <div class="absolute inset-0 bg-aurora opacity-70" />

    <div class="relative z-10 w-full max-w-2xl mx-auto px-6">
      <div class="glass-card p-8 sm:p-10 text-center">
        <img
          src="/logo_full.png"
          alt="Precision Pressure Washing"
          width="640"
          height="240"
          class="h-24 sm:h-28 w-auto mx-auto mb-6"
        />
        <p class="text-xs sm:text-sm uppercase tracking-[0.2em] text-cyan-300 mb-3 font-display">
          Temporary Maintenance
        </p>
        <h1 class="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
          We’re currently restructuring
        </h1>
        <p class="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
          Our website is temporarily offline while we make improvements.
          Thank you for your patience.
        </p>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="tel:+447912606539" class="btn-gold" aria-label="Call us at 07912 606539">
            <span>Call 07912 606539</span>
          </a>
          <a
            href="https://wa.me/447912606539"
            target="_blank"
            rel="noopener noreferrer nofollow"
            class="btn-outline"
            aria-label="Message us on WhatsApp (opens in new tab)"
          >
            <span>Message on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  </main>
</template>
