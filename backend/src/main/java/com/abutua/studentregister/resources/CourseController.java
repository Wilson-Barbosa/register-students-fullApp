package com.abutua.studentregister.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abutua.studentregister.models.Course;

import jakarta.annotation.PostConstruct;


@RestController
public class CourseController {

    // Creating an empty list of courses that will be populated later
    private List<Course> listOfCourses = new ArrayList<>();

    
    @PostConstruct // This annotation ensures the method will be executed when this class is instantiated
    public List<Course> onInit() {

        // Adding mock data to be used for testing
        listOfCourses.add(new Course(1, "Angular"));
        listOfCourses.add(new Course(2, "React"));
        listOfCourses.add(new Course(3, "NodeJs"));
        listOfCourses.add(new Course(4, "Data Analysis"));

        return listOfCourses;
    }


    // Method that returns the list of all courses available
    @GetMapping("courses")
    public ResponseEntity <List<Course>> getCourses(){
        return ResponseEntity.ok(listOfCourses);
    }

}
