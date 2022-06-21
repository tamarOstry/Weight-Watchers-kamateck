window.addEventListener('load', (event) => {
    debugger
    getParams();
});

function getParams(){
    debugger
    const params = new URLSearchParams(window.location.search)
    const id=params.get('id');
    getThisUser(id);
}

function getThisUser(id) {
  //  const users= JSON.parse(sessionStorage.getItem('manager')).users;
   const users= JSON.parse(sessionStorage.getItem('users'));
   console.log(users)
   let thisUser;
   for (let i=0; i<users.length; i++) {
     if(users[i].id==id){
       thisUser = users[i];
       break;
     }
   }
   if(thisUser!=null) {
     showUser(thisUser);
   }
}

function showUser(user){
    const element = document.getElementById("users-card");
    const cln = element.content.cloneNode(true);
    cln.querySelector(".firstName").innerText = user.firstName;
    cln.querySelector(".lastName").innerText = user.lastName;
    cln.querySelector(".email").innerText = user.email;
    cln.querySelector(".phone").innerText = user.phone;
    cln.querySelector(".city").innerText = user.address.city;
    cln.querySelector(".street_number").innerText = user.address.street+" "+user.address.number;
    cln.querySelector(".hight").innerText = user.hight;
    cln.querySelector(".startWeight").innerText = user.weight.startWeight;
    cln.querySelector(".weight").innerText = user.weight.meeting[user.weight.meeting.length-1].Weight;
    const bmi=user.weight.meeting[user.weight.meeting.length-1].Weight/(Math.pow(user.hight,2));
    cln.querySelector(".bmi").innerText = bmi;
    document.querySelector(".users").appendChild(cln);
}