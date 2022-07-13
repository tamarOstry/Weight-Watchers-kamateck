
login = async() => {
  debugger
  const email = document.querySelector('.email').value;
  const password = document.querySelector('.password').value;

  await fetch(`http://localhost:3000/account`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({
      'email': email,
      'password': password
    }),
})
    .then((response) => {
      if (response.status === 200 && response.status !== undefined){
       return response.json();
        
      }
      else
        alert(response.message)
    }).then((data) => { 
      alert(data)
      if (data!==null){
        if(data.eatingDiary) {
         window.location.href = `../src/html/homeUser.html?user=${JSON.stringify(data.id)}`;
        }
        else { 
          window.location.href = `../src/html/homeManager.html`;      
          }
          } 
          else{
           alert("please try again");
          }
    })  
  } 
    



