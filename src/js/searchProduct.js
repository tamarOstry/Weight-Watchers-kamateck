subscribeToProductSearch=()=>{
    if(document.querySelector('.input-product').value==""){
        document.querySelector(".results").remove();
        const div=document.createElement('div');
        div.setAttribute("class", "results");
        document.getElementById('body').appendChild(div);
    }
}
searchProduct=()=>{
    document.querySelector(".results").remove();
    const div=document.createElement('div');
    div.setAttribute("class", "results");
    document.getElementById('body').appendChild(div);
    const productName=document.querySelector('.input-product').value;
    const options = {
        method: 'GET',
        headers: {
        }
    };
    fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&q=${productName}&limit=4630`, options)
    .then(response => response.json())
        .then(response => {
            console.log(response);
            response.result.records.forEach(element => 
                drowProduct(element));
        })
        .catch(err => console.error(err)); 
}

drowProduct=(element)=>{  
    const elmnt = document.querySelector(".product-card");
    const cln = elmnt.content.cloneNode(true);
    cln.querySelector(".name").innerText = element.shmmitzrach;
    cln.querySelector(".name").addEventListener("click",() => showDetails(element))
    document.querySelector(".results").appendChild(cln);
}

showDetails=(element)=>{
    document.querySelector(".results").remove();
    const div=document.createElement('div');
    div.setAttribute("class", "results");
    document.getElementById('body').appendChild(div);
    document.querySelector(".results").innerText=element.protein;

}