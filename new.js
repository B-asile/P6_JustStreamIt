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
/*
var get = function (url, success, error) {
        var xhr = new window.XMLHttpRequest()

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                success(xhr.responseText)
            }else{
                error(xhr)
            }
        }
        xhr.open('GET', url, true)
        xhr.send()

}
get('http://localhost:8000/api/v1/genre/', function(response){
    console.log(response)
    console.log("ok")
}, function(error){
    console.log(error)
})
console.log("ok")*/

const getOcMovies = async function () {
    try {
        let response = await fetch('http://localhost:8000/api/v1/titles/')
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

