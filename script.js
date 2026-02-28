document.addEventListener("DOMContentLoaded", () => {
  const marker = document.querySelector("#imageMarker");

  console.log("DEBUG: script caricato");

  marker.addEventListener("markerFound", () => {
    console.log("🔥 MARKER TROVATO");
  });

  marker.addEventListener("markerLost", () => {
    console.log("❌ MARKER PERSO");
  });
});