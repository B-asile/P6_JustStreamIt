

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
            data.results.forEach(eltsImg => {
                let addImg = document.createElement("img");
                addImg.src = eltsImg.image_url
                showInfos(addImg, eltsImg)
                carrousel(addImg, eltsImg, container)
                imgSci_FiCategory.append(addImg)
            })
        })
        .catch(function(err) {
            console.error('retour serveur : ', response.status)
        })
}
Sci_FiCategory()

function showInfos(addImg, eltsImg) {
    const modal = document.getElementById("myModal");
    console.log(addImg)
    addImg.onclick = function(){
        modal.style.display = "block"
        modal.innerHTML = `<h2 style="text-align: center">${eltsImg.title}</h2>
                           <p><strong>Genre: </strong>${eltsImg.gender}</p>
                           <p><strong>Date de sortie: </strong>${eltsImg.date_published}</p>
                           <p><strong>Note utilisateurs: </strong>${eltsImg.imdb_score}</p>
                           <p><strong>Réalisateur: </strong>${eltsImg.writers}</p>
                           <p><strong>acteurs: </strong>${eltsImg.actors}</p>
                           <p><strong>synopsis: </strong>${eltsImg.actors}</p>`
    }
    let span = document.getElementsByClassName("close")[0];
    span.oneClick = function() {
            modal.style.display = "none"
        }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    console.log("ER")
}

function carrousel(container) {
    const slider = container.querySelector(".slider");
    const items = slider.querySelectorAll("img")
}
carrousel(document.querySelectorAll(".container"));

const sliderVisibleWidth = slider.offsetWidth;
const totalItemsWidth = getTotalItemsWidth(items);
const maxXOffset = 0;
const minXOffset = - (totalItemsWidth - sliderVisibleWidth);
const sliderRenderer = css(slider);
// create "value" pour suivre le décalage de x de notre curseur et
// mettre à jour la translateX propriété du curseur lorsqu'il change :
const sliderX = value(0, (x) => sliderRenderer.set("x", x))
sliderX.set(-100);

///////MESURER LE CARROUSEL///////
function getTotalItemsWidth(items) {
    const { left } = items[0].getBoundingClientRect();
    const { right } = items[items.length - 1].getBoundingClientRect();
    return right - left;
}
/*
function showTitle (addImg) {
    var pointerX = -1;
    var pointerY = -1;
    document.onmousemove = function(event) {
        pointerX = event.pageX;
        pointerY = event.pageY;
    }
    setInterval(pointerCheck, 1000);
    function pointerCheck() {
        console.log('Cursor at: '+pointerX+', '+pointerY);
    addImg.addEventListener("mouseenter", ()
    => {cursor.addImg.
    })
    }
}
*/

// .style.filter = opacity

