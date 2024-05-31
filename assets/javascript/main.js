document.addEventListener('DOMContentLoaded', () => {
  const HERO_DECORATION_CLASSES = [
    'javascript-const',
    'javascript-function',
    'python-function',
    'rspec-subject',
    'ruby-def',
  ]

  const hero = document.getElementById('hero')
  const mainNav = document.getElementById('main-nav')
  const mainNavToggle = mainNav?.querySelector('[data-collapse-toggle="main-nav"]')
  const mainNavLinksContainer = document.getElementById('main-nav-links')
  const mainNavOpenIcon = document.getElementById('main-nav-open-icon')
  const mainNavCloseIcon = document.getElementById('main-nav-close-icon')

  let currentHeroDecorationClass = null
  let mainNavExpanded = false

  const collapseMainNav = () => {
    mainNavExpanded = false
    hideElement(mainNavLinksContainer)
    hideElement(mainNavCloseIcon)
    showElement(mainNavOpenIcon)
    setMainNavAriaExpanded()
  }

  const elementsByClassName = (className, parent = document) => {
    return parent.querySelectorAll(`.${className}`)
  }

  const expandMainNav = () => {
    if (!mainNavToggle || !mainNavLinksContainer) return

    mainNavExpanded = true
    showElement(mainNavLinksContainer)
    hideElement(mainNavOpenIcon)
    showElement(mainNavCloseIcon)
    setMainNavAriaExpanded()
  }

  const fadeInCurrentHeroDecoration = (callback = () => {}) => {
    if (!hero) return

    const elements = elementsByClassName(currentHeroDecorationClass, hero)
    elements.forEach(showElement)

    setTimeout(() => {
      elements.forEach((element) => {
        element.classList.remove('opacity-0')
      })
      callback()
    }, 50)
  }

  const fadeOutCurrentHeroDecoration = (callback = () => {}) => {
    if (!hero) return

    const elements = elementsByClassName(currentHeroDecorationClass, hero)
    elements.forEach((element) => {
      element.classList.add('opacity-0')
    })
    setTimeout(() => {
      elements.forEach(hideElement)
      callback()
    }, 1001)
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

  const setMainNavAriaExpanded = () => {
    if (!mainNavToggle) return

    mainNavToggle.setAttribute('aria-expanded', mainNavExpanded.toString())
  }

  const setMainNavDefaultMode = () => {
    mainNav?.classList.add('bg-white')
    mainNav?.classList.remove('bg-slate-950')
    mainNav?.classList.remove('text-white')

    const logo = document.getElementById('main-nav-logo')
    if (!logo) return

    logo.classList.remove('fill-white')
  }

  const setMainNavHeroMode = () => {
    mainNav?.classList.add('bg-slate-950')
    mainNav?.classList.add('text-white')
    mainNav?.classList.remove('bg-white')

    const logo = document.getElementById('main-nav-logo')
    if (!logo) return

    logo.classList.add('fill-white')
  }

  const showElement = (element) => {
    element.classList.remove('hidden')
  }

  const showRandomHeroDecoration = () => {
    if (!hero) return

    fadeOutCurrentHeroDecoration(() => {
      currentHeroDecorationClass = randomHeroDecorationClass()
      fadeInCurrentHeroDecoration()
    })
  }

  const toggleMainNavCollapse = () => {
    if (mainNavExpanded) {
      collapseMainNav()
    } else {
      expandMainNav()
    }
  }

  const toggleMainNavHeroBackground = () => {
    if (!hero) return

    if (window.scrollY <= hero.offsetHeight) {
      setMainNavHeroMode()
    } else {
      setMainNavDefaultMode()
    }
  }

  initializeMainNavigationCollapseListener()
  initializeMainNavHeroListener()
  initializeHeroDecoration()
  initializeHeroDecorationRotation()
})
