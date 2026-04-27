import { useEffect, useRef } from 'react'

export function useScrollAnimation(animClass = 'fade-up', delay = 0) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.classList.add(animClass)
    if (delay) el.style.transitionDelay = `${delay}s`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
        } else {
          el.classList.remove('visible')
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px 40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animClass, delay])

  return ref
}
