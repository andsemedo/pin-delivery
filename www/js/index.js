

if(!localStorage.getItem('username')) {
  $('#username').html('Convidado');
} else {
  $('#username').html(localStorage.getItem('username'));
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


function tracking() {
  activeNav('tracking')

    $.ajax({
      url: "./tracking.html",
      method: "get",
      data: { item: 1 },
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
}

function profile() {
  activeNav('profile')

  $.ajax({
    url: "./profile.html",
    method: "get",
    data: { item: 1 },
    success: function (data) {
      $(".all-content").html(data);
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

function verifyEmail() {

  let emailVer = $('#emailVer').val();

  if(!emailVer) {

    $('#emailVerAlert').removeClass('visually-hidden');
    $('#emailVer').removeClass('border-0');
    $('#emailVer').addClass('border-2 border-danger');

    // $('#firstTimeSection').removeClass('visually-hidden');
    // $('#registrationSection').addClass('visually-hidden');
    
  } else if(emailVer != '') {

      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!regex.test(emailVer.toLowerCase())) {
        $('#emailVerAlert').addClass('visually-hidden');
        $('#emailVerInvalido').removeClass('visually-hidden');
        $('#emailVer').removeClass('border-0');
        $('#emailVer').addClass('border-2 border-danger');
      } else {
        $('#emailVerAlert').addClass('visually-hidden');
        $('#emailVerInvalido').addClass('visually-hidden');
        // $('#emailVer').removeClass('border-0');
        $('#emailVer').removeClass('border-2 border-danger');
        $('#emailVerBtn').addClass('visually-hidden');

        $('#AfterEmailVer').removeClass('visually-hidden');
      }
    
  } 

  
}