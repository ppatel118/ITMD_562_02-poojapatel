var main = function () {
	"use strict";

		$(".relevant p:nth-child(1)").css("color", "red");
		$(".relevant p:nth-child(2)").css("color", "orange");
		$(".relevant p:nth-child(3)").css("color", "yellow");
		$(".relevant p:nth-child(4)").css("color", "green");
		$(".relevant p:nth-child(5)").css("color", "blue");
		$(".relevant p:nth-child(6)").css("color", "purple");
		$(".relevant p:nth-child(7)").css("color", "pink");
};

$(document).ready(function(){
   $("div.relevant").hide().fadeIn(2000);
    }); 
 
$(document).ready(main);