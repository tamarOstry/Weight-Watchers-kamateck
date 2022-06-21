function login(){
   const email=document.querySelector('.email').value;
   const password=document.querySelector('.password').value;
   const xhr = new XMLHttpRequest();
   xhr.open('GET', '../../users.json');
   xhr.send();
   xhr.onload = function () {
   if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
   } 
   else {
      let users = JSON.parse(xhr.responseText).users;
      let manager= JSON.parse(xhr.responseText).manager;
      manager.users = users; 
      if(manager.password == password && manager.email==email){
        sessionStorage.setItem('manager', JSON.stringify(manager));
        window.location.href =`../src/html/homeManager.html`;
      } 
      else{
        const currentUser=users.find(user =>user.email ==email && user.password ==password);
        if(currentUser!=null){
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            window.location.href =`../src/html/homeUser.html?user=${JSON.stringify(currentUser)}`;
        }
        else{
            alert("you are not allowed to came here you need to application")
        }
      }
    }
  }
}