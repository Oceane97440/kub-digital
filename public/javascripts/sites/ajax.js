$(document).ready(function () {

    function init() {
        getSites();
    }

    function getSites() {
        $.get("/sites/jsonList", function (sites) {
            let options = "";
            sites.data.forEach(site => {
                options += `<option value="${site.id}">${site.nom_site}</option>`
            });

            $('#sites').html(options);
        })
    }

    init();

})