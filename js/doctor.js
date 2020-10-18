/*
---------------error handling------------------
*/

function ajaxErrorHandle(jqXhr, redirect = false) {
    if (jqXhr.responseJSON != null) {
        let errors = '';
        $.each(jqXhr.responseJSON.errors, function (key, error) {
            errors = errors + '<li>' + error + '</li>';
        });
        let printStr = '<div class="alert alert-danger alert-dismissible mt-3 fade show errorMessage" role="alert"><strong>Error!</strong> Operation failed. Please check the errors and retry.<ul>' + errors + '</ul><button type="button" class="close"data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        $('#title').after(printStr);
    } else {
        toastr.error('Something went wrong!', 'Error');
    }

    if (redirect){
        window.location.replace("doctor.html");
    }
}


/*
---------------add new hospital------------------
*/
function addDoctor(form) {
    $.ajax({
        type: "POST",
        url: 'http://localhost:8090/doctorRegister?' + form.serialize(),
        success: function (data, status, xhr) {
            console.log('Dotor inserted successfully');
            toastr.success('Doctor added successfully', 'Save Complete');
        },
        error: function (jqXhr, textStatus, errorMessage) {
            console.error(errorMessage)
            toastr.error('Something went wrong! ' + errorMessage, 'Error')
        }
    });
}

/*
---------------get hospital list------------------
*/
function loadDoctorList() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8090/doctorRegister?',
        dataType: "json",
        success: function (data, status, xhr) {
            $.each(data.data, function (key, doctor) {
                $('#doctor-list').append('<option value=' + doctor.doctor_id + '>' + doctor.name + '</option>');
            });
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}