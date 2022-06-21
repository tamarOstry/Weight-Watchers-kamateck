window.addEventListener('load', (event) => {
    getParams();
});

function getParams(){
    const params = new URLSearchParams(window.location.search)
    const id=params.get('id');
    getThisUser(id);
}

function getThisUser(id) {
   const users= JSON.parse(sessionStorage.getItem('manager')).users;
   let thisUser;
   thisUser=users.find(user => user.id == id);
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