precision mediump float;

uniform vec3 uLightDirection;
uniform vec3 uCameraPosition;
uniform sampler2D uTexture;

varying vec2 vTexcoords;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;

void main(void) {
    // todo - diffuse contribution
    // 1. normalize the light direction and store in a separate variable
    vec3 lightDirNormalized = normalize(uLightDirection);

    // 2. normalize the world normal and store in a separate variable
    vec3 worldNormalNormalized = normalize(vWorldNormal);
    // 3. calculate the lambert term
    float lambert = dot(lightDirNormalized,worldNormalNormalized);

    
    // todo - specular contribution
    // 1. in world space, calculate the direction from the surface point to the eye (normalized)
    vec3 eyeVector = normalize(uCameraPosition - vWorldPosition);
    // 2. in world space, calculate the reflection vector (normalized)
    vec3 reflectVector = reflect(-lightDirNormalized,worldNormalNormalized);
    // 3. calculate the phong term
    vec3 phongTerm = dot(worldNormalNormalized,reflectVector);

    vec3 albedo = texture2D(uTexture, vTexcoords).rgb;

    // todo - combine
    // 1. apply light and material interaction for diffuse value by using the texture color as the material
    // 2. apply light and material interaction for phong, assume phong material color is (0.3, 0.3, 0.3)

    vec3 ambient = albedo * 0.1;
    // vec3 diffuseColor = todo;
    // vec3 specularColor = todo;
    vec3 finalColor = ambient; // + diffuseColor + specularColor;

    //gl_FragColor = vec4(finalColor, 1.0);
    //gl_FragColor = vec4(lightDirNormalized, 1.0);
    //gl_FragColor = vec4(worldNormalNormalized, 1.0);
    gl_FragColor = vec4(lambert,lambert,lambert,1);
}
