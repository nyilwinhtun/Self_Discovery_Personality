const FONT_STACK =
  '"Noto Sans Myanmar", "Padauk", "Myanmar Text", "Pyidaungsu", system-ui, -apple-system, sans-serif'

function drawRoundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + width, y, x + width, y + height, r)
  ctx.arcTo(x + width, y + height, x, y + height, r)
  ctx.arcTo(x, y + height, x, y, r)
  ctx.arcTo(x, y, x + width, y, r)
  ctx.closePath()
}

function wrapText(ctx, text, maxWidth) {
  const raw = String(text || '').trim()
  if (!raw) return []
  const words = raw.split(/\s+/)
  const lines = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate
    } else if (!current) {
      // Break long unbroken strings safely by character if needed.
      let chunk = ''
      for (const ch of word) {
        if (ctx.measureText(chunk + ch).width > maxWidth && chunk) {
          lines.push(chunk)
          chunk = ch
        } else {
          chunk += ch
        }
      }
      current = chunk
    } else {
      lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)
  return lines
}

function canvasToPngBlob(canvas) {
  return new Promise((resolve, reject) => {
    if (typeof canvas.toBlob !== 'function') {
      reject(new Error('Canvas PNG export is not supported in this browser.'))
      return
    }
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to generate PNG image.'))
        return
      }
      resolve(blob)
    }, 'image/png')
  })
}

/**
 * Generate and download a warm-paper aesthetic PNG summary card using HTML5 Canvas.
 * Zero external dependencies; lazy-loaded on demand.
 */
export async function downloadResultImageCard(rawConfig) {
  let config = rawConfig
  if (rawConfig?.preset === 'traitLens') {
    const { TRAITS } = await import('../data/questions.js')
    const rec = rawConfig.record || {}
    const sc = rawConfig.scores || {}
    let dateText = ''
    try {
      dateText = new Intl.DateTimeFormat('my-MM', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(rec.createdAt))
    } catch {
      dateText = new Date(rec.createdAt).toLocaleString()
    }
    config = {
      filename: `traitlens-result-${new Date(rec.createdAt).toISOString().slice(0, 10)}.png`,
      subtitle: 'TRAITLENS · PERSONALITY PROFILE',
      title: 'ပင်ကိုစရိုက် အချက် ၅ ချက် အကျဉ်းချုပ်',
      metaLine: `မေးခွန်း ${rec.level || rec.questionCount || 30} · ${dateText}`,
      items: TRAITS.map((t) => ({ label: t.name, score: sc[t.id]?.score ?? 0 })),
      accentColor: '#80678f',
      trackColor: '#efe8f1',
    }
  }

  const {
    filename = 'self-discovery-result.png',
    subtitle = 'SELF DISCOVERY',
    title = 'ကိုယ်တိုင်ပြန်လည်သုံးသပ်မှု ရလဒ်',
    metaLine = '',
    highlightLine = '',
    items = [],
    accentColor = '#80678f',
    trackColor = '#efe8f1',
    footerNote = 'ဤရလဒ်သည် ကိုယ်တိုင်ပြန်လည်သုံးသပ်ရန် အညွှန်းသာဖြစ်ပြီး စိတ်ပညာရောဂါရှာဖွေမှု မဟုတ်ပါ။',
  } = config || {}
  if (typeof document === 'undefined') {
    throw new Error('Image export requires a browser environment.')
  }

  const width = 920
  const scale = 2
  const outerPad = 40
  const cardX = outerPad
  const cardY = outerPad
  const cardW = width - outerPad * 2
  const innerPad = 44
  const contentW = cardW - innerPad * 2

  const measureCanvas = document.createElement('canvas')
  const mCtx = measureCanvas.getContext('2d')
  if (!mCtx) {
    throw new Error('Could not initialize 2D canvas context.')
  }

  mCtx.font = `700 28px ${FONT_STACK}`
  const titleLines = wrapText(mCtx, title, contentW)

  mCtx.font = `600 17px ${FONT_STACK}`
  const highlightLines = highlightLine ? wrapText(mCtx, highlightLine, contentW - 36) : []

  mCtx.font = `600 18px ${FONT_STACK}`
  const preparedItems = items.map((item) => {
    const score = Math.max(0, Math.min(100, Math.round(Number(item.score) || 0)))
    const labelLines = wrapText(mCtx, item.label, contentW - 110)
    const blockHeight = Math.max(26, labelLines.length * 25) + 14 + 14 + 22
    return { ...item, score, labelLines, blockHeight }
  })

  mCtx.font = `400 14px ${FONT_STACK}`
  const footerLines = wrapText(mCtx, footerNote, contentW)

  const headerHeight =
    26 + // subtitle
    14 +
    titleLines.length * 38 +
    (metaLine ? 28 : 0) +
    (highlightLines.length ? 22 + highlightLines.length * 25 + 24 : 0) +
    28

  const itemsHeight = preparedItems.reduce((sum, item) => sum + item.blockHeight, 0)
  const footerHeight = 28 + footerLines.length * 22 + 12
  const cardH = innerPad + headerHeight + itemsHeight + footerHeight + innerPad
  const totalHeight = cardH + outerPad * 2

  const canvas = document.createElement('canvas')
  canvas.width = width * scale
  canvas.height = totalHeight * scale
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Could not create drawing context.')
  }
  ctx.scale(scale, scale)

  // Warm-paper outer background
  ctx.fillStyle = '#faf8f5'
  ctx.fillRect(0, 0, width, totalHeight)

  // Cream summary card with soft border
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 28)
  ctx.fillStyle = '#fffdfb'
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = '#e7dfd5'
  ctx.stroke()

  // Subtle top accent pill
  drawRoundedRect(ctx, cardX + innerPad, cardY + innerPad, 64, 6, 3)
  ctx.fillStyle = accentColor
  ctx.fill()

  let y = cardY + innerPad + 28
  const textX = cardX + innerPad

  // Subtitle
  ctx.fillStyle = accentColor
  ctx.font = `700 13px ${FONT_STACK}`
  ctx.fillText(subtitle, textX, y)
  y += 34

  // Title
  ctx.fillStyle = '#2c2530'
  ctx.font = `700 28px ${FONT_STACK}`
  for (const line of titleLines) {
    ctx.fillText(line, textX, y)
    y += 38
  }

  // Meta line
  if (metaLine) {
    ctx.fillStyle = '#625666'
    ctx.font = `500 15px ${FONT_STACK}`
    ctx.fillText(metaLine, textX, y)
    y += 28
  }

  // Optional highlight box
  if (highlightLines.length) {
    y += 8
    const boxH = highlightLines.length * 25 + 22
    drawRoundedRect(ctx, textX, y, contentW, boxH, 14)
    ctx.fillStyle = '#f6f2ed'
    ctx.fill()
    ctx.fillStyle = '#3c3340'
    ctx.font = `600 17px ${FONT_STACK}`
    let hy = y + 26
    for (const line of highlightLines) {
      ctx.fillText(line, textX + 18, hy)
      hy += 25
    }
    y += boxH + 14
  }

  // Divider
  y += 12
  ctx.strokeStyle = '#ece4da'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(textX, y)
  ctx.lineTo(textX + contentW, y)
  ctx.stroke()
  y += 28

  // Horizontal score bars
  for (const item of preparedItems) {
    ctx.fillStyle = '#2f2733'
    ctx.font = `600 18px ${FONT_STACK}`
    let ly = y
    for (const line of item.labelLines) {
      ctx.fillText(line, textX, ly)
      ly += 25
    }

    // Score on the right
    ctx.fillStyle = accentColor
    ctx.font = `700 18px ${FONT_STACK}`
    const scoreText = `${item.score} / 100`
    const scoreW = ctx.measureText(scoreText).width
    ctx.fillText(scoreText, textX + contentW - scoreW, y)

    // Progress bar
    const barY = Math.max(ly - 10, y + 14)
    const barH = 12
    drawRoundedRect(ctx, textX, barY, contentW, barH, 6)
    ctx.fillStyle = trackColor
    ctx.fill()

    if (item.score > 0) {
      const fillW = Math.max(12, (contentW * item.score) / 100)
      drawRoundedRect(ctx, textX, barY, fillW, barH, 6)
      ctx.fillStyle = accentColor
      ctx.fill()
    }

    y += item.blockHeight
  }

  // Footer divider and non-diagnostic note
  y += 8
  ctx.strokeStyle = '#ece4da'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(textX, y)
  ctx.lineTo(textX + contentW, y)
  ctx.stroke()
  y += 26

  ctx.fillStyle = '#625666'
  ctx.font = `400 14px ${FONT_STACK}`
  for (const line of footerLines) {
    ctx.fillText(line, textX, y)
    y += 22
  }

  const blob = await canvasToPngBlob(canvas)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.rel = 'noopener'
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
