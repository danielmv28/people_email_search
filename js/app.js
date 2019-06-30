	window.addEventListener('load',function(){
			
		var boton_go=document.querySelector('#btn_submit');
		var boton_go2=document.querySelector('#btn_submit2');
		var email=document.querySelector('#email');
		var email2=document.querySelector('#email2');
		var data=[];
		//VALIDACION DEL EMAIL
		function validateEmail(email_input){
			if (email_input.value=="") { //Validate that this is an email (REGEX)
				document.querySelector('#error').style.display='block';
			}else{
				var foundedEmail = findEmail(email_input.value)
				if (foundedEmail != undefined){
					displayNone(foundedEmail);
					getLocalStorage();
					displayBlock();
					document.getElementById('userName').scrollIntoView();
				} else {
					document.querySelector('#error').style.display='block';
				}		
			}
		}
		function findEmail(email_val){
			var foundedObject;
			// Validate that email is in JSON
			for (var i = 0; i < data.length; i++){
			  if (data[i].email == email_val){
			   foundedObject = data[i];
			  }
			}
			return foundedObject;
		}
		function displayNone(foundedObject){
			localStorage.setItem('name',foundedObject.name);
			localStorage.setItem('address',foundedObject.address);
			localStorage.setItem('email',foundedObject.email);
			localStorage.setItem('age',foundedObject.age);
			localStorage.setItem('notes',foundedObject.notes);
			localStorage.setItem('phoneNumbers',JSON.stringify(foundedObject.phoneNumbers));
			localStorage.setItem('relatives',JSON.stringify(foundedObject.relatives));
			document.querySelector('#firstContainer').style.display='none';
		}
		function getLocalStorage(){
			var name=localStorage.getItem('name');
			var addr=localStorage.getItem('address');
			var email=localStorage.getItem('email');
			var age=localStorage.getItem('age');
			var notes=localStorage.getItem('notes');
			var phoneNumbers=JSON.parse(localStorage.getItem('phoneNumbers'));
			var relatives=JSON.parse(localStorage.getItem('relatives'));
			/////////////////SHOW RESULTS///////////////////////
			document.querySelector('#userName').innerHTML=name;
			document.querySelector('#userAddress').innerHTML=addr;
			document.querySelector('#userEmail').innerHTML=email;
			document.querySelector('#userPhone').innerHTML='';
			document.querySelector('#userPhone').appendChild(displayPhoneNumber(phoneNumbers));
			document.querySelector('#userRelatives').innerHTML='';
			document.querySelector('#userRelatives').appendChild(displayRelatives(relatives));
			document.querySelector('#userAge').innerHTML=age;
		}
		function displayPhoneNumber(phoneNumbers){
			var mainDiv=document.createElement('div');
			for(i=0;i<phoneNumbers.length;i++){
				var phone=phoneNumbers[i].phone;
				var p = document.createElement('p');
				p.innerHTML = phone;
				mainDiv.appendChild(p);
			}
			return mainDiv;
		}
		function displayRelatives(relatives){
			var Div=document.createElement('div');
			for(i=0;i<relatives.length;i++){
				var rel_name=relatives[i].name;
				var p = document.createElement('p');

				p.innerHTML = rel_name;
				Div.appendChild(p);
			}
			return Div;
		}
		//MUESTRA LA SECCION DE LOS RESULTADOS
		function displayBlock(email){

			document.querySelector('#results').style.display='block';
		}

		boton_go.addEventListener('click',function(){
			validateEmail(email);

		});
		boton_go2.addEventListener('click',function(){
			validateEmail(email2);
			
		});
		function getData(){
			var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		       
		       var respuesta=JSON.parse(xhttp.responseText);
		       data=respuesta.data;
		       var salida='';
		    }
		};
		xhttp.open("GET", "../js/data.json", true);
		xhttp.send();	
		}
		getData();
		
	});
