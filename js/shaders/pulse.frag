#ifdef GL_ES
precision highp float;
#endif

uniform float delta;
uniform float alpha;

// for lighting
uniform vec3 spotLightColor[MAX_SPOT_LIGHTS];
uniform vec3 spotLightPosition[MAX_SPOT_LIGHTS];
uniform float spotLightDistance[MAX_SPOT_LIGHTS];
varying vec3 vecPos;
varying vec3 vecNormal;

varying vec2 vUv;     

void main(void) {

    vec2 position = vUv;

    // Pretty basic lambertian lighting...
    vec4 addedLights = vec4(0.0,0.0,0.0, 1.0);
    for(int l = 0; l < MAX_SPOT_LIGHTS; l++) {
        vec3 lightDirection = normalize(vecPos
                              -spotLightPosition[l]);
        addedLights.rgb += clamp(dot(-lightDirection,
                                 vecNormal), 0.1, 1.0)
                           * spotLightColor[l];
    }

    float color = position.x * (1.0 + cos(delta * 10.0))/2.0;
    float size = (10.0) * 0.01;
	
	if( distance(  mod(position,size) - vec2(size/2.0,size/2.0),vec2(0.0,0.0)) < 0.03)
		gl_FragColor = vec4( vec3( color * 2.0, 0.5, sin( color + (delta * 10.0) / 3.0 ) * 0.75 ), 1.0 ) * addedLights;
	else 
		gl_FragColor = vec4(0,0,0,alpha) * addedLights;
}