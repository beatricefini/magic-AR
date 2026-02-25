document.addEventListener("DOMContentLoaded", () => {
  const marker = document.querySelector("#imageMarker");
  const model = document.querySelector("#magicModel");
  const video = document.querySelector("#video1");

  // creiamo la VideoTexture solo una volta
  const videoTexture = new THREE.VideoTexture(video);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBAFormat;

  marker.addEventListener("markerFound", () => {
    console.log("Marker trovato");
    model.setAttribute("visible","true");

    // play video
    video.play();

    // applica video al materiale vid1 e bianco agli altri
    const mesh = model.getObject3D('mesh');
    if (mesh) {
      mesh.traverse((node) => {
        if (node.isMesh) {
          if (node.material.name === "vid1") {
            node.material.map = videoTexture;
            node.material.needsUpdate = true;
          } else if (["vid2","vid3","vid4","vid5","vid6","vid7","vid8"].includes(node.material.name)) {
            // texture bianca
            node.material.map = null;
            node.material.color.setHex(0xffffff);
            node.material.needsUpdate = true;
          }
        }
      });
    }
  });

  marker.addEventListener("markerLost", () => {
    console.log("Marker perso");
    model.setAttribute("visible","false");
    video.pause();
  });
});