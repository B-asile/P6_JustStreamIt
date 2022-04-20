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

function Movies () {
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

Movies()

function bestMovie() {
    fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
        .then(response => {
            if(response.ok){
                response.json().then(data => {
                    const imgBestMovie = document.getElementsByClassName("imgBestMovie");
                    console.log(imgBestMovie)
                    let addImg = document.createElement("img");
                    console.log(data)
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
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(data) {
            const imgTopRatedFilms = document.getElementById("topRatedFilms");
                data.results.forEach(elt => {
                    let addImg = document.createElement("img");
                    addImg.src = elt.image_url
                    imgTopRatedFilms.append(addImg)
                })
        })
        .catch(function(err) {
            console.error('retour serveur : ', response.status)
        })
}
TopRatedFilms()

function ActionCategory() {
    fetch('http://localhost:8000/api/v1/titles/?genre=Action&genre_contains=&sort_by=-imdb_score')
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(data) {
            const imgActionCategory = document.getElementById("ActionCategory");
                data.results.forEach(elt => {
                    let addImg = document.createElement("img");
                    addImg.src = elt.image_url
                    imgActionCategory.append(addImg)
                })
        })
        .catch(function(err) {
            console.error('retour serveur : ', response.status)
        })
}
ActionCategory()

function ComedyCategory() {
    fetch('http://localhost:8000/api/v1/titles/?genre=Comedy&genre_contains=&sort_by=-imdb_score')
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(data) {
            const imgComedyCategory = document.getElementById("ComedyCategory");
            data.results.forEach(elt => {
                let addImg = document.createElement("img");
                addImg.src = elt.image_url
                imgComedyCategory.append(addImg)
            })
        })
        .catch(function(err) {
            console.error('retour serveur : ', response.status)
        })
}
ComedyCategory()

function Sci_FiCategory() {
    fetch('http://localhost:8000/api/v1/titles/?genre=Sci-Fi&genre_contains=&sort_by=-imdb_score')
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(data) {
            const imgSci_FiCategory = document.getElementById("SF_Category");
            data.results.forEach(elt => {
                let addImg = document.createElement("img");
                addImg.src = elt.image_url
                showinfos(addImg, elt)
                console.log("rte")
                imgSci_FiCategory.append(addImg)
            })
            //fetch avec base url + idFilm
            //data.results.forEach(id => {
                //getMovieId = id.id
                //getMovieInfos = showinfos('http://localhost:8000/api/v1/titles').join(${data.results.id});
            //})
        })
        .catch(function(err) {
            console.error('retour serveur : ', response.status)
        })
}
Sci_FiCategory()

function showinfos(selectedImg, data) {
    const modal = document.getElementById("myModal");
    console.log("ui")
    console.log(selectedImg)
    //selectedImg.addEventListener("click", function(event) {
    selectedImg.onclick = function(){
        //event.preventDefault()
        modal.style.display = "block"
        /*modal.innerHTML = `<h2 style="text-align: center">${data.title}</h2>
                           <p><strong>Genre: </strong>${data.gender}</p>
                           <p><strong>Date de sortie: </strong>${data.date_published}</p>
                           <p><strong>Note utilisateurs: </strong>${data.imdb_score}</p>
                           <p><strong>Réalisateur: </strong>${data.writers}</p>
                           <p><strong>acteurs: </strong>${data.actors}</p>
                           <p><strong>synopsis: </strong>${data.actors}</p>`*/
        modal.innerHTML = "bonjour"
    }
    let span = document.getElementsByClassName("close")[0];
    span.oneClick = function() {
            modal.style.display = "none"
        }
    console.log("ER")
}


//const mainUrlMovies ('http://localhost:8000/api/v1/titles')

/*
var pointerX = -1;
var pointerY = -1;
document.onmousemove = function(event) {
	pointerX = event.pageX;
	pointerY = event.pageY;
}
setInterval(pointerCheck, 1000);
function pointerCheck() {
	console.log('Cursor at: '+pointerX+', '+pointerY);
}
*/

/*
function mouseShowTitle() {
    const moviesTitle = document.getElementsByTagName("img");
    data.results.forEach(elt => {
        ("img").moviesTitle.mousemove(function (event) {
            let addTitle = document.createElement("title")
        });
    })
}
*/
/*function Top_Rated_Films () {
    const newElt = document.createElement("div");
    let elt = document.getElementById("carousel1");

    elt.appendChild(newElt);
    console.log(newElt);

    let addInDiv = document.createElement("img");
    addInDiv.setAttribute("src", "https://m.media-amazon.com/images/M/MV5BNjA5Y2ZhYzctNDc1Yy00OGViLWI3NGUtOTYwZmE3NDFiYmIxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UY268_CR72,0,182,268_AL_.jpg");
    newElt.append(addInDiv);
    console.log(addInDiv);
}
Top_Rated_Films()*/



/*function SfCategory (url) {
    let SfCategory = document.getElementsByClassName('Sci_Fi_element')
    console.log(SfCategory[0])
    console.log(SfCategory[1])

    //créer bloque image
    let createImg = document.createElement("img")
    console.log(createImg)
    createImg.setAttribute("src", url)
    console.log(createImg)
    SfCategory[0].append(createImg)
}

SfCategory ("https://m.media-amazon.com/images/M/MV5BNTY4ZDk5MzYtNjk2Zi00ZWY3LTgwZjUtNDc5MWEzMWFlOTQzXkEyXkFqcGdeQXVyNjU1MTEwMjI@._V1_UY268_CR1,0,182,268_AL_.jpg")

//récup les infos API depuis URL en paramètre
function SF_movie (url)  {
    let SF_movie = document.getElementsByClassName('Sci_Fi_element', 'Element1')
    console.log(SF_movie[0])
    let getMovie = document.createElement("url")
    getMovie.setAttribute("url", "http://localhost:8000/api/v1/titles/574" )
    console.log(getMovie)
    SF_movie[0].append(getMovie)
}
SF_movie("http://localhost:8000/api/v1/titles/574")

//créer virtuellement le html pour afficher un film, +renvoie avec return
function createHTMLMovie () {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class","Sci_Fi_element");
    console.log(newDiv.outerHTML)
    let addNewDiv = document.getElementsByClassName("carousel__panorama");
    console.log(addNewDiv)
    addNewDiv[0].appendChild(newDiv);
}
createHTMLMovie ()

// reçoit un element

function addInHTML () {
    let addInHTML = document.getElementsByClassName('Sci_Fi_element')
    console.log(addInHTML)
    let createImg5 = document.createElement("img");
    createImg5.setAttribute("src", "https://m.media-amazon.com/images/M/MV5BNjU1NDMyNGEtODJkYy00M2Y4LTk5YzItYTYxMzkzZWI1MmJiXkEyXkFqcGdeQXVyMzI5NDcxNzI@._V1_UY268_CR5,0,182,268_AL_.jpg");
    addInHTML[4].appendChild(createImg5);*/

    //let addInHTML = document.getElementsByClassName("carousel__panorama");
    //let createImg5 = document.createElement("img");
    //createImg5.setAttribute("src", "https://m.media-amazon.com/images/M/MV5BNjU1NDMyNGEtODJkYy00M2Y4LTk5YzItYTYxMzkzZWI1MmJiXkEyXkFqcGdeQXVyMzI5NDcxNzI@._V1_UY268_CR5,0,182,268_AL_.jpg");
    //addInHTML[5].append(createImg5)
