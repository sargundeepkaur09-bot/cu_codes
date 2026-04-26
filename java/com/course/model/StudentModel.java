package com.course.model;

public class Course {

    private int courseId;
    private String courseName;
    private int maxSeats;
    private int enrolledStudents;

    public Course(int courseId, String courseName, int maxSeats) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.maxSeats = maxSeats;
        this.enrolledStudents = 0;
    }

    public int getCourseId() {
        return courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public int getMaxSeats() {
        return maxSeats;
    }

    public int getEnrolledStudents() {
        return enrolledStudents;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setMaxSeats(int maxSeats) {
        this.maxSeats = maxSeats;
    }

    public void setEnrolledStudents(int enrolledStudents) {
        this.enrolledStudents = enrolledStudents;
    }

    public void display() {
        System.out.println("Course ID : " + courseId);
        System.out.println("Course Name : " + courseName);
        System.out.println("Max Seats : " + maxSeats);
        System.out.println("Enrolled Students : " + enrolledStudents);
    }
}