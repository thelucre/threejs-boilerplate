varying vec2 vUv;

// for lighting
varying vec3 vecPos;
varying vec3 vecNormal;

uniform float delta;

void main() {

    vUv = uv;

    vec3 p = position;

    p.z += sin(2.0 * p.y + delta * 2.0) * 01.0;

    // p.z += cos(2.0 * p.z + delta / 2.0) * 5.0;

    p.y += cos(2.0 * p.x + delta * 2.0) * 0.4;

    p.x += sin(p.y + (delta * 2.0) / 3.0) * 01.0;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0 );

    // Since the light is on world coordinates,
    // I'll need the vertex position in world coords too
    // (or I could transform the light position to view
    // coordinates, but that would be more expensive)
    vecPos = (modelMatrix * vec4(p, 1.0 )).xyz;
    // That's NOT exacly how you should transform your
    // normals but this will work fine, since my model
    // matrix is pretty basic
    vecNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
    gl_Position = projectionMatrix * viewMatrix *
                  vec4(vecPos, 1.0);

}