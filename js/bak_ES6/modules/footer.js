export class Footer {
	constructor() {
		const footerPanel =
			`
		    <footer>
		        © ${new Date().getFullYear()} All rights reserved. Teodor GUTAN.
		    </footer>
			`;
		$('body').append(footerPanel);
	}

}
