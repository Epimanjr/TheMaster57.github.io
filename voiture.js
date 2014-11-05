/* Place la voiture au bon endroit dans la page */
$('#player').css("margin-left", "375px");
$('#player').css("margin-top", "650px");

// Ajout de l'événement pour déplacer la voiture rouge
$('body').keydown(function (e) {
	//Déplacement vers la gauche avec la fonction animate
    if (e.keyCode === 37) {
        // Si seulement ça reste dans la zone de jeu
        if (parseInt($('#player').css("margin-left")) > 25) {
            $('#player').animate({marginLeft: "-=50px"}, "Fast");
        }
    }

    // Déplacement vers la droite avec la fonction animate
    if (e.keyCode === 39) {
        // Si seulement ça reste dans la zone de jeu
        if (parseInt($('#player').css("margin-left")) < 725) {
            $('#player').animate({marginLeft: "+=50px"}, "Fast");
        }
    }
});

/* Variables globales nécessaires au bon fonctionnement du jeu */
nombrePoints = 0;		// Nombre de points
compteur = 0;			// Nombre de voitures bleues instanciées depuis le début du jeu
tabValeurs = new Array(25, 75, 125, 175, 225, 275, 325, 375, 425, 475, 525, 575, 625, 675, 725);	// Endroit où peut apparaître la voiture bleue

/* Création d'une voiture bleue (une toute les 2 secondes) */
timerCreation = setInterval(function insererVoitureBleu() {
	// Ajout de la voiture (au code html)
    $('#zonedejeu').append("<img src=\"images/blue-car.png\" alt=\"Voiture bleue\" class=\"bluecar\" id=\"voiture" + compteur + "\" />");
    // Position aléatoire (pour le code css)
    $('#voiture' + compteur).css("margin-left", tabValeurs[Math.floor(Math.random() * 15)]);
    // Incrémentation du compteur du nombre de voitures bleues
    compteur++;
}, 2000);

/* Déplacement des voitures bleues vers le bas */
timerDeplacement = setInterval(function () {
	// Parcours de toutes les voitures pour déplacement
    for (var i = 0; i <= compteur; i++) {
    	// Récupération de la bonne voiture
        var voiture = $('#voiture' + i);
        // Déplacement de 50 px vers le bas
        voiture.animate({marginTop: "+=25px"});
        // Test de collision
        var margin = parseInt(voiture.css("margin-top"));

        // Si la voiture bleue se trouve plus en bas de la voiture rouge
        if(margin >= 645) {
        	// Suppression de l'arbre DOM
            voiture.remove();
            // Incrémentation du nombre de points 
            nombrePoints++;
            // Affichage du nombre de points
            $('#ppoints').html("Compteur de point(s) : "+nombrePoints);
        }

        // Si la voiture bleue se trouve au même niveau que la voiture rouge
        if (margin >= 545) {
            // Si égal <-> Collision => Fin du jeu
            if(parseInt(voiture.css("margin-left")) === parseInt($('#player').css("margin-left"))) {
            	// Affichage du message GAME OVER + Disparition de toutes les voitures bleues
            	$('#zonedejeu').append("<h1 id=\"gameover\">GAME OVER</h1>");
            	removeAllVoitures();
            	clearInterval(timerCreation);
    			clearInterval(timerDeplacement);
            	break;
            }
        }
    }
}, 50);

/* Enlève toutes les voitures bleues à la fin du jeu */
function removeAllVoitures() {
	// Parcours de toutes les voitures pour suppression
    for (var i = 0; i <= compteur; i++) {
       $('#voiture' + i).remove();
    }
}

/* Pour la Question 2 de l'exercice 2 */
function recupererCodeClavier() {
    $('body').keydown(function (e) {
        console.log(e.keyCode);
    });
}