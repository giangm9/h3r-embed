import $ from 'jquery'
import * as Scene from './3DScene.js'


var 
  GUI = {},
  container,
  duration,
  currentTime,
  btnPlay;


GUI.Init = function() {
  duration    = 0.0;
  currentTime = 0.0;
  container   = $("body");
}


GUI.Size = function() {
  var width = container.width(),
    height = container.height();
  return {
    width: width,
    height: height,
    ratio : width / height
  }
}


export default GUI 
