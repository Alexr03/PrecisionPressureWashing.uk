<script setup lang="ts">
const mapContainer = ref<HTMLElement | null>(null)
let map: any = null

onMounted(async () => {
  // Dynamically import Leaflet (client-side only)
  const L = (await import('leaflet')).default
  await import('leaflet/dist/leaflet.css')

  if (!mapContainer.value) return

  // Basildon center coordinates
  const basildonCenter: [number, number] = [51.5761, 0.4886]

  map = L.map(mapContainer.value, {
    center: basildonCenter,
    zoom: 12,
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: false,
  })

  // Dark-themed map tiles (CartoDB Dark Matter)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map)

  // Add zoom control to bottom-right
  L.control.zoom({ position: 'bottomright' }).addTo(map)

  // Attribution
  L.control.attribution({ position: 'bottomleft', prefix: false }).addTo(map)
    .addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> &copy; <a href="https://carto.com/" target="_blank">CARTO</a>')

  // Service area polygon — rough boundary of Basildon district
  const serviceAreaCoords: [number, number][] = [
    [51.6150, 0.4200],
    [51.6200, 0.4450],
    [51.6180, 0.4750],
    [51.6120, 0.5050],
    [51.6080, 0.5300],
    [51.6000, 0.5500],
    [51.5850, 0.5600],
    [51.5700, 0.5650],
    [51.5550, 0.5600],
    [51.5400, 0.5500],
    [51.5300, 0.5300],
    [51.5280, 0.5050],
    [51.5300, 0.4750],
    [51.5350, 0.4450],
    [51.5420, 0.4200],
    [51.5520, 0.4050],
    [51.5650, 0.4000],
    [51.5800, 0.3980],
    [51.5950, 0.4000],
    [51.6080, 0.4100],
  ]

  // Glowing service area polygon
  // Outer glow layer
  L.polygon(serviceAreaCoords, {
    color: '#3b82f6',
    weight: 1,
    opacity: 0.15,
    fillColor: '#3b82f6',
    fillOpacity: 0.06,
    smoothFactor: 2,
  }).addTo(map)

  // Main boundary
  const serviceArea = L.polygon(serviceAreaCoords, {
    color: '#60a5fa',
    weight: 2,
    opacity: 0.6,
    fillColor: '#3b82f6',
    fillOpacity: 0.12,
    smoothFactor: 2,
    dashArray: '8, 6',
  }).addTo(map)

  // Pulsing center marker
  const pulseIcon = L.divIcon({
    html: `
      <div class="map-marker-pulse">
        <div class="map-marker-core"></div>
        <div class="map-marker-ring"></div>
        <div class="map-marker-ring map-marker-ring-delayed"></div>
      </div>
    `,
    className: 'map-marker-container',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })

  L.marker(basildonCenter, { icon: pulseIcon }).addTo(map)
    .bindPopup(
      `<div style="text-align:center;font-family:'Oswald',sans-serif;padding:4px 0;">
        <strong style="font-size:14px;color:#1e293b;">Precision Pressure Washing</strong><br/>
        <span style="font-size:12px;color:#64748b;">Serving the Basildon Area</span>
      </div>`,
      { className: 'custom-popup' }
    )

  // Nearby areas labels
  const areas = [
    { name: 'Basildon', pos: [51.5761, 0.4886] as [number, number] },
    { name: 'Laindon', pos: [51.5700, 0.4250] as [number, number] },
    { name: 'Pitsea', pos: [51.5625, 0.5100] as [number, number] },
    { name: 'Vange', pos: [51.5560, 0.4650] as [number, number] },
    { name: 'Wickford', pos: [51.6130, 0.5250] as [number, number] },
    { name: 'Billericay', pos: [51.6280, 0.4200] as [number, number] },
    { name: 'Langdon Hills', pos: [51.5580, 0.4400] as [number, number] },
  ]

  areas.forEach((area) => {
    const labelIcon = L.divIcon({
      html: `<span class="map-area-label">${area.name}</span>`,
      className: 'map-label-container',
      iconSize: [100, 20],
      iconAnchor: [50, 10],
    })
    L.marker(area.pos, { icon: labelIcon, interactive: false }).addTo(map)
  })

  // Enable scroll zoom when map is focused
  mapContainer.value.addEventListener('click', () => {
    map.scrollWheelZoom.enable()
  })

  mapContainer.value.addEventListener('mouseleave', () => {
    map.scrollWheelZoom.disable()
  })
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <section id="service-area" class="relative py-24 sm:py-32 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#060e1a] via-[#0a1628] to-[#060e1a]" />
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gradient-radial from-blue-600/8 via-transparent to-transparent blur-3xl" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16 sm:mb-20 scroll-reveal">
        <span class="inline-block text-blue-400 font-display text-sm uppercase tracking-[0.2em] mb-4">
          Where We Work
        </span>
        <h2 class="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6 tracking-tight">
          Our Service Area
        </h2>
        <div class="section-divider mb-6" />
        <p class="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
          Currently serving the Basildon area and surrounding neighbourhoods.
          Contact us to check if we cover your location.
        </p>
      </div>

      <!-- Map Container -->
      <div class="scroll-reveal-scale">
        <div class="glass-card p-2 sm:p-3 overflow-hidden">
          <ClientOnly>
            <div
              ref="mapContainer"
              class="w-full h-[400px] sm:h-[500px] lg:h-[550px] rounded-xl overflow-hidden"
              style="z-index: 0;"
            />
            <template #fallback>
              <div class="w-full h-[400px] sm:h-[500px] lg:h-[550px] rounded-xl bg-navy-mid/50 flex items-center justify-center">
                <div class="text-center">
                  <svg class="w-12 h-12 text-blue-500/40 mx-auto mb-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p class="text-slate-500 text-sm">Loading map...</p>
                </div>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>

      <!-- Area Tags -->
      <div class="flex flex-wrap justify-center gap-3 mt-10 scroll-reveal">
        <span
          v-for="area in ['Basildon', 'Laindon', 'Pitsea', 'Vange', 'Wickford', 'Billericay', 'Langdon Hills']"
          :key="area"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-sm font-medium
                 hover:bg-blue-500/10 hover:border-blue-500/20 hover:text-white transition-all duration-300 cursor-default"
        >
          <svg class="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {{ area }}
        </span>
      </div>
    </div>
  </section>
</template>
