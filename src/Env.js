import * as THREE from 'three';


var 
sceneCam,
envCam,
envScene;

var Env = {
  /**
   * @param {THREE.Camera} camera Scene camera
   */
  Init : function(camera, renderer, scene) {
    console.log("CAM " , camera);
    renderer.autoClear = false;
    sceneCam = camera;
    envCam = new THREE.PerspectiveCamera( 70, camera.aspect, 1, 100000 );
    envScene = new THREE.Scene();
    var texture = textureFromURL("img/halong.jpg");
    var equirectShader = THREE.ShaderLib[ "equirect" ];
    var equirectMaterial = new THREE.ShaderMaterial( {
					fragmentShader: equirectShader.fragmentShader,
					vertexShader: equirectShader.vertexShader,
					uniforms: equirectShader.uniforms,
					depthWrite: false,
					side: THREE.BackSide
    } );
    equirectMaterial.uniforms[ "tEquirect" ].value = texture;
    var env = new THREE.Mesh( new THREE.BoxBufferGeometry( 1000, 1000, 1000), equirectMaterial);
    envScene.add(env);
    
    scene.on("update", function() {
      envCam.rotation.copy(sceneCam.rotation);
      renderer.render( envScene, envCam );
    });
  }
}

function textureFromURL(url) {
  var textureLoader = new THREE.TextureLoader();
  var textureEquirec = textureLoader.load( url );
  textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
  textureEquirec.magFilter = THREE.LinearFilter;
  textureEquirec.minFilter = THREE.LinearMipMapLinearFilter;
  return textureEquirec;
}




export default Env;
