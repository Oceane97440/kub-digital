$(document).ready(function () {

    function init() {
        getUsers();
    }

    function getUsers() {
        $.get("/admin/visuels/jsonList", function (visuels) {
            let td = ""
            // // users.data.forEach(users => {

            // // });
            visuels.data.forEach(visuels => {

                td += `<td value="${visuels.id_users}">Nom</td>`
            });


             $('#userID').html(td);

        })
    }
    
    init();

})



