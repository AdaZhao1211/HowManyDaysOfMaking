var loaded = function(){
  var cc = document.getElementById("myCanvas");
  var gl = cc.getContext('webgl');
  console.log('get webgl');
  if(!gl){
    gl = cc.getContext('experimental-webgl');
    console.log("experimental-webgl");
  }
  if(!gl){
    alert("Your browser doesn't support WEBGL");
  }
  gl.clearColor(0.75, 0.85, .8, 1.);//R,G,B,A
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
