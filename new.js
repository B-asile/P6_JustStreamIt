

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

/*function Movies () {
    fetch("http://localhost:8000/api/v1/titles/?id")
        .then(response => {
            if(response.ok){
                response.json().then(data => {
                    moviesId = data.results.id
                    console.log(moviesId)
                })
            }else {
                console.log("erreur")
            }
        })
}

Movies()*/
const baseUrl = "http://localhost:8000/api/v1/titles/"
var TopRatedFilmsList = []
var ActionCategoryList = []
var ComedyCategoryList = []
var Sci_FiCategoryList = []

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

function TopRatedFilms() {
    let urlCategory = ""
    createCarousel("topRatedFilms", urlCategory)
}
TopRatedFilms()

function ActionCategory() {
    let urlCategory = "Action"
    createCarousel("ActionCategory", urlCategory)
}
ActionCategory()

function ComedyCategory() {
    let urlCategory = "Comedy"
    createCarousel("ComedyCategory", urlCategory)
}
ComedyCategory()

function Sci_FiCategory() {
    let urlCategory = "Sci-Fi"
    createCarousel("SF_Category", urlCategory)
}
Sci_FiCategory()

function addMoviesInCarousel(movieData, htmlCategory) {
    let carouselContent = document.getElementById(htmlCategory);
    //movieData.results.forEach(moviesPictures => {
    let addPicture = document.createElement("img");
    addPicture.src = movieData.image_url;
    carouselContent.append(addPicture);
   // })
}

function carouselAnimation(htmlCategory) {
    let items = document.getElementById(htmlCategory);
    let slideVisible = items.length;
    console.log(slideVisible)
    let slideToScroll = 1;
    let currentSlide = 0;
    let nextImg = document.querySelectorAll("next");
    let prevImg = document.querySelectorAll("prev");
    nextImg.onclick = currentSlide + slideToScroll;
    prevImg.onclick = currentSlide - slideToScroll;
}


async function createCarousel(htmlCategory, urlCategory) {
    let page = 1;
    let currentMovie = 0;
    do {
        await fetch('http://localhost:8000/api/v1/titles/?' + page + '&genre=' + urlCategory + '&genre_contains=&sort_by=-imdb_score')
            .then(response => response.json())
            .then(movieData => {
                for (movie of movieData.results) {
                    if (currentMovie < 7) {
                        addMoviesInCarousel(movie, htmlCategory);
                        console.log(movie)
                        currentMovie++;
                    } else break;
                }
            })
            .catch(error => console.log(error));
        page++;
    } while (currentMovie < 7)
} carouselAnimation(htmlCategory)

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
