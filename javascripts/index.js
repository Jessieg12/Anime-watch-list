document.addEventListener('DOMContentLoaded', ()=>{
  mouseover()

  const animeUrl = 'http://localhost:3000/anime'
  const addAnimeInfo = document.querySelector('.add_anime_info')
  const animeSelection = document.getElementById('myDropdown')
  const containerAppear = document.querySelector('#anime_info_container')
  const animeNameCard = document.querySelector('.anime_name_card')
  const reviewSubmit = document.querySelector('.review_info')
  const animeImageCard = document.querySelector('.anime_image')
  const animeForm = document.querySelector('.form_container')
  const animeComment = document.querySelector('.comment_section')
  const reviews = document.getElementById('reviews')
  const watchTitle = document.getElementById("anime_title")
  const watchCounter = document.getElementById('watch_counter')
  const watchbtn = document.querySelector('.add_one')
  const addComment = document.querySelector('.add_comment')

  fetch(animeUrl)
  .then(resp => resp.json())
  .then((anime) => anime.forEach(titles => renderAllAnime(titles)))

  const renderAllAnime = (animeObj) => {
    const animeCard = document.createElement('a')
    animeCard.classList = "anime_names"
    animeCard.innerHTML = animeObj.anime_name
    animeCard.style.cursor = 'pointer'
    animeCard.id = animeObj.id

    animeSelection.append(animeCard)

    animeCard.addEventListener('click', fetchTargetAnime)
  }

  const fetchTargetAnime = (e) => {
  fetch(`http://localhost:3000/anime/${e.target.id}`)
  .then(resp => resp.json())
  .then(anime => addContainer(anime))
  }

  const addContainer = (anime) => {
    containerAppear.classList.remove('hidden')
    reviews.innerText = `${anime.comment}`
    animeNameCard.innerHTML = anime.anime_name
    animeImageCard.src = anime.anime_img
    animeForm.innerHTML = `Tell us about your experience this time around watching ${anime.anime_name}!`
    animeComment.innerHTML = 'Enter a user name and type your experience below!'
    watchTitle.innerHTML = `${anime.anime_name} has been watched`
    watchCounter.innerHTML = `${anime.times_watched} time(s)!`
    watchbtn.id = anime.id
    reviewSubmit.id = anime.id
    addComment.id = anime.id
   }

  addAnimeInfo.addEventListener('submit', newAnime)
  
  watchbtn.addEventListener('click', (e) => { 
    increase(e)
  })

  reviewSubmit.addEventListener('submit', (e) => {
    addReview(e) 
  })

   function newAnime(e){
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
        comment: "No review yet! Sorry!"
      })
    })
    .then(resp => resp.json())
    .then(title => renderAllAnime(title), alert("Title Added!"))
    setTimeout(() => {
      alert('Thank you for using my app!')}, 1000)
  }

  const increase = (value) => {
    fetch(`http://localhost:3000/anime/${value.target.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        times_watched: parseInt(value.target.previousElementSibling.children[1].textContent.split(' ')[0], 10) +1
      })
    })
    .then((resp) => resp.json())
    .then(newWatch => {
      watchCounter.innerHTML = `${newWatch.times_watched} time(s)!`
    })
  }

  function addReview(e) {
    e.preventDefault()
    const userName = e.target.user.value
    const animeReview = e.target.comment.value
    reviewSubmit.reset()
    fetch(`http://localhost:3000/anime/${e.target.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment: `${userName} left a review: ${animeReview}`
    })
    })
    .then(resp => resp.json())
    .then(alert("Review Added!"))
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















// Might recycle this code for later use


  
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


  // reviewSubmit.addEventListener('submit', (e) => {
  //   addAnimeReview(e)
  //   reviewSubmit.reset()
  // })


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
  
// const createAnimeForm = (anime) => {
//   // addAnimeForm.innerHTML= ''

//   // const animeForm = document.createElement('div')
//   // animeForm.className= 'form_container'
//   // animeForm.innerText = `Tell me about your experience this time around watching ${anime.anime_name}!`

//   // const animeComment = document.createElement('h4')
//   // animeComment.className = 'comment_section'
//   // animeComment.innerText = 'Enter a user name and type your experience below!'

//   // addComment.id = anime.id

//   // addAnimeForm.append(animeForm, animeComment)

// }


// const watchedCounter = () =>{
    
// }