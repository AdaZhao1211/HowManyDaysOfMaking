varying vec3 vPos;
float D(float x, float y, float r){
  float b = 1 - (x*x + y*y)/(r*r);
  return b > 0. ? 1.: 0.;
}
void main() {
  float x = vPos.x;
  float y = vPos.y;
   vec3 c = vec3(.05,.12,.3);
   c = mix(vec3(.6, .6, .1), c, .5+.5*y);
   float d = D(x, y, .9);
   if(d) > 0.){
     c*= .8;
   }
   gl_FragColor = vec4(sqrt(c), 1.);             // Final pixel color
}




                           // position in image

   vec3 c = vec3(.05,.12,.3);                    // Blue sky.
   c = mix(vec3(.045,.02,.02), c, .5+.5*y);      // Sky color gradient

   float d = D(x, y, .9);
   if (d > 0.)
      c *= .8;

   gl_FragColor = vec4(sqrt(c), 1.);             // Final pixel color
}
