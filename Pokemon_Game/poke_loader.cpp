#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <limits.h>
#include <sys/time.h>
#include <assert.h>
#include <unistd.h>
#include <ncurses.h>
//#include <conio.h>
#include <iostream>

#include "poke_loader.h"
#include "poke327.h"
#include "io.h"
#include "db_parse.h"

using namespace std;

fullPokemon PC_Pokemon[6]; // the PC's pokemon
fullPokemon PC_PokeStorage[200]; // PC's stored pokemon
int pokeBucks = 1000;
int PC_Pokeballs = 10;
int PC_Revives = 10;
int PC_Potions = 10;
int PC_Greatballs = 1;
int PC_Ultraballs = 1;
int PC_Masterballs = 1;
int PC_PokeStorageIter = 0;

char* dest2;
char* strcat2(char* dest, const char* src) { // this might be causing the malloc problems
	dest2 = (char*) malloc(400);
	dest2 = strcpy(dest2, dest);
	strcat(dest2, src);
	//free(dest);
	return dest2;
}

int findnumpokemon(fullPokemon *pokeArr) {
	int numPokemon = 0;
	for (int i = 0; i < 6; i++) {
		if (pokeArr[i].exists == 1) {
			numPokemon++;
		}
	}
	return numPokemon;
}

int findnumpokemonleft(fullPokemon *pokeArr) {
	int numPokemonLeft = 0;
	for (int i = 0; i < 6; i++) {
		if (pokeArr[i].exists == 1 && pokeArr[i].hp > 0)
			numPokemonLeft++;
	}
	return numPokemonLeft;
}

double multiply_damage_by_type(move_db_t attMove, fullPokemon defPoke) {
	double a = 1.0;
	if (defPoke.type_id[0] == 1) { // Normal type (see types.csv) 
		if (attMove.type_id == 2) // fighting
			a = 2.0;
		else if (attMove.type_id == 8) // ghost
			a = 0.0;
	}
	else if (defPoke.type_id[0] == 2) { // fighting
		if (attMove.type_id == 3 || attMove.type_id == 14 || attMove.type_id == 18) // flying psychic fairy
			a = 2.0;
		else if (attMove.type_id == 6 || attMove.type_id == 7 || attMove.type_id == 17) // rock bug dark
			a = 0.5;
	}
	else if (defPoke.type_id[0] == 3) { // flying
		if (attMove.type_id == 6 || attMove.type_id == 15 || attMove.type_id == 13) // rock electric ice
			a = 2.0;
		else if (attMove.type_id == 2 || attMove.type_id == 7 || attMove.type_id == 12) // fighting bug grass
			a = 0.5;
		else if (attMove.type_id == 5) // ground
			a = 0.0;
	}
	else if (defPoke.type_id[0] == 4) { // poison
		// 2.0: 6 13 15
		//0.5: 2 4 7 12 18
		//0.0: 
		if (attMove.type_id == 5 || attMove.type_id == 14)
			a = 2.0;
		else if (attMove.type_id == 2 || attMove.type_id == 4 || attMove.type_id == 7 || attMove.type_id == 12 || attMove.type_id == 18)
			a = 0.5;
	}
	else if (defPoke.type_id[0] == 5) { // ground
		// 2.0: 11 12 15
		//0.5: 4 6
		//0.0: 13
		if (attMove.type_id == 11 || attMove.type_id == 12 || attMove.type_id == 15)
			a = 2.0;
		else if (attMove.type_id == 4 || attMove.type_id == 6)
			a = 0.5;
		else if (attMove.type_id == 13)
			a = 0.0;
	}
	else if (defPoke.type_id[0] == 6) { // rock
		// 2.0: 2 5 9 11 12
		//0.5: 1 3 4 10
		//0.0:
		if (attMove.type_id == 2 || attMove.type_id == 5 || attMove.type_id == 9 || attMove.type_id == 11 || attMove.type_id == 12)
			a = 2.0;
		else if (attMove.type_id == 1 || attMove.type_id == 3 || attMove.type_id == 4 || attMove.type_id == 10)
			a = 0.5;
	}
	else if (defPoke.type_id[0] == 7) { // bug
		// 2.0: 3 6 10
		//0.5: 2 5 12
		//0.0:
		if (attMove.type_id == 3 || attMove.type_id == 6 || attMove.type_id == 10)
			a = 2.0;
		else if (attMove.type_id == 2 || attMove.type_id == 5 || attMove.type_id == 12)
			a = 0.5;
	}
	else if (defPoke.type_id[0] == 8) { // ghost
		// 2.0: 8 17
		//0.5: 4 7
		//0.0: 1 2
		if (attMove.type_id == 8 || attMove.type_id == 17)
			a = 2.0;
		else if (attMove.type_id == 4 || attMove.type_id == 7)
			a = 0.5;
		else if (attMove.type_id == 1 || attMove.type_id == 2)
			a = 0.0;
	}
	else if (defPoke.type_id[0] == 9) { // steel
		// 2.0: 2 5 10
		//0.5: 1 3 6 7 9 12 14 15 16 18
		//0.0: 4
		if (attMove.type_id == 2 || attMove.type_id == 5 || attMove.type_id == 10)
			a = 2.0;
		else if (attMove.type_id == 1 || attMove.type_id == 3 || attMove.type_id == 6 || attMove.type_id == 7 || attMove.type_id == 9 || attMove.type_id == 12 || attMove.type_id == 14 || attMove.type_id == 15 || attMove.type_id == 16 || attMove.type_id == 18)
			a = 0.5;
		else if (attMove.type_id == 4)
			a = 0.0;
	}
	else if (defPoke.type_id[0] == 10) { // fire
		// 2.0: 5 6 11
		//0.5: 7 9 10 12 15 18
		//0.0:
		if (attMove.type_id == 5 || attMove.type_id == 6 || attMove.type_id == 11)
			a = 2.0;
		else if (attMove.type_id == 7 || attMove.type_id == 9 || attMove.type_id == 10 || attMove.type_id == 12 || attMove.type_id == 15 || attMove.type_id == 18)
			a = 0.5;
	}
	else if (defPoke.type_id[0] == 11) { // water
		// 2.0: 12 13
		//0.5: 9 10 11 15
		//0.0:
		if (attMove.type_id == 12 || attMove.type_id == 13)
			a = 2.0;
		else if (attMove.type_id == 9 || attMove.type_id == 10 || attMove.type_id == 11 || attMove.type_id == 15)
			a = 0.5;
	}
	else if (defPoke.type_id[0] == 12) { // grass
		// 2.0: 3 4 7 10 15
		//0.5: 5 11 12 13
		//0.0:
		if (attMove.type_id == 3 || attMove.type_id == 4 || attMove.type_id == 7 || attMove.type_id == 10 || attMove.type_id == 15)
			a = 2.0;
		else if (attMove.type_id == 5 || attMove.type_id == 11 || attMove.type_id == 12 || attMove.type_id == 13)
			a = 0.5;
	}
	else if (defPoke.type_id[0] == 13) { // electric
		// 2.0: 5
		//0.5: 3 9 13
		//0.0:
		if (attMove.type_id == 5)
			a = 2.0;
		else if (attMove.type_id == 3 || attMove.type_id == 9 || attMove.type_id == 13)
			a = 0.5;
	}
	else if (defPoke.type_id[0] == 14) { // psychic
		// 2.0: 7 8 17
		//0.5: 2 14
		//0.0:
		if (attMove.type_id == 7 || attMove.type_id == 8 || attMove.type_id == 17)
			a = 2.0;
		else if (attMove.type_id == 2 || attMove.type_id == 14)
			a = 0.5;
	}
	else if (defPoke.type_id[0] == 15) { // ice
		// 2.0: 2 6 9 10
		//0.5: 15
		//0.0:
		if (attMove.type_id == 2 || attMove.type_id == 6 || attMove.type_id == 9 || attMove.type_id == 10)
			a = 2.0;
		else if (attMove.type_id == 15)
			a = 0.5;
	}
	else if (defPoke.type_id[0] == 16) { // dragon
		// 2.0: 15 16 18
		//0.5: 10 11 12 13
		//0.0:
		if (attMove.type_id == 15 || attMove.type_id == 16 || attMove.type_id == 18)
			a = 2.0;
		else if (attMove.type_id == 10 || attMove.type_id == 11 || attMove.type_id == 12 || attMove.type_id == 13)
			a = 0.5;
	}
	else if (defPoke.type_id[0] == 17) { // dark
		// 2.0: 2 7 18
		//0.5: 8 17
		//0.0: 14
		if (attMove.type_id == 2 || attMove.type_id == 7 || attMove.type_id == 18)
			a = 2.0;
		else if (attMove.type_id == 8 || attMove.type_id == 17)
			a = 0.5;
		else if (attMove.type_id == 14)
			a = 0.0;
	}
	else if (defPoke.type_id[0] == 18) { // fairy
		// 2.0: 4 9
		//0.5: 2 7 17
		//0.0: 16
		if (attMove.type_id == 4 || attMove.type_id == 9)
			a = 2.0;
		else if (attMove.type_id == 2 || attMove.type_id == 7 || attMove.type_id == 17)
			a = 0.5;
		else if (attMove.type_id == 16)
			a = 0.0;
	}
	
	if (defPoke.type_id[1] == -1) {
		return a;
	}
	else if (defPoke.type_id[1] == 1) { // Normal type (see types.csv) 
		if (attMove.type_id == 2) // fighting
			return a * 2.0;
		else if (attMove.type_id == 8) // ghost
			return a * 0.0;
	}
	else if (defPoke.type_id[1] == 2) { // fighting
		if (attMove.type_id == 3 || attMove.type_id == 14 || attMove.type_id == 18) // flying psychic fairy
			return a * 2.0;
		else if (attMove.type_id == 6 || attMove.type_id == 7 || attMove.type_id == 17) // rock bug dark
			return a * 0.5;
	}
	else if (defPoke.type_id[1] == 3) { // flying
		if (attMove.type_id == 6 || attMove.type_id == 15 || attMove.type_id == 13) // rock electric ice
			return a * 2.0;
		else if (attMove.type_id == 2 || attMove.type_id == 7 || attMove.type_id == 12) // fighting bug grass
			return a * 0.5;
		else if (attMove.type_id == 5) // ground
			return a * 0.0;
	}
	else if (defPoke.type_id[1] == 4) { // poison
		// 2.0: 6 13 15
		//0.5: 2 4 7 12 18
		//0.0: 
		if (attMove.type_id == 5 || attMove.type_id == 14)
			return a * 2.0;
		else if (attMove.type_id == 2 || attMove.type_id == 4 || attMove.type_id == 7 || attMove.type_id == 12 || attMove.type_id == 18)
			return a * 0.5;
	}
	else if (defPoke.type_id[1] == 5) { // ground
		// 2.0: 11 12 15
		//0.5: 4 6
		//0.0: 13
		if (attMove.type_id == 11 || attMove.type_id == 12 || attMove.type_id == 15)
			return a * 2.0;
		else if (attMove.type_id == 4 || attMove.type_id == 6)
			return a * 0.5;
		else if (attMove.type_id == 13)
			return a * 0.0;
	}
	else if (defPoke.type_id[1] == 6) { // rock
		// 2.0: 2 5 9 11 12
		//0.5: 1 3 4 10
		//0.0:
		if (attMove.type_id == 2 || attMove.type_id == 5 || attMove.type_id == 9 || attMove.type_id == 11 || attMove.type_id == 12)
			return a * 2.0;
		else if (attMove.type_id == 1 || attMove.type_id == 3 || attMove.type_id == 4 || attMove.type_id == 10)
			return a * 0.5;
	}
	else if (defPoke.type_id[1] == 7) { // bug
		// 2.0: 3 6 10
		//0.5: 2 5 12
		//0.0:
		if (attMove.type_id == 3 || attMove.type_id == 6 || attMove.type_id == 10)
			return a * 2.0;
		else if (attMove.type_id == 2 || attMove.type_id == 5 || attMove.type_id == 12)
			return a * 0.5;
	}
	else if (defPoke.type_id[1] == 8) { // ghost
		// 2.0: 8 17
		//0.5: 4 7
		//0.0: 1 2
		if (attMove.type_id == 8 || attMove.type_id == 17)
			return a * 2.0;
		else if (attMove.type_id == 4 || attMove.type_id == 7)
			return a * 0.5;
		else if (attMove.type_id == 1 || attMove.type_id == 2)
			return a * 0.0;
	}
	else if (defPoke.type_id[1] == 9) { // steel
		// 2.0: 2 5 10
		//0.5: 1 3 6 7 9 12 14 15 16 18
		//0.0: 4
		if (attMove.type_id == 2 || attMove.type_id == 5 || attMove.type_id == 10)
			return a * 2.0;
		else if (attMove.type_id == 1 || attMove.type_id == 3 || attMove.type_id == 6 || attMove.type_id == 7 || attMove.type_id == 9 || attMove.type_id == 12 || attMove.type_id == 14 || attMove.type_id == 15 || attMove.type_id == 16 || attMove.type_id == 18)
			return a * 0.5;
		else if (attMove.type_id == 4)
			return a * 0.0;
	}
	else if (defPoke.type_id[1] == 10) { // fire
		// 2.0: 5 6 11
		//0.5: 7 9 10 12 15 18
		//0.0:
		if (attMove.type_id == 5 || attMove.type_id == 6 || attMove.type_id == 11)
			return a * 2.0;
		else if (attMove.type_id == 7 || attMove.type_id == 9 || attMove.type_id == 10 || attMove.type_id == 12 || attMove.type_id == 15 || attMove.type_id == 18)
			return a * 0.5;
	}
	else if (defPoke.type_id[1] == 11) { // water
		// 2.0: 12 13
		//0.5: 9 10 11 15
		//0.0:
		if (attMove.type_id == 12 || attMove.type_id == 13)
			return a * 2.0;
		else if (attMove.type_id == 9 || attMove.type_id == 10 || attMove.type_id == 11 || attMove.type_id == 15)
			return a * 0.5;
	}
	else if (defPoke.type_id[1] == 12) { // grass
		// 2.0: 3 4 7 10 15
		//0.5: 5 11 12 13
		//0.0:
		if (attMove.type_id == 3 || attMove.type_id == 4 || attMove.type_id == 7 || attMove.type_id == 10 || attMove.type_id == 15)
			return a * 2.0;
		else if (attMove.type_id == 5 || attMove.type_id == 11 || attMove.type_id == 12 || attMove.type_id == 13)
			return a * 0.5;
	}
	else if (defPoke.type_id[1] == 13) { // electric
		// 2.0: 5
		//0.5: 3 9 13
		//0.0:
		if (attMove.type_id == 5)
			return a * 2.0;
		else if (attMove.type_id == 3 || attMove.type_id == 9 || attMove.type_id == 13)
			return a * 0.5;
	}
	else if (defPoke.type_id[1] == 14) { // psychic
		// 2.0: 7 8 17
		//0.5: 2 14
		//0.0:
		if (attMove.type_id == 7 || attMove.type_id == 8 || attMove.type_id == 17)
			return a * 2.0;
		else if (attMove.type_id == 2 || attMove.type_id == 14)
			return a * 0.5;
	}
	else if (defPoke.type_id[1] == 15) { // ice
		// 2.0: 2 6 9 10
		//0.5: 15
		//0.0:
		if (attMove.type_id == 2 || attMove.type_id == 6 || attMove.type_id == 9 || attMove.type_id == 10)
			return a * 2.0;
		else if (attMove.type_id == 15)
			return a * 0.5;
	}
	else if (defPoke.type_id[1] == 16) { // dragon
		// 2.0: 15 16 18
		//0.5: 10 11 12 13
		//0.0:
		if (attMove.type_id == 15 || attMove.type_id == 16 || attMove.type_id == 18)
			return a * 2.0;
		else if (attMove.type_id == 10 || attMove.type_id == 11 || attMove.type_id == 12 || attMove.type_id == 13)
			return a * 0.5;
	}
	else if (defPoke.type_id[1] == 17) { // dark
		// 2.0: 2 7 18
		//0.5: 8 17
		//0.0: 14
		if (attMove.type_id == 2 || attMove.type_id == 7 || attMove.type_id == 18)
			return a * 2.0;
		else if (attMove.type_id == 8 || attMove.type_id == 17)
			return a * 0.5;
		else if (attMove.type_id == 14)
			return a * 0.0;
	}
	else if (defPoke.type_id[1] == 18) { // fairy
		// 2.0: 4 9
		//0.5: 2 7 17
		//0.0: 16
		if (attMove.type_id == 4 || attMove.type_id == 9)
			return a * 2.0;
		else if (attMove.type_id == 2 || attMove.type_id == 7 || attMove.type_id == 17)
			return a * 0.5;
		else if (attMove.type_id == 16)
			return a * 0.0;
	}
	
	
	return a;
}

void check_tallgrass(pair_t playerNewLoc) {
	if (world.cur_map->map[world.pc.pos[dim_y]][world.pc.pos[dim_x]] == ter_grass) { // checks to see if the pc is standing on tall grass
		//mvprintw(0, 0, "PC is in tall grass"); // for testing
		//refresh(); // for testing
		//Sleep(1);
		if (rand() % 10 == 0) { // after testing is over it should be rand() % 10 == 0
			create_pokemon_encounter();
		}
	}
}

void create_pokemon_encounter() {
	clear();
	
	fullPokemon trainerPokemon[6];
	trainerPokemon[0] = generate_pokemon();
	//int numPCPokemon;
	//int numPCPokemonLeft;
	int PCPokemonSelection = 0; // {0 - 5} cooresponds to what pokemon is currently on battlefield
	if (PC_Pokemon[0].hp <= 0 || PC_Pokemon[0].exists != 1) {
		PCPokemonSelection = 1;
		if (PC_Pokemon[1].hp <= 0 || PC_Pokemon[1].exists != 1) {
			PCPokemonSelection = 2;
			if (PC_Pokemon[2].hp <= 0 || PC_Pokemon[2].exists != 1) {
				PCPokemonSelection = 3;
				if (PC_Pokemon[3].hp <= 0 || PC_Pokemon[3].exists != 1) {
					PCPokemonSelection = 4;
					if (PC_Pokemon[4].hp <= 0 || PC_Pokemon[4].exists != 1) {
						PCPokemonSelection = 5;
						if (PC_Pokemon[5].hp <= 0 || PC_Pokemon[5].exists != 1) {
							clear();
							print_Battle_Box(const_cast<char*>("No Pokemon are alive, exiting battle"));
							return;
						}
					}
				}
			}
		}
	}
	
	int TrainerPokemonSelection = 0;
	
	for (int i = 1; i < 6; i++) {
		trainerPokemon[i].hp = 0;
	} // sets non existant pokemon's hp to 0 so they wont try to be pulled out by the summon ai.
	
	// TODO: set up numPCPokemon logic
	
	clear();
	print_Battle_Box_On_Death(const_cast<char*>(strcat2(strcat2(strcat2(trainerPokemon[0].pokemonType->identifier, "appears (lvl "), std::to_string(trainerPokemon[0].level).c_str()), ")")), findnumpokemon(trainerPokemon), findnumpokemonleft(trainerPokemon), findnumpokemon(PC_Pokemon), findnumpokemonleft(PC_Pokemon));
	print_Pokemon_Menu(PC_Pokemon, &PCPokemonSelection, &TrainerPokemonSelection, trainerPokemon, 1);
	
	clear();
	
	/*
	if (encounterPokemon.isShiny == 0) {
		mvprintw(0, 0, "You've encountered a non-shiny level %d wild %s", encounterPokemon.level, encounterPokemon.pokemonType->identifier);
	}
	else {
		mvprintw(0, 0, "You've encountered a shiny level %d wild %s", encounterPokemon.level, encounterPokemon.pokemonType->identifier);
	}
	
	if (encounterPokemon.pokemonMoveset[1].id == -1) {
		mvprintw(1, 0, "The wild %s knows %s", encounterPokemon.pokemonType->identifier, encounterPokemon.pokemonMoveset[0].identifier);
	}
	else {
		mvprintw(1, 0, "The wild %s knows %s and %s", encounterPokemon.pokemonType->identifier, encounterPokemon.pokemonMoveset[0].identifier, encounterPokemon.pokemonMoveset[1].identifier);
	}
	
	
	mvprintw(2, 0, "Base + IV HP: %d HP: %d", encounterPokemon.pokemonBaseStats[0], encounterPokemon.pokemonStats[0]);
	mvprintw(3, 0, "Base + IV Attack: %d Attack: %d", encounterPokemon.pokemonBaseStats[1], encounterPokemon.pokemonStats[1]);
	mvprintw(4, 0, "Base + IV Defence: %d Defence: %d", encounterPokemon.pokemonBaseStats[2], encounterPokemon.pokemonStats[2]);
	mvprintw(5, 0, "Base + IV Special-Attack: %d Special-Attack: %d", encounterPokemon.pokemonBaseStats[3], encounterPokemon.pokemonStats[3]);
	mvprintw(6, 0, "Base + IV Special-Defence: %d Special-Defence: %d", encounterPokemon.pokemonBaseStats[4], encounterPokemon.pokemonStats[4]);
	mvprintw(7, 0, "Base + IV Speed: %d Speed: %d", encounterPokemon.pokemonBaseStats[5], encounterPokemon.pokemonStats[5]);
	mvprintw(8, 0, "Base + IV Accuracy: %d Accuracy: %d", encounterPokemon.pokemonBaseStats[6], encounterPokemon.pokemonStats[6]);
	mvprintw(9, 0, "Base + IV Evasion: %d Evasion: %d", encounterPokemon.pokemonBaseStats[7], encounterPokemon.pokemonStats[7]);
	mvprintw(10, 0, "Height: %d Weight: %d", encounterPokemon.pokemonType->height, encounterPokemon.pokemonType->weight);
	
	if (encounterPokemon.gender == 1) {
		mvprintw(11, 0, "Gender: Male");
	}
	else {
		mvprintw(11, 0, "Gender: Female");
	}
	mvprintw(13, 0, "Pokemon ID: %d", encounterPokemon.pokemonType->species_id);
	
	mvprintw(15, 0, "Press ^ (Shift + 6) to exit the encounter");
	
	refresh();
	
	char userinput = getch();
	while('^' != userinput) {
		userinput = getch();
	}
	//clear();
	//refresh();
	*/
	
}

void level_up_pokemon(fullPokemon *leveledPokemon) { // NOTE: the pokemon's level should be changed before calling this function
	leveledPokemon->pokemonStats[0] = ((leveledPokemon->pokemonBaseStats[0] * 2 * leveledPokemon->level) / 100) + leveledPokemon->level + 10;
	
	for (int i = 1; i < 8; i++) {
		leveledPokemon->pokemonStats[i] = ((leveledPokemon->pokemonBaseStats[i] * 2 * leveledPokemon->level) / 100) + 5;
	}
}

fullPokemon generate_pokemon() {
	fullPokemon newPokemon;
	newPokemon.pokemonType = &pokemon[rand() % 1092 + 1]; // selects random pokemon
	
	newPokemon.exists = 1;
	
	int d = (abs(world.cur_idx[dim_x] - (WORLD_SIZE / 2)) + abs(world.cur_idx[dim_y] - (WORLD_SIZE / 2))); // distance
	
	if (d <= 200) {
		int tnum = d / 2;
		if (tnum == 0) {
			tnum = 1;
		}
		newPokemon.level = 1 + rand() % tnum;
	}
	else {
		newPokemon.level = ((d - 200) / 2) + rand() % (101 - ((d - 200) / 2));
		if (newPokemon.level == 0) {
			newPokemon.level = 1;
		}
		if (newPokemon.level > 100) { // unnecessary, just a precaution
			newPokemon.level = 100;
		}
	}
	
	move_db_t *tempmoveset = (move_db_t*) malloc(sizeof(move_db_t));
	int tempcount = 0;
	for (int i = 1; i < 528239; i++) { // grabs all moves that work with the new pokemon
		if (pokemon_moves[i].pokemon_id == newPokemon.pokemonType->species_id && pokemon_moves[i].pokemon_move_method_id == 1 && (newPokemon.level >= pokemon_moves[i].level || pokemon_moves[i].level <= 10)) { // STORAGE: && newPokemon.level >= pokemon_moves[i].level       <- stops pokemon from having moves that are above their level          && pokemon_moves[i].version_group_id == 19         <- level-up moveset
			int breaktrue = 0;
			for (int j = 0; j < tempcount; j++) {
				if (strcmp(tempmoveset->identifier, moves[pokemon_moves[i].move_id].identifier) == 0) {
					breaktrue = 1;
					break;
				}
			}
			
			if (breaktrue == 1) {
				break;
			}
			
			tempcount++;
			tempmoveset = (move_db_t*) realloc(tempmoveset, tempcount * sizeof(move_db_t));
			*(tempmoveset + (tempcount - 1)) = moves[pokemon_moves[i].move_id]; // move_id should matchup with the element id, however if it doesn't this is an error.
		}
	}
	
	if (tempcount != 0) {
		int temprand1 = rand() % tempcount;
		if (tempcount >= 1) {
			newPokemon.pokemonMoveset[0] = tempmoveset[temprand1];
		}
		int temprand2 = rand() % tempcount;
		if (tempcount >= 2) {
			while (temprand2 == temprand1) {
				temprand2 = rand() % tempcount;
			}
			newPokemon.pokemonMoveset[1] = tempmoveset[temprand2];
		}
		else {
			newPokemon.pokemonMoveset[1].id = -1;
		}
		/*
		int temprand3 = rand() % tempcount;
		if (tempcount >= 3) {
			while (temprand3 == temprand1 || temprand3 == temprand2) {
				temprand3 = rand() % tempcount;
			}
			newPokemon.pokemonMoveset[2] = *(tempmoveset + temprand3);
		}
		int temprand4 = rand() % tempcount;
		if (tempcount >= 4) {
			while (temprand4 == temprand1 || temprand4 == temprand2 || temprand4 == temprand3) {
				temprand4 = rand() % tempcount;
			}
			newPokemon.pokemonMoveset[3] = *(tempmoveset + temprand4);
		}
		*/
	}
	else { // If a pokemon is unable to learn anything they get splash. Why? Because it's funny.
		newPokemon.pokemonMoveset[0] = moves[150];
		newPokemon.pokemonMoveset[1].id = -1;
	}
	//free(tempmoveset);
	
	newPokemon.pokemonMoveset[2].id = -1;
	newPokemon.pokemonMoveset[3].id = -1;
	
	for (int j = 0; j < 8; j++) {
		for (int i = 1; i < 6553; i++) { // base stat generator
			if (pokemon_stats[i].pokemon_id > newPokemon.pokemonType->species_id) { // if this executes it means no stats were found
				newPokemon.pokemonBaseStats[j] = rand() % 16;
				break;
			}
			if (pokemon_stats[i].pokemon_id == newPokemon.pokemonType->species_id && (pokemon_stats[i].stat_id - 1) == j) {
				newPokemon.pokemonBaseStats[j] = pokemon_stats[i].base_stat + rand() % 16;
				break;
			}
		}
	}
	
	if (rand() % 8192 == 0) {
		newPokemon.isShiny = 1;
	}
	else {
		newPokemon.isShiny = 0;
	}
	
	newPokemon.gender = rand() % 2;
	
	level_up_pokemon(&newPokemon);
	
	newPokemon.hp = newPokemon.pokemonStats[0];
	
	newPokemon.type_id[0] = -1;
	newPokemon.type_id[1] = -1;
	for (int i = 0; i < 1676; i++) { // pokemon type grabbing
		if (pokemon_types[i].pokemon_id == newPokemon.pokemonType->species_id) {
			newPokemon.type_id[0] = pokemon_types[i].type_id;
			if (pokemon_types[i + 1].pokemon_id == newPokemon.pokemonType->species_id) {
				newPokemon.type_id[1] = pokemon_types[i + 1].type_id;
			}
			break;
		}
	}
	
	return newPokemon;
}

void battle_do_move(move_db_t PCMove, int isSwitchPC, fullPokemon *trainerPokemon, fullPokemon *PCPokemon, int *trainerPokemonSelection, int *PCPokemonSelection, int newSelectionPC, int isWild) { // updated version
	int numMovesTrainer = 0;
	for (int i = 0; i < 4; i++) { // counts number of moves of the trainer
		if (trainerPokemon[*trainerPokemonSelection].pokemonMoveset[i].id != -1) {
			++numMovesTrainer;
		}
	}
	int trMoveSel = rand() % numMovesTrainer;
	
	double critical;
	double STAB;
	int damage;
	double Type;
	
	
	if (isSwitchPC == 1) {
		char* tempchar = (char*) malloc(20 * sizeof(char));
		tempchar = strcpy(tempchar, "PC summons ");
		print_Battle_Box((char*)(strcat2(tempchar, (PCPokemon[newSelectionPC].pokemonType->identifier))));
		free(dest2);
		free(tempchar);
		*PCPokemonSelection = newSelectionPC;
		
		if (trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].accuracy > rand() % 100) { // Trainer move hits
			//critical;
			if (rand() % 256 < (trainerPokemon[*trainerPokemonSelection].pokemonBaseStats[5] / 2)) {
				critical = 1.5;
			}
			else {
				critical = 1.0;
			}
			
			(trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].type_id == trainerPokemon[*trainerPokemonSelection].type_id[0] || trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].type_id == trainerPokemon[*trainerPokemonSelection].type_id[1]) ? STAB = 1.5 : STAB = 1.0;
			Type = multiply_damage_by_type(trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel], PCPokemon[*PCPokemonSelection]);
			damage = (int)((((2.0 * trainerPokemon[*trainerPokemonSelection].level + 2.0) * trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].power * ((double)trainerPokemon[*trainerPokemonSelection].pokemonStats[1] / trainerPokemon[*trainerPokemonSelection].pokemonStats[2])) / 50.0 + 2.0) * critical * (rand() % 16 + 85.0) * STAB * Type / 100);
			if (critical == 1.5) {
				if (Type == 2.0) {
					mvprintw(22, 0, "|   The attack was super effective!                                            |");
				}
				else if (Type == 0.5) {
					mvprintw(22, 0, "|   The attack was not very effective.                                         |");
				}
				else if (Type == 0.0) {
					mvprintw(22, 0, "|   The attack had no effect!                                                  |");
				}
				else if (Type == 1.0) {
					mvprintw(22, 0, "|                                                                              |");
				}
				print_Battle_Box2(const_cast<char*>(strcat2(strcat2(strcat2(strcat2(strcat2((trainerPokemon[*trainerPokemonSelection].pokemonType->identifier), " used "), (trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].identifier)), ", it did "), std::to_string(damage).c_str()), " damage (critical hit)")));
				free(dest2);
			}
			else {
				if (Type == 2.0) {
					mvprintw(22, 0, "|   The attack was super effective!                                            |");
				}
				else if (Type == 0.5) {
					mvprintw(22, 0, "|   The attack was not very effective.                                         |");
				}
				else if (Type == 0.0) {
					mvprintw(22, 0, "|   The attack had no effect!                                                  |");
				}
				else if (Type == 1.0) {
					mvprintw(22, 0, "|                                                                              |");
				}
				print_Battle_Box2(const_cast<char*>(strcat2(strcat2(strcat2(strcat2(strcat2((trainerPokemon[*trainerPokemonSelection].pokemonType->identifier), " used "), (trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].identifier)), ", it did "), std::to_string(damage).c_str()), " damage")));
				free(dest2);
			}
			PCPokemon[*PCPokemonSelection].hp = PCPokemon[*PCPokemonSelection].hp - damage;
			if (PCPokemon[*PCPokemonSelection].hp <= 0) {
				PCPokemon[*PCPokemonSelection].hp = 0;
				if ((PCPokemon[0].exists != 1 || PCPokemon[0].hp == 0) && (PCPokemon[1].exists != 1 || PCPokemon[1].hp == 0) && (PCPokemon[2].exists != 1 || PCPokemon[2].hp == 0) && (PCPokemon[3].exists != 1 || PCPokemon[3].hp == 0) && (PCPokemon[4].exists != 1 || PCPokemon[4].hp == 0) && (PCPokemon[5].exists != 1 || PCPokemon[5].hp == 0)) { // end battle scenario.
					print_Battle_Box(const_cast<char*>("You Lost!"));
					return;
				}
				else {
					int optionselected = 0;
					mvprintw(19, 0, " ______________________________________________________________________________ ");
					mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', PCPokemon[0].hp != 0 ? PCPokemon[0].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', PCPokemon[1].hp != 0 ? PCPokemon[1].pokemonType->identifier : " ");
					mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', PCPokemon[2].hp != 0 ? PCPokemon[2].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', PCPokemon[3].hp != 0 ? PCPokemon[3].pokemonType->identifier : " ");
					mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', PCPokemon[4].hp != 0 ? PCPokemon[4].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', PCPokemon[5].hp != 0 ? PCPokemon[5].pokemonType->identifier : " ");
					mvprintw(23, 0, "|______________________________________________________________________________|");
					refresh();
					
					while (true) { // switch menu TODO: show pp for the moves
						char userinput = getch();
						if (optionselected == 0 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 4;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 2;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 1;
							}
						}
						else if (optionselected == 1 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 5;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 3;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 0;
							}
						}
						else if (optionselected == 2 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 0;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 4;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 3;
							}
						}
						else if (optionselected == 3 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 1;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 5;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 2;
							}
						}
						else if (optionselected == 4 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 2;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 0;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 5;
							}
						}
						else if (optionselected == 5 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 3;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 1;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 4;
							}
						}
						else if (optionselected == 0 && userinput == '\n' && PCPokemon[0].hp != 0 && PCPokemonSelection != 0) {
							*PCPokemonSelection = 0;
							break;
						}
						else if (optionselected == 1 && userinput == '\n' && PCPokemon[1].hp != 0 && *PCPokemonSelection != 1) {
							*PCPokemonSelection = 1;
							break;
						}
						else if (optionselected == 2 && userinput == '\n' && PCPokemon[2].hp != 0 && *PCPokemonSelection != 2) {
							*PCPokemonSelection = 2;
							break;
						}
						else if (optionselected == 3 && userinput == '\n' && PCPokemon[3].hp != 0 && *PCPokemonSelection != 3) {
							*PCPokemonSelection = 3;
							break;
						}
						else if (optionselected == 4 && userinput == '\n' && PCPokemon[4].hp != 0 && *PCPokemonSelection != 4) {
							*PCPokemonSelection = 4;
							break;
						}
						else if (optionselected == 5 && userinput == '\n' && PCPokemon[5].hp != 0 && *PCPokemonSelection != 5) {
							*PCPokemonSelection = 5;
							break;
						}
						/*
						else if ((int)userinput == 7) { // backspace
							mvprintw(19, 0, " ______________________________________________________________________________ ");
							mvprintw(20, 0, "|    FIGHT                                                         >POKEMON    |");
							mvprintw(21, 0, "|    PACK                                                           RUN        |");
							mvprintw(22, 0, "|                                                                              |");
							mvprintw(23, 0, "|______________________________________________________________________________|");
							optionselected = 1;
							refresh();
							break;
						}
						*/
						
						mvprintw(19, 0, " ______________________________________________________________________________ ");
						mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', PCPokemon[0].hp != 0 ? PCPokemon[0].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', PCPokemon[1].hp != 0 ? PCPokemon[1].pokemonType->identifier : " ");
						mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', PCPokemon[2].hp != 0 ? PCPokemon[2].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', PCPokemon[3].hp != 0 ? PCPokemon[3].pokemonType->identifier : " ");
						mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', PCPokemon[4].hp != 0 ? PCPokemon[4].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', PCPokemon[5].hp != 0 ? PCPokemon[5].pokemonType->identifier : " ");
						mvprintw(23, 0, "|______________________________________________________________________________|");
						refresh();
					}
					
					print_Pokemon_Menu(PCPokemon, PCPokemonSelection, trainerPokemonSelection, trainerPokemon, isWild);
					return;
				}
			}
			else {
				//TODO: show PC Pokemon HP drain on screen.
			}
		}
		else {
			print_Battle_Box(const_cast<char*>(strcat2((trainerPokemon[*trainerPokemonSelection].pokemonType->identifier), " missed")));
		}
		
		print_Pokemon_Menu(PCPokemon, PCPokemonSelection, trainerPokemonSelection, trainerPokemon, isWild);
	}
	
	if (PCMove.priority >= trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].priority) { // PC goes first
		if (PCMove.accuracy > rand() % 100) { // PC move hits
			//double critical;
			if (rand() % 256 < (PCPokemon[*PCPokemonSelection].pokemonBaseStats[5] / 2)) {
				critical = 1.5;
			}
			else {
				critical = 1.0;
			}
			//double STAB;
			(PCMove.type_id == PCPokemon[*PCPokemonSelection].type_id[0] || PCMove.type_id == PCPokemon[*PCPokemonSelection].type_id[1]) ? STAB = 1.5 : STAB = 1.0;
			Type = multiply_damage_by_type(PCMove, trainerPokemon[*trainerPokemonSelection]);
			damage = (int)((((2.0 * PCPokemon[*PCPokemonSelection].level + 2.0) * PCMove.power * ((double)PCPokemon[*PCPokemonSelection].pokemonStats[1] / PCPokemon[*PCPokemonSelection].pokemonStats[2])) / 50.0 + 2.0) * critical * (rand() % 16 + 85.0) * STAB * Type / 100);
			if (critical == 1.5) {
				if (Type == 2.0) {
					mvprintw(22, 0, "|   The attack was super effective!                                            |");
				}
				else if (Type == 0.5) {
					mvprintw(22, 0, "|   The attack was not very effective.                                         |");
				}
				else if (Type == 0.0) {
					mvprintw(22, 0, "|   The attack had no effect!                                                  |");
				}
				else if (Type == 1.0) {
					mvprintw(22, 0, "|                                                                              |");
				}
				print_Battle_Box2(const_cast<char*>(strcat2(strcat2(strcat2(strcat2(strcat2((PCPokemon[*PCPokemonSelection].pokemonType->identifier), " used "), (PCMove.identifier)), ", it did "), std::to_string(damage).c_str()), " damage (critical hit)")));
				free(dest2);
			}
			else {
				if (Type == 2.0) {
					mvprintw(22, 0, "|   The attack was super effective!                                            |");
				}
				else if (Type == 0.5) {
					mvprintw(22, 0, "|   The attack was not very effective.                                         |");
				}
				else if (Type == 0.0) {
					mvprintw(22, 0, "|   The attack had no effect!                                                  |");
				}
				else if (Type == 1.0) {
					mvprintw(22, 0, "|                                                                              |");
				}
				print_Battle_Box2(const_cast<char*>(strcat2(strcat2(strcat2(strcat2(strcat2((PCPokemon[*PCPokemonSelection].pokemonType->identifier), " used "), (PCMove.identifier)), ", it did "), std::to_string(damage).c_str()), " damage")));
				free(dest2);
			}
			trainerPokemon[*trainerPokemonSelection].hp = trainerPokemon[*trainerPokemonSelection].hp - damage;
			if (trainerPokemon[*trainerPokemonSelection].hp <= 0) {
				trainerPokemon[*trainerPokemonSelection].hp = 0;
				if (*trainerPokemonSelection == 5 || trainerPokemon[*trainerPokemonSelection + 1].hp == 0) { // end battle scenario
					print_Battle_Box(const_cast<char*>("You Won!"));
					pokeBucks = pokeBucks + rand() % 100;
					clear();
					return;
				}
				else { // change to new pokemon
					*trainerPokemonSelection = *trainerPokemonSelection + 1;
					print_Battle_Box_On_Death(const_cast<char*>(strcat2((trainerPokemon[*trainerPokemonSelection - 1].pokemonType->identifier), "has fainted")), findnumpokemon(trainerPokemon), findnumpokemonleft(trainerPokemon), findnumpokemon(PCPokemon), findnumpokemonleft(PCPokemon));
					free(dest2);
					char* tempchar = (char*) malloc(20 * sizeof(char));
					tempchar = strcpy(tempchar, "Trainer summons ");
					print_Battle_Box_On_Death((char*)(strcat2(tempchar, (trainerPokemon[*trainerPokemonSelection].pokemonType->identifier))), findnumpokemon(trainerPokemon), findnumpokemonleft(trainerPokemon), findnumpokemon(PCPokemon), findnumpokemonleft(PCPokemon));
					free(dest2);
					free(tempchar);
					// trainer doesn't get a turn this round.
					print_Pokemon_Menu(PCPokemon, PCPokemonSelection, trainerPokemonSelection, trainerPokemon, isWild);
					return;
				}
			}
		}
		else {
			print_Battle_Box(const_cast<char*>(strcat2((PCPokemon[*PCPokemonSelection].pokemonType->identifier), " missed")));
			free(dest2);
		}
		
		if (trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].accuracy > rand() % 100) { // Trainer move hits
			//critical;
			if (rand() % 256 < (trainerPokemon[*trainerPokemonSelection].pokemonBaseStats[5] / 2)) {
				critical = 1.5;
			}
			else {
				critical = 1.0;
			}
			
			(trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].type_id == trainerPokemon[*trainerPokemonSelection].type_id[0] || trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].type_id == trainerPokemon[*trainerPokemonSelection].type_id[1]) ? STAB = 1.5 : STAB = 1.0;
			Type = multiply_damage_by_type(trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel], PCPokemon[*PCPokemonSelection]);
			damage = (int)((((2.0 * trainerPokemon[*trainerPokemonSelection].level + 2.0) * trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].power * ((double)trainerPokemon[*trainerPokemonSelection].pokemonStats[1] / trainerPokemon[*trainerPokemonSelection].pokemonStats[2])) / 50.0 + 2.0) * critical * (rand() % 16 + 85.0) * STAB * Type / 100);
			if (critical == 1.5) {
				if (Type == 2.0) {
					mvprintw(22, 0, "|   The attack was super effective!                                            |");
				}
				else if (Type == 0.5) {
					mvprintw(22, 0, "|   The attack was not very effective.                                         |");
				}
				else if (Type == 0.0) {
					mvprintw(22, 0, "|   The attack had no effect!                                                  |");
				}
				else if (Type == 1.0) {
					mvprintw(22, 0, "|                                                                              |");
				}
				print_Battle_Box2(const_cast<char*>(strcat2(strcat2(strcat2(strcat2(strcat2((trainerPokemon[*trainerPokemonSelection].pokemonType->identifier), " used "), (trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].identifier)), ", it did "), std::to_string(damage).c_str()), " damage (critical hit)")));
				free(dest2);
			}
			else {
				if (Type == 2.0) {
					mvprintw(22, 0, "|   The attack was super effective!                                            |");
				}
				else if (Type == 0.5) {
					mvprintw(22, 0, "|   The attack was not very effective.                                         |");
				}
				else if (Type == 0.0) {
					mvprintw(22, 0, "|   The attack had no effect!                                                  |");
				}
				else if (Type == 1.0) {
					mvprintw(22, 0, "|                                                                              |");
				}
				print_Battle_Box2(const_cast<char*>(strcat2(strcat2(strcat2(strcat2(strcat2((trainerPokemon[*trainerPokemonSelection].pokemonType->identifier), " used "), (trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].identifier)), ", it did "), std::to_string(damage).c_str()), " damage")));
				free(dest2);
			}
			PCPokemon[*PCPokemonSelection].hp = PCPokemon[*PCPokemonSelection].hp - damage;
			if (PCPokemon[*PCPokemonSelection].hp <= 0) {
				PCPokemon[*PCPokemonSelection].hp = 0;
				if ((PCPokemon[0].exists != 1 || PCPokemon[0].hp == 0) && (PCPokemon[1].exists != 1 || PCPokemon[1].hp == 0) && (PCPokemon[2].exists != 1 || PCPokemon[2].hp == 0) && (PCPokemon[3].exists != 1 || PCPokemon[3].hp == 0) && (PCPokemon[4].exists != 1 || PCPokemon[4].hp == 0) && (PCPokemon[5].exists != 1 || PCPokemon[5].hp == 0)) { // end battle scenario.
					print_Battle_Box(const_cast<char*>("You Lost!"));
					return;
				}
				else {
					int optionselected = 0;
					mvprintw(19, 0, " ______________________________________________________________________________ ");
					mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', PCPokemon[0].hp != 0 ? PCPokemon[0].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', PCPokemon[1].hp != 0 ? PCPokemon[1].pokemonType->identifier : " ");
					mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', PCPokemon[2].hp != 0 ? PCPokemon[2].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', PCPokemon[3].hp != 0 ? PCPokemon[3].pokemonType->identifier : " ");
					mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', PCPokemon[4].hp != 0 ? PCPokemon[4].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', PCPokemon[5].hp != 0 ? PCPokemon[5].pokemonType->identifier : " ");
					mvprintw(23, 0, "|______________________________________________________________________________|");
					refresh();
					
					while (true) { // switch menu TODO: show pp for the moves
						char userinput = getch();
						if (optionselected == 0 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 4;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 2;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 1;
							}
						}
						else if (optionselected == 1 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 5;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 3;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 0;
							}
						}
						else if (optionselected == 2 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 0;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 4;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 3;
							}
						}
						else if (optionselected == 3 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 1;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 5;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 2;
							}
						}
						else if (optionselected == 4 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 2;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 0;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 5;
							}
						}
						else if (optionselected == 5 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 3;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 1;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 4;
							}
						}
						else if (optionselected == 0 && userinput == '\n' && PCPokemon[0].hp != 0 && PCPokemonSelection != 0) {
							*PCPokemonSelection = 0;
							break;
						}
						else if (optionselected == 1 && userinput == '\n' && PCPokemon[1].hp != 0 && *PCPokemonSelection != 1) {
							*PCPokemonSelection = 1;
							break;
						}
						else if (optionselected == 2 && userinput == '\n' && PCPokemon[2].hp != 0 && *PCPokemonSelection != 2) {
							*PCPokemonSelection = 2;
							break;
						}
						else if (optionselected == 3 && userinput == '\n' && PCPokemon[3].hp != 0 && *PCPokemonSelection != 3) {
							*PCPokemonSelection = 3;
							break;
						}
						else if (optionselected == 4 && userinput == '\n' && PCPokemon[4].hp != 0 && *PCPokemonSelection != 4) {
							*PCPokemonSelection = 4;
							break;
						}
						else if (optionselected == 5 && userinput == '\n' && PCPokemon[5].hp != 0 && *PCPokemonSelection != 5) {
							*PCPokemonSelection = 5;
							break;
						}
						/*
						else if ((int)userinput == 7) { // backspace
							mvprintw(19, 0, " ______________________________________________________________________________ ");
							mvprintw(20, 0, "|    FIGHT                                                         >POKEMON    |");
							mvprintw(21, 0, "|    PACK                                                           RUN        |");
							mvprintw(22, 0, "|                                                                              |");
							mvprintw(23, 0, "|______________________________________________________________________________|");
							optionselected = 1;
							refresh();
							break;
						}
						*/
						
						mvprintw(19, 0, " ______________________________________________________________________________ ");
						mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', PCPokemon[0].hp != 0 ? PCPokemon[0].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', PCPokemon[1].hp != 0 ? PCPokemon[1].pokemonType->identifier : " ");
						mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', PCPokemon[2].hp != 0 ? PCPokemon[2].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', PCPokemon[3].hp != 0 ? PCPokemon[3].pokemonType->identifier : " ");
						mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', PCPokemon[4].hp != 0 ? PCPokemon[4].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', PCPokemon[5].hp != 0 ? PCPokemon[5].pokemonType->identifier : " ");
						mvprintw(23, 0, "|______________________________________________________________________________|");
						refresh();
					}
					
					print_Pokemon_Menu(PCPokemon, PCPokemonSelection, trainerPokemonSelection, trainerPokemon, isWild);
					return;
				}
			}
			else {
				//TODO: show PC Pokemon HP drain on screen.
			}
		}
		else {
			print_Battle_Box(const_cast<char*>(strcat2((trainerPokemon[*trainerPokemonSelection].pokemonType->identifier), " missed")));
			free(dest2);
		}
		
		print_Pokemon_Menu(PCPokemon, PCPokemonSelection, trainerPokemonSelection, trainerPokemon, isWild);
	}
	else {
		if (trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].accuracy > rand() % 100) { // Trainer move hits
			//critical;
			if (rand() % 256 < (trainerPokemon[*trainerPokemonSelection].pokemonBaseStats[5] / 2)) {
				critical = 1.5;
			}
			else {
				critical = 1.0;
			}
			
			(trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].type_id == trainerPokemon[*trainerPokemonSelection].type_id[0] || trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].type_id == trainerPokemon[*trainerPokemonSelection].type_id[1]) ? STAB = 1.5 : STAB = 1.0;
			Type = multiply_damage_by_type(trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel], PCPokemon[*PCPokemonSelection]);
			damage = (int)((((2.0 * trainerPokemon[*trainerPokemonSelection].level + 2.0) * trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].power * ((double)trainerPokemon[*trainerPokemonSelection].pokemonStats[1] / trainerPokemon[*trainerPokemonSelection].pokemonStats[2])) / 50.0 + 2.0) * critical * (rand() % 16 + 85.0) * STAB * Type / 100);
			if (critical == 1.5) {
				if (Type == 2.0) {
					mvprintw(22, 0, "|   The attack was super effective!                                            |");
				}
				else if (Type == 0.5) {
					mvprintw(22, 0, "|   The attack was not very effective.                                         |");
				}
				else if (Type == 0.0) {
					mvprintw(22, 0, "|   The attack had no effect!                                                  |");
				}
				else if (Type == 1.0) {
					mvprintw(22, 0, "|                                                                              |");
				}
				print_Battle_Box2(const_cast<char*>(strcat2(strcat2(strcat2(strcat2(strcat2((trainerPokemon[*trainerPokemonSelection].pokemonType->identifier), " used "), (trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].identifier)), ", it did "), std::to_string(damage).c_str()), " damage (critical hit)")));
				free(dest2);
			}
			else {
				if (Type == 2.0) {
					mvprintw(22, 0, "|   The attack was super effective!                                            |");
				}
				else if (Type == 0.5) {
					mvprintw(22, 0, "|   The attack was not very effective.                                         |");
				}
				else if (Type == 0.0) {
					mvprintw(22, 0, "|   The attack had no effect!                                                  |");
				}
				else if (Type == 1.0) {
					mvprintw(22, 0, "|                                                                              |");
				}
				print_Battle_Box2(const_cast<char*>(strcat2(strcat2(strcat2(strcat2(strcat2((trainerPokemon[*trainerPokemonSelection].pokemonType->identifier), " used "), (trainerPokemon[*trainerPokemonSelection].pokemonMoveset[trMoveSel].identifier)), ", it did "), std::to_string(damage).c_str()), " damage")));
				free(dest2);
			}
			PCPokemon[*PCPokemonSelection].hp = PCPokemon[*PCPokemonSelection].hp - damage;
			if (PCPokemon[*PCPokemonSelection].hp <= 0) {
				PCPokemon[*PCPokemonSelection].hp = 0;
				if ((PCPokemon[0].exists != 1 || PCPokemon[0].hp == 0) && (PCPokemon[1].exists != 1 || PCPokemon[1].hp == 0) && (PCPokemon[2].exists != 1 || PCPokemon[2].hp == 0) && (PCPokemon[3].exists != 1 || PCPokemon[3].hp == 0) && (PCPokemon[4].exists != 1 || PCPokemon[4].hp == 0) && (PCPokemon[5].exists != 1 || PCPokemon[5].hp == 0)) { // end battle scenario.
					print_Battle_Box(const_cast<char*>("You Lost!"));
					return;
				}
				else {
					
					int optionselected = 0;
					mvprintw(19, 0, " ______________________________________________________________________________ ");
					mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', PCPokemon[0].hp != 0 ? PCPokemon[0].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', PCPokemon[1].hp != 0 ? PCPokemon[1].pokemonType->identifier : " ");
					mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', PCPokemon[2].hp != 0 ? PCPokemon[2].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', PCPokemon[3].hp != 0 ? PCPokemon[3].pokemonType->identifier : " ");
					mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', PCPokemon[4].hp != 0 ? PCPokemon[4].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', PCPokemon[5].hp != 0 ? PCPokemon[5].pokemonType->identifier : " ");
					mvprintw(23, 0, "|______________________________________________________________________________|");
					refresh();
					
					while (true) { // switch menu TODO: show pp for the moves
						char userinput = getch();
						if (optionselected == 0 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 4;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 2;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 1;
							}
						}
						else if (optionselected == 1 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 5;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 3;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 0;
							}
						}
						else if (optionselected == 2 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 0;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 4;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 3;
							}
						}
						else if (optionselected == 3 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 1;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 5;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 2;
							}
						}
						else if (optionselected == 4 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 2;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 0;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 5;
							}
						}
						else if (optionselected == 5 && userinput != '\n' && (int)userinput != 7) {
							if ((int)userinput == 3 || userinput == 'i') { // up
								optionselected = 3;
							}
							else if ((int)userinput == 2 || userinput == 'k') { // down
								optionselected = 1;
							}
							else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
								optionselected = 4;
							}
						}
						else if (optionselected == 0 && userinput == '\n' && PCPokemon[0].hp != 0 && PCPokemonSelection != 0) {
							*PCPokemonSelection = 0;
							break;
						}
						else if (optionselected == 1 && userinput == '\n' && PCPokemon[1].hp != 0 && *PCPokemonSelection != 1) {
							*PCPokemonSelection = 1;
							break;
						}
						else if (optionselected == 2 && userinput == '\n' && PCPokemon[2].hp != 0 && *PCPokemonSelection != 2) {
							*PCPokemonSelection = 2;
							break;
						}
						else if (optionselected == 3 && userinput == '\n' && PCPokemon[3].hp != 0 && *PCPokemonSelection != 3) {
							*PCPokemonSelection = 3;
							break;
						}
						else if (optionselected == 4 && userinput == '\n' && PCPokemon[4].hp != 0 && *PCPokemonSelection != 4) {
							*PCPokemonSelection = 4;
							break;
						}
						else if (optionselected == 5 && userinput == '\n' && PCPokemon[5].hp != 0 && *PCPokemonSelection != 5) {
							*PCPokemonSelection = 5;
							break;
						}
						/*
						else if ((int)userinput == 7) { // backspace
							mvprintw(19, 0, " ______________________________________________________________________________ ");
							mvprintw(20, 0, "|    FIGHT                                                         >POKEMON    |");
							mvprintw(21, 0, "|    PACK                                                           RUN        |");
							mvprintw(22, 0, "|                                                                              |");
							mvprintw(23, 0, "|______________________________________________________________________________|");
							optionselected = 1;
							refresh();
							break;
						}
						*/
						
						mvprintw(19, 0, " ______________________________________________________________________________ ");
						mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', PCPokemon[0].hp != 0 ? PCPokemon[0].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', PCPokemon[1].hp != 0 ? PCPokemon[1].pokemonType->identifier : " ");
						mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', PCPokemon[2].hp != 0 ? PCPokemon[2].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', PCPokemon[3].hp != 0 ? PCPokemon[3].pokemonType->identifier : " ");
						mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', PCPokemon[4].hp != 0 ? PCPokemon[4].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', PCPokemon[5].hp != 0 ? PCPokemon[5].pokemonType->identifier : " ");
						mvprintw(23, 0, "|______________________________________________________________________________|");
						refresh();
					}
					
					print_Pokemon_Menu(PCPokemon, PCPokemonSelection, trainerPokemonSelection, trainerPokemon, isWild);
					return;
				}
			}
			else {
				//TODO: show PC Pokemon HP drain on screen.
			}
		}
		else {
			print_Battle_Box(const_cast<char*>(strcat2((trainerPokemon[*trainerPokemonSelection].pokemonType->identifier), " missed")));
			free(dest2);
		}
		
		if (PCMove.accuracy > rand() % 100) { // PC move hits
			//double critical;
			if (rand() % 256 < (PCPokemon[*PCPokemonSelection].pokemonBaseStats[5] / 2)) {
				critical = 1.5;
			}
			else {
				critical = 1.0;
			}
			//double STAB;
			(PCMove.type_id == PCPokemon[*PCPokemonSelection].type_id[0] || PCMove.type_id == PCPokemon[*PCPokemonSelection].type_id[1]) ? STAB = 1.5 : STAB = 1.0;
			Type = multiply_damage_by_type(PCMove, trainerPokemon[*trainerPokemonSelection]);
			damage = (int)((((2.0 * PCPokemon[*PCPokemonSelection].level + 2.0) * PCMove.power * ((double)PCPokemon[*PCPokemonSelection].pokemonStats[1] / PCPokemon[*PCPokemonSelection].pokemonStats[2])) / 50.0 + 2.0) * critical * (rand() % 16 + 85.0) * STAB * Type / 100);
			if (critical == 1.5) {
				if (Type == 2.0) {
					mvprintw(22, 0, "|   The attack was super effective!                                            |");
				}
				else if (Type == 0.5) {
					mvprintw(22, 0, "|   The attack was not very effective.                                         |");
				}
				else if (Type == 0.0) {
					mvprintw(22, 0, "|   The attack had no effect!                                                  |");
				}
				else if (Type == 1.0) {
					mvprintw(22, 0, "|                                                                              |");
				}
				print_Battle_Box2(const_cast<char*>(strcat2(strcat2(strcat2(strcat2(strcat2((PCPokemon[*PCPokemonSelection].pokemonType->identifier), " used "), (PCMove.identifier)), ", it did "), std::to_string(damage).c_str()), " damage (critical hit)")));
				free(dest2);
			}
			else {
				if (Type == 2.0) {
					mvprintw(22, 0, "|   The attack was super effective!                                            |");
				}
				else if (Type == 0.5) {
					mvprintw(22, 0, "|   The attack was not very effective.                                         |");
				}
				else if (Type == 0.0) {
					mvprintw(22, 0, "|   The attack had no effect!                                                  |");
				}
				else if (Type == 1.0) {
					mvprintw(22, 0, "|                                                                              |");
				}
				print_Battle_Box2(const_cast<char*>(strcat2(strcat2(strcat2(strcat2(strcat2((PCPokemon[*PCPokemonSelection].pokemonType->identifier), " used "), (PCMove.identifier)), ", it did "), std::to_string(damage).c_str()), " damage")));
				free(dest2);
			}
			trainerPokemon[*trainerPokemonSelection].hp = trainerPokemon[*trainerPokemonSelection].hp - damage;
			if (trainerPokemon[*trainerPokemonSelection].hp <= 0) {
				trainerPokemon[*trainerPokemonSelection].hp = 0;
				if (*trainerPokemonSelection == 5 || trainerPokemon[*trainerPokemonSelection + 1].hp == 0) { // end battle scenario
					print_Battle_Box(const_cast<char*>("You Won!"));
					pokeBucks = pokeBucks + rand() % 100;
					clear();
					return;
				}
				else { // change to new pokemon
					*trainerPokemonSelection = *trainerPokemonSelection + 1;
					
					
					print_Battle_Box_On_Death(const_cast<char*>(strcat2((trainerPokemon[*trainerPokemonSelection - 1].pokemonType->identifier), "has fainted")), findnumpokemon(trainerPokemon), findnumpokemonleft(trainerPokemon), findnumpokemon(PCPokemon), findnumpokemonleft(PCPokemon));
					free(dest2);
					char* tempchar = (char*) malloc(20 * sizeof(char));
					tempchar = strcpy(tempchar, "Trainer summons ");
					print_Battle_Box_On_Death((char*)(strcat2(tempchar, (trainerPokemon[*trainerPokemonSelection].pokemonType->identifier))), findnumpokemon(trainerPokemon), findnumpokemonleft(trainerPokemon), findnumpokemon(PCPokemon), findnumpokemonleft(PCPokemon));
					free(dest2);
					free(tempchar);
					// trainer doesn't get a turn this round.
					print_Pokemon_Menu(PCPokemon, PCPokemonSelection, trainerPokemonSelection, trainerPokemon, isWild);
					return;
				}
			}
		}
		else {
			print_Battle_Box(const_cast<char*>(strcat2((PCPokemon[*PCPokemonSelection].pokemonType->identifier), " missed")));
			free(dest2);
		}
		
		print_Pokemon_Menu(PCPokemon, PCPokemonSelection, trainerPokemonSelection, trainerPokemon, isWild);
	}
}

void print_Battle_Box_On_Death(char* inp, int numTrainerPokemon, int numTrainerPokemonLeft, int numPCPokemon, int numPCPokemonLeft) { // prints the bottom box for a battle after a poke death, or at the very beginning
	clear();
	if (numTrainerPokemon == 1 && numTrainerPokemonLeft == 1) {
		mvprintw(1, 0, "\\_O___________");
	}
	else if (numTrainerPokemon == 2 && numTrainerPokemonLeft == 1) {
		mvprintw(1, 0, "\\_O_X_________");
	}
	else if (numTrainerPokemon == 2 && numTrainerPokemonLeft == 2) {
		mvprintw(1, 0, "\\_O_O_________");
	}
	else if (numTrainerPokemon == 3 && numTrainerPokemonLeft == 1) {
		mvprintw(1, 0, "\\_O_X_X_______");
	}
	else if (numTrainerPokemon == 3 && numTrainerPokemonLeft == 2) {
		mvprintw(1, 0, "\\_O_O_X_______");
	}
	else if (numTrainerPokemon == 3 && numTrainerPokemonLeft == 3) {
		mvprintw(1, 0, "\\_O_O_O_______");
	}
	else if (numTrainerPokemon == 4 && numTrainerPokemonLeft == 1) {
		mvprintw(1, 0, "\\_O_X_X_X_____");
	}
	else if (numTrainerPokemon == 4 && numTrainerPokemonLeft == 2) {
		mvprintw(1, 0, "\\_O_O_X_X_____");
	}
	else if (numTrainerPokemon == 4 && numTrainerPokemonLeft == 3) {
		mvprintw(1, 0, "\\_O_O_O_X_____");
	}
	else if (numTrainerPokemon == 4 && numTrainerPokemonLeft == 4) {
		mvprintw(1, 0, "\\_O_O_O_O_____");
	}
	else if (numTrainerPokemon == 5 && numTrainerPokemonLeft == 1) {
		mvprintw(1, 0, "\\_O_X_X_X_X___");
	}
	else if (numTrainerPokemon == 5 && numTrainerPokemonLeft == 2) {
		mvprintw(1, 0, "\\_O_O_X_X_X___");
	}
	else if (numTrainerPokemon == 5 && numTrainerPokemonLeft == 3) {
		mvprintw(1, 0, "\\_O_O_O_X_X___");
	}
	else if (numTrainerPokemon == 5 && numTrainerPokemonLeft == 4) {
		mvprintw(1, 0, "\\_O_O_O_O_X___");
	}
	else if (numTrainerPokemon == 5 && numTrainerPokemonLeft == 5) {
		mvprintw(1, 0, "\\_O_O_O_O_O___");
	}
	else if (numTrainerPokemon == 6 && numTrainerPokemonLeft == 1) {
		mvprintw(1, 0, "\\_O_X_X_X_X_X_");
	}
	else if (numTrainerPokemon == 6 && numTrainerPokemonLeft == 2) {
		mvprintw(1, 0, "\\_O_O_X_X_X_X_");
	}
	else if (numTrainerPokemon == 6 && numTrainerPokemonLeft == 3) {
		mvprintw(1, 0, "\\_O_O_O_X_X_X_");
	}
	else if (numTrainerPokemon == 6 && numTrainerPokemonLeft == 4) {
		mvprintw(1, 0, "\\_O_O_O_O_X_X_");
	}
	else if (numTrainerPokemon == 6 && numTrainerPokemonLeft == 5) {
		mvprintw(1, 0, "\\_O_O_O_O_O_X_");
	}
	else if (numTrainerPokemon == 6 && numTrainerPokemonLeft == 6) {
		mvprintw(1, 0, "\\_O_O_O_O_O_O_");
	}
	
	if (numPCPokemon == 1 && numPCPokemonLeft == 1) {
		mvprintw(17, 50, "\\_O___________");
	}
	else if (numPCPokemon == 2 && numPCPokemonLeft == 1) {
		mvprintw(17, 50, "\\_O_X_________");
	}
	else if (numPCPokemon == 2 && numPCPokemonLeft == 2) {
		mvprintw(17, 50, "\\_O_O_________");
	}
	else if (numPCPokemon == 3 && numPCPokemonLeft == 1) {
		mvprintw(17, 50, "\\_O_X_X_______");
	}
	else if (numPCPokemon == 3 && numPCPokemonLeft == 2) {
		mvprintw(17, 50, "\\_O_O_X_______");
	}
	else if (numPCPokemon == 3 && numPCPokemonLeft == 3) {
		mvprintw(17, 50, "\\_O_O_O_______");
	}
	else if (numPCPokemon == 4 && numPCPokemonLeft == 1) {
		mvprintw(17, 50, "\\_O_X_X_X_____");
	}
	else if (numPCPokemon == 4 && numPCPokemonLeft == 2) {
		mvprintw(17, 50, "\\_O_O_X_X_____");
	}
	else if (numPCPokemon == 4 && numPCPokemonLeft == 3) {
		mvprintw(17, 50, "\\_O_O_O_X_____");
	}
	else if (numPCPokemon == 4 && numPCPokemonLeft == 4) {
		mvprintw(17, 50, "\\_O_O_O_O_____");
	}
	else if (numPCPokemon == 5 && numPCPokemonLeft == 1) {
		mvprintw(17, 50, "\\_O_X_X_X_X___");
	}
	else if (numPCPokemon == 5 && numPCPokemonLeft == 2) {
		mvprintw(17, 50, "\\_O_O_X_X_X___");
	}
	else if (numPCPokemon == 5 && numPCPokemonLeft == 3) {
		mvprintw(17, 50, "\\_O_O_O_X_X___");
	}
	else if (numPCPokemon == 5 && numPCPokemonLeft == 4) {
		mvprintw(17, 50, "\\_O_O_O_O_X___");
	}
	else if (numPCPokemon == 5 && numPCPokemonLeft == 5) {
		mvprintw(17, 50, "\\_O_O_O_O_O___");
	}
	else if (numPCPokemon == 6 && numPCPokemonLeft == 1) {
		mvprintw(17, 50, "\\_O_X_X_X_X_X_");
	}
	else if (numPCPokemon == 6 && numPCPokemonLeft == 2) {
		mvprintw(17, 50, "\\_O_O_X_X_X_X_");
	}
	else if (numPCPokemon == 6 && numPCPokemonLeft == 3) {
		mvprintw(17, 50, "\\_O_O_O_X_X_X_");
	}
	else if (numPCPokemon == 6 && numPCPokemonLeft == 4) {
		mvprintw(17, 50, "\\_O_O_O_O_X_X_");
	}
	else if (numPCPokemon == 6 && numPCPokemonLeft == 5) {
		mvprintw(17, 50, "\\_O_O_O_O_O_X_");
	}
	else if (numPCPokemon == 6 && numPCPokemonLeft == 6) {
		mvprintw(17, 50, "\\_O_O_O_O_O_O_");
	}
	
	mvprintw(19, 0, " ______________________________________________________________________________ ");
	mvprintw(20, 0, "|                                                                              |");
	mvprintw(21, 0, "| %-77s|", inp);
	mvprintw(22, 0, "|                                                                              |");
	mvprintw(23, 0, "|______________________________________________________________________________|");
	refresh();
	sleep(1);
	clear();
	
	
	
}

void print_Battle_Box(char* inp) {
	mvprintw(19, 0, " ______________________________________________________________________________ ");
	mvprintw(20, 0, "|                                                                              |");
	mvprintw(21, 0, "| %-77s|", inp);
	mvprintw(22, 0, "|                                                                              |");
	mvprintw(23, 0, "|______________________________________________________________________________|");
	refresh();
	sleep(1);
}
void print_Battle_Box2(char* inp) {
	mvprintw(19, 0, " ______________________________________________________________________________ ");
	mvprintw(20, 0, "|                                                                              |");
	mvprintw(21, 0, "| %-77s|", inp);
	//mvprintw(22, 0, "|                                                                              |");
	mvprintw(23, 0, "|______________________________________________________________________________|");
	refresh();
	sleep(1);
}

void print_Pokemon_Menu(fullPokemon *PCPokemon, int *PCPokemonSelection, int *trainerPokemonSelection, fullPokemon *trainerPokemon, int isWild) { // pokemonSelection: {0 - 5}
	int escapeAttempts = 0;
	clear();
	mvprintw(0, 0, " ________________________ ");
	mvprintw(1, 0, "| %s: ", trainerPokemon[*trainerPokemonSelection].pokemonType->identifier);
	mvprintw(1, 25, "|");
	mvprintw(2, 0, "| hp: %-9d          |", trainerPokemon[*trainerPokemonSelection].hp);
	mvprintw(3, 0, "|________________________|");
	mvprintw(14, 50, " ________________________ ");
	mvprintw(15, 50, "| %s: ", PCPokemon[*PCPokemonSelection].pokemonType->identifier);
	mvprintw(15, 75, "|");
	mvprintw(16, 50, "| hp: %-9d          |", PCPokemon[*PCPokemonSelection].hp);
	mvprintw(17, 50, "|________________________|");
	
	mvprintw(19, 0, " ______________________________________________________________________________ ");
	mvprintw(20, 0, "|   >FIGHT                                                          POKEMON    |");
	mvprintw(21, 0, "|    PACK                                                           RUN        |");
	mvprintw(22, 0, "|                                                                              |");
	mvprintw(23, 0, "|______________________________________________________________________________|");
	refresh();
	// 0 1
	// 2 3
	int optionselected = 0;
	
	while (true) {
		char userinput = ' ';
		userinput = getch();
		
		//mvprintw(18, 0, "user input: %d", (int)userinput); // for testing
		//refresh(); // for testing
		//sleep(1); // for testing
		
		mvprintw(0, 0, " ________________________ ");
		mvprintw(1, 0, "| %s: ", trainerPokemon[*trainerPokemonSelection].pokemonType->identifier);
		mvprintw(1, 25, "|");
		mvprintw(2, 0, "| hp: %-9d          |", trainerPokemon[*trainerPokemonSelection].hp);
		mvprintw(3, 0, "|________________________|");
		mvprintw(14, 50, " ________________________ ");
		mvprintw(15, 50, "| %s: ", PCPokemon[*PCPokemonSelection].pokemonType->identifier);
		mvprintw(15, 75, "|");
		mvprintw(16, 50, "| hp: %-9d          |", PCPokemon[*PCPokemonSelection].hp);
		mvprintw(17, 50, "|________________________|");
		refresh();
		
		if (((int)userinput == 3 || userinput == 'i' || (int)userinput == 2 || userinput == 'k') && optionselected == 0) {
			optionselected = 2;
			//clear();
			mvprintw(19, 0, " ______________________________________________________________________________ ");
			mvprintw(20, 0, "|    FIGHT                                                          POKEMON    |");
			mvprintw(21, 0, "|   >PACK                                                           RUN        |");
			mvprintw(22, 0, "|                                                                              |");
			mvprintw(23, 0, "|______________________________________________________________________________|");
			refresh();
			continue;
		}
		else if (((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') && optionselected == 0) {
			optionselected = 1;
			//clear();
			mvprintw(19, 0, " ______________________________________________________________________________ ");
			mvprintw(20, 0, "|    FIGHT                                                        >POKEMON     |");
			mvprintw(21, 0, "|    PACK                                                          RUN         |");
			mvprintw(22, 0, "|                                                                              |");
			mvprintw(23, 0, "|______________________________________________________________________________|");
			refresh();
		}
		else if (((int)userinput == 3 || userinput == 'i' || (int)userinput == 2 || userinput == 'k') && optionselected == 2) {
			optionselected = 0;
			//clear();
			mvprintw(19, 0, " ______________________________________________________________________________ ");
			mvprintw(20, 0, "|   >FIGHT                                                          POKEMON    |");
			mvprintw(21, 0, "|    PACK                                                           RUN        |");
			mvprintw(22, 0, "|                                                                              |");
			mvprintw(23, 0, "|______________________________________________________________________________|");
			refresh();
		}
		else if (((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') && optionselected == 2) {
			optionselected = 3;
			//clear();
			mvprintw(19, 0, " ______________________________________________________________________________ ");
			mvprintw(20, 0, "|    FIGHT                                                         POKEMON     |");
			mvprintw(21, 0, "|    PACK                                                         >RUN         |");
			mvprintw(22, 0, "|                                                                              |");
			mvprintw(23, 0, "|______________________________________________________________________________|");
			refresh();
		}
		else if (((int)userinput == 3 || userinput == 'i' || (int)userinput == 2 || userinput == 'k') && optionselected == 1) {
			optionselected = 3;
			mvprintw(19, 0, " ______________________________________________________________________________ ");
			mvprintw(20, 0, "|    FIGHT                                                          POKEMON    |");
			mvprintw(21, 0, "|    PACK                                                          >RUN        |");
			mvprintw(22, 0, "|                                                                              |");
			mvprintw(23, 0, "|______________________________________________________________________________|");
			refresh();
		}
		else if (((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') && optionselected == 1) {
			optionselected = 0;
			mvprintw(19, 0, " ______________________________________________________________________________ ");
			mvprintw(20, 0, "|   >FIGHT                                                         POKEMON     |");
			mvprintw(21, 0, "|    PACK                                                          RUN         |");
			mvprintw(22, 0, "|                                                                              |");
			mvprintw(23, 0, "|______________________________________________________________________________|");
			refresh();
		}
		else if (((int)userinput == 3 || userinput == 'i' || (int)userinput == 2 || userinput == 'k') && optionselected == 3) {
			optionselected = 1;
			mvprintw(19, 0, " ______________________________________________________________________________ ");
			mvprintw(20, 0, "|    FIGHT                                                         >POKEMON    |");
			mvprintw(21, 0, "|    PACK                                                           RUN        |");
			mvprintw(22, 0, "|                                                                              |");
			mvprintw(23, 0, "|______________________________________________________________________________|");
			refresh();
		}
		else if (((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') && optionselected == 3) {
			optionselected = 2;
			mvprintw(19, 0, " ______________________________________________________________________________ ");
			mvprintw(20, 0, "|    FIGHT                                                         POKEMON     |");
			mvprintw(21, 0, "|   >PACK                                                          RUN         |");
			mvprintw(22, 0, "|                                                                              |");
			mvprintw(23, 0, "|______________________________________________________________________________|");
			refresh();
		}
		else if (userinput == '\n' && optionselected == 0) { // user presses enter on fight.
			clear();
			optionselected = 0;
			mvprintw(0, 0, " ________________________ ");
			mvprintw(1, 0, "| %s: ", trainerPokemon[*trainerPokemonSelection].pokemonType->identifier);
			mvprintw(1, 25, "|");
			mvprintw(2, 0, "| hp: %-9d          |", trainerPokemon[*trainerPokemonSelection].hp);
			mvprintw(3, 0, "|________________________|");
			mvprintw(14, 50, " ________________________ ");
			mvprintw(15, 50, "| %s: ", PCPokemon[*PCPokemonSelection].pokemonType->identifier);
			mvprintw(15, 75, "|");
			mvprintw(16, 50, "| hp: %-9d          |", PCPokemon[*PCPokemonSelection].hp);
			mvprintw(17, 50, "|________________________|");
			mvprintw(19, 0, " ______________________________________________________________________________ ");
			mvprintw(20, 0, "|   >%-15s                                               %-12s|", PCPokemon[*PCPokemonSelection].pokemonMoveset[0].identifier, PCPokemon[*PCPokemonSelection].pokemonMoveset[1].id != -1 ? PCPokemon[*PCPokemonSelection].pokemonMoveset[1].identifier : "EMPTY");
			mvprintw(21, 0, "|    %-15s                                               %-12s|", PCPokemon[*PCPokemonSelection].pokemonMoveset[2].id != -1 ? PCPokemon[*PCPokemonSelection].pokemonMoveset[2].identifier : "EMPTY", PCPokemon[*PCPokemonSelection].pokemonMoveset[3].id != -1 ? PCPokemon[*PCPokemonSelection].pokemonMoveset[3].identifier : "EMPTY");
			mvprintw(22, 0, "|                                                                              |");
			mvprintw(23, 0, "|______________________________________________________________________________|");
			refresh();
			
			
			while (true) { // fight menu (move pick menu) TODO: show pp for the moves
				userinput = ' ';
				userinput = getch();
				if (((int)userinput == 3 || userinput == 'i' || (int)userinput == 2 || userinput == 'k') && optionselected == 0) {
					optionselected = 2;
				}
				else if (((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') && optionselected == 0) {
					optionselected = 1;
				}
				else if (((int)userinput == 3 || userinput == 'i' || (int)userinput == 2 || userinput == 'k') && optionselected == 2) {
					optionselected = 0;
				}
				else if (((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') && optionselected == 2) {
					optionselected = 3;
				}
				else if (((int)userinput == 3 || userinput == 'i' || (int)userinput == 2 || userinput == 'k') && optionselected == 1) {
					optionselected = 3;
				}
				else if (((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') && optionselected == 1) {
					optionselected = 0;
				}
				else if (((int)userinput == 3 || userinput == 'i' || (int)userinput == 2 || userinput == 'k') && optionselected == 3) {
					optionselected = 1;
				}
				else if (((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') && optionselected == 3) {
					optionselected = 2;
				}
				else if (optionselected == 0 && userinput == '\n' && PCPokemon[*PCPokemonSelection].pokemonMoveset[0].id != -1) { // TODO: make sure there is enough pp
					//mvprintw(18, 0, "about to run battle_do_move"); // for testing
					//refresh(); // for testing
					//sleep(1); // for testing
					battle_do_move(PCPokemon[*PCPokemonSelection].pokemonMoveset[0], 0, trainerPokemon, PCPokemon, trainerPokemonSelection, PCPokemonSelection, 0, isWild);
					return;
				}
				else if (optionselected == 1 && userinput == '\n' && PCPokemon[*PCPokemonSelection].pokemonMoveset[1].id != -1) {
					battle_do_move(PCPokemon[*PCPokemonSelection].pokemonMoveset[1], 0, trainerPokemon, PCPokemon, trainerPokemonSelection, PCPokemonSelection, 0, isWild);
					return;
				}
				else if (optionselected == 2 && userinput == '\n' && PCPokemon[*PCPokemonSelection].pokemonMoveset[2].id != -1) {
					battle_do_move(PCPokemon[*PCPokemonSelection].pokemonMoveset[2], 0, trainerPokemon, PCPokemon, trainerPokemonSelection, PCPokemonSelection, 0, isWild);
					return;
				}
				else if (optionselected == 3 && userinput == '\n' && PCPokemon[*PCPokemonSelection].pokemonMoveset[3].id != -1) {
					battle_do_move(PCPokemon[*PCPokemonSelection].pokemonMoveset[3], 0, trainerPokemon, PCPokemon, trainerPokemonSelection, PCPokemonSelection, 0, isWild);
					return;
				}
				else if ((int)userinput == 7) { // backspace
					mvprintw(19, 0, " ______________________________________________________________________________ ");
					mvprintw(20, 0, "|   >FIGHT                                                          POKEMON    |");
					mvprintw(21, 0, "|    PACK                                                           RUN        |");
					mvprintw(22, 0, "|                                                                              |");
					mvprintw(23, 0, "|______________________________________________________________________________|");
					optionselected = 1;
					refresh();
					break;
				}
				//mvprintw(15, 50, "| %s: ", PCPokemon[*PCPokemonSelection].pokemonType->identifier);
				//mvprintw(15, 75, "|");
				//mvprintw(16, 50, "| pp: %-9d          |", PCPokemon[*PCPokemonSelection].pp[optionselected]);
				//mvprintw(17, 50, "|________________________|");
				
				mvprintw(19, 0, " ______________________________________________________________________________ ");
				mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', PCPokemon[*PCPokemonSelection].pokemonMoveset[0].identifier, optionselected == 1 ? '>' : ' ', PCPokemon[*PCPokemonSelection].pokemonMoveset[1].id != -1 ? PCPokemon[*PCPokemonSelection].pokemonMoveset[1].identifier : "EMPTY");
				mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', PCPokemon[*PCPokemonSelection].pokemonMoveset[2].id != -1 ? PCPokemon[*PCPokemonSelection].pokemonMoveset[2].identifier : "EMPTY", optionselected == 3 ? '>' : ' ', PCPokemon[*PCPokemonSelection].pokemonMoveset[3].id != -1 ? PCPokemon[*PCPokemonSelection].pokemonMoveset[3].identifier : "EMPTY");
				mvprintw(22, 0, "|                                                                              |");
				mvprintw(23, 0, "|______________________________________________________________________________|");
				refresh();
			}
		}
		else if (userinput == '\n' && optionselected == 1) { // user presses enter on fight. TODO: display status's for pokemon as you hover over them
			optionselected = 0;
			mvprintw(19, 0, " ______________________________________________________________________________ ");
			mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', PCPokemon[0].hp != 0 ? PCPokemon[0].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', PCPokemon[1].hp != 0 ? PCPokemon[1].pokemonType->identifier : " ");
			mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', PCPokemon[2].hp != 0 ? PCPokemon[2].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', PCPokemon[3].hp != 0 ? PCPokemon[3].pokemonType->identifier : " ");
			mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', PCPokemon[4].hp != 0 ? PCPokemon[4].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', PCPokemon[5].hp != 0 ? PCPokemon[5].pokemonType->identifier : " ");
			mvprintw(23, 0, "|______________________________________________________________________________|");
			refresh();
			
			while (true) { // switch menu
				userinput = getch();
				if (optionselected == 0 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 4;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 2;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 1;
					}
				}
				else if (optionselected == 1 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 5;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 3;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 0;
					}
				}
				else if (optionselected == 2 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 0;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 4;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 3;
					}
				}
				else if (optionselected == 3 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 1;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 5;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 2;
					}
				}
				else if (optionselected == 4 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 2;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 0;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 5;
					}
				}
				else if (optionselected == 5 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 3;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 1;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 4;
					}
				}
				else if (optionselected == 0 && userinput == '\n' && PCPokemon[0].hp != 0 && PCPokemonSelection != 0) {
					battle_do_move(PCPokemon[0].pokemonMoveset[0], 1, trainerPokemon, PCPokemon, trainerPokemonSelection, PCPokemonSelection, 0, isWild);
					return;
				}
				else if (optionselected == 1 && userinput == '\n' && PCPokemon[1].hp != 0 && *PCPokemonSelection != 1) {
					battle_do_move(PCPokemon[0].pokemonMoveset[0], 1, trainerPokemon, PCPokemon, trainerPokemonSelection, PCPokemonSelection, 1, isWild);
					return;
				}
				else if (optionselected == 2 && userinput == '\n' && PCPokemon[2].hp != 0 && *PCPokemonSelection != 2) {
					battle_do_move(PCPokemon[0].pokemonMoveset[0], 1, trainerPokemon, PCPokemon, trainerPokemonSelection, PCPokemonSelection, 2, isWild);
					return;
				}
				else if (optionselected == 3 && userinput == '\n' && PCPokemon[3].hp != 0 && *PCPokemonSelection != 3) {
					battle_do_move(PCPokemon[0].pokemonMoveset[0], 1, trainerPokemon, PCPokemon, trainerPokemonSelection, PCPokemonSelection, 3, isWild);
					return;
				}
				else if (optionselected == 4 && userinput == '\n' && PCPokemon[4].hp != 0 && *PCPokemonSelection != 4) {
					battle_do_move(PCPokemon[0].pokemonMoveset[0], 1, trainerPokemon, PCPokemon, trainerPokemonSelection, PCPokemonSelection, 4, isWild);
					return;
				}
				else if (optionselected == 5 && userinput == '\n' && PCPokemon[5].hp != 0 && *PCPokemonSelection != 5) {
					battle_do_move(PCPokemon[0].pokemonMoveset[0], 1, trainerPokemon, PCPokemon, trainerPokemonSelection, PCPokemonSelection, 5, isWild);
					return;
				}
				else if ((int)userinput == 7) { // backspace
					mvprintw(19, 0, " ______________________________________________________________________________ ");
					mvprintw(20, 0, "|    FIGHT                                                         >POKEMON    |");
					mvprintw(21, 0, "|    PACK                                                           RUN        |");
					mvprintw(22, 0, "|                                                                              |");
					mvprintw(23, 0, "|______________________________________________________________________________|");
					optionselected = 1;
					refresh();
					break;
				}
				
				mvprintw(19, 0, " ______________________________________________________________________________ ");
				mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', PCPokemon[0].hp != 0 ? PCPokemon[0].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', PCPokemon[1].hp != 0 ? PCPokemon[1].pokemonType->identifier : " ");
				mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', PCPokemon[2].hp != 0 ? PCPokemon[2].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', PCPokemon[3].hp != 0 ? PCPokemon[3].pokemonType->identifier : " ");
				mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', PCPokemon[4].hp != 0 ? PCPokemon[4].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', PCPokemon[5].hp != 0 ? PCPokemon[5].pokemonType->identifier : " ");
				mvprintw(23, 0, "|______________________________________________________________________________|");
				refresh();
			}
		}
		else if (userinput == '\n' && optionselected == 2) { // user presses enter on pack
			optionselected = 0;
			mvprintw(19, 0, " ______________________________________________________________________________ ");
			mvprintw(20, 0, "|   %c%2dx Revives                                              %c%2dx Potions     |", optionselected == 0 ? '>' : ' ', PC_Revives, optionselected == 1 ? '>' : ' ', PC_Potions);
			mvprintw(21, 0, "|   %c%2dx Pokeballs                                            %c%2dx Greatballs  |", optionselected == 2 ? '>' : ' ', PC_Pokeballs, optionselected == 3 ? '>' : ' ', PC_Greatballs);
			mvprintw(22, 0, "|   %c%2dx Ultraballs                                           %c%2dx Masterballs |", optionselected == 4 ? '>' : ' ', PC_Ultraballs, optionselected == 5 ? '>' : ' ', PC_Masterballs);
			mvprintw(23, 0, "|______________________________________________________________________________|");
			refresh();
			
			while (true) { // pack/bag menu
				userinput = getch();
				if (optionselected == 0 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 4;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 2;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 1;
					}
				}
				else if (optionselected == 1 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 5;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 3;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 0;
					}
				}
				else if (optionselected == 2 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 0;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 4;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 3;
					}
				}
				else if (optionselected == 3 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 1;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 5;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 2;
					}
				}
				else if (optionselected == 4 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 2;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 0;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 5;
					}
				}
				else if (optionselected == 5 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 3;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 1;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 4;
					}
				}
				else if (optionselected == 0 && userinput == '\n' && PC_Revives > 0) {
					if ((PCPokemon[0].hp <= 0 && PCPokemon[0].exists == 1) || (PCPokemon[1].hp <= 0 && PCPokemon[1].exists == 1) || (PCPokemon[2].hp <= 0 && PCPokemon[2].exists == 1) || (PCPokemon[3].hp <= 0 && PCPokemon[3].exists == 1) || (PCPokemon[4].hp <= 0 && PCPokemon[4].exists == 1) || (PCPokemon[5].hp == 0 && PCPokemon[5].exists == 1)) { // pulls up revive menu
						
						optionselected = 0;
						mvprintw(19, 0, " ______________________________________________________________________________ ");
						mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', (PCPokemon[0].hp <= 0 && PCPokemon[0].exists == 1) ? PCPokemon[0].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', (PCPokemon[1].hp <= 0 && PCPokemon[1].exists == 1) ? PCPokemon[1].pokemonType->identifier : " ");
						mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', (PCPokemon[2].hp <= 0 && PCPokemon[2].exists == 1) ? PCPokemon[2].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', (PCPokemon[3].hp <= 0 && PCPokemon[3].exists == 1) ? PCPokemon[3].pokemonType->identifier : " ");
						mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', (PCPokemon[4].hp <= 0 && PCPokemon[4].exists == 1) ? PCPokemon[4].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', (PCPokemon[5].hp <= 0 && PCPokemon[5].exists == 1) ? PCPokemon[5].pokemonType->identifier : " ");
						mvprintw(23, 0, "|______________________________________________________________________________|");
						refresh();
						
						while (true) { // switch menu TODO: show pp for the moves
							userinput = getch();
							if (optionselected == 0 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 4;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 2;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 1;
								}
							}
							else if (optionselected == 1 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 5;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 3;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 0;
								}
							}
							else if (optionselected == 2 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 0;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 4;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 3;
								}
							}
							else if (optionselected == 3 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 1;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 5;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 2;
								}
							}
							else if (optionselected == 4 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 2;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 0;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 5;
								}
							}
							else if (optionselected == 5 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 3;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 1;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 4;
								}
							}
							else if (optionselected == 0 && userinput == '\n' && PCPokemon[0].hp <= 0 && PCPokemon[0].exists == 1) {
								PCPokemon[0].hp = PCPokemon[0].pokemonStats[0] / 2;
								break;
							}
							else if (optionselected == 1 && userinput == '\n' && PCPokemon[1].hp <= 0 && PCPokemon[1].exists == 1) {
								PCPokemon[1].hp = PCPokemon[1].pokemonStats[0] / 2;
								break;
							}
							else if (optionselected == 2 && userinput == '\n' && PCPokemon[2].hp <= 0 && PCPokemon[2].exists == 1) {
								PCPokemon[2].hp = PCPokemon[2].pokemonStats[0] / 2;
								break;
							}
							else if (optionselected == 3 && userinput == '\n' && PCPokemon[3].hp <= 0 && PCPokemon[3].exists == 1) {
								PCPokemon[3].hp = PCPokemon[3].pokemonStats[0] / 2;
								break;
							}
							else if (optionselected == 4 && userinput == '\n' && PCPokemon[4].hp <= 0 && PCPokemon[4].exists == 1) {
								PCPokemon[4].hp = PCPokemon[4].pokemonStats[0] / 2;
								break;
							}
							else if (optionselected == 5 && userinput == '\n' && PCPokemon[5].hp <= 0 && PCPokemon[5].exists == 1) {
								PCPokemon[5].hp = PCPokemon[5].pokemonStats[0] / 2;
								break;
							}
							//else if ((int)userinput == 7) { // backspace
								//mvprintw(19, 0, " ______________________________________________________________________________ ");
								//mvprintw(20, 0, "|    FIGHT                                                         >POKEMON    |");
								//mvprintw(21, 0, "|    PACK                                                           RUN        |");
								//mvprintw(22, 0, "|                                                                              |");
								//mvprintw(23, 0, "|______________________________________________________________________________|");
								//optionselected = 1;
								//refresh();
								//break;
							//}
							
							mvprintw(19, 0, " ______________________________________________________________________________ ");
							mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', (PCPokemon[0].hp <= 0 && PCPokemon[0].exists == 1) ? PCPokemon[0].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', (PCPokemon[1].hp <= 0 && PCPokemon[1].exists == 1) ? PCPokemon[1].pokemonType->identifier : " ");
							mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', (PCPokemon[2].hp <= 0 && PCPokemon[2].exists == 1) ? PCPokemon[2].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', (PCPokemon[3].hp <= 0 && PCPokemon[3].exists == 1) ? PCPokemon[3].pokemonType->identifier : " ");
							mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', (PCPokemon[4].hp <= 0 && PCPokemon[4].exists == 1) ? PCPokemon[4].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', (PCPokemon[5].hp <= 0 && PCPokemon[5].exists == 1) ? PCPokemon[5].pokemonType->identifier : " ");
							mvprintw(23, 0, "|______________________________________________________________________________|");
							refresh();
						}
					}
					else { // no pokemon are dead
						mvprintw(22, 0, "|    No Pokemon are Dead                                                       |");
						refresh();
						sleep(1);
						mvprintw(22, 0, "|                                                                              |");
						refresh();
						continue;
					}
					
					mvprintw(19, 0, " ______________________________________________________________________________ ");
					mvprintw(20, 0, "|    FIGHT                                                          POKEMON    |");
					mvprintw(21, 0, "|   >PACK                                                           RUN        |");
					mvprintw(22, 0, "|                                                                              |");
					mvprintw(23, 0, "|______________________________________________________________________________|");
					optionselected = 2;
					PC_Revives = PC_Revives - 1;
					break;
				}
				else if (optionselected == 1 && userinput == '\n' && PC_Potions > 0 && PCPokemon[*PCPokemonSelection].hp > 0) {
					PCPokemon[*PCPokemonSelection].hp = PCPokemon[*PCPokemonSelection].hp + 20;
					if (PCPokemon[*PCPokemonSelection].hp > PCPokemon[*PCPokemonSelection].pokemonStats[0]) {
						PCPokemon[*PCPokemonSelection].hp = PCPokemon[*PCPokemonSelection].pokemonStats[0];
					}
					mvprintw(19, 0, " ______________________________________________________________________________ ");
					mvprintw(20, 0, "|    FIGHT                                                          POKEMON    |");
					mvprintw(21, 0, "|   >PACK                                                           RUN        |");
					mvprintw(22, 0, "|                                                                              |");
					mvprintw(23, 0, "|______________________________________________________________________________|");
					optionselected = 2;
					PC_Potions = PC_Potions - 1;
					break;
				}
				else if (optionselected == 2 && userinput == '\n' && PC_Pokeballs > 0 && isWild == 1) {
					int slotfree = 0;
					int j;
					for (j = 1; j < 6; j++) {
						if (PCPokemon[j].exists != 1) {
							slotfree = 1;
							break;
						}
					}
					int M = rand() % 256;
					int f = (int)((trainerPokemon[*trainerPokemonSelection].pokemonStats[0] * 255.0 * 4.0) / (trainerPokemon[*trainerPokemonSelection].hp * 12.0));
					if (f > 255) {
						f = 255;
					}
					if (f < 1) {
						f = 1;
					}
					
					if (slotfree == 1) {
						if (f >= M) {
							PCPokemon[j] = trainerPokemon[*trainerPokemonSelection];
							PC_Pokeballs = PC_Pokeballs - 1;
							print_Battle_Box(const_cast<char*>("Pokemon Caught!"));
							return;
						}
						else {
							print_Battle_Box(const_cast<char*>("Pokemon Ran Away!"));
							return;
						}
					}
					else {
						if (f >= M) {
							PC_PokeStorage[PC_PokeStorageIter] = trainerPokemon[*trainerPokemonSelection];
							PC_PokeStorageIter = PC_PokeStorageIter + 1;
							PC_Pokeballs = PC_Pokeballs - 1;
							print_Battle_Box(const_cast<char*>("Pokemon Caught!"));
							return;
						}
						else {
							print_Battle_Box(const_cast<char*>("Pokemon Ran Away!"));
							return;
						}
					}
				}
				else if (optionselected == 3 && userinput == '\n' && PC_Greatballs > 0 && isWild == 1) {
					int slotfree = 0;
					int j;
					for (j = 1; j < 6; j++) {
						if (PCPokemon[j].exists != 1) {
							slotfree = 1;
							break;
						}
					}
					int M = rand() % 256;
					int f = (int)((trainerPokemon[*trainerPokemonSelection].pokemonStats[0] * 255.0 * 4.0) / (trainerPokemon[*trainerPokemonSelection].hp * 8.0));
					if (f > 255) {
						f = 255;
					}
					if (f < 1) {
						f = 1;
					}
					
					if (slotfree == 1) {
						if (f >= M) {
							PCPokemon[j] = trainerPokemon[*trainerPokemonSelection];
							PC_Greatballs = PC_Greatballs - 1;
							print_Battle_Box(const_cast<char*>("Pokemon Caught!"));
							return;
						}
						else {
							print_Battle_Box(const_cast<char*>("Pokemon Ran Away!"));
							return;
						}
					}
					else {
						if (f >= M) {
							PC_PokeStorage[PC_PokeStorageIter] = trainerPokemon[*trainerPokemonSelection];
							PC_PokeStorageIter = PC_PokeStorageIter + 1;
							PC_Greatballs = PC_Greatballs - 1;
							print_Battle_Box(const_cast<char*>("Pokemon Caught!"));
							return;
						}
						else {
							print_Battle_Box(const_cast<char*>("Pokemon Ran Away!"));
							return;
						}
					}
				}
				else if (optionselected == 4 && userinput == '\n' && PC_Ultraballs > 0 && isWild == 1) {
					int slotfree = 0;
					int j;
					for (j = 1; j < 6; j++) {
						if (PCPokemon[j].exists != 1) {
							slotfree = 1;
							break;
						}
					}
					int M = rand() % 256;
					int f = (int)((trainerPokemon[*trainerPokemonSelection].pokemonStats[0] * 255.0 * 4.0) / (trainerPokemon[*trainerPokemonSelection].hp * 8.0));
					if (f > 255) {
						f = 255;
					}
					if (f < 1) {
						f = 1;
					}
					
					if (slotfree == 1) {
						if (f >= M || rand() % 10 == 0) {
							PCPokemon[j] = trainerPokemon[*trainerPokemonSelection];
							PC_Ultraballs = PC_Ultraballs - 1;
							print_Battle_Box(const_cast<char*>("Pokemon Caught!"));
							return;
						}
						else {
							print_Battle_Box(const_cast<char*>("Pokemon Ran Away!"));
							return;
						}
					}
					else {
						if (f >= M || rand() % 10 == 0) {
							PC_PokeStorage[PC_PokeStorageIter] = trainerPokemon[*trainerPokemonSelection];
							PC_PokeStorageIter = PC_PokeStorageIter + 1;
							PC_Ultraballs = PC_Ultraballs - 1;
							print_Battle_Box(const_cast<char*>("Pokemon Caught!"));
							return;
						}
						else {
							print_Battle_Box(const_cast<char*>("Pokemon Ran Away!"));
							return;
						}
					}
				}
				else if (optionselected == 5 && userinput == '\n' && PC_Masterballs > 0 && isWild == 1) {
					for (int j = 1; j < 6; j++) {
						if (PCPokemon[j].exists != 1) {
							PCPokemon[j] = trainerPokemon[*trainerPokemonSelection];
							PC_Masterballs = PC_Masterballs - 1;
							return;
						}
					}
					PC_PokeStorage[PC_PokeStorageIter] = trainerPokemon[*trainerPokemonSelection];
					PC_PokeStorageIter = PC_PokeStorageIter + 1;
					PC_Masterballs = PC_Masterballs - 1;
					return;	
				}
				else if ((int)userinput == 7) { // backspace
					mvprintw(19, 0, " ______________________________________________________________________________ ");
					mvprintw(20, 0, "|    FIGHT                                                          POKEMON    |");
					mvprintw(21, 0, "|   >PACK                                                           RUN        |");
					mvprintw(22, 0, "|                                                                              |");
					mvprintw(23, 0, "|______________________________________________________________________________|");
					optionselected = 2;
					break;
				}
				
				mvprintw(19, 0, " ______________________________________________________________________________ ");
				mvprintw(20, 0, "|   %c%2dx Revives                                              %c%2dx Potions     |", optionselected == 0 ? '>' : ' ', PC_Revives, optionselected == 1 ? '>' : ' ', PC_Potions);
				mvprintw(21, 0, "|   %c%2dx Pokeballs                                            %c%2dx Greatballs  |", optionselected == 2 ? '>' : ' ', PC_Pokeballs, optionselected == 3 ? '>' : ' ', PC_Greatballs);
				mvprintw(22, 0, "|   %c%2dx Ultraballs                                           %c%2dx Masterballs |", optionselected == 4 ? '>' : ' ', PC_Ultraballs, optionselected == 5 ? '>' : ' ', PC_Masterballs);
				mvprintw(23, 0, "|______________________________________________________________________________|");
				refresh();
			}
		}
		else if (userinput == '\n' && optionselected == 3 && isWild == 1) { // user attempts to run
			mvprintw(19, 0, " ______________________________________________________________________________ ");
			mvprintw(20, 0, "|                                                                              |");
			mvprintw(21, 0, "|    Attempting to escape!                                                     |");
			mvprintw(22, 0, "|                                                                              |");
			mvprintw(23, 0, "|______________________________________________________________________________|");
			refresh();
			sleep(1);
			if (rand() % 100 <= (int)((PCPokemon[*PCPokemonSelection].pokemonStats[5] * 32.0) / ((trainerPokemon[*trainerPokemonSelection].pokemonStats[5] / 4) % 256)) + 30 * escapeAttempts) {
				mvprintw(21, 0, "|    Escape Successful!                                                        |");
				refresh();
				sleep(1);
				return;
			}
			else {
				escapeAttempts = escapeAttempts + 1;
				mvprintw(21, 0, "|    Escape Failed!                                                            |");
				refresh();
				sleep(1);
			}
		}
	}
	//sleep(1);
	
}

void pokemon_Battle() { // starts a pokemon battle with another trainer.
	fullPokemon trainerPokemon[6];
	trainerPokemon[0] = generate_pokemon();
	int numTrainerPokemon = 1;
	int numTrainerPokemonLeft = numTrainerPokemon;
	int PCPokemonSelection = 0; // {0 - 5} cooresponds to what pokemon is currently on battlefield
	if (PC_Pokemon[0].hp <= 0 || PC_Pokemon[0].exists != 1) {
		PCPokemonSelection = 1;
		if (PC_Pokemon[1].hp <= 0 || PC_Pokemon[1].exists != 1) {
			PCPokemonSelection = 2;
			if (PC_Pokemon[2].hp <= 0 || PC_Pokemon[2].exists != 1) {
				PCPokemonSelection = 3;
				if (PC_Pokemon[3].hp <= 0 || PC_Pokemon[3].exists != 1) {
					PCPokemonSelection = 4;
					if (PC_Pokemon[4].hp <= 0 || PC_Pokemon[4].exists != 1) {
						PCPokemonSelection = 5;
						if (PC_Pokemon[5].hp <= 0 || PC_Pokemon[5].exists != 1) {
							clear();
							print_Battle_Box(const_cast<char*>("No Pokemon are alive, exiting battle"));
							return;
						}
					}
				}
			}
		}
	}
	
	int TrainerPokemonSelection = 0;
	for (int i = 1; i < 6; i++) {
		if (rand() % 10 <= 5) {
			trainerPokemon[i] = generate_pokemon();
		}
		else {
			numTrainerPokemon = i;
			break;
		}
		if (i == 5) {
			numTrainerPokemon = 6;
		}
	}
	numTrainerPokemonLeft = numTrainerPokemon;
	
	for (int i = numTrainerPokemon; i < 6; i++) {
		trainerPokemon[i].hp = 0;
	} // sets non existant pokemon's hp to 0 so they wont try to be pulled out by the summon ai.
	
	// TODO: set up numPCPokemon logic
	
	int numPCPokemon = 0;
	int numPCPokemonLeft = 0;
	for (int i = 0; i < 6; i++) {
		if (PC_Pokemon[i].exists == 1) {
			numPCPokemon++;
			if (PC_Pokemon[i].hp > 0)
				numPCPokemonLeft++;
		}
	}
	
	clear();
	print_Battle_Box_On_Death(const_cast<char*>("A trainer wants to battle!"), numTrainerPokemon, numTrainerPokemonLeft, numPCPokemon, numPCPokemonLeft);
	print_Pokemon_Menu(PC_Pokemon, &PCPokemonSelection, &TrainerPokemonSelection, trainerPokemon, 0);
	
	clear();
}

void select_initial_pokemon() { // TODO: implement this to give player a selection of 3 random pokemon
	PC_Pokemon[0] = generate_pokemon();
	//mvprintw(1, 0, "The wild %s knows %s and %s", PC_Pokemon[0].pokemonType->identifier, PC_Pokemon[0].pokemonMoveset[0].identifier, PC_Pokemon[0].pokemonMoveset[1].identifier); // for testing
	//refresh(); // for testing
	//sleep(1); // for testing
	//clear(); // for testing
	
	//PC_Pokemon[0].hp = 10000; // for testing
	
}

void open_bag_menu() {
	clear();
	
	
	char userinput = ' ';
	
	
			
			
			
			
			
			int optionselected = 0;
			mvprintw(19, 0, " ______________________________________________________________________________ ");
			mvprintw(20, 0, "|   %c%2dx Revives                                              %c%2dx Potions     |", optionselected == 0 ? '>' : ' ', PC_Revives, optionselected == 1 ? '>' : ' ', PC_Potions);
			mvprintw(21, 0, "|   %c%2dx Pokeballs                                            %c%2dx Greatballs  |", optionselected == 2 ? '>' : ' ', PC_Pokeballs, optionselected == 3 ? '>' : ' ', PC_Greatballs);
			mvprintw(22, 0, "|   %c%2dx Ultraballs                                           %c%2dx Masterballs |", optionselected == 4 ? '>' : ' ', PC_Ultraballs, optionselected == 5 ? '>' : ' ', PC_Masterballs);
			mvprintw(23, 0, "|______________________________________________________________________________|");
			refresh();
			
			while (true) { // pack/bag menu
				userinput = getch();
				if (optionselected == 0 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 4;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 2;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 1;
					}
				}
				else if (optionselected == 1 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 5;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 3;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 0;
					}
				}
				else if (optionselected == 2 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 0;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 4;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 3;
					}
				}
				else if (optionselected == 3 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 1;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 5;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 2;
					}
				}
				else if (optionselected == 4 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 2;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 0;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 5;
					}
				}
				else if (optionselected == 5 && userinput != '\n' && (int)userinput != 7) {
					if ((int)userinput == 3 || userinput == 'i') { // up
						optionselected = 3;
					}
					else if ((int)userinput == 2 || userinput == 'k') { // down
						optionselected = 1;
					}
					else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
						optionselected = 4;
					}
				}
				else if (optionselected == 0 && userinput == '\n' && PC_Revives > 0) {
					if ((PC_Pokemon[0].hp <= 0 && PC_Pokemon[0].exists == 1) || (PC_Pokemon[1].hp <= 0 && PC_Pokemon[1].exists == 1) || (PC_Pokemon[2].hp <= 0 && PC_Pokemon[2].exists == 1) || (PC_Pokemon[3].hp <= 0 && PC_Pokemon[3].exists == 1) || (PC_Pokemon[4].hp <= 0 && PC_Pokemon[4].exists == 1) || (PC_Pokemon[5].hp == 0 && PC_Pokemon[5].exists == 1)) { // pulls up revive menu
						
						optionselected = 0;
						mvprintw(19, 0, " ______________________________________________________________________________ ");
						mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', (PC_Pokemon[0].hp <= 0 && PC_Pokemon[0].exists == 1) ? PC_Pokemon[0].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', (PC_Pokemon[1].hp <= 0 && PC_Pokemon[1].exists == 1) ? PC_Pokemon[1].pokemonType->identifier : " ");
						mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', (PC_Pokemon[2].hp <= 0 && PC_Pokemon[2].exists == 1) ? PC_Pokemon[2].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', (PC_Pokemon[3].hp <= 0 && PC_Pokemon[3].exists == 1) ? PC_Pokemon[3].pokemonType->identifier : " ");
						mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', (PC_Pokemon[4].hp <= 0 && PC_Pokemon[4].exists == 1) ? PC_Pokemon[4].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', (PC_Pokemon[5].hp <= 0 && PC_Pokemon[5].exists == 1) ? PC_Pokemon[5].pokemonType->identifier : " ");
						mvprintw(23, 0, "|______________________________________________________________________________|");
						refresh();
						
						while (true) { // selection menu
							userinput = getch();
							if (optionselected == 0 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 4;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 2;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 1;
								}
							}
							else if (optionselected == 1 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 5;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 3;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 0;
								}
							}
							else if (optionselected == 2 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 0;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 4;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 3;
								}
							}
							else if (optionselected == 3 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 1;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 5;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 2;
								}
							}
							else if (optionselected == 4 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 2;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 0;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 5;
								}
							}
							else if (optionselected == 5 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 3;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 1;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 4;
								}
							}
							else if (optionselected == 0 && userinput == '\n' && PC_Pokemon[0].hp <= 0 && PC_Pokemon[0].exists == 1) {
								PC_Pokemon[0].hp = PC_Pokemon[0].pokemonStats[0] / 2;
								break;
							}
							else if (optionselected == 1 && userinput == '\n' && PC_Pokemon[1].hp <= 0 && PC_Pokemon[1].exists == 1) {
								PC_Pokemon[1].hp = PC_Pokemon[1].pokemonStats[0] / 2;
								break;
							}
							else if (optionselected == 2 && userinput == '\n' && PC_Pokemon[2].hp <= 0 && PC_Pokemon[2].exists == 1) {
								PC_Pokemon[2].hp = PC_Pokemon[2].pokemonStats[0] / 2;
								break;
							}
							else if (optionselected == 3 && userinput == '\n' && PC_Pokemon[3].hp <= 0 && PC_Pokemon[3].exists == 1) {
								PC_Pokemon[3].hp = PC_Pokemon[3].pokemonStats[0] / 2;
								break;
							}
							else if (optionselected == 4 && userinput == '\n' && PC_Pokemon[4].hp <= 0 && PC_Pokemon[4].exists == 1) {
								PC_Pokemon[4].hp = PC_Pokemon[4].pokemonStats[0] / 2;
								break;
							}
							else if (optionselected == 5 && userinput == '\n' && PC_Pokemon[5].hp <= 0 && PC_Pokemon[5].exists == 1) {
								PC_Pokemon[5].hp = PC_Pokemon[5].pokemonStats[0] / 2;
								break;
							}
							//else if ((int)userinput == 7) { // backspace
								//mvprintw(19, 0, " ______________________________________________________________________________ ");
								//mvprintw(20, 0, "|    FIGHT                                                         >POKEMON    |");
								//mvprintw(21, 0, "|    PACK                                                           RUN        |");
								//mvprintw(22, 0, "|                                                                              |");
								//mvprintw(23, 0, "|______________________________________________________________________________|");
								//optionselected = 1;
								//refresh();
								//break;
							//}
							
							mvprintw(19, 0, " ______________________________________________________________________________ ");
							mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', (PC_Pokemon[0].hp <= 0 && PC_Pokemon[0].exists == 1) ? PC_Pokemon[0].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', (PC_Pokemon[1].hp <= 0 && PC_Pokemon[1].exists == 1) ? PC_Pokemon[1].pokemonType->identifier : " ");
							mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', (PC_Pokemon[2].hp <= 0 && PC_Pokemon[2].exists == 1) ? PC_Pokemon[2].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', (PC_Pokemon[3].hp <= 0 && PC_Pokemon[3].exists == 1) ? PC_Pokemon[3].pokemonType->identifier : " ");
							mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', (PC_Pokemon[4].hp <= 0 && PC_Pokemon[4].exists == 1) ? PC_Pokemon[4].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', (PC_Pokemon[5].hp <= 0 && PC_Pokemon[5].exists == 1) ? PC_Pokemon[5].pokemonType->identifier : " ");
							mvprintw(23, 0, "|______________________________________________________________________________|");
							refresh();
						}
					}
					else { // no pokemon are dead
						mvprintw(22, 0, "|    No Pokemon are Dead                                                       |");
						refresh();
						sleep(1);
						mvprintw(22, 0, "|                                                                              |");
						refresh();
						continue;
					}
					
					
					PC_Revives = PC_Revives - 1;
					return;
				}
				else if (optionselected == 1 && userinput == '\n' && PC_Potions > 0) {
					if ((PC_Pokemon[0].hp > 0 && PC_Pokemon[0].exists == 1) || (PC_Pokemon[1].hp > 0 && PC_Pokemon[1].exists == 1) || (PC_Pokemon[2].hp > 0 && PC_Pokemon[2].exists == 1) || (PC_Pokemon[3].hp > 0 && PC_Pokemon[3].exists == 1) || (PC_Pokemon[4].hp > 0 && PC_Pokemon[4].exists == 1) || (PC_Pokemon[5].hp > 0 && PC_Pokemon[5].exists == 1)) { // pulls up revive menu
						
						optionselected = 0;
						mvprintw(19, 0, " ______________________________________________________________________________ ");
						mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', (PC_Pokemon[0].hp > 0 && PC_Pokemon[0].exists == 1) ? PC_Pokemon[0].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', (PC_Pokemon[1].hp > 0 && PC_Pokemon[1].exists == 1) ? PC_Pokemon[1].pokemonType->identifier : " ");
						mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', (PC_Pokemon[2].hp > 0 && PC_Pokemon[2].exists == 1) ? PC_Pokemon[2].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', (PC_Pokemon[3].hp > 0 && PC_Pokemon[3].exists == 1) ? PC_Pokemon[3].pokemonType->identifier : " ");
						mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', (PC_Pokemon[4].hp > 0 && PC_Pokemon[4].exists == 1) ? PC_Pokemon[4].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', (PC_Pokemon[5].hp > 0 && PC_Pokemon[5].exists == 1) ? PC_Pokemon[5].pokemonType->identifier : " ");
						mvprintw(23, 0, "|______________________________________________________________________________|");
						refresh();
						
						while (true) { // selection menu
							userinput = getch();
							if (optionselected == 0 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 4;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 2;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 1;
								}
							}
							else if (optionselected == 1 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 5;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 3;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 0;
								}
							}
							else if (optionselected == 2 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 0;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 4;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 3;
								}
							}
							else if (optionselected == 3 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 1;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 5;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 2;
								}
							}
							else if (optionselected == 4 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 2;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 0;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 5;
								}
							}
							else if (optionselected == 5 && userinput != '\n' && (int)userinput != 7) {
								if ((int)userinput == 3 || userinput == 'i') { // up
									optionselected = 3;
								}
								else if ((int)userinput == 2 || userinput == 'k') { // down
									optionselected = 1;
								}
								else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
									optionselected = 4;
								}
							}
							else if (optionselected == 0 && userinput == '\n' && PC_Pokemon[0].hp > 0 && PC_Pokemon[0].exists == 1) {
								PC_Pokemon[0].hp = PC_Pokemon[0].hp + 20;
								if (PC_Pokemon[0].hp > PC_Pokemon[0].pokemonStats[0]) {
									PC_Pokemon[0].hp = PC_Pokemon[0].pokemonStats[0];
								}
								PC_Potions = PC_Potions - 1;
								return;
							}
							else if (optionselected == 1 && userinput == '\n' && PC_Pokemon[1].hp > 0 && PC_Pokemon[1].exists == 1) {
								PC_Pokemon[1].hp = PC_Pokemon[1].hp + 20;
								if (PC_Pokemon[1].hp > PC_Pokemon[1].pokemonStats[0]) {
									PC_Pokemon[1].hp = PC_Pokemon[1].pokemonStats[0];
								}
								PC_Potions = PC_Potions - 1;
								return;
							}
							else if (optionselected == 2 && userinput == '\n' && PC_Pokemon[2].hp > 0 && PC_Pokemon[2].exists == 1) {
								PC_Pokemon[2].hp = PC_Pokemon[2].hp + 20;
								if (PC_Pokemon[2].hp > PC_Pokemon[2].pokemonStats[0]) {
									PC_Pokemon[2].hp = PC_Pokemon[2].pokemonStats[0];
								}
								PC_Potions = PC_Potions - 1;
								return;
							}
							else if (optionselected == 3 && userinput == '\n' && PC_Pokemon[3].hp > 0 && PC_Pokemon[3].exists == 1) {
								PC_Pokemon[3].hp = PC_Pokemon[3].hp + 20;
								if (PC_Pokemon[3].hp > PC_Pokemon[3].pokemonStats[0]) {
									PC_Pokemon[3].hp = PC_Pokemon[3].pokemonStats[0];
								}
								PC_Potions = PC_Potions - 1;
								return;
							}
							else if (optionselected == 4 && userinput == '\n' && PC_Pokemon[4].hp > 0 && PC_Pokemon[4].exists == 1) {
								PC_Pokemon[4].hp = PC_Pokemon[4].hp + 20;
								if (PC_Pokemon[4].hp > PC_Pokemon[4].pokemonStats[0]) {
									PC_Pokemon[4].hp = PC_Pokemon[4].pokemonStats[0];
								}
								PC_Potions = PC_Potions - 1;
								return;
							}
							else if (optionselected == 5 && userinput == '\n' && PC_Pokemon[5].hp > 0 && PC_Pokemon[5].exists == 1) {
								PC_Pokemon[5].hp = PC_Pokemon[5].hp + 20;
								if (PC_Pokemon[5].hp > PC_Pokemon[5].pokemonStats[0]) {
									PC_Pokemon[5].hp = PC_Pokemon[5].pokemonStats[0];
								}
								PC_Potions = PC_Potions - 1;
								return;
							}
							//else if ((int)userinput == 7) { // backspace
								//mvprintw(19, 0, " ______________________________________________________________________________ ");
								//mvprintw(20, 0, "|    FIGHT                                                         >POKEMON    |");
								//mvprintw(21, 0, "|    PACK                                                           RUN        |");
								//mvprintw(22, 0, "|                                                                              |");
								//mvprintw(23, 0, "|______________________________________________________________________________|");
								//optionselected = 1;
								//refresh();
								//break;
							//}
							
							mvprintw(19, 0, " ______________________________________________________________________________ ");
							mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', (PC_Pokemon[0].hp > 0 && PC_Pokemon[0].exists == 1) ? PC_Pokemon[0].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', (PC_Pokemon[1].hp > 0 && PC_Pokemon[1].exists == 1) ? PC_Pokemon[1].pokemonType->identifier : " ");
							mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', (PC_Pokemon[2].hp > 0 && PC_Pokemon[2].exists == 1) ? PC_Pokemon[2].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', (PC_Pokemon[3].hp > 0 && PC_Pokemon[3].exists == 1) ? PC_Pokemon[3].pokemonType->identifier : " ");
							mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', (PC_Pokemon[4].hp > 0 && PC_Pokemon[4].exists == 1) ? PC_Pokemon[4].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', (PC_Pokemon[5].hp > 0 && PC_Pokemon[5].exists == 1) ? PC_Pokemon[5].pokemonType->identifier : " ");
							mvprintw(23, 0, "|______________________________________________________________________________|");
							refresh();
						}
					}
					else { // all pokemon are dead
						mvprintw(22, 0, "|    All Pokemon are Dead                                                      |");
						refresh();
						sleep(1);
						mvprintw(22, 0, "|                                                                              |");
						refresh();
						continue;
					}
					
					/*
					PC_Pokemon[*PCPokemonSelection].hp = PC_Pokemon[*PCPokemonSelection].hp + 20;
					if (PC_Pokemon[*PCPokemonSelection].hp > PC_Pokemon[*PCPokemonSelection].pokemonStats[0]) {
						PC_Pokemon[*PCPokemonSelection].hp = PC_Pokemon[*PCPokemonSelection].pokemonStats[0];
					}
					PC_Potions = PC_Potions - 1;
					*/
					
					return;
				}
				else if ((int)userinput == 7) { // backspace
					return;
				}
				
				mvprintw(19, 0, " ______________________________________________________________________________ ");
				mvprintw(20, 0, "|   %c%2dx Revives                                              %c%2dx Potions     |", optionselected == 0 ? '>' : ' ', PC_Revives, optionselected == 1 ? '>' : ' ', PC_Potions);
				mvprintw(21, 0, "|   %c%2dx Pokeballs                                            %c%2dx Greatballs  |", optionselected == 2 ? '>' : ' ', PC_Pokeballs, optionselected == 3 ? '>' : ' ', PC_Greatballs);
				mvprintw(22, 0, "|   %c%2dx Ultraballs                                           %c%2dx Masterballs |", optionselected == 4 ? '>' : ' ', PC_Ultraballs, optionselected == 5 ? '>' : ' ', PC_Masterballs);
				mvprintw(23, 0, "|______________________________________________________________________________|");
				refresh();
			}
}

void enter_PokeCenter() {
	clear();
	mvprintw(19, 0, " ______________________________________________________________________________ ");
	mvprintw(20, 0, "|                                                                              |");
	mvprintw(21, 0, "|    Your Pokemon have been revived and healed!                                |");
	mvprintw(22, 0, "|                                                                              |");
	mvprintw(23, 0, "|______________________________________________________________________________|");
	refresh();
	sleep(1);
	
	for (int i = 0; i < 6; i++) { // heals and revives
		if (PC_Pokemon[i].exists == 1)
			PC_Pokemon[i].hp = PC_Pokemon[i].pokemonStats[0];
	}
	
	if (PC_PokeStorage[0].exists == 1) { // there are pokemon in storage
		mvprintw(19, 0, " ______________________________________________________________________________ ");
		mvprintw(20, 0, "|                                                                              |");
		mvprintw(21, 0, "|    Would you like to swap pokemon? (y/n)                                     |");
		mvprintw(22, 0, "|                                                                              |");
		mvprintw(23, 0, "|______________________________________________________________________________|");
		refresh();
		
		char userinput = ' ';
		while (userinput != 'y' && userinput != 'n') {
			userinput = getch();
		}
		if (userinput == 'n') {
			return;
		}
		
		swap_Pokemon();
	}
	else { // there aren't pokemon in storage
		mvprintw(19, 0, " ______________________________________________________________________________ ");
		mvprintw(20, 0, "|                                                                              |");
		mvprintw(21, 0, "|    There are no pokemon in storage                                           |");
		mvprintw(22, 0, "|                                                                              |");
		mvprintw(23, 0, "|______________________________________________________________________________|");
		refresh();
		sleep(1);
		return;
	}
}

void swap_Pokemon() {
	int battlePokemonSelector = 0; // {0, 5}
	int storagePokemonSelector = 0; // {0, 199}
	
	clear();
	mvprintw(19, 0, " ______________________________________________________________________________ ");
	mvprintw(20, 0, "|                                                                              |");
	mvprintw(21, 0, "|    Choose Battle Pokemon to swap                                             |");
	mvprintw(22, 0, "|                                                                              |");
	mvprintw(23, 0, "|______________________________________________________________________________|");
	refresh();
	sleep(1);
	
	
	int optionselected = 0;
	mvprintw(19, 0, " ______________________________________________________________________________ ");
	mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', (PC_Pokemon[0].hp > 0 && PC_Pokemon[0].exists == 1) ? PC_Pokemon[0].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', (PC_Pokemon[1].hp > 0 && PC_Pokemon[1].exists == 1) ? PC_Pokemon[1].pokemonType->identifier : " ");
	mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', (PC_Pokemon[2].hp > 0 && PC_Pokemon[2].exists == 1) ? PC_Pokemon[2].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', (PC_Pokemon[3].hp > 0 && PC_Pokemon[3].exists == 1) ? PC_Pokemon[3].pokemonType->identifier : " ");
	mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', (PC_Pokemon[4].hp > 0 && PC_Pokemon[4].exists == 1) ? PC_Pokemon[4].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', (PC_Pokemon[5].hp > 0 && PC_Pokemon[5].exists == 1) ? PC_Pokemon[5].pokemonType->identifier : " ");
	mvprintw(23, 0, "|______________________________________________________________________________|");
	refresh();
	
	while (true) { // selection menu
		char userinput = getch();
		if (optionselected == 0 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 3 || userinput == 'i') { // up
				optionselected = 4;
			}
			else if ((int)userinput == 2 || userinput == 'k') { // down
				optionselected = 2;
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 1;
			}
		}
		else if (optionselected == 1 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 3 || userinput == 'i') { // up
				optionselected = 5;
			}
			else if ((int)userinput == 2 || userinput == 'k') { // down
				optionselected = 3;
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 0;
			}
		}
		else if (optionselected == 2 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 3 || userinput == 'i') { // up
				optionselected = 0;
			}
			else if ((int)userinput == 2 || userinput == 'k') { // down
				optionselected = 4;
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 3;
			}
		}
		else if (optionselected == 3 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 3 || userinput == 'i') { // up
				optionselected = 1;
			}
			else if ((int)userinput == 2 || userinput == 'k') { // down
				optionselected = 5;
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 2;
			}
		}
		else if (optionselected == 4 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 3 || userinput == 'i') { // up
				optionselected = 2;
			}
			else if ((int)userinput == 2 || userinput == 'k') { // down
				optionselected = 0;
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 5;
			}
		}
		else if (optionselected == 5 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 3 || userinput == 'i') { // up
				optionselected = 3;
			}
			else if ((int)userinput == 2 || userinput == 'k') { // down
				optionselected = 1;
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 4;
			}
		}
		else if (userinput == '\n' && PC_Pokemon[optionselected].exists == 1) {
			break;
		}
		//else if ((int)userinput == 7) { // backspace
			//mvprintw(19, 0, " ______________________________________________________________________________ ");
			//mvprintw(20, 0, "|    FIGHT                                                         >POKEMON    |");
			//mvprintw(21, 0, "|    PACK                                                           RUN        |");
			//mvprintw(22, 0, "|                                                                              |");
			//mvprintw(23, 0, "|______________________________________________________________________________|");
			//optionselected = 1;
			//refresh();
			//break;
		//}
		
		mvprintw(19, 0, " ______________________________________________________________________________ ");
		mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', (PC_Pokemon[0].hp > 0 && PC_Pokemon[0].exists == 1) ? PC_Pokemon[0].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', (PC_Pokemon[1].hp > 0 && PC_Pokemon[1].exists == 1) ? PC_Pokemon[1].pokemonType->identifier : " ");
		mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', (PC_Pokemon[2].hp > 0 && PC_Pokemon[2].exists == 1) ? PC_Pokemon[2].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', (PC_Pokemon[3].hp > 0 && PC_Pokemon[3].exists == 1) ? PC_Pokemon[3].pokemonType->identifier : " ");
		mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', (PC_Pokemon[4].hp > 0 && PC_Pokemon[4].exists == 1) ? PC_Pokemon[4].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', (PC_Pokemon[5].hp > 0 && PC_Pokemon[5].exists == 1) ? PC_Pokemon[5].pokemonType->identifier : " ");
		mvprintw(23, 0, "|______________________________________________________________________________|");
		refresh();
	}
	battlePokemonSelector = optionselected;
	
	clear();
	mvprintw(19, 0, " ______________________________________________________________________________ ");
	mvprintw(20, 0, "|                                                                              |");
	mvprintw(21, 0, "|    Choose Storage Pokemon to swap                                            |");
	mvprintw(22, 0, "|                                                                              |");
	mvprintw(23, 0, "|______________________________________________________________________________|");
	refresh();
	sleep(1);
	
	optionselected = 0;
	int menulevel = 0; // determines scrolling
	mvprintw(19, 0, " ______________________________________________________________________________ ");
	mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', (PC_PokeStorage[0 + 2 * menulevel].exists == 1) ? PC_PokeStorage[0 + 2 * menulevel].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', (PC_PokeStorage[1 + 2 * menulevel].exists == 1) ? PC_PokeStorage[1 + 2 * menulevel].pokemonType->identifier : " ");
	mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', (PC_PokeStorage[2 + 2 * menulevel].exists == 1) ? PC_PokeStorage[2 + 2 * menulevel].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', (PC_PokeStorage[3 + 2 * menulevel].exists == 1) ? PC_PokeStorage[3 + 2 * menulevel].pokemonType->identifier : " ");
	mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', (PC_PokeStorage[4 + 2 * menulevel].exists == 1) ? PC_PokeStorage[4 + 2 * menulevel].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', (PC_PokeStorage[5 + 2 * menulevel].exists == 1) ? PC_PokeStorage[5 + 2 * menulevel].pokemonType->identifier : " ");
	mvprintw(23, 0, "|______________________________________________________________________________|");
	refresh();
	
	while (true) {
		char userinput = getch();
		
		if (optionselected == 2 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 3 || userinput == 'i') { // up
				if (menulevel == 0) { // if at the top of scroll menu
					optionselected = 0;
				}
				else {
					menulevel = menulevel - 1;
				}
				
			}
			else if ((int)userinput == 2 || userinput == 'k') { // down
				if (PC_PokeStorage[4 + 2 * menulevel].exists != 1 || menulevel >= 97) { // stop allowing scroll down condition
					optionselected = 4;
				}
				else {
					menulevel = menulevel + 1;
				}
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 3;
			}
		}
		else if (optionselected == 3 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 3 || userinput == 'i') { // up
				if (menulevel == 0) { // if at the top of scroll menu
					optionselected = 1;
				}
				else {
					menulevel = menulevel - 1;
				}
				
			}
			else if ((int)userinput == 2 || userinput == 'k') { // down
				if (PC_PokeStorage[4 + 2 * menulevel].exists != 1 || menulevel >= 97) { // stop allowing scroll down condition
					optionselected = 5;
				}
				else {
					menulevel = menulevel + 1;
				}
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 2;
			}
		}
		else if (optionselected == 0 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 2 || userinput == 'k') { // down
				optionselected = 2;
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 1;
			}
		}
		else if (optionselected == 1 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 2 || userinput == 'k') { // down
				optionselected = 3;
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 0;
			}
		}
		else if (optionselected == 4 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 3 || userinput == 'i') { // up
				optionselected = 2;
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 5;
			}
		}
		else if (optionselected == 5 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 3 || userinput == 'i') { // up
				optionselected = 3;
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 4;
			}
		}
		else if (userinput == '\n' && PC_Pokemon[optionselected + 2 * menulevel].exists == 1) {
			storagePokemonSelector = optionselected + 2 * menulevel;
			break;
		}
		
		
		mvprintw(19, 0, " ______________________________________________________________________________ ");
		mvprintw(20, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 0 ? '>' : ' ', (PC_PokeStorage[0 + 2 * menulevel].exists == 1) ? PC_PokeStorage[0 + 2 * menulevel].pokemonType->identifier : " ", optionselected == 1 ? '>' : ' ', (PC_PokeStorage[1 + 2 * menulevel].exists == 1) ? PC_PokeStorage[1 + 2 * menulevel].pokemonType->identifier : " ");
		mvprintw(21, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 2 ? '>' : ' ', (PC_PokeStorage[2 + 2 * menulevel].exists == 1) ? PC_PokeStorage[2 + 2 * menulevel].pokemonType->identifier : " ", optionselected == 3 ? '>' : ' ', (PC_PokeStorage[3 + 2 * menulevel].exists == 1) ? PC_PokeStorage[3 + 2 * menulevel].pokemonType->identifier : " ");
		mvprintw(22, 0, "|   %c%-15s                                              %c%-12s|", optionselected == 4 ? '>' : ' ', (PC_PokeStorage[4 + 2 * menulevel].exists == 1) ? PC_PokeStorage[4 + 2 * menulevel].pokemonType->identifier : " ", optionselected == 5 ? '>' : ' ', (PC_PokeStorage[5 + 2 * menulevel].exists == 1) ? PC_PokeStorage[5 + 2 * menulevel].pokemonType->identifier : " ");
		mvprintw(23, 0, "|______________________________________________________________________________|");
		refresh();
	}
	storagePokemonSelector = optionselected + 2 * menulevel;
	
	
	
	fullPokemon tempPoke = PC_Pokemon[battlePokemonSelector];
	PC_Pokemon[battlePokemonSelector] = PC_PokeStorage[storagePokemonSelector];
	PC_PokeStorage[storagePokemonSelector] = tempPoke;
	return;
}

void enter_PokeMart() {
	clear();
	int optionselected = 0;
	mvprintw(1, 0, "   You have %d PokeBucks       ", pokeBucks);
	mvprintw(19, 0, " ______________________________________________________________________________ ");
	mvprintw(20, 0, "|   %c%2dx Revives                                              %c%2dx Potions     |", optionselected == 0 ? '>' : ' ', PC_Revives, optionselected == 1 ? '>' : ' ', PC_Potions);
	mvprintw(21, 0, "|   %c%2dx Pokeballs                                            %c%2dx Greatballs  |", optionselected == 2 ? '>' : ' ', PC_Pokeballs, optionselected == 3 ? '>' : ' ', PC_Greatballs);
	mvprintw(22, 0, "|   %c%2dx Ultraballs                                           %c%2dx Masterballs |", optionselected == 4 ? '>' : ' ', PC_Ultraballs, optionselected == 5 ? '>' : ' ', PC_Masterballs);
	mvprintw(23, 0, "|______________________________________________________________________________|");
	refresh();
	
	while (true) {
		char userinput = ' ';
		userinput = getch();
		
		if (optionselected == 0 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 3 || userinput == 'i') { // up
				optionselected = 4;
			}
			else if ((int)userinput == 2 || userinput == 'k') { // down
				optionselected = 2;
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 1;
			}
		}
		else if (optionselected == 1 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 3 || userinput == 'i') { // up
				optionselected = 5;
			}
			else if ((int)userinput == 2 || userinput == 'k') { // down
				optionselected = 3;
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 0;
			}
		}
		else if (optionselected == 2 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 3 || userinput == 'i') { // up
				optionselected = 0;
			}
			else if ((int)userinput == 2 || userinput == 'k') { // down
				optionselected = 4;
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 3;
			}
		}
		else if (optionselected == 3 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 3 || userinput == 'i') { // up
				optionselected = 1;
			}
			else if ((int)userinput == 2 || userinput == 'k') { // down
				optionselected = 5;
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 2;
			}
		}
		else if (optionselected == 4 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 3 || userinput == 'i') { // up
				optionselected = 2;
			}
			else if ((int)userinput == 2 || userinput == 'k') { // down
				optionselected = 0;
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 5;
			}
		}
		else if (optionselected == 5 && userinput != '\n' && (int)userinput != 7) {
			if ((int)userinput == 3 || userinput == 'i') { // up
				optionselected = 3;
			}
			else if ((int)userinput == 2 || userinput == 'k') { // down
				optionselected = 1;
			}
			else if ((int)userinput == 5 || userinput == 'l' || (int)userinput == 4 || userinput == 'j') { // left and right
				optionselected = 4;
			}
		}
		else if (userinput == '\n') { // enter
			switch(optionselected) {
				case 0:
					if (PC_Revives < 99 && pokeBucks >= 100) {
						pokeBucks = pokeBucks - 100;
						++PC_Revives;
					}
					break;
				case 1:
					if (PC_Potions < 99 && pokeBucks >= 100) {
						pokeBucks = pokeBucks - 100;
						++PC_Potions;
					}
					break;
				case 2:
					if (PC_Pokeballs < 99 && pokeBucks >= 100) {
						pokeBucks = pokeBucks - 100;
						++PC_Pokeballs;
					}
					break;
				case 3:
					if (PC_Greatballs < 99 && pokeBucks >= 200) {
						pokeBucks = pokeBucks - 200;
						++PC_Greatballs;
					}
					break;
				case 4:
					if (PC_Ultraballs < 99 && pokeBucks >= 400) {
						pokeBucks = pokeBucks - 400;
						++PC_Ultraballs;
					}
					break;
				case 5:
					if (PC_Masterballs < 99 && pokeBucks >= 1000) {
						pokeBucks = pokeBucks - 1000;
						++PC_Masterballs;
					}
					break;
			}
		}
		else if ((int)userinput == 7) { // backspace
			break;
		}
		
		mvprintw(1, 0, "   You have %d PokeBucks       ", pokeBucks);
		mvprintw(19, 0, " ______________________________________________________________________________ ");
		mvprintw(20, 0, "|   %c%2dx Revives                                              %c%2dx Potions     |", optionselected == 0 ? '>' : ' ', PC_Revives, optionselected == 1 ? '>' : ' ', PC_Potions);
		mvprintw(21, 0, "|   %c%2dx Pokeballs                                            %c%2dx Greatballs  |", optionselected == 2 ? '>' : ' ', PC_Pokeballs, optionselected == 3 ? '>' : ' ', PC_Greatballs);
		mvprintw(22, 0, "|   %c%2dx Ultraballs                                           %c%2dx Masterballs |", optionselected == 4 ? '>' : ' ', PC_Ultraballs, optionselected == 5 ? '>' : ' ', PC_Masterballs);
		mvprintw(23, 0, "|______________________________________________________________________________|");
		refresh();
	}
	
	
	
}
	