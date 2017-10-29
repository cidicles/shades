import _ from 'lodash';
import './app.sass';
import App from './three/app';
import Cube from './three/cube';

let app = new App();
app.add( new Cube( {
	width: 10,
	height: 10,
	depth: 10
} ) );
