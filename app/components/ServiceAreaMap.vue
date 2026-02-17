<script setup lang="ts">
const mapContainer = ref<HTMLElement | null>(null)
let map: any = null

onMounted(async () => {
  // Dynamically import Leaflet (client-side only)
  const L = (await import('leaflet')).default
  await import('leaflet/dist/leaflet.css')

  if (!mapContainer.value) return

  // Essex center coordinates (roughly central Essex)
  const essexCenter: [number, number] = [51.7343, 0.4691]

  map = L.map(mapContainer.value, {
    center: essexCenter,
    zoom: 9,
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

  // Service area polygon — rough boundary of Essex county
  const serviceAreaCoords: [number, number][] = [
    [51.5000, 0.0100],
    [51.5200, -0.0200],
    [51.5600, -0.0100],
    [51.6000, 0.0000],
    [51.6400, 0.0100],
    [51.6800, 0.0200],
    [51.7200, 0.0100],
    [51.7600, 0.0200],
    [51.8000, 0.0400],
    [51.8400, 0.0600],
    [51.8800, 0.1000],
    [51.9200, 0.1500],
    [51.9500, 0.2200],
    [51.9700, 0.3000],
    [51.9800, 0.4000],
    [51.9800, 0.5000],
    [51.9700, 0.6000],
    [51.9500, 0.7000],
    [51.9200, 0.8000],
    [51.8800, 0.9000],
    [51.8500, 0.9500],
    [51.8200, 1.0000],
    [51.7800, 1.0500],
    [51.7400, 1.1000],
    [51.7000, 1.1200],
    [51.6600, 1.1000],
    [51.6200, 1.0500],
    [51.5800, 1.0000],
    [51.5500, 0.9500],
    [51.5300, 0.9000],
    [51.5100, 0.8500],
    [51.4900, 0.8000],
    [51.4800, 0.7000],
    [51.4700, 0.6000],
    [51.4700, 0.5000],
    [51.4700, 0.4000],
    [51.4700, 0.3000],
    [51.4800, 0.2000],
    [51.4900, 0.1000],
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

  L.marker(essexCenter, { icon: pulseIcon }).addTo(map)
    .bindPopup(
      `<div style="text-align:center;font-family:'Oswald',sans-serif;padding:4px 0;">
        <strong style="font-size:14px;color:#1e293b;">Precision Pressure Washing</strong><br/>
        <span style="font-size:12px;color:#64748b;">Serving Basildon & All of Essex</span>
      </div>`,
      { className: 'custom-popup' }
    )

  // Key areas across Essex
  const areas = [
    { name: 'Basildon', pos: [51.5761, 0.4886] as [number, number] },
    { name: 'Chelmsford', pos: [51.7356, 0.4685] as [number, number] },
    { name: 'Southend-on-Sea', pos: [51.5459, 0.7077] as [number, number] },
    { name: 'Colchester', pos: [51.8860, 0.8920] as [number, number] },
    { name: 'Brentwood', pos: [51.6213, 0.3057] as [number, number] },
    { name: 'Harlow', pos: [51.7727, 0.1099] as [number, number] },
    { name: 'Braintree', pos: [51.8783, 0.5500] as [number, number] },
    { name: 'Wickford', pos: [51.6130, 0.5250] as [number, number] },
    { name: 'Billericay', pos: [51.6280, 0.4200] as [number, number] },
    { name: 'Rayleigh', pos: [51.5862, 0.6046] as [number, number] },
    { name: 'Grays', pos: [51.4750, 0.3250] as [number, number] },
    { name: 'Canvey Island', pos: [51.5210, 0.5780] as [number, number] },
    { name: 'Maldon', pos: [51.7314, 0.6753] as [number, number] },
    { name: 'Witham', pos: [51.7960, 0.6380] as [number, number] },
    { name: 'Loughton', pos: [51.6465, 0.0555] as [number, number] },
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
           Proudly serving Basildon and the entire Essex county.
          From Southend to Colchester, Harlow to Grays — we've got you covered.
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
          v-for="area in ['Basildon', 'Chelmsford', 'Southend-on-Sea', 'Colchester', 'Brentwood', 'Harlow', 'Braintree', 'Wickford', 'Billericay', 'Rayleigh', 'Grays', 'Canvey Island', 'Maldon', 'Witham', 'Loughton']"
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
