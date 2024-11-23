let $abutton = $('#addButton');
let $cbutton = $('#clearButton');
let $text = $('#textfield');
let $lista = $('#Lista');

// Luo luettelon ja lisää se listakontaineriin
let $list = $('<ul></ul>');
$lista.append($list);

let $countElement = $('<p id="taskCounter"></p>');
$('body').append($countElement);

// Klikkaustapahtuma lisäyspainikkeelle
$abutton.on('click', function () {
  let itemText = $text.val().trim();

  if (itemText !== "" && itemText.length <= 100) {
    let $listItem = $('<li></li>');

    // Luo ja lisää checkbox
    let $checkbox = $('<input type="checkbox">');
    let $itemTextSpan = $('<span></span>').text(itemText);
    let $deleteButton = $('<button id="deleteButton">X</button>');

    $deleteButton.on('click', function () {
      $listItem.remove();
      updateCount();
    });

    // Lisää tapahtuma checkboxille
    $checkbox.on('change', function () {
      $listItem.toggleClass('done');
      updateCount();
    });

    $listItem.append($checkbox, $itemTextSpan, $deleteButton);
    $list.append($listItem);
    $text.val(''); // Tyhjennä tekstikenttä lisäyksen jälkeen
    updateCount();
  } else {
    alert("Make sure character amount is between one 1 and 100.");
    $text.val('');
  }
});

// Enter-painalluksen kuuntelu
$text.on('keydown', function (event) {
  if (event.key === "Enter") {
    $abutton.click();
  }
});

// Päivitä tehtävien laskuri
function updateCount() {
  let tasksDone = $('.done').length;
  let tasksTotal = $list.children().length;

  if (tasksTotal === 0) {
    $countElement.text('');
  } else {
    $countElement.text(`${tasksTotal - tasksDone}/${tasksTotal}`);
  }
}

// Poista valmiiksi merkityt tehtävät
function remove() {
  $('.done').remove();
  updateCount();
}

// Poista kaikki tehtävät
function removeAll() {
  $list.empty();
  updateCount();
}

// Poistaa valmiiksi merkityt
function hideSelected() {
  $('.done').slideUp();
};

// Näyttää valmiiksi merkityt
function showSelected() {
  $('.done').slideDown();
};
