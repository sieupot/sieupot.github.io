export class UserSettingsMenu {
	constructor() {
		$('#headerMenuId').append(this.userSettingsContent);

		window.addEventListener('mousedown', (event) => {
			const pol = document.querySelector('#settingsPanelId');
			const userSettingsButton = document.querySelector('#userSettingsMenuButtonId'); // don't hide the settings panel when pressing clicking the "show user settings button"
			if (pol && event.target !== pol && event.target.parentNode !== pol && event.target.parentNode.parentNode !== pol && event.target != userSettingsButton) {
				pol.style.display = 'none';
			}
		});

		$('#userSettingsMenuButtonId').bind('mousedown', function() {
			let userSettingsObj = $('#userSettingsMenuId div.dropdown-content');
			if (userSettingsObj.is(":hidden")) {
				userSettingsObj.slideDown('fast');
			} else {
				userSettingsObj.hide();
			}
		})
	}

	userSettingsContent = `
	    <div id="userSettingsMenuId">
	      <div id="userSettingsMenuButtonId" class="pointer-cursor"
	           onmousedown="document.querySelector('#delayOutputId').value = getCommandRepeatInterval(false);
	                        document.querySelector('#delayRepeatCommandInputId').value = getCommandRepeatInterval(false);
	                        document.querySelector('#displayActivityTimerInputId').checked = getDisplayActivityTimer();">
	  
	      </div>
	      <div id="settingsPanelId" class="dropdown-content">
	        <div id="settingsPanelTitleId">Setări</div>
	  
	        <label for="delayRepeatCommandInputId">Interval repetare comandă: </label>
	        <output for="delayRepeatCommandInputId" id="delayOutputId">15</output>
	        <output for="delayRepeatCommandInputId" style="font: normal normal bold 22px/37px Poppins-300-italic;"> secunde</output>
	        <input id="delayRepeatCommandInputId" type="range" min="5" max="35" step="5" class="slider-round"
	               oninput="document.querySelector('#delayOutputId').value = value; setSessionProperty('commandRepeatIntervalSeconds', value);"/>
	  
	        <label class="checkbox-container">
	          Afișare durată activitate:
	          <input id="displayActivityTimerInputId" type="checkbox"
	                 onchange="setSessionProperty('displayActivityTimer', document.querySelector('#displayActivityTimerInputId').checked);"/>
	          <span class="checkmark"></span>
	        </label>
	      </div>
	    </div>
	`;
}
