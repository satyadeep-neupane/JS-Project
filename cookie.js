function setPersistentCookie(syntax, result)
{
	history.push({
		syntax : syntax,
		result : result
	});

	var date = new Date();
		date.setTime(date.getTime() + (30*24*60*60*1000));
	let maxAge = date.toUTCString();
	document.cookie = "history="+JSON.stringify(history)+"; expires="+maxAge+";path=/;SameSite=None; Secure";
}

function getCookie(cookieName)
{
	let cookieList = document.cookie;
	let cookies = cookieList.split('; ');
	for(cookie of cookies)
	{
		let key = cookie.split('=')[0];
		if(key == cookieName)
			return(JSON.parse(cookie.split('=')[1]));
	}
	return null;
}