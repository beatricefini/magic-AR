document.addEventListener("DOMContentLoaded", () => {
  const marker = document.querySelector("#imageMarker");
  const model = document.querySelector("#magicModel");

  const videoMap = {
    vid1: document.querySelector("#video1"),
    vid2: document.querySelector("#video2"),
    vid3: document.querySelector("#video3"),
    vid4: document.querySelector("#video4"),
    vid5: document.querySelector("#video5"),
    vid6: document.querySelector("#video6"),
    vid7: document.querySelector("#video7"),
    vid8: document.querySelector("#video8"),
  };

  const textureMap = {};

  // crea tutte le VideoTexture UNA SOLA VOLTA
  Object.keys(videoMap).forEach((key) => {
    const video = videoMap[key];
    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;
    textureMap[key] = texture;
  });

  marker.addEventListener("markerFound", () => {
    console.log("Marker trovato");
    model.setAttribute("visible", "true");

    // avvia tutti i video
    Object.values(videoMap).forEach((v) => v.play());

    const mesh = model.getObject3D("mesh");
    if (!mesh) return;

    mesh.traverse((node) => {
      if (!node.isMesh || !node.material) return;

      const matName = node.material.name;

      if (textureMap[matName]) {
        node.material.map = textureMap[matName];
        node.material.needsUpdate = true;
      }
    });
  });

  marker.addEventListener("markerLost", () => {
    console.log("Marker perso");
    model.setAttribute("visible", "false");

    Object.values(videoMap).forEach((v) => v.pause());
  });
});