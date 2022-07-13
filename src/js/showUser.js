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
    thisUser = users.find(user => user.id === id);
    if (thisUser !== null) {
        showUser(thisUser);
    }
}
showUser = (user) => {
    const element = document.getElementById('users-card');
    const cln = element.content.cloneNode(true);
    cln.querySelector('.firstName').innerText = user.firstName;
    cln.querySelector('.lastName').innerText = user.lastName;
    cln.querySelector('.email').innerText = user.email;
    cln.querySelector('.phone').innerText = user.phone;
    cln.querySelector('.city').innerText = user.address.city;
    cln.querySelector('.street_number').innerText = user.address.street + ' ' + user.address.number;
    cln.querySelector('.hight').innerText = user.hight;
    cln.querySelector('.startWeight').innerText = user.weight.startWeight;
    cln.querySelector('.weight').innerText = user.weight.meeting[user.weight.meeting.length - 1].Weight;
    const bmi = user.weight.meeting[user.weight.meeting.length - 1].Weight / (user.hight**2);
    cln.querySelector('.bmi').innerText = bmi;
    document.querySelector('.users').appendChild(cln);
}
edit = () => {
    const collection = document.getElementsByTagName('td');
    for (let i = 0; i < collection.length - 2; i++) {
        collection[i].setAttribute('contenteditable', 'true')
    }
    alert('now you have to edit your details😉')

}

save = () => {
    let manager = JSON.parse(sessionStorage.getItem('manager'));
    let users = manager.users;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            if (validation() === true) {
                users[i].firstName = document.querySelector('.firstName').innerHTML;
                users[i].lastName = document.querySelector('.lastName').innerHTML;
                users[i].email = document.querySelector('.email').innerHTML;
                users[i].phone = document.querySelector('.phone').innerHTML;
                users[i].city = document.querySelector('.city').innerHTML;
                users[i].street_number = document.querySelector('.street_number').innerHTML;
                users[i].hight = document.querySelector('.hight').innerHTML;
                users[i].weight.meeting[users[i].weight.meeting.length - 1].Weight = document.querySelector('.weight').innerHTML;
                users[i].startWeight = document.querySelector('.startWeight').innerHTML;
                users[i].bmi = document.querySelector('.bmi').innerHTML;
                manager.users = users;
                sessionStorage.setItem('manager', JSON.stringify(manager));
                break;
            };
        }
    }

}
validation = () => {
    let key = 0;
    if (validateText(document.querySelector('.firstName').innerHTML) !== 0
        || validateText(document.querySelector('.lastName').innerHTML) !== 0
        || validateText(document.querySelector('.city').innerHTML) !== 0
        || validateText(document.querySelector('.street_number').innerHTML) !== 0
        || validateEmail(document.querySelector('.email').innerHTML) !== 0
        || validatePhone(document.querySelector('.phone').innerHTML) !== 0
        || validateHight(document.querySelector('.hight').innerHTML) !== 0
        || validateWeight(document.querySelector('.weight').innerHTML) !== 0
    ) {
        return false;
    }
    else {
        return true;
    }
};
function validateText(text) {
    let error = 0;
    if (text.value.length === 0) {
        text.style.background = 'Red';
        error = 1;
        alert('Please enter a valid text');
    }
    return error;
}

function trim(s) {
    return s.replace(/^\s+|\s+$/, '');
}

function validateEmail(email) {
    let error = 0;
    const temail = trim(email.value); // value of field with whitespace trimmed off
    const emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
    const illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;
    if (email.value === '') {
        email.style.background = 'Red';
        alert('Please enter an email address');
        error = 2;
    } else if (!emailFilter.test(temail)) { //test email for illegal characters
        email.style.background = 'Red';
        alert('Please enter a valid email address');
        error = 3;
    } else if (email.value.match(illegalChars)) {
        email.style.background = 'Red';
        error = 4;
        alert('Email contains invalid characters.');
    }
    return error;
}

function validatePhone(phone) {
    let error = '';
    const stripped = phone.value.replace(/[\(\)\.\-\ ]/g, '');
    if (phone.value === '') {
        alert('Please enter a phone number');
        phone.style.background = 'Red';
        error = 6;
    } else if (isNaN(parseInt(stripped))) {
        error = 5;
        alert('The phone number contains illegal characters.');
        phone.style.background = 'Red';
    } else if (stripped.length < 10) {
        error = 6;
        alert('The phone number is too short.');
        phone.style.background = 'Red';
    }
    return error;
}

validateHight = (hight) => {
    let error = 0;
    if (hight.value === '') {
        alert('Please enter a hight');
        phone.style.background = 'Red';
        error = 7;
    }
    else if (hight > 0 && hight < 2.8) {
        alert('Please Make sense of height...');
        error = 8;
    }
}
validateWeight = (weight) => {
    let error = 0;
    if (weight.value === '') {
        alert('Please enter a weight');
        phone.style.background = 'Red';
        error = 9;
    }
    else if (weight > 0 && weight < 636) {
        alert('Please Make sense of weight...');
        error = 10;
    }
}

