<script setup lang="ts">
const currentYear = new Date().getFullYear()

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

const serviceLinks = [
  'Driveway Cleaning',
  'Patio Cleaning',
  'Path Cleaning',
  'Decking Cleaning',
]

function scrollToSection(href: string) {
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="relative border-t border-white/[0.04]">
    <!-- Background -->
    <div class="absolute inset-0 bg-[#050c17]" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main footer -->
      <div class="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
        <!-- Brand Column -->
        <div class="lg:col-span-1">
          <img
            src="/logo.png"
            alt="Precision Pressure Washing"
            class="h-12 w-auto mb-5"
          />
          <p class="text-slate-500 text-sm leading-relaxed mb-5">
            Professional driveway & patio cleaning experts. Fully insured with free quotes
            and friendly local service.
          </p>
          <div class="flex items-center gap-2 text-slate-400 text-sm">
            <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            Fully Insured
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-display font-semibold text-white text-sm uppercase tracking-wider mb-5">
            Quick Links
          </h4>
          <ul class="space-y-3">
            <li v-for="link in navLinks" :key="link.href">
              <a
                :href="link.href"
                class="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-300"
                @click.prevent="scrollToSection(link.href)"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h4 class="font-display font-semibold text-white text-sm uppercase tracking-wider mb-5">
            Services
          </h4>
          <ul class="space-y-3">
            <li v-for="service in serviceLinks" :key="service">
              <a
                href="#services"
                class="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-300"
                @click.prevent="scrollToSection('#services')"
              >
                {{ service }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-display font-semibold text-white text-sm uppercase tracking-wider mb-5">
            Get In Touch
          </h4>
          <ul class="space-y-4">
            <li>
              <a href="tel:07912606539" class="flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-300 group">
                <div class="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <span class="text-sm">07912 606539</span>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/4407912606539"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-300 group"
              >
                <div class="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <span class="text-sm">WhatsApp Us</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-white/[0.04] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-slate-600 text-xs">
          &copy; {{ currentYear }} Precision Pressure Washing. All rights reserved.
        </p>
        <p class="text-slate-700 text-xs">
          Serving your local area with pride
        </p>
      </div>
    </div>
  </footer>
</template>
