// Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull'API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l'API non possa ritornare festività.
// Attenzione!
// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l'API non carichi holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all'api quali sono le festività per il mese scelto
// Evidenziare le festività nella lista
// Consigli e domande del giorno:
// Abbiamo visto assieme una libereria che serve per gestire le date... quale sarà?
// Una chiamata ajax può anche non andare a buon fine, che si fa in quel caso? Lasciamo l'utente ad attendere? ;)

//API: https://flynn.boolean.careers/exercises/api/holidays

function printMonth(defaultMonth){
  var monthDays = defaultMonth.daysInMonth();
  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var target = $("#container");
  target.html("");

  for (var i = 1; i <= monthDays; i++) {
    var datacomplete = moment({year:defaultMonth.year(), month:defaultMonth.month(), day:i})

    var dayshtml = compiled({"day": i,
                  "datacomplete": datacomplete.format("YYYY-MM-DD")});

    target.append(dayshtml);
  }
}


function printHolidays(defaultMonth){
  var month = defaultMonth.month();
  var year = defaultMonth.year();


  $.ajax({
      url:'https://flynn.boolean.careers/exercises/api/holidays',
      method:'GET',
      data: {'month': month,
            'year': year},

      success:function(data, state) {
        var holidays = data["response"];
        for (var i = 0; i < holidays.length; i++) {
          var element = $(".calendar span[data-complete='"+holidays[i].date+"']");
          console.log(element);
          element.addClass("holiday-color");
          element.siblings("h2").append(holidays[i].name);
        }

      },
      error:function (error) {
        console.log('error');
      }
  })
}


function init(){
  var defaultMonth = moment("2018-01-01");

  printMonth(defaultMonth);
  printHolidays(defaultMonth);
}
$(document).ready(init);
