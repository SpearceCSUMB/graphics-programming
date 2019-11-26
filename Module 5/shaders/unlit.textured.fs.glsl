//Authors: Samuel Pearce and Kevin Bentley
precision mediump float;

uniform sampler2D uTexture;
uniform float uAlpha;

varying vec2 newTexCoord;

void main(void) {
    //gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
    //gl_FragColor = vec4(newTexCoord.x, newTexCoord.y, 0.0, uAlpha);
    gl_FragColor = texture2D(uTexture, newTexCoord);
    gl_FragColor.a = uAlpha;
}
