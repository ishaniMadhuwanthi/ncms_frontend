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
        window.location.replace("moh.html");
    }
}


/*
---------------add new hospital------------------
*/
function addHospital(form) {
    $.ajax({
        type: "POST",
        url: 'http://localhost:8090/hospitalRegister?' + form.serialize(),
        success: function (data, status, xhr) {
            console.log('Hospital inserted successfully');
            toastr.success('Hospital added successfully', 'Save Complete');
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
function loadHospitalList() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8090/hospitalRegister?hospital_id=',
        dataType: "json",
        success: function (data, status, xhr) {
            let hospitals = data.data;
            $.each(hospitals, function(key, hospital){
                let printStr = '<tr><td>' + hospital.hospital_id + '</td><td>' + hospital.name + '</td><td>' + hospital.district +'</td><td>' + hospital.x_location + '</td><td>' + hospital.y_location +'</td><td><a href="editHospital.html?id=' + hospital.hospital_id + '" >Edit</a></td></tr>';
                $('#hospitals-list tr:last').after(printStr); 
            });
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}