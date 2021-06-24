let scorePanel = `
    <div id="scorePanel">
    <div id="scoreContainerId">
      <div id="scoreGood">
        <img src="../images/smileFace.png" alt="good answers" style="height: 25px;"/>
        <div>0</div>
      </div>
      <div id="scoreBad">
        <img src="../images/sadFace.png" alt="bad answers" style="height: 25px;"/>
        <div>0</div>
      </div>
    </div>
    <div id="downloadResultsContainerId">
      <input type="button" name="download results" title="descarcă rezultate" onclick="alert('În curând pe micile ecrane...');" class="dl-res-btn"/>
    </div>
  </div>
`;

jQuery('#scorePanelInjectorId').append(scorePanel);
