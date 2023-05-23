function splashScreen() {
    window.location = './home.html';
}

$(document).ready(function () {
  let userData = localStorage.getItem("userData");
  let firtTimeInApp = localStorage.getItem("first_time");
  let username = '';
  if(userData) {
    userData = JSON.parse(userData);
    username = userData[0].nome;
  }
  

  if (!username) {
    if(!firtTimeInApp) {
      localStorage.setItem('first_time', true)
      setTimeout(() => {
          $('#loginBg').removeClass('visually-hidden');
          $('#loginSection').removeClass('visually-hidden');
      }, 3000)

      // Continuar com o registro
      // $('btnRegister').click(function (e) { 
      //   e.preventDefault();
        
      // });
    } else {
      setTimeout(() => {
        splashScreen()
      }, 3000)
    }

  } else {
    splashScreen()
  }

  function continueAsGuest() {
    $('#loginBg').addClass('visually-hidden');
    $('#loginSection').addClass('visually-hidden');

    splashScreen()

  }

  document.getElementById('btnContinue').addEventListener('click',(e)=>{
    e.preventDefault();
    continueAsGuest()
  })

  
});

function backFirstSection() {
  $('#registrationSection').addClass('visually-hidden');
  $('#firstTimeSection').removeClass('visually-hidden');
}

const api_url = 'https://aniltonf.com/api/pindelivery/';
const table_user = '10315_users';
const table_package = '10315_pacote';

// Get data from one user
async function getUserData(url, table_user, email) {
  const response = await fetch(url+'getUser.php?table='+table_user+'&email='+email);
  return await response.json();

}

// Create a new User
async function newUser(url, table, email, name, phone, address) {
  const response = await fetch(url+'newUser.php?table='+table+'&email='+email+'&nome='+name+'&telefone='+phone+'&endereco='+address);
  return await response.json();
  
}

function getUserAndFetch(email) {
  const fetchUserData = async () => await getUserData(api_url, table_user, email);
        fetchUserData().then((res) => {

    if(res.response) {
      if(res.response == 'user not found') {
        $('#firstTimeSection').addClass('visually-hidden');
        $('#registrationSection').removeClass('visually-hidden');
        $("#emailRegister").val(email);
      }
    } else if(res[0].email == email) {
      const userData = JSON.stringify(res);
      localStorage.setItem('userData', userData);
      splashScreen()
    }

  });
}

function continueRegistration() {

  let email = $('#email').val();

  if(!email) {

    $('#emailAlert').removeClass('visually-hidden');
    $('#email').removeClass('border-0');
    $('#email').addClass('border-2 border-danger');

    // $('#firstTimeSection').removeClass('visually-hidden');
    // $('#registrationSection').addClass('visually-hidden');
    
  } else if(email != '') {

      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!regex.test(email.toLowerCase())) {
        $('#emailAlert').addClass('visually-hidden');
        $('#emailInvalido').removeClass('visually-hidden');
        $('#email').removeClass('border-0');
        $('#email').addClass('border-2 border-danger');
      } else {

        // console.log(email);
        getUserAndFetch(email)

        // $('#firstTimeSection').addClass('visually-hidden');
        // $('#registrationSection').removeClass('visually-hidden');
      }
    
  } 
}
  
function verifyFormRegistration() {
  setInterval(() => {
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let phoneNumber = $("#phoneNumber").val();
    let email = $("#emailRegister").val();
    let country = $("#country").val();
    let city = $("#city").val();

  
    if(firstName != '' && lastName != '' && phoneNumber != '' && email != '' && country != '' && city != '') {
      $("#btnCreateAccount").removeAttr('disabled');
    } else {
      $("#btnCreateAccount").attr('disabled', true);
    }

  }, 200)
}
function createAccount() {
  // e.preventDefault();
  let firstName = $("#firstName").val();
  let lastName = $("#lastName").val();
  let phoneNumber = $("#phoneNumber").val();
  let email = $("#emailRegister").val();
  let country = $("#country").val();
  let city = $("#city").val();
  
  let name = firstName+' '+lastName;
  let address = city+', '+country;

  let fetchResponse = async () => await newUser(api_url, table_user, email, name, phoneNumber, address);
  fetchResponse().then((res) => {

    if(res.response) {
      if(res.response == 'error! the provided email already exists') {
        $(".alert-danger").html('E-mail já se encontra registrado!');
        
      } else if(res.response == 'ok! user created sucessfully') {
        getUserAndFetch(email)
      }
    }

  });
  
  
}
    
  
