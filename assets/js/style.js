
/*function test(itemid){
	var testArray = [];

	window.sessionStorage.setItem("items", JSON.stringify(testArray));
	var storedArray = JSON.parse(sessionStorage.getItem("items"));//no brackets
	var i;
	for (i = 0; i < storedArray.length; i++) {
	             console.log(storedArray[i]);
	}
}*/

//console.log(localStorage.getItem("items"));

var add_to_cart = (function (itemname, price, discount) {
  var cart_item = [];
  var table_row = "";
  var totalprice = 0;
  var totaldiscount = 0;
  var finalprice = 0;
  //sessionStorage.clear();
  var index = 0; 
  var i = index;
  return function (itemname, price, discount) {
  		
		cart_item.push(itemname);

		sessionStorage.setItem("cart_item", cart_item);
		console.log(sessionStorage);

		/*test(localStorage);

		let obj={};
		for( var i = 0; i < cart_item.length; i++ ){
			obj[cart_item[i]] = obj[cart_item[i]]!= null ? obj[cart_item[i]] + 1 : 1; //stores duplicate in an obj
		}*/
		//console.log(obj);

		//console.log(cart_item);
		var cart_length = cart_item.length;
		document.getElementById("instant-cart-msg").innerHTML = itemname+" is added to cart";
		document.getElementById("item_count").innerHTML = "Items("+cart_length+")";

		table_row += '<tr>';
		table_row += '<td>'+ itemname +' <span class="close" onclick="removeItem('+ index++ +')">&times;</span></td>';
		table_row += '<td><input type="text" value="1" class="qty" onchange="changeqty(this.value, '+ price +', '+ i +', '+ discount+')"></td>';
		table_row += '<td>$<input type="text" class="priceval" value="'+ price +'" disabled></td>';
		table_row += '<td><input type="hidden" class="discount" value="'+ discount +'"></td>';
		table_row += '</tr>';	
		i++;
		document.getElementById("item-table-tbody").innerHTML = table_row;

		totalprice += price;
		totaldiscount += discount;
		finalprice = totalprice - totaldiscount;

		var total_table = '<table>';
			total_table += '<tr>';
				total_table += '<td>Items('+ cart_length +')</td>';
				total_table += '<td>:</td>';
				total_table += '<td id="totalpr">$'+ totalprice +'</td>';
			total_table += '</tr>';
			total_table += '<tr>';
				total_table += '<td>Discount</td>';
				total_table += '<td>:</td>';
				total_table += '<td id="totaldis">-$'+ totaldiscount +'</td>';
			total_table += '</tr>';
			total_table += '<tr>';
				total_table += '<td>Type Discount</td>';
				total_table += '<td>:</td>';
				total_table += '<td>-$0</td>';
			total_table += '</tr>';
			total_table += '<tr class="order-total">';
				total_table += '<td>Order Total</td>';
				total_table += '<td>:</td>';
				total_table += '<td id="finalprice">$'+ finalprice +'</td>';
			total_table += '</tr>';
		total_table += '</table>';
		document.getElementById("result").innerHTML = total_table;


  }



})();




function removeItem(x){
	var cart_item = sessionStorage.getItem("cart_item").split(",");
	cart_item.splice(x,1);
	sessionStorage.clear();

	sessionStorage.setItem("cart_item", "");
	sessionStorage.setItem("cart_item", cart_item);
	console.log(sessionStorage);

	document.getElementById("carttable").deleteRow(x + 1);

	refreshvalue();
}


function changeqty(qty, price, i, d){
	document.getElementsByClassName("priceval")[i].value = qty * price;
 	refreshvalue();
}


function refreshvalue(){
	var totalprice = 0;
 	var totaldiscount = 0;
	
	for(var i = 0; i < document.getElementsByClassName("priceval").length; i++ ){
		totalprice += parseInt(document.getElementsByClassName("priceval")[i].value);
		totaldiscount += parseInt(document.getElementsByClassName("discount")[i].value ) * parseInt(document.getElementsByClassName("qty")[i].value);
	}

	document.getElementById("totalpr").innerHTML = "$"+ totalprice ;
	document.getElementById("totaldis").innerHTML = "$"+ totaldiscount ;
	
	document.getElementById("finalprice").innerHTML = "$"+ (totalprice - totaldiscount ) ;
}