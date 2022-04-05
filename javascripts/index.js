document.addEventListener('DOMContentLoaded', ()=>{
getApiInfo()
renderAllAnime()
})

const getApiInfo = () => {
  fetch('https://anime-facts-rest-api.herokuapp.com/api/v1')
  .then(resp => resp.json())
  .then((anime) => anime.forEach(titles => renderAllAnime(titles)))
}

const renderAllAnime = (titles) => {
  let anime = titles
  console.log(anime)

}
