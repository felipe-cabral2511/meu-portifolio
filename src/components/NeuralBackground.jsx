import { useEffect, useRef } from 'react'

const NODE_COUNT = 90
const MAX_DIST = 140
const MOUSE_RADIUS = 160

export default function NeuralBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let W = canvas.offsetWidth
    let H = canvas.offsetHeight
    canvas.width = W
    canvas.height = H

    let mouseX = -1000, mouseY = -1000
    let mdx = 0, mdy = 0

    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }))

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const nx = e.clientX - rect.left
      const ny = e.clientY - rect.top
      mdx = nx - mouseX
      mdy = ny - mouseY
      mouseX = nx
      mouseY = ny
    }
    canvas.addEventListener('mousemove', onMouseMove)

    let rafId

    const animate = () => {
      ctx.clearRect(0, 0, W, H)

      // Mouse direction influence
      const mlen = Math.sqrt(mdx * mdx + mdy * mdy)
      if (mlen > 0.5) {
        const dnx = mdx / mlen
        const dny = mdy / mlen
        nodes.forEach(n => {
          const dx = n.x - mouseX
          const dy = n.y - mouseY
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MOUSE_RADIUS) {
            const force = (1 - d / MOUSE_RADIUS) * 0.25
            n.vx += dnx * force
            n.vy += dny * force
          }
        })
      }
      mdx *= 0.85
      mdy *= 0.85

      // Update positions
      nodes.forEach(n => {
        const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy)
        if (spd > 1.8) { n.vx = (n.vx / spd) * 1.8; n.vy = (n.vy / spd) * 1.8 }
        n.vx *= 0.995
        n.vy *= 0.995
        if (spd < 0.15) {
          n.vx += (Math.random() - 0.5) * 0.06
          n.vy += (Math.random() - 0.5) * 0.06
        }
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0) { n.x = 0;  n.vx = Math.abs(n.vx) }
        if (n.x > W) { n.x = W;  n.vx = -Math.abs(n.vx) }
        if (n.y < 0) { n.y = 0;  n.vy = Math.abs(n.vy) }
        if (n.y > H) { n.y = H;  n.vy = -Math.abs(n.vy) }
      })

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.35
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const d = Math.sqrt((n.x - mouseX) ** 2 + (n.y - mouseY) ** 2)
        const near = d < MOUSE_RADIUS
        ctx.beginPath()
        ctx.arc(n.x, n.y, near ? 3 : 2, 0, Math.PI * 2)
        ctx.fillStyle = near ? 'rgba(147,197,253,0.9)' : 'rgba(96,165,250,0.55)'
        ctx.fill()
      })

      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    const onResize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W
      canvas.height = H
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      canvas.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.55 }} />
}
