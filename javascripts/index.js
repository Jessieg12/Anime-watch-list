document.addEventListener('DOMContentLoaded', ()=>{
getApiInfo()
dropDownButton()
})

const getApiInfo = () => {
  fetch('https://anime-facts-rest-api.herokuapp.com/api/v1')
  .then(resp => resp.json())
  .then((data) => data.data.forEach(titles => renderAllAnime(titles)))
  //anime.forEach(titles => renderAllAnime(titles)))
}

const renderAllAnime = (titles) => {
  const animeSelection = document.getElementById('myDropdown')

  const animeCard = document.createElement('a')
  animeCard.classList = "anime_names"
  animeCard.setAttribute('href', '#')
  animeCard.innerHTML = titles.anime_name


  animeSelection.append(animeCard)

  animeCard.addEventListener('click', (e) => {
   createAnimeInfo()
  })
}

const createAnimeInfo = () => {
  
}

const dropDownButton = () => {
  document.getElementById("myDropdown").classList.toggle("show");
}

this.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}