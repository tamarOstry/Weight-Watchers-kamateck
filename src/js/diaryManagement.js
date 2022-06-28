let idOfUser;
getParams=()=>{
    const params = new URLSearchParams(window.location.search)
    idOfUser= JSON.parse(params.get('id'));
}

getAllDiary=()=>{
   getParams();
   fetch(`../../users.json`)
    .then(response => response.json())
    .then(response => {
            console.log(response.users);
            const currentUser=response.users.find(u=>u.id==idOfUser)
            currentUser.eatingDiary.forEach(d => showDayEating(d));   
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
addMeal=()=>{
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
}

createInput=()=>{
    let input=document.createElement('input');
    input.type="text";
    input.className="input-food";
    input.placeholder="Enter food";
    input.autocomplete="off";
    document.querySelector(".container-inputs").appendChild(input); 
}

saveNewMeal=()=>{
    //save the new meal 
    modal.style.display = "none";
}

DaySummary=()=>{

}