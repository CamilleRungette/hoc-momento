// FONCTION DES CARROUSSELS ---- double boucles car array == small et async => peu d'encombrement caalback queue
const carroussel = document.getElementsByClassName('carroussel');
let cibleParallaxe1, cibleParallaxe2, cibleParallaxe3;

const carrousselFonc = () => {

    for (let i = 0; i < carroussel.length; i++) {

        let arrow = carroussel[i].parentElement.getElementsByClassName('arrow'), carrousselChildren = carroussel[i].children, slide,
            temoin = null, next = null, prev = null;

        carrousselChildren[1].classList.add("mouv");

        for (let x = 0; x < arrow.length; x++) {
            arrow[x].addEventListener('click', function () {
              console.log("coucou")

                const slider = () => arrow[x].classList == "arrow droite" ? slide = -1 : slide = 1;

                const ajustement = (valeur) => valeur < 0 ? valeur = carrousselChildren.length - 1 : valeur >= carrousselChildren.length ? valeur = 0 : valeur;

                const decalage = () => {
                    temoin === null ? temoin = 1 : temoin = ajustement(temoin - slide);
                    next === null ? next = (slide == -1 ? 2 : 0) : next = ajustement(temoin - slide);
                    prev === null ? prev = (slide == -1 ? 0 : 2) : prev = ajustement(temoin + slide);
                }

                if (slide != undefined) {
                    if (slide == 1 && arrow[x].classList == "arrow droite" || slide != 1 && arrow[x].classList != "arrow droite") { decalage(slider()) }
                } decalage(slider());

                carrousselChildren[temoin].style.transform = "translateX(" + slide + "00%)";
                carrousselChildren[temoin].classList.remove("douce_disparition");
                carrousselChildren[temoin].classList.remove("mouv");

                carrousselChildren[next].style.transform = "translateX(0)";
                carrousselChildren[next].classList.add("douce_disparition");
                carrousselChildren[next].classList.add("mouv");

                carrousselChildren[prev].style.transform = "translateX(" + - slide + "00%)";
                carrousselChildren[prev].classList.add("douce_disparition");
                carrousselChildren[prev].classList.remove("mouv");

            });
        };
    };
}

window.onload= () => carrousselFonc();
