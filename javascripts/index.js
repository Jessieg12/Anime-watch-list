document.addEventListener('DOMContentLoaded', ()=>{
dropDownButton()
getApiInfo()
animeAdder()
mouseover()
// animereviewer()
})

const animeUrl = 'http://localhost:3000/anime'

const getApiInfo = () => {
  fetch(animeUrl)
  .then(resp => resp.json())
  .then((anime) => anime.forEach(titles => renderAllAnime(titles)))
}

const renderAllAnime = (titles) => {
  const animeSelection = document.getElementById('myDropdown')

  const animeCard = document.createElement('a')
  animeCard.classList = "anime_names"
  animeCard.setAttribute('href', '#')
  animeCard.innerHTML = titles.anime_name
  

  animeSelection.append(animeCard)

  animeCard.addEventListener('click', (e) => {
   addImage()
   createAnimeForm()
  })

  const addImage = () => {
    const containerAppear = document.querySelector('#anime_info_container')
    containerAppear.classList.remove('hidden')

    const addImageContainer = document.querySelector('h2')
    addImageContainer.innerHTML= ''

    const animeNameCard = document.createElement('p')
    animeNameCard.className = 'anime_NameCard'
    animeNameCard.innerText = titles.anime_name

    const animeImageCard = document.createElement('img')
    animeImageCard.className = 'anime_image'
    animeImageCard.src = titles.anime_img

    addImageContainer.append(animeNameCard, animeImageCard)
  }

  const createAnimeForm = () => {
    const addAnimeForm = document.querySelector('h3')
    addAnimeForm.innerHTML= ''

    const animeForm = document.createElement('div')
    animeForm.className= 'form_container'
    animeForm.innerText = `Tell me about your experience this time around reading/watching ${titles.anime_name}!`

    const animeComment = document.createElement('h4')
    animeComment.className = 'comment_section'
    animeComment.innerText = 'Enter a user name and type your experience below!'

    
    const watchReadCounter = document.createElement('p')
    watchReadCounter.innerText = `${titles.anime_name} has been watched ${titles.times_watched} times and read ${titles.times_read} times!`

    const counter = document.querySelector('#counter')
    counter.innerHTML=''
    
    counter.append(watchReadCounter)

    addAnimeForm.append(animeForm, animeComment)

    
    const addAnimeReview = document.querySelector('.review')
    const animeID = `http://localhost:3000/anime/${titles.id}`

    addAnimeReview.addEventListener('submit', (e) => {
    e.preventDefault()
    const userName = e.target.fullName.value
    const animeReview = e.target.comment.value
    
  
    fetch(animeID, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comments: `Most recent review for ${titles.anime_name}: ${userName} said on... ${animeReview}`
      })
    })
    .then(resp => resp.json())
    .then(title => renderAllAnime(title), alert("Review Added!"))
  })
  }

}

const animeAdder = () => {
  const addAnimeInfo = document.querySelector('.add_anime_info')

  addAnimeInfo.addEventListener('submit', (e) => {
    e.preventDefault()
    const newAnimeName = e.target.name.value
    const newAnimeImage = e.target.image.value
  
    fetch(animeUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        anime_name: newAnimeName,
        anime_img: newAnimeImage,
        times_watched: 0,
        times_read: 0
      })
    })
    .then(resp => resp.json())
    .then(title => renderAllAnime(title), alert("Title Added!"))
  })
}

// const animereviewer = () => {
//   const addAnimeReview = document.querySelector('.review')

//   addAnimeReview.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const userName = e.target.fullName.value
//     const animeReview = e.target.comment.value
//     // const date = new date(year, month, hours, minutes)
  
//     fetch(animeUrl, {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         comments: `Review for ${titles.anime_name}: ${userName} said on... ${animeReview}`
//       })
//     })
//     .then(resp => resp.json())
//     .then(title => renderAllAnime(title), alert("Review Added!"))
//   })
// }

const mouseover = () => {
const addButton = document.querySelector('#add_button')
const audio = new Audio ('./audiofile/single-ora.mp3')
  addButton.addEventListener('mouseover', (e) =>{
    addButton.style.cursor = 'pointer'
    addButton.value = 'CLICK ME!'
    audio.play()
  })
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