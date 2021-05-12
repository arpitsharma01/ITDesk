var id;
function onLoadCharts(){
    id = window.localStorage.getItem("id").toString();
    fetchAdminInfos();
}

function CheckLoginchart(){
  if(localStorage.getItem("token")==null)
  {
    console.log("Hi Hello");
      window.open("index.html", "_blank");
    
  }
}

function fetchAdminInfos(){
    
    fetch(`https://localhost:44327/api/employee/profile/${id}`,{
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // Authorization:
        //     "Bearer " + window.localStorage.getItem("token").toString(),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer'
  }
  )
  .then(res => res.json())
  .then(data => {
    
    data.forEach((TempUser) => {
      adminEmail= TempUser.employeeEmail;
      adminName=TempUser.employeeName;
      designation= TempUser.designation;
      // console.log(adminEmail, adminName, designation);
      });
      document.getElementById("abName").innerHTML = adminName +`<br>`;
      // document.getElementById("edesignation").innerHTML= designation;   
      
  });
  
  
  }

  function resetPasswordAdminDash() {
    
    var currentpassword = document.getElementById("currentpassword").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
 
  if (currentpassword== ""){
  document.getElementById("valid1").innerHTML="This is required";
  }
  if (password1 == ""){
  document.getElementById("valid2").innerHTML="This is required";
  }
  if (password2== ""){
  document.getElementById("valid3").innerHTML="This is required";
  }
  if (currentpassword !="" && password1 !="" && password2 !=""){
  if (password1.length < 6){
    document.getElementById("valid2").innerHTML="Password should be atleast 6 characters long";
    return;
  }
  else if (password1 != password2){
  swal("Passwords didn't match");
  return;
  }
  
  
    
  var loginInfo = {
  CurrentPassword: CryptoJS.MD5(currentpassword.toString()).toString(),
  NewPassword: CryptoJS.MD5(password1.toString()).toString(),
  
  };
  
  console.log(loginInfo);
  var urlUpdate = "https://localhost:44327/api/Login/resetPassword/" + window.localStorage.getItem("id").toString();
  console.log(urlUpdate);
  fetch(urlUpdate, {
  method: "PUT",
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " + window.localStorage.getItem("token").toString(),
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer",
  body: JSON.stringify(loginInfo),
  })
  //.then(response => response.json())
  .then((res) => res.json())
  .then((data) => {
  // console.log(data)
  if (data == 1){
  swal({
    title: "Success",
    text: "Password Updated Successfully!",
    icon: "success",
  });
  
  }
  else {
  swal({
    title: "Oops",
    text: "You Entered Wrong Password!",
    icon: "error",
  });
  }
  
  });
  document.getElementById("bt4").setAttribute("data-dismiss","modal");
  } 
  }