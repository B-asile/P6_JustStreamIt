

const baseUrl = "http://localhost:8000/api/v1/titles/"

async function createModal(movieId) {
    fetch(baseUrl + movieId)
        .then(response => response.json())
        .then(data => {
            let myModal = document.getElementById("myModal");
            myModal.style.display = "block"
            document.getElementById('modal_content').innerHTML = ` 
                <h1 style="text-align: center">${data.title}</h1>
                <img><img src="${data.image_url}"</img>                             
                <p><strong>Genre: </strong>${data.genres}
                <strong>  /  Durée: </strong>${data.duration}<strong>min</strong></p>
                <p><strong>Date de sortie: </strong>${data.date_published}</p>
                <p><strong>Note utilisateurs: </strong>${data.imdb_score}</p>
                <p><strong>Rated: </strong>${data.rated}</p>
                <p><strong>Réalisateur: </strong>${data.directors}</p>
                <p><strong>Pays d'origine: </strong>${data.countries}</p>
                <p><strong>acteurs: </strong>${data.actors}</p>
                <p><strong>synopsis: </strong>${data.long_description}</p>`
            let closed = document.getElementsByClassName("close")[0];
            closed.onclick = () => myModal.style.display = "none"
            window.onclick = function(event) {
                if (event.target !== myModal) {
                    myModal.style.display = "none";
                }
            }
        })
}

function bestMovie() {
    fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
        .then(response => {
            if(response.ok){
                response.json().then(data => {
                    let imgBestMovie = document.getElementById("movie");
                    let addPicture = document.createElement("img");
                    addPicture.src = data.results[0].image_url
                    movieId = data.results[0].id
                    imgBestMovie.append(addPicture);
                    addPicture.onclick = () => createModal(data.results[0].id)
                    document.getElementById('infos').innerHTML = `
                        <p style="text-align: center; font-size: xx-large"><strong>${data.results[0].title}</strong></p>
                        <p style="text-align: center"><strong>Genre: </strong><strong>${data.results[0].genres}</strong></p>
                        <p style="text-align: center"><strong>Auteur: </strong><strong>${data.results[0].writers}</strong></p>
                        <p style="text-align: center"><strong>Note: </strong><strong>${data.results[0].imdb_score}</strong></p>`;
                })
            }else {
                console.log("erreur");
            }
        })
}
bestMovie()

function createCategory(htmlCategory, urlCategory, ButtonsCategory) {
    let sevenMovies = createCarousel(htmlCategory, urlCategory);
    sevenMovies.then(movies => {
        carouselAnimation(htmlCategory, movies, ButtonsCategory)
    })
}
createCategory("topRatedFilms", "", "buttons_topRatedFilms")
createCategory("ActionCategory", "Action", "buttons_ActionCategory")
createCategory("ComedyCategory", "Comedy", "buttons_ComedyCategory")
createCategory("SF_Category", "Sci-Fi", "buttons_SF_Category")

function addMoviesInCarousel(movieData, htmlCategory) {
    let carouselContent = document.getElementById(htmlCategory);
    let addPicture = document.createElement("img");
    addPicture.src = movieData.image_url;
    carouselContent.append(addPicture);
    movieId = movieData.id;
    addPicture.onclick = () => createModal(movieData.id)
}

function carouselAnimation(htmlCategory, sevenMovies, ButtonsCategory) {
    slideVisible = 5;
    slideToScroll = 1;
    currentItem = 0;
    sevenMovies.forEach(movie => addMoviesInCarousel(movie, htmlCategory, ButtonsCategory))
    let carousel = document.getElementById(htmlCategory);
    let carouselButtons = document.getElementById(ButtonsCategory);
    movies = [].slice.call(carousel.children);
    let ratio = movies.length / slideVisible;
    carousel.style.width = (ratio * 100) + "%";
    movies.forEach(movie => {
        movie.style.width = (100 / slideVisible) + "%"
    })
    let buttons = [].slice.call(carouselButtons.children);
    let nextButton = buttons[1];
    let prevButton = buttons[0];
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    function nextSlide() {
        goToNextSlide(currentItem + 1)
    }
    function prevSlide() {
        goToNextSlide(currentItem - 1)
    }
    function goToNextSlide(index)  {
        if (index < 0) {
            index = movies.length - slideVisible; //To end
        } else if (index >= movies.length || movies[currentItem + slideVisible] === undefined) {
            index = 0
        }
        let translateX = index * -100 / slideVisible;
        carousel.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
        currentItem = index;
    }
}

async function createCarousel(htmlCategory, urlCategory) {
    let page = 1;
    let currentMovie = 0;
    let sevenMovies = [];
    do {
        let url = 'http://localhost:8000/api/v1/titles/?page=' + page + '&genre=' + urlCategory + '&genre_contains=&sort_by=-imdb_score'
        await fetch(url)
            .then(response => response.json())
            .then(movieData => {
                for (movie of movieData.results) {
                    if (currentMovie < 7) {
                        sevenMovies.push(movie);
                        currentMovie++;
                    } else break;
                }
            })
            .catch(error => console.log(error));
        page++;
    } while (currentMovie < 7);
    return sevenMovies
}

