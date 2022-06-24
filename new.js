

// récupérer les données des films depuis l'API http://localhost:8000/api/v1/ à l'aide dr requ^êtes Ajax
// les afficher sur une interface web
//la mise à jour des données doit se faire automatiquement
// to do try-catch
/*L’interface doit comprendre les zones suivantes :
“Meilleur film” : Cette zone affiche la photo du film qui a la meilleure note Imdb toutes catégories confondues, ainsi que son titre, un bouton et le résumé du film sous le bouton.
“Films les mieux notés” : Cette zone affiche les 7 autres films les mieux notés toutes catégories confondues. On pourra les faire défiler avec une flèche à gauche et à droite comme sur la maquette pour tous les parcourir.
“Catégorie 1” : Montre les 7 films les mieux notés d’une catégorie donnée.
“Catégorie 2” : Montre les 7 films les mieux notés d’une autre catégorie.
“Catégorie 3” : Idem sur une autre catégorie !*/
/*Lorsqu’on clique sur le bouton du film en vedette ou sur l’image d’un des films une fenêtre modale s’ouvre. Dans cette fenêtre les informations suivantes doivent être présente :
L’image de la pochette du film
Le Titre du film
Le genre complet du film
Sa date de sortie
Son Rated
Son score Imdb
Son réalisateur
La liste des acteurs
Sa durée
Le pays d’origine
Le résultat au Box Office
Le résumé du film*/

const baseUrl = "http://localhost:8000/api/v1/titles/"

function bestMovie() {
    fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
        .then(response => {
            if(response.ok){
                response.json().then(data => {
                    const imgBestMovie = document.getElementsByClassName("imgBestMovie");
                    let addImg = document.createElement("img");
                    addImg.src = data.results[0].image_url
                    imgBestMovie[0].append(addImg);
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
}

function carouselAnimation(htmlCategory, sevenMovies, ButtonsCategory) {
    movies = []
    slideVisible = 5;
    slideToScroll = 1;
    currentItem = 0;
    sevenMovies.forEach(movie => addMoviesInCarousel(movie, htmlCategory, ButtonsCategory))
    let carousel = document.getElementById(htmlCategory);
    let carouselButtons = document.getElementById(ButtonsCategory);
    movies = [].slice.call(carousel.children)
    let ratio = this.movies.length / slideVisible;
    carousel.style.width = (ratio * 100) + "%";
    movies.forEach(movie => {
        movie.style.width = (100 / slideVisible) + "%"
    })
    console.log(carouselButtons)

/*    let nextButton = carouselButtons.getElementsByClassName( 'next');
    let prevButton = carouselButtons.getElementsByClassName( 'prev');
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);*/

    function nextSlide() {
        goToNextSlide(currentItem + 1)
    }
    function prevSlide() {
        goToNextSlide(currentItem - 1)
    }
    function goToNextSlide(index)  {
        if (index < 0) {
            index = movies.length - slideVisible; //To end
        }
        else if (index >= movies.length || ((movies[currentItem + slideVisible] === undefined) && index > currentItem)) {
            index = 0; // beginning
        }
        let translateX = index * -100 / movies.length;
        carousel.style.transform = 'translate3d(' + translateX + '%, 0, 0)';
        currentItem = index;
    }
    console.log(movies)
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

/*function showInfos(addImg, movieData) {
    let myModal = document.getElementById("myModal")
    let modal = document.getElementById("modal_content");
    console.log(addImg)
    addImg.onclick = function(){
        myModal.style.display = "block"
        modal.innerHTML = `<h2 style="text-align: center">${movieData.title}</h2>
                           <img><img src="${movieData.image_url}"</img>
                           <p><strong>Genre: </strong>${movieData.gender}</p>
                           <p><strong>Date de sortie: </strong>${movieData.date_published}</p>
                           <p><strong>Note utilisateurs: </strong>${movieData.imdb_score}</p>
                           <p><strong>Réalisateur: </strong>${movieData.writers}</p>
                           <p><strong>acteurs: </strong>${movieData.actors}</p>
                           <p><strong>synopsis: </strong>${movieData.actors}</p>`
    }
    let span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
            myModal.style.display = "none"
        }
    window.onclick = function(event) {
        if (event.target == modal) {
            myModal.style.display = "none";
        }
    }
}*/
