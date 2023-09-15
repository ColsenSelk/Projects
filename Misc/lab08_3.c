#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>


typedef struct student {
    char name[50];
    char major[50];
    int age;
    char placeFrom[50];
    double GPA;
} student;




int main(void) {
    int n = 3; // the value of n will determine the amount of student variables that studentptr will point to.
    
    
    struct student *studentptr;
    studentptr = (struct student*) malloc(n * sizeof(struct student)); // dynamically allocates variable
    
    for (int i = 0; i < n; i++) {
        printf("enter name: ");
        fgets((studentptr+i)->name, 50, stdin);
        printf("enter major: ");
        fgets((studentptr+i)->major, 50, stdin);
        printf("enter place from: ");
        fgets((studentptr+i)->placeFrom, 50, stdin);
        printf("enter age: ");
        scanf("%d", &(studentptr+i)->age);
        printf("enter GPA: ");
        scanf("%lf", &(studentptr+i)->GPA);
        fgetc(stdin); // used to allow future fgets use. Weird glitch with the C language.
		strtok((studentptr+i)->name, "\n"); // removes \n (wont work if nothing is entered.)
		strtok((studentptr+i)->major, "\n"); // removes \n (wont work if nothing is entered.)
		strtok((studentptr+i)->placeFrom, "\n"); // removes \n (wont work if nothing is entered.)
    } // inputs information, each time it runs it grabs all information for 1 individual student variable.
	
	printf("\n");
    
    for (int i = 0; i < n; i++) {
        printf("Name: %s\n", (studentptr+i)->name);
        printf("Major: %s\n", (studentptr+i)->major);
        printf("Place from: %s\n", (studentptr+i)->placeFrom);
        printf("Age: %d\n", (studentptr+i)->age);
        printf("GPA: %.2lf\n", (studentptr+i)->GPA);
        printf("\n");
        
    } // outputs information
	
	free(studentptr); // clears memory of studentptr
    
    return 0;
}