let scorePanel = `
<head>
    <script defer src="../js/lib/xlsx.full.min.js"></script>
    <script defer src="../js/activityTimer.js"></script>

    <link rel="stylesheet" href="../css/activityTimer.css">
    <link rel="stylesheet" href="../css/fonts.css">
    <link rel="stylesheet" href="../css/scorePanel.css">
    <link rel="stylesheet" href="../css/fontawesome-free-5.15.3-web/css/all.css">
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
          <input type="button" name="download results" title="descarcă rezultate Excel (.xlsx)" onclick="showDlResultsPopup();" class="dl-res-btn"/>

          <table id="tblExportId" style="display:none"></table>

          <div id="downloadResultsFormId" class="score-modal" style="display: none;">
            <div class="modal-content">
              <div class="modal-title">
                <span class="title">Export rezultate</span>
                <span class="close" onclick="dlResultsModalPanel.hide();"><i class="fa fa-times"></i></span>
              </div>

              <div id="modalScorePanelFormId">
                <input type="text" name="name" id="patientNameInputId" placeholder="Nume copil" class="score-export-input"/>
                <input type="number" name="name" id="patientAgeInputId" placeholder="Vârstă copil (ani)" class="score-export-input" min="1" max="200" onkeydown="return isNumberKey(event);"/>
              </div>
              <hr id="modalScoreSeparatorId"/>
              <div id="modalScoreButtonsId">
                <button type="button" name="Anulează" class="side-button width-150-px" onclick="dlResultsModalPanel.hide();"><i class="fa fa-times"></i> Anulează</button>
                <span style="width: 10px; display: inline-block;"></span>
                <button type="button" name="Descarcă" title="descarcă rezultate Excel (.xlsx)" class="main-button width-150-px" onclick="fnExcelReport();"><i class="fa fa-download"></i> Descarcă</button>
              </div>
            </div>
          </div>
        </div>
      </div>
`;

jQuery('#scorePanelId').append(scorePanel);
const dlResultsModalPanel = jQuery('#downloadResultsFormId');

const showDlResultsPopup = () => {
  dlResultsModalPanel.show(0, () => {
    document.querySelector('#patientNameInputId').focus();
  });
}

const fnExcelReport = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  const hh = String(today.getHours()).padStart(2, '0');
  const mm = String(today.getMinutes()).padStart(2, '0');

  const date = `${dd}/${MM}/${yyyy}`;
  const time = `${hh}:${mm}`;
  const activityDuration = `${document.querySelector('#timerId > #minutes').innerHTML}:${document.querySelector('#timerId > #seconds').innerHTML}`;

  const exportResultDataBuilder = new ExportResultDataBuilder(date, time, document.title, document.querySelector('#patientNameInputId').value, document.querySelector('#patientAgeInputId').value, document.querySelector('#scoreCountGoodId').innerHTML, document.querySelector('#scoreCountBadId').innerHTML, activityDuration);

  const workbook = XLSX.utils.book_new();

  //var worksheet_data  =  [['hello','world']];
  //var worksheet = XLSX.utils.aoa_to_sheet(worksheet_data);

  const worksheet_data = document.querySelector("#tblExportId");
  worksheet_data.innerHTML = exportResultDataBuilder.buildExportHTMLRows();
  const worksheet = XLSX.utils.table_to_sheet(worksheet_data);

  workbook.SheetNames.push("Rezultate activitate");
  workbook.Sheets["Rezultate activitate"] = worksheet;

  XLSX.writeFile(workbook, "rezultate.xlsx");

  dlResultsModalPanel.hide();
}

const ExportResultDataBuilder = class {
  constructor(dateString, timeString, activityName, patientName, patientAge, scoreCountGood, scoreCountBad, activityDurationString) {
    this.dateString = dateString;
    this.timeString = timeString;
    this.activityName = activityName;
    this.patientName = (patientName && patientName.trim()) ? patientName : '-';
    this.patientAge = (patientAge && patientAge.trim()) ? patientAge + ' (ani)' : '-';
    this.scoreCountGood = scoreCountGood;
    this.scoreCountBad = scoreCountBad;
    this.activityDurationString = activityDurationString;
  }
  // build the HTML table rows that will be used for rendering the xlsx data
  buildExportHTMLRows = () => {
    let rows = `<tr><td colspan="3" class="bold">Activitatea:</td><td colspan="4" class="bold">${this.activityName}</td></tr>`;
    rows += `<tr><td colspan="3">Data:</td><td colspan="4">${this.dateString}</td></tr>tr>`;
    rows += `<tr><td colspan="3">Ora:</td><td colspan="4">${this.timeString}</td></tr>`;
    rows += '<tr><td colspan="7"/></tr>';
    rows += `<tr><td colspan="3" class="bold">Nume copil:</td><td colspan="4" class="bold">${this.patientName}</td></tr>`;
    rows += `<tr><td colspan="3" class="bold">Vârstă  copil:</td><td colspan="4" class="bold">${this.patientAge}</td></tr>`;
    rows += '<tr><td colspan="7"/></tr>';
    rows += '<tr><td colspan="7">Scor</td></tr>';
    rows += `<tr><td colspan="3" class="bold">Răspunsuri corecte:</td><td>${this.scoreCountGood}</td></tr>`;
    rows += `<tr><td colspan="3" class="bold">Răspunsuri greșite:</td><td>${this.scoreCountBad}</td></tr>`;
    rows += `<tr><td colspan="3" class="bold">Durată activitate (minute:secunde):</td><td colspan="4">${this.activityDurationString}</td></tr>`

    return rows;
  };
}
