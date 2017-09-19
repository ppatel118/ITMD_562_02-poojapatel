var main = function () {
	"use strict";

	var hand = [
		{"rank":"A", "suit":"spades"},
		{"rank":2, "suit":"hearts"},
		{"rank":3, "suit":"clubs"},
		{"rank":4, "suit":"spades"},
		{"rank":5, "suit":"diamonds"}
	];

	var rank = [];
	var suit = [];

	function handAssessor() {
     	var resultString = "";
     
     	for (var i = 0; i < hand.length; i++) {

           	switch(pairs()){
        	  case "2":
               resultString = "1 Pair";
               break;
           	case "22":
               resultString = "2 Pairs";
               break;
          case "3":
               resultString = "3 of a Kind";
               break;
          case "23":
          case "32":
               resultString = "Full House";
               break;
          case "4":
               resultString = "4 of a Kind";
               break;
          default:
               if(straight()){
                    resultString = "Straight";     
               }
               if(aceStraight()){
                    resultString = "Ace Straight";
               }
               break;
    	if(flush()){
          	if(resultString){
               resultString += " Royal Flush";     
          	} else{
               	resultString = "Flush";
          		} 
    	if(!resultString){
        	resultString = "Bust";
    };
    console.log(resultString);
	};
  
};

	function pairs(){
     	var dupliacteNumbs = []; 
     	var result = "";
     	
     	for(var i = 0; i < rank.length; i++){
        	var dupliacteNumbs = duplicateNumsOf(rank[i]);
          		if(duplicateNums > 1 && duplicates.indexOf(rank[i]) == -1){
               		result += duplicateNums; 
               		duplicates.push(rank[i]);    
          			};
     		};
     		return result;
		};
	};

	function getLowest(){
     	var min = 12;
     	for(var i = 0; i < rank.length; i++){
          min = Math.min(min, rank[i]);     
    };
    return min;     
	};


	function occurrencesOf(n){
     	var count = 0;
     	var index = 0;   
     	do{          
          	index = rank.indexOf(n, index) + 1;  
          	if(index == 0){
               break;
          	} else{
               	count ++;
          	}
     	} while(index < rank.length);
     return count;
	};  

	function straight(){
    	var lowest = getLowest();
     	for(var i = 1; i < 5; i++){
        	if(occurrencesOf(lowest + i) != 1){
               return false
          	}     
     	}
     	return true;
	};

	function aceStraight(){
     	var lowest = 9;
     	for(var i = 1; i < 4; i++){
          	if(occurrencesOf(lowest + i) != 1){
               return false
          	}     
     	}
     	return occurrencesOf(1) == 0;

    };

    function flush(){
     	for(var i = 0; i < 4; i ++){
          	if(suit[i] != suit[i+1]){
               return false;
          }
     	}
    return true;
	};

console.log(resultString);
};

$(document).ready(main);