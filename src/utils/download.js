/**
 * Trigger a client-side text file download reliably across desktop and mobile browsers.
 * Attaches the temporary anchor to the DOM and defers object URL revocation so
 * browsers like Mobile Safari / Android WebView can initiate the download first.
 */
export function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
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
