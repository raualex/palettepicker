$('.lock-btn').on('click', toggleLock)

function toggleLock(event) {
  let lockBtn = $(event.target)
  let lockContainer = $(event.target.parentNode)

  lockBtn.toggleClass('locked')
  lockContainer.toggleClass('disabled')
}