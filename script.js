document.addEventListener("DOMContentLoaded", () => {

  const marker = document.querySelector("#marker");
  const model = document.querySelector("#model");

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
  let ready = false;

  marker.addEventListener("markerFound", () => {

    model.setAttribute("visible", true);

    const mesh = model.getObject3D("mesh");
    if (!mesh || ready) return;

    console.log("🎬 applico video textures");

    videos.forEach((video, i) => {
      video.load();
      const tex = new THREE.VideoTexture(video);
      tex.flipY = false;
      tex.encoding = THREE.sRGBEncoding;
      textures[`video${i + 1}`] = tex;
    });

    mesh.traverse((node) => {
      if (!node.isMesh || !node.material) return;

      const name = node.material.name;

      if (textures[name]) {
        node.material.emissive = new THREE.Color(1,1,1);
        node.material.emissiveMap = textures[name];
        node.material.emissiveIntensity = 1;
        node.material.needsUpdate = true;

        console.log("✔ assegnato:", name);
      }
    });

    ready = true;

    // ▶️ avvio progressivo
    videos.forEach((v, i) => {
      setTimeout(() => {
        v.play().catch(()=>{});
      }, i * 300);
    });
  });

  marker.addEventListener("markerLost", () => {
    model.setAttribute("visible", false);
    videos.forEach(v => v.pause());
  });

});