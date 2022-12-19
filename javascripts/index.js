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
  animeCard.innerHTML = titles.anime_name.replaceAll('_', ' ')
  

  animeSelection.append(animeCard)

  animeCard.addEventListener('click', (e) => {
   createAnimeInfo()
   addImage()
  //  createAnimeForm()
  })

  const createAnimeInfo = () => {
    fetch(`https://anime-facts-rest-api.herokuapp.com/api/v1/${titles.anime_name}`)
    .then(resp => resp.json())
    .then(data => renderAnimeFacts(data))
  }

  const addImage = () => {
    const containerAppear = document.querySelector('hidden')
    containerAppear.removeclass('hidden').addclass('visible')

    const addImageContainer = document.querySelector('h3')
    addImageContainer.innerHTML= ''

    const animeNameCard = document.createElement('p')
    animeNameCard.className = 'anime_NameCard'
    animeNameCard.innerText = titles.anime_name.replaceAll('_', ' ')

    const animeImageCard = document.createElement('img')
    animeImageCard.src = titles.anime_img

    addImageContainer.append(animeNameCard, animeImageCard)
  }

  // const createAnimeForm = () => {
  //   const addAnimeForm = document.querySelector(h4)
  //   addAnimeForm.innerHTML= ''

  //   const animeForm = document.createElement('div')
  //   animeForm.className= 'container'
    
  //   addAnimeForm.append(animeForm)
  // }

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



 // const renderAnimeFacts = (animeFacts) => {
  //   const addAFB = document.querySelector('h4')
    
  
  //   const createAFB = document.createElement('button')
  //   createAFB.Id = 'facts_button'
  //   createAFB.innerText = `Click for Anime Facts`
    
  //   createAFB.addEventListener('click', (e) => {
  //     const animeFact = document.createElement('p')
  //     animeFact.innerText = ""
  //     animeFact.Id = "fact_info"
      
  //     const infoJson = JSON.stringify(animeFacts.data)
  //     document.getElementsByClassName('fact_info').innerHTML = infoJson
      
  
  //     console.log(animeFacts.data)
      
  //     addAFB.append(animeFact, infoJson)
  //   })
  
  //   addAFB.append(createAFB)
  // }



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
