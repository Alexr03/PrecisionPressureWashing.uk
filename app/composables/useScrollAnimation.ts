export function useScrollAnimation() {
  const observer = ref<IntersectionObserver | null>(null)

  const initScrollAnimations = () => {
    if (typeof window === 'undefined') return

    const selectors = [
      '.scroll-reveal',
      '.scroll-reveal-left',
      '.scroll-reveal-right',
      '.scroll-reveal-scale',
    ]

    // Collect all elements
    const allElements: Element[] = []
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        allElements.push(el)
      })
    })

    // STEP 1: Immediately mark elements already in the viewport as visible
    // BEFORE we add .scroll-ready (which hides them). This prevents any flash.
    const viewportHeight = window.innerHeight
    allElements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < viewportHeight + 40) {
        el.classList.add('is-visible')
      }
    })

    // STEP 2: Now safe to add scroll-ready — elements in viewport already
    // have .is-visible so they won't flash hidden
    document.documentElement.classList.add('scroll-ready')

    // STEP 3: Set up IntersectionObserver for remaining off-screen elements
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.value?.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    // Only observe elements NOT already visible
    allElements.forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        observer.value?.observe(el)
      }
    })
  }

  const destroyScrollAnimations = () => {
    observer.value?.disconnect()
    observer.value = null
  }

  onMounted(() => {
    nextTick(() => {
      initScrollAnimations()
    })
  })

  onBeforeUnmount(() => {
    destroyScrollAnimations()
  })

  return {
    initScrollAnimations,
    destroyScrollAnimations,
  }
}
