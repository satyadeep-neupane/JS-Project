function getHistory()
{
	try{
		history = getCookie('history');
		if(history == null)
			throw "Invalid";
	}catch(e)
	{
		if(e == "Invalid")
			history = [];
	}
	showHistory();
}

function showHistory()
{
	let div = document.createElement('div');
	let p = document.createElement('p');
	let span = document.createElement('span');
	let filer = document.getElementById('history');
	filer.innerHTML = '';

	if(history.length != 0)
	{
		let start = history.length - 1;
		let stop;
		if(history.length >= 5)
			stop = history.length-5;
		else
			stop = 0;

		for(let i=stop; i <= start; i++)
		{
			p.innerHTML = history[i].syntax+"<br><span>"+history[i].result+"</span>";
			div.appendChild(p.cloneNode(true));
			div.innerHTML += "<hr>";
		}

		filer.appendChild(div);
	}else{
		let filer = document.getElementById('history');
		div.innerHTML = "<hr><p>No history available..</p></hr>"
		filer.appendChild(div);
	}
}

function clearHistory()
{
	var date = new Date();
	date.setTime(date.getTime() - (30*24*60*60*1000));
	let maxAge = date.toUTCString();
	let def = []
	document.cookie = "history="+JSON.stringify(def)+"; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=None; Secure";
	
	getHistory();	
}

//////////////////////////////////////--------History--------//////////////////////////////////////



function calculateResult()
{
	if(syntax != '')
	{
		while(oprn.includes(syntax[syntax.length - 1]))
		{
			syntax = syntax.substring(0, syntax.length-1);
		}

		toPostFix();
		let result = postFixCalculate();
		document.getElementById('result').textContent = result;
		setPersistentCookie(syntax, result);
		dispResult = true;
		showHistory();
	}
}

function clearResult(oldSyntax, type)
{
	if(dispResult)
		newSyntax = '';
	else{
		let length = oldSyntax.length;
		newSyntax = oldSyntax.substring(0, length-1);
	}

	syntax = newSyntax;
	if(type){
		document.getElementById('result').textContent = '0';
		dispResult = false;
	}

	if(syntax.length > 0)
		document.getElementById('syntax').textContent = syntax;
	else
		document.getElementById('syntax').textContent = '0';

}

//////////////////////////////////////--------Result--------//////////////////////////////////////



function displayMenu(type)
{
	let menu = document.getElementById('sub-menu');
	if(type == 1 && menuShown == 0){
		menuShown = 1;
		menu.style.display = 'block';
		document.addEventListener('click', hideMenu);
	}
	else{
		menuShown = 0;
		menu.style.display = 'none';
		document.removeEventListener("click", hideMenu);
	}
}

function hideMenu(event)
{
	if(menuShown == 1)
		if(event.target.innerText != 'File')
				displayMenu(0);
}

//////////////////////////////////////--------Menu--------//////////////////////////////////////



function showPopup(type = 0)
{
	let popup = document.getElementById('popup');
	let  p = document.createElement('p');
	popup.style.display = 'block';
	if(type == 0)
	{
		if(popupShown != 0){
			popup.removeChild(popup.lastChild);
		}
		p.innerHTML = "get back in <span id='timer'>10s</span> or <a href='#' onclick='hidePopup()'>close(x)</a>";
		interval = setInterval(countdown, 1000);
	}else{
		if(popupShown != 0){
			popup.removeChild(popup.lastChild);
		}
		p.innerHTML = "<a href='#' onclick='hidePopup()'>close(x)</a>";
	}
	popup.appendChild(p);
	popupShown = 1;
}

function hidePopup()
{
	clearInterval(interval);
	document.getElementById('popup').style.display = 'none';
}

//////////////////////////////////////--------Popup--------//////////////////////////////////////



function countdown()
{
	let counter = document.getElementById('timer');
	let timeLeft = parseInt(counter.innerText) - 1;
	counter.textContent = timeLeft;
	if(timeLeft == 0)
	{
		clearInterval(interval);
		hidePopup();
	}
}

//////////////////////////////////////--------Counter--------//////////////////////////////////////
