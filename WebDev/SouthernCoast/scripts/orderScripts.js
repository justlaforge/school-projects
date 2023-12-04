
document.addEventListener("click", gritsTot);
function gritsTot(){
	var input = document.getElementById("grits");
	var quantity = input.value;
	var price = 12.50;
	var total1 = (quantity*price).toFixed(2);
	sngTotal.innerHTML = "$"+total1;
}

document.addEventListener("click", biscuitsTot);
function biscuitsTot(){
	var input = document.getElementById("biscuits");
	var quantity = input.value;
	var price = 10.99;
	var total2 = (quantity*price).toFixed(2);
	bngTotal.innerHTML = "$"+total2;
}

document.addEventListener("click", reubenTot);
function reubenTot(){
	var input = document.getElementById("reuben");
	var quantity = input.value;
	var price = 11.99;
	var total3 = (quantity*price).toFixed(2);
	rsTotal.innerHTML = "$"+total3;
}

document.addEventListener("click", frogStewTot);
function frogStewTot(){
	var input = document.getElementById("frogStew");
	var quantity = input.value;
	var price = 13.99;
	var total4 = (quantity*price).toFixed(2);
	lcbTotal.innerHTML = "$"+total4;
}

document.addEventListener("click", lobsterTot);
function lobsterTot(){
	var input = document.getElementById("lobster");
	var quantity = input.value;
	var price = 42.99;
	var total5 = (quantity*price).toFixed(2);
	rlTotal.innerHTML = "$"+total5;
}

document.addEventListener("click", gumboTot);
function gumboTot(){
	var input = document.getElementById("gumbo");
	var quantity = input.value;
	var price = 25.99;
	var total6 = (quantity*price).toFixed(2);
	cgTotal.innerHTML = "$"+total6;
}

document.addEventListener("click", eggsTot);
function eggsTot(){
	var input = document.getElementById("eggs");
	var quantity = input.value;
	var price = 6.99;
	var total7 = (quantity*price).toFixed(2);
	deTotal.innerHTML = "$"+total7;
}

document.addEventListener("click", onionsTot);
function onionsTot(){
	var input = document.getElementById("onions");
	var quantity = input.value;
	var price = 4.49;
	var total8 = (quantity*price).toFixed(2);
	voTotal.innerHTML = "$"+total8;
}

document.addEventListener("click", totalTotal);
function totalTotal(){ 
	var overallTotal = 0;
	overallTotal += onions.value*4.49; 
	overallTotal += eggs.value*6.99;
	overallTotal += gumbo.value*25.99;
	overallTotal +=	lobster.value*42.99; 
	overallTotal += frogStew.value*13.99;
	overallTotal += reuben.value*11.99;
	overallTotal += biscuits.value*10.99;
	overallTotal += grits.value*12.50;
	var subTot = overallTotal;
	console.log(subTot);
	subTotal.innerHTML = "$"+subTot.toFixed(2);
	var tax = subTot*0.08;
	taxes.innerHTML = "$"+tax.toFixed(2);
	if(tip1.checked){
		tip.value = 0.15;
	}
	else if(tip2.checked){
		tip.value = 0.20;
	}
	else if(tip3.checked){
		tip.value = 0.25;
	} else {
		tip.value = 0;
	}
	var tips = subTot*tip.value;
	tip.innerHTML = "$"+tips.toFixed(2);
	finalTotal.innerHTML = "$"+(subTot + tax + tips).toFixed(2);

}
