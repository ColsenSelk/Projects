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

#include "poke327.h"
#include "io.h"
#include "db_parse.h"

typedef struct pokemon_db pokemon_db_t;
typedef struct move_db move_db_t;
typedef struct stats_db stats_db_t;
typedef struct pokemon_stats_db pokemon_stats_db_t;

struct fullPokemon {
	pokemon_db_t *pokemonType; // species
	move_db_t pokemonMoveset[4]; // should have up to 4 moves
	int pokemonBaseStats[8]; // base stats + IV for each stat of the pokemon
	int pokemonStats[8]; // current stats. [0] is hp, [1] is attack, [2] is defence, [3] is special-attack, [4] is special-defence, [5] is speed, [6] is accuracy, [7] is evasion. [#] + 1 is id.
	int isShiny;
	int level;
	int gender; // 0 is female, 1 is male
	int hp;
	int pp[4]; //keeps track of all moves pp's... :-)
	int exists; // equals 1 if exists
	int type_id[2]; // pokemon_type
};

void check_tallgrass(pair_t playerNewLoc);
void create_pokemon_encounter();
void level_up_pokemon(fullPokemon *leveledPokemon);
fullPokemon generate_pokemon();
void pokemon_Battle();
void print_Battle_Box(char* inp);
void print_Battle_Box_On_Death(char* inp, int numTrainerPokemon, int numTrainerPokemonLeft, int numPCPokemon, int numPCPokemonLeft);
void battle_do_move(move_db_t PCMove, int isSwitchPC, fullPokemon *trainerPokemon, fullPokemon *PCPokemon, int *trainerPokemonSelection, int *PCPokemonSelection, int newSelectionPC, int isWild);
void print_Pokemon_Menu(fullPokemon *PCPokemon, int *PCPokemonSelection, int *trainerPokemonSelection, fullPokemon *trainerPokemon, int isWild);
void select_initial_pokemon();
void open_bag_menu();
void enter_PokeCenter();
void swap_Pokemon();
void enter_PokeMart();
void print_Battle_Box2(char* inp);

extern fullPokemon PC_Pokemon[6];
extern int pokeBucks;
extern fullPokemon PC_PokeStorage[200];