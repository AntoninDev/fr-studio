const titleText = "Impressão de alta qualidade para sua marca.";
const subtitleText = "Cartões, banners, camisas e muito mais.";

const speed = 70;

let i = 0;
let j = 0;

function typeTitle() {
  if (i < titleText.length) {
    document.getElementById("typing-text").innerHTML += titleText.charAt(i);
    i++;
    setTimeout(typeTitle, speed);
  } else {
    typeSubtitle(); // começa o segundo texto
  }
}

function typeSubtitle() {
  if (j < subtitleText.length) {
    document.getElementById("typing-subtitle").innerHTML += subtitleText.charAt(j);
    j++;
    setTimeout(typeSubtitle, speed);
  }
}

typeTitle();
