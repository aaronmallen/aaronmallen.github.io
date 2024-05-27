function initializeMainNavigationCollapseListener() {
  const toggle = document.querySelector('[data-collapse-toggle="main-navbar"]')
  const target = document.getElementById('main-navbar')

  if (!toggle || !target) return

  const links = target.querySelectorAll('a')

  const collapseNavbar = () => {
    target.classList.add('hidden')
    toggle.setAttribute('aria-expanded', 'false')
  }

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true' || false
    target.classList.toggle('hidden', expanded)
    toggle.setAttribute('aria-expanded', !expanded)
  })

  links.forEach((link) => {
    link.addEventListener('click', collapseNavbar)
  })
}

window.addEventListener('load', (event) => {
  initializeMainNavigationCollapseListener()
})
