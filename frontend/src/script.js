//phone number's input mask
$("#phoneNumber").mask("(00) 00000-0000");

//array for course option
const courseArray = [
    {
        id: 1,
        course: "Angular",
    },
    {
        id: 2,
        course: "React",
    },
    {
        id: 3,
        course: "NodeJS",
    },
    {
        id: 4,
        course: "Data Analysis",
    },
];

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
let studentArray = [
    {
        id: 1,
        name: "Paulo de Tarso",
        email: "paulo@gmail.com",
        phoneNumber: "(11) 65455-7892",
        course: 2,
        period: 1,
    },
    {
        id: 2,
        name: "Juliana Oliveira",
        email: "juliana@hotmail.com",
        phoneNumber: "(15) 89915-5677",
        course: 1,
        period: 3,
    },
    {
        id: 3,
        name: "Francisco Bianchi",
        email: "bianchi@hotmail.com",
        phoneNumber: "(19) 78455-2314",
        course: 3,
        period: 2,
    }
];




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

    let newStudent = {

        id: studentArray.length + 1,
        name: document.getElementById("inputName").value,
        email: document.getElementById("inputEmail").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        course: document.getElementById("courseSelection").value,
        period: selectPeriod()

    };


    //pushes the new student's info to the studentArray
    //the insertion happens even without this push, but I'm gonna put this in here just to be cool
    studentArray.push(newStudent);

    //sends the info to the screen
    gets_one_student_info(newStudent);

    //reseting the form
    document.getElementById("student-form").reset();
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
    let newPhone = document.createTextNode(student.phoneNumber);
    let phoneCell = newRow.insertCell();
    phoneCell.className = 'd-none d-lg-table-cell';
    phoneCell.appendChild(newPhone);

    //inserts the matching course
    for (let j = 0; j < courseArray.length; j++) {
        if (student.course == courseArray[j].id) {
            let newCourse = document.createTextNode(courseArray[j].course);
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


//iterates the studentArray and passes each student as argument
//this will be called later, when the page is loaded
function load_all_students() {
    for (let i = 0; i < studentArray.length; i++) {
        gets_one_student_info(studentArray[i]);
    }
}




/* ----------------- Info displayed on screen ----------------- */

//load all students information to the screen when the page is loaded
load_all_students();