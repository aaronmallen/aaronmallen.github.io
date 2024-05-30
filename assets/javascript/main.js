document.addEventListener('DOMContentLoaded', () => {
  const HERO_DECORATION_CLASSES = ['javascript-function', 'python-function', 'rspec-subject', 'ruby-def']
  const navbarToggle = document.querySelector('[data-collapse-toggle="main-navbar"]')
  const navbarLinksContainer = document.getElementById('main-navbar')
  const hero = document.getElementById('hero')

  let navbarExpanded = false
  let currentHeroDecorationClass = null

  const collapseNavbar = () => {
    if (!navbarToggle || !navbarLinksContainer) return

    navbarExpanded = false
    hideElement(navbarLinksContainer)
    setNavbarAriaExpanded()
  }

  const elementsByClassName = (className, parent = document) => {
    return parent.querySelectorAll(`.${className}`)
  }

  const expandNavbar = () => {
    if (!navbarToggle || !navbarLinksContainer) return

    navbarExpanded = true
    showElement(navbarLinksContainer)
    setNavbarAriaExpanded()
  }

  const fadeInCurrentHeroDecoration = () => {
    if (!hero) return new Promise((resolve) => resolve(null))

    const elements = elementsByClassName(currentHeroDecorationClass, hero)
    elements.forEach(showElement)

    return new Promise((resolve) => {
      setTimeout(() => {
        elements.forEach((element) => {
          element.classList.remove('opacity-0')
        })
        resolve(null)
      }, 50)
    })
  }

  const fadeOutCurrentHeroDecoration = () => {
    if (!hero) return new Promise((resolve) => resolve(null))

    const elements = elementsByClassName(currentHeroDecorationClass, hero)
    elements.forEach((element) => {
      element.classList.add('opacity-0')
    })

    return new Promise((resolve) => {
      setTimeout(() => {
        elements.forEach(hideElement)
        resolve(null)
      }, 200)
    })
  }

  const hideElement = (element) => {
    element.classList.add('hidden')
  }

  const initializeHeroDecoration = () => {
    if (!hero) return

    HERO_DECORATION_CLASSES.forEach((className) => {
      const elements = elementsByClassName(className, hero)
      elements.forEach((element) => {
        hideElement(element)
        element.classList.add('opacity-0')
      })
    })

    showRandomHeroDecoration()
  }

  const initializeHeroDecorationRotation = () => {
    if (!hero) return

    setTimeout(() => {
      showRandomHeroDecoration()
      initializeHeroDecorationRotation()
    }, 10000)
  }

  const initializeMainNavigationCollapseListener = () => {
    if (!navbarToggle || !navbarLinksContainer) return

    navbarToggle.addEventListener('click', toggleNavbar)
    navbarLinksContainer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', collapseNavbar)
    })
  }

  const randomHeroDecorationClass = () => {
    let classNames

    if (currentHeroDecorationClass) {
      classNames = HERO_DECORATION_CLASSES.filter((className) => className !== currentHeroDecorationClass)
    } else {
      classNames = HERO_DECORATION_CLASSES
    }

    return sampleArray(classNames)
  }

  const sampleArray = (array) => {
    return array[Math.floor(Math.random() * array.length)]
  }

  const setNavbarAriaExpanded = () => {
    if (!navbarToggle) return

    navbarToggle.setAttribute('aria-expanded', navbarExpanded.toString())
  }

  const showElement = (element) => {
    element.classList.remove('hidden')
  }

  const showRandomHeroDecoration = () => {
    if (!hero) return

    fadeOutCurrentHeroDecoration()
      .then((currentHeroDecorationClass = randomHeroDecorationClass()))
      .finally(fadeInCurrentHeroDecoration)
  }

  const toggleNavbar = () => {
    if (navbarExpanded) {
      collapseNavbar()
    } else {
      expandNavbar()
    }
  }

  initializeMainNavigationCollapseListener()
  initializeHeroDecoration()
  initializeHeroDecorationRotation()
})
