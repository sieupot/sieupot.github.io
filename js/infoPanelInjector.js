const infoPanel = $('#infoPanel');
let pgLocationMsg = parseDynamicJsString(infoPanel.attr('pgLocationMsg'));
let pgDescriptionMsg = parseDynamicJsString(infoPanel.attr('pgDescriptionMsg'));


let infoPnlContent = `
  <div>
    <div id="logoId"></div>
    <div id="logoCircle"></div>
    <div id="logoImgId"></div>
    <div id="logoTxtId">
      <div id="logoTxt1Id">șieu</div>
      <div id="logoTxt2Id">pot</div>
    </div>
  </div>

  <div>
    <div id="welcomeTextId">${pgLocationMsg}</div>
    <div id="chooseLevelTextId">${pgDescriptionMsg}</div>
  </div>

  <div id="footerContainerId">
    <div id="footerCircle"></div>
    <div id="footerImgId"></div>
  </div>
`;

infoPanel.append(infoPnlContent);
