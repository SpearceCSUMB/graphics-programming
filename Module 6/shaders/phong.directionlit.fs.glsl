precision mediump float;

uniform vec3 uLightDirection;
uniform vec3 uCameraPosition;
uniform sampler2D uTexture;

varying vec2 vTexcoords;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;

void main(void) {
    // diffuse contribution
    // 1. normalize the light direction and store in a separate variable
    vec3 lightDirNormalized = normalize(uLightDirection);

    // 2. normalize the world normal and store in a separate variable
    vec3 worldNormalNormalized = normalize(vWorldNormal);
    // 3. calculate the lambert term
    float lambert = dot(lightDirNormalized,worldNormalNormalized);
    
    // specular contribution
    // 1. in world space, calculate the direction from the surface point to the eye (normalized)
    vec3 eyeVector = normalize(uCameraPosition - vWorldPosition);
    // 2. in world space, calculate the reflection vector (normalized)
    vec3 reflectVector = reflect(-lightDirNormalized,worldNormalNormalized);
    // 3. calculate the phong term
    float phongTerm = max(dot(reflectVector, eyeVector), 0.0);
    phongTerm = pow(phongTerm, 64.0);

    vec3 albedo = texture2D(uTexture, vTexcoords).rgb;
    // 2. apply light and material interaction for phong, assume phong material color is (0.3, 0.3, 0.3)
    vec3 diffuseColor = albedo * vec3(1,1,1) * lambert;
    vec3 specularColor = albedo * vec3(0.3, 0.3, 0.3) * phongTerm;
    vec3 ambient = albedo * 0.1;
    
    vec3 finalColor = ambient + diffuseColor + specularColor;

    gl_FragColor = vec4(finalColor, 1.0);


}
