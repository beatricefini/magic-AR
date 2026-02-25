document.addEventListener("DOMContentLoaded", () => {
  const marker = document.querySelector("#imageMarker");
  const model = document.querySelector("#magicModel");

  marker.addEventListener("markerFound", () => {
    console.log("Marker trovato");
    model.setAttribute("visible", "true");
  });

  marker.addEventListener("markerLost", () => {
    console.log("Marker perso");
    model.setAttribute("visible", "false");
  });
});