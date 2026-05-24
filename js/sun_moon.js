window.switchNightMode = function (event) {
  const html = document.documentElement
  const currentMode = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  const nextMode = currentMode === 'dark' ? 'light' : 'dark'
  const button = event && event.currentTarget
  const icon = document.getElementById('modeicon')

  const switchTheme = () => {
    if (nextMode === 'dark') {
      btf.activateDarkMode()
      btf.saveToLocal.set('theme', 'dark', 2)
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
      icon && icon.setAttribute('xlink:href', '#icon-sun')
    } else {
      btf.activateLightMode()
      btf.saveToLocal.set('theme', 'light', 2)
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
      icon && icon.setAttribute('xlink:href', '#icon-moon')
    }

    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread')?.children.length && setTimeout(() => window.disqusReset(), 200)
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    switchTheme()
    return
  }

  const x = window.innerWidth
  const y = window.innerHeight
  const mask = document.createElement('div')

  mask.className = `icat-theme-mask to-${nextMode}`
  mask.style.setProperty('--x', `${x}px`)
  mask.style.setProperty('--y', `${y}px`)
  html.classList.add('icat-theme-switching')
  button && button.classList.add('theme-toggle-active')
  document.body.appendChild(mask)

  requestAnimationFrame(() => {
    mask.classList.add('is-active')
  })

  setTimeout(switchTheme, 160)
  setTimeout(() => {
    mask.classList.add('is-leaving')
    button && button.classList.remove('theme-toggle-active')
    html.classList.remove('icat-theme-switching')
  }, 820)
  setTimeout(() => {
    mask.remove()
  }, 1180)
}
