// FONCTION DES CARROUSSELS ---- double boucles car array == small et async => peu d'encombrement callback queue
const carroussel = document.getElementsByClassName("carroussel");
let m;

const carrousselFonc = () => {
  for (let i = 0; i < carroussel.length; i++) {
    let arrow = carroussel[i].parentElement.getElementsByClassName("arrow"),
      carrousselChildren = carroussel[i].children,
      slide,
      temoin = null,
      next = null,
      prev = null,
      carrousselTitre = null,
      carrousselTitreP,
      titreActif;
      if(document.getElementsByClassName("titre-carroussel").length > 0){//Appliquer des variables supplémentaires si le carroussel dispose de titre de section
        carrousselTitre = carroussel[i].parentElement.getElementsByClassName("titre-carroussel");
        carrousselTitreP = carrousselTitre[0].children;
        carrousselTitreP[0].classList.add("actif");
        titreActif = 0;
      };
    carrousselChildren[0].classList.add("mouv");

    const ajustement = valeur => //fonction de correction des valaurs selon la taille du tableau carrousselChildren
    valeur < 0 ? (valeur = carrousselChildren.length - 1) : valeur >= carrousselChildren.length? (valeur = 0) : valeur;

    const actionCarroussel = (temoin, next, prev, slide) =>{ //fonction de modification du dom
      if(carrousselTitre){//Appliquer des actions supplémentaires si le carroussel dispose de titre de section
        carrousselTitreP[temoin].classList.remove("actif");
        carrousselTitreP[next].classList.add("actif");
        carrousselTitreP[prev].classList.remove("actif");
      }

      if(carrousselChildren.length > 3){
        for(let i=0; i<carrousselChildren.length; i++){
          if(i!=temoin && i!=next && i!=prev){
            let slide = i > next ? 1 : -1;
            carrousselChildren[i].style.transform = "translateX("+slide+"00%)";
            carrousselChildren[i].classList.add("douce_disparition");
          }
        }
      }
      carrousselChildren[temoin].style.transform = "translateX(" + slide + "00%)";
      carrousselChildren[temoin].classList.remove("douce_disparition");
      carrousselChildren[temoin].classList.remove("mouv");

      carrousselChildren[next].style.transform = "translateX(0)";
      carrousselChildren[next].classList.add("douce_disparition");
      carrousselChildren[next].classList.add("mouv");

      carrousselChildren[prev].style.transform = "translateX(" + -slide + "00%)";
      carrousselChildren[prev].classList.add("douce_disparition");
      carrousselChildren[prev].classList.remove("mouv");
    }

    // if(carrousselTitre){//Appliquer des écoutes supplémentaires si le carroussel dispose de titre de section
    //   for(let x=0; x < carrousselTitreP.length; x++){
    //     carrousselTitreP[x].addEventListener("click", function(){
    //       slide = titreActif < x ? - 1 : 1;
    //       next = ajustement(x);
    //       temoin= x + slide;
    //       slide = (titreActif == carrousselTitreP.length -1 && x == 0) || (titreActif == 0 && x == carrousselTitreP.length -1) ? slide * -1 : slide;
    //       prev = ajustement(x - slide);
    //       actionCarroussel(titreActif, next, prev, slide);
    //       titreActif = x;
    //     });
    //   };
    // };

    for (let x = 0; x < arrow.length; x++) {//Ecoutes des actions clics sur une fléche
      arrow[x].addEventListener("click", function(e) {
        // const slider = () => (arrow[x].classList.contains('next') ? (slide = -1) : (slide = 1));
        const decalage = () => {
          slide = e.target.classList.contains('next') ? slide = -1 : slide = 1;
          temoin === null ? (temoin = 0) : (temoin = ajustement(temoin - slide));
          next === null ? (next = slide == -1 ? temoin + 1 : ajustement(temoin + 2)) : (next = ajustement(temoin - slide));
          prev === null ? (prev = slide == -1 ? ajustement(temoin + 2) : temoin + 1) : (prev = ajustement(next - slide));
        };

        if (slide != undefined) {
          if ((slide == 1 && arrow[x].classList.contains('next')) || (slide != 1 && !arrow[x].classList.contains('next'))) {
            temoin = next - slide;
          }
        }

        decalage();
        actionCarroussel(temoin, next, prev, slide);

        if(carrousselTitre){//Correction de la valeur titre actif si le carroussel comprends des titrees
          titreActif = next;
        }
      });
    }
  }
};

window.addEventListener('DOMContentLoaded', function(){
  carrousselFonc();
})