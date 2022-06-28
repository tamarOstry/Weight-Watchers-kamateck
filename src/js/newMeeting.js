saveNewMeeting=()=>{
let manager=JSON.parse(sessionStorage.getItem('manager'));
let users=manager.users;   
users.forEach(user=> {
    const element=document.getElementById(user.id);
    if(!element.children[5].children[0].checked)
      user.weight.meeting.push({"Weight":element.children[2].children[0].value,"date":element.children[3].children[0].value});
});
manager.users= users;
sessionStorage.setItem('manager', JSON.stringify(manager));
window.location.href="./homeManager.html";
}
