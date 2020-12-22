# SARKX -2020

## Introduction

Individual project for SparkX Proffessional Development Program-2020. A Covid Management System to manage hospitals and patients enabling displaying patient and hospital statistics by hospital level, district level and country level.

Backend developed using Java & MySQL.

Frontend developed using HTML,CSS and JavaScript.

- Backend: View Repository
+ Frontend:View Repository

## About Project

National COVID Management System-web application backend design. Following functionalities are included in the system.

- In the system there are four main entities: patient, Moh officer, Doctor and director.
+ Only patients can register to the system and a bed is allocated for them. If beds are not available, then they are put into a queue.
- When a patient is discharged, the director can remove the patient and make bed available.
+ Moh can manage the system. They can add/delete/update hospitals, add/delete/update doctors and directors.

## Documents

System functionalities have developed by considering following documents. You can view the above documents from this links.

- [SRS Document](https://github.com/ishaniMadhuwanthi/spark_ncms_backend/blob/master/SRS%20Document.pdf) (Software Requirement Specification Document)
+ [SDD Document](https://github.com/ishaniMadhuwanthi/spark_ncms_backend/blob/master/SD%20Document.pdf) (Software Design Documents)

## Instructions

1. Clone the repository 
2. Add repository to a folder in htdocs (XAMMP), www (WAMP) or host in the server
3. Install CROS enable extention if you are using Chrome or get errors due to CROS policy. [Allow CORS: Access-Control-Allow-origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)
4. Update your URL in .js files

Eg:- In the folder **spark_ncms_frontend/js/hospital.js**, it should be included your backend URL in every ajax call.

```JavaScript
function loadHospitalList() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8090/HospitalList',
        dataType: "json",
        success: function (data, status, xhr) {
            $.each(data, function(key, hospital){
                let printStr = '<tr><td>' + hospital.hospital_id + '</td><td>' + hospital.name + '</td><td>' + hospital.district +'</td><td>' + hospital.x_location + '</td><td>' + hospital.y_location  +'</td><td><a href="editHospital.html?hospital_id=' + hospital.hospital_id + '" class="edit-btn">Edit</a></td></tr>';
                $('#hospitals-list tr:last').after(printStr); 
            });
        },
        error: function (jqXhr, textStatus, errorMessage) {
            ajaxErrorHandle(jqXhr);
        }
    });
}
```

## Login Details

In the system, only MOH and Doctor is able to login to the system. Patient can only register to the system. Then they will recieved their reservation details.

- MOH
Username: moh@gmail.com
Password: moh123

+ Doctor
Username: doc1@gmail.com
Password: doc1123

## Libraries

+ Fontawesome: 4.7.0
- Toastr: 2.1.3
+ Sweetalert2
- JS Cookie: 2.2.1
+ JQuery: 3.3.1
- ChartJS: 2.7.1



