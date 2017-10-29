import shaderVert from './shaders/custom.vert';
import shaderFrag from './shaders/custom.frag';

class Cube {
  constructor(size) {
    this.clock = new THREE.Clock();
    this.geometry = new THREE.BoxGeometry(size.width, size.height, size.depth);
    this.uniforms = {
      time: {
        value: 1.0
      },
      resolution: {
        value: new THREE.Vector2()
      }
    };
    this.uniforms.resolution.value.x = window.innerWidth;
    this.uniforms.resolution.value.y = window.innerHeight;
    this.material = new THREE.ShaderMaterial({
      vertexShader: shaderVert,
      fragmentShader: shaderFrag,
      uniforms: this.uniforms,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
  }

  onWindowResize( event ) {
    this.uniforms.resolution.value.x = window.innerWidth;
    this.uniforms.resolution.value.y = window.innerHeight;
  }

  update() {
    let delta = this.clock.getDelta();
    this.uniforms.time.value += delta * 5;
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
  }

  getMesh() {
    return this.mesh;
  }
}

export default Cube;
