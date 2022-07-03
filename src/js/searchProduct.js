

let foodNames = [];

const options = {
  method: 'GET',
  headers: {}
};



window.addEventListener('load', () => {
  fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&limit=4630`, options)
    .then(response => response.json())
    .then(response => {
      let foods = response.result.records;
      foods.forEach(food => {
        foodNames = [...foodNames, food.shmmitzrach]
      });
    })
    .catch(function (err) {
      console.log('Something went wrong.', err);
    });
});

autocompleteMatch = (input) => {
  if (input === '') {
    return [];
  }
  var reg = new RegExp(input)
  return foodNames.filter(function (term) {
    if (term.match(reg)) {
      return term;
    }
  });
}

function showResults(val) {
  res = document.getElementById("result");
  res.innerHTML = '';
  let list = '';
  let foods = autocompleteMatch(val);
  for (i = 0; i < foods.length; i++) {
    list += `<li onclick="choosedFood('${foods[i]}')"> ${foods[i]} </li>`;
  }
  res.innerHTML = '<ul>' + list + '</ul>';
}

//Works only with a complete word within the entire product description and not a single letter
//   showResults=(val)=> {
//     res = document.getElementById("result");
//     res.innerHTML = '';
//     if (val == '') {
//       return;
//     }
//     let list = '';
//     fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&q=${val}&limit=4630`, options)
//     .then(
//      function (response) {
//        return response.json();
//      }).then(function (data) {
//       foods=data.result.records;
//        for (i=0; i<foods.length; i++) {
//          list += `<li onclick="chooseFood(${foods[i]})">${foods[i].shmmitzrach}</li>`;
//        }
//        res.innerHTML = '<ul>' + list + '</ul>';
//        return true;
//      }).catch(function (err) {
//        console.warn('Something went wrong.', err);
//        return false;
//      });
//   }

choosedFood = (food) => {
  document.getElementById('q').value = food;
  fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&q=${food}&limit=4630`, options)
    .then(response => response.json())
    .then(response => {
      if (response) {
        if (response.result.records.length > 0)
          showResultsInTheTable(response.result.records[0]);
        else alert("No product found");
      }
      else throw new Error();

    })
    .catch(function (err) {
      console.log('Something went wrong.', err);
    });
}

drowProduct = (element) => {
  const elmnt = document.querySelector(".product-card");
  const cln = elmnt.content.cloneNode(true);
  cln.querySelector(".name").innerText = element.shmmitzrach;
  cln.querySelector(".name").addEventListener("click", () => showDetails(element))
  document.querySelector(".results").appendChild(cln);
}

showDetails = (element) => {
  document.querySelector(".results").remove();
  const div = document.createElement('div');
  div.setAttribute("class", "results");
  document.getElementById('body').appendChild(div);
  document.querySelector(".results").innerText = element.protein;

}

clearProduct = () => {
  const list = document.querySelector(".product-containers");
  const productContainers = document.querySelector(".results");
  productContainers.remove();
  let usersDiv = document.createElement("h1");
  usersDiv.setAttribute("class", "results");
  list.appendChild(usersDiv);

  showResultsInTheTable = (theCurrentFood) => {
    if (document.querySelector('.item'))
      document.querySelector('.nutritionalValuesTable').children[1].remove();
    let res = document.getElementById('result');
    res.innerHTML = '';
    document.querySelector('.nutritionalValuesTable').style.display = "block";
    let table = document.querySelector('.nutritionalValuesTable');
    table += `
    <tr class="item">
        <td>${theCurrentFood.food_energy}</td>
        <td>${theCurrentFood.calcium}</td>
        <td>${theCurrentFood.carbohydrates}</td>
        <td>${theCurrentFood.cholesterol}</td>
        <td>${theCurrentFood.folate}</td>
        <td>${theCurrentFood.iron}</td>
        <td>${theCurrentFood.alcohol}</td>
        <td>${theCurrentFood.magnesium}</td>
        <td>${theCurrentFood.poly_unsaturated_fat}</td>
        <td>${theCurrentFood.potassium}</td>
        <td>${theCurrentFood.protein}</td>
        <td>${theCurrentFood.saturated_fat}</td>
        <td>${theCurrentFood.sodium}</td>
        <td>${theCurrentFood.total_dietary_fiber}</td>
        <td>${theCurrentFood.total_sugars}</td>
        <td>${theCurrentFood.vitamin_c}</td>
        <td>${theCurrentFood.vitamin_d}</td>
        <td>${theCurrentFood.zinc}</td>
    </tr>`
    const container = document.querySelector('.nutritionalValuesTable');
    container.innerHTML += table;
  }
}