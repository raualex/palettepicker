$(window).on('load', generateColors);
$('.color-container').on('click', toggleLock);
$('.generate-btn').on('click', generateColors);
$('.save-project-btn').on('click', saveProject);

function generateColors(event) {
  event.preventDefault()

  for (var i = 1; i < 6; i++) {
    if (!$(`.${i}`).hasClass('disabled')) {
      $(`.${i}`).css('background-color', makeRandomHex(`${i}`))
    }
  }
}

function makeRandomHex(num) {
  const hexSymbols = '0123456789abcdefg'
  let hexCode = '#'

  for (var i=0; i < 6; i++) {
    hexCode += hexSymbols[Math.floor(Math.random()*16)]
  }
  $(`.text-${num}`).text(hexCode)
  return hexCode
}

function toggleLock(event) {
  let lockBtn;
  let lockContainer;

  if ($(event.target).hasClass('color-container')) {
    lockBtn = $(event.target).children()
    lockContainer = $(event.target)
  } else {
    lockBtn = $(event.target)
    lockContainer = $(event.target.parentNode)
  }

  lockBtn.toggleClass('locked')
  lockContainer.toggleClass('disabled')
}

function saveProject(event) {
  event.preventDefault()
  let name = $('.project-title-input').val()
  $('.project-title-input').val('')
  
	fetch('/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({ title: name }),
    headers:{
      'Content-Type': 'application/json'
    }
	})
		.then(response => console.log(response))
    .catch(error => console.log(error))
}