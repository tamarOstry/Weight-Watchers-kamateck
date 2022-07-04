getParams = () => {
    const params = new URLSearchParams(window.location.search)
    const user = JSON.parse(params.get('user'));
    return user;
}

getUserDetails = () => {
    const user = getParams();
    document.querySelector('.name').innerHTML = user.firstName + ' ' + user.lastName;
    document.querySelector('.address').innerHTML = user.address.city + ' ' + user.address.street + ' ' + user.address.number;
    document.querySelector('.phone').innerHTML = user.phone;
    document.querySelector('.email').innerHTML = user.email;
    document.querySelector('.heigh').innerHTML = user.hight;
    document.querySelector('.startWeight').innerHTML = user.weight.startWeight;
    document.querySelector('.BMI').innerHTML = user.weight.meeting[user.weight.meeting.length - 1].Weight / (user.hight** 2);
    user.weight.meeting.forEach(m => drowMeet(m));
}

drowMeet = (meet) => {
    const element = document.getElementById('card-weight');
    const cln = element.content.cloneNode(true);
    cln.querySelector('.data').innerText = meet.date;
    cln.querySelector('.weight').innerText = meet.Weight;
    document.querySelector('.weights').appendChild(cln);
    document.querySelector('.goTodiaryManagement').addEventListener("click",
        () => window.location.href = `./diaryManagement.html?id=${getParams().id}`)
}