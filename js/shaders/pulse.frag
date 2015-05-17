#ifdef GL_ES
precision highp float;
#endif

uniform float delta;
uniform float alpha;
varying vec2 vUv;        

void main(void) {

    vec2 position = vUv;

    float color = position.x * (1.0 + cos(delta))/2.0;
    float size = (10.0) * 0.01;
	
	if( distance(  mod(position,size) - vec2(size/2.0,size/2.0),vec2(0.0,0.0)) < 0.03)
		gl_FragColor = vec4( vec3( color * 2.0, 0.5, sin( color + delta / 3.0 ) * 0.75 ), 1.0 );
	else 
		gl_FragColor = vec4(0,0,0,1);
}