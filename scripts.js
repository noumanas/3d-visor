
  function load(){
    this.loader.load(data, function (gltf) {
      const geometryData = gltf.scene.children[2]['geometry'].attributes;

      const geometryy = new THREE.BufferGeometry();

      geometryy.copy(gltf.scene.children[2]['geometry'])

      console.log(gltf.scene.children[2]['geometry'])
      //var geometrym = new THREE.BufferGeometry(gltf.scene.children[2].geometry.index.array);


      this.meshs = new THREE.Mesh(geometryy, this.materialm);

      this.meshs.position.set(17.6, -1.54, 0);

      this.animate();
      //var meshh = new THREE.Mesh(geometrym, materialm);
      //console.log(JSON.stringify(gltf.scene.children[2].geometry.index.array))

      this.scene.add(this.meshs);
      this.renderer.render(this.scene, this.camera);
      console.log(this.scene);
    }, undefined, function (error) {
      console.error(error);
    });
}

;