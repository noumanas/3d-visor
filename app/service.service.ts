import { Injectable } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three/build/three.module';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {BloomPass} from 'three/examples/jsm/postprocessing/BloomPass.js';
import {FilmPass} from 'three/examples/jsm/postprocessing/FilmPass.js';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  loader: GLTFLoader = new GLTFLoader();

  scene: THREE.Scene = new THREE.Scene;
  camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer;

  constructor() { }

  load(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera, controls: OrbitControls, modal, id, zoom, intensity, rotation, flheight,light2) {
    let src = '';

    if(id=="POTENZA")
      modal.close();
      src = '../assets/s3Mirror/' + id + '/3d/model.gltf';
      if(id=="TURANZA")
      modal.close();
    
    src = '../assets/s3Mirror/' + id + '/3d/model.gltf';

    if (id == 'remoteGltf')
      src = 'https://bridgestone-assets.s3.eu-central-1.amazonaws.com/b2605e18-9e4c-4f15-b933-ada475a13376/3d/model.gltf';

    //   if(id=="59a2ccef-94e9-43e3-bd88-958279cd05d0"){
    // var dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath('../assets/draco/');

    // this.loader.setDRACOLoader(dracoLoader);
    //   }

    //COLOR SETTINGS
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    renderer.toneMapping=THREE.ReinhardToneMapping;
    renderer.toneMappingExposure=5;

    //const composer = new EffectComposer(renderer);
    
    //LOADER
    //we must change name of the files
    let remoteGltf = 'https://bridgestone-assets.s3.eu-central-1.amazonaws.com/b2605e18-9e4c-4f15-b933-ada475a13376/3d/model.gltf'
    this.loader.crossOrigin = '*';
    this.loader.load(src, function (gltf) {

      var pointLight;
      var pointLightD;
      var pointLightI;
      var pointLightB;
      var lightHolder;

      let light2aux=10;
      if(light2=='center')
        light2aux=30;
        if(light2=='left')
        light2aux=0;
        if(light2=='right')
        light2aux=300;

      

      

      let modelType = 'DUELER HT840';
      
      pointLightB = new THREE.PointLight(0xffffff, 0.1*intensity , 1000);
      pointLightB.position.set(-30, 0, 0);
      pointLightI = new THREE.PointLight(0xffffff, 0.5*intensity , 1000);
      pointLightI.position.set(light2aux, 0, 30);
      pointLightD = new THREE.PointLight(0xffffff,0.5*intensity, 1000);
      pointLightD.position.set(20, 0, -20);
      pointLight = new THREE.PointLight(0xffffff, 0.5*intensity, 1000);
      pointLight.position.set(15, 30*flheight, 10);
      var ambientL = new THREE.AmbientLight( 0x404040 , 0.1); // soft white light
      
      lightHolder = new THREE.Group(); 

      // var light = new THREE.PointLight(0xFFFFFF, 3, 1000)
      // light.position.set(-10, 1, -12);
      
      //LEFT
    //   if(id=="7371498d-e937-496a-a112-fdf3b0f594b5" ||
    //   id=="9544879a-ca0c-4643-b340-f243de7269bd"){
    //     pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    //     pointLight.position.set(0, 0, 30);
    //     pointLightI = new THREE.PointLight(0xffffff,1, 1000);
    //     pointLightI.position.set(20, 0, -20);
    //     pointLightD = new THREE.PointLight(0xffffff, 1, 1000);
    //     pointLightD.position.set(-15, 0, -10);
    //     lightHolder = new THREE.Group();
    //   }
       
    //   //RIGTH
    //   if(id=="0deb94a5-eed8-4aae-83e1-f15a69994bea"
    //   ||id=="9b9e1a5b-2d3a-48a6-a390-c14e77973cf3"){
    //     pointLightD = new THREE.PointLight(0xffffff, 1, 1000);
    //     pointLightD.position.set(60, 0, 30);
    //     pointLightI = new THREE.PointLight(0xffffff, 1, 1000);
    //     pointLightI.position.set(0, 0, -20);
    //     pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    //     pointLight.position.set(-10, 0, 10);
    //     lightHolder = new THREE.Group();
    //   }

    //   if(id=="59a2ccef-94e9-43e3-bd88-958279cd05d0" 
    //   || id=="41267ce9-b120-489a-9635-ab4f1e03e657"){
        
    //     pointLightI = new THREE.PointLight(0xffffff, 1, 1000);
    //     pointLightI.position.set(10, 0, 30);
    //     pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    //     pointLight.position.set(20, 0, -20);
    //     pointLightD = new THREE.PointLight(0xffffff, 1, 1000);
    //     pointLightD.position.set(-20, 0, -20);
    //     lightHolder = new THREE.Group();
    //   }

    //   var fruits = ["6ba9b783-f6dd-4d1b-877e-7d45e000430a", "42c41900-955e-4664-8636-507dec9d61dd", "63888bf7-6eef-4f10-a5fc-4f2dcd2961a9",
    //   "b0a96957-4fb4-4e5e-8c68-2abe7732ca4f", "b9ae328b-ca17-476c-97fa-cb20d9fa423b", "c5d29771-9521-4973-8951-ae61c487bca0",
    //   "cca3e56a-7a35-4676-a7c6-a34f974224f6", "f911cae2-e2b4-4e3e-b262-2ed2bd3888fc"];

    //   var prodId=["9ac1d0d6-03b2-4936-a40d-569371b5fa15", "7812aef4-fcf1-4882-9473-481b648a4c60", "c7cfc0a1-12e1-4014-b102-e01c7ba7a89a",
    //   "b8ca4a61-e6b8-43c3-88c1-8056422b80c6", "a0911ccb-65ab-44d2-bf37-52b66b5a4829", "251200da-e004-4251-a412-27cf30d1ad4c",
    //   "f5c92a3f-9a10-4ff4-bf47-1871aea3c475", "1511f792-1d26-42f2-a1e8-c0921a286814"];

    // if (fruits.includes(id)||prodId.includes(id)) {
    //   pointLight = new THREE.PointLight(0xffffff, 2.5, 1000);
    //     pointLight.position.set(30, 0, 30);
    //     pointLightD = new THREE.PointLight(0xffffff, 1, 1000);
    //     pointLightD.position.set(10, 0, -20);
    //     pointLightI = new THREE.PointLight(0xffffff, 0.75, 1000);
    //     pointLightI.position.set(-10, 0, 0);
    //     lightHolder = new THREE.Group();

    //   // var light = new THREE.PointLight(0xFFFFFF, 3, 1000)
    //   // light.position.set(-10, 1, -12);
    //   if(id=="b0a96957-4fb4-4e5e-8c68-2abe7732ca4f"||id=="c5d29771-9521-4973-8951-ae61c487bca0"
    //   ||id=="b8ca4a61-e6b8-43c3-88c1-8056422b80c6"||id=="251200da-e004-4251-a412-27cf30d1ad4c"){
    //     pointLight = new THREE.PointLight(0xffffff, 2.5, 1000);
    //     pointLight.position.set(30, 0, 30);
    //     pointLightD = new THREE.PointLight(0xffffff, 1, 1000);
    //     pointLightD.position.set(10, 0, -20);
    //     pointLightI = new THREE.PointLight(0xffffff, 0.75, 1000);
    //     pointLightI.position.set(-10, 0, 0);
    //     lightHolder = new THREE.Group();
    //   }
    // }

    // if (id=="0ec72d28-6f14-48e8-85e0-57b24bf80de7" 
    // || id=="9aa065e4-7147-48f4-b5e1-3eb355e04508") {
    //     pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    //     pointLight.position.set(30, 0, 30);
    //     pointLightI = new THREE.PointLight(0xffffff, 1, 1000);
    //     pointLightI.position.set(10, 0, -20);
    //     pointLightD = new THREE.PointLight(0xffffff, 0.5, 1000);
    //     pointLightD.position.set(-10, 0, 10);
    //     lightHolder = new THREE.Group();
 
    // }

    // if (id=="c2248c23-9889-4648-a5f2-8ee931177649") {
    //     pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    //     pointLight.position.set(30, 0, 0);
    //     pointLightI = new THREE.PointLight(0xffffff, 2, 1000);
    //     pointLightI.position.set(-10, 0, -10);
    //     pointLightD = new THREE.PointLight(0xffffff, 1, 1000);
    //     pointLightD.position.set(-10, 0, 10);
    //     lightHolder = new THREE.Group();
    //   //light4.target=gltf.scene.children[0];

    // }



      //var texture = new THREE.TextureLoader().load("../assets/"+ id +"/textures/textura.png");
      // var texture = new THREE.TextureLoader().load("../assets/s3Mirror/"+ id +"/3d/textures/model.jpg");
      // //TEXTURE OFFSET

      //   texture.offset.x = 0.02; // 0.0 - 1.0
      //   texture.offset.y = 0.05;

      //   texture.offset.rotation = 180;
      // gltf.scene.children[4]['material'].map = texture;
      // gltf.scene.children[4]['material'].side = THREE.DoubleSide;

      //CONFIGURATION WITHOUT WHITES
      // gltf.scene.children[5]['material'] = new THREE.MeshPhongMaterial({
      //   color: 0x0A0A0A
      // });

      // gltf.scene.children[6]['material'] = new THREE.MeshPhongMaterial({
      //   color: 0x0A0A0A
      // });

      // gltf.scene.children[7]['material'] = new THREE.MeshPhongMaterial({
      //   color: 0x0A0A0A
      // });


      // gltf.scene.children[9]['material'] = new THREE.MeshStandardMaterial({
      //   color: 0xFF0DF1
      // });

      // gltf.scene.children[8]['material'] = new THREE.MeshStandardMaterial({
      //   color: 0x16FF1C
      // });
      //   gltf.scene.children[9]['material']= new THREE.MeshStandardMaterial({
      //     color: 0x666666
      //   });

      console.log(gltf)

      if (modelType == 'DUELER HT840') {
        

        var axesHelper = new THREE.AxesHelper( 5 );
        var quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );

        let model = gltf.scene;
        model.quaternion.copy(quaternion);
        scene.add(model);
        
        //ADD LIGHTS
        //var helper = new THREE.DirectionalLightHelper( light, 1, 0x000000);

        //camera.add(light);
        //camera.add(light2);
        //camera.add(light3);
        //camera.add(light4);
        //scene.add(lightU);
        //scene.add(lightB);
        //camera.add(ambientL);
        //scene.add(lightA);
        //scene.add( axesHelper );
        //scene.add( helper );
        lightHolder.add(pointLight);
        lightHolder.add(pointLightD);
        lightHolder.add(pointLightI);
        lightHolder.add(pointLightB);
        scene.add(lightHolder);
        //scene.add( ambientL );
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = true;
        controls.enablePan = false;
        controls.maxPolarAngle = Math.PI;
        //scene.add(camera);



        // CAMERA AUTO UPDATE
        var boundingBox = new THREE.Box3();
        var helper = new THREE.BoundingBoxHelper();
        var boundingBoxAux = new THREE.Box3();

        // get bounding box of object - this will be used to setup controls and camera
        gltf.scene.children.forEach(mesh => {
          if (mesh instanceof THREE.Mesh) {
            boundingBoxAux.setFromObject(mesh);

            
            if (
              boundingBoxAux.getSize().y > boundingBox.getSize().y
            ) {
              
              boundingBox = boundingBoxAux;
              //console.log(boundingBox.size());

              const center = boundingBox.getCenter();
              
              const size = boundingBox.getSize();
              
              // get the max side of the bounding box (fits to width OR height as needed )


              const maxDim = Math.max(size.x, size.y, size.z);
              
              // const fov = camera.fov * ( Math.PI / 180 );
              // let cameraZ = Math.abs( maxDim / 4 * Math.tan( fov * 2 ) );

              
              // cameraZ *= 5*maxDim; // zoom out a little so that objects don't fill the screen
              camera.position.set(center.x, center.y, center.z);
              //camera.position.z = 2*maxDim+center.z;
              camera.position.z = 1.2 * maxDim / (Math.tan(10 * Math.PI / 180));
              

              if(zoom==null||zoom=='med'){
                controls.minDistance=camera.position.z-9*(maxDim/3.67);
                controls.maxDistance=camera.position.z+3*(maxDim/3.67);
              } else if (zoom=='low'){
                controls.minDistance=camera.position.z-6*(maxDim/3.67);
                controls.maxDistance=camera.position.z+3*(maxDim/3.67);
              } else if (zoom=='max'){
                controls.minDistance=camera.position.z-12*(maxDim/3.67);
                controls.maxDistance=camera.position.z+3*(maxDim/3.67);
              } else{
                try{
                  let a = parseInt(zoom);
                  controls.minDistance=camera.position.z-a*(maxDim/3.67);
                  controls.maxDistance=camera.position.z+3*(maxDim/3.67);
                }catch(error){

                }
              }
              
              
              // helper = new THREE.BoundingBoxHelper(mesh, 0xff0000);
              // helper.update();
              // // If you want a visible bounding box
              // scene.add(helper);
            }

            

            // } else if (mesh instanceof Group) {
            //   // mesh.children.forEach(child => {
            //   //   boundingBox.setFromObject(child);
            //   //   helper = new THREE.BoundingBoxHelper(child, 0x00ff00);
            //   //   helper.update();
            //   //   // If you want a visible bounding box
            //   //   scene.add(helper);
            //   })
          }
        });
        // if(gltf.scene.children[0].rotation.x!=0&&gltf.scene.children[0].quaternion.x!=0)
        // scene.rotation.y=-0.8;
        var fruits = ["6ba9b783-f6dd-4d1b-877e-7d45e000430a", "42c41900-955e-4664-8636-507dec9d61dd", "63888bf7-6eef-4f10-a5fc-4f2dcd2961a9",
          "b0a96957-4fb4-4e5e-8c68-2abe7732ca4f", "b9ae328b-ca17-476c-97fa-cb20d9fa423b", "c5d29771-9521-4973-8951-ae61c487bca0",
          "cca3e56a-7a35-4676-a7c6-a34f974224f6", "f911cae2-e2b4-4e3e-b262-2ed2bd3888fc","POTENZA"];

      var prodId=["9ac1d0d6-03b2-4936-a40d-569371b5fa15", "7812aef4-fcf1-4882-9473-481b648a4c60", "c7cfc0a1-12e1-4014-b102-e01c7ba7a89a",
      "b8ca4a61-e6b8-43c3-88c1-8056422b80c6", "a0911ccb-65ab-44d2-bf37-52b66b5a4829", "251200da-e004-4251-a412-27cf30d1ad4c",
      "f5c92a3f-9a10-4ff4-bf47-1871aea3c475", "1511f792-1d26-42f2-a1e8-c0921a286814" ,"POTENZA"];

        if (fruits.includes(id)||prodId.includes(id)) {
          model.rotation.y = -0.8;
        }
        else if (id == "0ec72d28-6f14-48e8-85e0-57b24bf80de7"||
                id=="9aa065e4-7147-48f4-b5e1-3eb355e04508") {
          model.rotation.y = -0.8;
        } else if (id == "f134625e-1110-4876-a416-562b67ef4657"||
                  id=="6b0e18f2-8841-48c2-b910-8e1e1c1b5e9e") {
          model.rotation.y = -2.35;
        }else if(id=="c2248c23-9889-4648-a5f2-8ee931177649"){
          model.rotation.y=0.8;
        }
        else if (gltf.scene.children[0].rotation.x != 0) {
          model.rotation.y = -2.35;
        } 
        else
          model.rotation.y = 0.8;
          //lightHolder.quaternion.copy(camera.quaternion);
          if(id=="TURANZA"){
          camera.position.z=20;
          //console.log(camera.position.z);
          model.rotation.y=0.8;
        }
        if(id=="POTENZA"){
          camera.position.z= 3;
          scene.position.y = -0.2;
          //console.log(camera.position.z);

          model.rotation.y = 0.8;
        }
        if(rotation!=null){
          model.rotation.y=rotation;
        }
        // const center = boundingBox.getCenter();
        // console.log(center);
        // const size = boundingBox.getSize();
        // console.log(size);
        // // get the max side of the bounding box (fits to width OR height as needed )


        // const maxDim = Math.max(size.x, size.y, size.z);
        // console.log(maxDim)
        // // const fov = camera.fov * ( Math.PI / 180 );
        // // let cameraZ = Math.abs( maxDim / 4 * Math.tan( fov * 2 ) );

        // // cameraZ *= 5*maxDim; // zoom out a little so that objects don't fill the screen
        // camera.position.set(center.x, center.y, center.z);
        // //camera.position.z = 2*maxDim+center.z;
        // camera.position.z = 5 * maxDim / (Math.tan(10 * Math.PI / 180));

        // console.log(camera.position.z);
        //camera.fov=2*Math.acos(maxDim/camera.position.z);

        //camera.fov = 500*Math.pow(maxDim,2);
        //camera.updateProjectionMatrix();

        //camera.position.z = (0.6001851712778264/)*size.z+center.z;
        // camera.position.x = 5*size.x;
        //camera.position.y = 5*size.y;
        // const minZ = boundingBox.min.z;
        // const cameraToFarEdge = ( minZ < 0 ) ? -minZ + cameraZ : cameraZ - minZ;
        //camera = gltf.scene.children[3] ;
        //camera.far = cameraToFarEdge * 3;
        //camera.updateProjectionMatrix();

        if (controls) {

          // set camera to rotate around center of loaded object
          // controls.target = center;

          // // prevent camera from zooming out far enough to create far plane cutoff
          // //controls.maxDistance = cameraToFarEdge * 2;

          // controls.saveState();

        } else {

          // camera.lookAt(center)

        }
        
        animate();
        //CAMERA AUTO UPDATE

      }


      // if (modelType == 'DEULER H005') {
      //   scene = gltf.scene;

      //   animate();


      //   let blenderCamera: any = gltf.cameras[0];
      //   camera.position.x = blenderCamera.parent.position.x;
      //   camera.position.y = blenderCamera.parent.position.y;
      //   camera.position.z = blenderCamera.parent.position.z;

      //   camera.position.z = 12;
      //   camera.position.x = 0;
      //   camera.position.y = 0;

      //   camera.aspect = blenderCamera.aspect;
      //   camera.fov = blenderCamera.fov;
      //   camera.far = blenderCamera.far;
      //   camera.near = blenderCamera.near;

      //   controls = new OrbitControls(camera, renderer.domElement);
      //   controls.enableZoom = true;
      //   controls.maxPolarAngle = Math.PI;

      //   controls.target.copy(scene.position)

      // }
      //renderer.render(scene, camera);


      closeModal(modal);

      function closeModal(modal) {
        modal.close();

      }
      //alert("cargado");


      function animate() {
        requestAnimationFrame(animate);
        // lightHolder.quaternion.copy(camera.quaternion);
        // composer.addPass(new RenderPass(scene, camera));
        // composer.render();
        renderer.render(scene, camera);
      }

      //renderer.render(scene, camera);
      
    }, function (xhr) {


    }, function (error) {
      console.error(error);
      alert("Ha habido un error");
      modal.close();
    });
  }


}
