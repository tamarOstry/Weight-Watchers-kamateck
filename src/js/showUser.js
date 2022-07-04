window.addEventListener('load', (event) => {
    getParams();
});
let id;
getParams = () => {
    const params = new URLSearchParams(window.location.search)
    id = params.get('id');
    getThisUser(id);
}

getThisUser = (id) => {
    const users = JSON.parse(sessionStorage.getItem('manager')).users;
    let thisUser;
    thisUser = users.find(user => user.id == id);
    if (thisUser != null) {
        showUser(thisUser);
    }
}
showUser = (user) => {
    const element = document.getElementById("users-card");
    const cln = element.content.cloneNode(true);
    cln.querySelector(".firstName").innerText = user.firstName;
    cln.querySelector(".lastName").innerText = user.lastName;
    cln.querySelector(".email").innerText = user.email;
    cln.querySelector(".phone").innerText = user.phone;
    cln.querySelector(".city").innerText = user.address.city;
    cln.querySelector(".street_number").innerText = user.address.street + " " + user.address.number;
    cln.querySelector(".hight").innerText = user.hight;
    cln.querySelector(".startWeight").innerText = user.weight.startWeight;
    cln.querySelector(".weight").innerText = user.weight.meeting[user.weight.meeting.length - 1].Weight;
    const bmi = user.weight.meeting[user.weight.meeting.length - 1].Weight / (user.hight**2);
    cln.querySelector(".bmi").innerText = bmi;
    document.querySelector(".users").appendChild(cln);
}
edit = () => {
    debugger
    const collection = document.getElementsByTagName("td");
    for (let i = 0; i < collection.length; i++) {
        collection[i].setAttribute('contenteditable', 'true')
    }
    alert("now you have to edit your details😉")

}

save = () => {
    debugger
    let manager = JSON.parse(sessionStorage.getItem('manager'));
    let users = manager.users;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id==id) {
            users[i].firstName = document.querySelector(".firstName").innerHTML;
            users[i].lastName = document.querySelector(".lastName").innerHTML;
            users[i].email = document.querySelector(".email").innerHTML;
            users[i].phone = document.querySelector(".phone").innerHTML;
            users[i].city = document.querySelector(".city").innerHTML;
            users[i].street_number = document.querySelector(".street_number").innerHTML;
            users[i].hight = document.querySelector(".hight").innerHTML;
            users[i].startWeight = document.querySelector(".startWeight").innerHTML;
            users[i].weight.meeting[users[i].weight.meeting.length - 1].Weight = document.querySelector(".weight").innerHTML;
            users[i].bmi = document.querySelector(".bmi").innerHTML;
            manager.users = users;
            sessionStorage.setItem('manager', JSON.stringify(manager));
            break;
        };
    }

}
