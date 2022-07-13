window.addEventListener('load',()=>{
  const byWeight = document.getElementById('byWeight');
  const byProcess = document.getElementById('byProcess');
  const byBMI = document.getElementById('byBMI');
  const byCity = document.getElementById('byCity');
  const inputToSearch = document.getElementById('inputSearch');
  const search = document.getElementById('searchAll');  

  const weightInputs = document.getElementById('weightInputs');
  let inputMinWeight = null;
  let inputMaxWeight = null;
  let weightDiv = null;
  let labelBigger = null;
  let labelLower = null;
  const boolSearch = [false, false, false, false];

  byWeight.onchange = (e) => { 
    e.preventDefault();
    boolSearch[0] = true;
    inputMinWeight = document.createElement('input');
    inputMaxWeight = document.createElement('input');
    labelBigger = document.createElement('label');
    labelLower = document.createElement('label');
    inputMinWeight.type = "text";
    inputMaxWeight.type = "text";
    labelBigger.innerHTML = "bigger than:";
    labelLower.innerHTML = "lower than:";
    weightDiv = document.createElement('div');
    weightDiv.append(labelBigger, inputMinWeight, labelLower, inputMaxWeight);
    weightInputs.append(weightDiv);
   }

   const bmiInputs = document.getElementById('bmiInputs');
let minBmi = null;
let maxBmi = null;
let BMIDiv = null;
let labelBigger2 = null;
let labelLower2 = null;
byBMI.onchange = (e) => {
    e.preventDefault();
    boolSearch[2] = true;
    minBmi = document.createElement('input');
    maxBmi = document.createElement('input');
    labelBigger2 = document.createElement('label');
    labelLower2 = document.createElement('label');
    minBmi.type = "text";
    maxBmi.type = "text";
    labelBigger2.innerHTML = "bigger than:";
    labelLower2.innerHTML = "lower than:";
    BMIDiv = document.createElement('div');
    BMIDiv.append(labelBigger2, minBmi, labelLower2, maxBmi);
    bmiInputs.append(BMIDiv);
}

const cityInput = document.getElementById('cityInput');
let city = null;
byCity.onchange = (e) => {
    e.preventDefault();
    boolSearch[3] = true;
    city = document.createElement('input');
    city.type = "text";
    cityInput.append(city);
}

// let list = setUsersList();
// let currentUsers = list;

//
let searches = ['', '', '', '', '', ''];
// let ezerSearch = [false, false, false, false, false, false];
//
let flag = true;
search.onclick = (e) => {
    e.preventDefault();
    for (let i = 0; i < boolSearch.length; i++) {
        if (boolSearch[i]) {
            switch (i) {
                case 0:
                    // currentUsers = byWeightFunc(currentUsers, parseInt(inputMinWeight.value), parseInt(inputMaxWeight.value));
                    searches[1] = inputMinWeight.value;
                    searches[2] = inputMaxWeight.value;
                    break;
                case 1:
                    // currentUsers = byProcessFunc(currentUsers);
                    break;
                case 2:
                    // currentUsers = byBMIFunc(currentUsers, parseInt(minBmi.value), parseInt(maxBmi.value));
                    searches[3] = minBmi.value;
                    searches[4] = maxBmi.value;
                    break;
                case 3:
                    // currentUsers = byCityFunc(currentUsers, city.value);
                    searches[5] = city.value;
                    break;
            }
        }
    }
    //sendToPrint(currentUsers);
    if (inputToSearch.value != "") {
        // currentUsers = searchFunc(list, inputToSearch.value);
        searches[0] = inputToSearch.value;
        //  sendToPrint(currentUsers);
    }
    console.log(searches);
    console.log(boolSearch);
    getFromServer(searches);
    // funcReset();
}

})

let users;
getUsers = (fromNewMeeting) => {
    fetch(`http://localhost:3000/user`)
    .then(response => response.json())
    .then(response => {
       users = response;
       usersList1(users, fromNewMeeting);
      })
    .catch(function (err) {
      console.log('Something went wrong.', err);
    });
    // const users = JSON.parse(sessionStorage.getItem('manager')).users;
    
}
usersList1 = (list, fromNewMeeting) => {
    list.forEach((element) => {
        showUser(element, fromNewMeeting);
    });
}

showUser = (user, fromNewMeeting) => {
    const element = document.getElementById('users-card');
    const cln = element.content.cloneNode(true);
    cln.querySelector('.firstName').innerText = user.firstName;
    cln.querySelector('.lastName').innerText = user.lastName;
    if(!fromNewMeeting){
        cln.querySelector('.card').addEventListener("click", () => window.location.href=`showUser.html?id=${user.id}`);
        const bmi = user.weight.meeting[user.weight.meeting.length - 1].Weight / (user.hight ** 2);
        let bmiColor;
        if(user.weight.meeting.length>1)
          bmiColor = bmi - user.weight.meeting[user.weight.meeting.length - 2].Weight / (user.hight ** 2);
        else
          bmiColor = bmi;
        cln.querySelector('.bmi').innerText = bmi;
        cln.querySelector('.bmi').id = user.id;
        document.querySelector('.i').appendChild(cln);
        changeColor(bmiColor, user.id);
    }
    else {
        cln.querySelector('.card').id = user.id;
        cln.querySelector('.weight').value = user.weight.meeting[user.weight.meeting.length - 1].Weight;
        cln.querySelector('.date').value = new Date().toISOString().split('T')[0];
        document.querySelector('.users').appendChild(cln);
    }
}

changeColor = (bmiColor, id) => {
    if (bmiColor < 0) {
        document.getElementById(id).style.backgroundColor = 'lightgreen';
    }
    else {
        document.getElementById(id).style.backgroundColor = 'red';
    };
}



saveNewMeeting = () => {
    let meeting=[];
    users.forEach(user => {
      const element = document.getElementById(user.id);
      if (!element.children[5].children[0].checked)
        meeting.push({"userId": user.id, "Weight": element.children[2].children[0].value, "date": element.children[3].children[0].value})
    });
    fetch(`http://localhost:3000/meeting`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meeting)
    })
    .then((response) => {
        if (response.status === 200 && response.status !== undefined) 
            return response.json();
        else 
            alert(response.message)
     })
    .then(data => {
        if(data){
            alert('saved successfully');
            window.location.href = "./homeManager.html";
        }
    })
    .catch(err => alert('error: ' + err.message))
  }

  
// searchFree = (users, inputToSearch) => {
//     const usersResults = users.filter(user => user.id === inputToSearch ||
//         user.firstName === inputToSearch ||
//         user.lastName === inputToSearch ||
//         user.address.city === inputToSearch ||
//         user.address.street === inputToSearch ||
//         user.phone === inputToSearch ||
//         user.email === inputToSearch ||
//         user.height === inputToSearch);
//     return usersResults;
// }
// searchByWeight = (users, min, max) => {
//     const usersResults = users.filter(user => {
//         user.weight.meeting[user.weight.meeting.length - 1].Weight >= min && user.weight.meeting[user.weight.meeting.length - 1].Weight <= max
//     });
//     return usersResults;
// }

// searchByProcess = (users, trend, time) => {
//     const usersResults = users.filter(
//         user => trend === 'ירידה' && time === 'בשבוע שעבר' && document.getElementById(user.id).style.backgroundColor === 'lightgreen'
//             || trend === 'ירידה' && time === 'בהתחלה' && user.weight.startWeight > user.weight.meeting[length - 1]
//             || trend === 'עליה' && time === 'בשבוע שעבר' && document.getElementById(user.id).style.backgroundColor === 'red'
//             || trend === 'עליה' && time === 'בהתחלה' && user.weight.startWeight < user.weight.meeting[length - 1]
//     );
//     return usersResults;
// }

// searchByBmi = (users, min, max) => {
//     const usersResults = users.filter(user => user.bmi > min && user.bmi < max);
//     return usersResults;
// }

// searchByAddress = (users, city, street) => {
//     const usersResults = users.filter(user => user.address.city == city && user.address.street == street);
//     return usersResults;

// }
drawAfterChanges = (u) => {
    let usersList = document.getElementById('i');
    let list = document.getElementById('users');
    usersList.remove();
    let usersDiv = document.createElement('div');
    usersDiv.setAttribute('class', 'i');
    list.appendChild(usersDiv);
    usersList1(u);
}

// Searches = () => {
//     let users = JSON.parse(sessionStorage.getItem('manager')).users;
//     let inputToSearch_1, inputToSearch_2;
//     inputToSearch_1 = document.getElementById('searchFree').value;
//     if (inputToSearch_1) {
//         users = searchFree(users, inputToSearch_1);
//     }

//     inputToSearch_1 = document.getElementById('searchByHigherWeight').value;
//     inputToSearch_2 = document.getElementById('searchByLessWeight').value;
//     if (inputToSearch_1 && inputToSearch_2) {
//         users = searchByWeight(users, inputToSearch_1, inputToSearch_2)
//     }

//     inputToSearch_1 = document.getElementById('searchByProcess');
//     inputToSearch_1 = document.getElementById('searchByProcessTime');
//     if (inputToSearch_1 && inputToSearch_2) {
//         users = searchByProcess(users, inputToSearch_1, inputToSearch_2);
//     }

//     inputToSearch_1 = document.getElementById('searchByHigherBmi');
//     inputToSearch_2 = document.getElementById('searchByLessBmi');
//     if (inputToSearch_1.value !== '' && inputToSearch_2.value !== '') {
//         users = searchByBmi(users, inputToSearch_1, inputToSearch_2);
//     }

//     inputToSearch_1 = document.getElementById('city');
//     inputToSearch_2 = document.getElementById('street');
//     if (inputToSearch_1 && inputToSearch_2) {
//         //  users = searchByAddress(users, inputToSearch_1, inputToSearch_2);
//     }
//     drawAfterChanges(users);
// }




// byProcess.onchange = (e) => {
//     e.preventDefault();
//     boolSearch[1] = true;
// }




const getFromServer = (searches) => {
    let a = 'aa'
    fetch(`http://localhost:3000/users/${a}}`, {
        method: `POST`,
        body: JSON.stringify(
            searches
        ),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        drawAfterChanges(data);
    })
}

//reset
// const reset = document.querySelector('#reset');
// const funcReset = () => {
//     console.log('funcReset');
//     byWeight.checked = false;
//     byProcess.checked = false;
//     byBMI.checked = false;
//     byCity.checked = false;
//     weightInputs.innerHTML = "";
//     bmiInputs.innerHTML = "";
//     cityInput.innerHTML = "";
// }
// reset.onclick = (e) => {
//     e.preventDefault();
//     funcReset();
//     sendToPrint(list);
// }