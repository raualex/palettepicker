$(window).on('load', generateColors)
$('.lock-btn').on('click', toggleLock)
$('.generate-btn').on('click', generateColors)

function generateColors(event) {
  event.preventDefault()

  for (var i = 1; i < 6; i++) {
    console.log(`color${i}`)
    if (!$(`.${i}`).hasClass('disabled')) {
      $(`.${i}`).css('background-color', makeRandomHex())
    }
  }

  // if (!color1.hasClass('disabled')) {
  //   $('.color1').css('background-color', checkForLock($('.color1')))
  // }
  // $('.color2').css('background-color', makeRandomHex())
  // $('.color3').css('background-color', makeRandomHex())
  // $('.color4').css('background-color', makeRandomHex())
  // $('.color5').css('background-color', makeRandomHex())
}

function checkForLock(element) {

}

function makeRandomHex() {
  const hexSymbols = '0123456789abcdefg'
  let hexCode = '#'

  for (var i=0; i < 6; i++) {
    hexCode += hexSymbols[Math.floor(Math.random()*16)]
  }
  console.log(hexCode)
  return hexCode
}

function toggleLock(event) {
  let lockBtn = $(event.target)
  let lockContainer = $(event.target.parentNode)

  lockBtn.toggleClass('locked')
  lockContainer.toggleClass('disabled')
}