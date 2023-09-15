#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#define SIZE 3

typedef struct student_struct {
	char name[50];
	char major[50];
	int age;
	char placeFrom[50];
	double GPA;
	int gradeassignment[SIZE];
	int gradequiz[SIZE];
	int gradeexam[SIZE];
	int gradeassignmentpercent;
	int gradequizpercent;
	int gradeexampercent;
} student;

typedef struct university_struct {
	char name[50];
	student students[3];
	int builtyear;
	char location[50];
	
	
} university;

int maxscorestudentassignment(student student);
int maxscorestudentquiz(student student);
int maxscorestudentexam(student student);
int minscorestudentassignment(student student);
int minscorestudentquiz(student student);
int minscorestudentexam(student student);
double averagescorestudentassignment(student student);
double averagescorestudentquiz(student student);
double averagescorestudentexam(student student);

int main(void) {
	university university1, university2, university3;
	
	strcpy(university1.name, "Iowa State"); //university 1 name 
	strcpy(university2.name, "University of Iowa"); // university 2 name
	strcpy(university3.name, "Kirkwood"); // university 3 name
	
	strcpy(university1.location, "Ames, Iowa"); // university 1 location
	strcpy(university2.location, "Iowa City, Iowa"); // university 2 location
	strcpy(university3.location, "Cedar Rapids, Iowa"); // university 3 location
	
	university1.builtyear = 1800; // year university 1
	university2.builtyear = 1899; // year university 2
	university3.builtyear = 1900; // year university 3
	
	strcpy(university1.students[0].name, "Colsen Selk");
	strcpy(university1.students[0].major, "Software Engineering");
	university1.students[0].age = 18;
	strcpy(university1.students[0].placeFrom, "Iowa City, Iowa");
	university1.students[0].GPA = 4.00;
	university1.students[0].gradeassignment[0] = 10; university1.students[0].gradeassignment[1] = 20; university1.students[0].gradeassignment[2] = 30;
	university1.students[0].gradeexam[0] = 10; university1.students[0].gradeexam[1] = 20; university1.students[0].gradeexam[2] = 30;
	university1.students[0].gradequiz[0] = 10; university1.students[0].gradequiz[1] = 20; university1.students[0].gradequiz[2] = 30;
	university1.students[0].gradeassignmentpercent = 20;
	university1.students[0].gradeexampercent = 50;
	university1.students[0].gradequizpercent = 30;
	// student 1 information. he belongs to university 1
	
	
	strcpy(university1.students[1].name, "Jeff Jefferson");
	strcpy(university1.students[1].major, "Computer Engineering");
	university1.students[1].age = 19;
	strcpy(university1.students[1].placeFrom, "Ames, Iowa");
	university1.students[1].GPA = 3.50;
	university1.students[1].gradeassignment[0] = 10; university1.students[1].gradeassignment[1] = 20; university1.students[1].gradeassignment[2] = 30;
	university1.students[1].gradeexam[0] = 10; university1.students[1].gradeexam[1] = 20; university1.students[1].gradeexam[2] = 30;
	university1.students[1].gradequiz[0] = 10; university1.students[1].gradequiz[1] = 20; university1.students[1].gradequiz[2] = 30;
	university1.students[1].gradeassignmentpercent = 20;
	university1.students[1].gradeexampercent = 50;
	university1.students[1].gradequizpercent = 30;
	// student 2 information. he belongs to university 1
	
	strcpy(university1.students[2].name, "James Chocolate");
	strcpy(university1.students[2].major, "Mechanical Engineering");
	university1.students[2].age = 19;
	strcpy(university1.students[2].placeFrom, "Keystone, Iowa");
	university1.students[2].GPA = 3.50;
	university1.students[2].gradeassignment[0] = 10; university1.students[2].gradeassignment[1] = 20; university1.students[2].gradeassignment[2] = 30;
	university1.students[2].gradeexam[0] = 10; university1.students[2].gradeexam[1] = 20; university1.students[2].gradeexam[2] = 30;
	university1.students[2].gradequiz[0] = 10; university1.students[2].gradequiz[1] = 20; university1.students[2].gradequiz[2] = 30;
	university1.students[2].gradeassignmentpercent = 20;
	university1.students[2].gradeexampercent = 50;
	university1.students[2].gradequizpercent = 30;
	// student 3 information. he belongs to university 1
	
	strcpy(university2.students[0].name, "Mason Selk");
	strcpy(university2.students[0].major, "Pharmaseutical");
	university2.students[0].age = 18;
	strcpy(university2.students[0].placeFrom, "Iowa City, Iowa");
	university2.students[0].GPA = 4.00;
	university2.students[0].gradeassignment[0] = 10; university2.students[0].gradeassignment[1] = 20; university2.students[0].gradeassignment[2] = 30;
	university2.students[0].gradeexam[0] = 10; university2.students[0].gradeexam[1] = 20; university2.students[0].gradeexam[2] = 30;
	university2.students[0].gradequiz[0] = 10; university2.students[0].gradequiz[1] = 20; university2.students[0].gradequiz[2] = 30;
	university2.students[0].gradeassignmentpercent = 20;
	university2.students[0].gradeexampercent = 50;
	university2.students[0].gradequizpercent = 30;
	// student 4 information. he belongs to university 2
	
	strcpy(university2.students[1].name, "Nick Prior");
	strcpy(university2.students[1].major, "Liberal Arts");
	university2.students[1].age = 19;
	strcpy(university2.students[1].placeFrom, "California");
	university2.students[1].GPA = 3.50;
	university2.students[1].gradeassignment[0] = 10; university2.students[1].gradeassignment[1] = 20; university2.students[1].gradeassignment[2] = 30;
	university2.students[1].gradeexam[0] = 10; university2.students[1].gradeexam[1] = 20; university2.students[1].gradeexam[2] = 30;
	university2.students[1].gradequiz[0] = 10; university2.students[1].gradequiz[1] = 20; university2.students[1].gradequiz[2] = 30;
	university2.students[1].gradeassignmentpercent = 20;
	university2.students[1].gradeexampercent = 50;
	university2.students[1].gradequizpercent = 30;
	// student 5 information. he belongs to university 2
	
	strcpy(university2.students[2].name, "Mick Bartelme");
	strcpy(university2.students[2].major, "Veternerian");
	university2.students[2].age = 19;
	strcpy(university2.students[2].placeFrom, "Keystone, Iowa");
	university2.students[2].GPA = 3.50;
	university2.students[2].gradeassignment[0] = 10; university2.students[2].gradeassignment[1] = 20; university2.students[2].gradeassignment[2] = 30;
	university2.students[2].gradeexam[0] = 10; university2.students[2].gradeexam[1] = 20; university2.students[2].gradeexam[2] = 30;
	university2.students[2].gradequiz[0] = 10; university2.students[2].gradequiz[1] = 20; university2.students[2].gradequiz[2] = 30;
	university2.students[2].gradeassignmentpercent = 20;
	university2.students[2].gradeexampercent = 50;
	university2.students[2].gradequizpercent = 30;
	// student 6 information. he belongs to university 2
	
	strcpy(university3.students[0].name, "Easton Selk");
	strcpy(university3.students[0].major, "English");
	university3.students[0].age = 18;
	strcpy(university3.students[0].placeFrom, "Iowa City, Iowa");
	university3.students[0].GPA = 4.00;
	university3.students[0].gradeassignment[0] = 10; university3.students[0].gradeassignment[1] = 20; university3.students[0].gradeassignment[2] = 30;
	university3.students[0].gradeexam[0] = 10; university3.students[0].gradeexam[1] = 20; university3.students[0].gradeexam[2] = 30;
	university3.students[0].gradequiz[0] = 10; university3.students[0].gradequiz[1] = 20; university3.students[0].gradequiz[2] = 30;
	university3.students[0].gradeassignmentpercent = 20;
	university3.students[0].gradeexampercent = 50;
	university3.students[0].gradequizpercent = 30;
	// student 7 information. he belongs to university 3
	
	strcpy(university3.students[1].name, "Marcus Knedler");
	strcpy(university3.students[1].major, "Environmental Engineering");
	university3.students[1].age = 19;
	strcpy(university3.students[1].placeFrom, "Iowa City, Iowa");
	university3.students[1].GPA = 3.50;
	university3.students[1].gradeassignment[0] = 10; university3.students[1].gradeassignment[1] = 20; university3.students[1].gradeassignment[2] = 30;
	university3.students[1].gradeexam[0] = 10; university3.students[1].gradeexam[1] = 20; university3.students[1].gradeexam[2] = 30;
	university3.students[1].gradequiz[0] = 10; university3.students[1].gradequiz[1] = 20; university3.students[1].gradequiz[2] = 30;
	university3.students[1].gradeassignmentpercent = 20;
	university3.students[1].gradeexampercent = 50;
	university3.students[1].gradequizpercent = 30;
	// student 8 information. he belongs to university 3
	
	strcpy(university3.students[2].name, "Key Board");
	strcpy(university3.students[2].major, "Mechanical Engineering");
	university3.students[2].age = 19;
	strcpy(university3.students[2].placeFrom, "Keystone, Iowa");
	university3.students[2].GPA = 3.50;
	university3.students[2].gradeassignment[0] = 10; university3.students[2].gradeassignment[1] = 20; university3.students[2].gradeassignment[2] = 30;
	university3.students[2].gradeexam[0] = 10; university3.students[2].gradeexam[1] = 20; university3.students[2].gradeexam[2] = 30;
	university3.students[2].gradequiz[0] = 10; university3.students[2].gradequiz[1] = 20; university3.students[2].gradequiz[2] = 30;
	university3.students[2].gradeassignmentpercent = 20;
	university3.students[2].gradeexampercent = 50;
	university3.students[2].gradequizpercent = 30;
	// student 9 information. he belongs to university 3
	
	double student1average = averagescorestudentassignment(university1.students[0]) * (university1.students[0].gradeassignmentpercent / 100.0) + averagescorestudentquiz(university1.students[0]) * (university1.students[0].gradequizpercent / 100.0) + averagescorestudentexam(university1.students[0]) * (university1.students[0].gradeexampercent / 100.0); // finds grade for student1
	double student2average = averagescorestudentassignment(university1.students[1]) * (university1.students[1].gradeassignmentpercent / 100.0) + averagescorestudentquiz(university1.students[1]) * (university1.students[1].gradequizpercent / 100.0) + averagescorestudentexam(university1.students[1]) * (university1.students[1].gradeexampercent / 100.0);// finds grade for student2
	double student3average = averagescorestudentassignment(university1.students[2]) * (university1.students[2].gradeassignmentpercent / 100.0) + averagescorestudentquiz(university1.students[2]) * (university1.students[2].gradequizpercent / 100.0) + averagescorestudentexam(university1.students[2]) * (university1.students[2].gradeexampercent / 100.0);// finds grade for student3
	
	double student4average = averagescorestudentassignment(university2.students[0]) * (university2.students[0].gradeassignmentpercent / 100.0) + averagescorestudentquiz(university2.students[0]) * (university2.students[0].gradequizpercent / 100.0) + averagescorestudentexam(university2.students[0]) * (university2.students[0].gradeexampercent / 100.0);// finds grade for student4
	double student5average = averagescorestudentassignment(university2.students[1]) * (university2.students[1].gradeassignmentpercent / 100.0) + averagescorestudentquiz(university2.students[1]) * (university2.students[1].gradequizpercent / 100.0) + averagescorestudentexam(university2.students[1]) * (university2.students[1].gradeexampercent / 100.0);// finds grade for student5
	double student6average = averagescorestudentassignment(university2.students[2]) * (university2.students[2].gradeassignmentpercent / 100.0) + averagescorestudentquiz(university2.students[2]) * (university2.students[2].gradequizpercent / 100.0) + averagescorestudentexam(university2.students[2]) * (university2.students[2].gradeexampercent / 100.0);// finds grade for student6
	
	double student7average = averagescorestudentassignment(university3.students[0]) * (university3.students[0].gradeassignmentpercent / 100.0) + averagescorestudentquiz(university3.students[0]) * (university3.students[0].gradequizpercent / 100.0) + averagescorestudentexam(university3.students[0]) * (university3.students[0].gradeexampercent / 100.0);// finds grade for student7
	double student8average = averagescorestudentassignment(university3.students[1]) * (university3.students[1].gradeassignmentpercent / 100.0) + averagescorestudentquiz(university3.students[1]) * (university3.students[1].gradequizpercent / 100.0) + averagescorestudentexam(university3.students[1]) * (university3.students[1].gradeexampercent / 100.0);// finds grade for student8
	double student9average = averagescorestudentassignment(university3.students[2]) * (university3.students[2].gradeassignmentpercent / 100.0) + averagescorestudentquiz(university3.students[2]) * (university3.students[2].gradequizpercent / 100.0) + averagescorestudentexam(university3.students[2]) * (university3.students[2].gradeexampercent / 100.0);// finds grade for student9
	
	
	printf("\n\nUniversity 1:\n\n");
	printf("	Name: %s\n", university1.name);
	printf("	Location: %s\n", university1.location);
	printf("	Built year: %d\n", university1.builtyear);
	printf("	Student names:\n		%s\n		%s\n		%s\n", university1.students[0].name, university1.students[1].name, university1.students[2].name);
	printf("	Student majors:\n		%s\n		%s\n		%s\n", university1.students[0].major, university1.students[1].major, university1.students[2].major);
	printf("	Student ages:\n		%d\n		%d\n		%d\n", university1.students[0].age, university1.students[1].age, university1.students[2].age);
	printf("	Student place from:\n		%s\n		%s\n		%s\n", university1.students[0].placeFrom, university1.students[1].placeFrom, university1.students[2].placeFrom);
	printf("	Student GPA:\n		%.2lf\n		%.2lf\n		%.2lf\n", university1.students[0].GPA, university1.students[1].GPA, university1.students[2].GPA);
	printf("	Student average:\n		%.2lf\n		%.2lf\n		%.2lf\n", student1average, student2average, student3average);
	// outputs university 1's information
	
	printf("\n\nUniversity 2:\n\n");
	printf("	Name: %s\n", university2.name);
	printf("	Location: %s\n", university2.location);
	printf("	Built year: %d\n", university2.builtyear);
	printf("	Student names:\n		%s\n		%s\n		%s\n", university2.students[0].name, university2.students[1].name, university2.students[2].name);
	printf("	Student majors:\n		%s\n		%s\n		%s\n", university2.students[0].major, university2.students[1].major, university2.students[2].major);
	printf("	Student ages:\n		%d\n		%d\n		%d\n", university2.students[0].age, university2.students[1].age, university2.students[2].age);
	printf("	Student place from:\n		%s\n		%s\n		%s\n", university2.students[0].placeFrom, university2.students[1].placeFrom, university2.students[2].placeFrom);
	printf("	Student GPA:\n		%.2lf\n		%.2lf\n		%.2lf\n", university2.students[0].GPA, university2.students[1].GPA, university2.students[2].GPA);
	printf("	Student average:\n		%.2lf\n		%.2lf\n		%.2lf\n", student4average, student5average, student6average);
	// outputs university 2's information
	
	printf("\n\nUniversity 3:\n\n");
	printf("	Name: %s\n", university3.name);
	printf("	Location: %s\n", university3.location);
	printf("	Built year: %d\n", university3.builtyear);
	printf("	Student names:\n		%s\n		%s\n		%s\n", university3.students[0].name, university3.students[1].name, university3.students[2].name);
	printf("	Student majors:\n		%s\n		%s\n		%s\n", university3.students[0].major, university3.students[1].major, university3.students[2].major);
	printf("	Student ages:\n		%d\n		%d\n		%d\n", university3.students[0].age, university3.students[1].age, university3.students[2].age);
	printf("	Student place from:\n		%s\n		%s\n		%s\n", university3.students[0].placeFrom, university3.students[1].placeFrom, university3.students[2].placeFrom);
	printf("	Student GPA:\n		%.2lf\n		%.2lf\n		%.2lf\n", university3.students[0].GPA, university3.students[1].GPA, university3.students[2].GPA);
	printf("	Student average:\n		%.2lf\n		%.2lf\n		%.2lf\n", student7average, student8average, student9average);
	// outputs university 3's information
	
	
	
	
	
	return 0;
	
}

int maxscorestudentassignment(student student) {
	int maxscore = 0;
	
	for(int i = 0; i < SIZE; i++) {
		if(maxscore < student.gradeassignment[i]) {
			maxscore = student.gradeassignment[i];
		}
	}
	
	return maxscore;
}

int maxscorestudentquiz(student student) {
	int maxscore = 0;
	
	for(int i = 0; i < SIZE; i++) {
		if(maxscore < student.gradequiz[i]) {
			maxscore = student.gradequiz[i];
		}
	}
	
	return maxscore;
}

int maxscorestudentexam(student student) {
	int maxscore = 0;
	
	for(int i = 0; i < SIZE; i++) {
		if(maxscore < student.gradeexam[i]) {
			maxscore = student.gradeexam[i];
		}
	}
	
	return maxscore;
}

int minscorestudentassignment(student student) {
	int minscore = 100;
	
	for(int i = 0; i < SIZE; i++) {
		if(minscore > student.gradeassignment[i]) {
			minscore = student.gradeassignment[i];
		}
	}
	
	return minscore;
}

int minscorestudentquiz(student student) {
	int minscore = 100;
	
	for(int i = 0; i < SIZE; i++) {
		if(minscore > student.gradequiz[i]) {
			minscore = student.gradequiz[i];
		}
	}
	
	return minscore;
}

int minscorestudentexam(student student) {
	int minscore = 100;
	
	for(int i = 0; i < SIZE; i++) {
		if(minscore > student.gradeexam[i]) {
			minscore = student.gradeexam[i];
		}
	}
	
	return minscore;
}

double averagescorestudentassignment(student student) {
	double averagescore = 0.0;
	
	for(int i = 0; i < SIZE; i++) {
			averagescore += student.gradeassignment[i];
	}
	
	return (averagescore / SIZE);
}

double averagescorestudentquiz(student student) {
	double averagescore = 0.0;
	
	for(int i = 0; i < SIZE; i++) {
			averagescore += student.gradequiz[i];
	}
	
	return (averagescore / SIZE);
}

double averagescorestudentexam(student student) {
	double averagescore = 0.0;
	
	for(int i = 0; i < SIZE; i++) {
			averagescore += student.gradeexam[i];
	}
	
	return (averagescore / SIZE);
}


