document.addEventListener('DOMContentLoaded', () => {
  const scrollToTopButton = document.getElementById('scroll-to-top-button')
  const scrollToTopButtonContainer = document.getElementById('scroll-to-top-button-container')

  // Utility functions
  const hideElement = (element) => element.classList.add('hidden')
  const showElement = (element) => element.classList.remove('hidden')

  const toggleScrollToTopButton = () => {
    if (!scrollToTopButtonContainer) return
    window.scrollY < 100 ? hideElement(scrollToTopButtonContainer) : showElement(scrollToTopButtonContainer)
  }

  const initializeScrollToTopButtonClickListener = () => {
    if (!scrollToTopButton) return
    scrollToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  const initializeScrollToTopButtonContainerListener = () => {
    if (!scrollToTopButtonContainer) return
    toggleScrollToTopButton()
    window.addEventListener('scroll', toggleScrollToTopButton)
  }

  initializeScrollToTopButtonContainerListener()
  initializeScrollToTopButtonClickListener()
})
