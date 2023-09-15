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
	char randkeypress = (char)(rand()%58+65); // sets a random key to press
	char keypress = ' ';
	
	
	
	time_t timestarter, startTime1;
	
	time(&timestarter);
	
	//printf("before time start\n");
	
	while (time(NULL) == timestarter) {
		Sleep(10);
		continue;
	} //starts the timer as soon as the next second passes.
	
	//printf("after time start\n");
	for (int i = 65; i < 90; ++i) {
		printf("%d : %c           %d : %c\n", i, (char)(i), i + 32, (char)(i + 32));
	}
	time(&startTime1); // starts time1 at 0 seconds
	
	printf("\npress the '%d' key!\nyou have %lf milliseconds to respond!\n", (int)(randkeypress), *timeallotted); // tells user what they must do  changed randkeypress  to (int)(randkeypress) and %c to %d
		
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
	} // uses logic to find time within milliseconds
	
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