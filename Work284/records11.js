var newest = 0;
var activeElement = 'none';
var all_dx = "";
var all_plans = "";
var pt_count = 0;
const roomCount = 26;

function Room() {
  this.mine = false;
  this.disposed = false;
  this.wu_orders =  true;
  this.wu_workuppending =  false;
  this.wu_labspending =  true;
  this.wu_ua = false;
  this.wu_trop = false;
  this.wu_EKGresult = "";
  this.wu_imagingpending =  true;
  this.wu_CTresult = "";
  this.wu_procedurepending = false;
  this.wu_consult = false;
  this.wu_disposition = false;
  this.wu_admit = false;
  this.wu_discharge = false;
  this.admit_bedrequest = true;
  this.admit_discharge = true;
  this.admit_order = true;
  this.discharge_dx = true;
  this.discharge_instructions = true;
  this.discharge_prescriptions = true;
  this.discharge_referral = true;
  this.discharge_outptorders = true;
  this.discharge_worknote = true;
  this.wu_problems = "";
  this.wu_dx = "";
  this.wu_plan = "";
  this.note_hpi = true;
  this.note_ros = true;
  this.note_pe = true;
  this.note_course = true;
  this.note_consult = false;
  this.note_procedure = false;
  this.note_mdm = true;
  this.note_ct = false;
  this.note_ekg = true;
  this.note_disposition = true;
  this.note_sign = true;
  this.awaiting = [];
}

const room = [];
const default_room = new Room;

for (let i = 1; i < roomCount; i++){
  room[i] = new Room;
}


function displayRecords(){
  let j = 0;
  for (let i = 1; i < roomCount; i++) {
    if (room[i].mine == true){
      j = j + 1;
      createRecord(i,j);
    }
  }
  if (activeElement == 'none') {
  document.getElementById("rm"+String(newest)+"_dx").focus();
  }
  else {
    document.getElementById(activeElement).focus();
  }
}


function createRecord(i,j){
  var tree2 = document.createDocumentFragment();
  var x = document.createElement("button");
	if (i < 17) {
  		x.innerHTML = "Room "+String(i);
  }
  else {
    if (i == 25) {
		x.innerHTML = "Hallway";
	}
	  else {
		  x.innerHTML = "Front " + String(i-16);
	  }
  }
	console.log("disposed = " + x.disposed);
  if (x.disposed) {x.innerHTML = x.innerHTML + ' - disposed';}
  x.setAttribute("class","button2");
  x.setAttribute("name",i);
  x.setAttribute("id","Btn"+String(i));
 // x.setAttribute("width","70");
  x.setAttribute("onclick","deleteRoom(this.name)");
  tree2.appendChild(x);
  var x = document.createElement("table");
  x.innerHTML = '<tr><td style="vertical-align:  top;"><p id = "demo'+String(j)+'col1"></p></td><td style="vertical-align:  top;"><p id = "demo'+String(j)+'col2"></p></td></tr>';
  tree2.appendChild(x);
  tree2.appendChild(createTextbox(i));

  document.getElementById("demo"+String(j)).appendChild(tree2);
}

function createCheckboxes(){

  var tree = document.createDocumentFragment();
  t = createCheckbox(i,room[i].wu_orders,"Orders");
  tree.appendChild(t);
  t= createCheckbox(i,room[i].wu_workuppending,"Work up");
  tree.appendChild(t);
  if (room[i].wu_workuppending == true){
  //  tree.appendChild(indent());
    t =createCheckbox(i,room[i].wu_labspending,"&nbsp;&nbsp;&nbsp;Labs");
    tree.appendChild(t);
//    tree.appendChild(indent());
    t =createCheckbox(i,room[i].wu_imagingpending,"&nbsp;&nbsp;&nbsp;Imaging");
    tree.appendChild(t);
//    tree.appendChild(indent());
    t =createCheckbox(i,room[i].wu_procedurepending,"&nbsp;&nbsp;&nbsp;Procedure");
    tree.appendChild(t);
  }
  t =createCheckbox(i,room[i].wu_consult,"Consult");
  tree.appendChild(t);
  t= createCheckbox(i,room[i].wu_admit,"Admit");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].wu_discharge,"Discharge");
  tree.appendChild(t);
  if (room[i].wu_admit == true) {
//    tree.appendChild(indent());
    t = createCheckbox(i,room[i].admit_discharge,"Discharge ");
    tree.appendChild(t);
//    tree.appendChild(indent());
    t = createCheckbox(i,room[i].admit_order,"Order");
    tree.appendChild(t);
 //   tree.appendChild(indent());
    t = createCheckbox(i,room[i].admit_bedrequest,"Bed request");
    tree.appendChild(t);
  }
  if (room[i].wu_discharge == true) {
 //   tree.appendChild(indent());
    t = createCheckbox(i,room[i].discharge_dx,"Diagnoses");
    tree.appendChild(t);
//    tree.appendChild(indent());
    t = createCheckbox(i,room[i].discharge_prescriptions, "Prescriptions");
    tree.appendChild(t);
  //  tree.appendChild(indent());
    t = createCheckbox(i,room[i].discharge_referral,"Referral");
    tree.appendChild(t);
 //   tree.appendChild(indent());
    t = createCheckbox(i,room[i].discharge_instructions,"Instructions");
    tree.appendChild(t);
  //  tree.appendChild(indent());
    t = createCheckbox(i,room[i].discharge_outptorders,"Outpatient Orders");
    tree.appendChild(t);
 //   tree.appendChild(indent());
    t = createCheckbox(i,room[i].discharge_worknote,"Work Note");
    tree.appendChild(t);
  }
  
  var y = document.getElementById("demo"+String(j)+"col1")
  y.appendChild(tree);
 /* var tree = document.createDocumentFragment();
  t = createCheckbox(i,room[i].note_hpi,"HPI");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].note_course,"Course");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].note_consult,"Consult ");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].note_procedure,"Procedure ");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].note_mdm,"MDM");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].note_ct, "CT ");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].note_ekg,"EKG");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].note_disposition,"Disposition");
  tree.appendChild(t);
  t = createCheckbox(i,room[i].note_sign,"Sign");
  tree.appendChild(t);
  document.getElementById("demo"+String(j)+"col2").appendChild(tree);*/
}

function createCheckbox(i,flag,label) {
  var t = document.createDocumentFragment();
  var x = document.createElement("INPUT");
  x.setAttribute("type", "checkbox");
 // x.setAttribute("autocomplete","off");
  if (flag) {
	x.setAttribute("checked",true);
  }
  else {
	x.removeAttribute("checked");
  }
  x.setAttribute("label",label);
  var id = "rm"+String(i)+":"+label;
  x.setAttribute("id",label+"Checkbox"+String(i));
  x.setAttribute("name",label);
  x.setAttribute("onchange","checkboxChanged(this.checked,this.name,"+String(i)+")");
  t.appendChild(x);
  var x = document.createElement("label");
  x.htmlFor = i;
  x.innerHTML = label;
  t.appendChild(x);
  var x = document.createElement("br");
  t.appendChild(x);
  return(t);
  
}

function createLabel(i,text){
  var x = document.createElement("label");
  x.setAttribute("label",text);
  return(x);
}

function createTextbox(i) {
  var t = document.createDocumentFragment();
  var x = document.createElement("br");
  t.appendChild(x);
  var x = document.createElement("label");
  x.setAttribute("for","rm"+String(i)+"_dx");
  x.innerHTML = "Problems/diagnoses:";
  t.appendChild(x);
  var x = document.createElement("br");
  t.appendChild(x);
  // Textbox for Problems/Dx:
  var x = document.createElement("textarea");
  x.setAttribute("rows","10");
  x.setAttribute("cols","25");
  x.setAttribute("wrap","soft");
  x.setAttribute("onchange","recordTextboxValue(this.name,this.value)");
  x.setAttribute("id","rm"+String(i)+"_dx");
  x.setAttribute("name",i);
  x.value = room[i].wu_dx;
  t.appendChild(x);


//Plan box
  var x = document.createElement("br");
  t.appendChild(x);
  var x = document.createElement("label");
  x.setAttribute("for","rm"+String(i)+"_dx");
  x.innerHTML = "Plan:";
  t.appendChild(x);
  var x = document.createElement("br");
  t.appendChild(x);
  var x = document.createElement("textarea");
  x.setAttribute("rows","10");
  x.setAttribute("cols","25");
  x.setAttribute("wrap","soft");
  x.setAttribute("onchange","recordPlanValue(this.name,this.value)");
  x.setAttribute("id","rm"+String(i)+"_plan");
  x.setAttribute("name",i);
  x.value = room[i].wu_plan;
  t.appendChild(x);

  return(t);
}


function pickRoom(i){
  room[i] = {...default_room};  //used to deep copy default values
  room[i].mine = true;
  newest = i;
  activeElement = 'none';
  pt_count++;
  refreshTable();
  displayRecords();
  document.getElementById("pt_count").innerHTML = pt_count;
}

function deleteRoom(i){
  if (room[i].disposed == true) {
	  room[i].mine = false;	
	  room[i].disposed = false;
	  refreshTable();
	  displayRecords();
  }
  else
  {
	  room[i].disposed = true;
	  refreshTable();
	  displayRecords();
  }
}


function refreshTable(){
  var x = document.getElementById('table1');
  x.innerHTML = '      <tr>\
        <td class = "td1" id="cell1"> <p id="demo1"></p> </td>\
        <td class = "td1" id="cell2"> <p id="demo2"></p> </td>\
        <td class = "td1" id="cell3"> <p id="demo3"></p> </td>\
        <td class = "td1" id="cell4"> <p id="demo4"></p> </td>\
        <td class = "td1" id="cell5"> <p id="demo5"></p> </td>\
        <td class = "td1" id="cell6"> <p id="demo6"></p> </td>\
      </tr>\
      <tr>\
        <td class = "td1" id="cell7"> <p id="demo7"></p> </td>\
        <td class = "td1" id="cell8"> <p id="demo8"></p> </td>\
        <td class = "td1" id="cell9"> <p id="demo9"></p> </td>\
        <td class = "td1" id="cell10"> <p id="demo10"></p> </td>\
        <td class = "td1" id="cell11"> <p id="demo11"></p> </td>\
        <td class = "td1" id="cell12"> <p id="demo12"></p> </td>\
      </tr>';
/*	<h3>Diagnoses</h3\
    <pre id="dx" /><br><br>\
	<h3>Plans</h3>\
    <pre id="plans" /><br>'; */
}

function recordTextboxValue(i,value){
  room[i].wu_dx = value;
}

function recordPlanValue(i,value){
  room[i].wu_plan = value;
}

function indent(){
  var t = document.createElement("h6");
  t.innerHTML = "text";
  return(t);
}

function sortArray(){
	awaitingList.sort(function(a,b){return(a.minutes - b.minutes)});
}


function copyAdmitDoc(){
	var dr = document.getElementById("physicians").value;
	var x = dr.split(",");
	navigator.clipboard.writeText("At "+currentTime() + ", I discussed the situation with Dr. "+x[0]+" who will admit");
}

// Parse timestamp in YYYY-MM-DDTHH:mm:ss format as local
function parseDateString(s) {
  var b = s.split(/\D/g);
  return new Date(b[0], --b[1], b[2], b[3], b[4], b[5], 0);
}

// Format time as hh:mm AM/PM
function formatHHMM(date) {
  function z(n) {
    return (n < 10 ? '0' : '') + n;
  }
  var h = date.getHours();
  return z(h % 12 || 12) + ':' + z(date.getMinutes()) + ' ' + (h < 12 ? 'AM' : 'PM');
}

function currentTime(){
//	return(formatHHMM(parseDateString(Date.now())));
	var x = Date().toLocaleString();
	return(x.slice(16,21));
}







