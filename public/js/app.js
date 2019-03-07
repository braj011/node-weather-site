// console.log("Client side JS file is loaded - from public/js/app.js");

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const tempImageComp = document.querySelector('#temperature-img')

let img = document.createElement("img")
img.className = "temp-image"

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  message1.textContent = 'Loading...'
  message2.textContent = ''
  tempImageComp.innerHTML = ''
  const location = search.value
  

  fetch(`http://localhost:3000/weather?address=${location}`)
  .then(response => { response.json() 
    .then((data) => {
      if (data.error) {
        message1.textContent = data.error
      }
      else {
        message1.textContent = data.location
        message2.textContent = data.forecast
        switch(true) {
          case (data.temperature > 20):
            img.src = "../img/sun_watercolour.png"
            tempImageComp.appendChild(img)
            break
          case (data.temperature >= 10):
            img.src = "../img/sun_and_cloud.png"
            tempImageComp.appendChild(img)
            break
          case (data.temperature < 10):
            img.src = "../img/cloud.png"
            tempImageComp.appendChild(img)
            break
        }

        // case when statements for image 
      }
    })
  })
})
