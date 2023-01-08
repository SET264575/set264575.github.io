function getRadioButtonValue(name){
  var ele = document.getElementsByName(name);
  for (let i = 0; i < ele.length; i++){
    if (ele[i].checked){
      if (ele[i].value == 'on'){
        console.log('treating ' + id + " as a radio button without value with result = " + ele[i].labels[0].innnerHTML);
        return(ele[i].labels[0].innerHTML);
      }
      else
      {
        console.log('treating ' + id + " as a radio button with value = " + ele[i].value);
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
  }
  else {
    var type = x.type;
    if (type == 'checkbox') {
      result = document.getElementById(id).checked;
      console.log('treating ' + id + " as a checkbox with result = " + result);
    }
    if (type == "text") {
      result = document.getElementById(id).value;
      console.log('treating ' + id + " as a textbox with result = " + result);
    }
    if (type == "select-one") {
      result = document.getElementById(id).value;
      console.log('treating ' + id + " as a select with result = " + result);
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