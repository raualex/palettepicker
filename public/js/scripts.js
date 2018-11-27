$('.lock-btn').on('click', toggleLock)

function toggleLock(event) {
  let lockBtn = $(event.target)
  lockBtn.toggleClass('locked')
}