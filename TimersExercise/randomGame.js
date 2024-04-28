function randomGame(){
    //initiate values
    let count=0;
    //run the random number generator every 1000ms (1s)
    let timerID=setInterval(function(){
        let number=Math.random();
    
        //add plus 1 to the counter for the attempt
        count+=1;

        //if the number is greater than 0.75
        if (number>0.75){
            //and print the number of tries
            console.log(count);
            //end the interval
            clearInterval(timerID);
        }
    },1000);

}

randomGame();