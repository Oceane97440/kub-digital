$(document).ready(function () {

    function init() {
        getSites();
    }

    function getSites() {
        $.get("/admin/sites/jsonList", function (sites) {
            let options = "<option selected>Selectionner votre support</option>";
            sites.data.forEach(site => {

                options += `<option value="${site.id}">${site.nom_site}</option>`
            });

            $('#sites').html(options);
        })
    }

    init();

})