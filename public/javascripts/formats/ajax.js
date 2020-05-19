$(document).ready(function () {

    function init() {
        getFormats();
    }

    function getFormats() {
        $.get("/admin/formats/jsonList", function (formats) {
            let options = "<option selected>Selectionner votre format</option>";
            formats.data.forEach(format => {

                options += `<option value="${format.id}">${format.nom_format}</option>`
            });

            $('#format_campagne').html(options);
        })
    }

    init();

})