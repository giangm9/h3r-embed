import * as queryString from 'query-string' 
import $ from 'jquery'
import GUI from './GUI.js'
import Scene from './3DScene.js'

function GetURL() {
  return queryString.parse(window.location.search).url;
}

$(() => {
  GUI.Init(); 
  Scene.Init();
  $.get(GetURL(), function(raw) {
    var data = JSON.parse(raw); 
    Scene.Load(data); 
  }).fail(() => console.log("error")) 
})
