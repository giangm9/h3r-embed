import * as THREE from 'three'
import GLTFLoader from "three-gltf-loader"
import EventEmitter from 'events'
import GUI from './GUI.js'
import $ from 'jquery'

const OrbitControls = require('three-orbit-controls')(THREE)

var 
  Scene        = {},
  duration     = 0,
  time         = 0,
  state        = "play", //pause
  actions      = [],
  container    = null,
  renderer     = null,
  mixer        = null,
  camera       = null,
  scene        = new THREE.Scene(),
  clock        = new THREE.Clock(),
  eventEmitter = new EventEmitter(),
  loader       = new GLTFLoader();

Scene.Init = function() {
  container = $("#h3r-scene-container");
  initCamera();
  initScene(); 
  animate();
}

Scene.Load = function(data) {
  data.gltf.forEach( function(url) {
    addGLTF(url);
  });
}


Scene.on = function( event, handler ) {
  eventEmitter.on(event, handler);
}

function addGLTF(url) {

  loader.load(url, function(gltf) {

    scene.add(gltf.scene);

    gltf.scene.traverse(function (object) {
      object.frustumCulled = false;
    });

    mixer = new THREE.AnimationMixer(gltf.scene);
    if (!gltf.animations) return;

    gltf.animations.forEach(function(anim) {
      var action = mixer.clipAction(anim);
      var max = Math.max;
      actions.push(action);
      action.play();
      GUI.duration = max(GUI.duration, anim.duration);
      duration = max(duration, anim.duration);
    });

  }, function(xhr) {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  });
}

function initCamera() {
  var size = GUI.Size();
  camera = new THREE.PerspectiveCamera( 75, size.ratio , 0.1, 1000 );
  camera.position.set(0, 0, 5);
  var control = new OrbitControls( camera , container[0] );
  control.update();
  control.enablePan = true;
  Scene.on("update", function() {
    var size = GUI.Size();
    camera.aspect = size.ratio;
    camera.updateProjectionMatrix();
    control.update();
  });
}

function initScene() {
  var size = GUI.Size();
  renderer = new THREE.WebGLRenderer( {antialias: true} );
  scene = new THREE.Scene();
  container[0].appendChild( renderer.domElement );
  scene.add(new THREE.HemisphereLight( 0xffffff, 0x222222, 1.3));
  scene.background = new THREE.Color( 0x003333);

  Scene.on("update", function() {
    var size = GUI.Size();
    renderer.setSize( size.width, size.height );
    renderer.render( scene, camera );
  });
}


function animate() {
  requestAnimationFrame(animate);
  var delta = clock.getDelta();
  eventEmitter.emit("update", delta);
}

export default Scene;

