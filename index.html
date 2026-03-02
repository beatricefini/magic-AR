document.addEventListener("DOMContentLoaded", () => {

  const marker = document.querySelector("#imageMarker");
  const model = document.querySelector("#magicModel");

  const videos = [
    document.querySelector("#video1"),
    document.querySelector("#video2"),
    document.querySelector("#video3"),
    document.querySelector("#video4"),
    document.querySelector("#video5"),
    document.querySelector("#video6"),
    document.querySelector("#video7"),
    document.querySelector("#video8"),
  ];

  const textures = {};
  let initialized = false;

  marker.addEventListener("markerFound", () => {
    console.log("MARKER TROVATO");
    model.setAttribute("visible", true);

    const mesh = model.getObject3D("mesh");
    if (!mesh) return;

    // inizializzazione UNA SOLA VOLTA
    if (!initialized) {
      console.log("Inizializzo video textures");

      videos.forEach((video, i) => {
        const texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBAFormat;
        textures[`video${i + 1}`] = texture;
      });

      mesh.traverse((node) => {
        if (!node.isMesh || !node.material) return;

        const matName = node.material.name;
        if (textures[matName]) {
          node.material.map = textures[matName];
          node.material.needsUpdate = true;
        }
      });

      initialized = true;
    }

    // ▶️ avvio progressivo (anti crash)
    videos.forEach((video, i) => {
      setTimeout(() => {
        video.play().catch(() => {});
      }, i * 300);
    });
  });

  marker.addEventListener("markerLost", () => {
    console.log("MARKER PERSO");
    model.setAttribute("visible", false);
    videos.forEach(v => v.pause());
  });

});