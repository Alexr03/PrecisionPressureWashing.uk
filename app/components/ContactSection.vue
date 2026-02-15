<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errorMessage = ref('')

const services = [
  'Driveway Cleaning',
  'Patio Cleaning',
  'Path Cleaning',
  'Decking Cleaning',
  'Full Property Clean',
  'Commercial Cleaning',
  'Other',
]

async function handleSubmit() {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        message: form.message,
      },
    })

    isSubmitted.value = true
    // Reset after showing success
    setTimeout(() => {
      isSubmitted.value = false
      form.name = ''
      form.email = ''
      form.phone = ''
      form.service = ''
      form.message = ''
    }, 4000)
  }
  catch {
    errorMessage.value = 'Something went wrong. Please try again, or contact us by phone.'
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section id="contact" class="relative py-24 sm:py-32 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#060e1a] via-[#0a1628] to-[#060e1a]" />
    <div class="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-blue-600/5 via-transparent to-transparent blur-3xl" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16 sm:mb-20 scroll-reveal">
        <span class="inline-block text-blue-400 font-display text-sm uppercase tracking-[0.2em] mb-4">
          Let's Talk
        </span>
        <h2 class="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight">
          Get In Touch
        </h2>
        <div class="section-divider mb-6" />
        <p class="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
          Ready to transform your outdoor surfaces? Get your free, no-obligation quote today.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
        <!-- Contact Form -->
        <div class="lg:col-span-3 scroll-reveal-left">
          <div class="glass-card p-8 sm:p-10">
            <h3 class="font-display font-semibold text-xl text-white mb-6">
              Book Your Free Quote
            </h3>

            <!-- Success State -->
            <Transition
              enter-active-class="transition-all duration-500 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition-all duration-300 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div v-if="isSubmitted" class="text-center py-12">
                <div class="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h4 class="font-display font-semibold text-xl text-white mb-2">Message Sent!</h4>
                <p class="text-slate-400">We'll get back to you as soon as possible.</p>
              </div>
            </Transition>

            <!-- Error State -->
            <div v-if="errorMessage" class="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p class="text-red-300 text-sm">{{ errorMessage }}</p>
              </div>
            </div>

            <!-- Form -->
            <form v-if="!isSubmitted" @submit.prevent="handleSubmit" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <!-- Name -->
                <div>
                  <label for="name" class="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="John Smith"
                    class="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-slate-600
                           focus:outline-none focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                  />
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="john@example.com"
                    class="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-slate-600
                           focus:outline-none focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <!-- Phone -->
                <div>
                  <label for="phone" class="block text-sm font-medium text-slate-400 mb-2">Phone Number</label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    required
                    placeholder="07XXX XXXXXX"
                    class="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-slate-600
                           focus:outline-none focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                  />
                </div>

                <!-- Service -->
                <div>
                  <label for="service" class="block text-sm font-medium text-slate-400 mb-2">Service Required</label>
                  <select
                    id="service"
                    v-model="form.service"
                    required
                    class="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white
                           focus:outline-none focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300
                           appearance-none cursor-pointer"
                    :class="{ 'text-slate-600': !form.service }"
                  >
                    <option value="" disabled>Select a service</option>
                    <option v-for="s in services" :key="s" :value="s" class="bg-[#0a1628] text-white">
                      {{ s }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="block text-sm font-medium text-slate-400 mb-2">
                  Message <span class="text-slate-600">(optional)</span>
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="4"
                  placeholder="Tell us about the job — approximate area size, surface type, any specific concerns..."
                  class="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-slate-600 resize-none
                         focus:outline-none focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                />
              </div>

              <!-- Submit -->
              <button
                type="submit"
                class="btn-gold w-full sm:w-auto"
                :disabled="isSubmitting"
              >
                <span class="flex items-center justify-center gap-2">
                  <svg v-if="isSubmitting" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                </span>
              </button>
            </form>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="lg:col-span-2 scroll-reveal-right">
          <div class="space-y-6">
            <!-- Phone -->
            <div class="glass-card p-6 group hover:border-blue-500/20 transition-all duration-500">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center flex-shrink-0
                            border border-blue-500/15 group-hover:border-blue-400/30 transition-all duration-500">
                  <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-display font-semibold text-white mb-1">Call Us</h4>
                  <a href="tel:07912606539" class="text-blue-400 hover:text-blue-300 font-semibold text-lg transition-colors">
                    07912 606539
                  </a>
                  <p class="text-slate-500 text-sm mt-1">Mon-Sat, 8am - 6pm</p>
                </div>
              </div>
            </div>

            <!-- WhatsApp -->
            <div class="glass-card p-6 group hover:border-green-500/20 transition-all duration-500">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center flex-shrink-0
                            border border-green-500/15 group-hover:border-green-400/30 transition-all duration-500">
                  <svg class="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-display font-semibold text-white mb-1">WhatsApp</h4>
                  <a
                    href="https://wa.me/4407912606539?text=Hi%2C%20I'd%20like%20a%20free%20quote%20for%20pressure%20washing%20please."
                    target="_blank"
                    rel="noopener"
                    class="text-green-400 hover:text-green-300 font-semibold text-lg transition-colors"
                  >
                    07912 606539
                  </a>
                  <p class="text-slate-500 text-sm mt-1">Quick response guaranteed</p>
                </div>
              </div>
            </div>

            <!-- Service area -->
            <div class="glass-card p-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 flex items-center justify-center flex-shrink-0
                            border border-cyan-500/15">
                  <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-display font-semibold text-white mb-1">Service Area</h4>
                  <p class="text-slate-300 font-medium">Serving Your Local Area</p>
                  <p class="text-slate-500 text-sm mt-1">Contact us to check availability in your area</p>
                </div>
              </div>
            </div>

            <!-- Quick info -->
            <div class="bg-gradient-to-r from-blue-500/10 to-cyan-500/5 rounded-2xl p-6 border border-blue-500/10">
              <h4 class="font-display font-semibold text-white mb-3 text-sm uppercase tracking-wider">
                Why Contact Us?
              </h4>
              <ul class="space-y-2">
                <li class="flex items-center gap-2 text-slate-400 text-sm">
                  <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Free, no-obligation quotes
                </li>
                <li class="flex items-center gap-2 text-slate-400 text-sm">
                  <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Friendly, honest advice
                </li>
                <li class="flex items-center gap-2 text-slate-400 text-sm">
                  <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Fast response times
                </li>
                <!-- <li class="flex items-center gap-2 text-slate-400 text-sm">
                  <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  New customer discount available
                </li> -->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
