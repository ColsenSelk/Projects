/*----------------------------------------------------------------------------
-		                    SE 185: Lab 06 - Bop-It!	    	             -
-	Name:	Colsen Selk																 -
- 	Section:	4															 -
-	NetID:		ceselk														     -
-	Date:		10/5/2020															 -
-----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------
-								Includes									 -
-----------------------------------------------------------------------------*/
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <windows.h>

/*----------------------------------------------------------------------------
-	                            Prototypes                                   -
-----------------------------------------------------------------------------*/

/*
	double timetaken1 = 1000 * difftime(time(NULL), startTime1); // ends time and sets elapsed time
	Sleep(100);
	double timetaken2 = 1000 * difftime(time(NULL), startTime1); // time + 0.1
	Sleep(100);
	double timetaken3 = 1000 * difftime(time(NULL), startTime1); // time + 0.2
	Sleep(100);
	double timetaken4 = 1000 * difftime(time(NULL), startTime1); // time + 0.3
	Sleep(100);
	double timetaken5 = 1000 * difftime(time(NULL), startTime1); // time + 0.4
	Sleep(100);
	double timetaken6 = 1000 * difftime(time(NULL), startTime1); // time + 0.5
	Sleep(100);
	double timetaken7 = 1000 * difftime(time(NULL), startTime1); // time + 0.6
	Sleep(100);
	double timetaken8 = 1000 * difftime(time(NULL), startTime1); // time + 0.7
	Sleep(100);
	double timetaken9 = 1000 * difftime(time(NULL), startTime1); // time + 0.8
	Sleep(100);
	double timetaken10 = 1000 * difftime(time(NULL), startTime1); // time + 0.9
	// ends the timers 100 milliseconds apart, which allows logic to be used to determine fractions of a second in the timer
	*/
	
	/*
	timetaken2 -= timetaken1;
	timetaken3 -= timetaken1;
	timetaken4 -= timetaken1;
	timetaken5 -= timetaken1;
	timetaken6 -= timetaken1;
	timetaken7 -= timetaken1;
	timetaken8 -= timetaken1;
	timetaken9 -= timetaken1;
	timetaken10 -= timetaken1;
	*/
	
	
	
	/*
	if (timetaken[2] == 1000) {
		timetaken[1] += 900;
	}
	else if (timetaken[3] == 1000) {
		timetaken[1] += 800;
	}
	else if (timetaken[4] == 1000) {
		timetaken[1] += 700;
	}
	else if (timetaken[5] == 1000) {
		timetaken[1] += 600;
	}
	else if (timetaken[6] == 1000) {
		timetaken[1] += 500;
	}
	else if (timetaken[7] == 1000) {
		timetaken[1] += 400;
	}
	else if (timetaken[8] == 1000) {
		timetaken[1] += 300;
	}
	else if (timetaken[9] == 1000) {
		timetaken[1] += 200;
	}
	else if (timetaken[10] == 1000) {
		timetaken[1] += 100;
	} // finds where the next second occurs and uses that data to determine fractions of seconds.
	*/
	
	/*
	printf("timetaken1 = %lf\n", timetaken1);
	printf("timetaken2 = %lf\n", timetaken2);
	printf("timetaken3 = %lf\n", timetaken3);
	printf("timetaken4 = %lf\n", timetaken4);
	printf("timetaken5 = %lf\n", timetaken5);
	printf("timetaken6 = %lf\n", timetaken6);
	printf("timetaken7 = %lf\n", timetaken7);
	printf("timetaken8 = %lf\n", timetaken8);
	printf("timetaken9 = %lf\n", timetaken9);
	printf("timetaken10 = %lf\n", timetaken10);
	
	// used for testing logic
	*/
	
	
	
/*----------------------------------------------------------------------------
-	                            Notes                                        -
-----------------------------------------------------------------------------*/
// Compile with gcc lab06.c -o lab06
// Run with ./ds4rd.exe -d 054c:05c4 -D DS4_BT -t -b | ./lab06

/*----------------------------------------------------------------------------
-								Implementation								 -
-----------------------------------------------------------------------------*/
double timeallowed = 2500.0;

int task(double* timeallotted);


int main(int argc, char *argv[])
{
    
	srand(time(NULL)); /* This will ensure a random game each time. */
	char startinitiate;
	int score = -1;
	int passfail = 1;

	
	printf("Bop-It!\n\n\n The game will give you a specific key to press which you must press within a certain time period. the game will start when you press any key.\n\n Please press any key: ");
	scanf("%c", &startinitiate); // start menu
	
	
	while (passfail == 1) {
		++score;
		passfail = task(&timeallowed);
	}
	
	printf("\nYour score was: %d\n", score);
	
	
    return 0;
}



int task(double* timeallotted) {
	char randkeypress = (char)(rand()%94+33); // sets a random key to press
	char keypress = ' ';
	
	
	
	time_t timestarter, startTime1;
	
	time(&timestarter);
	
	//printf("before time start\n");
	
	while (time(NULL) == timestarter) {
		Sleep(10);
		continue;
	} //starts the timer as soon as the next second passes.
	
	//printf("after time start\n");
	
	time(&startTime1); // starts time1 at 0 seconds
	
	printf("\nPress the '%c' key!\nYou have %lf milliseconds to respond!\n", randkeypress, *timeallotted); // tells user what they must do
		
	scanf(" %c", &keypress);
	
	double timetaken[11];
	
	for (int i = 1; i < 10; i++) {
		timetaken[i] = 1000 * difftime(time(NULL), startTime1);
		Sleep(100);
	}
	timetaken[10] = 1000 * difftime(time(NULL), startTime1);
	
	
	
	for (int i = 2; i < 11; ++i) {
		timetaken[i] -= timetaken[1];
	}
	
	int tempval = 900;
	for (int i = 2; i < 11; i++) {
		if (timetaken[i] == 1000) {
			timetaken[1] += tempval;
			break;
		}
		tempval = tempval - 100;
	} // uses logic to find within milliseconds
	
	
	
	
	//printf("timetaken1 = %lf", timetaken[1]); // used for testing purposes
	
	
	if (keypress == randkeypress) { // if the correct key was inputted continue
		if (*timeallotted >= timetaken[1]) { // if they inputted in the correct amount of time continue
			*timeallotted -= 100.0; // returns the time allowed minus 100 milliseconds
			return 1;//pass condition
		}
		else {
			printf("\nYou were too slow!\n");
			return 0;
		} // fail condition
	}
	else {
		printf("\nYour keypress was incorrect!\n");
		return 0; //fail condition
	} // checks to see if conditions were met to continue or not.
	
	
	
}







/* Put your functions here, and be sure to put prototypes above. */