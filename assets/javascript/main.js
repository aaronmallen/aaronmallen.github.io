document.addEventListener('DOMContentLoaded', () => {
  const SPLASH_DECORATION_CLASSES = ['javascript-function', 'python-function', 'rspec-subject', 'ruby-def']
  let currentSplashDecorationClass = 'ruby-def'

  function allDecorationElements() {
    const elements = []
    const target = document.getElementById('splash')
    if (!target) return elements

    SPLASH_DECORATION_CLASSES.forEach(className => {
      const elementsInClass = target.querySelectorAll(`.${className}`)
      elements.push(...elementsInClass)
    })

    return elements
  }

  function hideAllDecorationElements() {
    const elements = allDecorationElements()

    elements.forEach(element => {
      element.classList.add('opacity-0')
      setTimeout(() => { element.classList.add('hidden') }, 100)
    })
  }

  function randomSplashDecorationClass() {
    let classNames

    if (currentSplashDecorationClass) {
      classNames = SPLASH_DECORATION_CLASSES.filter(className => className !== currentSplashDecorationClass)
    } else {
      classNames = SPLASH_DECORATION_CLASSES
    }

    const randomIndex = Math.floor(Math.random() * classNames.length)
    return classNames[randomIndex]
  }

  function splashDecorationElementsByClassName(className) {
    const target = document.getElementById('splash')
    if (!target) return []

    const elements = target.querySelectorAll(`.${className}`)
    return elements || []
  }

  function updateSplashDecoration() {
    hideAllDecorationElements()
    setTimeout(() => {
      currentSplashDecorationClass = randomSplashDecorationClass()
      const elements = splashDecorationElementsByClassName(currentSplashDecorationClass)

      elements.forEach(element => {
        element.classList.remove('hidden')
        setTimeout(() => { element.classList.remove('opacity-0') }, 50)
      })
    }, 150)
  }

  // Initialize functions

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

  function initializeSplashDecoration() {
    SPLASH_DECORATION_CLASSES.forEach(className => {
      const elements = splashDecorationElementsByClassName(className)
      elements.forEach(element => {
        element.classList.add('hidden')
        element.classList.add('opacity-0')
      })
    })

    currentSplashDecorationClass = randomSplashDecorationClass()
    const elements = splashDecorationElementsByClassName(currentSplashDecorationClass)

    elements.forEach(element => {
      element.classList.remove('hidden')
      element.classList.remove('opacity-0')
    })
  }

  function initializeBrandButtonClickListener() {
    const target = document.querySelector('[role="navigation"]')
    if (!target) return

    const brandButtons = target.querySelectorAll('.brand')
    brandButtons.forEach(button => {
      button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTimeout(updateSplashDecoration, 100)
      })
    })
  }

  function initializeScrollToTopButton() {
    const target = document.getElementById('scroll-to-top-button')
    if (!target) return

    document.addEventListener('scroll', () => {
      if (window.scrollY === 0) {
        setTimeout(() => target.classList.add('opacity-0'), 100)
      } else {
        setTimeout(() => target.classList.remove('opacity-0'), 100)
      }
    })

    target.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  initializeMainNavigationCollapseListener()
  initializeSplashDecoration()
  initializeBrandButtonClickListener()
  initializeScrollToTopButton()
})
