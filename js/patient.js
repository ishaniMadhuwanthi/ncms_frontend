
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}



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
---------------get patient list------------------
*/
function loadPatientList() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8090/PatientList',
        dataType: "json",
        success: function (data, status, xhr) {
            $.each(data, function(key, patient){
                let printStr = '<tr><td>' + patient.patient_id + '</td><td>' + patient.first_name+ '</td><td>' + patient.last_name +'</td><td>' + patient.contact + '</td><td>' + patient.district + '</td><td>' + patient.email + '</td><td>' + patient.age + '</td><td>' + patient.x_location + '</td><td>' + patient.y_location + '</td><td>' + patient.admit_date +'</td><td>' + patient.discharge_date +'</td><td><a href="viewPatient.html?patient_id=' + patient.patient_id+ '" class="view-btn">View</a></td></tr>';
                $('#patient-list tr:last').after(printStr); 
            });
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}



/*
-------------patient profile load
*/

function dashboardPatient() {

    let patient_id = Cookies.get('patient_id');
   
    //console.log(patient_id);
    $.ajax({
        type: "GET",
        url: 'http://localhost:8090/patientRegister?patient_id=' + patient_id + '&ref=1' ,
        dataType: "json",
        success: function (data, status, xhr) {
            let patient = data;
            $('#patient_id').val(patient.patient_id);
            $('#first_name').val(patient.first_name);
            $('#last_name').val(patient.last_name);
            $('#contact').val(patient.contact);
            $('#district').val(patient.district);
            $('#email').val(patient.email);
            $('#age').val((patient.age));
            $('#x_location').val((patient.x_location));
            $('#y_location').val((patient.y_location));
            $('#nearestHospital').val((patient.nearestHospital));
            $('#bed_id').val((patient.bed_id));
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}



/*
---------view patient details by doctor------------------------
*/
function viewPatient(patient_id){
    $.ajax({
        type: "GET",
        url: 'http://localhost:8090/patientRegister?patient_id=' + patient_id,
        dataType: "json",
        success: function (data, status, xhr) {
            let patient = data;
            $('#patient_id').val(patient.patient_id).change();
            $('#first_name').val(patient.first_name);
            $('#last_name').val(patient.last_name);
            $('#contact').val(patient.contact);
            $('#district').val(patient.district);
            $('#email').val(patient.email);
            $('#age').val(patient.age);
            $('#x_location').val(patient.x_location);
            $('#y_location').val(patient.y_location);
            $('#admit_date').val(patient.admit_date);
            $('#discharge_date').val(patient.discharge_date).change();
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}


/*
-----------------admit/discharge patient---------------
*/ 
function savePatient(patient_id, form){
    $.ajax({
        type: "PUT",
        url:'http://localhost:8090/patientRegister?patient_id=' + patient_id + '&' + form.serialize(),
        success: function (data, status, xhr) {
            console.log('admit successfully');
            toastr.success('patient admit successfully', 'Save Complete');
            window.location.replace("patient.html");
        },
        error: function (jqXhr, textStatus, errorMessage) {
            toastr.error('Something went wrong! ' + errorMessage, 'Error')
        }
    });
}

/*
-----------------discharge patient---------------
*/ 
// function dischargePatient(patient_id) {
//     $.ajax({
//         type: "DELETE",
//         url:'http://localhost:8090/patientRegister?patient_id=' + patient_id,
//         success: function (data, status, xhr) {
//             toastr.success('Discharge patient successfully', 'Discharge Complete');
//         },
//         error: function (jqXhr, textStatus, errorMessage) {
//             toastr.error('Something went wrong! ' + errorMessage, 'Error')
//         }
//     });
// }


