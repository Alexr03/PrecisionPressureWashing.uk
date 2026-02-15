<script setup lang="ts">
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Area', href: '#service-area' },
  { label: 'Contact', href: '#contact' },
]

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

function scrollToSection(href: string) {
  isMobileMenuOpen.value = false
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out"
    :class="[
      isScrolled
        ? 'bg-[#060e1a]/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/[0.04]'
        : 'bg-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <a
          href="#"
          class="flex items-center gap-3 group"
          @click.prevent="scrollToSection('#hero')"
        >
          <img
            src="/logo.png"
            alt="Precision Pressure Washing"
            class="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="relative px-4 py-2 text-sm font-medium text-slate-300 tracking-wide uppercase font-display
                   transition-colors duration-300 hover:text-white group"
            @click.prevent="scrollToSection(link.href)"
          >
            {{ link.label }}
            <span
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400
                     rounded-full transition-all duration-300 group-hover:w-3/4"
            />
          </a>
        </nav>

        <!-- CTA + Mobile Toggle -->
        <div class="flex items-center gap-4">
          <a
            href="#contact"
            class="hidden sm:inline-flex btn-gold !py-2.5 !px-6 !text-xs"
            @click.prevent="scrollToSection('#contact')"
          >
            <span>Get a Quote</span>
          </a>

          <!-- Mobile hamburger -->
          <button
            class="lg:hidden relative w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
          >
            <div class="w-6 flex flex-col gap-1.5 items-end">
              <span
                class="block h-0.5 bg-current rounded-full transition-all duration-300 origin-right"
                :class="isMobileMenuOpen ? 'w-6 rotate-[-45deg] translate-y-[1px]' : 'w-6'"
              />
              <span
                class="block h-0.5 bg-current rounded-full transition-all duration-300"
                :class="isMobileMenuOpen ? 'w-0 opacity-0' : 'w-4'"
              />
              <span
                class="block h-0.5 bg-current rounded-full transition-all duration-300 origin-right"
                :class="isMobileMenuOpen ? 'w-6 rotate-[45deg] -translate-y-[1px]' : 'w-5'"
              />
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-400 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden bg-[#060e1a]/95 backdrop-blur-2xl border-b border-white/[0.06]"
      >
        <nav class="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
          <a
            v-for="(link, i) in navLinks"
            :key="link.href"
            :href="link.href"
            class="px-4 py-3 text-base font-display font-medium text-slate-300 uppercase tracking-wider
                   hover:text-white hover:bg-white/[0.04] rounded-xl transition-all duration-300"
            :style="{ animationDelay: `${i * 50}ms` }"
            @click.prevent="scrollToSection(link.href)"
          >
            {{ link.label }}
          </a>
          <a
            href="#contact"
            class="btn-gold mt-4 text-center !text-sm"
            @click.prevent="scrollToSection('#contact')"
          >
            <span>Get a Free Quote</span>
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>
