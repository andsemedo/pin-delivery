let userData = localStorage.getItem('userData');
let username = '';
let emailUserData = ''; 

if(userData) {
  userData = JSON.parse(userData);
  username = userData[0].nome
  endereco = userData[0].endereco
  emailUserData = userData[0].email
}



if(!username) {
  $("#userAdress").html("");
  $("#location-dot").remove();
  $('#username').html('Convidado');
} else {
  $('#userAdress').html(endereco);
  $('#username').html(username);
}

// ajax

function home() {
  activeNav('home')
  // $.ajax({
  //   url: "./home.html",
  //   method: "get",
  //   data: { item: 1 },
  //   success: function (data) {
  //     $(".all-content").html(data);
  //   }
  // });
  window.location = './home.html'

}

function backHome() {
  window.location = './home.html'
}

function transport() {
  activeNav('transport')
    // $.ajax({
    //   url: "./transport.html",
    //   method: "get",
    //   data: { item: 1 },
    //   success: function (data) {
    //     $(".all-content").html(data);
    //   }
    // });~
    window.location = './transport.html'

}

async function getUserActivePackage(url, table, email) { 
  console.log('okk');
  const response = await fetch(url+'getUserActivePackage.php?table='+table+'&email='+email);
  return await response.json();
  // console.log(jsonData);
}

function tracking() {
  activeNav('tracking')

  let packageData = '';
  const fetchPackage = async () => await getUserActivePackage(api_url, table_package, emailUserData);
  fetchPackage().then((res) => {
    
    if(!res.response) {
      res.forEach(item => {
        let orig = item.origem;
        let t = orig.split(', ');
        const from = t[1];

        let dest = item.destino;
        let s = dest.split(', ')
        const to = s[3]

        let estado = '';
        switch (item.estado) {
          case 'origem':
            estado = 'No país de origem'
            break;
          case 'emTransito':
            estado = 'Em trânsito'
            break;
          case 'emDestino':
            estado = 'No país de destino'
            break;
        
          case 'destino':
            estado = 'Entregue'
            break;
        
          default:
            break;
        }

        document.getElementById("divPackages").innerHTML += `<div class="d-flex flex-column border bg-light mt-2 ms-3 me-3 pt-3 pb-3 ps-2 pe-2 rounded-2 w-100">
        <div class="d-flex flex-row align-items-center justify-content-between mb-2">
            <span class="fs-6 fw-bold">${item.tipo}</span>
            <span class="bg-success bg-opacity-75 ps-2 pe-2 rounded-5 fs-6 text-white">${estado}</span>
        </div>
        <div class="d-flex flex-row align-items-center justify-content-between text-secondary fw-semibold">
            <span>${from}</span>
            <span>para</span>
            <span>${to}</span>
        </div>
    </div>`
        // $("#divPackages").append();
        
      })
      
    }
  })

    $.ajax({
      url: "./tracking.html",
      method: "get",
      data: { packageData: packageData },
      success: function (data) {
        $(".all-content").html(data);
      }
    });
  
}

function activeNav(className) {
  let navfooter = document.querySelectorAll('#navFooter li');

  navfooter.forEach(link => {
    if(!link.classList.contains(className)) {
      link.classList.add('opacity-50')
    } else {
      link.classList.remove('opacity-50')
    }
  })
}



function support() {

  activeNav('support')
  
  $.ajax({
    url: "./support.html",
    method: "get",
    data: { item: 1 },
    success: function (data) {
      $(".all-content").html(data);
    }
  });
  // window.location = './support.html'
}

function chat() {
  window.location = './chat.html'
}




function backToSupport() {
  sessionStorage.setItem('from_chat', true);
  backHome()
}

function verifySupport() {
  if(sessionStorage.getItem('from_chat') == 'true') {
    support()
    sessionStorage.removeItem('from_chat')
  } else {

    console.log('teste');
  }
}

verifySupport()



function profile() {
  activeNav('profile')

  $.ajax({
    url: "./profile.html",
    method: "get",
    data: { item: 1 },
    success: function (data) {
      $(".all-content").html(data);
      $("#time").html('1');
    }
  });
}

// other functions

// let activePage = window.location.pathname;

// // console.log(activePage);

// let navfooter = document.querySelectorAll('#navFooter a').forEach(link => {
//   console.log(link.href);
//   // if(link.href.includes(`${activePage}`)) {
    
//   // }
// });

// PIN DELIVERY API
const api_url = 'https://aniltonf.com/api/pindelivery/';
const table_user = '10315_users';
const table_package = '10315_pacote';

// Get data from one user
async function getUserData(url, table_user, email) {
  const response = await fetch(url+'getUser.php?table='+table_user+'&email='+email);
  return await response.json();

}

function getUserAndFetch(email, fromTransport=false) {
  const fetchUserData = async () => await getUserData(api_url, table_user, email);
        fetchUserData().then((res) => {

    if(res.response) {
      if(res.response == 'user not found') {
        $('#emailVerifyDiv').addClass('visually-hidden');
        $('#notLoggedAlert').addClass('visually-hidden');
        $('#AfterEmailVer').removeClass('visually-hidden');
        $("#modalTitle").html('Não tens uma conta. Crie uma!');
        $("#modalTitle").addClass("text-danger");
        $("#emailInp").val(email);
      }
    } else if(res[0].email == email) {
      const userData = JSON.stringify(res);
      localStorage.setItem('userData', userData);
      if(email == 'func@pindelivery.com') {
        window.location = './admin_funcionario/admin.html'
      } else {
        window.location = './home.html';
      }
      
      if(fromTransport) {
        $("#btnPayment").attr("data-bs-toggle", "modal");
        $("#btnPayment").attr("data-bs-target", "#paymentModal");
        
        document.getElementById('btnCloseModalLogin').click()
        document.getElementById('btnPayment').click()
      } 
    }

  });
}

// Create a new User
async function newUser(url, table, email, name, phone, address) {
  const response = await fetch(url+'newUser.php?table='+table+'&email='+email+'&nome='+name+'&telefone='+phone+'&endereco='+address);
  return await response.json();
  
}

function verifyEmail(fromTransport=false) {

  let emailVer = $('#emailVer').val();

  if(!emailVer) {

    $('#emailVerAlert').removeClass('visually-hidden');
    $('#emailVer').removeClass('border-0');
    $('#emailVer').addClass('border-2 border-danger');

    // $('#firstTimeSection').removeClass('visually-hidden');
    // $('#registrationSection').addClass('visually-hidden');
    
  } else if(emailVer != '') {

    console.log('ok1');

      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(!regex.test(emailVer.toLowerCase())) {
        $('#emailVerAlert').addClass('visually-hidden');
        $('#emailVerInvalido').removeClass('visually-hidden');
        $('#emailVer').removeClass('border-0');
        $('#emailVer').addClass('border-2 border-danger');

      } else {

        getUserAndFetch(emailVer, fromTransport)

        // $('#emailVerAlert').addClass('visually-hidden');
        // $('#emailVerInvalido').addClass('visually-hidden');
        // $('#emailVer').removeClass('border-2 border-danger');
        // $('#emailVerBtn').addClass('visually-hidden');
        // $('#AfterEmailVer').removeClass('visually-hidden');
      }
    
  } 

}

function verifyFormRegistration() {
  setInterval(() => {
    let firstName = $("#firstNameInp").val();
    let lastName = $("#secondNameInp").val();
    let phoneNumber = $("#mobileNumberInp").val();
    let email = $("#emailInp").val();
    let country = $("#countryInp").val();
    let city = $("#cityInp").val();

  
    if(firstName != '' && lastName != '' && phoneNumber != '' && email != '' && country != '' && city != '') {
      $("#submitBtn").removeAttr('disabled');
    } else {
      $("#submitBtn").attr('disabled', true);
    }

  }, 200)
}
function createAccount(fromTransport = false) {
  // e.preventDefault();
  let firstName = $("#firstNameInp").val();
  let lastName = $("#secondNameInp").val();
  let phoneNumber = $("#mobileNumberInp").val();
  let email = $("#emailInp").val();
  let country = $("#countryInp").val();
  let city = $("#cityInp").val();
  
  let name = firstName+' '+lastName;
  let address = city+', '+country;

  let fetchResponse = async () => await newUser(api_url, table_user, email, name, phoneNumber, address);
  fetchResponse().then((res) => {

    if(res.response) {
      if(res.response == 'error! the provided email already exists') {
        $(".alert-danger").html('E-mail já se encontra registrado!');
        
      } else if(res.response == 'ok! user created sucessfully') {
        getUserAndFetch(email, fromTransport)
      }
    }

  });
  
  
}

function toggleMsgBtn() {
  let msgText = document.getElementById('msgText');
  let msgBtn = document.getElementById('msgBtn');

  console.log('asaa');

  if(document.getElementById('msgText').value != '') {
    // msgBtn.attributes.removeNamedItem('disabled');
    $(msgBtn).removeAttr('disabled');
  } else {
    // msgBtn.attributes.setNamedItem(disabled);
    $(msgBtn).attr('disabled');
  }


}

function logout() {
  window.location = './index.html';
  localStorage.removeItem('userData')
}


// function showCountryList() {
//   $("#country-list").removeClass("visually-hidden");
// }

function fillInput(item, dest){
  $("#country-input"+dest).val(item);
  $("#country-list"+dest).addClass("visually-hidden");
  
}

function verifyInputs() {
  setInterval(() => {
    let countryDest = $("#country-input-dest").val();
    let cityDest = $("#cityDest").val();
    let localDest = $("#localDest").val();
    let casaDest = $("#casaDest").val();
    
    let countryInput = $("#country-input").val();
    let cityOrig = $("#cityOrig").val();

    if(countryDest != '' && cityDest != '' && localDest != '' && casaDest != '') {
      $("#btnDest").removeClass('visually-hidden');
    } else {
      $("#btnDest").addClass('visually-hidden');
    }

    if(countryInput != '' && cityOrig != '') {
      $("#btnOrig").removeClass('visually-hidden');
    } else {
      $("#btnOrig").addClass('visually-hidden');
    }

  }, 200)
}

function setOrig() {
  let countryInput = $("#country-input").val();
  let cityOrig = $("#cityOrig").val();

  $("#btnOrigModal").val(`${cityOrig}, ${countryInput}`);
  // $("#alertPackage").removeClass("visually-hidden");
}

function setDest() {
  let countryInput = $("#country-input-dest").val();
  let cityDesc = $("#cityDest").val();

  $("#btnDestModal").val(`${cityDesc}, ${countryInput}`);
}

function verifyOrderInputs() {
  setInterval(() => {
    let btnOrigModal = $("#btnOrigModal").val();
    let btnDestModal = $("#btnDestModal").val();
    let receptorName = $("#receptorName").val();
    let tipoPacote = $("#tipoPacote").val();
    let peso = $("#peso").val();
    let altura = $("#altura").val();
    let largura = $("#largura").val();
    
    let destino = $("#country-input-dest").val();
    

    if(btnOrigModal != 'Origem' && btnDestModal != 'Destino' && tipoPacote != '' && receptorName != '' && peso != '' && altura != '' && largura != '') {
      calculateQuota(destino, tipoPacote, altura, largura, peso)
      $("#btnPayment").removeClass('visually-hidden');
    } else {
      $("#btnPayment").addClass('visually-hidden');
    }


  }, 200)
}

function calculateQuota(destino, tipoPacote, altura, largura, peso) {
  let vDestino = 0;
  let vTipoPacote = 0;
  let vAltura = 0;
  let vLargura = 0;
  let vPeso = 0;

  switch (destino) {
    case 'Portugal':
      vDestino = 3000;
      break;
    case 'Brasil':
      vDestino = 3250;
      break;
    case 'Estados Unidos':
      vDestino = 300;
      break;
    case 'França':
      vDestino = 3250;
      break;
    case 'Espanha':
      vDestino = 3200;
      break;
    case 'Bélgica':
      vDestino = 4000;
      break;
    case 'Luxemburgo':
      vDestino = 4000;
      break;
    case 'China':
      vDestino = 4200;
      break;
    case 'India':
      vDestino = 4550;
      break;
    case 'Japão':
      vDestino = 5100;
      break;
    case 'Itália':
      vDestino = 4010;
      break;
    case 'Inglaterra':
      vDestino = 3750;
      break;
  
    default:
      vDestino = 3200;
      break;
  }

  if(tipoPacote == 'caixa') {
    vTipoPacote = 100;
  } else if(tipoPacote == 'envelope') {
    vTipoPacote = 50;
  }

  parseFloat(altura)
  
  if(altura >= 0 && altura < 10 ) {
    vAltura = 1;
  } else if(altura >= 10 && altura < 20) {
    vAltura = 2;
  } else if(altura >= 20) {
    vAltura = 3;
  }

  parseFloat(largura)

  if(largura >= 0 && largura < 10 ) {
    vLargura = 2;
  } else if(largura >= 10 && largura < 20) {
    vLargura = 3;
  } else if(largura >= 30 && largura < 40) {
    vLargura = 4;
  } else if(largura >= 50) {
    vLargura = 5;
  }

  parseFloat(peso)

  if(peso >= 0 && peso < 1 ) {
    vPeso = 1;
  } else if(peso >= 1.5 && peso < 2) {
    vPeso = 3;
  } else if(peso >= 3 && peso < 4) {
    vPeso = 4;
  } else if(peso >= 5) {
    vPeso = 5;
  }

  console.log('vd'+vDestino+' tp'+vTipoPacote+' va'+vAltura+' vl'+vLargura+' vp'+vPeso);

  let valPacote = vAltura+vPeso+vLargura;
  const totalQuota = vDestino + vTipoPacote * valPacote ;

  let formattingOptions = {
    style: 'currency',
    currency: 'CVE',
    minimunFractionDigits: 3,
  }

  let total = totalQuota.toLocaleString('pt-CV', formattingOptions)

  $("#totalQuota").html(total);
  

}

function verifyPaymentInputs(){
  setInterval(() => {
    let numCard = $("#numCard").val();
    let vality = $("#vality").val();
    let cvv = $("#cvv").val();
    let ownerName = $("#ownerName").val();
    

    if(numCard != '' && vality != '' && cvv != '' && ownerName != '') {
      $("#btnDoPayment").removeClass('visually-hidden');
    } else {
      $("#btnDoPayment").addClass('visually-hidden');
    }


  }, 200)
}

async function newPackage(url, table, type, size, weight, from, name, to, owner) {
  const response = await fetch(url+'newPackage.php?table='+table+'&tipo='+type+'&tamanho='+size+'&peso='+weight+'&origem='+from+'&nome='+name+'&destino='+to+'&dono='+owner);
  return await response.json();
}

function doPayment(){
    let nome = $("#receptorName").val();

    let tipoPacote = $("#tipoPacote").val();
    let peso = $("#peso").val();


    let altura = $("#altura").val();
    let largura = $("#largura").val();

    let tamanho = `${largura}x${altura}`

    let countryOrig = $("#country-input").val();
    let cityOrig = $("#cityOrig").val();

    let origem = `${cityOrig}, ${countryOrig}`;

    let countryDest = $("#country-input-dest").val();
    let cityDest = $("#cityDest").val();
    let localDest = $("#localDest").val();
    let casaDest = $("#casaDest").val();

    let destino = `${localDest}, ${casaDest}, ${cityDest}, ${countryDest}`;

    let dados = localStorage.getItem('userData');

    let dono = '';

    if(dados) {
      let dadosParsed = JSON.parse(dados);
      dono = dadosParsed[0].email;
    }

    let fetchResponse = async () => await newPackage(api_url, table_package, tipoPacote, tamanho, peso, origem, nome, destino, dono)
    fetchResponse().then((res) => {

      if(res.response) {
        if(res.response == 'ok! package created') {
          $("#receptorName").val("");
          $("#peso").val("")
          $("#altura").val("");
          $("#largura").val("");
          $("#country-input").val("");
          $("#cityOrig").val("")
          $("#country-input-dest").val("");
          $("#cityDest").val("");
          $("#localDest").val("");
          $("#casaDest").val("")
          $("#btnOrigModal").val("Origem");
          $("#btnDestModal").val("Destino");
          $("#totalQuota").html("");

          $("#alertPackage").removeClass("visually-hidden");
          
        } 
      }
  
    });
}


function verifyUser() {
  if(userData) {
    $("#btnPayment").attr("data-bs-toggle", "modal");
    $("#btnPayment").attr("data-bs-target", "#paymentModal");
    
    document.getElementById('btnPayment').click()
  } else {
    $("#btnPayment").attr("data-bs-toggle", "modal");
    $("#btnPayment").attr("data-bs-target", "#registrationModal");
    
    document.getElementById('btnPayment').click()
  }
  
}