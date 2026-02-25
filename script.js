document.addEventListener("DOMContentLoaded", () => {
  const marker = document.querySelector("#imageMarker");
  let cube = null;

  marker.addEventListener("markerFound", () => {
    console.log("Marker trovato");

    // crea cubo solo se non esiste
    if (!cube) {
      cube = document.createElement("a-box");

      cube.setAttribute("color", "#00ffff");
      cube.setAttribute("depth", "0.5");
      cube.setAttribute("height", "0.5");
      cube.setAttribute("width", "0.5");

      // posiziona sopra il marker
      cube.setAttribute("position", "0 0.25 0");

      marker.appendChild(cube);
    }
  });

  marker.addEventListener("markerLost", () => {
    console.log("Marker perso");

    if (cube) {
      cube.remove();
      cube = null;
    }
  });
});