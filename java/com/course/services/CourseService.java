package com.course.service;

import com.course.exception.CourseFullException;
import com.course.exception.CourseNotFoundException;
import com.course.model.Course;
import com.course.model.Student;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CourseService {

    private List<Course> courseList = new ArrayList<>();
    private static final String FILE_PATH = "courses.txt";

    public void addCourse(Course c) {
        courseList.add(c);
    }

    public void enrollStudent(int courseId, Student s)
            throws CourseNotFoundException, CourseFullException {

        Course found = null;
        for (Course c : courseList) {
            if (c.getCourseId() == courseId) {
                found = c;
                break;
            }
        }

        if (found.getEnrolledStudents() >= found.getMaxSeats()) {
            throw new CourseFullException(
                    "Course  is full! No seats available.");
        }
        found.setEnrolledStudents(found.getEnrolledStudents() + 1);

        saveEnrollmentToFile(found, s);
    }

    public void viewCourses() {
        if (courseList.isEmpty()) {
            System.out.println("No courses available.");
            return;
        }
        for (Course c : courseList) {
            c.display();
        }
    }

    private void saveEnrollmentToFile(Course c, Student s) {
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter(FILE_PATH, true))) {

            writer.write("Student ID: " + s.getStudentId());
            writer.newLine();
            writer.write("Student Name: " + s.getStudentName());
            writer.newLine();
            writer.write("Course ID: " + c.getCourseId());
            writer.newLine();
            writer.write("Course Name: " + c.getCourseName());
            writer.newLine();
            writer.write("----x------x------x----");
            writer.newLine();

        } catch (IOException e) {
            System.out.println("Error writing to file: " + e.getMessage());
        }
    }

}