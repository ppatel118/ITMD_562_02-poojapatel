var main = function () {
	"use strict";

	var hand = [
		{"rank":"A", "suit":"spades"},
		{"rank":"2", "suit":"hearts"},
		{"rank":"3", "suit":"clubs"},
		{"rank":"4", "suit":"spades"},
		{"rank":"5", "suit":"diamonds"}
	];

	var rank = [hand.rank];
	var suit = [hand.suit];
	
	function hasDuplicates(array) {
		var pair = [];
	   	for (var i = 0; i < hand.length; i++) {
   			var num = rank[i];
   			if (pairSoFar.indexOf(1) !== -1) {
   				return true;
   			}
       		pairSoFar.push(1)
   		}
   		return false;

      		    
	};
	console.log(pair); 
};
$(document).ready(main);