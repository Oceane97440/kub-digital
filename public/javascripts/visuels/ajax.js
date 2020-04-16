$(document).ready(function () {

    function init() {
        getFormats();
    }

    function getFormats() {
        $.get("/format/jsonList", function (formats) {
            let options = "";
            formats.data.forEach(format => {
                options += `<option value="${format.id}">${format.nom_format}</option>`
            });

            $('#format_visuel').html(options);
        })
    }

    init();

})