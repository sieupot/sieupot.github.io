const infoPanel = jQuery('#infoPanel');
let pgLocationMsg = parseDynamicJsString(infoPanel.attr('pgLocationMsg'));
let pgDescriptionMsg = parseDynamicJsString(infoPanel.attr('pgDescriptionMsg'));

let infoPnlContent = `
  <div>
    <svg viewBox="0 0 100% 100%" xmlns="http://www.w3.org/2000/svg" height="200"
         class="pointer-cursor"
         onclick="document.location = 'index.html';">
      <title>Acasă</title>
      <svg xmlns="http://www.w3.org/2000/svg">
         <circle cx="55" cy="35" r="160" fill="#F9F4EF" opacity=".23"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg">
        <circle cx="55" cy="35" r="127" fill="#F9F4EF" opacity=".57"/>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" x="80" y="40">
        <image xlink:href="images/app/logo_symbol.svg" height="56" width="56"/>
        <text y="95" style="font: normal normal bold 36px/52px Poppins-600-normal;">
          <tspan style="fill: #FAA01C;">șieu</tspan><tspan style="fill: #226473;">pot</tspan>
        </text>
      </svg>
    </svg>
  </div>

  <div id="infoPanelMsgsContainerId">
    <hr style="margin-top: 35px;">
    <div id="welcomeTextId">${pgLocationMsg}</div>
    <div id="chooseLevelTextId">${pgDescriptionMsg}</div>
    <hr>
  </div>
`;

infoPanel.append(infoPnlContent);
