
function getUsers() {
    const users=JSON.parse(sessionStorage.getItem('manager')).users;
    users.forEach(user=>showUser(user));
}

function changeColor(bmiColor,id) {
    if (bmiColor < 0) {
        document.getElementById(id).style.backgroundColor="lightgreen";
    }
    else {
        document.getElementById(id).style.backgroundColor="red";
    };
}

function showUser(user) {
    const element = document.getElementById("users-card");
    const cln = element.content.cloneNode(true);
    cln.querySelector(".firstName").innerText = user.firstName;
    cln.querySelector(".lastName").innerText = user.lastName;
    cln.querySelector(".card").addEventListener("click", () => window.location.href=`showUser.html?id=${user.id}`);
    const bmi = user.weight.meeting[user.weight.meeting.length - 1].Weight / (Math.pow(user.hight, 2));
    const bmiColor = bmi - user.weight.meeting[user.weight.meeting.length - 2].Weight / (Math.pow(user.hight, 2));
    cln.querySelector(".bmi").innerText = bmi;
    cln.querySelector(".bmi").id=user.id;
    document.querySelector(".users").appendChild(cln);
    changeColor(bmiColor,user.id);
}
