const hamburgerBtn = document.getElementById("hamburgerBtn");
const menu = document.getElementById("menu");

hamburgerBtn.addEventListener("click", function () {
    menu.classList.toggle("ouvert");
    hamburgerBtn.classList.toggle("active");});

    console.log('tkt le problème nest pas moi')

    const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// 1. Au chargement: on vérifie si l'utilisateur avait déjà choisi un thème
const savedTheme = localStorage.getItem("theme");
if(savedTheme === "light"){
    body.classList.add("light");
    themeToggle.textContent = "☀️"; // icone soleil
}

// 2. Au clic: on inverse le thème
themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");
    
    // 3. On sauvegarde le choix
    if(body.classList.contains("light")){
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "🌙";
    }
});

// là je fais maintenant la machine a ecrire en js 

const typewriterElement = document.getElementById('typingwritter');

let metier = ["Développeur web", "Designer", "Étudiant L3"];

let indexMots = 0;
let indexLettre = 0;

let entrainEffacer = false;

let vitesse = 150;

function ecrire() {
    const motsactuel = metier[indexMots];

    if (!entrainEffacer) {
        typewriterElement.textContent = motsactuel.substring(0, indexLettre + 1);
        indexLettre++;
        vitesse = 120;

        if (indexLettre === motsactuel.length) {
            entrainEffacer = true;
            vitesse = 2000;
        }
    } else {
        typewriterElement.textContent = motsactuel.substring(0, indexLettre - 1);
        indexLettre--;
        vitesse = 60;

        if (indexLettre === 0) {
            entrainEffacer = false;
            indexMots++;
            vitesse = 500;

            if (indexMots === metier.length) {
                indexMots = 0;
            }
        }
    }

    setTimeout(ecrire, vitesse);
}

ecrire();

