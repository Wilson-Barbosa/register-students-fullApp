package com.abutua.studentregister.resources;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.abutua.studentregister.models.Student;

import jakarta.annotation.PostConstruct;

@RestController
@CrossOrigin
public class StudentController {
    

    // The student's info will be store within an ArrayList object
    private List<Student> listOfStudents = new ArrayList<>();
    

    @PostConstruct  // Annotation needed to call this method when the object StudentController is instantiated
    public List<Student> onInit(){
        
        // Defining mock data to be used for testing
        // I'm adding a new student by calling the constructor method within the Student.java class
        listOfStudents.add(new Student(1, "Rafael", "rafael@gmail.com", "(15) 68497-9876", 2, 1));
        listOfStudents.add(new Student(2, "Wilson", "wilson@gmail.com", "(68) 78979-8794", 1, 3));
        listOfStudents.add(new Student(3, "Fernanda", "fernanda@gmail.com", "(12) 36984-7879", 3, 2));

        // After the list is create and populated it's returned here
        return listOfStudents;
    }


    // Method that returns the list with all students
    @GetMapping("students")
    public ResponseEntity<List<Student>> getStudents(){
        // The list with all students is returned as part of a ResponseEntity
        return ResponseEntity.ok(listOfStudents);
    }


    // Method that returns a single student by it's id
    @GetMapping("students/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable int id){
        if(id <= listOfStudents.size()){
            // If a student exist it's returned here
            return ResponseEntity.ok(listOfStudents.get(id -1));
        } else {
            // If one wasn't found both status code 404 and a message for the user
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found");
        }
    }


    // Method that allows a new student to be saved on the server
    @PostMapping("students")

    // @RequestBody takes the student from the body of the request
    public ResponseEntity<Student> saveStudent(@RequestBody Student student){

        // Making sure the new student's id is correct within the ArrayList
        student.setId(listOfStudents.size() + 1);

        // Adding the user to the list
        listOfStudents.add(student);

        // Creating the URI that will be included in response for the client
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(student.getId())
            .toUri();

        // Finally you can return both the status code 201 and the new resource with it's path
        return ResponseEntity.created(location).body(student);
    }

}
