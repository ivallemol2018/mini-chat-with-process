const calculo = () =>{
  const cant = process.argv[2];
  let numRandoms = []
  for(i=1; i<=cant; i++){
    numRandoms.push(Math.floor(Math.random() * 999) + 1);
  }
  let numRandomsSort = [...numRandoms].sort()
  let arrayNumRandmsCoincidence = []
  let coincidence = 1    
  
  numRandomsSort.forEach((number,index) =>{
    if(numRandomsSort[index+1] === number){
      coincidence++
    }else{
      let obj = {number,coincidence}
      arrayNumRandmsCoincidence.push(obj)
      coincidence = 1
    }
  })

  return arrayNumRandmsCoincidence;

}

process.on('message', (msg) => {
  const arrayNumRandmsCoincidence = calculo();
  process.send(arrayNumRandmsCoincidence);
});