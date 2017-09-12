var numbers = [1, 2, 3, 4, 5, 6] 

function max3(){
    
    var numbers.sort(function(a,b) {
        if (a < b) { return 1; }
        else if (a == b) { return 0; }
        else { return -1; }
    });

    console.log(numbers+numbers[0]+numbers[1]+numbers[2]);
}