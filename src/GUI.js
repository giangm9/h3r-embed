import $ from 'jquery';
import Scene from './3DScene.js';

var GUI = {
  Duration: 0.0,
  Time: 0.0,
  Init: function () {
    container = $("body");
    initPlayBtn();
    initSlider();
    initLoading();
    initFullscreen();
  },
  SetTime: function (time) {
    GUI.Time = time;
    var ratio = GUI.Duration == 0 ? 0 : GUI.Time / GUI.Duration;
    slider.val(ratio);
  },
  UpdateState: function () {
    if (Scene.State == "play") {
      btnPlay.attr("src", "img/pause.png");
    } else {
      btnPlay.attr("src", "img/play.png");
    }
  },
  Size: function () {
    var width = container.width(),
      height = container.height();
    return {
      width: width,
      height: height,
      ratio: width / height
    };
  },

  LoadingXHR: function (percent) {
    if (percent == 100) {
      loading.hide();
      return;
    }
    loading.show();
    loading.html("LOADING(" + percent.toPrecision(2) + "%)");
  }


};

var container,
  btnPlay,
  slider,
  loading;





function initFullscreen() {
  $(".h3r-fullscreen").click(function () {
    var elem = container[0] || document.documentElement;
      if (!document.fullscreenElement && !document.mozFullScreenElement &&
          !document.webkitFullscreenElement && !document.msFullscreenElement) {
          if (elem.requestFullscreen) {
              elem.requestFullscreen();
          } else if (elem.msRequestFullscreen) {
              elem.msRequestFullscreen();
          } else if (elem.mozRequestFullScreen) {
              elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) {
              elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
          }
      } else {
          if (document.exitFullscreen) {
              document.exitFullscreen();
          } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
          } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
          }
      }
    // if (el.webkitRequestFullScreen) {
    //   el.webkitRequestFullScreen();
    // } else {
    //   el.mozRequestFullScreen();
    // }
  });
}

function initLoading() {
  loading = $(".h3r-loading");
}

function initSlider() {
  slider = $(".h3r-time-slider").first();
  slider
    .mousedown(() => Scene.Pause())
    .mousemove(() => Scene.Time = GUI.Duration * slider.val())
    .mouseup(() => Scene.Play());

  Scene.on("update", function () {
    if (Scene.State != 'play') return;
    var ratio = Scene.Duration == 0 ? 0 : Scene.Time / Scene.Duration;
    slider.val(ratio);
  });
}

function initPlayBtn() {
  btnPlay = $(".h3r-play-icon");
  btnPlay.click(function () {
    Scene.Toggle();
    GUI.UpdateState();
  });
}

export default GUI;
