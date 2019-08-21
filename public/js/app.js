console.log('Client-side JavaScript is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
  messageOne.textContent = "Loading..."
  event.preventDefault();

  const location = search.value
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = ""
        messageTwo.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecastData
      }
    })
  })
})