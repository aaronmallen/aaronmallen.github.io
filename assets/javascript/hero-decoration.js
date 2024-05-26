document.addEventListener('DOMContentLoaded', () => {
  const HERO_DECORATION_CLASSES = [
    'javascript-const',
    'javascript-function',
    'python-function',
    'rspec-subject',
    'ruby-def',
  ]

  const hero = document.getElementById('hero')
  let currentHeroDecorationClass = null

  // Utility functions
  const elementsByClassName = (className, parent = document) => parent.querySelectorAll(`.${className}`)
  const hideElement = (element) => element.classList.add('hidden')
  const showElement = (element) => element.classList.remove('hidden')
  const sampleArray = (array) => array[Math.floor(Math.random() * array.length)]

  const fadeInCurrentHeroDecoration = (callback = () => {}) => {
    if (!hero) return
    const elements = elementsByClassName(currentHeroDecorationClass, hero)
    elements.forEach(showElement)
    setTimeout(() => {
      elements.forEach((element) => element.classList.remove('opacity-0'))
      callback()
    }, 50)
  }

  const fadeOutCurrentHeroDecoration = (callback = () => {}) => {
    if (!hero) return
    const elements = elementsByClassName(currentHeroDecorationClass, hero)
    elements.forEach((element) => element.classList.add('opacity-0'))
    setTimeout(() => {
      elements.forEach(hideElement)
      callback()
    }, 1001)
  }

  const showRandomHeroDecoration = () => {
    if (!hero) return
    fadeOutCurrentHeroDecoration(() => {
      currentHeroDecorationClass = sampleArray(
        currentHeroDecorationClass
          ? HERO_DECORATION_CLASSES.filter((className) => className !== currentHeroDecorationClass)
          : HERO_DECORATION_CLASSES,
      )
      fadeInCurrentHeroDecoration()
    })
  }

  const initializeHeroDecoration = () => {
    if (!hero) return
    HERO_DECORATION_CLASSES.forEach((className) => {
      elementsByClassName(className, hero).forEach((element) => {
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

  initializeHeroDecoration()
  initializeHeroDecorationRotation()
})
