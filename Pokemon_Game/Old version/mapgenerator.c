#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <time.h>
#include <unistd.h>
#include <ctype.h>
#include <ncurses.h>
#include "mapgen.h"

maps mapgrid[399][399];

int amtTrainers = 0; // keeps track of the amount of trainers inside mapgenerator.c (including PC)

char map[21][80];

dijk distMap[21][80];
int queueX[100];
int queueY[100];

int currentLocX = 199;
int currentLocY = 199;
double d = 0.0; // distance from center.

void clearDistMap() {
	for (int j = 0; j < 80; j++) { // clears djik distMap
		for (int i = 0; i < 21; i++) {
			distMap[i][j].mapTile = '~';
			distMap[i][j].visited = 0;
			distMap[i][j].sPathLength = 0;
			distMap[i][j].pathTakenX = 0;
			distMap[i][j].pathTakenY = 0;
		}
	}
}

void findPacerPrioQueueRec(person *Pacer, int PacerElem, char direction, int posX, int posY) {
	if (direction == 'e') {
		if (mapgrid[(Pacer + PacerElem)->gridPosY][(Pacer + PacerElem)->gridPosX].map[posY][posX + 1] != '%' && mapgrid[(Pacer + PacerElem)->gridPosY][(Pacer + PacerElem)->gridPosX].map[posY][posX + 1] != '"' && mapgrid[(Pacer + PacerElem)->gridPosY][(Pacer + PacerElem)->gridPosX].map[posY - 1][posX] != 'M' && mapgrid[(Pacer + PacerElem)->gridPosY][(Pacer + PacerElem)->gridPosX].map[posY - 1][posX] != 'C') {
			for (int i = 98; i >= 0; i--) {
				if ((Pacer + PacerElem)->moveQueueX[i] == 0 || (Pacer + PacerElem)->moveQueueY[i] == 0) {
					continue;
				}
				
				(Pacer + PacerElem)->moveQueueX[i + 1] = Pacer[PacerElem].moveQueueX[i];
				(Pacer + PacerElem)->moveQueueY[i + 1] = Pacer[PacerElem].moveQueueY[i];
			}
			
			(Pacer + PacerElem)->moveQueueX[0] = posX + 1;
			(Pacer + PacerElem)->moveQueueY[0] = posY;
			
			
			
			findPacerPrioQueueRec(Pacer, PacerElem, direction, posX + 1, posY);
		}
	}
	else if (direction == 'w') {
		if (mapgrid[(Pacer + PacerElem)->gridPosY][(Pacer + PacerElem)->gridPosX].map[posY][posX - 1] != '%' && mapgrid[(Pacer + PacerElem)->gridPosY][(Pacer + PacerElem)->gridPosX].map[posY][posX - 1] != '"' && mapgrid[(Pacer + PacerElem)->gridPosY][(Pacer + PacerElem)->gridPosX].map[posY - 1][posX] != 'M' && mapgrid[(Pacer + PacerElem)->gridPosY][(Pacer + PacerElem)->gridPosX].map[posY - 1][posX] != 'C') {
			for (int i = 98; i >= 0; i--) {
				if ((Pacer + PacerElem)->moveQueueX[i] == 0 || (Pacer + PacerElem)->moveQueueY[i] == 0) {
					continue;
				}
				
				(Pacer + PacerElem)->moveQueueX[i + 1] = Pacer[PacerElem].moveQueueX[i];
				(Pacer + PacerElem)->moveQueueY[i + 1] = Pacer[PacerElem].moveQueueY[i];
			}
			
			(Pacer + PacerElem)->moveQueueX[0] = posX - 1;
			(Pacer + PacerElem)->moveQueueY[0] = posY;
			
			
			findPacerPrioQueueRec(Pacer, PacerElem, direction, posX - 1, posY);
		}
	}
}
void findPacerPrioQueue(person *Pacer, int PacerElem) {
	int tempint = rand() % 2;
	if (tempint == 0)
		findPacerPrioQueueRec(Pacer, PacerElem, 'e', Pacer[PacerElem].posX, Pacer[PacerElem].posY);
	else if (tempint == 1)
		findPacerPrioQueueRec(Pacer, PacerElem, 'w', Pacer[PacerElem].posX, Pacer[PacerElem].posY);
}

void findPacerPrioQueueRec2(person *Pacer, int PacerElem, char direction, int posX, int posY) { // North and South Movement
	if (direction == 'n') {
		if (mapgrid[(Pacer + PacerElem)->gridPosY][(Pacer + PacerElem)->gridPosX].map[posY - 1][posX] != '%' && mapgrid[(Pacer + PacerElem)->gridPosY][(Pacer + PacerElem)->gridPosX].map[posY - 1][posX] != '"' && mapgrid[(Pacer + PacerElem)->gridPosY][(Pacer + PacerElem)->gridPosX].map[posY - 1][posX] != 'M' && mapgrid[(Pacer + PacerElem)->gridPosY][(Pacer + PacerElem)->gridPosX].map[posY - 1][posX] != 'C') {
			for (int i = 98; i >= 0; i--) {
				if ((Pacer + PacerElem)->moveQueueX[i] == 0 || (Pacer + PacerElem)->moveQueueY[i] == 0) {
					continue;
				}
				
				(Pacer + PacerElem)->moveQueueX[i + 1] = Pacer[PacerElem].moveQueueX[i];
				(Pacer + PacerElem)->moveQueueY[i + 1] = Pacer[PacerElem].moveQueueY[i];
			}
			
			(Pacer + PacerElem)->moveQueueX[0] = posX;
			(Pacer + PacerElem)->moveQueueY[0] = posY - 1;
			
			
			
			findPacerPrioQueueRec2(Pacer, PacerElem, direction, posX, posY - 1);
		}
	}
	else if (direction == 's') {
		if (mapgrid[(Pacer + PacerElem)->gridPosY][(Pacer + PacerElem)->gridPosX].map[posY + 1][posX] != '%' && mapgrid[(Pacer + PacerElem)->gridPosY][(Pacer + PacerElem)->gridPosX].map[posY + 1][posX] != '"' && mapgrid[(Pacer + PacerElem)->gridPosY][(Pacer + PacerElem)->gridPosX].map[posY - 1][posX] != 'M' && mapgrid[(Pacer + PacerElem)->gridPosY][(Pacer + PacerElem)->gridPosX].map[posY - 1][posX] != 'C') {
			for (int i = 98; i >= 0; i--) {
				if ((Pacer + PacerElem)->moveQueueX[i] == 0 || (Pacer + PacerElem)->moveQueueY[i] == 0) {
					continue;
				}
				
				(Pacer + PacerElem)->moveQueueX[i + 1] = Pacer[PacerElem].moveQueueX[i];
				(Pacer + PacerElem)->moveQueueY[i + 1] = Pacer[PacerElem].moveQueueY[i];
			}
			
			(Pacer + PacerElem)->moveQueueX[0] = posX;
			(Pacer + PacerElem)->moveQueueY[0] = posY + 1;
			
			
			findPacerPrioQueueRec2(Pacer, PacerElem, direction, posX, posY + 1);
		}
	}
}
void findPacerPrioQueue2(person *Pacer, int PacerElem) {
	int tempint = rand() % 2;
	if (tempint == 0)
		findPacerPrioQueueRec2(Pacer, PacerElem, 'n', Pacer[PacerElem].posX, Pacer[PacerElem].posY);
	else if (tempint == 1)
		findPacerPrioQueueRec2(Pacer, PacerElem, 's', Pacer[PacerElem].posX, Pacer[PacerElem].posY);
}

void findRandWalkerPrioQueueRec(person *RandWalker, int RandWalkerElem, char direction, int posX, int posY) {
	if (direction == 'n') {
		if (mapgrid[(RandWalker + RandWalkerElem)->gridPosY][(RandWalker + RandWalkerElem)->gridPosX].map[posY - 1][posX] != '%' && mapgrid[(RandWalker + RandWalkerElem)->gridPosY][(RandWalker + RandWalkerElem)->gridPosX].map[posY - 1][posX] != '"' && mapgrid[(RandWalker + RandWalkerElem)->gridPosY][(RandWalker + RandWalkerElem)->gridPosX].map[posY - 1][posX] != 'M' && mapgrid[(RandWalker + RandWalkerElem)->gridPosY][(RandWalker + RandWalkerElem)->gridPosX].map[posY - 1][posX] != 'C') {
			for (int i = 98; i >= 0; i--) {
				if ((RandWalker + RandWalkerElem)->moveQueueX[i] == 0 || (RandWalker + RandWalkerElem)->moveQueueY[i] == 0) {
					continue;
				}
				
				(RandWalker + RandWalkerElem)->moveQueueX[i + 1] = RandWalker[RandWalkerElem].moveQueueX[i];
				(RandWalker + RandWalkerElem)->moveQueueY[i + 1] = RandWalker[RandWalkerElem].moveQueueY[i];
			}
			
			
			(RandWalker + RandWalkerElem)->moveQueueX[0] = posX;
			(RandWalker + RandWalkerElem)->moveQueueY[0] = posY - 1;
			
			
			findRandWalkerPrioQueueRec(RandWalker, RandWalkerElem, direction, posX, posY - 1);
		}
	}
	else if (direction == 's') {
		if (mapgrid[(RandWalker + RandWalkerElem)->gridPosY][(RandWalker + RandWalkerElem)->gridPosX].map[posY + 1][posX] != '%' && mapgrid[(RandWalker + RandWalkerElem)->gridPosY][(RandWalker + RandWalkerElem)->gridPosX].map[posY + 1][posX] != '"' && mapgrid[(RandWalker + RandWalkerElem)->gridPosY][(RandWalker + RandWalkerElem)->gridPosX].map[posY + 1][posX] != 'M' && mapgrid[(RandWalker + RandWalkerElem)->gridPosY][(RandWalker + RandWalkerElem)->gridPosX].map[posY + 1][posX] != 'C') {
			for (int i = 98; i >= 0; i--) {
				if ((RandWalker + RandWalkerElem)->moveQueueX[i] == 0 || (RandWalker + RandWalkerElem)->moveQueueY[i] == 0) {
					continue;
				}
				
				(RandWalker + RandWalkerElem)->moveQueueX[i + 1] = RandWalker[RandWalkerElem].moveQueueX[i];
				(RandWalker + RandWalkerElem)->moveQueueY[i + 1] = RandWalker[RandWalkerElem].moveQueueY[i];
			}
			
			
			(RandWalker + RandWalkerElem)->moveQueueX[0] = posX;
			(RandWalker + RandWalkerElem)->moveQueueY[0] = posY + 1;
			
			
			findRandWalkerPrioQueueRec(RandWalker, RandWalkerElem, direction, posX, posY + 1);
		}
	}
	else if (direction == 'e') {
		if (mapgrid[(RandWalker + RandWalkerElem)->gridPosY][(RandWalker + RandWalkerElem)->gridPosX].map[posY][posX + 1] != '%' && mapgrid[(RandWalker + RandWalkerElem)->gridPosY][(RandWalker + RandWalkerElem)->gridPosX].map[posY][posX + 1] != '"' && mapgrid[(RandWalker + RandWalkerElem)->gridPosY][(RandWalker + RandWalkerElem)->gridPosX].map[posY][posX + 1] != 'M' && mapgrid[(RandWalker + RandWalkerElem)->gridPosY][(RandWalker + RandWalkerElem)->gridPosX].map[posY][posX + 1] != 'C') {
			
			for (int i = 98; i >= 0; i--) {
				if ((RandWalker + RandWalkerElem)->moveQueueX[i] == 0 || (RandWalker + RandWalkerElem)->moveQueueY[i] == 0) {
					continue;
				}
				
				(RandWalker + RandWalkerElem)->moveQueueX[i + 1] = RandWalker[RandWalkerElem].moveQueueX[i];
				(RandWalker + RandWalkerElem)->moveQueueY[i + 1] = RandWalker[RandWalkerElem].moveQueueY[i];
			}
			
			(RandWalker + RandWalkerElem)->moveQueueX[0] = posX + 1;
			(RandWalker + RandWalkerElem)->moveQueueY[0] = posY;
			
			
			findRandWalkerPrioQueueRec(RandWalker, RandWalkerElem, direction, posX + 1, posY);
		}
	}
	else if (direction == 'w') {
		if (mapgrid[(RandWalker + RandWalkerElem)->gridPosY][(RandWalker + RandWalkerElem)->gridPosX].map[posY][posX - 1] != '%' && mapgrid[(RandWalker + RandWalkerElem)->gridPosY][(RandWalker + RandWalkerElem)->gridPosX].map[posY][posX - 1] != '"' && mapgrid[(RandWalker + RandWalkerElem)->gridPosY][(RandWalker + RandWalkerElem)->gridPosX].map[posY][posX - 1] != 'M' && mapgrid[(RandWalker + RandWalkerElem)->gridPosY][(RandWalker + RandWalkerElem)->gridPosX].map[posY][posX - 1] != 'C') {
			
			for (int i = 98; i >= 0; i--) {
				if ((RandWalker + RandWalkerElem)->moveQueueX[i] == 0 || (RandWalker + RandWalkerElem)->moveQueueY[i] == 0) {
					continue;
				}
				
				(RandWalker + RandWalkerElem)->moveQueueX[i + 1] = RandWalker[RandWalkerElem].moveQueueX[i];
				(RandWalker + RandWalkerElem)->moveQueueY[i + 1] = RandWalker[RandWalkerElem].moveQueueY[i];
			}
			
			(RandWalker + RandWalkerElem)->moveQueueX[0] = posX - 1;
			(RandWalker + RandWalkerElem)->moveQueueY[0] = posY;
			
			
			findRandWalkerPrioQueueRec(RandWalker, RandWalkerElem, direction, posX - 1, posY);
		}
	}
}
void findRandWalkerPrioQueue(person *RandWalker, int RandWalkerElem) {
	int tempint = rand() % 4;
	for (int j = 0; j < 100; j++) { // clears moveQueue
		if (RandWalker[RandWalkerElem].moveQueueX[j] == 0 && RandWalker[RandWalkerElem].moveQueueY[j] == 0) {
			break;
		}
		RandWalker[RandWalkerElem].moveQueueX[j] = 0;
		RandWalker[RandWalkerElem].moveQueueY[j] = 0;
	}
	if (tempint == 0)
		findRandWalkerPrioQueueRec(RandWalker, RandWalkerElem, 'n', RandWalker[RandWalkerElem].posX, RandWalker[RandWalkerElem].posY);
	else if (tempint == 1)
		findRandWalkerPrioQueueRec(RandWalker, RandWalkerElem, 's', RandWalker[RandWalkerElem].posX, RandWalker[RandWalkerElem].posY);
	else if (tempint == 2)
		findRandWalkerPrioQueueRec(RandWalker, RandWalkerElem, 'e', RandWalker[RandWalkerElem].posX, RandWalker[RandWalkerElem].posY);
	else if (tempint == 3)
		findRandWalkerPrioQueueRec(RandWalker, RandWalkerElem, 'w', RandWalker[RandWalkerElem].posX, RandWalker[RandWalkerElem].posY);
}

void findWandererPrioQueueRec(person *Wanderer, int WandererElem, char direction, int posX, int posY) {
	if (direction == 'n') {
		if (mapgrid[Wanderer[WandererElem].gridPosY][Wanderer[WandererElem].gridPosX].map[posY - 1][posX] == mapgrid[Wanderer[WandererElem].gridPosY][Wanderer[WandererElem].gridPosX].map[posY][posX]) {
			for (int i = 98; i >= 0; i--) {
				if ((Wanderer + WandererElem)->moveQueueX[i] == 0 || (Wanderer + WandererElem)->moveQueueY[i] == 0) {
					continue;
				}
				
				(Wanderer + WandererElem)->moveQueueX[i + 1] = Wanderer[WandererElem].moveQueueX[i];
				(Wanderer + WandererElem)->moveQueueY[i + 1] = Wanderer[WandererElem].moveQueueY[i];
			}
			
			(Wanderer + WandererElem)->moveQueueX[0] = posX;
			(Wanderer + WandererElem)->moveQueueY[0] = posY - 1;
			
			
			findWandererPrioQueueRec(Wanderer, WandererElem, direction, posX, posY - 1);
		}
	}
	else if (direction == 's') {
		if (mapgrid[Wanderer[WandererElem].gridPosY][Wanderer[WandererElem].gridPosX].map[posY + 1][posX] == mapgrid[Wanderer[WandererElem].gridPosY][Wanderer[WandererElem].gridPosX].map[posY][posX]) {
			for (int i = 98; i >= 0; i--) {
				if ((Wanderer + WandererElem)->moveQueueX[i] == 0 || (Wanderer + WandererElem)->moveQueueY[i] == 0) {
					continue;
				}
				
				(Wanderer + WandererElem)->moveQueueX[i + 1] = Wanderer[WandererElem].moveQueueX[i];
				(Wanderer + WandererElem)->moveQueueY[i + 1] = Wanderer[WandererElem].moveQueueY[i];
			}
			
			(Wanderer + WandererElem)->moveQueueX[0] = posX;
			(Wanderer + WandererElem)->moveQueueY[0] = posY + 1;
			
			
			findWandererPrioQueueRec(Wanderer, WandererElem, direction, posX, posY + 1);
		}
	}
	else if (direction == 'e') {
		if (mapgrid[Wanderer[WandererElem].gridPosY][Wanderer[WandererElem].gridPosX].map[posY][posX + 1] == mapgrid[Wanderer[WandererElem].gridPosY][Wanderer[WandererElem].gridPosX].map[posY][posX]) {
			for (int i = 98; i >= 0; i--) {
				if ((Wanderer + WandererElem)->moveQueueX[i] == 0 || (Wanderer + WandererElem)->moveQueueY[i] == 0) {
					continue;
				}
				
				(Wanderer + WandererElem)->moveQueueX[i + 1] = Wanderer[WandererElem].moveQueueX[i];
				(Wanderer + WandererElem)->moveQueueY[i + 1] = Wanderer[WandererElem].moveQueueY[i];
			}
			
			(Wanderer + WandererElem)->moveQueueX[0] = posX + 1;
			(Wanderer + WandererElem)->moveQueueY[0] = posY;
			
			
			findWandererPrioQueueRec(Wanderer, WandererElem, direction, posX + 1, posY);
		}
	}
	else if (direction == 'w') {
		if (mapgrid[Wanderer[WandererElem].gridPosY][Wanderer[WandererElem].gridPosX].map[posY][posX - 1] == mapgrid[Wanderer[WandererElem].gridPosY][Wanderer[WandererElem].gridPosX].map[posY][posX]) {
			for (int i = 98; i >= 0; i--) {
				if ((Wanderer + WandererElem)->moveQueueX[i] == 0 || (Wanderer + WandererElem)->moveQueueY[i] == 0) {
					continue;
				}
				
				(Wanderer + WandererElem)->moveQueueX[i + 1] = Wanderer[WandererElem].moveQueueX[i];
				(Wanderer + WandererElem)->moveQueueY[i + 1] = Wanderer[WandererElem].moveQueueY[i];
			}
			
			(Wanderer + WandererElem)->moveQueueX[0] = posX - 1;
			(Wanderer + WandererElem)->moveQueueY[0] = posY;
			
			
			findWandererPrioQueueRec(Wanderer, WandererElem, direction, posX - 1, posY);
		}
	}
}
void findWandererPrioQueue(person *Wanderer, int WandererElem) {
	int tempint = rand() % 4;
	if (tempint == 0)
		findWandererPrioQueueRec(Wanderer, WandererElem, 'n', Wanderer[WandererElem].posX, Wanderer[WandererElem].posY);
	else if (tempint == 1)
		findWandererPrioQueueRec(Wanderer, WandererElem, 's', Wanderer[WandererElem].posX, Wanderer[WandererElem].posY);
	else if (tempint == 2)
		findWandererPrioQueueRec(Wanderer, WandererElem, 'e', Wanderer[WandererElem].posX, Wanderer[WandererElem].posY);
	else if (tempint == 3)
		findWandererPrioQueueRec(Wanderer, WandererElem, 'w', Wanderer[WandererElem].posX, Wanderer[WandererElem].posY);
}



void findShortestPathRec(int currX, int currY, int endX, int endY, char charType) {
	//printf("Running Rec at (%d, %d)\n", currX, currY); // for testing
	
	/*
	  NOTES:
		  if currentD is greater than 90, end.
			
		  attempt moves in all 8 directions
			
			  if a move is at the end position and it's been visited, check to see if currentD is less than the sPathLength of the end tile. if it is then set the pathTaken to be endPositions pathTaken. Do not recursively call.
			  else if a move is at the end position and it's not been visited, set the pathTaken to be endPositions pathTaken. set end position's tile to visited. Do not recursively call.
			
			  else if a move is onto a boulder or tree, or charType is 'H' or 'R' (hiker or rival) and a move is into a pokeCenter/Mart, do not execute the move. (do not recursively call)
			  else if a move is onto a path or clearing, the tile that will be moved to is visited, and the tile that will be moved to has a sPathLength larger than currentD + 10 then set the tile that will be moved to's sPathLength to currentD + 10, and recursively call on that tile.
			  else if a move is onto a path or clearing, the tile that will be moved to is not visited, set that tile that will be moved to's sPathLength to be currentD + 10, and set that tile as visited.
			
			
			  else if a move is onto tall grass and charType is 'H' (Hiker), the tile that will be moved to is visited, and the tile that will be moved to has a sPathLength larger than currentD + 15 then set the tile that will be moved to's sPathLength to currentD + 15, and set it to visited, and recursively call on that tile.
			  else if a move is onto tall grass and charType is 'H' (Hiker), the tile that will be moved to is not visited, set that tile that will be moved to's sPathLength to be currentD + 15, and set that tile as visited. (recursively call)
			
			  else if a move is onto tall grass, the tile that will be moved to is visited, and the tile that will be moved to has a sPathLength larger than currentD + 20 then set the tile that will be moved to's sPathLength to currentD + 20, and set it to visited, and recursively call on that tile.
			  else if a move is onto tall grass, the tile that will be moved to is not visited, set that tile that will be moved to's sPathLength to be currentD + 20, and set that tile as visited. (recursively call)
	*/
	
	if (distMap[currY][currX].sPathLength > 2000) {
		puts("Path length is really big for some reason\n");
		return;
	}
	if (distMap[currY][currX].sPathLength >= distMap[endY][endX].sPathLength && distMap[endY][endX].visited == 1) {
		//puts("To big, stopping. (Not a concern: seeing this means the algorithm is stopping unnecessary code from running)\n"); // for testing purposes (note: at current moment this function is not being executed before segmentation fault, meaning it is happening earlier)
		return;
	}
	
	//Moves
	for (int i = -1; i <= 1; i++) {
		for (int j = -1; j <= 1; j++) {
			if (i == 0 && j == 0) {
				continue;
			}
			if (currX + i < 0 || currX + i > 79 || currY + j < 0 || currY + j > 20) {
				continue;
			}
			if (currX + i == endX && currY + j == endY && distMap[currY + j][currX + i].visited == 1) { // for if a move is at the end position and it's been visited
				int k = 1000;
				if (distMap[currY + j][currX + i].mapTile == '.' || distMap[currY + j][currX + i].mapTile == '#') {
					k = 10;
				}
				else if (distMap[currY + j][currX + i].mapTile == ',' && charType == 'H') {
					k = 15;
				}
				else if (distMap[currY + j][currX + i].mapTile == ',') {
					k = 20;
				}
				else if ((distMap[currY + j][currX + i].mapTile == 'M' || distMap[currY + j][currX + i].mapTile == 'C') && charType == '@') {
					k = 10;
				}
				
				if (distMap[currY][currX].sPathLength + k < distMap[currY + j][currX + i].sPathLength) {
					
					// assigns the next nodes' previous (current node) node, hopefully creating a node pathway back to the start
					distMap[currY + j][currX + i].pathTakenX = currX; 
					distMap[currY + j][currX + i].pathTakenY = currY;
					
					distMap[currY + j][currX + i].sPathLength = distMap[currY][currX].sPathLength + k;
				}
			}
			else if (currX + i == endX && currY + j == endY && distMap[currY + j][currX + i].visited == 0) { // for if a move is at the end position and it's not been visited
				int k = 1000;
				if (distMap[currY + j][currX + i].mapTile == '.' || distMap[currY + j][currX + i].mapTile == '#') {
					k = 10;
				}
				else if (distMap[currY + j][currX + i].mapTile == ',' && charType == 'H') {
					k = 15;
				}
				else if (distMap[currY + j][currX + i].mapTile == ',') {
					k = 20;
				}
				else if ((distMap[currY + j][currX + i].mapTile == 'M' || distMap[currY + j][currX + i].mapTile == 'C') && charType == '@') {
					k = 10;
				}
				else {
					printf("if you see this it not good! (%d, %d) Type: %c\n", currX + i, currY + j, distMap[currY + j][currX + i].mapTile); // for testing
				}
				
				
				// assigns the next nodes' previous (current node) node, hopefully creating a node pathway back to the start
				distMap[currY + j][currX + i].pathTakenX = currX; 
				distMap[currY + j][currX + i].pathTakenY = currY;
				
				distMap[currY + j][currX + i].visited = 1;
				distMap[currY + j][currX + i].sPathLength = distMap[currY][currX].sPathLength + k;
			}
			else if (distMap[currY + j][currX + i].mapTile == '%' || distMap[currY + j][currX + i].mapTile == '"' || ((charType == 'H' || charType == 'R') && (distMap[currY + j][currX + i].mapTile == 'M' || distMap[currY + j][currX + i].mapTile == 'C'))) {
				// do nothing
			}
			else if ((distMap[currY + j][currX + i].mapTile == '.' || distMap[currY + j][currX + i].mapTile == '#') && distMap[currY + j][currX + i].visited == 1 && distMap[currY + j][currX + i].sPathLength > distMap[currY][currX].sPathLength + 10) {
				distMap[currY + j][currX + i].sPathLength = distMap[currY][currX].sPathLength + 10;
				for (int l = 0; l < 100; l++) { // place (currY + j) into queueY and currX into queueX
					if (queueX[l] == 0 && queueY[l] == 0) {
						queueY[l] = currY + j;
						queueX[l] = currX + i;
						//printf("Placed into queueX[%d] and queueY[%d]\n", l, l); // for testing
						break;
					}
				}
			
				
				// assigns the next nodes' previous (current node) node, hopefully creating a node pathway back to the start
				distMap[currY + j][currX + i].pathTakenX = currX; 
				distMap[currY + j][currX + i].pathTakenY = currY;
			}
			else if ((distMap[currY + j][currX + i].mapTile == '.' || distMap[currY + j][currX + i].mapTile == '#') && distMap[currY + j][currX + i].visited == 0) {
				distMap[currY + j][currX + i].sPathLength = distMap[currY][currX].sPathLength + 10;
				distMap[currY + j][currX + i].visited = 1;
				for (int l = 0; l < 100; l++) { // place (currY + j) into queueY and currX into queueX
					if (queueX[l] == 0 && queueY[l] == 0) {
						queueY[l] = currY + j;
						queueX[l] = currX + i;
						//printf("Placed into queueX[%d] and queueY[%d]\n", l, l); // for testing
						break;
					}
				}
				
				// assigns the next nodes' previous (current node) node, hopefully creating a node pathway back to the start
				distMap[currY + j][currX + i].pathTakenX = currX; 
				distMap[currY + j][currX + i].pathTakenY = currY;
			}
			else if (distMap[currY + j][currX + i].mapTile == '.' && charType == 'H' && distMap[currY + j][currX + i].visited == 1 && distMap[currY + j][currX + i].sPathLength > distMap[currY][currX].sPathLength + 15) {
				distMap[currY + j][currX + i].sPathLength = distMap[currY][currX].sPathLength + 15;
				for (int l = 0; l < 100; l++) { // place (currY + j) into queueY and currX into queueX
					if (queueX[l] == 0 && queueY[l] == 0) {
						queueY[l] = currY + j;
						queueX[l] = currX + i;
						//printf("Placed into queueX[%d] and queueY[%d]\n", l, l); // for testing
						break;
					}
				}
				
				
				// assigns the next nodes' previous (current node) node, hopefully creating a node pathway back to the start
				distMap[currY + j][currX + i].pathTakenX = currX; 
				distMap[currY + j][currX + i].pathTakenY = currY;
			}
			else if (distMap[currY + j][currX + i].mapTile == ',' && charType == 'H' && distMap[currY + j][currX + i].visited == 0) {
				distMap[currY + j][currX + i].sPathLength = distMap[currY][currX].sPathLength + 15;
				distMap[currY + j][currX + i].visited = 1;
				for (int l = 0; l < 100; l++) { // place (currY + j) into queueY and currX into queueX
					if (queueX[l] == 0 && queueY[l] == 0) {
						queueY[l] = currY + j;
						queueX[l] = currX + i;
						//printf("Placed into queueX[%d] and queueY[%d]\n", l, l); // for testing
						break;
					}
				}
				
				
				// assigns the next nodes' previous (current node) node, hopefully creating a node pathway back to the start
				distMap[currY + j][currX + i].pathTakenX = currX; 
				distMap[currY + j][currX + i].pathTakenY = currY;
			}
			else if (distMap[currY + j][currX + i].mapTile == ',' && distMap[currY + j][currX + i].visited == 1 && distMap[currY + j][currX + i].sPathLength > distMap[currY][currX].sPathLength + 20) {
				distMap[currY + j][currX + i].sPathLength = distMap[currY][currX].sPathLength + 20;
				for (int l = 0; l < 100; l++) { // place (currY + j) into queueY and currX into queueX
					if (queueX[l] == 0 && queueY[l] == 0) {
						queueY[l] = currY + j;
						queueX[l] = currX + i;
						//printf("Placed into queueX[%d] and queueY[%d]\n", l, l); // for testing
						break;
					}
				}
				
				
				// assigns the next nodes' previous (current node) node, hopefully creating a node pathway back to the start
				distMap[currY + j][currX + i].pathTakenX = currX; 
				distMap[currY + j][currX + i].pathTakenY = currY;
			}
			else if (distMap[currY + j][currX + i].mapTile == ',' && distMap[currY + j][currX + i].visited == 0) {
				distMap[currY + j][currX + i].sPathLength = distMap[currY][currX].sPathLength + 20;
				distMap[currY + j][currX + i].visited = 1;
				for (int l = 0; l < 100; l++) { // place (currY + j) into queueY and currX into queueX
					if (queueX[l] == 0 && queueY[l] == 0) {
						queueY[l] = currY + j;
						queueX[l] = currX + i;
						//printf("Placed into queueX[%d] and queueY[%d]\n", l, l); // for testing
						break;
					}
				}
				
				
				// assigns the next nodes' previous (current node) node, hopefully creating a node pathway back to the start
				distMap[currY + j][currX + i].pathTakenX = currX; 
				distMap[currY + j][currX + i].pathTakenY = currY;
			}
		}
	}
	
}
	
void findShortestPath(int startX, int startY, int endX, int endY, int gridLocX, int gridLocY, person *Pers, int PersElem) {
	clearDistMap();
	
	distMap[startY][startX].visited = 1; // sets start location to be visited so the algorithm doesn't head back to itself
	
	for (int i = 0; i < 100; i++) { // sets all queue to zero (there were issues where the queue would have values like -2143916944
		queueX[i] = 0;
		queueY[i] = 0;
	}
	
	
	if (mapgrid[gridLocY][gridLocX].map[0][0] == '%') { // copys information from the map at gridLocX and gridLocY and place into djik distMap.mapTile's
		for (int j = 0; j < 80; j++) {
			for (int i = 0; i < 21; i++) {
				distMap[i][j].mapTile = mapgrid[gridLocY][gridLocX].map[i][j];
			}
		}
	}
	else { // condition for if not already generated.
		int tempX = currentLocX;
		int tempY = currentLocY;
		flyTo(gridLocX, gridLocY);
		flyTo(tempX, tempY);
		for (int j = 0; j < 80; j++) {
			for (int i = 0; i < 21; i++) {
				distMap[i][j].mapTile = mapgrid[gridLocY][gridLocX].map[i][j];
			}
		}
	}
	
	
	
	// TODO: pass information into findShortestPathRec
	int tempQueueX[100];
	int tempQueueY[100];
	for (int i = 0; i < 100; i++) { // sets all tempqueue to zero (there were issues where the queue would have values like -2143916944)
		tempQueueX[i] = 0;
		tempQueueY[i] = 0;
	}
	findShortestPathRec(startX, startY, endX, endY, Pers[PersElem].charType);
	while (1 == 1) {
		if (queueX[0] == 0 && queueY[0] == 0) {
			break;
		}
		
		
		for (int i = 0; i < 100; i++) {
			if (queueX[i] == 0 && queueY[i] == 0) {
				break;
			}
			// copies queue
			tempQueueX[i] = queueX[i];
			tempQueueY[i] = queueY[i];
			//printf("(%d, %d), ", tempQueueX[i], tempQueueY[i]); // for testing
			
			// clears queue
			queueX[i] = 0;
			queueY[i] = 0;
		}
		//puts("\ncopied and cleared queue\n"); // for testing
		
		
		for (int i = 0; i < 100; i++) {
			if (tempQueueX[i] == 0 && tempQueueY[i] == 0) {
				break;
			}
			//printf("Rec run number: %d\n", i + 1); // for testing
			findShortestPathRec(tempQueueX[i], tempQueueY[i], endX, endY, Pers[PersElem].charType);
		}
		//puts("Finished this rec call\n");
		for (int i = 0; i < 100; i++) {
			if (tempQueueX[i] == 0 && tempQueueY[i] == 0) {
				break;
			}
			//printf("(%d, %d), ", tempQueueX[i], tempQueueY[i]); // for testing
			// clears tempqueue
			tempQueueX[i] = 0;
			tempQueueY[i] = 0;
			
		}
		//puts("\ncleared tempqueue\n"); // for testing
	}
	
	for (int i = 0; i < 100; i++) {
		Pers[PersElem].moveQueueX[i] = 0;
		Pers[PersElem].moveQueueY[i] = 0;
	}
	
	int tempCounter = 0;
	distMap[startY][startX].pathTakenX = 0;
	distMap[startY][startX].pathTakenY = 0;
	//displayMapgrid(gridLocX, gridLocX); // for testing
	Pers[PersElem].moveQueueX[tempCounter] = endX;
	Pers[PersElem].moveQueueY[tempCounter] = endY;
	++tempCounter;
	//printf("Shortest path (going backwards -- from end to start):\n(%d, %d) ", endX, endY); // for testing
	//mapgrid[gridLocY][gridLocX].map[endY][endX] = Pers[PersElem].charType; // for testing. shows path taken.
	int prevPathX = endX;
	int prevPathY = endY;
	while (1 == 1) {
		
		int tempPX = prevPathX;
		prevPathX = distMap[prevPathY][tempPX].pathTakenX;
		prevPathY = distMap[prevPathY][tempPX].pathTakenY;
		
		if(prevPathX == 0 && prevPathY == 0) {
			Pers[PersElem].moveQueueX[tempCounter - 1] = 0;
			Pers[PersElem].moveQueueY[tempCounter - 1] = 0; // sets last element in movequeue to not exist because the Rival/Hikers' position is already there
			break;
		}
		
		//printf("(%d, %d) ", prevPathX, prevPathY); // for testing
		
		// sets persons' movequeue
		Pers[PersElem].moveQueueX[tempCounter] = prevPathX;
		Pers[PersElem].moveQueueY[tempCounter] = prevPathY;
		++tempCounter;
		
		//mapgrid[gridLocY][gridLocX].map[prevPathY][prevPathX] = Pers.charType; // for testing. shows path taken.
	}
	//puts("\n"); // for testing
	
	//puts("finished!\n"); // for testing
	
	/*
	printf("distance (all distances divided by 10, NA means the computer is unable to move to that spot,\nor has found it redundant to move to that spot) map:\n");
	for (int i = 0; i < 21; i++) { // displays distance in map form (for testing)
		for (int j = 0; j < 80; j++) {
			if (distMap[i][j].sPathLength == 0 && !(startX == j && startY == i)) {
				printf("NA ");
			}
			else {
				printf("%.2d ", distMap[i][j].sPathLength / 10);
			}
		}
		printf("\n");
	}
	printf("\nVisualization of the path the Rival will take:\n"); // for testing
	*/
	
	
	clearDistMap();
}

void assignMap(int i, int j) {
	memcpy(mapgrid[i][j].map, map, sizeof(mapgrid[i][j].map));
	startProcedure();
}

void doFirst() {
	srand( time(NULL) );
}
	
void flyTo(int X, int Y) {
	if (X == currentLocX && Y == currentLocY) {
		return;
	}
	if (mapgrid[Y][X].map[0][0] == '%') {
		if (map[1][1] != '~')
			assignMap(currentLocY, currentLocX);
		currentLocY = Y;
		currentLocX = X;
		displayMapgrid(currentLocY, currentLocX);
		return;
	}
	
	/*
	if (currentLocY == 0) {
		puts("cannot move further north.");
		return;
	}
	*/
	if (map[1][1] != '~')
		assignMap(currentLocY, currentLocX);
	currentLocY = Y;
	currentLocX = X;
	
	d = sqrt(pow(abs(currentLocX - 199), 2) + pow(abs(currentLocY - 199), 2));
	// printf("%.2f\n", d);
	
	int tempNexit;
	int tempSexit;
	int tempWexit;
	int tempEexit;
	
	if (mapgrid[currentLocY][currentLocX].Nexit == 0)
		tempNexit = -1;
	else
		tempNexit = mapgrid[currentLocY][currentLocX].Nexit;
	if (mapgrid[currentLocY][currentLocX].Sexit == 0)
		tempSexit = -1;
	else
		tempSexit = mapgrid[currentLocY][currentLocX].Sexit;
	if (mapgrid[currentLocY][currentLocX].Eexit == 0)
		tempEexit = -1;
	else
		tempEexit = mapgrid[currentLocY][currentLocX].Eexit;
	if (mapgrid[currentLocY][currentLocX].Wexit == 0)
		tempWexit = -1;
	else
		tempWexit = mapgrid[currentLocY][currentLocX].Wexit;
	
	generateNSPath(tempNexit, tempSexit);
	generateWEPath(tempWexit, tempEexit);
	double chance;
	if (d <= 200) {
		chance = 50.0 - (45.0 * (d / 200.0));
	}
	else {
		chance = 5.0;
	}
	// printf("%.2f\n", chance);
	if (((int) chance) > rand() % 100) {
		placePokeMC('C');
	}
	if (((int) chance) > rand() % 100) {
		placePokeMC('M');
	}
	
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
	
	displayMap();
	
	
	
}
	
void moveNorth() {
	printw("running moveNorth\n"); // for testing
	//refresh(); // for testing
	//usleep(3); // for testing
	//usleep(3); // for testing
	//usleep(3); // for testing
	//usleep(3); // for testing
	//usleep(3); // for testing
	if (mapgrid[currentLocY - 1][currentLocX].map[0][0] == '%') {
		//printw("map already generated\n"); // for testing
		refresh();
		if (map[1][1] != '~')
			assignMap(currentLocY, currentLocX);
		--currentLocY;
		//displayMapgrid(currentLocY, currentLocX);
		return;
	}
	
	if (currentLocY == 0) {
		puts("cannot move further north.");
		return;
	}
	if (map[1][1] != '~') {
		printw("running assignMap for map[1][1] != '~'\n"); // for testing
		assignMap(currentLocY, currentLocX);
	}
	--currentLocY;
	
	d = sqrt(pow(abs(currentLocX - 199), 2) + pow(abs(currentLocY - 199), 2));
	
	int tempNexit;
	int tempSexit;
	int tempWexit;
	int tempEexit;
	
	if (mapgrid[currentLocY][currentLocX].Nexit == 0)
		tempNexit = -1;
	else
		tempNexit = mapgrid[currentLocY][currentLocX].Nexit;
	if (mapgrid[currentLocY][currentLocX].Sexit == 0)
		tempSexit = -1;
	else
		tempSexit = mapgrid[currentLocY][currentLocX].Sexit;
	if (mapgrid[currentLocY][currentLocX].Eexit == 0)
		tempEexit = -1;
	else
		tempEexit = mapgrid[currentLocY][currentLocX].Eexit;
	if (mapgrid[currentLocY][currentLocX].Wexit == 0)
		tempWexit = -1;
	else
		tempWexit = mapgrid[currentLocY][currentLocX].Wexit;
	
	generateNSPath(tempNexit, tempSexit);
	generateWEPath(tempWexit, tempEexit);
	double chance;
	if (d <= 200) {
		chance = 50.0 - (45.0 * (d / 200.0));
	}
	else {
		chance = 5.0;
	}
	// printf("%d\n", (int) chance);
	if (((int) chance) > rand() % 100) {
		placePokeMC('C');
	}
	if (((int) chance) > rand() % 100) {
		placePokeMC('M');
	}
	
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
	
	printw("map (1, 1): %c \n", map[1][1]);
	
	//assignMap(currentLocY, currentLocX);
	memcpy(mapgrid[currentLocY][currentLocX].map, map, sizeof(mapgrid[currentLocY][currentLocX].map)); // takes map contents and copies it to mapgrid
	
	printw("finished moving north\n"); // for testing
	refresh(); // for testing
	
	
	
	//displayMap();
	
	
}

void moveSouth() {
	
	if (mapgrid[currentLocY + 1][currentLocX].map[0][0] == '%') {
		if (map[1][1] != '~')
			assignMap(currentLocY, currentLocX);
		++currentLocY;
		displayMapgrid(currentLocY, currentLocX);
		return;
	}
		
	
	if (currentLocY == 398) {
		puts("cannot move further south.");
		return;
	}
	if (map[1][1] != '~')
		assignMap(currentLocY, currentLocX);
	++currentLocY;
	
	d = sqrt(pow(abs(currentLocX - 199), 2) + pow(abs(currentLocY - 199), 2));
	
	int tempNexit;
	int tempSexit;
	int tempWexit;
	int tempEexit;
	
	if (mapgrid[currentLocY][currentLocX].Nexit == 0)
		tempNexit = -1;
	else
		tempNexit = mapgrid[currentLocY][currentLocX].Nexit;
	if (mapgrid[currentLocY][currentLocX].Sexit == 0)
		tempSexit = -1;
	else
		tempSexit = mapgrid[currentLocY][currentLocX].Sexit;
	if (mapgrid[currentLocY][currentLocX].Eexit == 0)
		tempEexit = -1;
	else
		tempEexit = mapgrid[currentLocY][currentLocX].Eexit;
	if (mapgrid[currentLocY][currentLocX].Wexit == 0)
		tempWexit = -1;
	else
		tempWexit = mapgrid[currentLocY][currentLocX].Wexit;
	
	generateNSPath(tempNexit, tempSexit);
	generateWEPath(tempWexit, tempEexit);
	double chance;
	if (d <= 200) {
		chance = 50.0 - (45.0 * (d / 200.0));
	}
	else {
		chance = 5.0;
	}
	if (((int) chance) > rand() % 100) {
		placePokeMC('C');
	}
	if (((int) chance) > rand() % 100) {
		placePokeMC('M');
	}
	
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
	
	displayMap();
	
	
	
}

void moveWest() {
	if (mapgrid[currentLocY][currentLocX - 1].map[0][0] == '%') {
		if (map[1][1] != '~')
			assignMap(currentLocY, currentLocX);
		--currentLocX;
		displayMapgrid(currentLocY, currentLocX);
		return;
	}
	
	if (currentLocY == 0) {
		puts("cannot move further west.");
		return;
	}
	if (map[1][1] != '~')
		assignMap(currentLocY, currentLocX);
	--currentLocX;
	
	d = sqrt(pow(abs(currentLocX - 199), 2) + pow(abs(currentLocY - 199), 2));
	
	int tempNexit;
	int tempSexit;
	int tempWexit;
	int tempEexit;
	
	if (mapgrid[currentLocY][currentLocX].Nexit == 0)
		tempNexit = -1;
	else
		tempNexit = mapgrid[currentLocY][currentLocX].Nexit;
	if (mapgrid[currentLocY][currentLocX].Sexit == 0)
		tempSexit = -1;
	else
		tempSexit = mapgrid[currentLocY][currentLocX].Sexit;
	if (mapgrid[currentLocY][currentLocX].Eexit == 0)
		tempEexit = -1;
	else
		tempEexit = mapgrid[currentLocY][currentLocX].Eexit;
	if (mapgrid[currentLocY][currentLocX].Wexit == 0)
		tempWexit = -1;
	else
		tempWexit = mapgrid[currentLocY][currentLocX].Wexit;
	
	generateNSPath(tempNexit, tempSexit);
	generateWEPath(tempWexit, tempEexit);
	double chance;
	if (d <= 200) {
		chance = 50.0 - (45.0 * (d / 200.0));
	}
	else {
		chance = 5.0;
	}
	if (((int) chance) > rand() % 100) {
		placePokeMC('C');
	}
	if (((int) chance) > rand() % 100) {
		placePokeMC('M');
	}
	
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
	
	displayMap();
	
	
	
}

void moveEast() {
	if (mapgrid[currentLocY][currentLocX + 1].map[0][0] == '%') {
		if (map[1][1] != '~')
			assignMap(currentLocY, currentLocX);
		++currentLocX;
		displayMapgrid(currentLocY, currentLocX);
		return;
	}
	
	if (currentLocY == 0) {
		puts("cannot move further east.");
		return;
	}
	if (map[1][1] != '~')
		assignMap(currentLocY, currentLocX);
	++currentLocX;
	
	d = sqrt(pow(abs(currentLocX - 199), 2) + pow(abs(currentLocY - 199), 2));
	
	int tempNexit;
	int tempSexit;
	int tempWexit;
	int tempEexit;
	
	if (mapgrid[currentLocY][currentLocX].Nexit == 0)
		tempNexit = -1;
	else
		tempNexit = mapgrid[currentLocY][currentLocX].Nexit;
	if (mapgrid[currentLocY][currentLocX].Sexit == 0)
		tempSexit = -1;
	else
		tempSexit = mapgrid[currentLocY][currentLocX].Sexit;
	if (mapgrid[currentLocY][currentLocX].Eexit == 0)
		tempEexit = -1;
	else
		tempEexit = mapgrid[currentLocY][currentLocX].Eexit;
	if (mapgrid[currentLocY][currentLocX].Wexit == 0)
		tempWexit = -1;
	else
		tempWexit = mapgrid[currentLocY][currentLocX].Wexit;
	
	generateNSPath(tempNexit, tempSexit);
	generateWEPath(tempWexit, tempEexit);
	double chance;
	if (d <= 200) {
		chance = 50.0 - (45.0 * (d / 200.0));
	}
	else {
		chance = 5.0;
	}
	if (((int) chance) > rand() % 100) {
		placePokeMC('C');
	}
	if (((int) chance) > rand() % 100) {
		placePokeMC('M');
	}
	
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
	
	displayMap();
	
	
	
}
	
	

void startProcedure() {
	int i = 0;
	int j = 0;
	for (j = 0; j < 80; j++) {
		for (i = 0; i < 21; i++) {
			if(i == 0 || i == 20 || j == 0 || j == 79)
				map[i][j] = '%';
			else
				map[i][j] = '~';
		}
	}
}
void endProcedure() {
	int i;
	int j;
	for (j = 0; j < 80; j++) {
		for (i = 0; i < 21; i++) {
			if(map[i][j] == '~')
				map[i][j] = '.';
		}
	}
}

void generateNSPath(int Nassignment, int Sassignment) { // if assignment == -1, the start will be random
	//srand( time(NULL) );
	int pathDirection = 0; // -3 heads NW, -2 heads W, -1 heads SW, 0 heads S, 1 heads SE, 2 heads E, 3 heads NE
	// -3 and 3 should be extremely rare and immediately start going more South
	
	int i = 0;
	int j = Nassignment;
	
	if (j == -1) {
		j = rand() % 70 + 4; // range: 4 - 73
	}
	
	map[i][j] = '#'; //exit/entrance path
	i++;
	map[i][j] = '#'; // avoids 2 paths on border
	
	while (i < 20) {
		
		// chooses pathDirection
		if (i == 16 && abs(j - Sassignment) > 7 && Sassignment != -1) { // brings path nearer towards east exit
			if ((j - Sassignment) >= 0) {
				pathDirection = -2;
			}
			else {
				pathDirection = 2;
			}
		}
		else if (i == 16 && Sassignment != -1)
			pathDirection = 0;
		else if (i == 18 && (j - Sassignment) != 0  && Sassignment != -1) {
			if ((j - Sassignment) >= 0) {
				pathDirection = -2;
			}
			else {
				pathDirection = 2;
			}
		}
		else if (i == 18 && Sassignment != -1)
			pathDirection = 0;
		else if (i == 20 || i == 19 || i == 1)
			pathDirection = 0;
		else if (j == 79 || j == 78)
			pathDirection = -1;
		else if (j == 1 || j == 2)
			pathDirection = 1;
		else if (pathDirection >= -1 && pathDirection <= 1) {
			if (rand() % 2 == 1 && pathDirection != 0) {
				if (pathDirection == 1 && rand() % 3 == 2)
					pathDirection = 2;
				else if (pathDirection == -1 && rand() % 3 == 2)
					pathDirection = -2;
			} // favors staying along the current path direction (if not going directly south) or going more extreme
			else
				pathDirection = pathDirection + rand() % 3 - 1;
		}
		else if (pathDirection == -2) {
			if (rand() % 10 == 4 && i > 2)
				pathDirection = -3;
			else if (rand() % 2 == 1)
				pathDirection = -1;
			else
				pathDirection = pathDirection - rand() % 2;
		}
		else if (pathDirection == 2) {
			if (rand() % 10 == 4 && i > 2)
				pathDirection = 3;
			else if (rand() % 2 == 1)
				pathDirection = 1;
			else
				pathDirection = pathDirection - rand() % 2;
		}
		else if (pathDirection == 3) {
			if (rand() % 10 == 4 && i > 2) {
				//stay at pathDirection 3
			}
			else {
				pathDirection = 2;
			}
		}
		else if (pathDirection == -3) {
			if (rand() % 10 == 4 && i > 2) {
				//stay at pathDirection -3
			}
			else {
				pathDirection = -2;
			}
		}
		
		//creates path based on pathDirection chosen
		if (pathDirection == 0) {
			i++;
			map[i][j] = '#';
		}
		else if (pathDirection == 1) {
			if (rand() % 2 == 1) {
				i++;
				map[i][j] = '#';
				j++;
				map[i][j] = '#';
			}
			else {
				j++;
				map[i][j] = '#';
				i++;
				map[i][j] = '#';
			}
		}
		else if (pathDirection == -1) {
			if (rand() % 2 == 1) {
				i++;
				map[i][j] = '#';
				j--;
				map[i][j] = '#';
			}
			else {
				j--;
				map[i][j] = '#';
				i++;
				map[i][j] = '#';
			}
		}
		else if (pathDirection == 2) {
			j++;
			map[i][j] = '#';
		}
		else if (pathDirection == -2) {
			j--;
			map[i][j] = '#';
		}
		else if (pathDirection == -3) {
			if (rand() % 2 == 1) {
				i--;
				map[i][j] = '#';
				j--;
				map[i][j] = '#';
			}
			else {
				j--;
				map[i][j] = '#';
				i--;
				map[i][j] = '#';
			}
		}
		else if (pathDirection == 3) {
			if (rand() % 2 == 1) {
				i--;
				map[i][j] = '#';
				j++;
				map[i][j] = '#';
			}
			else {
				j++;
				map[i][j] = '#';
				i--;
				map[i][j] = '#';
			}
		}
		
	}
	
	if (currentLocY > 0) {
		for (int a = 0; a < 80; a++) {
			if (map[0][a] == '#') {
				mapgrid[currentLocY - 1][currentLocX].Sexit = a;
				break;
			}
			else if(a == 79) {
				puts("border doesn't exist (N), something went really wrong");
			}
		}
	}
	if (currentLocY < 398) {
		for (int a = 0; a < 80; a++) {
			if (map[20][a] == '#') {
				mapgrid[currentLocY + 1][currentLocX].Nexit = a;
				break;
			}
			else if(a == 79) {
				puts("border doesn't exist (S), something went really wrong");
			}
				
		}
	}
}

void generateWEPath(int Wassignment, int Eassignment) { // if assignment == -1, will be random
	//srand( time(NULL) );
	
	
	//int eastBorder = -2;
	
	//char tempmap[21][80];
	
	//int count = 1; // because random doesn't want to be random, this is used to help the randomness
	
	//while (eastBorder != Eassignment) { // will keep generating a path until the east border is at the correct place
		/*
		for (int i = 0; i <= count; i++) {
			rand();
		}
		count++;
		*/
		for (int j = 0; j < 80; j++) {
			for (int i = 0; i < 21; i++) {
				map[i][j] = map[i][j];
			}
		}
		int pathDirection = 0; // -3 heads NW, -2 heads W, -1 heads SW, 0 heads S, 1 heads SE, 2 heads E, 3 heads NE
		// -3 and 3 should be extremely rare and immediately start going more South
		
		int i = Wassignment; // range: 4 - 15
		int j = 0; 
		
		if (i == -1) {
			i = rand() % 12 + 4;
		}
		
		map[i][j] = '#'; // exit/entrance path
		j++;
		map[i][j] = '#'; // helps avoid 2 paths on border
		
		while (j < 79) {
			
			// chooses pathDirection
			if (j == 75 && abs(i - Eassignment) > 4 && Eassignment != -1) { // brings path nearer towards east exit
				if ((i - Eassignment) >= 0) {
					pathDirection = 2;
				}
				else {
					pathDirection = -2;
				}
			}
			else if (j == 75 && Eassignment != -1)
				pathDirection = 0;
			else if (j == 77 && (i - Eassignment) != 0  && Eassignment != -1) {
				if ((i - Eassignment) >= 0) {
					pathDirection = 2;
				}
				else {
					pathDirection = -2;
				}
			}
			else if (j == 77 && Eassignment != -1)
				pathDirection = 0;
			else if (j >= 78 || j == 1) // avoids double exits
				pathDirection = 0;
			else if (i == 19 || i == 18) // avoids running into borders
				pathDirection = 1;
			else if (i == 1 || i == 2 || i == 0) // avoids running into borders
				pathDirection = -1;
			else if (pathDirection >= -1 && pathDirection <= 1) {
				if (pathDirection == 0)
					pathDirection = pathDirection + rand() % 3 - 1;
				else if (rand() % 2 == 1 || rand() % 2 == 1) {
					if (pathDirection == 1)
						pathDirection = pathDirection - rand() % 2;
					else if (pathDirection == -1)
						pathDirection = pathDirection + rand() % 2;
				}
				else
					pathDirection = pathDirection + rand() % 3 - 1;
			} //favors a less extreme path
			else if (pathDirection == -2) {
				if (rand() % 15 == 4 && j > 2) {
					pathDirection = -3;
				}
				else if (rand() % 2 == 1) {
					pathDirection = -1;
				}
				else {
					pathDirection = pathDirection - rand() % 2;
				}
			}
			else if (pathDirection == 2) {
				if (rand() % 15 == 4 && j > 2) {
					pathDirection = 3;
				}
				else if (rand() % 2 == 1) {
					pathDirection = 1;
				}
				else {
					pathDirection = pathDirection - rand() % 2;
				}
			}
			else if (pathDirection == 3) {
				if (rand() % 5 == 4 && j > 2) {
					//stay at pathDirection 3
				}
				else {
					pathDirection = 2;
				}
			}
			else if (pathDirection == -3) {
				if (rand() % 5 == 4 && j > 2) {
					//stay at pathDirection -3
				}
				else {
					pathDirection = -2;
				}
			}
			
			
			//creates path based on pathDirection
			if (pathDirection == 0) {
				j++;
				map[i][j] = '#';
			}
			else if (pathDirection == 1) {
				if (rand() % 2 == 1) {
					i--;
					map[i][j] = '#';
					j++;
					map[i][j] = '#';
				}
				else {
					j++;
					map[i][j] = '#';
					i--;
					map[i][j] = '#';
				} // randomizes L pattern the path takes
			}
			else if (pathDirection == -1) {
				if (rand() % 2 == 1) {
					i++;
					map[i][j] = '#';
					j++;
					map[i][j] = '#';
				}
				else {
					j++;
					map[i][j] = '#';
					i++;
					map[i][j] = '#';
				} // randomizes L pattern the path takes
			}
			else if (pathDirection == 2) {
				i--;
				map[i][j] = '#';
			}
			else if (pathDirection == -2) {
				i++;
				map[i][j] = '#';
			}
			else if (pathDirection == -3) {
				if (rand() % 2 == 1) {
					i++;
					map[i][j] = '#';
					j--;
					map[i][j] = '#';
				}
				else {
					j--;
					map[i][j] = '#';
					i++;
					map[i][j] = '#';
				} // randomizes L pattern the path takes
			}
			else if (pathDirection == 3) {
				if (rand() % 2 == 1) {
					i--;
					map[i][j] = '#';
					j--;
					map[i][j] = '#';
				}
				else {
					j--;
					map[i][j] = '#';
					i--;
					map[i][j] = '#';
				} // randomizes L pattern the path takes
			}
			
		}
		/*
		if (Eassignment == -1) {
			break;
		}
		for (int a = 0; a < 21; a++) {
			if (map[20][a] == '#') {
				eastBorder = a;
				break;
			}
		}
		*/
		
		
		/*
		for (int j = 0; j < 80; j++) { // for testing
			for (int i = 0; i < 21; i++) {
				map[i][j] = tempmap[i][j];
			}
		}
		displayMap(); // for testing
		startProcedure(); // for testing
		*/
	//}
	
	/*
	for (int j = 0; j < 80; j++) {
		for (int i = 0; i < 21; i++) {
			map[i][j] = tempmap[i][j];
		}
	}
	*/
	
	if (currentLocX > 0) {
		for (int a = 0; a < 21; a++) {
			if (map[a][0] == '#') {
				mapgrid[currentLocY][currentLocX - 1].Eexit = a;
				break;
			}
			else if (a == 20) {
				puts("border doesn't exist (W), something went really wrong");
			}
		}
	}
	if (currentLocX < 398) {
		for (int a = 0; a < 21; a++) {
			if (map[a][79] == '#') {
				mapgrid[currentLocY][currentLocX + 1].Wexit = a;
				break;
			}
			else if (a == 20) {
				puts("border doesn't exist (E), something went really wrong");
			}
		}
	}
}


void displayMap() {
	clear();
	refresh();
	for (int i = 0; i < 21; i++) {
		//char tempstr[82];
		//printf("%c", map[i][0]);
		for (int j = 0; j < 80; j++) {
			//char tempstr2[2];
			printw("%c", map[i][j]);
			//strcat(tempstr, tempstr2);
		}
		//puts(tempstr);
		printw("\n");
	}
	refresh();
}

/*
void displayMapgrid2(int k, int l, person *Person) { //pre-ncurses
	for (int i = 0; i < 21; i++) {
		//char tempstr[82];
		//printf("%c", mapgrid[k][l].map[i][0]);
		for (int j = 0; j < 80; j++) {
			int stopper = 0;
			//TODO: if there is a person at a position display them instead of the mapTile.
			for (int m = 0; m < 50; m++) {
				if (Person[m].posX <= 0 && Person[m].posY <= 0) {
					break;
				}
				if (Person[m].posX == j && Person[m].posY == i && Person[m].gridPosX == k && Person[m].gridPosY == l) {
					if (Person[m].charType == 'P') {
						printf("p");
					}
					else {
						printf("%c", Person[m].charType);
					}
					stopper = 1;
					break;
				}
			}
			
			if (stopper == 0) {
				printf("%c", mapgrid[k][l].map[i][j]);
			}
		}
		printf("\n");
	}
}
*/

void displayMapgrid2(int k, int l, person *Person) { //ncurses version
	clear();
	refresh();
	init_pair(1, COLOR_WHITE, COLOR_BLACK); // normal
	init_pair(2, COLOR_CYAN, COLOR_BLACK); // trainer (NPC)
	init_pair(3, COLOR_RED, COLOR_BLACK); // PC
	for (int i = 0; i < 21; i++) {
		//char tempstr[82];
		//printw("%c", mapgrid[k][l].map[i][0]);
		for (int j = 0; j < 80; j++) {
			int stopper = 0;
			//TODO: if there is a person at a position display them instead of the mapTile.
			for (int m = 0; m < amtTrainers; m++) {
				if (Person[m].posX <= 0 && Person[m].posY <= 0) {
					break;
				}
				
				
				
				if (Person[m].posX == j && Person[m].posY == i && Person[m].gridPosX == k && Person[m].gridPosY == l) {
					
					if (Person[m].charType == 'P') {
						attron(COLOR_PAIR(2));
						printw("p");
						attroff(COLOR_PAIR(2));
					}
					else if (Person[m].charType == '@') {
						attron(COLOR_PAIR(3));
						printw("%c", Person[m].charType);
						attroff(COLOR_PAIR(3));
					}
					else {
						attron(COLOR_PAIR(2));
						printw("%c", Person[m].charType);
						attroff(COLOR_PAIR(2));
					}
					stopper = 1;
					
					break;
				}
			}
			
			if (stopper == 0) {
				attron(COLOR_PAIR(1));
				printw("%c", mapgrid[l][k].map[i][j]);
				attroff(COLOR_PAIR(1));
			}
		}
		printw("\n");
	}
	refresh();
}

void displayMapgrid(int k, int l) {
	for (int i = 0; i < 21; i++) {
		//char tempstr[82];
		//printf("%c", mapgrid[k][l].map[i][0]);
		for (int j = 0; j < 80; j++) {
			//int stopper = 0;
			//TODO: if there is a person at a position display them instead of the mapTile.
			/*
			for (int m = 0; m < 50; k++) {
				if (Person[m].posX <= 0 && Person[m].posY <= 0) {
					break;
				}
				if (Person[m].posX == j && Person[m].posY == i && Person[m].gridPosX == k && Person[m].gridPosY == l) {
					printf("%c", Person[m].charType);
					stopper = 1;
					break;
				}
			}
			*/
			
			//if (stopper == 0) {
			printf("%c", mapgrid[k][l].map[i][j]);
			//}
		}
		printf("\n");
	}
}

void placePokeMC(char c) {
	//srand( time(NULL) );
	
	if (c != 'M' && c != 'C') {
		puts("Error: not M or C in placePokeMC\n");
		return;
	}
	
	while (1 == 1) {
		int i = rand() % 18 + 1;
		int j = rand() % 77 + 1;
		// pokecenter/mart would be located at map[i][j], map[i + 1][j], map[i][j + 1], and map[i + 1][j + 1]
		
		
		if (map[i][j] == '~' && map[i + 1][j] == '~' && map[i][j + 1] == '~' && map[i + 1][j + 1] == '~') { //check to see if random spot selection is available (empty)
			//checks to see if there is a path touching the possible pokecenter/mart location
			if (map[i - 1][j] == '#' || map[i - 1][j + 1] == '#' || map[i][j - 1] == '#' || map[i + 1][j - 1] == '#' || map[i][j + 2] == '#' || map[i + 1][j + 2] == '#' || map[i + 2][j] == '#' || map[i + 2][j + 1] == '#') {
				map[i][j] = c;
				map[i + 1][j] = c;
				map[i][j + 1] = c;
				map[i + 1][j + 1] = c;
				break;
			}
			else {
				continue;
			}
		}
		else {
			continue;
		}
	}
}




void recTallGrass(int i, int j, int countdown) {
	if (countdown <= 0) {
		return;
	}
	map[i][j] = ',';
	int selection = random() % 4;
	
	int newi;
	int newj;
	
	if (selection == 0) {
		newi = i - 1;
		newj = j;
	}
	else if (selection == 1) {
		newi = i;
		newj = j - 1;
	}
	else if (selection == 2) {
		newi = i + 1;
		newj = j;
	}
	else if (selection == 3) {
		newi = i;
		newj = j + 1;
	}
	else {
		puts("Error: selection is bad in recTallGrass()\n");
		return;
	}
	
	if (map[newi][newj] == ',')
		recTallGrass(newi, newj, countdown - 1);
	else if (map[newi][newj] == '~')
		map[newi][newj] = ',';
	
	
	
	
}
	
void generateTallGrass() {
	int i;
	int j;
	while (1 == 1) {
		i = random() % 18 + 1;
		j = random() % 77 + 1;
		if (map[i][j] == '~')
			break;
	} // finds empty spot to start tallgrass generation
	int size = 70 + random() % 21; // 70 - 90
	for (int k = 0; k < size; k++) {
		recTallGrass(i, j, 60);
	}
}

void recClearing(int i, int j, int countdown) {
	//srand( time(NULL) );
	if (countdown == 0)
		return;
	
	map[i][j] = '.';
	int selection = random() % 4;
	
	int newi;
	int newj;
	
	if (selection == 0) {
		newi = i - 1;
		newj = j;
	}
	else if (selection == 1) {
		newi = i;
		newj = j - 1;
	}
	else if (selection == 2) {
		newi = i + 1;
		newj = j;
	}
	else if (selection == 3) {
		newi = i;
		newj = j + 1;
	}
	else {
		puts("Error: selection is bad in recClearing()\n");
		return;
	}
	
	if (map[newi][newj] == '.')
		recClearing(newi, newj, countdown - 1);
	else if (map[newi][newj] == '~')
		map[newi][newj] = '.';
	
	
	
}
	
void generateClearing() {
	int i;
	int j;
	while (1 == 1) {
		i = random() % 18 + 1;
		j = random() % 77 + 1;
		if (map[i][j] == '~')
			break;
	}
	int size = 70 + random() % 20;
	for (int k = 0; k < size; k++) {
		recClearing(i, j, 60);
	}
}

void generateTree() {
	int i;
	int j;
	int emergencyexit = 40;
	while (emergencyexit > 0) {
		i = random() % 18 + 1;
		j = random() % 77 + 1;
		if (map[i][j] == '~' || (map[i][j] == ',' && random() % 8 == 1)) {
			map[i][j] = '"';
			break;
		}
		emergencyexit--;
	}
}

void generateBoulder() {
	int i;
	int j;
	int emergencyexit = 40;
	while (emergencyexit > 0) {
		i = random() % 18 + 1;
		j = random() % 77 + 1;
		if (map[i][j] == '~' || (map[i][j] == ',' && random() % 8 == 1)) {
			map[i][j] = '%';
			break;
		}
		emergencyexit--;
	}
}
	
int movePlayersAlongPrioQueue(person* People, int *sizePeople, int numtrainers) {
	
	char userinput = ' ';
	
	if (People[0].waiter <= 0) {
		userinput = getch();
		int tempresult = playerMoveRequest(People, userinput, sizePeople, numtrainers);
		if (tempresult == 1) {
			return 1;
		}
		if (tempresult == 2) {
			return 0;
		}
		if (People[0].moveQueueX[0] != 0 || People[0].moveQueueY[0] != 0) { //perform player movement
			People[0].posX = People[0].moveQueueX[0];
			People[0].posY = People[0].moveQueueY[0];
			People[0].moveQueueX[0] = 0;
			People[0].moveQueueY[0] = 0;
			
			if (People[0].charType == 'H' && mapgrid[People[0].gridPosY][People[0].gridPosX].map[People[0].posY][People[0].posX] == ',') {
				People[0].waiter = 15;
			}
			else if (mapgrid[People[0].gridPosY][People[0].gridPosX].map[People[0].posY][People[0].posX] == ',') {
				People[0].waiter = 20;
			}
			else if (mapgrid[People[0].gridPosY][People[0].gridPosX].map[People[0].posY][People[0].posX] == '.' || mapgrid[People[0].gridPosY][People[0].gridPosX].map[People[0].posY][People[0].posX] == '#') {
				People[0].waiter = 10;
			}
			else if (mapgrid[People[0].gridPosY][People[0].gridPosX].map[People[0].posY][People[0].posX] == 'M' || mapgrid[People[0].gridPosY][People[0].gridPosX].map[People[0].posY][People[0].posX] == 'C') {
				People[0].waiter = 10;
			}
			else {
				printw("Error: Person[%d] (type '%c') attempting to move in place it shouldn't\n(%d, %d)\n", 0, People[0].charType, People[0].posX, People[0].posY);
				refresh();
				//People[0].waiter = 100;
			}
		}
		displayMapgrid2(currentLocX, currentLocY, People);
		return 0;
	}
	else {
		People[0].waiter = People[0].waiter - 5;
		usleep(3);
		usleep(3);
		usleep(3);
		usleep(3);
		usleep(3);
	}
	
	
	
	for (int l = amtTrainers - 9; l < amtTrainers; l++) {
		//printf("running person number: %d\n", l); // for testing
		
		if (People[l].gridPosX != currentLocX || People[l].gridPosY != currentLocY) { // stops trainers from moving if they are not in the current map being displayed. reduces load on program.
			continue;
		}
		
		if (People[l].posX == 0 && People[l].posY == 0) {
			break;
		}
		
		//printf("People[%d].charType == %c\n", l, People[l].charType); // for testing
		
		for (int i = 0; i < 100; i++) {
			int tempcount = 0;
			while ((People[l].moveQueueX[i] == 0 && People[l].moveQueueY[i] == 0 && i == 0 && People[l].charType != 's' && People[l].charType != '@') && tempcount <= 10) {
				if (People[l].charType == 'n') {
					for (int j = 0; j < 100; j++) { // clears moveQueue
						if (People[l].moveQueueX[j] == 0 && People[l].moveQueueY[j] == 0) {
							break;
						}
						People[l].moveQueueX[j] = 0;
						People[l].moveQueueY[j] = 0;
					}
					findRandWalkerPrioQueue(People, l);
					
					/*
					printf("current position: %d, %d\n", People[l].posX, People[l].posY); // for testing
					for (int j = 0; j < 100; j++) { // for testing
						//if (People[l].moveQueueX[j] == 0 && People[l].moveQueueY[j] == 0) {
							//break;
						//}
						printf("movequeue[%d]: %d, %d\n", j, People[l].moveQueueX[j], People[l].moveQueueY[j]);
					}
					//printf("movequeue[1]: %d, %d\n", People[l].moveQueueX[i + 1], People[l].moveQueueY[i + 1]); // for testing
					*/
				}
				if (People[l].charType == 'p') {
					for (int j = 0; j < 100; j++) { // clears moveQueue
						if (People[l].moveQueueX[j] == 0 && People[l].moveQueueY[j] == 0) {
							break;
						}
						People[l].moveQueueX[j] = 0;
						People[l].moveQueueY[j] = 0;
					}
					findPacerPrioQueue(People, l);
					/*
					printf("current position: %d, %d\n", People[l].posX, People[l].posY);
					for (int j = 0; j < 100; j++) { // for testing
						if (People[l].moveQueueX[j] == 0 && People[l].moveQueueY[j] == 0) {
							break;
						}
						printf("movequeue[%d]: %d, %d\n", j, People[l].moveQueueX[j], People[l].moveQueueY[j]);
					}
					//printf("movequeue[1]: %d, %d\n", People[l].moveQueueX[i + 1], People[l].moveQueueY[i + 1]); // for testing
					*/
				}
				if (People[l].charType == 'P') {
					for (int j = 0; j < 100; j++) { // clears moveQueue
						if (People[l].moveQueueX[j] == 0 && People[l].moveQueueY[j] == 0) {
							break;
						}
						People[l].moveQueueX[j] = 0;
						People[l].moveQueueY[j] = 0;
					}
					findPacerPrioQueue2(People, l);
					/*
					printf("current position: %d, %d\n", People[l].posX, People[l].posY);
					for (int j = 0; j < 100; j++) { // for testing
						if (People[l].moveQueueX[j] == 0 && People[l].moveQueueY[j] == 0) {
							break;
						}
						printf("movequeue[%d]: %d, %d\n", j, People[l].moveQueueX[j], People[l].moveQueueY[j]);
					}
					//printf("movequeue[1]: %d, %d\n", People[l].moveQueueX[i + 1], People[l].moveQueueY[i + 1]); // for testing
					*/
				}
				if (People[l].charType == 'w') {
					for (int j = 0; j < 100; j++) { // clears moveQueue
						if (People[l].moveQueueX[j] == 0 && People[l].moveQueueY[j] == 0) {
							break;
						}
						People[l].moveQueueX[j] = 0;
						People[l].moveQueueY[j] = 0;
					}
					findWandererPrioQueue(People, l);
				}
				
				if (People[l].charType == 'R' || People[l].charType == 'H') {
					break;
					//findShortestPath(People[l].posX, People[l].posY, People[0].posX, People[0].posY, People[l].gridPosX, People[l].gridPosY, People, l);
				}
				
				++tempcount;
			}
			if ((People[l].charType == 'R' || People[l].charType == 'H') && currentLocX == People[l].gridPosX && currentLocY == People[l].gridPosY) { //find shortest path must re-run a lot because the player moves.
				if (rand() % 3 == 2) {
					findShortestPath(People[l].posX, People[l].posY, People[0].posX, People[0].posY, People[l].gridPosX, People[l].gridPosY, People, l);
				}

			}
			
			if (People[l].moveQueueX[i] == 0 && People[l].moveQueueY[i] == 0 && People[l].charType != 's' && People[l].charType != '@') {
				//printf("moving People[%d]\n", l); // for testing
				if (People[l].waiter <= 0) {
					
					int tExit = 0;
					for (int j = 0; j < amtTrainers; j++) {
						if (j == l) {
							continue;
						}
						if (People[j].gridPosX != currentLocX || People[j].gridPosY != currentLocY) { // ignores cases where they are on different mapgrids
							continue;
						}
						if (People[j].posX == 0 && People[j].posY == 0) {
							break;
						}
						if (People[l].moveQueueX[i - 1] == People[j].posX && People[l].moveQueueY[i - 1] == People[j].posY && People[l].gridPosX == People[j].gridPosX && People[l].gridPosY == People[j].gridPosY) {
							tExit = 1;
							for (int k = 0; k < 100; j++) { // clears moveQueue
								if (People[l].moveQueueX[k] == 0 && People[l].moveQueueY[k] == 0) {
									break;
								}
								People[l].moveQueueX[k] = 0;
								People[l].moveQueueY[k] = 0;
							}
							
							if ((j == 0 && People[l].defeated == 0) || (l == 0 && People[j].defeated == 0)) { // if the player runs into a trainer, or a trainer runs into a player, and the trainer hasn't been defeated, a pokemon battle will occur.
								// TODO: engage a pokemon battle between People[j] and the player
								printw("POKEMON BATTLE!\n"); // for testing
								refresh();
								sleep(1);
							}
							
							//printf("Player Collision Detected Between %d and %d, stopping movement", l, j); // for testing
							break;
						}
					}
					if (tExit == 1) {
						break;
					}
					
					if ((People[l].moveQueueX[i - 1] == 0 || People[l].moveQueueY[i - 1] == 0 || People[l].moveQueueY[i - 1] == 20 || People[l].moveQueueX[i - 1] == 79) && l != 0) { //stops movement into borders unless the person is PC.
						for (int j = 0; j < 100; j++) { // clears moveQueue
							if (People[l].moveQueueX[j] == 0 && People[l].moveQueueY[j] == 0) {
								break;
							}
							People[l].moveQueueX[j] = 0;
							People[l].moveQueueY[j] = 0;
						}
					} // stops movement into border (probably works...)
					
					if ((People[l].moveQueueX[i - 1] == 0 || People[l].moveQueueY[i - 1] == 0) && l != 0) { // stops movement into borders... i think (made it so this will not happen to the PC, but that might not be the right thing)
						People[l].waiter = 10;
						break; // should probably add more here
					}
					else {
						People[l].posX = People[l].moveQueueX[i - 1];
						People[l].posY = People[l].moveQueueY[i - 1];
						People[l].moveQueueX[i - 1] = 0;
						People[l].moveQueueY[i - 1] = 0;
					}
					if (People[l].charType == 'H' && mapgrid[People[l].gridPosY][People[l].gridPosX].map[People[l].posY][People[l].posX] == ',') {
						People[l].waiter = 15;
					}
					else if (mapgrid[People[l].gridPosY][People[l].gridPosX].map[People[l].posY][People[l].posX] == ',') {
						People[l].waiter = 20;
					}
					else if (mapgrid[People[l].gridPosY][People[l].gridPosX].map[People[l].posY][People[l].posX] == '.' || mapgrid[People[l].gridPosY][People[l].gridPosX].map[People[l].posY][People[l].posX] == '#') {
						People[l].waiter = 10;
					}
					else if (mapgrid[People[l].gridPosY][People[l].gridPosX].map[People[l].posY][People[l].posX] == 'M' || mapgrid[People[l].gridPosY][People[l].gridPosX].map[People[l].posY][People[l].posX] == 'C') {
						People[l].waiter = 10;
					}
					else {
						printw("Error: Person[%d] (type '%c') attempting to move in place it shouldn't\n(%d, %d)\n", l, People[l].charType, People[l].posX, People[l].posY);
						refresh();
						//People[l].waiter = 100;
					}
					break;
				}
				else {
					People[l].waiter = People[l].waiter - 5;
					break;
				}
			}
			
		}
	}
	
	displayMapgrid2(currentLocX, currentLocY, People);
	return 0;
}

void createTrainers(person *people, int numtrainers, int alreadymade) {
	amtTrainers = numtrainers + alreadymade;
	
	if (people[0].charType != '@') {
		person *PC = &people[0];
		PC->drivable = 1;
		PC->charType = '@';
		PC->gridPosX = currentLocX;
		PC->gridPosY = currentLocY;
		PC->defeated = 0;
		while (1 == 1) {
			people[0].posX = rand() % 78 + 1;
			people[0].posY = rand() % 19 + 1;
				
			if (mapgrid[people[0].gridPosY][people[0].gridPosX].map[people[0].posY][people[0].posX] == '%' || mapgrid[people[0].gridPosY][people[0].gridPosX].map[people[0].posY][people[0].posX] == '"' || mapgrid[people[0].gridPosY][people[0].gridPosX].map[people[0].posY][people[0].posX] == 'C' || mapgrid[people[0].gridPosY][people[0].gridPosX].map[people[0].posY][people[0].posX] == 'M') {
				continue;
			}
			else {
				break;
			}
		}
	}
	
	
	for (int i = alreadymade; i < amtTrainers; i++) {
		people[i].waiter = 0;
		for (int j = 0; j < 100; j++) { // clears moveQueue
			if (people[i].moveQueueX[j] == 0 && people[i].moveQueueY[j] == 0) {
				break;
			}
			people[i].moveQueueX[j] = 0;
			people[i].moveQueueY[j] = 0;
		}
		people[i].drivable = 0;
		int tempint = rand() % 6;
		if (tempint == 0) {
			people[i].charType = 'R';
		}
		else if (tempint == 1) {
			people[i].charType = 'H';
		}
		else if (tempint == 2) {
			int tempint2 = rand() % 2;
			if (tempint2 == 0) {
				people[i].charType = 'p';
			}
			else {
				people[i].charType = 'P';
			}
		}
		else if (tempint == 3) {
			people[i].charType = 'w';
		}
		else if (tempint == 4) {
			people[i].charType = 'n';
		}
		else if (tempint == 5) {
			people[i].charType = 's';
		}
		
		people[i].gridPosX = currentLocX;
		people[i].gridPosY = currentLocY;
		people[i].defeated = 0;
		
		while (1 == 1) {
			int tempcount = 0; // if it equals 2 it can leave the while loop
			people[i].posX = rand() % 78 + 1;
			people[i].posY = rand() % 19 + 1;
			
			if (mapgrid[people[i].gridPosY][people[i].gridPosX].map[people[i].posY][people[i].posX] != '%' && mapgrid[people[i].gridPosY][people[i].gridPosX].map[people[i].posY][people[i].posX] != '"' && mapgrid[people[i].gridPosY][people[i].gridPosX].map[people[i].posY][people[i].posX] != 'C' && mapgrid[people[i].gridPosY][people[i].gridPosX].map[people[i].posY][people[i].posX] != 'M') {
				tempcount = tempcount + 1;
			}
			else {
				continue;
			}
			
			tempcount = tempcount + 1;
			for (int j = 0; j < amtTrainers; j++) {
				if (j == i)
					continue;
				if (people[j].posX == 0 && people[j].posY == 0)
					continue;
				if (people[j].posX == people[i].posX && people[j].posY == people[i].posY && people[j].gridPosX == people[i].gridPosX && people[j].gridPosY == people[i].gridPosY) {
					tempcount = tempcount - 1;
					break;
				}
			}
			if (tempcount == 2) {
				break;
			}
		}
	}
}
	
int playerMoveRequest(person *player, char playerinput, int *sizePeople, int numtrainers) {
	int newPosX = -2;
	int newPosY = -2;
	if (playerinput == '7' || playerinput == 'y') { // up and left
		newPosX = player[0].posX - 1;
		newPosY = player[0].posY - 1;
	}
	else if (playerinput == '8' || playerinput == 'k') { // up
		newPosX = player[0].posX;
		newPosY = player[0].posY - 1;
	}
	else if (playerinput == '9' || playerinput == 'u') { // up and right
		newPosX = player[0].posX + 1;
		newPosY = player[0].posY - 1;
	}
	else if (playerinput == '6' || playerinput == 'l') { // right
		newPosX = player[0].posX + 1;
		newPosY = player[0].posY;
	}
	else if (playerinput == '3' || playerinput == 'n') { // down and right
		newPosX = player[0].posX + 1;
		newPosY = player[0].posY + 1;
	}
	else if (playerinput == '2' || playerinput == 'j') { // down
		newPosX = player[0].posX;
		newPosY = player[0].posY + 1;
	}
	else if (playerinput == '1' || playerinput == 'b') { // down and left
		newPosX = player[0].posX - 1;
		newPosY = player[0].posY + 1;
	}
	else if (playerinput == '4' || playerinput == 'h') { // left
		newPosX = player[0].posX - 1;
		newPosY = player[0].posY;
	}
	else if (playerinput == '>') { // enter pokemart or pokecenter
		if(mapgrid[player[0].gridPosY][player[0].gridPosX].map[player[0].posY][player[0].posX] == 'M') {
			clear();
			printw("Inside PokeMart, press '<' to leave\n");
			refresh();
			char inp;
			while (1 == 1) {
				scanf("%c", &inp);
				if (inp == '<') {
					break;
				}
			}
			clear();
			return 0;
		}
		else if (mapgrid[player[0].gridPosY][player[0].gridPosX].map[player[0].posY][player[0].posX] == 'C') {
			clear();
			printw("Inside PokeCenter, press '<' to leave\n");
			refresh();
			char inp;
			while (1 == 1) {
				scanf("%c", &inp);
				if (inp == '<') {
					break;
				}
			}
			//getc(); // stops stuff from breaking. c is weird.
			displayMapgrid2(currentLocX, currentLocY, player);
			return 0;
		}
	}
	else if (playerinput == ' ' || playerinput == '5' || playerinput == '.') {
		// do nothing
		return 0;
	}
	else if (playerinput == 't') {
		// TODO: display list of trainers on the map, with their symbol and position relative to the PC (e.g.: "r, 2 north and 14 west").
		clear();
		printw("Trainer List (press escape key to leave)\n");
		for (int i = 1; i < amtTrainers; i++) { // for all trainers, it shows the positions relative to the PC
			if (player[i].gridPosX == currentLocX && player[i].gridPosY == currentLocY) {
				printw("%c, ", player[i].charType);
				if (player[i].posY - player[0].posY == 0) {
					if (player[i].posX - player[0].posX > 0) {
						printw("%d East\n", player[i].posX - player[0].posX);
					}
					else {
						printw("%d West\n", player[0].posX - player[i].posX);
					}
				}
				else if (player[i].posX - player[0].posX == 0) {
					if (player[i].posY - player[0].posY > 0) {
						printw("%d South\n", player[i].posY - player[0].posY);
					}
					else {
						printw("%d North\n", player[0].posY - player[i].posY);
					}
				}
				else if (player[i].posY - player[0].posY > 0) {
					printw("%d South and ", player[i].posY - player[0].posY);
					if (player[i].posX - player[0].posX > 0) {
						printw("%d East\n", player[i].posX - player[0].posX);
					}
					else {
						printw("%d West\n", player[0].posX - player[i].posX);
					}
				}
				else {
					printw("%d North and ", player[0].posY - player[i].posY);
					if (player[i].posX - player[0].posX > 0) {
						printw("%d East\n", player[i].posX - player[0].posX);
					}
					else {
						printw("%d West\n", player[0].posX - player[i].posX);
					}
				}
			}
		}
		refresh();
		// TODO: up and down arrow keys allow user to scroll list if it is really big. escape key returns to map.
		char inp;
		while (1 == 1) {
			scanf("%c", &inp);
			if (inp == 27) { // escape key
				break;
			}
			else if (inp == 72) { // up arrow key
				// TODO: scroll up if applicable
			}
			else if (inp == 80) { // down arrow key
				// TODO: scroll down if applicable
			}
		}
		displayMapgrid2(currentLocX, currentLocY, player);
		return 0;
	}
	else if (playerinput == 'Q') {
		return 1;
	}
	else {
		return 0;
	}
	
	if (newPosX == -2 || newPosY == -2) {
		return 0;
	}
	
	
	for (int i = 1; i < amtTrainers; i++) {
		if (newPosX == player[i].posX && newPosY == player[i].posY) {
			return 0;
		}
	}
	
	if (mapgrid[player[0].gridPosY][player[0].gridPosX].map[newPosY][newPosX] != '"' && mapgrid[player[0].gridPosY][player[0].gridPosX].map[newPosY][newPosX] != '%') {
		if (newPosY == -1) { // condition to move a map north
			if (currentLocY == 0) {
				return 0;
			}
			player[0].posY = 19;
			//player[0].gridPosY = player[0].gridPosY - 1;
			if (mapgrid[currentLocY - 1][currentLocX].map[0][0] == '%') {
				moveNorth();
				for (int i = 0; i < amtTrainers; i++) {
					for (int j = 0; j < 100; j++) { // clears moveQueue
						if (player[i].moveQueueX[j] == 0 && player[i].moveQueueY[j] == 0) {
							break;
						}
						player[i].moveQueueX[j] = 0;
						player[i].moveQueueY[j] = 0;
					}
				}
				return 2;
			}
			else {
				printw("Generating Map\n"); // for testing
				moveNorth();
				for (int i = 0; i < amtTrainers; i++) {
					for (int j = 0; j < 100; j++) { // clears moveQueue
						if (player[i].moveQueueX[j] == 0 && player[i].moveQueueY[j] == 0) {
							break;
						}
						player[i].moveQueueX[j] = 0;
						player[i].moveQueueY[j] = 0;
					}
				}
				//displayMapgrid2(199, 198, player); // for testing
				printw("(199, 198) %c \n", mapgrid[198][199].map[0][0]); // for testing
				printw("currloc (%d, %d) %c \n", currentLocX, currentLocY, mapgrid[currentLocY][currentLocX].map[0][0]); // for testing
				refresh(); // for testing
				player[0].gridPosY = player[0].gridPosY - 1;
				player[0].waiter = 0;
				//return 0; // for testing
				*sizePeople = *sizePeople + numtrainers;
				player = realloc(player, sizeof(person) * *sizePeople);
				printw("allocated memory"); // for testing
				refresh(); // for testing
				createTrainers(player, numtrainers, *sizePeople - numtrainers);
				printw("created trainers\n"); //  for testing
				printw("person[amtTrainers - 1].gridPosY: %d\ncurrentLocY: %d\n", player[amtTrainers - 1].gridPosY, currentLocY); // for testing
				printw("person[amtTrainers - 1].moveQueueX[0]: %d\n", player[amtTrainers - 1].moveQueueX[0]); // for testing
				refresh(); // for testing
				sleep(10); // for testing
				clear();
				displayMapgrid2(currentLocX, currentLocY, player);
				refresh();
				sleep(10);
				return 2;
			}
		}
		else if (newPosY == 21) {
			if (currentLocY == 398) {
				return 0;
			}
			player[0].posY = 0;
			if (mapgrid[currentLocY - 1][currentLocX].map[0][0] == '%') {
				moveSouth();
				for (int i = 0; i < amtTrainers; i++) {
					for (int j = 0; j < 100; j++) { // clears moveQueue
						if (player[i].moveQueueX[j] == 0 && player[i].moveQueueY[j] == 0) {
							break;
						}
						player[i].moveQueueX[j] = 0;
						player[i].moveQueueY[j] = 0;
					}
				}
				return 2;
			}
			else {
				printw("Generating Map\n"); // for testing
				moveSouth();
				for (int i = 0; i < amtTrainers; i++) {
					for (int j = 0; j < 100; j++) { // clears moveQueue
						if (player[i].moveQueueX[j] == 0 && player[i].moveQueueY[j] == 0) {
							break;
						}
						player[i].moveQueueX[j] = 0;
						player[i].moveQueueY[j] = 0;
					}
				}
				//displayMapgrid2(199, 198, player); // for testing
				printw("(199, 198) %c \n", mapgrid[198][199].map[0][0]); // for testing
				printw("currloc (%d, %d) %c \n", currentLocX, currentLocY, mapgrid[currentLocY][currentLocX].map[0][0]); // for testing
				refresh(); // for testing
				player[0].gridPosY = player[0].gridPosY + 1;
				player[0].waiter = 0;
				//return 0; // for testing
				*sizePeople = *sizePeople + numtrainers;
				player = realloc(player, sizeof(person) * *sizePeople);
				printw("allocated memory"); // for testing
				refresh(); // for testing
				createTrainers(player, numtrainers, *sizePeople - numtrainers);
				printw("created trainers\n"); //  for testing
				printw("person[12].gridPosY: %d\ncurrentLocY: %d\n", player[12].gridPosY, currentLocY); // for testing
				refresh(); // for testing
				clear();
				displayMapgrid2(currentLocX, currentLocY, player);
				refresh();
				return 2;
			}
		}
		else if (newPosX == 80) {
			if (currentLocX == 398) {
				return 0;
			}
			player[0].posX = 0;
			
			if (mapgrid[currentLocY - 1][currentLocX].map[0][0] == '%') {
				moveEast();
				for (int i = 0; i < amtTrainers; i++) {
					for (int j = 0; j < 100; j++) { // clears moveQueue
						if (player[i].moveQueueX[j] == 0 && player[i].moveQueueY[j] == 0) {
							break;
						}
						player[i].moveQueueX[j] = 0;
						player[i].moveQueueY[j] = 0;
					}
				}
				return 2;
			}
			else {
				printw("Generating Map\n"); // for testing
				moveEast();
				for (int i = 0; i < amtTrainers; i++) {
					for (int j = 0; j < 100; j++) { // clears moveQueue
						if (player[i].moveQueueX[j] == 0 && player[i].moveQueueY[j] == 0) {
							break;
						}
						player[i].moveQueueX[j] = 0;
						player[i].moveQueueY[j] = 0;
					}
				}
				//displayMapgrid2(199, 198, player); // for testing
				printw("(199, 198) %c \n", mapgrid[198][199].map[0][0]); // for testing
				printw("currloc (%d, %d) %c \n", currentLocX, currentLocY, mapgrid[currentLocY][currentLocX].map[0][0]); // for testing
				refresh(); // for testing
				player[0].gridPosY = player[0].gridPosX + 1;
				player[0].waiter = 0;
				//return 0; // for testing
				*sizePeople = *sizePeople + numtrainers;
				player = realloc(player, sizeof(person) * *sizePeople);
				printw("allocated memory"); // for testing
				refresh(); // for testing
				createTrainers(player, numtrainers, *sizePeople - numtrainers);
				printw("created trainers\n"); //  for testing
				printw("person[12].gridPosY: %d\ncurrentLocY: %d\n", player[12].gridPosY, currentLocY); // for testing
				refresh(); // for testing
				clear();
				displayMapgrid2(currentLocX, currentLocY, player);
				refresh();
				return 2;
			}
		}
		else if (newPosX == -1) {
			if (currentLocX == 0) {
				return 0;
			}
			player[0].posX = 79;
			if (mapgrid[currentLocY - 1][currentLocX].map[0][0] == '%') {
				moveWest();
				for (int i = 0; i < amtTrainers; i++) {
					for (int j = 0; j < 100; j++) { // clears moveQueue
						if (player[i].moveQueueX[j] == 0 && player[i].moveQueueY[j] == 0) {
							break;
						}
						player[i].moveQueueX[j] = 0;
						player[i].moveQueueY[j] = 0;
					}
				}
				return 2;
			}
			else {
				printw("Generating Map\n"); // for testing
				moveWest();
				for (int i = 0; i < amtTrainers; i++) {
					for (int j = 0; j < 100; j++) { // clears moveQueue
						if (player[i].moveQueueX[j] == 0 && player[i].moveQueueY[j] == 0) {
							break;
						}
						player[i].moveQueueX[j] = 0;
						player[i].moveQueueY[j] = 0;
					}
				}
				//displayMapgrid2(199, 198, player); // for testing
				printw("(199, 198) %c \n", mapgrid[198][199].map[0][0]); // for testing
				printw("currloc (%d, %d) %c \n", currentLocX, currentLocY, mapgrid[currentLocY][currentLocX].map[0][0]); // for testing
				refresh(); // for testing
				player[0].gridPosX = player[0].gridPosX - 1;
				player[0].waiter = 0;
				//return 0; // for testing
				*sizePeople = *sizePeople + numtrainers;
				player = realloc(player, sizeof(person) * *sizePeople);
				printw("allocated memory"); // for testing
				refresh(); // for testing
				createTrainers(player, numtrainers, *sizePeople - numtrainers);
				printw("created trainers\n"); //  for testing
				printw("person[12].gridPosY: %d\ncurrentLocY: %d\n", player[12].gridPosY, currentLocY); // for testing
				refresh(); // for testing
				clear();
				displayMapgrid2(currentLocX, currentLocY, player);
				refresh();
				return 2;
			}
		}
		else {
			player[0].moveQueueX[0] = newPosX;
			player[0].moveQueueY[0] = newPosY;
		}
	}
	return 0;
	
}
