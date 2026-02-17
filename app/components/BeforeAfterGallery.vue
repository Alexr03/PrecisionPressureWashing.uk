<script setup lang="ts">
interface BeforeAfterItem {
  id: number
  title: string
  description: string
  beforeLabel: string
  afterLabel: string
  beforeGradient: string
  afterGradient: string
  beforeImage?: string
  afterImage?: string
}

const items: BeforeAfterItem[] = [
  {
    id: 1,
    title: 'Driveway Restoration',
    description: 'Block paving driveway in Essex — years of dirt, moss and oil stains completely removed.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeGradient: 'linear-gradient(135deg, #2d1f0e 0%, #3d2b15 30%, #4a3520 50%, #3d2b15 70%, #2d1f0e 100%)',
    afterGradient: 'linear-gradient(135deg, #8b7355 0%, #a08d72 30%, #c4b49a 50%, #a08d72 70%, #8b7355 100%)',
  },
  {
    id: 2,
    title: 'Patio Deep Clean',
    description: 'Indian sandstone patio brought back to life — algae and black spot fully treated.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeGradient: 'linear-gradient(135deg, #1a2e1a 0%, #2d3d2a 30%, #354535 50%, #2d3d2a 70%, #1a2e1a 100%)',
    afterGradient: 'linear-gradient(135deg, #c9b8a0 0%, #ddd0bc 30%, #efe6d7 50%, #ddd0bc 70%, #c9b8a0 100%)',
  },
  {
    id: 3,
    title: 'Path & Walkway',
    description: 'Concrete path cleared of years of grime, moss and weeds — safe and slip-free.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeGradient: 'linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 30%, #444444 50%, #3a3a3a 70%, #2a2a2a 100%)',
    afterGradient: 'linear-gradient(135deg, #9e9e9e 0%, #b8b8b8 30%, #d4d4d4 50%, #b8b8b8 70%, #9e9e9e 100%)',
  },
]

const sliderPositions = ref<number[]>(items.map(() => 50))
const isDragging = ref(false)
const activeSlider = ref<number | null>(null)

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

      <!-- Gallery Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
              <div
                class="absolute inset-0"
                :style="{
                  background: item.afterImage ? `url(${item.afterImage}) center/cover` : item.afterGradient,
                }"
              >
                <!-- After texture pattern -->
                <div v-if="!item.afterImage" class="absolute inset-0" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(255,255,255,0.03) 8px, rgba(255,255,255,0.03) 9px), repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.03) 8px, rgba(255,255,255,0.03) 9px);" />
                <!-- After label -->
                <div class="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm text-white text-xs font-display font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                  {{ item.afterLabel }}
                </div>
              </div>

              <!-- Before Layer (top/clipped) -->
              <div
                class="absolute inset-0"
                :style="{
                  background: item.beforeImage ? `url(${item.beforeImage}) center/cover` : item.beforeGradient,
                  clipPath: `inset(0 ${100 - sliderPositions[index]}% 0 0)`,
                }"
              >
                <!-- Before texture pattern -->
                <div v-if="!item.beforeImage" class="absolute inset-0" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.15) 4px, rgba(0,0,0,0.15) 5px);" />
                <!-- Dirt/moss overlay for before -->
                <div v-if="!item.beforeImage" class="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />
                <!-- Before label -->
                <div class="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm text-white text-xs font-display font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
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
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg shadow-black/30 flex items-center justify-center pointer-events-none
                            transition-transform duration-200"
                     :class="{ 'scale-110': activeSlider === index }"
                >
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
                  </svg>
                </div>
              </div>

              <!-- Instruction overlay (fades out) -->
              <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 group-hover:opacity-0 transition-opacity duration-500">
                <div class="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
                  </svg>
                  <span class="text-white text-xs font-medium">Drag to compare</span>
                </div>
              </div>
            </div>

            <!-- Info -->
            <div class="p-5">
              <h3 class="font-display font-semibold text-white text-lg mb-1">{{ item.title }}</h3>
              <p class="text-slate-400 text-sm leading-relaxed">{{ item.description }}</p>
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
  </section>
</template>
