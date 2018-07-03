import * as THREE from 'three'
import GLTFLoader from "three-gltf-loader"
import { OrbitControl } from "three-addons"
import * as EventEmitter from 'events'
import GUI from './GUI.js'

var 
  clock    = new THREE.Clock(),
  scene    = new THREE.Scene(),
  duration = 0,
  time     = 0,
  state    = "play", //pause
  actions  = [];

function Init() {
   
}

export default {
  Init: Init
}

