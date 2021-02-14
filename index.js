document.getElementById("urlInput").onchange = () => {
  document.getElementById("urlImg").src = document.getElementById("urlInput").value;
  document.getElementById("urlImg").style.display = "block";
}

document.getElementById("urlModifyInput").onchange = () => {
document.getElementById("urlModifyImg").src = document.getElementById("urlInput").value;
document.getElementById("urlImg").style.display = "block";
}

/*function add(meme) {
  console.log("Adding to UI");
  
  bodyContent = document.getElementById("memes");
  let uiString = `<div class="card my-3" style="width: 30rem;">
  <img class="card-img-top img-fluid"  src="${meme["url"]}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${meme["name"]}</h5>
    <p class="card-text">${meme["caption"]}</p>
    <button  id=${meme["id"]} onclick=modifyMeme  type="button" class="btn btn-primary"  >Modify</button>
  </div>
</div>`;
bodyContent.innerHTML += uiString;
}*/

async function init(){
  var response = await fetch("https://memelist-pro.herokuapp.com/memes");
  var resp = await response.json();
  var memes = resp["result"];
  console.log(memes);
  document.getElementById("memes").innerHTML = "";
  memes.forEach((meme) => {
      var div = document.createElement("div");
      var name = document.createElement("h2");
      var caption = document.createElement("p");
      var img =document.createElement("img");
      var btn = document.createElement("BUTTON");
      img.src = meme["url"];
      name.innerText = meme["name"];
      caption.innerText = meme["caption"];
      btn.innerText = "Modify";
      btn.classList.add("btn","btn-primary");
      div.classList.add("card" ,"my-3");
      img.classList.add("card-img-top");
      div.style.width="50%";
      div.style.marginLeft="auto";
      div.style.marginRight="auto";
      div.style.display="block";
      btn.style.marginLeft="45%";
      btn.style.textAlign="center";


      caption.style.fontSize="150%";
    //  btn.style.justifyContent="center";
      btn.id = meme["id"];
      btn.onclick = modifyMeme;
      div.appendChild(name);
      div.appendChild(img);
      div.appendChild(caption);
      div.appendChild(btn)
      document.getElementById("memes").appendChild(div);
  });
}

async function postData(url = '', data = {}, method) {
console.log(url)
  const response = await fetch(url, {
    method: method, 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json(); 
}

async function submitForm(e){
  e.preventDefault();
  var name = document.getElementById("nameInput").value;
  var url = document.getElementById("urlInput").value;
  var caption = document.getElementById("captionInput").value;
  var data = {name, url, caption};
  var response = await postData("https://memelist-pro.herokuapp.com/memes", data, "POST", "modalClose");
  document.getElementById("modalClose").click();
  if("id" in response){
    alert("Your meme has been added.")
  }
  else{
    console.log(response);
    alert(response["message"]);
  }
  init();
}

async function modifyForm(e){
  e.preventDefault();
  var url = document.getElementById("urlModifyInput").value;
  var caption = document.getElementById("captionModifyInput").value;
  var memeId = document.getElementById("memeId").value;
  var data = {url, caption};
  var response = await postData(`https://memelist-pro.herokuapp.com/memes/${memeId}`, data, "PATCH");
  document.getElementById("modifyModalClose").click();
  alert(response["message"]);
  init();
}

async function modifyMeme(e){
console.log(e.target.id);
var response = await fetch(`https://memelist-pro.herokuapp.com/memes/${e.target.id}`);
var resp = await response.json();
console.log(resp)
document.getElementById('modifyMeme').click();
document.getElementById("nameModifyInput").value = resp["name"];
document.getElementById("nameModifyInput").disabled = true;
document.getElementById("urlModifyInput").value = resp["url"];
document.getElementById("urlModifyImg").src = resp["url"]
document.getElementById("captionModifyInput").value = resp["caption"];
document.getElementById("memeId").value = resp["id"];

}



document.getElementById("addMeme").onclick = () => {
document.getElementById("nameInput").value = "";
document.getElementById("urlInput").value = "";
document.getElementById("captionInput").value = "";
document.getElementById("urlImg").style.display = "none";
};


document.getElementById("memeForm").onsubmit = submitForm;
document.getElementById("modifyMemeForm").onsubmit = modifyForm;

init();