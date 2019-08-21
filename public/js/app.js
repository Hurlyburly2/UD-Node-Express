console.log('Client-side JavaScript is loaded')

fetch('/weather?address=boston').then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error)
    } else {
      console.log(data.location)
      console.log(data.forecastData)
    }
  })
})