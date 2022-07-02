let idOfUser;
let currentUser;
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
      currentUser=response;
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
  const eatingDiary=getAllTheMealsInThisDay();
  if(eatingDiary){
    currentUser.eatingDiary.push(eatingDiary);
    fetch(`http://localhost:3000/users/${idOfUser}`, {
        method: `PATCH`,
        body: JSON.stringify({
          "eatingDiary": currentUser.eatingDiary,
        }),
        headers: { 'Content-type': `application/json; charset=UTF-8` },
    })
    .then((response) => {
        if (response.status === 200 && response.status !== undefined) {
          alert(`the daily eating saved successfully`);
          modal.style.display = "none";
        }
        else {
          alert(response.message)
        }
    })
  }
  modal.style.display = "none";
}

getAllTheMealsInThisDay=()=>{
  const dateOfDay=document.querySelector(".dateOfMeal").value;
  if(!checkIfThisDayIsAlreadyExist(dateOfDay)){
    let meals=[];
    for (let j = 1; j < numMeal; j++) {
        let oneMeal=getOneMealInThisDay(j);
        if(oneMeal!==null)
          meals.push(oneMeal); 
    }
    if(meals.length>0){
      let eatingDiary={"date":dateOfDay,"meals":meals}
      return eatingDiary;
    }
    else{
      alert("you don`t add any meal Because of this we don`t save anything");
      return null;
    }
  }
  else
    alert("There is such a day in your calendar, if you would like to add or edit information contact there from the main page");
}

getOneMealInThisDay=(numOfMeal)=>{
  let foods=[];
  const collection = document.getElementById(`container-foods-${numOfMeal}`);
  const childrens=collection.children;
  for (let i = 0; i < childrens.length; i++) {
    if(childrens[i].value!=="")
      foods.push(childrens[i].value); 
  }
  if(foods.length>0) {
    let oneMeal={"Foods":foods};
    return oneMeal;
  }
  return null;
}

checkIfThisDayIsAlreadyExist=(dateOfDay)=>{
  const ifExist=currentUser.eatingDiary.find(e=>e.date===dateOfDay)
  if(!ifExist) 
    return false;
  return true;
}

