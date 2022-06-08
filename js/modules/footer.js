export class Footer {
	constructor () {
		jQuery('body').append(this.footerPanel);
	}

	footerPanel = 
	 `
	    <footer>
	        © 2021 All rights reserved. Teodor GUTAN.
	    </footer>
	`;
}
