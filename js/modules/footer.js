export class Footer {
	constructor() {
		$('body').append(this.footerPanel);
	}

	footerPanel =
		`
	    <footer>
	        © ${new Date().getFullYear()} All rights reserved. Teodor GUTAN.
	    </footer>
		`;
}
