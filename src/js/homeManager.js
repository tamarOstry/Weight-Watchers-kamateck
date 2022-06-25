
getUsers = (n) => {
    const users = JSON.parse(sessionStorage.getItem('manager')).users;
     usersList1(users,n);
}
usersList1 = (list,n) => {
    debugger
    list.forEach((element) => {
        showUser(element,n);
    });
}

showUser = (user,n) => {
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
        document.querySelector(".i").appendChild(cln);
        changeColor(bmiColor,user.id);
    }
    else{
        cln.querySelector('.card').id=user.id;
        cln.querySelector(".weight").value = user.weight.meeting[user.weight.meeting.length-1].Weight;
        cln.querySelector(".date").value = new Date().toISOString().split('T')[0];
        document.querySelector(".users").appendChild(cln);
    }
}

changeColor = (bmiColor, id) => {
    if (bmiColor < 0) {
        document.getElementById(id).style.backgroundColor = "lightgreen";
    }
    else {
        document.getElementById(id).style.backgroundColor = "red";
    };
}

Searches = () => {
    let users = JSON.parse(sessionStorage.getItem('manager')).users;
    let inputToSearch_1, inputToSearch_2;
    inputToSearch_1 = document.getElementById('searchFree').value;
    if (inputToSearch_1) {
        users = searchFree(users, inputToSearch_1);
    }

    inputToSearch_1 = document.getElementById('searchByHigherWeight').value;
    inputToSearch_2 = document.getElementById('searchByLessWeight').value;
    if (inputToSearch_1 && inputToSearch_2) {
        users = searchByWeight(users, inputToSearch_1, inputToSearch_2)
    }

    inputToSearch_1 = document.getElementById('searchByProcess');
    inputToSearch_1 = document.getElementById('searchByProcessTime');
    if (inputToSearch_1 && inputToSearch_2) {
        users = searchByProcess(users, inputToSearch_1, inputToSearch_2);
    }

    inputToSearch_1 = document.getElementById('searchByHigherBmi');
    inputToSearch_2 = document.getElementById('searchByLessBmi');
    if (inputToSearch_1.value != '' && inputToSearch_2.value != '') {
        users = searchByBmi(users, inputToSearch_1, inputToSearch_2);
    }

    inputToSearch_1 = document.getElementById('city');
    inputToSearch_2 = document.getElementById('street');
    if (inputToSearch_1 && inputToSearch_2) {
        //  users = searchByAddress(users, inputToSearch_1, inputToSearch_2);
    }
    drawAfterChanges(users);
}
searchFree = (users, inputToSearch) => {
    debugger
    const usersResults = users.filter(user => user.id === inputToSearch ||
        user.firstName === inputToSearch ||
        user.lastName === inputToSearch ||
        user.address.city === inputToSearch ||
        user.address.street === inputToSearch ||
        user.phone === inputToSearch ||
        user.email === inputToSearch ||
        user.height === inputToSearch);
    return usersResults;
}
searchByWeight = (users, min, max) => {
    debugger
    const usersResults = users.filter(user => {
        debugger;
        user.weight.meeting[ user.weight.meeting.length - 1].Weight >= min && user.weight.meeting[user.weight.meeting.length - 1].Weight <= max});
    return usersResults;
}

searchByProcess = (users, trend, time) => {
    const usersResults = users.filter(
        user => trend == "ירידה" && time == "בשבוע שעבר" && document.getElementById(user.id).style.backgroundColor == "lightgreen"
            || trend == "ירידה" && time == "בהתחלה" && user.weight.startWeight > user.weight.meeting[length - 1]
            || trend == "עליה" && time == "בשבוע שעבר" && document.getElementById(user.id).style.backgroundColor == "red"
            || trend == "עליה" && time == "בהתחלה" && user.weight.startWeight < user.weight.meeting[length - 1]
    );
    return usersResults;
}

searchByBmi = (users, min, max) => {
    const usersResults = users.filter(user => user.bmi > min && user.bmi < max);
    return usersResults;

}
// searchByAddress = (users, city, street) => {
//     const usersResults = users.filter(user => user.address.city == city && user.address.street == street);
//     return usersResults;

// }
drawAfterChanges = (u) => {
    debugger
    let usersList =document.getElementById("i");
    let list = document.getElementById("users");
    usersList.remove();
    let usersDiv = document.createElement("div");
    usersDiv.setAttribute("class", "i");
    list.appendChild(usersDiv);
    usersList1(u);
}





