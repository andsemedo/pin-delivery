function activeNav(className) {
  let navSide = document.querySelectorAll("#navSide a");

  navSide.forEach((link) => {
    if (link.classList.contains(className)) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Ajax for switch pages

function packages() {
  activeNav("packages");

  $("#wrapper").removeClass("toggled");

  $.ajax({
    url: "./packages.html",
    method: "get",
    data: { item: 1 },
    success: function (data) {
      $(".page-name").html("Pacotes");
      $(".page-content").html(data);
    },
  });
}

function messages() {
  activeNav("chat");

  $("#wrapper").removeClass("toggled");

  $.ajax({
    url: "./messages.html",
    method: "get",
    data: { item: 1 },
    success: function (data) {
      $(".page-name").html("Mensagens");
      $(".page-content").html(data);
    },
  });
}

function verifyEmail() {
  setInterval(() => {
    let email = $("#email").val();

    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    // console.log(email);
    if(regex.test(email.toLowerCase())) {
      document.getElementById('email').style.borderTopRightRadius = '0';
      document.getElementById('email').style.borderBottomRightRadius = '0';
      document.getElementById('searchBtn').style.display = 'block'
    } else {
      document.getElementById('searchBtn').style.display = 'none'
    }
  }, 200)

}

const api_url = 'https://aniltonf.com/api/pindelivery/';
const table_user = '10315_users';
const table_package = '10315_pacote';

async function getUserActivePackage(url, table, email) { 
  const response = await fetch(url+'getUserActivePackage.php?table='+table+'&email='+email);
  return await response.json();
  // console.log(jsonData);
}

async function updatePackageStatus(url, table, pId, newStatus) { 
  const response = await fetch(url+'updatePackageStatus.php?table='+table+'&packageId='+pId+'&status='+newStatus);
  return await response.json();
  
}

function search(sEmail = '') {

  document.getElementById('packagesFound').innerHTML = '';
  
  let email = $('#email').val();

  if(sEmail != '') {
    email = sEmail;
  }

  if(email) {
    const fetchPackage = async () => await getUserActivePackage(api_url, table_package, email);
    fetchPackage().then((res) => {
      console.log(res);
      if(res.response) {
        if(res.response == 'packages not found')
          $("#dangerAlert").removeClass("visually-hidden");
      } else {
        $("#dangerAlert").addClass("visually-hidden");
        res.forEach(e => {
          $("#sectionPackageData").removeClass("visually-hidden");
          document.getElementById('packagesFound').innerHTML += `<div class="mb-3 pb-3 border-bottom border-dark">
            <div class="form-group">
                <label class="fw-semibold">ID do pacote:</label>
                <label id="packageId${e.id}">${e.id}</label>
            </div>

            <div class="form-group">
                <label class="fw-semibold">Tipo de pacote:</label>
                <label id="packageType${e.tipo}">${e.tipo}</label>
            </div>

            <div class="form-group">
                <label class="fw-semibold">Estado</label>
                <select class="form-select mt-2" onchange='updateBtn(${e.id})' id="packageStatus${e.id}">
                    <option value="origem" ${e.estado == 'origem' ? 'selected' : ''} >Na origem</option>
                    <option value="emTransito" ${e.estado == 'emTransito' ? 'selected' : ''}>Em trânsito</option>
                    <option value="emDestino" ${e.estado == 'emDestino' ? 'selected' : ''}>No país destino</option>
                    <option value="destino" ${e.estado == 'destino' ? 'selected' : ''}>Entregue</option>
                </select>
            </div>

            <button class="btn btn-success w-100 mt-3 visually-hidden" id="btnAtualizar${e.id}" onclick="updatePackage(${e.id}, '${email}')">Atualizar</button>
        </div>`;
          
          // $("#packageId").html();
          // $("#packageType").html();
          // $("#packageStatus").val();
        });
      }

    })
    
  }

}

function updatePackage(id, email){
  let newStatus = $("#packageStatus"+id).val();

  const fetchPackage = async () => await updatePackageStatus(api_url, table_package, id, newStatus);
    fetchPackage().then((res) => {
      if(res.response) {
        console.log(res.response);
        if(res.response == "ok! package status updated sucessfully") {
          $("#successAlert").removeClass("visually-hidden");
          setTimeout(() => {
            $("#successAlert").addClass("visually-hidden");
            $("#sectionPackageData").addClass("visually-hidden");
            document.getElementById('packagesFound').innerHTML = '';
            search(email)
          }, 1500)
          
          
        }
      }
    })
}

function updateBtn(e) {  
  $("#btnAtualizar"+e).removeClass("visually-hidden");
}

function openChat(customer){
  window.location = './teste.html?c='+customer
}

function logout() {
  const userData = localStorage.getItem('userData');
  if(userData) localStorage.removeItem('userData');
  window.location = '../index.html'
}