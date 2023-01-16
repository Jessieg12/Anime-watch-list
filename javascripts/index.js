document.addEventListener('DOMContentLoaded', ()=>{
  mouseover()

  const animeUrl = 'http://localhost:3000/anime'
  const addAnimeInfo = document.querySelector('.add_anime_info')
  const animeSelection = document.getElementById('myDropdown')
  const containerAppear = document.querySelector('#anime_info_container')
  const addImageContainer = document.querySelector('h2')
  const reviewSubmit = document.querySelector('.review_info')
  const addAnimeForm = document.querySelector('h3')
  const reviews = document.getElementById('reviews')
  const addComment = document.querySelector('.add_comment')
  const counter = document.querySelector('#counter')

  fetch(animeUrl)
  .then(resp => resp.json())
  .then((anime) => anime.forEach(titles => renderAllAnime(titles)))

const renderAllAnime = (titles) => {
  const animeCard = document.createElement('a')
  animeCard.classList = "anime_names"
  animeCard.innerHTML = titles.anime_name
  animeCard.style.cursor = 'pointer'
  animeCard.id = titles.id

  animeSelection.append(animeCard)

  animeCard.addEventListener('click', (e) => {
    fetchTargetAnime(e)
    // fetchTargetComment(e)
  })

const fetchTargetAnime = (e) => {
fetch(`http://localhost:3000/anime/${e.target.id}`)
.then(resp => resp.json())
.then(anime => addContainer(anime))
}

// const fetchTargetComment = (e) => {
//   fetch(`http://localhost:3000/anime/${e.target.id}`)
//   .then(resp => resp.json())
//   .then(anime => comment(anime))
//   }

const addContainer = (anime) => {
  console.log(anime)

  reviews.innerText = `${anime.comment}`

  containerAppear.classList.remove('hidden')

  addImageContainer.innerHTML= ''

  const animeNameCard = document.createElement('p')
  animeNameCard.className = 'anime_Name_Card'
  animeNameCard.innerText = anime.anime_name

  const animeImageCard = document.createElement('img')
  animeImageCard.className = 'anime_image'
  animeImageCard.src = anime.anime_img

  addImageContainer.append(animeNameCard, animeImageCard)

  addAnimeForm.innerHTML= ''

  const animeForm = document.createElement('div')
  animeForm.className= 'form_container'
  animeForm.innerText = `Tell me about your experience this time around watching ${anime.anime_name}!`

  const animeComment = document.createElement('h4')
  animeComment.className = 'comment_section'
  animeComment.innerText = 'Enter a user name and type your experience below!'

  addComment.id = anime.id

  addAnimeForm.append(animeForm, animeComment)

    const watchCounter = document.createElement('p')
    watchCounter.innerHTML = `${anime.anime_name} has been watched ${anime.times_watched} time(s)!`

    const watchbtn = document.createElement('button')
    watchbtn.id = titles.id
    watchbtn.innerText = '+1 to times watched'

    watchbtn.addEventListener('click', (e)=> {
    fetch(`http://localhost:3000/anime/${e.target.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        times_watched: parseInt(`${anime.times_watched}`[0],10)+1
      })
    })
    .then((resp) => resp.json())
    .then(newWatch => {
      watchCounter.innerHTML = `${anime.anime_name} has been watched ${newWatch.times_watched} time(s)!`
    })
  })

    counter.innerHTML=''
    
    counter.append(watchCounter, watchbtn)

  addComment.id = anime.id
  reviewSubmit.addEventListener('submit', (e) => {
  e.preventDefault()
  const userName = e.target.user.value
  const animeReview = e.target.comment.value
  reviewSubmit.reset()

  fetch(`http://localhost:3000/anime/${anime.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment: `${userName} left a review for ${anime.anime_name}: ${animeReview}`
    })
  })
  .then(resp => resp.json())
  .then(alert("Review Added!"))
  })

  // reviewSubmit.addEventListener('submit', (e) => {
  //   addAnimeReview(e)
  //   reviewSubmit.reset()
  // })


  // const addAnimeReview = (e) => {
  //   e.preventDefault()
  //   console.log(e)
  //   const userName = e.target.user.value
  //   const animeReview = e.target.comment.value
  //   const createReviewList = document.createElement('li')
  //   createReviewList.innerText = `${userName} left a review for ${anime.anime_name}: ${animeReview}`

  //   reviews.append(createReviewList)

  // }
  }

  // reviewSubmit.addEventListener('submit', (e) => {
  //   addAnimeReview(e)
  //   reviewSubmit.reset()
  // })


const createAnimeForm = (anime) => {
    // addAnimeForm.innerHTML= ''

    // const animeForm = document.createElement('div')
    // animeForm.className= 'form_container'
    // animeForm.innerText = `Tell me about your experience this time around watching ${anime.anime_name}!`

    // const animeComment = document.createElement('h4')
    // animeComment.className = 'comment_section'
    // animeComment.innerText = 'Enter a user name and type your experience below!'

    // addComment.id = anime.id

    // addAnimeForm.append(animeForm, animeComment)

  }}

  const watchedCounter = () =>{
    
  }

  addAnimeInfo.addEventListener('submit', (e) => {
    newAnime(e)
    setTimeout(() => {
      alert('Thank you for using my app!')}, 2500)
  })

  const newAnime = (e) => {
    e.preventDefault()
    const newAnimeName = e.target.name.value
    const newAnimeImage = e.target.image.value
    addAnimeInfo.reset()
    fetch(animeUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        anime_name: newAnimeName,
        anime_img: newAnimeImage,
        times_watched: 0,
        comment: ""
      })
    })
    .then(resp => resp.json())
    .then(title => renderAllAnime(title), alert("Title Added!"))
  }
})

const mouseover = () => {
  const addButton = document.querySelector('#add_button')
    addButton.addEventListener('mouseover', (e) =>{
      addButton.style.cursor = 'pointer'
      addButton.value = 'CLICK ME!'
      audioPlay(e)
    })
  }

  const audioPlay = (e) => {
    const audio = new Audio ('./audiofile/single-ora.mp3')
    audio.play(e)
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



















  
    // const watchCounter = document.createElement('p')
    // watchCounter.innerHTML = `${titles.anime_name} has been watched ${titles.times_watched} time(s)!`

    // const watchbtn = document.createElement('button')
    // watchbtn.id = titles.id
    // watchbtn.innerText = '+1 to times watched'

    // watchbtn.addEventListener('click', (e)=> {
    // fetch(`http://localhost:3000/anime/${e.target.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     times_watched: parseInt(`${titles.times_watched}`[0],10)+1
    //   })
    // })
    // .then((resp) => resp.json())
    // .then(newWatch => {
    //   watchCounter.innerHTML = `${titles.anime_name} has been watched ${newWatch.times_watched} time(s)!`
  //   })
  // })

  //   counter.innerHTML=''
    
  //   counter.append(watchCounter, watchbtn)
  
  

  // const addAnimeReview = document.querySelector('.review')
  // const animeID = `http://localhost:3000/anime/${titles.id}`

  // addAnimeReview.addEventListener('submit', (e) => {
  // console.log("what is happening")
  // e.preventDefault()
  // const userName = e.target.user.value
  // const animeReview = e.target.comment.value
  // addAnimeReview.reset()

  // fetch(animeID, {
  //   method: "PATCH",
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     comments: ``
  //   })
  // })
  // .then(resp => resp.json())
  // .then(alert("Review Added!"))
  // })


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