const hideDescription = (() =>{
  const displaydescriptiondiv = document.querySelector(".displaydescription");
  const description = document.querySelector(".description")
  if(displaydescriptiondiv){
    displaydescriptiondiv.addEventListener("click", ()=>{
      if(description){
        if(description.hidden){
          description.hidden = false;
          displaydescriptiondiv.textContent = "> Hide <";
        }else{
          description.hidden = true;
          displaydescriptiondiv.textContent = "> Click to read fluff <"
        }
      }
    })
  }
})();


