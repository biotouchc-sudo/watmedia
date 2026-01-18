import confetti from 'canvas-confetti'

/**
 * Fire a celebration confetti effect
 * Best used after successful form submissions
 */
export function fireConfetti() {
  // Main burst
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#D4AF37', '#FFD700', '#FFA500', '#FFE4B5'],
  })
}

/**
 * Fire confetti from both sides (more dramatic)
 */
export function fireConfettiCannon() {
  const count = 200
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#D4AF37', '#FFD700', '#FFA500', '#FFE4B5', '#FFFFFF'],
  }

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    })
  }

  fire(0.25, { spread: 26, startVelocity: 55 })
  fire(0.2, { spread: 60 })
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
  fire(0.1, { spread: 120, startVelocity: 45 })
}

/**
 * Fire subtle confetti (for less dramatic moments)
 */
export function fireSubtleConfetti() {
  confetti({
    particleCount: 30,
    spread: 50,
    origin: { y: 0.8 },
    colors: ['#D4AF37', '#FFD700'],
    gravity: 1.5,
    scalar: 0.8,
  })
}
