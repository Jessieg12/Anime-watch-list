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

  const animeName = document.createElement('h2')
  animeName.innerText = titles.anime_name

  const animeselection = document.querySelector('h3')
  animeselection.append(animeName)
}

const dropDownButton = () => {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}