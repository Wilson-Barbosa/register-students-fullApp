package com.abutua.studentregister.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.abutua.studentregister.models.Student;

import jakarta.annotation.PostConstruct;

@RestController
public class StudentController {
    

    // The student's info will be store within an ArrayList object
    private List<Student> listOfStudents = new ArrayList<>();
    

    @PostConstruct  // Annotation needed to call this method when the object StudentController is instantiated
    public List<Student> onInit(){
        
        // Defining mock data to be used for testing
        // I'm adding a new student by calling the constructor method within the Student.java class
        listOfStudents.add(new Student(1, "Rafael", "rafael@gmail.com", "11984521010", 2, 1));
        listOfStudents.add(new Student(2, "Wilson", "wilson@gmail.com", "156345786112", 1, 3));
        listOfStudents.add(new Student(3, "Fernanda", "fernanda@gmail.com", "11963124500", 3, 2));

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
        // The return is like this because the list starts with index 0
        return ResponseEntity.ok(listOfStudents.get(id -1));
    }

}
