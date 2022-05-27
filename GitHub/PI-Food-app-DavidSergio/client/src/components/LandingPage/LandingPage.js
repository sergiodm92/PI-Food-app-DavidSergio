import React from 'react'
import { Link } from 'react-router-dom';

import './LandingPage.css'

function LandingPage() {
    return (
    	<div className="background">
        	<h1>Welcome to your recipe page</h1>
			<div className="contenedor-botones">
        		<Link className="link" to='/home'>
					<button className="boton seis">
						<span>Entry</span>
						<svg>
							<rect x="0" y="0" fill="none"></rect>
						</svg>
					</button>
            	</Link>
			</div>
		</div>
    );
};

export default LandingPage;
