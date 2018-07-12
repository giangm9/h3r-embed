# HMI's 3D Renderer 
 
H3R is a 3D scene renderer, render .h3r files
## .H3R file
Structure of a .h3r file  
```
{
  "bgm" : <audio_url>
  "gltf" : [ <gltf_url> * ]
}
```
for example 
```
{
    "bgm" : ".mp3"
    "gltf": ["https://github.com/KhronosGroup/glTF-Sample-Models/raw/master/2.0/Monster/glTF-Binary/Monster.glb",
      "https://github.com/KhronosGroup/glTF-Sample-Models/raw/master/2.0/VC/glTF-Binary/VC.glb"]
}
```

## Renderer
To render a .h3r file, just use an iframe 
```html
<iframe src="?url=[url_to_h3r_file]">
</iframe>
```

see [wiki](https://github.com/giangm9/h3r-embed/wiki/H3R-Wiki) to get the build instruction