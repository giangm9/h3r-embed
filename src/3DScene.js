import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import EventEmitter from 'events';
import GUI from './GUI.js';
import $ from 'jquery';

const OrbitControls = require('three-orbit-controls')(THREE);

var Scene = {
  Time: 0.0,
  State: "play", //pause
  Duration: 0.0,
  Canvas: null,
  Load : load,
  Init: init,
  Toggle: toggle,
  Play: play,
  Pause : pause,
  on: on

};

var
  actions = [],
  mixers = [],
  container = null,
  renderer = null,
  camera = null,
  audio = null,
  scene = new THREE.Scene(),
  clock = new THREE.Clock(),
  eventEmitter = new EventEmitter(),
  loader = new GLTFLoader();


function init() {
  container = $("#h3r-scene-container");
  initCamera();
  initScene();
  initAnimation();
  GUI.UpdateState();
  animate();
}

/**
 * Load  from h3r data
 * @param {H3R} data 
 */
function load(data) {
  data.gltf.forEach(function (url) {
    addGLTF(url);
  });
  data.bgm && (audio = new Audio(data.bgm))
}

/**
 * Toggle play/pause
 */
function toggle () {
  if (Scene.State == "play") {
    Scene.Pause();
  } else {
    Scene.Play();
  }
};
/**
 * Event register
 * @param {string} event
 * @param {function(data)} handler
 */
function on(event, handler) {
  eventEmitter.on(event, handler);
  return Scene;
}

function play () {
  Scene.State = "play";
  //  audio.currentTime = this.time;
  //  audio.play();
  GUI.UpdateState();
}

function pause() {
  Scene.State = "pause";
  actions.forEach((action) => action.paused = true);
  //  audio.pause();
  GUI.UpdateState();
}


function initAnimation() {
  Scene.on("update", function (delta) {

    mixers.forEach((mixer) => { mixer.update(0); });
    if (Scene.State == "play") {
      GUI.Time = Scene.time;
      Scene.Time += delta;
    }

    actions.forEach(function (action) {
      action.time = Scene.Time;
    });

    if (Scene.Time > Scene.Duration) {
      Scene.Time -= Scene.Duration;
      audio && (audio.currentTime = Scene.Time);
    }

  });
}
function addGLTF(url) {

  loader.load(url, function (gltf) {

    scene.add(gltf.scene);

    gltf.scene.traverse(function (object) {
      object.frustumCulled = false;
      if (object.isMesh) {
        object.material.side = THREE.DoubleSide;
      }
    });

    var mixer = new THREE.AnimationMixer(gltf.scene);
    mixers.push(mixer);
    if (!gltf.animations) return;

    gltf.animations.forEach(function (anim) {
      var action = mixer.clipAction(anim);
      var max = Math.max;
      actions.push(action);
      action.play();
      GUI.Duration = max(GUI.Duration, anim.duration);
      Scene.Duration = max(Scene.Duration, anim.duration);
    });

  }, function (xhr) {
    GUI.LoadingXHR((xhr.loaded / xhr.total) * 100);
  });
}

function initCamera() {
  var size = GUI.Size();
  camera = new THREE.PerspectiveCamera(75, size.ratio, 0.1, 1000);
  camera.position.set(0, 0, 5);
  var control = new OrbitControls(camera, container[0]);
  control.update();
  control.enablePan = true;
  Scene.on("update", function () {
    var size = GUI.Size();
    camera.aspect = size.ratio;
    camera.updateProjectionMatrix();
    control.update();
  });
}

function initScene() {
  var size = GUI.Size();
  renderer = new THREE.WebGLRenderer({ antialias: true });
  scene = new THREE.Scene();
  container[0].appendChild(renderer.domElement);
  Scene.Canvas = renderer.domElement;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x222222, 1.3));
  scene.background = new THREE.Color(0x111111);

  Scene.on("update", function () {
    var size = GUI.Size();
    renderer.setSize(size.width, size.height);
    renderer.render(scene, camera);
  });
}


function animate() {
  requestAnimationFrame(animate);
  eventEmitter.emit("update", clock.getDelta());
}

export default Scene;