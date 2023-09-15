#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>

typedef struct student_struct {
    char name[50]; // string for name
    char major[50]; // string for major
    int age; // integer variable for age
    char placeFrom[50]; // string for place from
    double GPA; // double variable for gpa.
} student;
// defines student variable structure

int main(void) {
    student student1;
	// creates student variable named student1

    strcpy(student1.name, "Jeffy Jefferson");
    strcpy(student1.major, "Software Engineering");
    student1.age = 18;
    strcpy(student1.placeFrom, "Iowa City, Iowa");
    student1.GPA = 3.99;
	// defines student1

    printf("name: %s\n", student1.name);
    printf("major: %s\n", student1.major);
    printf("age: %d\n", student1.age);
    printf("Place from: %s\n", student1.placeFrom);
    printf("GPA: %.2lf\n", student1.GPA);
	// outputs student 1


    return 0;

}