let syntax = '';
let stack = [];
let temp = '';
let oprn = ['+', '-', '/', '*'];
let postfixExp = [];

function createSyntax(val)
{
	syntax += val;
	if(syntax.length > 15)
		syntax = syntax.substring(0, 15);
	document.getElementById('syntax').textContent = syntax;
}

function toPostFix()
{
	for (let i = 0; i < syntax.length; i++) {
		if(oprn.includes(syntax[i])){
			postfixExp.push(temp);
			temp = '';

			if(stack.length == 0){
				stack.push(syntax[i]);
			}else{
				if(syntax[i] == '+' || syntax[i] == '-')
					while(stack.length != 0)
						postfixExp.push(stack.pop());
				stack.push(syntax[i]);
			}					
		}else{
			temp += syntax[i];
		}
	}

	if(temp != ''){
		postfixExp.push(temp);
		temp = '';
	}

	while(stack.length != 0)
		postfixExp.push(stack.pop());
}

function postFixCalculate()
{
	stack = [];
	while(postfixExp.length != 0)
	{
		let val = postfixExp.shift();
		if(oprn.includes(val))
		{
			let a = stack.pop();
			let b = stack.pop();
			stack.push(calculateThis(a, b, val));
		}else{
			stack.push(val);
		}
	}

	let finalResult;
	if(stack.length == 1)
	{
		finalResult = stack.pop();
	}else{
		finalResult = "Invalid Syntax Input";
	}
		stack = [];
		postfixExp = [];
		temp = '';

	return finalResult;
}

function calculateThis(a, b, sym)
{
	switch(sym)
	{
		case '+':
			return (parseFloat(a) + parseFloat(b));
		case '-':
			return (parseFloat(b) - parseFloat(a));
		case '*':
			return (parseFloat(a) * parseFloat(b));
		case '/':
			return (parseFloat(b) / parseFloat(a));
	}
}
