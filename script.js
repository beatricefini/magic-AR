document.addEventListener("DOMContentLoaded", () => {

  const marker = document.querySelector("#marker");
  const model = document.querySelector("#magicModel");

  const videos = {
    vid1: document.querySelector("#video1"),
    vid2: document.querySelector("#video2"),
    vid3: document.querySelector("#video3"),
    vid4: document.querySelector("#video4"),
    vid5: document.querySelector("#video5"),
    vid6: document.querySelector("#video6"),
    vid7: document.querySelector("#video7"),
    vid8: document.querySelector("#video8"),
  };

  const textures = {};
  let modelReady = false;
  let texturesAssigned = false;

  // ✅ modello caricato
  model.addEventListener("model-loaded", () => {
    console.log("✅ MODELLO CARICATO");
    modelReady = true;
  });

  marker.addEventListener("markerFound", async () => {
    console.log("🎯 MARKER TROVATO");
    model.setAttribute("visible", "true");

    if (!modelReady) return;

    const mesh = model.getObject3D("mesh");
    if (!mesh) return;

    // ▶️ avvia i video (OBBLIGATORIO per mobile)
    for (const video of Object.values(videos)) {
      try {
        await video.play();
      } catch (e) {
        console.warn("Autoplay bloccato:", e);
      }
    }

    // 🎨 assegna texture UNA SOLA VOLTA
    if (!texturesAssigned) {

      Object.keys(videos).forEach((key) => {
        const texture = new THREE.VideoTexture(videos[key]);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBAFormat;
        texture.flipY = false;
        textures[key] = texture;
      });

      mesh.traverse((node) => {
        if (!node.isMesh || !node.material) return;

        const name = node.material.name;
        if (textures[name]) {
          node.material.map = textures[name];
          node.material.needsUpdate = true;
          console.log("🎬 video assegnato a", name);
        }
      });

      texturesAssigned = true;
    }
  });

  marker.addEventListener("markerLost", () => {
    console.log("❌ MARKER PERSO");
    model.setAttribute("visible", "false");
    Object.values(videos).forEach(v => v.pause());
  });

});