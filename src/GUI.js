import $ from 'jquery'
import * as Scene from './3DScene.js'



var 
  container,
  duration,
  currentTime,
  btnPlay;


function Init() {
  duration    = 0.0;
  currentTime = 0.0;
  container   = $("body");

  initPlayButton();
//  initVolume();
//  initSlider();
}

function initVolume() {
  var voldiv = $("<div class='h3r-volume-wrapper'></div>");
  var vol = $("<input type='range' class='h3r-volume-slider' min='0.0' max='1.0' step='any'>");
  var label = $("<p> vol </p>");
  vol.val(1);
  this.jVolume = vol;

  voldiv.append(label);
  voldiv.append("&nbsp;");
  voldiv.append(vol);
  voldiv.css({
    "position": "absolute", 
    "right" : "2%",
    "bottom" : "0%"
  });
  label.css({
    "display" : "inline-block"
  });

  vol.css({
    "vertical-align": "middle"
  });

  vol.on("input", function() {
    this.clip.audio.volume = this.jVolume.val();
  }.bind(this));
  
}

function Time(time) {
  this.currentTime = time ? time : this.currentTime;
  if (this.duration == 0) {
    this.jslider.val(0);
    return;
  };
  var ratio = this.currentTime / this.duration;
  this.jslider.val(ratio);
}

function ViewSize() {
  var 
    width = this.jviewContainer.width(),
    height = this.jviewContainer.height(); 
  return {
    width: width,
    height: height,
    ratio : width / height
  };
}

function initSlider(){
  var slider = $("<input type='range' class='h3r-slider' min='0.0' max='1.0' step='any'>");
  this.jslider = slider;

  this.jGUIcontainer.append(slider);
  slider.css( {
    "display" : "inline-block",
    "width" : "99%"
  });

  slider
  .mousedown(function() {
    this.clip.Pause();
  }.bind(this))
  .mousemove(function() {
    var time = this.duration * this.jslider.val();
    this.clip.Time(time);
    this.updateState();
  }.bind(this))
  .mouseup(function() {
    this.clip.Play();
    this.updateState();
  }.bind(this));


}

function initPlayButton() {
  UpdateState();
}


function UpdateState() {
//  btnPlay.html(Scene.state == "pause" ? "Play" : "Pause");
}

export default {
  Init        : Init,
  UpdateState : UpdateState,
  Time        : Time
}
