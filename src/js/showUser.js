window.addEventListener('load', (event) => {
    getParams();
});

getParams = () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id');
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
    const bmi = user.weight.meeting[user.weight.meeting.length - 1].Weight / (Math.pow(user.hight, 2));
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
    let manager = JSON.parse(sessionStorage.getItem('manager'));
    let users = manager.users;
    debugger
    let params = 2;
    for (let index = 0; index < users.length; index++) {
        if (params == users[index].id) {
            users[index].firstName == getElementsByClassName("firstName").innerText
            users[index].firstName == getElementsByClassName("lastName").innerText
            users[index].firstName == getElementsByClassName("email").innerText
            users[index].firstName == getElementsByClassName("phone").innerText
            users[index].firstName == getElementsByClassName("city").innerText
            users[index].firstName == getElementsByClassName("street_number").innerText
            users[index].firstName == getElementsByClassName("hight").innerText
            users[index].firstName == getElementsByClassName("startWeight").innerText
            users[index].firstName == getElementsByClassName("weight").innerText
            users[index].firstName == getElementsByClassName("bmi").innerText
            manager.users = users;
            sessionStorage.setItem('manager', JSON.stringify(manager));
        };
    }

}
