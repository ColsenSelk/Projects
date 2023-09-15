#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <time.h>
#include <ctype.h>
#include <ncurses.h>
#include <unistd.h>
#include "mapgen.h"






int main(void) {
	initscr();
	//cbreak();
	noecho();
	start_color();
	
	int numtrainers = 10;
	srand( time(NULL) );
	
	doFirst();
	
	startProcedure();
	
	generateNSPath(-1, -1); // values in regular (not-testing) mode should be -1, -1
	generateWEPath(-1, -1); // values in regular (not-testing) mode should be -1, -1
	placePokeMC('C');
	placePokeMC('M');
	
	int i;
	for (i = 0; i < 9; i++) {
		generateClearing();
		generateTallGrass();
	}
	//for (i = 0; i < 7; i++) {
		//generateClearing();
	//}
	for (i = 0; i < 80; i++) {
		generateTree();
	}
	for (i = 0; i < 60; i++) {
		generateBoulder();
	}
	
	
	endProcedure();
	assignMap(199, 199);
	
	//person people[50];
	
	
	int sizePeople = 1;
	person* people = calloc(sizePeople, sizeof(person));
	
	
	/*
	for (i = 0; i < 50; i++) { //calloc automatically sets all values to 0 (NOTE: realloc doesn't)
		people[i].posX = 0;
		people[i].posY = 0;
	}
	*/
	
	
	//displayMapgrid2(199, 199, people);
	
	sizePeople = sizePeople + numtrainers;
	people = (person *) realloc(people, sizeof(person) * sizePeople);
	createTrainers(people, numtrainers, sizePeople - numtrainers);
	
	
	/*
	sizePeople = sizePeople + numtrainers;
	people = (person *) realloc(people, sizeof(person) * sizePeople);
	createTrainers(people, numtrainers, sizePeople - numtrainers);
	*/
	
	displayMapgrid2(199, 199, people);
	
	
	//printf("about to run movePlayersAlongPrioQueue\n"); // for testing
	int tempresult = 0;
	while (1 != tempresult) {
		tempresult = movePlayersAlongPrioQueue(people, &sizePeople, numtrainers);
	}

	
	//endwin();
}