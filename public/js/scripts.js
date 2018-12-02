$(window).on('load', generateColors);
$('.color-container').on('click', toggleLock);
$('.generate-btn').on('click', generateColors);
$('.save-project-btn').on('click', saveProject);
$('.save-palette-btn').on('click', saveColors)

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

async function saveProject(event) {
  event.preventDefault()
  let name = $('.project-title-input').val()
  $('.project-title-input').val('')
  
  try {
	  const response = await fetch('/api/v1/projects', {
      method: 'POST',
      body: JSON.stringify({ title: name }),
      headers:{
        'Content-Type': 'application/json'
      }
  	})
    const data = await response.json()
    displayProject(data, name)
  }
  catch(error) {
    console.log(error)
  }
}

function displayProject(num, title) {
  $('.project-title-display').text(title)
  $('.project-id').text(num.id)
}

function saveColors(event) {
  event.preventDefault()
  let colors = []

  for (var i = 0; i < 6; i++) {
    if (i !== 0) {
      let colorHex = $(`.text-${i}`).text()
      colors.push(colorHex)
    }
  }
  savePalette(colors)
}

function savePalette(colorArr) {
  let projId = $('.project-id').text()

  if (!projId) {
    return
  } else {
    fetch('/api/v1/palettes', {
      method: 'POST',
      body: JSON.stringify({ 
        color1: colorArr[0],
        color2: colorArr[1],
        color3: colorArr[2],
        color4: colorArr[3],
        color5: colorArr[4],
        project_id: projId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }
}