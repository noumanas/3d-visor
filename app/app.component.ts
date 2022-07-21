import { Component, OnInit, SystemJsNgModuleLoader, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three/build/three.module';
//import { OrbitControls } from '../../three.js-master/jsm/controls/OrbitControls.js';

import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

import { ServiceService } from 'src/app/service.service';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingPopupComponent } from './loading-popup/loading-popup.component';
import { ActivatedRoute } from '@angular/router';



// function load(loader: GLTFLoader, meshs: THREE.Mesh, scene: THREE.Scene, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, materialm: THREE.MeshStandardMaterial){
//   loader.load('../assets/tire20.glb', function (gltf) {
//     const geometryData = gltf.scene.children[2]['geometry'].attributes;

//     console.log('loader');
//     const geometryy = new THREE.BufferGeometry();

//     geometryy.copy(gltf.scene.children[2]['geometry'])

//     console.log(gltf.scene.children[2]['geometry'])
//     //var geometrym = new THREE.BufferGeometry(gltf.scene.children[2].geometry.index.array);


//     meshs = new THREE.Mesh(geometryy, materialm);

//     meshs.position.set(17.6, -1.54, 0);

//     animate(meshs,renderer,scene,camera);
//     //var meshh = new THREE.Mesh(geometrym, materialm);
//     //console.log(JSON.stringify(gltf.scene.children[2].geometry.index.array))

//     scene.add(meshs);
//     renderer.render(scene, camera);
//     console.log(scene);
//   }, undefined, function (error) {
//     console.error(error);
//   });
// }

// function animate(meshs: THREE.Mesh, renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera) {

//   requestAnimationFrame();
//   //camera.rotation.z =Date.now() * 0.001;

//   meshs.rotation.y = Date.now() * 0.001;

//   renderer.render(this.scene, this.camera);

// }



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-threejs';

  previousMousePosition: any;
  isDragging: boolean;

  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
  renderer: THREE.WebGLRenderer;

  geometry: THREE.SphereGeometry;
  material: THREE.MeshLambertMaterial;
  mesh: THREE.Mesh;

  materialm: THREE.MeshStandardMaterial;

  meshs: THREE.Mesh;

  render: any;

  controls: OrbitControls;

  modalLoad: NgbModalRef;
  loaded: string = '';

  id: string = '';

  zoom: string;

  

  constructor(private http: HttpClient,
    private service: ServiceService,
    private _modal: NgbModal, private route: ActivatedRoute) { 

      this.modalLoad = this._modal.open(LoadingPopupComponent); 
      const queryString = window.location.search;
      
      const urlParams = new URLSearchParams(queryString);
      
      this.id = urlParams.get('id')
      try{
      this.zoom = urlParams.get('zoom')
      
      } catch {
        console.log("zoom default");
      }
      var intensity = 1.0;
      var rotation;
      var flheight=1.0;
      var light2='left';
      try{
        if(parseFloat(urlParams.get('intensity')))
        intensity = parseFloat(urlParams.get('intensity'));
      } catch {
        
        console.log("intensity default");
      }
      try{
        if(urlParams.get('rotation'))
        rotation = parseFloat(urlParams.get('rotation'));
      } catch {
        
        console.log("rotation default");
      }
      try{
        if(urlParams.get('flheight'))
        flheight = parseFloat(urlParams.get('flheight'));
      } catch {
        
        console.log("flheight default");
      }
      try{
        if(urlParams.get('light2'))
        light2 = urlParams.get('light2');
      } catch {
        
        console.log("light2 default");
      }
      //this.id=this.route.snapshot.queryParamMap.get['id'];
      
    
      

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.01, 900);
    //STANDARD
    // this.camera.position.z = 0.0099;
    // this.camera.position.x = 0;
    // this.camera.position.y = 0;

    var vFOV = THREE.Math.degToRad( this.camera.fov ); // convert vertical fov to radians

    var height = 2 * Math.tan( vFOV / 2 ) * 12;
    


    //this.camera = new THREE.PerspectiveCamera(39.59775192067671, 1, 0.10000000149011612, 1000);

    // this.camera.position.z = 0;
    // this.camera.position.x = 0;
    // this.camera.position.y = 0;

    // //DUELER H-L400, deuler H005, dUELER HT840
    // this.camera.position.z = 12;
    // this.camera.position.x = 0;
    // this.camera.position.y = 0;

    


    this.renderer = new THREE.WebGLRenderer({ alpha: true }, { antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //this.renderer.setClearColor("#eeeeee")
    this.renderer.setClearColor(0x222222, 0);
    document.body.appendChild(this.renderer.domElement);
    //$('#background').append(this.renderer.domElement);

    // var light = new THREE.PointLight(0xFFFFFF, 1, 500)
    // light.position.set(10, 0, 25);
    // this.scene.add(light);

    // this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    // this.controls.enableZoom = false;
    // this.controls.maxPolarAngle = Math.PI;
      //this.loadZip();

    this.service.load(this.renderer, this.scene, this.camera, this.controls, this.modalLoad, this.id, this.zoom, intensity, rotation,flheight,light2);

    
  }

  ngOnInit() {

  }


  loadZip() {
    var loader = new THREE.FileLoader();
    loader.setRequestHeader({'Access-Control-Allow-Origin': '*'});
    loader.load(
      // resource URL
      'https://bridgestone-assets.s3.eu-central-1.amazonaws.com/b2605e18-9e4c-4f15-b933-ada475a13376/3d/model.gltf',

      // onLoad callback
      function (data) {
        // output the text to the console
        console.log(data)
      },

      // onProgress callback
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },

      // onError callback
      function (err) {
        console.error('An error happened');
      }


    );
  }
}
