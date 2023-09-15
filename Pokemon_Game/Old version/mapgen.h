#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <time.h>
#include <ctype.h>
#include <ncurses.h>

typedef struct {
	char name[20];
	int drivable; // if 1 then it's the player
	int gridPosX; // what map they are on (X coordinate)
	int gridPosY; // what map they are on (Y coordinate)
	int posX; // what tile they are on in the map (X coordinate)
	int posY; // what tile they are on in the map (Y coordinate)
	char charType; // what they show up as {'H', 'R', 'P'}
	int moveQueueX[100]; // stores X positions that the person will move (executes from last to first)
	int moveQueueY[100]; // stores Y positions that the person will move (executes from last to first)
	int waiter; // stores how long the person must wait before able to move again.
	int defeated; // stores whether or not the player has defeated the person or not. 0 for not defeated, 1 for has been defeated.
} person;


void startProcedure();
void generateNSPath(int Nassignment, int Sassignment);
void generateWEPath(int Wassignment, int Eassignment);
void displayMap();
void displayMapgrid2(int k, int l, person *Person);
void displayMapgrid(int k, int l);
void placePokeMC(char c);
void recTallGrass(int i, int j, int countdown);
void generateTallGrass();
void recClearing(int i, int j, int countdown);
void generateClearing();
void generateTree();
void generateBoulder();
void endProcedure();
void assignMap(int i, int j);
void doFirst();
void moveNorth();
void moveSouth();
void moveWest();
void moveEast();
void flyTo(int X, int Y);
void findShortestPath(int startX, int startY, int endX, int endY, int gridLocX, int gridLocY, person *Pers, int PersElem);
// void findShortestPathRec(int currX, int currY, int endX, int endY, char charType);
void findRandWalkerPrioQueue(person *RandWalker, int RandWalkerElem);
void findPacerPrioQueue(person *Pacer, int PacerElem);
void findPacerPrioQueue2(person *Pacer, int PacerElem);
void findWandererPrioQueue(person *Wanderer, int WandererElem);
int movePlayersAlongPrioQueue(person* People, int *sizePeople, int numtrainers);
void createTrainers(person *people, int numtrainers, int alreadymade);
int playerMoveRequest(person *player, char playerinput, int *sizePeople, int numtrainers);

typedef struct {
	char map[21][80];
	int Nexit;
	int Sexit;
	int Eexit;
	int Wexit;
} maps;

typedef struct {
	char mapTile;
	int visited;
	int sPathLength;
	int pathTakenX; // keeps track of x position of previous node (with the shortest path)
	int pathTakenY; // keeps track of y position of previous node (with the shortest path)
} dijk;


