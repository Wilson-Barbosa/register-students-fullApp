//phone number's input mask
$("#phone").mask("(00) 00000-0000");

//array for course option
const courseArray = [];

//array for class period
const periodArray = [
    {
        id: 1,
        period: "Morning",
    },
    {
        id: 2,
        period: "Afternoon",
    },
    {
        id: 3,
        period: "Evening",
    },

];

//array of students where their data will be stored
let studentArray = [];




/* ----------------- FUNCTIONS ----------------- */

//function that captures the information on the form
function grab_info_form() {

    /* this function iterates the nodeList of periods and returns the value of the selected one
    the value is assign later to the period property */
    function selectPeriod() {
        let periodNodelist = document.getElementsByName("classPeriod");

        for (let n = 0; n < periodNodelist.length; n++) {
            if (periodNodelist[n].checked) {
                return periodNodelist[n].value;
            }
        }
    }

    // This is an object created with the input's values
    let newStudent = {

        name: document.getElementById("inputName").value,
        email: document.getElementById("inputEmail").value,
        phone: document.getElementById("phone").value,
        idCourse: document.getElementById("courseSelection").value,
        period: selectPeriod()

    };



    // Making the POST to the server
    $.ajax({
        url: "http://localhost:8080/students",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(newStudent),
        success: (response) => {

            //sends the info to the screen
            studentArray.push(response)
            gets_one_student_info(response);

            //reseting the form
            document.getElementById("student-form").reset();
        }
    });


    //pushes the new student's info to the studentArray
    //the insertion happens even without this push, but I'm gonna put this in here just to be cool
    ;


}


//takes ONE student data and shows it on the screen
function gets_one_student_info(student) {

    let table = document.getElementById("student-table");   //grabs the table element
    let newRow = table.insertRow();                         //inserts a new row to my table

    //inserting ID
    let newId = document.createTextNode(student.id);
    newRow.insertCell().appendChild(newId);

    //inserting name
    let newName = document.createTextNode(student.name);
    newRow.insertCell().appendChild(newName);

    //inserting email
    let newEmail = document.createTextNode(student.email);
    let emailCell = newRow.insertCell();
    emailCell.className = 'd-none d-md-table-cell';
    emailCell.appendChild(newEmail);

    //inserting phone number
    let newPhone = document.createTextNode(student.phone);
    let phoneCell = newRow.insertCell();
    phoneCell.className = 'd-none d-lg-table-cell';
    phoneCell.appendChild(newPhone);

    //inserts the matching course
    for (let j = 0; j < courseArray.length; j++) {
        if (student.idCourse == courseArray[j].id) {
            let newCourse = document.createTextNode(courseArray[j].name);
            newRow.insertCell().appendChild(newCourse);
        }
    }

    //inserts the matching period
    for (let j = 0; j < periodArray.length; j++) {
        if (student.period == periodArray[j].id) {
            let newPeriod = document.createTextNode(periodArray[j].period);
            newRow.insertCell().appendChild(newPeriod);
        }
    }
}


// Function that makes an HTTP request and get a list of all students available
// Executed on page load
function load_all_students() {

    $.getJSON("http://localhost:8080/students", (response) => {

        // Each student object is pushed to the studentArray
        for (let student of response) {
            studentArray.push(student);
        }

        // Each student's info is displayed on the screen on it's individual row
        for (let i = 0; i < studentArray.length; i++) {
            gets_one_student_info(studentArray[i]);
        }
    });

}


// Function that gets the information on courses and renders them onto the screen
function load_all_courses() {

    $.ajax({
        url: "http://localhost:8080/courses",
        type: "GET",
        async: false,   //async request
        success: (response) => {

            for (let course of response) {
                // Pushing each course object into courseArray
                courseArray.push(course);

                // Adding each course in the select element
                document.getElementById("courseSelection").innerHTML += `<option value="${course.id}">${course.name}</option>`;
            }
        }

    });
}


/* ----------------- Info displayed on screen ----------------- */

// Load all courses and renders them in the screen before loading the students
load_all_courses();

// Load all students information to the screen when the page is loaded
load_all_students();

