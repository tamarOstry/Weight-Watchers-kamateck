let idOfUser;
getParams=()=>{
    const params = new URLSearchParams(window.location.search)
    idOfUser= JSON.parse(params.get('id'));
}

getAllDiary=()=>{
    getParams();
    fetch(`http://localhost:3000/users/${idOfUser}`)
    .then((response) => {
          if (response.status === 200 && response.status !== undefined)
               return response.json();
          else 
              alert(response.message)
    })
    .then((response) => {
      console.log(response.users);
      response.eatingDiary.forEach(d => showDayEating(d));
    })
    .catch(err => console.error(err)); 
}

showDayEating=(oneDay)=>{
    let numOfMeat=1;
    const element = document.querySelector(".dayEating-card");
    const cln = element.content.cloneNode(true);
    cln.querySelector(".date").innerText = oneDay.date;
    oneDay.meals.forEach(meal =>{
       cln.getElementById(numOfMeat).innerText= meal.Foods;
       numOfMeat++;
    });
    document.querySelector(".container").appendChild(cln);
}
let modal;
addDate=()=>{
document.querySelector(".dateOfMeal").value = new Date().toISOString().split('T')[0];
modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

for (let i=0; i<3; i++)
    drowMeal()

}
let numMeal=1;
drowMeal=()=>{
  let numToCreateInput=numMeal;
  const element = document.querySelector(".add-date-card");
  const cln = element.content.cloneNode(true);
  cln.querySelector(".meal-title").innerText = `meal-${numMeal}`;
  cln.querySelector(".container-foods").id=`container-foods-${numMeal}`;
  cln.querySelector(".addMoreFood").addEventListener("click",()=>createInput(numToCreateInput));
  numMeal++;
  document.querySelector(".modal-content").appendChild(cln);
}

createInput=(numToCreateInput)=>{
    let numInput=6;
    let input=document.createElement('input');
    input.type="text";
    input.id=numInput++;
    input.placeholder="Enter food";
    input.autocomplete="off";
    document.getElementById(`container-foods-${numToCreateInput}`).appendChild(input); 
}



saveNewDate=()=>{
  
    const collection = document.querySelector(".container-foods");
    for (let i = 0; i < collection.length; i++) {
        collection[i].setAttribute('contenteditable', 'true')
    }

    modal.style.display = "none";
}
