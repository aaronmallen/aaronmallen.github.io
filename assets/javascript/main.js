function initializeMainNavigationCollapseListener() {
  const toggle = document.querySelector('[data-collapse-toggle="main-navbar"]')
  const target = document.getElementById('main-navbar')

  if (!toggle || !target) return

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true' || false
    console.log(expanded)
    target.classList.toggle('hidden', expanded)
    toggle.setAttribute('aria-expanded', !expanded)
  })
}

window.addEventListener('load', (event) => {
  initializeMainNavigationCollapseListener()
})
