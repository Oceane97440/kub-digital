$(document).ready(function () {

    function init() {
        getVisuels();
    }

    function getVisuels() {
        $.get("/visuels/jsonList", function (visuels) {
            let options = "<option selected>Selectionner votre visuel</option>";
            visuels.data.forEach(visuel => {

                options += `<option value="${visuel.id}">${visuel.nom_visuel}</option>`
            });

            $('#visuel').html(options);
        })
    }

    init();

})