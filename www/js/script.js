$(document).ready(function () {
  let username = localStorage.getItem("username");
  let firtTimeInApp = localStorage.getItem("first_time");

  if (!username) {
    if(!firtTimeInApp) {
      // localStorage.setItem('first_time', true)
      setTimeout(() => {
          $('#loginBg').removeClass('visually-hidden');
          $('#loginSection').removeClass('visually-hidden');
      }, 1500)

      // Continuar com o registro
      // $('btnRegister').click(function (e) { 
      //   e.preventDefault();
        
      // });
    } else {
      splashScreen()
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

  function splashScreen() {
    setTimeout(()=>{
        window.location = './home.html';
    }, 2500);
  }
});

function backFirstSection() {
  $('#registrationSection').addClass('visually-hidden');
  $('#firstTimeSection').removeClass('visually-hidden');
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
        $('#firstTimeSection').addClass('visually-hidden');
    $('#registrationSection').removeClass('visually-hidden');
      }
    
  } 

  
}
  
  
    
  
