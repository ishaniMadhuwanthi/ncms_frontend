/*
----------display errors----
*/

function ajaxErrorHandle(jqXhr, redirect = false) {
    if (jqXhr.responseJSON != null) {
        let errors = '';
        $.each(jqXhr.responseJSON.errors, function (key, error) {
            errors = errors + '<li>' + error + '</li>';
        });
        let printStr = '<div class="alert alert-danger alert-dismissible mt-3 mx-3 fade show errorMessage" role="alert"><strong>Error!</strong> Operation failed. Please check the errors and retry.<ul>' + errors + '</ul><button type="button" class="close"data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        $('#title').after(printStr);
    } else {
        toastr.error('Something went wrong!', 'Error');
    }

    if (redirect) {
        window.location.replace("index.html");
    }
}


function doctorLogin(form) {
    $.ajax({
        type: "POST",
        url: 'http://localhost:8090/doctorRegister?' + form.serialize(),
        success: function (data, status, xhr) {
            let doctor_id = data.data.doctor_id;
            let is_director = data.data.is_director;

            Cookies.set('doctor_id', doctor_id);
            Cookies.set('is_director', is_director);

            switch (is_director) {
                case 0:
                    window.location.replace('index.html');
                    break;
            
                case 1:
                    window.location.replace('patient.html');
                    break;

                default:
                    window.location.replace('index.html');
                    break;
            }
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}