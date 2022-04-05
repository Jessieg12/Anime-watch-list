document.addEventListener('DOMContentLoaded', (e)=>{
getApiInfo()
})

const getApiInfo = () => {
  fetch('https://anime-facts-rest-api.herokuapp.com/api/v1')
  .then(resp => resp.json())
  .then(data => console.log(data))
}