$(document).ready(function () {

    function init() {
        getAnnoceurs();
    }

    function getAnnoceurs() {
        $.get("/annonceurs/jsonList", function (annonceurs) {
            let options = "";
            annonceurs.data.forEach(annonceur => {
                options += `<option value="">Selectionner votre annonceur</option>`

                options += `<option value="${annonceur.id}">${annonceur.nom_societe}</option>`
            });

            $('#user_annonceur').html(options);
        })
    }

    init();

})