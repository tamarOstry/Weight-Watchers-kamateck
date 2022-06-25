
function getUsers(n) {
    const users=JSON.parse(sessionStorage.getItem('manager')).users;
    if(n)
      users.forEach(user=>showUser(user,n));
    else
      users.forEach(user=>showUser(user,n));

}

function changeColor(bmiColor,id) {
    if (bmiColor < 0) {
        document.getElementById(id).style.backgroundColor="lightgreen";
    }
    else {
        document.getElementById(id).style.backgroundColor="red";
    };
}

function showUser(user,n) {
    const element = document.getElementById("users-card");
    const cln = element.content.cloneNode(true);
    cln.querySelector(".firstName").innerText = user.firstName;
    cln.querySelector(".lastName").innerText = user.lastName;
    if(!n){
        cln.querySelector(".card").addEventListener("click", () => window.location.href=`showUser.html?id=${user.id}`);
        const bmi = user.weight.meeting[user.weight.meeting.length - 1].Weight / (Math.pow(user.hight, 2));
        const bmiColor = bmi - user.weight.meeting[user.weight.meeting.length - 2].Weight / (Math.pow(user.hight, 2));
        cln.querySelector(".bmi").innerText = bmi;
        cln.querySelector(".bmi").id=user.id;
        document.querySelector(".users").appendChild(cln);
        changeColor(bmiColor,user.id);
    }
    else{
        cln.querySelector('.card').id=user.id;
        cln.querySelector(".weight").value = user.weight.meeting[user.weight.meeting.length-1].Weight;
        cln.querySelector(".date").value = new Date().toISOString().split('T')[0];
        document.querySelector(".users").appendChild(cln);
    }
}
