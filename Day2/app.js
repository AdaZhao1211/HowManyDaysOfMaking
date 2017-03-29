var vertexShaderText =
[
  'precision mediump float;',
  '',
  'attribute vec2 vertPosition;',
  '',
  'void main()',
  '{',
  ' gl_Position = vec4(vertPosition, .0, 1.);',
  '}'
].join('\n');

var fragmentShaderText =
[
  'precision mediump float;',
  '',
  'void main(){',
  ' gl_FragColor = vec4(1., .0, .0, 1.);',
  '}'
].join('\n');

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
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(vertexShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);
  gl.compileShader(vertexShader);
  if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
    console.error("error: compile vertext shader", gl.getShaderInfoLog(vertexShader));
    return;
  }
  gl.compileShader(fragmentShader);
  if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
    console.error("error: compile fragment shader", gl.getShaderInfoLog(fragmentShader));
    return;
  }
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
    console.error("error: linking program", gl.getProgramInfoLog(program));
    return;
  }
  //only do this when testing
  gl.validateProgram(program);
  if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
    console.error("error: not validated", gl.getProgramInfoLog(program));
  }
  //create buffer, what graphic card will be using
  //canvas: -1 ~ 1
  var triangleVertices =
  [
    .0, .3,
    -.5, -.5,
    .5, -.5
    //float 64
  ];
  //memory in GPU that we are ready to use
  var triangleVertexBufferObj = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObj);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW); //sending data from CPU to GPU
  var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
  gl.vertexAttribPointer(
    positionAttribLocation,//attrib location
    2,//# elements in each attrib
    gl.FLOAT,//type of elements
    gl.FALSE,//data is normalized?
    2* Float32Array.BYTES_PER_ELEMENT,//size of individual vertex
    0
  );
  gl.enableVertexAttribArray(positionAttribLocation);
  //main render loop
  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3); //how many to skip, how many to draw

}
