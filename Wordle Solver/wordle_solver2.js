const input1 = document.querySelector('#text1');
const input2 = document.querySelector('#text2');
const input3 = document.querySelector('#text3');
const input4 = document.querySelector('#text4');
console.log(input1,input4);

const out = document.querySelector('#out');

const btn = [];		
btn[11] = document.querySelector('#b11');
btn[12] = document.querySelector('#b12');
btn[13] = document.querySelector('#b13');
btn[14] = document.querySelector('#b14');
btn[15] = document.querySelector('#b15');
btn[21] = document.querySelector('#b21');
btn[22] = document.querySelector('#b22');
btn[23] = document.querySelector('#b23');
btn[24] = document.querySelector('#b24');
btn[25] = document.querySelector('#b25');
btn[31] = document.querySelector('#b31');
btn[32] = document.querySelector('#b32');
btn[33] = document.querySelector('#b33');
btn[34] = document.querySelector('#b34');
btn[35] = document.querySelector('#b35');
btn[41] = document.querySelector('#b41');
btn[42] = document.querySelector('#b42');
btn[43] = document.querySelector('#b43');
btn[44] = document.querySelector('#b44');
btn[45] = document.querySelector('#b45');
const rows = 4;


const run = document.querySelector('#run');
const submit = document.querySelector('#submit');

run.addEventListener('click',(event) =>{submitWords(input1,input2,input3,input4);});
submit.addEventListener('click',(event) =>{calculateWords();});

btn[11].addEventListener('click',(event) =>{changeColor(event);});
btn[12].addEventListener('click',(event) =>{changeColor(event);});
btn[13].addEventListener('click',(event) =>{changeColor(event);});
btn[14].addEventListener('click',(event) =>{changeColor(event);});
btn[15].addEventListener('click',(event) =>{changeColor(event);});
btn[21].addEventListener('click',(event) =>{changeColor(event);});
btn[22].addEventListener('click',(event) =>{changeColor(event);});
btn[23].addEventListener('click',(event) =>{changeColor(event);});
btn[24].addEventListener('click',(event) =>{changeColor(event);});
btn[25].addEventListener('click',(event) =>{changeColor(event);});
btn[31].addEventListener('click',(event) =>{changeColor(event);});
btn[32].addEventListener('click',(event) =>{changeColor(event);});
btn[33].addEventListener('click',(event) =>{changeColor(event);});
btn[34].addEventListener('click',(event) =>{changeColor(event);});
btn[35].addEventListener('click',(event) =>{changeColor(event);});
btn[41].addEventListener('click',(event) =>{changeColor(event);});
btn[42].addEventListener('click',(event) =>{changeColor(event);});
btn[43].addEventListener('click',(event) =>{changeColor(event);});
btn[44].addEventListener('click',(event) =>{changeColor(event);});
btn[45].addEventListener('click',(event) =>{changeColor(event);});




function changeColor(event){
	x = event.target.id;
	console.log(x);
	let i = parseInt(x.substring(1,3))%10;
	console.log(i);
	let letter = document.getElementById(x).textContent;
	console.log(letter);
	let clr = document.getElementById(x).style.backgroundColor;
	//console.log(document.getElementById(x).style.backgroundColor);
	if (clr == 'white'){
		document.getElementById(x).style = 'background-color:gray;height:30px;width:30px';
	}
	if (clr == 'gray'){
		//document.getElementById(x).style = 'background-color:green;height:30px;width:30px';
		for (let k = 1; k <rows+1; k++){
			//console.log(btn[k*10+i].textContent);
			if (btn[k*10+i].textContent == letter){
				btn[k*10+i].style.backgroundColor = 'green';
			}
		}
	}
	if (clr == 'green'){
		document.getElementById(x).style = 'background-color:yellow;height:30px;width:30px';
		for (let k = 1; k <rows+1; k++){
			//console.log(btn[k*10+i].textContent);
			if (btn[k*10+i].textContent == letter){
				btn[k*10+i].style.backgroundColor = 'yellow';
			}
		}
	}

	if (clr == 'yellow'){
		document.getElementById(x).style = 'background-color:gray;height:30px;width:30px';
		for (let k = 1; k <rows+1; k++){
			//console.log(btn[k*10+i].textContent);
			if (btn[k*10+i].textContent == letter){
				btn[k*10+i].style.backgroundColor = 'gray';
			}
		}
	}


}

function calculateWords(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET','https://set264575.github.io/Wordle Solver/wordle_words.txt');
	xhr.send();
	console.log(xhr.responseText);		
	lst = xhr.responseText.split('\n');
	//lst = [];
	//lst[0] = 'prune';
	//lst[1] = 'brine';
	//lst[2] = 'trust';
	//lst[3] = 'price';
	//console.log('in calculateWords');
	//console.log(btn[11].style.backgroundColor);
	//document.getElementById('out').textContent = "hello";
	let q = '';
	let n = '';
	let w = '';
	for (let i = 1; i < 6; i++){
		flag = false;
		let w_temp = '';
		let w_notemp = '';

		for (let k = 1; k < 3; k++){
			j = k*10+i;
			if (btn[j].style.backgroundColor == 'green'){  //exact
				q = q + btn[j].textContent;
				flag = true;
				w_temp = btn[j].textContent;
			}
			if (btn[j].style.backgroundColor == 'gray'){  //no
				n = n + btn[j].textContent;
				w_notemp = w_notemp + btn[j].textContent;
			}
			if (btn[j].style.backgroundColor == 'yellow'){  //wrong spot
				q = q + btn[j].textContent;
				w_notemp = w_notemp + btn[j].textContent;
			}
		}
		if (flag == false){
			w = w + '[^'+w_notemp+']';
		}
		else {
			w = w + w_temp;
		}
	}
	w = w.replaceAll(']',n+']');
	console.log("q",q);
	console.log("n",n);
	console.log('w',w);
	b = [];
	for (let m = 0; m < lst.length; m++){
		flag = true;
		regex = new RegExp(w);
		console.log(regex.test(lst[m]),lst[m]);
		if (regex.test(lst[m].toUpperCase()) == true){
			//console.log(lst[m]);
			for (let n = 0; n < q.length;n++){
				x = q.substring(n,n+1);
				//console.log('x=',x);
				if (lst[m].toUpperCase().search(x) == -1){
					//console.log(lst[m],"false");
					flag = false;
				}
			}
			if (flag == true){
				//console.log(lst[m]);
				b[b.length] = lst[m];
			}
		}
	}
	l = '';
	for (m = 0; m < b.length; m++){
		l = l + b[m]+'\n';
	}
	//console.log(b);
	out.textContent = l;
			


}

function submitWords(inp1,inp2,inp3,inp4){
	x1 = inp1.value.toUpperCase();
	x2 = inp2.value.toUpperCase();
	x3 = inp3.value.toUpperCase();
	x4 = inp4.value.toUpperCase();
	console.log(inp1,inp2,inp3,inp4);
		for (let j = 1; j < 6; j++){
			btn[10+j].textContent = x1.substring(j-1,j);
			btn[20+j].textContent = x2.substring(j-1,j);
			btn[30+j].textContent = x3.substring(j-1,j);
			btn[40+j].textContent = x4.substring(j-1,j);
		}		

}

