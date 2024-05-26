document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('hero')
  const mainNav = document.getElementById('main-nav')
  const mainNavToggle = mainNav ? mainNav.querySelector('[data-collapse-toggle="main-nav"]') : null
  const mainNavLinksContainer = document.getElementById('main-nav-links')
  const mainNavOpenIcon = document.getElementById('main-nav-open-icon')
  const mainNavCloseIcon = document.getElementById('main-nav-close-icon')

  let mainNavExpanded = false

  // Utility functions
  const hideElement = (element) => element.classList.add('hidden')
  const showElement = (element) => element.classList.remove('hidden')
  const setMainNavAriaExpanded = () => {
    if (!mainNavToggle) return

    mainNavToggle.setAttribute('aria-expanded', mainNavExpanded.toString())
  }

  const collapseMainNav = () => {
    mainNavExpanded = false
    hideElement(mainNavLinksContainer)
    hideElement(mainNavCloseIcon)
    showElement(mainNavOpenIcon)
    setMainNavAriaExpanded()
  }

  const expandMainNav = () => {
    if (!mainNavToggle || !mainNavLinksContainer) return
    mainNavExpanded = true
    showElement(mainNavLinksContainer)
    hideElement(mainNavOpenIcon)
    showElement(mainNavCloseIcon)
    setMainNavAriaExpanded()
  }

  const toggleMainNavCollapse = () => (mainNavExpanded ? collapseMainNav() : expandMainNav())

  const setMainNavDefaultMode = () => {
    if (!mainNav) return
    mainNav.classList.add('bg-white')
    mainNav.classList.remove('bg-slate-950', 'text-white')

    const logo = document.getElementById('main-nav-logo')
    if (!logo) return

    logo.classList.remove('fill-white')
  }

  const setMainNavHeroMode = () => {
    if (!mainNav) return
    mainNav.classList.add('bg-slate-950', 'text-white')
    mainNav.classList.remove('bg-white')

    const logo = document.getElementById('main-nav-logo')
    if (!logo) return

    logo.classList.add('fill-white')
  }

  const toggleMainNavHeroBackground = () => {
    if (!hero) return
    window.scrollY <= hero.offsetHeight ? setMainNavHeroMode() : setMainNavDefaultMode()
  }

  const initializeMainNavigationCollapseListener = () => {
    if (!mainNavToggle || !mainNavLinksContainer) return
    mainNavToggle.addEventListener('click', toggleMainNavCollapse)
    mainNavLinksContainer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', collapseMainNav)
    })
  }

  const initializeMainNavHeroListener = () => {
    if (!hero) return
    toggleMainNavHeroBackground()
    window.addEventListener('scroll', toggleMainNavHeroBackground)
  }

  initializeMainNavigationCollapseListener()
  initializeMainNavHeroListener()
})
