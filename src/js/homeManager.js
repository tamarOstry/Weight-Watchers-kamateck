const manager=new Manager(1,"ran","man","0583214675","t@gmail.com");

function getUsers(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../../users.json');
    xhr.send();
    xhr.onload = function () {
    if (xhr.status != 200) {
        alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
        let users = JSON.parse(xhr.responseText).users;
        manager.users = users; 
        sessionStorage.setItem('users',JSON.stringify(users));
        // sessionStorage.setItem('manager',JSON.stringify(manager));
        console.log(manager)
        users.forEach(user => {
            showUser(user)
        });
    }
}
}

function showUser(user){
    const element = document.getElementById("users-card");
    const cln = element.content.cloneNode(true);
    cln.querySelector(".firstName").innerText = user.firstName;
    cln.querySelector(".lastName").innerText = user.lastName;
    cln.querySelector(".card").addEventListener("click", () => window.location.href=`showUser.html?id=${user.id}`);
    const bmi=user.weight.meeting[user.weight.meeting.length-1].Weight/(Math.pow(user.hight,2));
    cln.querySelector(".bmi").innerText = bmi;
    document.querySelector(".users").appendChild(cln);
}