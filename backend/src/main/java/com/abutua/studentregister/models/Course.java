package com.abutua.studentregister.models;

public class Course {

    
    // Attributes that define how a course looks like
    private int id;
    private String name;


    // Constructor
    // Method that will be called when a new course object is create
    public Course(int id, String name){
        this.id = id;
        this.name = name;
    }


    // Setter and Getter Methods
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    };

}
