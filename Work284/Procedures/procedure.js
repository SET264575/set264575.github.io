const noAnswer = "__________";
var consentFlag = "";
var sedationFlag = "";
var sutureFlag = "";

function getRadioButtonValue(name){
  var ele = document.getElementsByName(name);
  for (let i = 0; i < ele.length; i++){
    if (ele[i].checked){
      if (ele[i].value == 'on'){
      //  console.log('treating ' + name + " as a radio button without value with result = " + ele[i].labels[0].innnerHTML);
        return(ele[i].labels[0].innerHTML);
      }
      else
      {
      console.log('treating ' + name + " as a radio button with value = " + ele[i].value);
        return(ele[i].value);
      }
    }
  }
  return(false);
}

function getValue(id) {
  var x = document.getElementById(id);
  var result = false;
  if (x == null) {
    result = getRadioButtonValue(id);
    if (result == false) {result = noAnswer};
  }
  else {
    var type = x.type;
    if (type == 'checkbox') {
      result = document.getElementById(id).checked;
      if (result && document.getElementById(id).value != undefined) {
        result = document.getElementById(id).value;
      }
 //     console.log('treating ' + id + " as a checkbox with result = " + result);
    }
    if (type == "text") {
      result = document.getElementById(id).value;
      if (result == "") {result = noAnswer};
 //     console.log('treating ' + id + " as a textbox with result = " + result);
    }
    if (type == "select-one") {
      result = document.getElementById(id).value;
      if (result == "") {result = noAnswer};
//      console.log('treating ' + id + " as a select with result = " + result);
    }
  }
  
  return(result);
}

function isCompleted(list) {
  var x;
  var id;
  var result = true;
  for (let i = 0; i < list.length; i++) {
    id = list[i];
    x = getValue(id);
    if (x == false) {
      result = false;
    }
    else {
      if (document.getElementById(id).type == 'text') {
        if (x == '') {
          result = false;
        }
      }
    }
    return(result);
  }
}

      
function copyEdited() {
  navigator.clipboard.writeText(document.getElementById("text").value); 
}
//text functions

function digitalBlockText() {
  let side = getValue('side');
  let consent = getValue('consent');
  let finger = getValue('finger');
  let indication = getValue('indication');
  let volume = getValue('volume');
  let anesthetic = getValue('anesthetic');
  let aspiration = getValue('aspiration');
  let anestheticTechnique = getValue('anestheticTechnique');
  
  console.log("anestheticTechnique= ",anestheticTechnique);
              
  let t = "";
  if (anestheticTechnique) {
    t = "Procedure Note: Digital Block of " + side + " " + finger + " Finger\n";
    t = t +"The digital block was indicated for "+ indication+". ";
   // t = t + consent;
    t = t + "A total of " + volume + " cc of ";
    t = t + anesthetic;
    t = t + " was injected at the base of the digit. ";
    if (aspiration) {
      t = t + "To avoid injecting into a blood vessel, aspiration was performed prior to injection. ";
    }
    t = t + "The patient tolerated the procedure well.  Adequate anesthesia was obtained. There were no complications. \n\n";
  } 
  return(t);
}

function mentalBlockText() {
  var indication = getValue('indication');
  var volume = getValue('volume');
  var anesthetic = getValue('anesthetic');
  var side = getValue('side');
  var t = "Procedure Note: Mental Block\n";
  t = t +"The block was indicated for "+ indication+". ";
  t = t + volume + " cc of ";
  t = t + anesthetic;
  t = t + " was injected on the ";
  t = t + side +" side. ";
  t = t + "To avoid injecting into a blood vessel, aspiration was performed prior to injection. ";
  t = t + "Adequate anesthesia was achieved. ";
  t = t + "The patient tolerated the procedure well.  There were no complications. \n\n";
  return(t);
}

function sedationText() {
  var indication = getValue("indication");
  var consent = getValue('consent');
  var physicianPresent = getValue('physicianPresent');
  var npo_time = getValue("npo_time");
  var dose = getValue("dose");
  var t = "";
  t = "Procedure Note:  Conscious sedation\n";
  t = t + "Conscious sedation was indicated for "+indication+". ";
  t = t + consent;
  if (physicianPresent) {
    t = t + "A physician was at the bedside throughout the procedure. ";
  }
  t = t + "The patient had been NPO for over "+npo_time+" hours. ";
  t = t + "Standard preparations were made according to the ER sedation policy, including capnography, cardiac monitoring, pulse oximetry and provision of supplemental oxygen. ";
  t = t + "Airway management equipment and suctioning were readily available. "
  t = t + "Adequate sedation was achieved with the administration of " + dose + " mg of etomidate. ";
  t = t + "The patient was continuously monitored until they were alert. ";
  t = t + "The patient tolerated the procedure well.  There were no complications.\n\n"
  return(t);
}

function formatText(t) {
  var list = t.match(/(?<=Procedure Note:).*(?=\n)/g);
  for (let i = 0; i<list.length; i++) {
    t = t.replace(list[i],"<b>"+list[i]+"</b>");
  }
  t = t.replaceAll("\n","<br>");
  return(t);
}

function copyFormatted(formattedText) {
 // const formattedText = 'This is a <b>bold</b> and <u>underlined</u> test.';
  const blob = new Blob([formattedText], {type: 'text/html'});
  const clipboardItem = new window.ClipboardItem({ 'text/html': blob });
  navigator.clipboard.write([clipboardItem]);
}

function displayText(t) {
 // t = "<b>"+t+"</b>";
  t = formatText(t);
  //navigator.clipboard.writeText(t);
  let oldStr = document.getElementById('text').innerHTML;
  let t1 = underlineDiff(oldStr,t);
  document.getElementById('text').innerHTML = t1;
  t = "<div style='font-size: .8em'>"+t+"</div>";
  copyFormatted(t); 
 // document.getElementById('text').value = t;
}

function underlineDiff(oldStr,newStr) {
  oldStr = oldStr.replaceAll('<u>','');
  oldStr = oldStr.replaceAll('</u>','');
  let m=0;
  let n=0;
  let oldStrArray = oldStr.split('');
  for (let i = 0;i<oldStrArray.length; i++) {
    if (oldStrArray[i] != newStr.charAt(i)) {
      m = i;
    break;
    }
  }
  for (let i = 1;i<oldStrArray.length; i++) {
    if (oldStrArray[oldStrArray.length-i] != newStr.charAt(newStr.length-i)) {
      n = newStr.length - i+1;
    break;
    }
  }
  return(newStr.slice(0,m)+"<u>"+newStr.slice(m,n)+ "</u>"+newStr.slice(n));
}

function capitalizeFirstWords(t) {
  let x = t.split(' ');
  if (x[0] != '') {
    t=x[0][0].toUpperCase()+x[0].slice(1);
  }
  else {
    t = "";
  }
  for (let i = 1; i <x.length; i++) {
    if (x[i] != '') {
      x[i] = x[i][0].toUpperCase()+x[i].slice(1);
      t = t + " "+x[i];
    }
  }
  return(t);
}

//load fragments
function load(tag) {
  $(document).ready(function(){
    $('#div_'+tag).load("Fragments/"+tag+".html");
  });
}

function load2(tag,parameter) {
  $(document).ready(function(){
    $('#div_'+tag).load("Fragments/"+tag+".html?checked="+parameter);
  });
}

function anesthetic() {load('anesthetic')}
function anestheticdigitalblock() {load('anestheticdigitalblock')}
function anestheticmental() {load('anestheticmental')}
function aspirationIndication() {load('aspirationIndication')}
function consent(index){load('consent'); consentFlag = index; }
function contamination() {load('contamination')}
function digitalblock() {load('digitalblock');}
function digitalblockorlocal() {load('digitalblockorlocal');}
function side() {load('side') }
function sideUnboxed() {load('sideUnboxed')}
function header() {load('header'); }
function finger() {load('finger') }
function fingerUnboxed() {load('fingerUnboxed')}
function digit() {load('digit') }
function location2() {load('location')}
function locationUnboxed() {load('locationUnboxed')}
function location3() {load('location3')}
function risks() {load('risks')}
function sedation(flag) {load('sedation'); sedationFlag = flag}
function sedationUnboxed(flag) {load('sedationUnboxed'); sedationFlag = flag}
function student() {load('student');}
function sutures(index) { load('sutures'); sutureFlag = index} 
function suturesUnboxed(index) { load('suturesUnboxed'); sutureFlag = index} 

function smallvolumefluid() {load('smallvolumefluid')}
function largevolumefluid() {load('largevolumefluid')}
function wounddescription() {load('wounddescription')}
function wounddescriptionUnboxed() {load('wounddescriptionUnboxed')}
function woundpreparation() {load('woundpreparation')}


function getParameter(p) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  return( params[p]);
}


function checkConsent(index){
      switch(index) {
        case "implied":
          document.getElementById('consent1').checked = true;
          break;
        case 'verbal':
          document.getElementById('consent2').checked = true;
          break;
        case "written":
          document.getElementById('consent3').checked = true;
          break;
        case "none":
          document.getElementById('consent4').checked = true;
          break;
        case "parental verbal":
          document.getElementById('consent5').checked = true;
          break;
        case "parental written":
          document.getElementById('consent6').checked = true;
          break;
      }
}

function checkSutures(index) {
  switch (index) {
    case 4:
      document.getElementById('suture_size3').checked = true;
       break;
    case 5:
      document.getElementById('suture_size4').checked = true;
       break;
    case 6:
      document.getElementById('suture_size5').checked = true;
       break;
  } 
}
