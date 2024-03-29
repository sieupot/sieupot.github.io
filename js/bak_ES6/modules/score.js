export class Score {
	constructor(hasDistractors, nbDistractors) {
		const scorePanel = `
		    <object type="text/xml" style="display: none;">
		        <script defer src="../js/lib/xlsx.full.min.js"></script>
		    
		        <link rel="stylesheet" href="../css/activityTimer.css">
		        <link rel="stylesheet" href="../css/fonts.css">
		        <link rel="stylesheet" href="../css/scorePanel.css">
		        <link rel="stylesheet" href="../css/fontawesome-free-6.2.0-web/css/all.css">
		    </object>
		
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
		        <input id="dlResBtnId" type="button" name="download results" title="descarcă rezultate Excel (.xlsx)" class="dl-res-btn"/>
		
		        <table id="tblExportId" style="display:none"></table>
		
		        <div id="downloadResultsFormId" class="score-modal" style="display: none;">
		          <div class="modal-content">
		            <div class="modal-title">
		              <span class="title">Export rezultate</span>
		              <span class="close" onclick="this.dlResultsModalPanel.hide();"><i class="fa fa-times"></i></span>
		            </div>
		
		            <div id="modalScorePanelFormId">
		              <input type="text" name="name" id="patientNameInputId" placeholder="Nume copil" class="score-export-input"/>
		              <input type="number" name="name" id="patientAgeInputId" placeholder="Vârstă copil (ani)" class="score-export-input" min="1" max="200" onkeydown="return isNumberKey(event);"/>
		            </div>
		            <hr id="modalScoreSeparatorId"/>
		            <div id="modalScoreButtonsId">
		              <button type="button" id="cancelDlResBtnId" name="Anulează" class="side-button width-150-px"><i class="fa fa-times"></i> Anulează</button>
		              <span style="width: 10px; display: inline-block;"></span>
		              <button type="button" id="dlExportBtnId" name="Descarcă" title="descarcă rezultate Excel (.xlsx)" class="main-button width-150-px"><i class="fa fa-download"></i> Descarcă</button>
		            </div>
		          </div>
		        </div>
		      </div>
		    </div>
		`;
		$('#scorePanelId').append(scorePanel);

		this.activityName = document.title;
		this.hasDistractors = hasDistractors;
		this.nbDistractors = nbDistractors;
		this.answerReactionTimeItems = [];

		this.dlResultsModalPanel = $('#downloadResultsFormId');

		const objInstance = this;
		$("#dlResBtnId").bind("click", function() {
			objInstance.showDlResultsPopup();
		});
		$("#cancelDlResBtnId").bind("click", function() {
			objInstance.dlResultsModalPanel.hide();
		});
		$("#dlExportBtnId").bind("mousedown", function() {
			objInstance.fnExcelReport();
		});
	}

	showDlResultsPopup = () => {
		this.dlResultsModalPanel.show(0, () => {
			document.querySelector('#patientNameInputId').focus();
		});
	}

	fnExcelReport = () => {
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
		let worksheet = XLSX.utils.table_to_sheet(worksheet_data);
		workbook.SheetNames.push("Rezultate activitate");
		workbook.Sheets["Rezultate activitate"] = worksheet;

		// reaction times sheet
		worksheet_data.innerHTML = this.buildExportReactionTimesHTMLRows();
		worksheet = XLSX.utils.table_to_sheet(worksheet_data);
		workbook.SheetNames.push("Timpi de raspuns");
		workbook.Sheets["Timpi de raspuns"] = worksheet;

		XLSX.writeFile(workbook, "rezultate.xlsx");

		this.dlResultsModalPanel.hide();
	}

	addAnswerReactionTimeItem(startDateTime, challengeName) {
		const answerReactionTimeItem = new AnswerReactionTimeItem(startDateTime, challengeName);
		this.answerReactionTimeItems.push(answerReactionTimeItem);
	}

	updateFailuresCurrentAnswerReactionTimeItem = () => {
		++this.answerReactionTimeItems[this.answerReactionTimeItems.length - 1].nbFailures;
	}

	completeCurrentActionReactionTimeItem(endDateTime) {
		this.answerReactionTimeItems[this.answerReactionTimeItems.length - 1].challengeEndDateTime = endDateTime;
	}

	buildExportReactionTimesHTMLRows = () => {
		let rows = `<tr><td colspan="2">Nume activitate:</td><td colspan="4">${this.activityName}</td></tr>`;
		if (this.hasDistractors) {
			rows += `<tr><td colspan="2">Numar distractori:</td><td>${this.nbDistractors}</td></tr>`;
		}
		rows += '<tr/>';
		rows += '<tr><td colspan="2">DENUMIRE SARCINA</td><td colspan="4">DURATA INDEPLINIRE SARCINA (min:sec)</td><td colspan="4">NUMAR RASPUNSURI GRESITE/SARCINA</td></tr>';
		for (const answerReactionTimeItem of this.answerReactionTimeItems) {
			if (answerReactionTimeItem.isComplete()) {
				rows += answerReactionTimeItem.buildExportHTMLRow();
			}
		}
		return rows;
	}

}

const ExportResultDataBuilder = class {
	constructor(dateString, timeString, activityName, patientName, patientAge, scoreCountGood, scoreCountBad, activityDurationString) {
		this.dateString = dateString;
		this.timeString = timeString;
		this.activityName = activityName;
		this.patientName = (patientName && patientName.trim()) ? patientName : '-';
		this.patientAge = (patientAge && patientAge.trim()) ? `${patientAge} (ani)` : '-';
		this.scoreCountGood = scoreCountGood;
		this.scoreCountBad = scoreCountBad;
		this.activityDurationString = activityDurationString;
	}

	// build the HTML table rows that will be used for rendering the xlsx data
	buildExportHTMLRows = () => {
		let rows = `<tr><td colspan="3" class="bold">Nume activitate:</td><td colspan="4" class="bold">${this.activityName}</td></tr>`;
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

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
class AnswerReactionTimeItem {
	constructor(challengeStartDateTime, challengeName) {
		this.challengeName = challengeName;
		this.challengeStartDateTime = challengeStartDateTime;
		this.challengeEndDateTime = 0;
		this.nbFailures = 0; // how many wrong answers were given until the correct answer was chosen
	}

	buildExportHTMLRow = () => {
		return `<tr><td colspan="2">${this.challengeName}</td><td colspan="4">${this.getMinutesSecondsDelta()}</td><td colspan="4">${this.nbFailures}</td></tr>`;
	}

	isComplete() {
		return this.challengeEndDateTime > this.challengeStartDateTime;
	}

	getMinutesSecondsDelta = () => {
		const deltaDate = new Date(this.challengeEndDateTime - this.challengeStartDateTime);
		return `${pad(deltaDate.getMinutes())}:${pad(deltaDate.getSeconds())}`;
	}
}
/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
