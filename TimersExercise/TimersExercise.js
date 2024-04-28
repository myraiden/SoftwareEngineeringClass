function countdown(timeIn){
  for (let i=1;i<=timeIn;i++){
      if(i==timeIn){
        setTimeout(function(){
          console.log("DONE!");
        },(1000*timeIn));
      }else{
        setTimeout(function(){
          console.log(timeIn-i);
        },(1000*i));
      } 
  }
}

countdown(4);
