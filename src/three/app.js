class App {
	constructor() {
		this.objects = [];
		this.createScene();
	}

	createScene() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000 );
		this.camera.position.z = 20;
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		document.body.appendChild( this.renderer.domElement );
		window.addEventListener( 'resize', this.onWindowResize.bind( this ), false );
		this.render();
	}

	onWindowResize( event ) {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
	}

	render() {
		requestAnimationFrame( () => {
			this.render();
		} );
		this.objects.forEach( ( object ) => {
			object.update();
		} );
		this.renderer.render( this.scene, this.camera );
	}

	add( mesh ) {
		this.objects.push( mesh );
		this.scene.add( mesh.getMesh() );
	}
}
export default App;
