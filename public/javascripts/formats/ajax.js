$(document).ready(function () {

    function init() {
        getFormats();
    }

    function getFormats() {
        $.get("/admin/formats/jsonList", function (formats) {
            let options = "<option selected>Selectionner votre format</option>";
            formats.data.forEach(format => {

                options += `<option  data-prix="${format.prix}" value="${format.id}">${format.nom_format}</option>`
            });

            $('#format_campagne').html(options);
        })
    }
    
    init();

})

function set_prix(option){
   // console.log($(option).data("prix"))
  // $('#prix').val($(option).data("prix").toString());
  //var prix=option.data("prix").toString();
 // console.log(prix)
 // console.log(option)
  $('#prix').val(option);
}