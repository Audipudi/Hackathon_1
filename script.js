function createElements(elementname, value = "") {
  var temp = document.createElement(elementname);
  temp.className = value;
  return temp;
}

function createtrth(elementname, value = "") {
  var td = document.createElement(elementname);
  td.innerHTML = value;
  return td;
}

//Buttons creation
var temp_buttons = document.getElementById("buttons");
function createButtons(data){
    div4.innerHTML="";
    var temp = [];
    var pages = Math.ceil(data.length/10);
    for (i = 1; i <= pages; i++) {
      var button = createElements("button","btn btn-info");
      button.setAttribute("type","button");
      button.innerHTML = i;
      temp.push(button);
      div4.append(button);
    }
    temp.forEach((ele) => {
      ele.onclick = function () {
        pagination(data,ele.innerHTML);
      };
    });
}

let container = createElements("div", "container");
let row = createElements("div", "row");
let column1 = createElements("div", "col");
let div = createElements("div");
div.innerHTML = `<form id="myForm">
<div class="form-group">
    <label for="Users"><h3>Users</h3></label>
    <select class="form-control" id="users"></select>
</div>
<button type="button" class="btn btn-primary" id="myButton">Submit</button>
</form>`;
let photo = createElements("div");
photo.setAttribute("id", "photo");

let column2 = createElements("div", "col");

let div3 = createElements("div");
div3.setAttribute("id", "table");

let div4 = createElements("div");
div4.setAttribute("id", "buttons");


column1.append(div, photo);
column2.append(div3,div4);
row.append(column1, column2);
container.append(row);
document.body.append(container);

let temp_photo = document.getElementById("photo");
//displaying the photo of the owner
function getPhoto(data) {
  photo.innerHTML = "";
  let card = document.createElement("div");
  card.setAttribute("class", "card");

  let cardImg = document.createElement("img");
  cardImg.setAttribute("class", "card-img-top");
  cardImg.setAttribute("src", data[0].owner.avatar_url);
  card.append(cardImg);
  temp_photo.append(card);
}

let div2 = document.getElementById("table");
let table = createElements("table", "table");
let thead = createElements("thead", "thead-dark");

let tr = createElements("tr");
let th1 = createtrth("th", "Repo Name");
let th2 = createtrth("th", "Fork Count");
let th3 = createtrth("th", "Star count");
let th4 = createtrth("th", "Link");

tr.append(th1, th2, th3, th4);
thead.append(tr);

let tbody = createElements("tbody");

//getting the details of fork count and start count along with link
function pagination(data,x) {
  tbody.innerHTML = "";

  for (i = (x-1)*10; i < (10*x); i++) {
    let tr = createElements("tr");
    let td1 = createtrth("td", data[i].name);
    let td2 = createtrth("td", data[i].forks_count);
    let td3 = createtrth("td", data[i].stargazers_count);
    let td4 = createtrth("td");
    td4.innerHTML = `<a class="text-danger" href=${data[i].owner.repos_url} target="_blank">Click here</a>`;
    //td4.append(a);
    tr.append(td1, td2, td3, td4);
    tbody.append(tr);
  }
  table.append(thead, tbody);
  div2.append(table);
}

function getReposDetails(data) {
    tbody.innerHTML = "";
  
    for (i = 0; i < 10; i++) {
      let tr = createElements("tr");
      let td1 = createtrth("td", data[i].name);
      let td2 = createtrth("td", data[i].forks_count);
      let td3 = createtrth("td", data[i].stargazers_count);
      let td4 = createtrth("td");
      td4.innerHTML = `<a class="text-danger" href=${data[i].owner.repos_url} target="_blank">Click here</a>`;
      tr.append(td1, td2, td3, td4);
      tbody.append(tr);
    }
    table.append(thead, tbody);
    div2.append(table);
  }

//function to fetch the details of repos of selected users.
async function handleSubmit(event) {
  event.preventDefault();
  let x = document.getElementById("users").selectedIndex;
  let name = document.getElementsByTagName("option")[x].value;
  try {
    let resp = await fetch("https://api.github.com/users/" + name + "/repos");
    let repos = await resp.json();

    //console.log(repos);
    getReposDetails(repos);
    getPhoto(repos);
    createButtons(repos);
  } catch (error) {
    console.log(error);
  }
}

//Get the User Names and append to select in form
function getUsers(data) {
  var select = document.getElementById("users");
  for (i = 0; i < data.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("label", data[i].login);
    option.setAttribute("value", data[i].login);
    select.append(option);
  }
}

//Request to get Users from API
async function getJson() {
  try {
    let resp1 = await fetch("https://api.github.com/users");
    let users = await resp1.json();
    getUsers(users);
  } catch (error) {
    console.log(error);
  }
}

getJson();

const form = document.getElementById("myButton");
//const form = document.querySelector("button");
form.addEventListener("click", handleSubmit);


