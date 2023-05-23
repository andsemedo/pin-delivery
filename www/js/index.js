let userData = localStorage.getItem('userData');
let username = '';

if(userData) {
  userData = JSON.parse(userData);
  username = userData[0].nome
}



if(!username) {
  $('#username').html('Convidado');
} else {
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
const api_url = 'https://aniltonf.com/api/pindelivery';
const table_user = '10315_user';
const table_package = '10315_pacote';

// Get data from one user
async function getUserData(url, table_user, email) {
  const response = await fetch(url+'getUser.php?table='+table_user+'&email='+email);
  const jsonData = await response.json();
  console.log(jsonData);
}

function verifyEmail() {

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

        console.log('ok2');
      } else {

        console.log('ok');
        

        $('#registrationSection').addClass('visually-hidden');

        // $('#emailVerAlert').addClass('visually-hidden');
        // $('#emailVerInvalido').addClass('visually-hidden');
        // $('#emailVer').removeClass('border-2 border-danger');
        // $('#emailVerBtn').addClass('visually-hidden');
        // $('#AfterEmailVer').removeClass('visually-hidden');
      }
    
  } 

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




