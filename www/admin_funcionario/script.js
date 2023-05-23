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

function chat() {
  activeNav("chat");

  $.ajax({
    url: "./chat.html",
    method: "get",
    data: { item: 1 },
    success: function (data) {
      $(".page-name").html("Mensagens");
      $(".page-content").html(data);
    },
  });
}
