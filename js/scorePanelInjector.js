let scorePanel = `
<head>
    <script defer src="../js/lib/xlsx.full.min.js"></script>

    <link rel="stylesheet" href="../css/fonts.css">
    <link rel="stylesheet" href="../css/scorePanel.css">
</head>

      <div id="scorePanel">
        <div id="scoreContainerId">
          <div id="scoreGood">
            <img src="../images/smileFace.png" alt="good answers" style="height: 25px;"/>
            <div id="scoreCountGoodId">0</div>
          </div>
          <div id="scoreBad">
            <img src="../images/sadFace.png" alt="bad answers" style="height: 25px;"/>
            <div id="scoreCountBadId">0</div>
          </div>
        </div>
        <div id="downloadResultsContainerId">
          <input type="button" name="download results" title="descarcă rezultate" onclick="getPatientName();" class="dl-res-btn"/>

          <table id="tblExportId" style="display:none"></table>

          <div id="getNameDialogDiv"  class="modal">
            <div class="modal-content">
              <div class="modal-title">
                <span class="title">Export rezultate</span>
                <span class="close" onclick="nameModalPanel.hide();">&times;</span>
              </div>

              <div id="modalScorePanelFormId">
                <input type="text" name="name" id="patientNameInputId" placeholder="Nume copil" class="score-export-input text ui-widget-content ui-corner-all">
                <input type="text" name="age" id="patientAgeInputId" placeholder="Vârstă copil (ani)" class="score-export-input text ui-widget-content ui-corner-all">
              </div>
              <hr id="modalScoreSeparatorId"/>
              <div id="modalScoreButtonsId">
                <object></object>
                <button type="button" name="Cancel" class="side-button width-150-px" onclick="nameModalPanel.hide();">Cancel</button>
                <button type="button" name="Export" class="main-button width-150-px" onclick="fnExcelReport();">Export</button>
              </div>
            </div>
          </div>
        </div>
      </div>
`;

jQuery('#scorePanelInjectorId').append(scorePanel);
let nameModalPanel = jQuery('#getNameDialogDiv');

const getPatientName = () => {
  nameModalPanel.show(0, function(){
    document.getElementById('patientNameInputId').focus();
  });
}

const fnExcelReport = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  let hh = String(today.getHours()).padStart(2, '0');
  let mm = String(today.getMinutes()).padStart(2, '0');

  let date = dd + '/' + MM + '/' + yyyy;
  let time = hh + ':' + mm;
  let rows = `<tr><td style="text-align: right;">Data:</td><td colspan="2">${date}</td></td><td>Ora:</td><td colspan="2">${time}</td><</tr>`;
  rows += `<tr><td colspan="2" class="bold">Activitatea:</td><td colspan="4" class="bold">${document.title}</td></tr>`;
  rows += `<tr><td colspan="2" class="bold">Nume copil:</td><td colspan="4" class="bold">${document.getElementById('patientNameInputId').value}</td></tr>`;
  rows += `<tr><td colspan="2" class="bold">Vârstă  copil (ani):</td><td class="bold">${document.getElementById('patientAgeInputId').value}</td></tr>`;
  rows += `<tr></tr>`;
  rows += `<tr><td colspan="4">Scor:</td></tr>`;
  rows += '<tr><td colspan="2" class="bold">Răspunsuri corecte</td><td colspan="2" class="bold">Răspunsuri greșite</td></tr>';
  rows += `<tr><td colspan="2">${document.getElementById('scoreCountGoodId').innerHTML}</td><td colspan="2">${document.getElementById('scoreCountBadId').innerHTML}</td></tr>`;

  let workbook = XLSX.utils.book_new();

  //var worksheet_data  =  [['hello','world']];
  //var worksheet = XLSX.utils.aoa_to_sheet(worksheet_data);

  let worksheet_data = document.getElementById("tblExportId");
  worksheet_data.innerHTML = rows;
  let worksheet = XLSX.utils.table_to_sheet(worksheet_data);

  workbook.SheetNames.push("Rezultate activitate");
  workbook.Sheets["Rezultate activitate"] = worksheet;

  XLSX.writeFile(workbook, "rezultate.xlsx");

  nameModalPanel.hide();
}
