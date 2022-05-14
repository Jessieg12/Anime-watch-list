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
   addImage()
  })

  const createAnimeInfo = () => {
    fetch(`https://anime-facts-rest-api.herokuapp.com/api/v1/${titles.anime_name}`)
    .then(resp => resp.json())
    .then(data => renderRandomFacts(data))
  }

  const addImage = () => {
    const addImageContainer = document.querySelector('h3')
    addImageContainer.innerHTML= ''

    const animeNameCard = document.createElement('p')
    animeNameCard.innerText = titles.anime_name

    const animeImageCard = document.createElement('img')
    animeImageCard.src = titles.anime_img

    addImageContainer.append(animeNameCard, animeImageCard)
  }

  const renderRandomFacts = (randomFact) => {
    const addRFB = document.querySelector('h4')
  
    const createRFB = document.createElement('button')
    createRFB.innerText = `Random Anime Fact`
    
    createRFB.addEventListener('click', (e) => {
      const randomAF = document.createElement('p')
      randomAF.innerHTML = randomFact.data
  
      console.log(randomFact.data)
      
      addRFB.append(randomAF)
    })
  
    addRFB.append(createRFB)
  }

}

// const renderRandomFacts = (randomFact) => {
//   const addRFB = document.querySelector('h4')

//   const createRFB = document.createElement('button')
//   createRFB.innerText = `Random Anime Fact`
  
//   createRFB.addEventListener('click', (e) => {
//     const randomAF = document.createElement('p')
//     randomAF.innerHTML = randomFact.data

//     console.log(randomFact.data)
    
//     addRFB.append(randomAF)
//   })

//   addRFB.append(createRFB)
// }


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

