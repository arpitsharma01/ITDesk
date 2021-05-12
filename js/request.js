
function onLoadRequests(){
    CheckLoginRequest();
    fetchAllRequests();
    approvedRequests();
    id = window.localStorage.getItem("id").toString();
    fetchAdminInfos();
}

function CheckLoginRequest(){
    if(localStorage.getItem("token")==null)
    {
      
        window.open("index.html", "_blank");
      
    }
  }

function fetchAllRequests(){
    
      fetch(`https://localhost:44327/api/requestInfo/requestStatus?status=false`,{
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer'
      }
      )
      .then(res => res.json())
      .then(data => {
        document.getElementById("spin3").style.display="none";
          console.log(data);
          let li = ` <thead><tr>
          <th scope="col">Email </th>
          <th scope="col">Device Name</th>
          <th scope="col">Mark As Completed</th>
        </tr> </thead>`;
                  data.forEach(TempUser => {
                
                  li += ` <tr>
                  <td id= "dn${TempUser.id}" data-label="Email">${TempUser.employeeEmail}</td>
                
                  <td  id= "dc${TempUser.id}" data-label="Device Name">${TempUser.deviceName}</td>
                  <td data-label="Action">
                  <button href="#" class="btn btn-success btn-circle btn-md" onclick="confirmation(${TempUser.id})">
                  <i class="fas fa-check"></i>
              </button>
             
                  </td>
                  </td>
                </tr>`
                  });
  
      document.getElementById('Table').innerHTML=li;
  });

  }

 function confirmation(id) {

  
        document.getElementById("spin3").style.display="none";
        swal({
          title: "Are you sure?",
          text: "You want to mark it as completed.",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
             document.getElementById("spin3").style.display="block";
            var requestinfo ={
                "Status": "true",
              }
            fetch(`https://localhost:44327/api/requestInfo/updateStatus/${id}`, {
                method: "PUT",
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", 
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                  "Content-Type": "application/json",
                  // Authorization:
                  //   "Bearer " + window.localStorage.getItem("token").toString(),
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer",
                body: JSON.stringify(requestinfo),
              })
                //.then(response => response.json())
                .then((result) => {
                     document.getElementById("spin3").style.display="block";
                    swal("Poof! You successfully marked it as completed!", {
                        icon: "success",
                      });      
                      fetchAllRequests();    
                      approvedRequests();
                })
          } else {
            swal("Oops! Still Pending.");
          }
        });
      
 }

 function approvedRequests() {
    fetch(`https://localhost:44327/api/requestInfo/requestStatus?status=true`,{
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'
    }
    )
    .then(res => res.json())
    .then(data => {
       document.getElementById("spin3").style.display="none";
        console.log(data);
        let li = ` <thead><tr>
        <th scope="col">Email </th>
        <th scope="col">Device Name</th>
        
      </tr> </thead>`;
                data.forEach(TempUser => {
              
                li += ` <tr>
                <td id= "dn${TempUser.id}" data-label="Email">${TempUser.employeeEmail}</td>
              
                <td  id= "dc${TempUser.id}" data-label="Device Name">${TempUser.deviceName}</td>
               
              </tr>`
                });

    document.getElementById('Table1').innerHTML=li;
});
 }

 function fetchAdminInfos(){
  
    document.getElementById("spin2").style.display="block";
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
    document.getElementById("spin2").style.display="none";
    data.forEach((TempUser) => {
      adminEmail= TempUser.employeeEmail;
      adminName=TempUser.employeeName;
      designation= TempUser.designation;
      // console.log(adminEmail, adminName, designation);
      });
      document.getElementById("aName").innerHTML = adminName +`<br>`;
      // document.getElementById("edesignation").innerHTML= designation;   
      
  });
  
  
  }