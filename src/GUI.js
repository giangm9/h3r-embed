import $ from 'jquery'
import Scene from './3DScene.js'



var 
  GUI = {
    Duration : 0.0,
    Time : 0.0
  },
  container,
  btnPlay,
  slider;


GUI.Init = function() {
  container   = $("body");
  initPlayBtn();
  initSlider();
}


GUI.SetTime = function(time) {
  GUI.Time = time;
  var ratio = GUI.Duration == 0 ? 0 : GUI.Time / GUI.Duration;
  slider.val(ratio);
}

GUI.UpdateState = function() {
  if (Scene.State == "play") {
    btnPlay.attr("src", "img/pause.png");
  } else {
    btnPlay.attr("src", "img/play.png");
  }
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

function initSlider() {
  slider = $(".h3r-time-slider").first();
  slider
    .mousedown(() => Scene.Pause())
    .mousemove(() => Scene.Time = GUI.Duration * slider.val())
    .mouseup(() => Scene.Play());

  Scene.on("update", function() {
    if (Scene.State != 'play') return;
    var ratio = Scene.Duration == 0 ? 0 : Scene.Time / Scene.Duration;
    slider.val(ratio)
  });
}

function initPlayBtn() {
  btnPlay = $(".h3r-play-icon");
  btnPlay.click(function()  {
    Scene.Toggle();
    GUI.UpdateState();
  });
}

export default GUI 
