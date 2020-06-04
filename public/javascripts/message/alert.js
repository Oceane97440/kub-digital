$.post('/visuels/create', uploadedFile).done(result => {
    if (result.success)('#boite_alert').html(result.success.message)
    if (result.error)('#boite_alert').html(result.error.message)

})