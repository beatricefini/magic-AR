document.addEventListener("DOMContentLoaded", () => {

  const target = document.querySelector("#imageTarget");
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
  let initialized = false;

  target.addEventListener("targetFound", () => {
    model.setAttribute("visible","true");

    const mesh = model.getObject3D("mesh");
    if (!mesh) return;

    if(!initialized){
      Object.keys(videos).forEach(key=>{
        const video = videos[key];
        const texture = new THREE.VideoTexture(video);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBAFormat;
        textures[key] = texture;
      });

      mesh.traverse(node=>{
        if(!node.isMesh || !node.material) return;
        const name = node.material.name;
        if(textures[name]){
          node.material.map = textures[name];
          node.material.needsUpdate = true;
        }
      });

      initialized = true;
    }

    Object.values(videos).forEach((video,index)=>{
      setTimeout(()=> video.play(), index*300);
    });

  });

  target.addEventListener("targetLost", ()=>{
    model.setAttribute("visible","false");
    Object.values(videos).forEach(v=>v.pause());
  });

});