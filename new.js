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

const getOcMovies = async function () {
    try {
        let response = await fetch('http://localhost:8000/api/v1/titles')
        if (response.ok) {
            let data = await response.json()
            console.log(data)
        } else {
            console.error('Retour serveur : ', response.status)
        }
    } catch (e) {
        console.log(e)
    }
}

getOcMovies()

function TopRatedFilms() {
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            console.log(value);
        })
        .catch(function(err) {
            console.error('retour serveur : ', response.status)
        })
}
TopRatedFilms()

function ActionCategory() {
    fetch('http://localhost:8000/api/v1/titles/?name=&_contains=Action&genre_contains')
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            console.log(value)
        })
        .catch(function(err) {
            console.error('retour serveur : ', response.status)
        })
}
ActionCategory()

function ComedyCategory() {
    fetch('http://localhost:8000/api/v1/titles/?name=&name_contains=Comedy&genre_contains')
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            console.log(value);
        })
        .catch(function(err) {
            console.error('retour serveur : ', response.status)
        })
}
ComedyCategory()

function Sci_FiCategory() {
    fetch('http://localhost:8000/api/v1/titles/?name=&name_contains=Sci-Fi&genre_contains')
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            console.log(value);
        })
        .catch(function(err) {
            console.error('retour serveur : ', response.status)
        })
}
Sci_FiCategory()


/*function Top_Rated_Films () {
    let Top_Rated_Films = document.querySelector("#TopRatedFilms div")
    console.log(Top_Rated_Films)
    let createImg = document.createElement("img")
    createImg.setAttribute('src', "https://m.media-amazon.com/images/M/MV5BNDEyYTA5OWEtYjNiYS00MGZlLThjYzEtMTc1Zjk2NDRmZmYxXkEyXkFqcGdeQXVyNzIwNTQyMw@@._V1_UY268_CR1,0,182,268_AL_.jpg")
    console.log(createImg)
    Top_Rated_Films[0].append(createImg)
}
Top_Rated_Films()*/


function SFcategory () {
    let SFcategory = document.getElementsByClassName('Sci_Fi_element')
    console.log(SFcategory[0])

    //créer bloque image
    let createImg = document.createElement("img")
    console.log(createImg)
    createImg.setAttribute("src", "https://m.media-amazon.com/images/M/MV5BNTY4ZDk5MzYtNjk2Zi00ZWY3LTgwZjUtNDc5MWEzMWFlOTQzXkEyXkFqcGdeQXVyNjU1MTEwMjI@._V1_UY268_CR1,0,182,268_AL_.jpg")
    console.log(createImg)
    SFcategory[0].append(createImg)
}

SFcategory ()

//récup les infos API depuis URL en paramètre
function SF_movie (url)  {
    let SF_movie = document.getElementsByClassName('SF_element')
    console.log(SF_movie[0])
    let getMovie = document.createElement("url")
    getMovie.setAttribute("url", "http://localhost:8000/api/v1/titles/574")
    console.log(getMovie)
    SF_movie[0].append(getMovie)
}
SF_movie()

//créer virtuellement le html pour afficher un film, +renvoie avec return
function createHTMLMovie (movie) {
    let newDiv = document.createElement("div", "carousel__panorama");
    console.log(newDiv)
    newDiv.setAttribute("Sci_Fi_element", "Element6");
    return newDiv
}
createHTMLMovie ()

// reçoit un element
function addInHTML () {

}