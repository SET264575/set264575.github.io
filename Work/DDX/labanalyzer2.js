/*

Currently working on:
	1. Tree view
	2. Add suggestions for diseases
	3. Add differential diagnoses for current labs
	4. Add suggestions for current labs
	5. Add new labs

How to add a new lab:
	1. Add lab = 
	2. Add HTML for text box
	3. Add var result = 
	4. Add ddx list as .html
	5. Add suggestions for low or high values
	
Things to fix:
	
	
Things to do:
	Add labs:
		uric acid, CK, procalcitonin, bands, lactate, phosphorus, probnp, tsh, total thyroxine, pt, ptt, ammonia
	Add websites for abnormalities
	Format websites with tree views
	Add websites for conditions
	Add suggestions for diseases
	Add functionality for UA and ABG
		respiratory acidosis/alkalosis calculations
	Delete unneeded code
	Red abnormal calculated values
	Label suggestions with disease names
	biliary obstruction - elevated lfts, elevated alk phos, elevated bilirubin
	*/

/*

<!--
link to html file regarding each disease
expand ddx
enter abnormalities
order abnormalities by most important

add differential diagnoses
get age and gender from labs
exclude certain diagnoses depending on gender and age
expand/collapse ddx
	add treeview - https://www.w3schools.com/howto/howto_js_treeview.asp
critical values
prioritize ddx
additional labs:
RBC morphology
urinalysis
ABG
-->
*/

console.log("at 7:40");

class Lab{
		constructor (name,symbol,low,high,low_name,high_name){
			this.name = name;
			this.symbol = symbol;
			this.value = 0;
			this.low_name = low_name;
			this.low = low;
			this.high_name = high_name;
			this.high = high;

		}

		inRange(value){
			if (value < this.low) {return(-1);}
			if (value > this.high) {return(1);}
			return(0);
		}
	}

	class Disease{
		constructor(name,indicators,essential,minimum,link){
			this.name = name;
			this.indicators = indicators;
			this.essential = "";
			this.minimum = minimum;
			this.link = "";
		}
		
		score(abnormalities){
			var score = 0;
			for (let i = 0; i<this.indicators.length; i++) {
				if ( abnormalities.includes(this.indicators[i])) {
					score++;
				}
			}
			console.log(this.name,score);
			return(score);
		}
				
	}
	
	class Abnormality{
		constructor(name,ddx){
			this.name = name;
			this.ddx = ddx;
		}
	}



	diseases = [];

	diseases.push(new Disease("CHF",['elevated pro-BNP','hyponatremia'],['elevated pro-BNP'],2,''));
	diseases.push(new Disease("adrenal insufficiency",["hyponatremia","hyperkalemia","hypocalcemia"],[''],2,''));
	diseases.push(new Disease("DKA",["hyperkalemia","hyperglycemia","high anion gap metabolic acidosis","hypobicarbia"],['hyperglycemia'],2,''));
	diseases.push(new Disease("sepsis",["leukocytosis","neutrophilia","bandemia","toxic granulation","high anion gap metabolic acidosis"],'',2,''));
	diseases.push(new Disease("renal failure",["elevated BUN","elevated creatinine","hyperkalemia","anemia"],[''],2,''));
	diseases.push(new Disease("upper GI bleeding",["elevated BUN","anemia"],[''],2,''));
	diseases.push(new Disease("hypomagnesemia",['hypocalcemia','hypokalemia'],[''],2,''));
	diseases.push(new Disease("capillary leak syndrome",['polycythemia','leukocytosis','thrombocytosis','hypoalbuminemia'],['hypoalbuminemia'],3,''));
	diseases.push(new Disease("HELLP syndrome",["elevated AST","elevated ALT","thrombocytopenia","elevated LDH"],['thrombocytopenia'],2,''));
	diseases.push(new Disease("iron deficiency anemia",["anemia","microcytosis"],[''],2,''));
	diseases.push(new Disease("Cushing's syndrome",["hypernatremia","hypokalemia"],[''],2,''));
	diseases.push(new Disease("hepatorenal syndrome",["elevated creatinine","elevated AST","elevated ALT"],['elevated creatinine'],2,''));
	diseases.push(new Disease("milk-alkali syndrome",['hypochloremia','hypokalemia','hypercalcemia'],[''],2,''));
	diseases.push(new Disease("steroid use",['hyperglycemia','leukocytosis'],[''],2,''));
	diseases.push(new Disease("pancytopenia",['anemia','leukopenia','thrombocytopenia'],[''],3,''));
	diseases.push(new Disease("cirrhosis",["anemia","thrombocytopenia","elevated AST","elevated ALT","hyponatremia"],['thrombocytopenia'],3,''));
	diseases.push(new Disease("Ehrlichiosis",["leukopenia","lymphopenia","thrombocytopenia","hyponatremia","elevated AST","elevated ALT"],[''],2,''));
	diseases.push(new Disease("hemolytic-uremic syndrome",['anemia','thrombocytopenia','elevated creatinine','elevated BUN'],['anemia'],3,''));
	diseases.push(new Disease("TTP",['anemia','thrombocytopenia','elevated creatinine','elevated BUN'],['thrombocytopenia'],3,''));
	diseases.push(new Disease("multiple myeloma",["hypercalcemia","elevated creatinine","anemia"],['hypercalcemia'],2,''));
	diseases.push(new Disease("tertiary hyperparathyroidism",['hypercalcemia','elevated creatinine'],['hypercalcemia'],2,''));
	diseases.push(new Disease("aluminum toxicity",['hyercalcemia','elevated creatinine'],['hypercalcemia'],2,''));
	diseases.push(new Disease("eosinophilic gastritis",["hypoalbuinemia","anemia","eosinophilia"],['eosinophilia'],2,''));
	diseases.push(new Disease("vitamin B12 deficiency",['anemia','macrocytosis'],[''],2,''));
	diseases.push(new Disease("folate deficiency",['anemia','macrocytosis'],[''],2,''));

	labs = [];
	labs.push(new Lab("sodium","NA",135,145,'hyponatremia','hypernatremia'));
	labs.push(new Lab("chloride","CL",97,110,'hypochloremia','hyperchloremia'));
	labs.push(new Lab("potassium","K",3.3,4.9,'hypokalemia','hyperkalemia'));
	labs.push(new Lab("bicarb","CO2",22,32,'hypobicarbia','hyperbicarbia'));
	labs.push(new Lab("BUN","BUN",8,25,"***ignore***","elevated BUN"));
	labs.push(new Lab("creatinine","Creat",0.8,1.3,"low creatinine","elevated creatinine"));
	labs.push(new Lab("glucose",'Glu',70,199,'hypoglycemia','hyperglycemia'));
	labs.push(new Lab("AST","AST",10,50,'***ignore***','elevated AST'));
	labs.push(new Lab("ALT","Alt",7,55,'***ignore***','elevated ALT'));
	labs.push(new Lab('alkaline phosphatase',"Alk Phos",40,130,'low alkaline phosphatase','elevated alkaline phosphatase'));
	labs.push(new Lab('total protein',"TP",6.5,8.5,"low total protein","elevated total protein"));
	labs.push(new Lab("albumin","Alb",3.5,5,"hypoalbuminemia","***ignore***"));
	labs.push(new Lab("calcium","CA",8.5,10.3,"hypocalcemia","hypercalcemia"));
	labs.push(new Lab("magnesium","MG",2,3,"hypomagnesemia","***ignore***"));
	labs.push(new Lab("bilirubin","Total Bilirubin",0.1,1.2,"***ignore***","hyperbilirubinemia"));
	labs.push(new Lab("lipase","Lip",0,99,'***ignore***','elevated lipase'));
	labs.push(new Lab('troponin','Troponin T',0,0.1,'***ignore***','elevated troponin'));
	labs.push(new Lab('Ammonia','Ammonia',25,94,'***ignore***','hyperammonemia'));
/*  needs normal ranges and terms and description from lab report	
	labs.push(new Lab('uric acid','uric acid',0,1,'***ignore***','***ignore***'));
	labs.push(new Lab('CPK','CK',0,1,'***ignore***','***ignore***'));
	labs.push(new Lab('procalcitonin','procalcitonin',0,1,'***ignore***','***ignore***'));
	labs.push(new Lab('lactate','lactate',0,1,'***ignore***','***ignore***'));
	labs.push(new Lab('Phosphorus','Phos',2.3,4.5,'hypophosphatemia','hyperphosphatemia'));
	labs.push(new Lab('Procalcitonin'));
	labs.push(new Lab('Total Creatinine Kinase'));
	labs.push(new Lab('Pro-BNP'));
	*/
	
	labs.push(new Lab("corrected sodium","corrected sodium",135,145,"hyponatremia","hypernatremia"));
	labs.push(new Lab("corrected calcium","corrected calcium",8.5,10.3,"hypocalcemia","hypercalcemia"));
	labs.push(new Lab("anion gap","anion gap",4,17,"low anion gap","high anion gap metabolic acidosis"));
	labs.push(new Lab("A/G ratio","A/G ratio",0.8,2,'low A/G ratio','elevated A/G ratio'));
	labs.push(new Lab("MELD","MELD",0,10,'***ignore***','elevated MELD score'));
	labs.push(new Lab("BUN/Cr ratio","BUN/Cr ratio",5,20,'***ignore***','elevated BUN/Cr ratio'));
	labs.push(new Lab("ANC","ANC",2500,7000,"neutropenia","neutrophilia"));
	labs.push(new Lab('osmolality','osmolality',275,295,'low osmolality','elevated osmolality'));


	labs.push(new Lab("WBC","WBC",3.8,9.9,'leukocytopenia','leukocytosis'));
	labs.push(new Lab("RBC","RBC",4.3,5.8,'***ignore***','***ignore***'));
	labs.push(new Lab("Hgb","HGB",13.0,17.5,'anemia','polycythemia'));
	labs.push(new Lab("Hct","HCT",38.9,50.3,'anemia','polycythemia'));
	labs.push(new Lab("platelets",'Plt',150,400,'thrombocytopenia','thrombocytosis'));
	labs.push(new Lab('MCV','MCV',81.3,96.4,'microcytosis','macrocytosis'));
	labs.push(new Lab('Abs Neutrophils','Neut Abs Auto',1.7,6.5,'***ignore***','***ignore***'));
	labs.push(new Lab('Abs Immature Granulocytes','ImmGr Abs Auto',0,0.1,'***ignore***','***ignore***'));
	labs.push(new Lab('Abs Lymphocytes','Lymph Abs Auto',0.8,3.3,'***ignore***','***ignore***'));
	labs.push(new Lab('Abs Monocytes','Mono Abs Auto',0.2,0.8,'***ignore***','***ignore***'));
	labs.push(new Lab('Abs Eosinophils','Eos Abs Auto',0,0.5,'***ignore***','eosinophilia'));
	labs.push(new Lab('Abs Basophils','Baso Abs Auto',0,0.1,'***ignore***','***ignore***'));
	labs.push(new Lab('NRBC','NRBC',0,0.01,'***ignore***','***ignore***'));
	labs.push(new Lab('ANC','ANC',2500,8000,'neutropenia','neutrophilia'));

//complete the following
/*
	labs.push(new Lab('Vacuolated Neutrophils','Vacuolated Neuts'));
	labs.push(new Lab('Dohle Bodies','Dohle Bodies'));
	labs.push(new Lab('Giant Platelets','Gt Plts'));
	labs.push(new Lab('Polychromasia','Polychromasia'));
	labs.push(new Lab('Poikilocytosis','Poikilocytosis'));
	labs.push(new Lab('Basophilic Stippling','Basophilic Stippling'));
	labs.push(new Lab('Anisocytosis','Anisocytosis'));
	labs.push(new Lab('Tear Drop Cells','Tear Drop Cells'));
	labs.push(new Lab('Toxic Granulation','Toxic Gran'));
	labs.push(new Lab('Ovalocytes'));
	labs.push(new Lab('Burr Cells','Burr Cells'));
	labs.push(new Lab('Schistocytes','Schistocytes'));

*/

/*ABG functionality
	labs.push(new Lab('pH','pH',0,1,'***ignore***','***ignore***'));
	labs.push(new Lab('pCO2','pCO2',0,1,'***ignore***','***ignore***'));
	labs.push(new Lab('pO2','pO2',0,1,'***ignore***','***ignore***'));
	labs.push(new Lab('BE','BE',0,1,'***ignore***','***ignore***'));
	*/
	
	
/*
	var links = {};
	links['hyponatremia'] = 'https://ddxof.com/hyponatremia/?sf_action=get_data&sf_data=all&_sf_s=hyponatremia';
	links['adrenal insufficiency'] = 'https://en.wikipedia.org/wiki/Adrenal_insufficiency';
	links['AST/ALT ratio > 2.5'] = 'https://en.wikipedia.org/wiki/AST/ALT_ratio';
	links['milk-alkali syndrome'] = 'https://en.wikipedia.org/wiki/Milk-alkali_syndrome';
	*/


//delete the following:

/*

	abnormality['hypermagnesemia'] = ['high magnesium']; //***


	abnormality['elevated total protein'] = ['paraproteinemia',"Hodgkin's lymphoma",'leukemia','multiple myeloma','increased immunoglobulins','dehydration','hepatitis B','hepatitis C','HIV','chronic inflammation'];
	abnormality['decreased total protein'] = ['low albumin concentration','liver disease','acute infection','immunodeficiency'];
	abnormality['hypoalbuminemia'] = ['inflammation','infection','liver failure','nephrotic syndrome','chronic kidney disease','malnutrition','protein losing enteropathy'];
	abnormality['hyperalbuminemia'] = ['high albumin']; //***

	abnormality['low total protein'] = ['malnutrition'];
	abnormality['elevated total protein'] = ['hepatitis C'];
	abnormality['elevated lipase'] = ['pancreatitis','***other'];
	abnormality['low A/G ratio'] = ['autoimmune disease','liver disease','kidney disease'];
	abnormality['elevated A/G ratio'] = ['leukemia','hypothyroidism'];
	abnormality['elevated troponin'] = ['ACS related','Acute MI (STEMI & NSTEMI)','Post‐PCI','Open heart surgery / Any cardiac surgery','Non‐ACS related','Tachycardia: SVT, V-Tach, A-Fib with RVR or any tachycardia','Atrial Fibrillation','Pericarditis, Myocarditis, Endocarditis','Massive or submassive Pulmonary Embolism','Sepsis','Hypotension','Critical illness (Medical ICU patients)','Viral illness','Hypertension','Thrombotic thrombocytopenic purpura','CVA (Stroke): Hemorrhagic stroke (Subarachnoid hemorrhage); Ischemic stroke','Head trauma','Asymptomatic patients with ESRD','Chronic kidney disease','Acute Aortic dissection','Acute Heart Failure','Chronic Heart Failure','Apical ballooning syndrome','Strenuous exercise/ultra‐endurance exercise','Cardiotoxic chemotherapy','Hypersensitivity drug reactions','High-frequency ablation/ current cardioversion‐defibrillator shocks','Cardiac infiltrative disorders: Amyloidosis, sarcoidosis, hemochromatosis, scleroderma','Left ventricular hypertrophy','Infiltrative disease','Heart transplant','Cardiac contusion after blunt chest wall trauma / Direct myocardial trauma','ARDS','COPD exacerbation','Severe GI bleeding','Rhabdomyolysis','Severe skin burns','Kawasaki disease','Neurofibromatosis','Duchenne muscular dystrophy','Klippel-Feil syndrome','Environmental exposure: Carbon monoxide, hydrogen sulfide','Diabetes','Hypothyroidism','Envenomation','False-positive troponin elevation'];
	

	abnormality['leukocytosis'] = ['infection','sepsis'];
	abnormality['leukopenia'] = ['viral infection','tick borne illness','sepsis','chemotherapy'];
	abnormality['leukocytosis'] = ['infection','sepsis','vomiting','pain','steroid use'];
	abnormality['polycythemia']=['PCV','COPD','OSA','renal cell carcinoma','liver tumors'];

	abnormality['anemia'] = ['iron deficiency anemia','blood loss anemia','renal failure','hemolysis'];
	abnormality['microcytosis'] = ['iron deficiency anemia'];
	abnormality['macrocytosis'] = ['vitamin B12 deficiency'];
	abnormality['thrombocytopenia'] = ['ITP','TTP','liver disease'];
	abnormality['thrombocytosis'] = ['essential thrombocytosis','infection','polycythemia vera']; //expand****
	abnormality['eosinophilia'] = ['allergic reaction','parasitic infection','eosinophilic gastritis','DRESS syndrome','autoimmune disease','squamous cell cancer','blood cancers','Hodgkin lymphoma','ovarian cancer','cholesterol embolism','adrenal insufficiency']; 
	abnormality['high anion gap acidosis'] = ['DKA','starvation','lactic acidosis','methanol ingestion','ethylene glycol ingestion','alcohol ingestion','acetaminophen ingestion','salicylate ingestion','' ];
	abnormality['AST/ALT ratio > 2.5'] = ['muscle damage','bone disease', 'pregnancy', 'chronic renal failure', 'lymphoma', 'congestive heart failure'];
	abnormality['AST/ALT ratio between 1.5 and 2.5'] = ['alcoholic liver disease'];
	abnormality['AST/ALT ratio less than 0.9'] = ['resolving acute liver disease'];
	abnormality['neutropenia'] = ['chemotherapy treatment'];
	abnormality['neutrophilia'] = ['infection','leukemia'];
	abnormality['teardrop'] = ['bone marrow fibrosis','myeloproliferative disorders','myelodysplastic syndromes','metastatic carcinoma','cyclosporine use'];
	abnormality['smudge'] = ['CCL'];
	abnormality['ovalocyte'] = [''];
	abnormality['spherocyte'] = ['autoimmune hemolytic anemia','hereditary spherocytosis','postsplenectomy','severe burns','oxidate hemolysis','fragmentation hemolysis'];
	abnormality['target'] = ['liver disease','postsplenectomy','thalassemia','iron deficiency','hemoglobinopathies'];
	abnormality['helmet'] = [''];
	abnormality['schistocyte'] = ['DIC','TTP','HUS','heart valve disease','vasculitis','megaloblastic anemia','severe burns'];
	abnormality['burr'] = ['liver disease','renal disease','uremia','severe burns','bleeding gastric ulcers'];
	abnormality['Howell-Jelly'] = ['megaloblastic anemia','myelodysplastic syndrome'];
	abnormality['acanthocyte'] = ['congenital abetalipoproteinemia','vitamin E deficiency','alcohol intoxication','post-splenectomy','severe malnutrition','neuroacanthocytosis'];
	abnormality['sickle'] = ['sickle cell anemia','hemoglobin SD disease','hemoglobin S/beta-thalassemia'];
	abnormality['stomatocyte'] = ['acute alcoholism','malignancy','hereditary stomatocytosis','Rh null disease'];
	abnormality['basophilic stippling'] = ['lead poisoning','thalassemia','significant anemia','dyserythropoesis'];
	abnormality['Rouleaux'] = ['elevated acute phase proteins','autoimmune disease','myeloma'];
	abnormality['bands'] = ['sepsis','infection','inflammatory conditions'];
	abnormality['toxic granulation'] = ['inflammation'];
	abnormality['hypersegmented'] = ['vitamin B12 deficiency','folate deficiency','myelodysplastic syndromes'];
	
	*/

	/*abnormality["hyponatremia & hyperkalemia"]= ['adrenal insufficiency','renal failure','chylothorax','GI tract disorders'];
	abnormality['hypernatremia & hypokalemia'] = ["Cushing's syndrome"];
	abnormality['hypochloremia & hypokalemia & hypercalcemia'] = ['milk-alkali syndrome'];
	abnormality['hypokalemia & hypocalcemia'] = ['hypomagnesemia'];
	abnormality["elevated LFTs & elevated creatinine"] = ['hepatorenal syndrome'];
	abnormality["hyperglycemia & hypobicarbia"] = ['DKA'];
	abnormality["leukocytosis & hyperglycemia"] = ['steroid use'];
	abnormality['elevated AST & elevated ALT'] = ['cirrhosis','hepatitis','HELLP syndrome'];
	abnormality["leukopenia & anemia & thrombocytopenia"] = ['pancytopenia'];
	abnormality["hyponatremia & hyperkalemia & hypocalcemia"] = ['adrenal insufficiency'];
	abnormality['elevated BUN','elevated creatinine','anemia'] = ['chronic kidney disease'];
	abnormality['anemia & microcytosis & elevated BUN'] = ['chronic upper GI bleeding'];
	abnormality['thrombocytopenia & hyponatremia'] = ['cirrhosis'];
	abnormality['leukopenia & thrombocytopenia & hyponatremia'] = ['Ehrlichiosis'];
	abnormality['anemia & microcytosis'] = ['iron deficiency anemia'];
	abnormality['anemia & macrocytosis'] = ['vitamin B deficiency','folate deficiency'];
	abnormality['anemia & thrombocytopenia & elevated creatinine'] = ['HUS','TTP'];
	abnormality['anemia & elevated BUN & elevated creatinine'] = ['HUS','TTP','chronic renal disease'];
	abnormality['anemia & elevated BUN'] = ['Upper GI bleeding'];
	abnormality['elevated AST & elevated ALT & thrombocytopenia'] = ['HELLP syndrome'];
	abnormality['polycythemia & leukocytosis & thrombocytosis'] = ['capillary leak syndrome'];
	abnormality['polycythemia & thrombocytosis & hypoalbuminemia'] = ['capillary leak syndrome'];
	abnormality['hypercalcemia & elevated creatinine'] = ['multiple myeloma','tertiary hyperparathyroidism','aluminum toxicity','milk-alkali syndrome'];
	abnormality['hypercalcemia & anemia'] = ['multiple myeloma'];
	abnormality['hypoalbuminemia & anemia & eosinophilia']=['eosinophilic gastritis'];
	
	abnormality['high anion gap metabolic acidosis'] = ['DKA','lactic acidosis','alcohol toxicity','methanol toxicity','ethylene glycol toxicity','uremia','acetaminophen toxicity','carbon monoxide','cyanide','CHF','toluene abuse','aminoglycoside use','starvation ketoacidosis','phenformin use','iron use','isoniazid use','inborn errors of metabolism','salicylate use','metformin use'];
	abnormality['low anion gap'] = ['hypoalbuminemia','multiple myeloma','hyperkalemia','hypercalcemia','lithium toxicity','increased cationic paraprotein','bromide toxicity','elevated serum iodide'];
	*/
	abnormality_site = [];
	
	abnormality_site["hyponatremia"] = "hyponatremia.html";
	abnormality_site["hypernatremia"] = "hypernatremia.html";
	abnormality_site["hypochloremia"] = "hypochloremia.html";
	abnormality_site["hyperchloremia"] = "hyperchloremia.html";
	abnormality_site["hypokalemia"] = "hypokalemia.html";
	abnormality_site["hyperkalemia"] = "hyperkalemia.html";
	abnormality_site["hyperbicarbia"] = "hyperbicarbia.html";
	abnormality_site["hypobicarbia"] = "hypobicarbia.html";
	abnormality_site["low creatinine"] = "low creatinine.html";
	abnormality_site["elevated creatinine"] = "elevated creatinine.html";
	abnormality_site["elevated BUN"] = "elevated BUN.html";
	abnormality_site["hypoglycemia"] = "hypoglycemia.html";
	abnormality_site["elevated AST"] = "elevated AST.html";
	abnormality_site["elevated ALT"] = "elevated ALT.html";
	abnormality_site["elevated alkaline phosphatase"] = "elevated alkaline phosphatase.html";
	abnormality_site["low alkaline phosphatase"] = "low alkaline phosphatase.html";
	abnormality_site["hyperbilirubinemia"] = "hyperbilirubinemia.html";
	abnormality_site["hypercalcemia"] = "hypercalcemia.html";
	abnormality_site["hypocalcemia"] = "hypocalcemia.html";
	abnormality_site["hypomagnesemia"] = "hypomagnesemia2.html";
	abnormality_site["hypermagnesemia"] = "hypermagnesemia.html";
	abnormality_site["hyperglycemia"] = "hyperglycemia.html";
	abnormality_site["elevated total protein"] = "elevated total protein.html";
	abnormality_site["decreased total protein"] = "decreased total protein.html";
	abnormality_site["hypoalbuminemia"] = "hypoalbuminemia.html";
	abnormality_site["hyperalbuminemia"] = "hyperalbuminemia.html";
	abnormality_site["low total protein"] = "low total protein.html";
/*
	abnormality_site["elevated lipase"] = "elevated lipase.html";
	abnormality_site["low A/G ratio"] = "low A/G ratio.html";
	abnormality_site["elevated A/G ratio"] = "elevated A/G ratio.html";
*/
	abnormality_site["elevated troponin"] = "elevated troponin.html";
/*
	abnormality_site["leukocytosis"] = "leukocytosis.html";
	abnormality_site["leukopenia"] = "leukopenia.html";
	abnormality_site["polycythemia"] = "polycythemia.html";
*/
	abnormality_site["anemia"] = "anemia.html";
/*
	abnormality_site["microcytosis"] = "microcytosis.html";
	abnormality_site["macrocytosis"] = "macrocytosis.html";
	abnormality_site["thrombocytopenia"] = "thrombocytopenia.html";
	abnormality_site["thrombocytosis"] = "thrombocytosis.html";
*/ 
//	console.log('at line 321');
	abnormality_site["eosinophilia"] = "eosinophilia.html";
/*	abnormality_site["high anion gap acidosis"] = "high anion gap acidosis.html";
	abnormality_site["AST/ALT ratio > 2.5"] = "AST/ALT ratio > 2.5.html";
	abnormality_site["AST/ALT ratio between 1.5 and 2.5"] = "AST/ALT ratio between 1.5 and 2.5.html";
	abnormality_site["AST/ALT ratio less than 0.9"] = "AST/ALT ratio less than 0.9.html";
	abnormality_site["neutropenia"] = "neutropenia.html";
	abnormality_site["neutrophilia"] = "neutrophilia.html";

	abnormality_site["teardrop"] = "teardrop.html";
	abnormality_site["smudge"] = "smudge.html";
	abnormality_site["ovalocyte"] = "ovalocyte.html";
	abnormality_site["spherocyte"] = "spherocyte.html";
	abnormality_site["target"] = "target.html";
	abnormality_site["helmet"] = "helmet.html";
	abnormality_site["schistocyte"] = "schistocyte.html";
	abnormality_site["burr"] = "burr.html";
	abnormality_site["Howell-Jelly"] = "Howell-Jelly.html";
	abnormality_site["acanthocyte"] = "acanthocyte.html";
	abnormality_site["sickle"] = "sickle.html";
	abnormality_site["stomatocyte"] = "stomatocyte.html";
	abnormality_site["basophilic stippling"] = "basophilic stippling.html";
	abnormality_site["Rouleaux"] = "Rouleaux.html";
	abnormality_site["bands"] = "bands.html";
	abnormality_site["toxic granulation"] = "toxic granulation.html";
	abnormality_site["hypersegmented"] = "hypersegmented.html";
	abnormality_site["hyponatremia & hyperkalemia"] = "hyponatremia & hyperkalemia.html";
	abnormality_site["hypernatremia & hypokalemia"] = "hypernatremia & hypokalemia.html";
	abnormality_site["hypochloremia & hypokalemia & hypercalcemia"] = "hypochloremia & hypokalemia & hypercalcemia.html";
	abnormality_site["hypokalemia & hypocalcemia"] = "hypokalemia & hypocalcemia.html";
	abnormality_site["elevated LFTs & elevated creatinine"] = "elevated LFTs & elevated creatinine.html";
	abnormality_site["hyperglycemia & hypobicarbia"] = "hyperglycemia & hypobicarbia.html";
	abnormality_site["leukocytosis & hyperglycemia"] = "leukocytosis & hyperglycemia.html";
	abnormality_site["elevated AST & elevated ALT"] = "elevated AST & elevated ALT.html";
	abnormality_site["leukopenia & anemia & thrombocytopenia"] = "leukopenia & anemia & thrombocytopenia.html";
	abnormality_site["hyponatremia & hyperkalemia & hypocalcemia"] = "hyponatremia & hyperkalemia & hypocalcemia.html";
	abnormality_site["anemia & microcytosis & elevated BUN"] = "anemia & microcytosis & elevated BUN.html";
	abnormality_site["thrombocytopenia & hyponatremia"] = "thrombocytopenia & hyponatremia.html";
	abnormality_site["leukopenia & thrombocytopenia & hyponatremia"] = "leukopenia & thrombocytopenia & hyponatremia.html";
	abnormality_site["anemia & microcytosis"] = "anemia & microcytosis.html";
	abnormality_site["anemia & macrocytosis"] = "anemia & macrocytosis.html";
	abnormality_site["anemia & thrombocytopenia & elevated creatinine"] = "anemia & thrombocytopenia & elevated creatinine.html";
	abnormality_site["anemia & elevated BUN & elevated creatinine"] = "anemia & elevated BUN & elevated creatinine.html";
	abnormality_site["anemia & elevated BUN"] = "anemia & elevated BUN.html";
	abnormality_site["elevated AST & elevated ALT & thrombocytopenia"] = "elevated AST & elevated ALT & thrombocytopenia.html";
	abnormality_site["polycythemia & leukocytosis & thrombocytosis"] = "polycythemia & leukocytosis & thrombocytosis.html";
	abnormality_site["polycythemia & thrombocytosis & hypoalbuminemia"] = "polycythemia & thrombocytosis & hypoalbuminemia.html";
	abnormality_site["hypercalcemia & elevated creatinine"] = "hypercalcemia & elevated creatinine.html";
	abnormality_site["hypercalcemia & anemia"] = "hypercalcemia & anemia.html";
	abnormality_site["hypoalbuminemia & anemia & eosinophilia"] = "hypoalbuminemia & anemia & eosinophilia.html";
*/
	abnormality_site["high anion gap metabolic acidosis"] = "high anion gap metabolic acidosis.html";
	abnormality_site["low anion gap"] = "low anion gap.html";


	var suggestion = [];
	suggestion["hyponatremia"] = "Calculate corrected sodium level.";
	suggestion["hypernatremia"] = "";
	suggestion["hypochloremia"] = "";
	suggestion["hyperchloremia"] = "";
	suggestion["hypokalemia"] = "Treat with oral KCl if tolerated as well as IV KCl, as oral is safer and will increase K level faster";
	suggestion["hyperkalemia"] = "Obtain an EKG immediately.\n\tGive calcium chloride or calcium gluconate while determining cause, severity and need for additional treatment.\n\t\n\tConsider repeating K level if hyperkalemia is doubtful.\n\tIf severe hyperkalemia or peaked T waves on EKG, give:\n\t\tinsulin & glucose\n\t\tLasix\n\t\tAlbuterol\n\t\t\n\t\tLokelma";
	suggestion["hyperbicarbia"] = "Consider ordering an ABG to rule out significant CO2 retention.";
	suggestion["hypobicarbia"] = "";
	suggestion["decreased creatinine"] = "";
	suggestion["elevated creatinine"] = "";
	suggestion["elevated BUN"] = "Consider whether BUN elevation might actually indicate an upper GI bleed.";
	suggestion["hypoglycemia"] = "Treat orally if asymptomatic or mildly symptomatic.\n\tTreat with IV glucose and/or glucagon if unable to eat\n\tConsider the possibilities of:\n\t\tsepsis\n\t\tinsulin overdose\n\t\tmistakenly taking long-acting insulin\n\t\toral hypoglycemic overdose";
	suggestion["elevated AST"] = "";
	suggestion["elevated ALT"] = "";
	suggestion["elevated alkaline phosphatase"] = "";
	suggestion["low alkaline phosphatase"] = "";
	suggestion["hyperbilirubinemia"] = "Consider whether this is chronic or acute.\n\tIf incidental, it could be genetic and need no further workup.\n\tSignificant painless jaundice often indicates cancer.\n\tPainful jaundice suggests an acute biliary problem.\n\tConsider ordering 'direct bilirubin' to differentiate causes.";
	suggestion["hypercalcemia"] = "Suspect the possibility of cancer.\n\tOrder PTH level to differentiate hyperparathyroidism from cancer\n\tTreat mild hypercalcemia with IV fluids";
	suggestion["hypocalcemia"] = "Calculate the corrected calcium level.\n\tOrder magnesium level.";
	suggestion["hypomagnesemia"] = "";
	suggestion["hypermagnesemia"] = "";
	suggestion["hyperglycemia"] = "Consider whether the patient is new onset diabetic, has DKA, has stress-induced hyperglycemia, or is on steroids.";
	suggestion["elevated total protein"] = "";
	suggestion["decreased total protein"] = "";
	suggestion["hypoalbuminemia"] = "";
	suggestion["hyperalbuminemia"] = "";
	suggestion["low total protein"] = "";
	suggestion["elevated lipase"] = "Acute pancreatitis is usually associated with a lipase at least 3 x the upper limit of normal.\nIf the patient's abdominal pain is non-specific and not clearly suggestive of pancreatitis, further evaluation of mild lipase elevation is usually not cost-effective.";
	suggestion["low A/G ratio"] = "";
	suggestion["elevated A/G ratio"] = "";
	suggestion["elevated troponin"] = "Consider whether troponin elevation might be due to renal insufficiency.\n\tConsider other causes of elevated troponin that cause chest pain including PE, CHF, myocarditis.\n\tReview EKG.  Consider repeating EKG.\n\tRepeat troponin";
	suggestion["leukocytosis"] = "Look for other SIRS criteria and obtain sepsis lactate, initiate IV fluids, blood cultures and antibiotics if indicated.\n\tConsider noninfectious causes of leukocytosis including:\n\t\tsteroid use\n\t\tvomiting";
	suggestion["leukopenia"] = "";
	suggestion["polycythemia"] = "Treat with IV fluids if dehydrated.\n\tRefer to PCP for further evaluation";
	suggestion["anemia"] = "If cause of anemia is unclear, then prior to transfusion, order:\n\t\tFerritin & iron panel\n\t\tReticulocyte count\n\t\tHaptoglobin\n\t\tB12 level & RBC folate.\n\tIf obvious GI bleeding, do not obtain fecal occult blood test, which can be false negative with gross amounts of blood.";
	suggestion["microcytosis"] = "";
	suggestion["macrocytosis"] = "";
	suggestion["thrombocytopenia"] = "";
	suggestion["thrombocytosis"] = "";
	suggestion["eosinophilia"] = "";
	suggestion["high anion gap acidosis"] = "Consider ordering:\n\t\tbeta hydroxybutyrate\n\t\tethanol\n\t\tacetaminophen level\n\t\tserum osmolality";
	suggestion["AST/ALT ratio > 2.5"] = "";
	suggestion["AST/ALT ratio between 1.5 and 2.5"] = "";
	suggestion["AST/ALT ratio less than 0.9"] = "";
	suggestion["elevated MELD score"] = "MELD score mortality table";  //*** complete
	suggestion["neutropenia"] = "";
	suggestion["neutrophilia"] = "Look for other SIRS criteria and obtain sepsis lactate, initiate IV fluids, blood cultures and antibiotics if indicated.";
	suggestion['eosinophilia'] = '';
	/*
	suggestion["hyponatremia & hyperkalemia"] = "Consider adrenal insufficiency\n\tIf the patient is hypotensive, give hydrocortisone 100 mg IV"; */
/*	suggestion["hypernatremia & hypokalemia"] = "";
	suggestion["hypochloremia & hypokalemia & hypercalcemia"] = "";
	suggestion["hypokalemia & hypocalcemia"] = "";
	suggestion["elevated LFTs & elevated creatinine"] = "";
	suggestion["hyperglycemia & hypobicarbia"] = "";
	suggestion["leukocytosis & hyperglycemia"] = "";
	suggestion["elevated AST & elevated ALT"] = "";
	suggestion["leukopenia & anemia & thrombocytopenia"] = "";
	suggestion["hyponatremia & hyperkalemia & hypocalcemia"] = "";
	suggestion["anemia & microcytosis & elevated BUN"] = "";
	suggestion["thrombocytopenia & hyponatremia"] = "";
	suggestion["leukopenia & thrombocytopenia & hyponatremia"] = "";
	suggestion["anemia & microcytosis"] = "";
	suggestion["anemia & macrocytosis"] = "";
	suggestion["anemia & thrombocytopenia & elevated creatinine"] = "";
	suggestion["anemia & elevated BUN & elevated creatinine"] = "";
	suggestion["anemia & elevated BUN"] = "";
	suggestion["elevated AST & elevated ALT & thrombocytopenia"] = "";
	suggestion["polycythemia & leukocytosis & thrombocytosis"] = "";
	suggestion["polycythemia & thrombocytosis & hypoalbuminemia"] = "";
	suggestion["hypercalcemia & elevated creatinine"] = "";
	suggestion["hypercalcemia & anemia"] = "";
	suggestion["hypoalbuminemia & anemia & eosinophilia"] = ""; 
*/
	suggestion["high anion gap metabolic acidosis"] = "Consider ordering:\n\t\tbeta hydroxybutyrate\n\t\tlactate\n\t\tethanol\n\t\tacetaminophen level\n\t\tserum osmolality";
	suggestion["low anion gap"] = "";

	
//      Disease suggestions

	suggestion['adrenal insufficiency'] = "Consider adrenal crisis.\nGive hydrocortisone 100 mg IV if refractory shock.";
	suggestion["CHF"] = "";
	suggestion["DKA"] = "Consider ordering VBG and beta hydroxybutyrate to confirm diagnosis.";
	suggestion["sepsis"] = "";
	suggestion["renal failure"] = "";
	suggestion["upper GI bleeding"] = "";
	suggestion["hypomagnesemia"] = "";
	suggestion["capillary leak syndrome"] = "";
	suggestion["HELLP syndrome"] = "";
	suggestion["iron deficiency anemia"] = "";
	suggestion["Cushing's syndrome"] = "";
	suggestion["hepatorenal syndrome"] = "";
	suggestion["milk-alkali syndrome"] = "";
	suggestion["steroid use"] = "";
	suggestion["pancytopenia"] = "Consider whether the patient has multiple distinct problems (such as an acute viral illness, chronic anemia and chronic liver disease) or truly has bone marrow failure.\nCalculate ANC.";
	suggestion["cirrhosis"] = "";
	suggestion["Ehrlichiosis"] = "Lymphopenia, thrombocytopenia, hyponatremia, and elevated LFTs are suggestive of Ehrlichiosis.\nIn the right setting (such as unexplained fever and possible tick exposure), treatment for Ehrlichiosis without other testing may be appropriate.\nConsider RMSF, and check for a rash, particularly on the wrists and ankles.\nTreatment is doxycycline 100 mg bid.";
	suggestion["hemolytic-uremic syndrome"] = "";
	suggestion["TTP"] = "";
	suggestion["multiple myeloma"] = "";
	suggestion["tertiary hyperparathyroidism"] = "";
	suggestion["aluminum toxicity"] = "";
	suggestion["eosinophilic gastritis"] = "";
	suggestion["vitamin B12 deficiency"] = "";
	suggestion["folate deficiency"] = "";

	var results = {};
	var ddx = {};
//
//Ehrlichiosis:  leukopenia, lymphopenia, thrombocytopenia, hyponatremia, elevated LFTs
//DKA:  hyponatremia, hyperglycemia, hypobicarbia

//elevated lfts:  elevated AST, ALT, AP, bilirubin
//cirrhosis:  INR, thrombocytopenia, hyponatremia, 
//polycythemia
//macrocytosis
//preeclampsia


//ANC

	
		var testVersion = false;

	var testResults = "all high";
	if (testVersion){
		setTestValues();
	} 
printAbnormalities();
	
	var FRAMECOUNT = 0;

	function calc(){
		abnormalities= [];
		ddx = {};

		results.sodium = parseInt(document.getElementById( "sodium" ).value);
		results.chloride = parseInt(document.getElementById( "chloride").value);
		results.potassium = parseFloat(document.getElementById( "potassium").value);
		results.BUN = parseInt(document.getElementById( "BUN").value);
		results.bicarb = parseInt(document.getElementById( "bicarb").value);
		results.creatinine = parseFloat(document.getElementById( "creatinine").value);
		results.glucose = parseInt(document.getElementById( "glucose").value);
		results.AST = parseInt(document.getElementById("AST").value);
		results.ALT = parseInt(document.getElementById("ALT").value);
		results['alkaline phosphatase'] = parseInt(document.getElementById("alkaline phosphatase").value);
		results.bilirubin = parseInt(document.getElementById("bilirubin").value);
		results.calcium = parseFloat(document.getElementById('calcium').value);
		results.magnesium = parseFloat(document.getElementById('magnesium').value);
		results.albumin = parseFloat(document.getElementById('albumin').value);
		results.totalprotein = parseFloat(document.getElementById('total protein').value);
		results.lipase = parseInt(document.getElementById('lipase').value);
		results.troponin = parseFloat(document.getElementById('troponin').value);
		results.WBC = parseFloat(document.getElementById('WBC').value);
		results.RBC = parseFloat(document.getElementById('RBC').value);
		results.Hgb = parseFloat(document.getElementById('Hgb').value);
		results.Hct = parseFloat(document.getElementById('Hct').value);
		results.platelets = parseFloat(document.getElementById('platelets').value);
		results.MCV = parseFloat(document.getElementById('MCV').value);
		results['Abs Neutrophils'] = parseFloat(document.getElementById('Abs Neutrophils').value);
		results['Abs Imm Gran'] = parseFloat(document.getElementById('Abs Immature Granulocytes').value);
		results['Abs Lymphocytes'] = parseFloat(document.getElementById('Abs Lymphocytes').value);
		results['Abs Monocytes'] = parseFloat(document.getElementById('Abs Monocytes').value);
		results['Abs Eosinophils'] = parseFloat(document.getElementById('Abs Eosinophils').value);
		results['Abs Basophils'] = parseFloat(document.getElementById('Abs Basophils').value);
		results['NRBC'] = parseFloat(document.getElementById('NRBC').value);
		
		results['pH'] = parseFloat(document.getElementById('pH').value);
		results.pCO2 = parseFloat(document.getElementById('pCO2').value);
		results.pO2 = parseFloat(document.getElementById('pO2').value);
		results.BE = parseFloat(document.getElementById('BE').value);
		
		/* UA results
		
		*/
		
		results["corrected sodium"] = calcCorrectedSodium(results.sodium, results.glucose);
		results['corrected calcium'] = calcCorrectedCalcium(results.calcium, results.albumin);
		results["anion gap"]= calcAnionGap(results.sodium, results.chloride, results.bicarb);
		results["BUN/Cr ratio"] = calcBUN_CrRatio(results.BUN,results.creatinine);
		results["AST/ALT ratio"] = calcAST_ALTRatio(results.AST,results.ALT);
		results["ANC"] = calcANC(results['Abs Neutrophils'],results['Abs Imm Gran']);
		results['osmolality'] = calcOsmolality(results.sodium,results.BUN,results.glucose);
		results['A/G ratio'] = calcA_GRatio(results.albumin,results.totalprotein);
		results['MELD'] = calcMELD(results.creatinine,results.bilirubin,results.sodium,1);
		
		/*ABG calculations
		results['ABG interpretation'] = calcABGinterpretation(results.pH,results.pCO2,results.HCO3,results.BE);
		
		*/
//GFR
//creatinine_clearance

		//setTestValues();
		
		document.getElementById("corrected sodium").innerHTML = "Corrected sodium = " + results['corrected sodium'] + ' (135-145)';
		document.getElementById('corrected calcium').innerHTML = "Corrected calcium = " + results['corrected calcium'] + ' (8.5-10.3)';
		document.getElementById("anion gap").innerHTML = "Anion gap = "+ results['anion gap'] + ' (4-17)';
		document.getElementById("BUN/Cr ratio").innerHTML = "BUN/Cr ratio = " + results['BUN/Cr ratio'] + ' (<20)';
		document.getElementById("AST/ALT ratio").innerHTML = "AST/ALT ratio = " + results['AST/ALT ratio'] +' (close to 1)';
		document.getElementById("ANC").innerHTML = "ANC = " + results['ANC'] + ' (>2500)';
		document.getElementById("osmolality").innerHTML = "Serum osmolality = " + results['osmolality'] + ' (275-295)';
		document.getElementById("A/G ratio").innerHTML = "Albumin/Globulin ratio = " + results['A/G ratio'] + ' (0.8-2)';
		document.getElementById("MELD").innerHTML = "MELD score (assuming no dialysis and normal INR) = " + results['MELD']+ ' (<10)';
		/*
		document.getElementById("ABG interpretation").innerHTML = "ABG interpretation: " + results["ABG interpretation"];
		*/
			     

		for (let i =0; i < labs.length; i ++){
			switch(labs[i].inRange(results[labs[i].name])){
				case -1:
					if (labs[i].low_name != '***ignore***'){
						abnormalities.push(labs[i].low_name);
						try {	
							document.getElementById(labs[i].name).style = "color:  red";
						}
						catch(err){
							console.log(labs[i].symbol);
						}
					}				
					break;
				case 0:
					try {	
						document.getElementById(labs[i].name).style = "color:  black";
					}
					catch(err){
						//console.log(labs[i].symbol);
					}	
					break;
				case 1:
					if (labs[i].high_name != '***ignore***'){
						abnormalities.push(labs[i].high_name);	
						try {	
							document.getElementById(labs[i].name).style = "color:  red";
						}
						catch(err){
							console.log(labs[i].symbol);
						}
					}				
					break;
			}
		}
		

		if (results['anion gap'] > 17){
			abnormalities.push('high anion gap metabolic acidosis');
		}

		if (results['anion gap'] < 4){
			abnormalities.push('low anion gap');
		}

		if(results['AST/ALT ratio']>2.5){
			abnormalities.push('AST/ALT ratio > 2.5');
		}

		if(results['AST/ALT ratio']>1.5 && results['AST/ALT ratio'] <2.5){
			abnormalities.push('AST/ALT ratio between 1.5 and 2.5');
		}

		if(results['AST/ALT ratio']<0.9){
			abnormalities.push('AST/ALT ratio < 0.9');
		}
		console.log(abnormalities);
		createDiseaseList(abnormalities);
		developDifferential(abnormalities);		
	}	

	function createDiseaseList(abnormalities){
		var t = '<h3>Possible Conditions:</h3>';
		var s = '<h3>Suggestions:</h3>';
		for (let i = 0; i<diseases.length; i++) {
			if (diseases[i].score(abnormalities) > 1) {
				t = t + diseases[i].name +"\n";
				s = s + suggestion[diseases[i].name] + '\n';
				console.log(s);
			//	t = t + "\t" + "suggested by:\n";
				for (let j = 0; j < diseases[i].indicators.length; j++) {
					//console.log(diseases[i].indicators[j],'in inner loop');
					if (abnormalities.includes(diseases[i].indicators[j])) {
						t = t + "\t"+diseases[i].indicators[j] + "\n";
					}
				}
			}
		}
		document.getElementById('diseases').innerHTML = t;	
		document.getElementById('disease_suggestions').innerHTML = s;
	}


	function developDifferential(abnormalities){
		ddx = [];
		var t  = '';
		var s = '';
		t = t + '<h3>Abnormal Labs</h3>\n';
		//s = s + '<h3>Suggestions</h3>\n';

		/*show all suggestions
		if(false){
			var keys = Object.keys(suggestion);
			for (let i = 0; i<keys.length;i++){
				s = s + keys[i] + '\n\t' + suggestion[keys[i]]+'\n\n';
			}
		}
		*/


		for (let i = 0; i < abnormalities.length; i++){
			t = t + '  ' + abnormalities[i] + '\n';
			if (suggestion[abnormalities[i]] != ''){
				s = s + '<h4>'+abnormalities[i]+ '</h4>' + '\t' + suggestion[abnormalities[i]] + '\n\n';
			}
		}

		t = t + '<h3>Differential Diagnoses</h3>';
		document.getElementById("ddx").innerHTML = t;
		document.getElementById("suggestions").innerHTML = s;

		//var keys = Object.keys(abnormalities);
		//console.log(keys,'keys');
		FRAMECOUNT = 0;
		for (let i = 0; i < abnormalities.length; i++){
			appendDifferential(abnormality_site[abnormalities[i]]);
			//console.log(keys[i]);
		}
	}

	function appendDifferential(target) {
		FRAMECOUNT = FRAMECOUNT + 1;
		//console.log(target,'target');
		var t = '';
		t = t + '<div id = "display'+FRAMECOUNT + '"></div>';
		t = t + '<iframe width="0" height = "0" id = "buffer';
		t = t + FRAMECOUNT + '" name="buffer' + FRAMECOUNT + '" src="'+target+'" ';
		t = t + 'onload="copyIframe(';
		t = t + '\'buffer'+FRAMECOUNT+'\',';
		t = t + '\'display'+FRAMECOUNT+'\'';
		t = t + ')"></iframe>\n';
		//console.log(t,'appendDiff');
		document.getElementById('ddx').innerHTML = document.getElementById('ddx').innerHTML + t;
	}

	function copyIframe(iframeId,divId) {
		var CurrentDiv = document.getElementById? document.getElementById(divId): null;
		var t = "";
		if (window.frames[iframeId] && CurrentDiv ) {
			t = window.frames[iframeId].document.body.innerHTML;
			CurrentDiv.innerHTML = t;
			//console.log(t,'in copyIframe');
			CurrentDiv.style.display = 'block';
		}
	}


	function calcAnionGap(sodium, chloride, bicarb) {
		return(sodium - chloride - bicarb);
	}

	function calcCorrectedSodium(sodium, glucose) {
		return(parseInt(sodium + 1.6*(glucose)/100-1));
	}

	function calcCorrectedCalcium(calcium,albumin) {
		return(parseInt((calcium + 0.8*(4 - albumin))*10)/10);
	}

	function calcBUN_CrRatio(bun,creatinine){
		x = bun/creatinine*10;
		y = parseInt(x);
		z = y/10;
		return(z);
	}

	function calcAST_ALTRatio(AST,ALT){
		return(parseInt((AST/ALT)*100)/100);
	}

	function calcANC(neuts,bands){
		return((neuts+bands)*1000);
	}

	function calcOsmolality(sodium,bun,glucose) {
		return(parseInt(2*sodium + (bun/2.8) + glucose/18));
	}

	function calcA_GRatio(albumin,protein) {
		return(parseInt((albumin/(protein - albumin)*100))/100);
	}

	function calcMELD(creatinine,bilirubin,sodium,INR) {
		if (creatinine < 1) {creatinine = 1};
		if (bilirubin < 1) {bilirubin = 1};
		if (INR < 1) {INR = 1};
		if (creatinine > 4) {creatinine = 4};
		if (sodium < 125) {sodium = 125};
		if (sodium > 137) {sodium = 137};

		MELDi = (0.957 * Math.log(creatinine) + 0.378 * Math.log(bilirubin) + 1.12 * Math.log(INR) + 0.643)*10;
		if (MELDi > 11) {
			MELD = MELDi + 1.32*(137 - sodium) - (0.033*MELDi*(137-sodium));
		}
		else
		{
			MELD = MELDi;
		}
		return(parseInt(MELD));
	}

	function calcABGinterpretation(pH,pCO2,HCO3,BE){
		var interpretation = "";
		
		return(interpretation);
	}
		

	function inRange(value,low,high){
		if (value < low) {return(-1);}
		if (value > high) {return(1);}
		return(0);
	}
	
	function parseLabs(){
		t = document.getElementById("textarea").value;
		x = t.split('\n');
		for (let i = 0; i < x.length; i++){
			//b = x[i].match(/\b([A-Z][a-z]?)\b\s+\|\s+\b([\d|\.]+)\b/);		
			b = x[i].match(/\s+([A-Z][^\|]*)\|\s+\b([\d|\.]+)\b/);
			  //b = x[i].match(/\s+([A-Za-z]
	//  matches word with capital letter by itself or followed by one lower case letter:  \b[A-Z][a-z]?\b
	//  then followed by one or more spaces:  \s+
	//  then a pipe symbol :  |
	//  then followed by one or more spaces: \s+
	//  then a word consisting of one or more digits and decimal points:  \b[\d|\.]+\b
			if (b != null)
			{
				//console.log(b);
				for (let i = 0; i < labs.length; i++){
					//console.log(b[1].trim(),labs[i].symbol);
					if (b[1].trim() == labs[i].symbol) {document.getElementById(labs[i].name).value = b[2];}
				}
			}
			
		}
		document.getElementById('textarea').value = '';
		calc();
	}


	function setTestValues(){
		for (let i = 0; i < 16; i++){
			//document.getElementById(labs[i].name).value = 0;
		}
		var keys = Object.keys(results);
		for (let i = 0; i < keys.length; i++){
			results[keys[i]] = 0;
		}
		
		
	}

      function getRadioButtonValue(name){
        var ele = document.getElementsByName(name);
        for (let i = 0; i < ele.length; i++){
          if (ele[i].checked){
            return(ele[i].value);
          }
        }
        return(-1);
      }

	function printAbnormalities(){
		var b = "";
		var keys = Object.keys(abnormalities);
		for (let i = 0; i< keys.length; i++){
			b = b + abnormalities[keys[i]];
			for (let j = 0; j < abnormalities[keys[i]].length; j++){
				b = b + '\t' + abnormalities[keys[i]][j]+'\n';
			}
		}
		document.getElementById('ddx').innerHTML = b;
	}

