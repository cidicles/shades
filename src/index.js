import _ from 'lodash';
import './app.sass';
import App from './three/app';
import Shades from './three/shades';

let app = new App();

app.add(
	new Shades({
		width: window.innerWidth,
		height: window.innerHeight
	})
);
