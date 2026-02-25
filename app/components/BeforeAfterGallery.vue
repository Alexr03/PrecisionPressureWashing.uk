<script setup lang="ts">
interface BeforeAfterItem {
  id: number
  title: string
  description: string
  beforeLabel: string
  afterLabel: string
  beforeImage: string
  afterImage: string
}

const items: BeforeAfterItem[] = [
  {
    id: 1,
    title: 'Cleaned Flooring',
    description: '',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeImage: '/comparisons/1/before.png',
    afterImage: '/comparisons/1/after.png',
  },
  {
    id: 2,
    title: 'Cleaned Flooring',
    description: '',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeImage: '/comparisons/2/before.png',
    afterImage: '/comparisons/2/after.png',
  },
  {
    id: 3,
    title: 'Cleaned Flooring',
    description: '',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeImage: '/comparisons/3/before.png',
    afterImage: '/comparisons/3/after.png',
  },
  {
    id: 4,
    title: 'Cleaned Flooring',
    description: '',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeImage: '/comparisons/4/before.png',
    afterImage: '/comparisons/4/after.png',
  },
]

const sliderPositions = ref<number[]>(items.map(() => 50))
const isDragging = ref(false)
const activeSlider = ref<number | null>(null)

// Modal state
const modalOpen = ref(false)
const modalItem = ref<BeforeAfterItem | null>(null)
const modalSliderPosition = ref(50)
const isModalDragging = ref(false)

function startDrag(index: number, event: MouseEvent | TouchEvent) {
  event.preventDefault()
  isDragging.value = true
  activeSlider.value = index
  
  const moveHandler = (e: MouseEvent | TouchEvent) => handleDrag(index, e)
  const upHandler = () => {
    isDragging.value = false
    activeSlider.value = null
    document.removeEventListener('mousemove', moveHandler)
    document.removeEventListener('touchmove', moveHandler)
    document.removeEventListener('mouseup', upHandler)
    document.removeEventListener('touchend', upHandler)
  }
  
  document.addEventListener('mousemove', moveHandler)
  document.addEventListener('touchmove', moveHandler, { passive: false })
  document.addEventListener('mouseup', upHandler)
  document.addEventListener('touchend', upHandler)
}

function handleDrag(index: number, event: MouseEvent | TouchEvent) {
  const container = document.getElementById(`ba-container-${index}`)
  if (!container) return
  
  const rect = container.getBoundingClientRect()
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const x = clientX - rect.left
  const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
  sliderPositions.value[index] = percentage
}

function handleContainerClick(index: number, event: MouseEvent) {
  const container = document.getElementById(`ba-container-${index}`)
  if (!container) return
  
  const rect = container.getBoundingClientRect()
  const x = event.clientX - rect.left
  const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
  sliderPositions.value[index] = percentage
}

// ── Modal logic ──
function openModal(item: BeforeAfterItem) {
  modalItem.value = item
  modalSliderPosition.value = 50
  modalOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  modalOpen.value = false
  modalItem.value = null
  isModalDragging.value = false
  document.body.style.overflow = ''
}

function startModalDrag(event: MouseEvent | TouchEvent) {
  event.preventDefault()
  isModalDragging.value = true

  const moveHandler = (e: MouseEvent | TouchEvent) => handleModalDrag(e)
  const upHandler = () => {
    isModalDragging.value = false
    document.removeEventListener('mousemove', moveHandler)
    document.removeEventListener('touchmove', moveHandler)
    document.removeEventListener('mouseup', upHandler)
    document.removeEventListener('touchend', upHandler)
  }

  document.addEventListener('mousemove', moveHandler)
  document.addEventListener('touchmove', moveHandler, { passive: false })
  document.addEventListener('mouseup', upHandler)
  document.addEventListener('touchend', upHandler)
}

function handleModalDrag(event: MouseEvent | TouchEvent) {
  const container = document.getElementById('modal-ba-container')
  if (!container) return

  const rect = container.getBoundingClientRect()
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const x = clientX - rect.left
  const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
  modalSliderPosition.value = percentage
}

function handleModalClick(event: MouseEvent) {
  const container = document.getElementById('modal-ba-container')
  if (!container) return

  const rect = container.getBoundingClientRect()
  const x = event.clientX - rect.left
  const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
  modalSliderPosition.value = percentage
}

// Close on Escape
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

function scrollToContact() {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="gallery" class="relative py-24 sm:py-32 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#060e1a] via-[#091b35] to-[#060e1a]" />
    <div class="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-radial from-cyan-600/5 via-transparent to-transparent blur-3xl" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16 sm:mb-20 scroll-reveal">
        <span class="inline-block text-blue-400 font-display text-sm uppercase tracking-[0.2em] mb-4">
          See The Difference
        </span>
        <h2 class="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight">
          Before & After
        </h2>
        <div class="section-divider mb-6" />
        <p class="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
          Drag the slider to reveal the transformation. Real results from real jobs.
        </p>
      </div>

      <!-- Gallery Grid — 2 columns on md+, 1 on mobile -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div
          v-for="(item, index) in items"
          :key="item.id"
          class="scroll-reveal"
          :class="`stagger-${index + 1}`"
        >
          <div class="glass-card overflow-hidden group">
            <!-- Slider Container -->
            <div
              :id="`ba-container-${index}`"
              class="relative w-full aspect-[4/3] cursor-ew-resize select-none overflow-hidden"
              @mousedown="startDrag(index, $event)"
              @touchstart="startDrag(index, $event)"
              @click="handleContainerClick(index, $event)"
            >
              <!-- After Layer (bottom/full) -->
              <div class="absolute inset-0">
                <img
                  :src="item.afterImage"
                  :alt="`${item.title} — After`"
                  class="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <!-- After label -->
                <div class="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm text-white text-xs font-display font-semibold uppercase tracking-wider px-3 py-1 rounded-full z-[5]">
                  {{ item.afterLabel }}
                </div>
              </div>

              <!-- Before Layer (top/clipped) -->
              <div
                class="absolute inset-0"
                :style="{
                  clipPath: `inset(0 ${100 - sliderPositions[index]}% 0 0)`,
                }"
              >
                <img
                  :src="item.beforeImage"
                  :alt="`${item.title} — Before`"
                  class="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <!-- Before label -->
                <div class="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm text-white text-xs font-display font-semibold uppercase tracking-wider px-3 py-1 rounded-full z-[5]">
                  {{ item.beforeLabel }}
                </div>
              </div>

              <!-- Slider Line -->
              <div
                class="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)] z-10 pointer-events-none transition-shadow duration-300"
                :class="{ 'shadow-[0_0_20px_rgba(255,255,255,0.8)]': activeSlider === index }"
                :style="{ left: `${sliderPositions[index]}%` }"
              >
                <!-- Slider Handle -->
                <div
                  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg shadow-black/30 flex items-center justify-center pointer-events-none transition-transform duration-200"
                  :class="{ 'scale-110': activeSlider === index }"
                >
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
                  </svg>
                </div>
              </div>

              <!-- Instruction overlay (fades out on hover) -->
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 group-hover:opacity-0 transition-opacity duration-500">
                <div class="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
                  </svg>
                  <span class="text-white text-xs font-medium">Drag to compare</span>
                </div>
              </div>
            </div>

            <!-- Info + Enlarge Button -->
            <div class="p-5 flex items-start justify-between gap-4">
              <div class="min-w-0">
                <h3 class="font-display font-semibold text-white text-lg mb-1">{{ item.title }}</h3>
                <p class="text-slate-400 text-sm leading-relaxed">{{ item.description }}</p>
              </div>
              <button
                type="button"
                class="shrink-0 mt-0.5 flex items-center gap-1.5 text-blue-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-blue-500/30 rounded-lg px-3 py-2 text-xs font-display font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                @click.stop="openModal(item)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                <span>Enlarge</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-14 scroll-reveal">
        <p class="text-slate-400 mb-6">Want results like these for your property?</p>
        <a
          href="#contact"
          class="btn-gold"
          @click.prevent="scrollToContact"
        >
          <span>Get Your Free Quote</span>
        </a>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════
         FULLSCREEN MODAL
         ═══════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="modalOpen && modalItem"
          class="fixed inset-0 z-[9999] flex items-center justify-center"
          @click.self="closeModal"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/85 backdrop-blur-md" @click="closeModal" />

          <!-- Modal Content -->
          <div class="relative z-10 w-full max-w-5xl mx-4 sm:mx-6">
            <!-- Close button -->
            <button
              type="button"
              class="absolute -top-12 right-0 sm:-top-14 sm:-right-2 text-slate-400 hover:text-white transition-colors duration-200 p-2 cursor-pointer"
              @click="closeModal"
            >
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Title -->
            <div class="mb-4 text-center">
              <h3 class="font-display font-bold text-white text-xl sm:text-2xl tracking-tight">
                {{ modalItem.title }}
              </h3>
              <p class="text-slate-400 text-sm mt-1">{{ modalItem.description }}</p>
            </div>

            <!-- Slider Container -->
            <div
              id="modal-ba-container"
              class="relative w-full aspect-[4/3] sm:aspect-[16/10] cursor-ew-resize select-none overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/50"
              @mousedown="startModalDrag($event)"
              @touchstart="startModalDrag($event)"
              @click="handleModalClick($event)"
            >
              <!-- After Layer -->
              <div class="absolute inset-0">
                <img
                  :src="modalItem.afterImage"
                  :alt="`${modalItem.title} — After`"
                  class="absolute inset-0 w-full h-full object-cover"
                />
                <div class="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white text-sm font-display font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full">
                  {{ modalItem.afterLabel }}
                </div>
              </div>

              <!-- Before Layer -->
              <div
                class="absolute inset-0"
                :style="{
                  clipPath: `inset(0 ${100 - modalSliderPosition}% 0 0)`,
                }"
              >
                <img
                  :src="modalItem.beforeImage"
                  :alt="`${modalItem.title} — Before`"
                  class="absolute inset-0 w-full h-full object-cover"
                />
                <div class="absolute top-4 left-4 bg-red-500/90 backdrop-blur-sm text-white text-sm font-display font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full">
                  {{ modalItem.beforeLabel }}
                </div>
              </div>

              <!-- Slider Line -->
              <div
                class="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_16px_rgba(255,255,255,0.6)] z-10 pointer-events-none transition-shadow duration-300"
                :class="{ 'shadow-[0_0_24px_rgba(255,255,255,0.9)]': isModalDragging }"
                :style="{ left: `${modalSliderPosition}%` }"
              >
                <!-- Slider Handle -->
                <div
                  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg shadow-black/40 flex items-center justify-center pointer-events-none transition-transform duration-200"
                  :class="{ 'scale-110': isModalDragging }"
                >
                  <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
                  </svg>
                </div>
              </div>

              <!-- Instruction overlay -->
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none modal-instruction-fade">
                <div class="bg-black/50 backdrop-blur-sm rounded-full px-5 py-2.5 flex items-center gap-2">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
                  </svg>
                  <span class="text-white text-sm font-medium">Drag to compare</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
/* Modal transition */
.modal-enter-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-leave-active {
  transition: opacity 0.2s ease-in;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Modal instruction overlay — auto-fade after 2s */
.modal-instruction-fade {
  opacity: 0.7;
  animation: modalInstructionFade 3s ease-out forwards;
}

@keyframes modalInstructionFade {
  0%, 60% {
    opacity: 0.7;
  }
  100% {
    opacity: 0;
  }
}
</style>
