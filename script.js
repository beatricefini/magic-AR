document.addEventListener("DOMContentLoaded", () => {
  const marker = document.querySelector("#imageMarker");
  const model = document.querySelector("#magicModel");
  const video = document.querySelector("#video1");

  marker.addEventListener("markerFound", () => {
    console.log("Marker trovato");
    model.setAttribute("visible","true");

    // accendere il video
    video.play();

    // applicare il video al materiale "vid1" del modello
    model.getObject3D('mesh').traverse((node) => {
      if (node.isMesh && node.material.name === "vid1") {
        node.material.map = new THREE.VideoTexture(video);
        node.material.needsUpdate = true;
      }
    });
  });

  marker.addEventListener("markerLost", () => {
    console.log("Marker perso");
    model.setAttribute("visible","false");
    video.pause();
  });
});