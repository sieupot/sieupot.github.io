export class Footer {
	constructor() {
		$('body').append(this.footerPanel);
	}

	footerPanel =
		`
	    <footer>
	        © 2021 All rights reserved. Teodor GUTAN.
	    </footer>
		`;
}
