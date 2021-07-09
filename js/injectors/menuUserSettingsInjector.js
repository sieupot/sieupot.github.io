const menuPanel = jQuery('#headerMenuId');

let userSettingsContent = `
  <div id="userSettingsMenuId">
    <div id="userSettingsMenuButtonId" class="pointerCursor"
         onclick="document.querySelector('#delayOutputId').value = getCommandRepeatInterval(false);
                  document.querySelector('#delayRepeatCommandInputId').value = getCommandRepeatInterval(false);
                  jQuery('#userSettingsMenuId div.dropdown-content').slideDown('fast');">

    </div>
    <div id="settingsPanelId" class="dropdown-content">
      <div id="settingsPanelTitleId">Setări</div>

      <label for="delayRepeatCommandInputId" style="font: normal normal bold 22px/37px Poppins-300-normal;">Interval repetare comandă: </label>
      <output for="delayRepeatCommandInputId" id="delayOutputId">15</output>
      <output for="delayRepeatCommandInputId" style="font: normal normal bold 22px/37px Poppins-300-italic;"> secunde</output>
      <input id="delayRepeatCommandInputId" type="range" min="5" max="35" step="5" class="slider-round"
             oninput="document.querySelector('#delayOutputId').value = value; setSessionProperty('commandRepeatIntervalSeconds', value);"/>
    </div>
  </div>
`;
// inject content
menuPanel.append(userSettingsContent);

window.addEventListener('mouseup',function(event){
  var pol = document.querySelector('#settingsPanelId');
  if(pol && event.target !== pol && event.target.parentNode !== pol){
    pol.style.display = 'none';
  }
});
