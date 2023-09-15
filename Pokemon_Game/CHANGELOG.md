#ASSIGNMENT 1.01
    #Day 1
    Created CHANGELOG and README
    Created Makefile
    Created mapgenerator.c
    Created main.c
    Updated mapgenerator.c with the function generateNSPath() that generates the path that spans the north and south borders.
        created the path direction random selection that factors in where the border is, and places emphasis on heading in a more southward direction
        created path placer based on path direction
    Updated mapgenerator.c with a displayMap function that displays the map on the console
    After testing, tweaked emphasis on path direction in generateNSPath() to create more likeable pathing
    copied and modified generateNSPath() to make generateWEPath(), which is favored to make straighter pathing
    created placePokeCenter() in mapgenerator.c, which looks for a random empty 2x2 location where there is pathing touching and places a pokecenter there
    created placePokeMart() in mapgenerator.c, which is a copy of placePokeCenter() except it places a PokeMart instead.
        removed error using == instead of = in placePokeCenter() and placePokeMart(). After testing both work as intended.
    created border rocks by modifying the initiator of map[][] in mapgenerator.c.
    started work on tall grass generator in mapgenerator.c.

    #Day 2
    continued work on tall grass generator, creating a semi-finished version. (is buggy and still needs work).
    moved location of srand to avoid duplicates.

    #Day 3
    replaced rand() with random() because it works significantly better than rand(), and rand() was causing issues.
    reworked tall grass generator. now have a fully functional version.
    created generateTree(), a modification of generateTallGrass().
    created generateBoulder(), a modification of generateTree().
    fixed minor problem with path directing, causing too extreme of pathing to be made
    modified path directing to head straight when nearing border. this removes chance of creating 2 exit paths per border.
    created generateClearing(), a modification of generateTallGrass.

    #Day 4
    moved main() to main.c
    updated Makefile to align with the movement of main
    fixed an == that should be = on line 192 and 195 of mapgenerator.c
    created mapgen.h to stop implicit declaration warnings.
        updated Makefile to reflect change
    created sendMap(), that will return an element in mapgenerator.c's map. use is for possible future purposes.
    cleaned up a lot of coding in mapgenerator.c
    updated README
    combined placePokeCenter() and placePokeMart() into one function: placePokeMC(char c)
        updated mapgen.h and main.c to go with the change

#ASSIGNMENT 1.02
    #Day 1
    placed new struct in mapgen.h named map that contains map[][]
    placed mapgrid variable in mapgenerator.c that contains a 399x399 array of map struct.
    created assignmap in mapgen.h and mapgenerator.c that assigns the current map to a spot in mapgrid and then clears the current map.
    created additional displayMap() named displayMapgrid that has parameters that will display from mapgrid instead of from current map.
    updated generateNSPath() and generateWEPath to have a parameter named assignment that assigns the start variable. it will be randomly generated if assignment == -1.
    updated mapgrid struct to include the exit locations which will tell where the pathing has to start.
    created currentLocX and currentLocY and d (distance) in mapgenerator.c which will be used to keep track of which map the player is on.
    placed exit setter in generateNSPath() and generateWEPath()
    
    #Day 2
    finished exit setter and tested.
    updated generateWEPath with another parameter (Eassignment) that designates where the east border must be. the function will keep making paths until the east border position is in the correct position.
        scrapped previous change, made it so at the last little bit the path forcefully moves the path to be at the exit.
            plan on adding bias for path direction to head towards the exit so the force is less jarring
    added moveNorth() in mapgenerator.c, which places current map, then moves current location, then generates the new location based on criteria. 
        fixed problem trying to detect null.
    fixed problem in generateNSPath where exit locations werent being properly assigned.

    #Day 3
    added clause in moveNorth that handles existing maps.
    removed an assignmap in main.c that was causing issues saving the first map.
    added moveSouth(), moveEast(), and moveWest(), modifications of moveNorth().
        added them in mapgen.h
        tested different movement combinations to see if borders were aligning properly. they are!
    added while loop in main that takes user's input using fgets and based on what they put in will run commands.
        n runs moveNorth
        s runs moveSouth
        w runs moveWest
        e runs moveEast
        q exits the while loop
        f int int runs a yet to be made flyTo(int X, int Y) command that teleports to a specific map.
    added clause in the move commands that stops the assignment of empty maps to already assigned maps, stopping accidental deletion of maps.
    created flyTo(int X, int Y), a modification of moveNorth. it teleports to and/or makes a specified map.
    fixed chance of pokecenter and pokemart to better represent the chances asked for.

#ASSIGNMENT 1.03
    #Day 1
    created struct djik in mapgen.h (it keeps track of shortest path length, whether the path tile has been visited, and what the path tile is)
    started implementation of finding the shortest path in mapgenerator.c.
        wrote TODO's for finding the shortest path.
            wrote TODO's around a queue system that will execute the algorithm in 'layers.'
        started with implementing the north move.

    #Day 2
    finished implementation for the 'recursive' (not actually recursive, will use a queue system) find shortest path function. (has yet to be tested)
        fixed compile errors from using stuff like: .length when not applicable, forgotten {} or ()'s, etc.
        fixed some logic errors, however it hasn't been tested so there still might be more.
    implemented the queue 'firing' system and starting procedures for finding shortest path.
    began testing
        need to fix problem attempting to generate already generated map.

    #Day 3
    added clause into the move functions for finding shortest path to stop if the current spot is greater or equal to the end path
    continuing testing to narrow down reason for segmentation fault.
        discovered segmentation fault is occuring really early.
    implemented a system where each mapTile (djik) only remembers the previous node and replaces the system of storing of all previous nodes in each mapTile.
        this seemed to fix some of the immediate segmentation faulting. should also help with memory usage and runtime.
    continued testing (placed printf's and puts's to narrow down where segmentation faulting was occuring)
        found problem where the queues would have values like -2143916944 that would cause segmentation faulting.
            forcefully set the queues to all have initial values of zero. this fixed the segmentation faulting!
            it does appear the program works, but only some of the times. (my guess is there is some small logic error with the move in the findShortPathRec function)
    
    #Day 4
    added clause to stop infinite recursion due to start position being assigned a prev path.
    tested pathing, the algorithm is taking the shortest path.
    added clause to stop algorithm from using path exits to go into the negative.
    found issue where there should've been a ',' when there  was a '.' which caused tall grass to be completely blocked
        findshortestpath now has a 100% success rate.
    added person struct that keeps track of where a 'person' is and whether or not they are controllable.

    #Day 5
    added code that displays the distance (sPathLength) of everything.
    added line of code that instantly assigns the start position a visited value of 1.
    modified findshortestpath function to take type person as input.
    added moveQueue to struct person.
        added feature into findshortestpath that sets the person's movequeue to the shortest path.
    modified displayMap and displayMapgrid to use printf and display people.
    modified main to be better fit towards criteria for assignment

#ASSIGNMENT 1.04
    #Day 1
    Created move players along prio queue that moves all players along their move queue, and is set up to generate new move queues if necessary in the future.
    Created Rand Walker Prio creation
    Created Wanderer Prio creation
    set up move players along prio queue's generate queue's
    created pacer prio creation

    #Day 2
    Fixed compile issues
    Changed FindShortestPath to take a pointer of person rather than make a copy. this way it can actually change the movequeue
        updated findshortestpath to not have a movequeue have it's first move move onto itself
    modified the other prio creation functions to take people pointers
    fixed problem in findpacerprioqueue when shifting elements in movequeue to the right.

    #Day 3
    added waiter int to person struct that keeps track of movetime, and when implemented will stop the person from moving for that amount of time
    added logic for waiter in moveplayersalongprioqueue that will stop people from moving when
    added clause that stops people from making moves into other people
    added clause that clears movequeue everytime a prio setting function is ran (except for findshortestpath, which already does it).
    placed whileloop around moveplayersalongprioqueue

    #Day 4
    fixed all other findprioqueue functions shifting of elements to the right (took code from findpacerprioqueue (Day 3 changelog))
    added copy of findpacerprioqueue (findpacerprioqueue2) that does north and south movement instead of east and west movement. (person with charType 'p' is east and west, and person with charType 'P' is north and south. 'P' is set to lowercase in displaymap so they display as the same thing)
        updated moveplayersalongprioqueue with the new copy.
    fixed problem where wanderer wasn't calling the correct person.
    added clause that clears movequeue if players attempt to colide (allows them to make moves after coliding).
    made it so randwalker cannot walk on pokemarts and pokecenters.
    ran testing, noticed randWalker acts really oddly and teleports when on the south and north side of the map sometimes (usually horizontally).
        after testing it seems the movequeue only wants to hold 25 elements

    #Day 5
    fixed teleportation bug (happened due to movequeue not being copied properly, moved to a manual copying system rather than using memcpy)
    created function createtrainers that creates numtrainers number of trainers.
    made it so pacer can not walk through pokemarts and pokecenters.    

    #Day 6
    seemed to fix issue where Rivals and hikers were attempting to move into the border for some reason (probably not the best solution, as it kinda ignores the underlying cause, however seems to work just fine).
    made it so trainers and player cannot spawn in pokecenters nor pokemarts.
    fixed problem where players and trainers was spawning inside boulders or trees.
    reduced amount hikers and rivals update their prio queue (findshortestpath) to reduce load.

#ASSIGNMENT 1.05
    #Day 1
    added NCURSES library to all .c and .h files.
    added clause in moveplayersalongprioqueue that stops any trainers (npc's) that aren't on the current map from moving. this reduces load on the program.
    made it so recently added functions (mainly that of 1.04 (createtrainers, etc.)) will work for other mapgrids and not just mapgrid[199][199]
        updated createtrainers function to not reset the player's memory everytime it's run, only the first time it's ran.
    made it so the array that stores all the people is dynamically allocated, and added statements that add more allocated memory to it before running createtrainers.
    updated createtrainers function so it doesn't break when running more than once by adding an extra parameter that increments the area of memory that it is updating.
        updated mapgen.h to match the change of parameters for createtrainers.
    added variable defeated to person struct, it tells whether the trainer has been defeated in battle or not: 0 for not defeated, 1 for has been defeated.
    fixed bug where a for loop inside a for loop was using the same variable (j) as it's iterator in moveplayersalongprioqueue.
    created clause in moveplayersalongprioqueue where when a player runs into a trainer, or a trainer runs into a player they will engage in a pokemon battle when the pokemon battle system is implemented. (For now it just prints a statement saying "POKEMON BATTLE!")
    added playermoverequest function that takes the user input and depending on what it is will move the player or will interact in some way.
        has movement implemented, including movement to other maps.
            controls placement of new trainers when moving to a new map
        has placeholders for other functions.
        added to mapgen.h
    modified makefile to have -lncurses
    modified displaymapgrid2 to use ncurses.
    added cbreak to stop newlines from having to be entered by user, and noecho to stop inputs from showing  up on screen.
    TODO: the way it's currently programmed,  there can only be a  max of 50 trainers/players. need to add functionality for more.

    #Day 2
    made an exception for PC to be able to move into border areas (assuming not attempting to move to boulder) in moveplayersalongprioqueue.
    added timeout to moveplayersalongprioqueue for getch().
    tested createtrainers function, appears it is causing segmentation faults when running more than once.
    removed cbreak and timeout and tested: immediate segmentation faulting has stopped. noticed that segmentation fault occurs when player tries to move into another player.
    added global amtTrainers variable that keeps track of the amount of trainers (including PC) in mapgenerator.c (same as sizePeople in main.c).
        replaced for loops with 50 as the amount of times they run to be amtTrainers amount of loops.
        added updater for amtTrainers in createTrainers function
    added quit functionality to playermoverequest and moveplayersalongprioqueue using return values.
    made player movement and trainer movement run separately which seems to have fixed segmentation faults, however introduced weird bugs. will need to update playermoverequest because it seems to be allowing to move into boulders and trees.

    #Day 3
    fixed issue causing bad movement of player.
    investigated issue of segmentation faults occuring when trying to go to new map. it seems for some reason the map isn't generating properly.
    added the placeholder for pokemart and pokecenter entering, including the exit menu feature.
    added cyan colored text for trainers, and red colored text for PC (done by modifying displaymapgrid2).
    created list feature when pressing t inside playerMoveRequest. still needs scroll functionality.
    did more testing on errors when moving to new map: appears the move{north, south, east, west} functions aren't executing the right part.
    slightly modified the move{north, south, east, west} functions.
    fixed error where X value was being assigned to Y value causing trainers to be assigned to wrong mapgrid in createTrainers.
    fixed problem where X and Y value were switched up in displaymapgrid2 (movement to a new map works for 1 turn and then all players disappear and then segmentation fault occurs now, similar to previous problem where).
    made it so user does not have to press a button multiple times for something to occur (this was done by moving the location of getch() in moveplayersalongprioqueue so it doesn't run it everytime).
    added clause in createtrainers that ignores collisions between trainers in different mapgrids
    
#ASSIGNMENT 1.06
    #Day 1
    moved to 1.05 solution.
    changed structs to classes and moved .c files to be .cpp files.
        updated cygwin to have the packages to run g++ (c++).
    fixed minor syntax errors.
    added a make run to makefile

    #Day 2
    added casts for comparisons to void*.
    added static casts for comparisons between signed ints and unsigned ints
    added casts to malloc's
    moved heap_node class to heap.h
    kept adding casts for every place that the compiler had an error. (specifically in heap.cpp, character.cpp, and io.cpp)
        code compiles, runs, and is fully functional.
    used powershell to download the pyrite pokemon information.
        placed pokedex folder into the assignment folder.
    
    #Day 3
    created import.h and import.cpp.
    created structs based on .csv files for pokemon, moves, pokemon_moves, pokemon_species, experience, type_names in import.h
    created grabcsvfiles() in import.cpp which grabs the information from the csv files and places them in an array of the structs talked about above.
    added printf statements to printout the imported data. placed exit at end of grabcsvfiles().
    put grabcsvfiles() call at the top of poke327.
    updated makefile to include import.o 

    #Day 4
    fixed errors in grabcsvfiles()
    changed #import <string.h> to #import <string>
        added other necessary imports.
    
#ASSIGNMENT 1.07
    #Day 1
    moved to 1.06 solution.
    replaced makefile with my makefile from 1.06
        added db_parse.o to makefile
    tested to see if 1.06 solution would run, it would not.
        installed VM.
        placed 1.07 into VM.
    
    #Day 2
    modified makefile to have make run.
    modified db_parce.cpp with correct file location for .csv files.
        fixed segmentation faulting
    created poke_loader.cpp and poke_loader.h
        added include of poke_loader.h in poke327.cpp and poke327.h
        added poke_loader.o in makefile
    put include of poke327.h in poke_loader.h and poke_loader.cpp
    changed db_parse(true) to db_parse(false) (to stop printing of csv files) and removed the early return 0 in main.
        (Code now runs normally)
    added check_tallgrass(pair_t dest) to poke_loader and added it to move_pc_func() in character.cpp as well as an include.
    implemented check_tallgrass(), which checks to see if the pc is in tall grass, and if so has a chance of starting a pokemon encounter.
    added create_pokemon_encounter in poke_loader.
    added stats.csv parsing in db_parse.
    added pokemon_stats.csv parsing in db_parse.
    added fullPokemon struct to pokemon_loader.h.
    started implementation of generate_pokemon() which randomly generates a fullPokemon.

    #Day 3
    created level_up_pokemon() that updates stats for the event of a level-up.
    implemented create_pokemon_encounter() to show the encountered pokemon's attributes.
    fixed syntax errors and other errors.
        program runs until an encounter occurs, at which point a floating point exception error occurs
    fixed error trying to remainder (modulo) by 0 when tempcount == 0.
    found and fixed error trying to remainder by 0 when d == 0.
        found by searching for floating point exception error. (search was done through attempting to exit the program just before the fault can occur)
        program now runs without error
    added clause that gives pokemon without any available moves the move splash, because it's funny.
    added minor formatting additions and tweaks.
    moved call to check_tallgrass() from character.cpp to move_pc_dir() in io.cpp and added an include of poke_loader.h for io.cpp.
    added gender to fullPokemon struct and made it randomized.
        added to encounter display.
    added move uniqueness checking.

#ASSIGNMENT 1.08
    #Day 1
    added pokemon_Battle() to poke_loader, which will start and display a pokemon battle
    added and implemented print_Battle_Box() that prints the bottom menu with some specified text. (a helper function for pokemon_Battle).
    added global array of 6 fullPokemon that represent the PC's (up to) 6 pokemon.
    added hp to fullPokemon (separate from the stats, this represents its actual health).
        modified generate_pokemon() to update hp.
    added pp[4] to fullPokemon.
    added and implemented print_Pokemon_Menu into poke_loader, which displays the user interaction menu during a battle and runs commands based on interactions.
    added and implemented print_Battle_Box_On_Death (poke_loader) that displays the amount of pokemon left, as well as a phrase.
    added and implemented print_Battle_Box (poke_loader) that displays a phrase.
    added and implemented battle_do_move (poke_loader) that runs moves given to it.
    fixed errors mostly relating to strings and casting.
        added strcat2, which instead of appending through dest, just returns the output.

    #Day 2
    added select_initial_pokemon() into poke_loader which assigns the PC's first pokemon.
    fixed movement around menu's caused by looking for incorrect inputs.
    fixed error passing by pointer to functions causing segmentation faults.
        attacking works near perfectly... somehow
    
    #Day 3
    added implementation for when trainer does move first.
    made it so non-existant trainer pokemon's hp are zero so that the summon ai won't summon non-existant pokemon
    rewrote battle_do_move() to be easier to understand.
    moved pokemon_Battle() call from main to io_battle(). this makes it so battles run when player touches a trainer, or vice versa.

    #Day 4
    modified strcat2() to hopefully stop issues with segmentation faulting and malloc errors. (variable is now global and is free'd after every use.)
        also increased size of malloc. this seems to have fixed all segmentation faulting and the program now returns to the normal map without crashing after facing a trainer.
    added pack menu (bag menu).
    added hp display in selection menu.
    added function parameter isWild that allows capturing and running away.
        implemented capturing and running away
    modified create_pokemon_encounter as essentially a copy of pokemon_Battle but with only one enemy pokemon and isWild = 1.
    fixed problem where pokemon selection menu would not register enter or backspace
    implemented revive menu.

    #Day 5
    added pokemon selection menu upon death.
    added pokemon_types struct to db_parse.h.
    added parsing of pokemon_types.csv.
    added pokemon_types to fullpokemon struct.
        added generator of pokemon_types inside generate_pokemon().
    updated STAB generator based on pokemon type. (STAB helps decide damage)
    added command to open bag in map. (open_bag_menu())
    changed io_handle_input to also have 'b' run open_bag_menu().
    made it so battles will not happen if all PC pokemon are dead.
    implemented finding number of pokemon left and number of pokemon that exist. (for displaying in print_Battle_Box_On_Death())

#ASSIGNMENT 1.09
    #Day 1
    created global variable pokeBucks.
    added ability to earn pokeBucks upon winning a pokemon battle.
    added and implemented enter_PokeCenter() into poke_loader.cpp, which heals and revives pokemon. (need to add a call when user enters pokecenter)
        added to poke_loader.h
    added and implemented swap_Pokemon which swaps pokemon from the battle storage to the long term storage given input.
    implemented swap pokemon menus with scrolling into swap_Pokemon.
        added call into enter_PokeCenter to allow user to swap pokemon.
    
    #Day 2
    added and implemented enter_PokeMart() which allows user to buy items
    added greatballs, ultraballs, and masterballs and also added them to menus.
    updated chances of catching pokeballs to be based on HP and not 100% chance (besides masterballs).
    added ability for captured pokemon to go into storage.
    created and started implementing multiply_damage_by_type() which modifies damage based on the attacking move type and the defending pokemon's type.

    #Day 3
    implemented multiply_damage_by_type().
    put calls to enter_PokeCenter and enter_PokeMart into io_poke_center and io_pokemart respectively.
    compiled and tested: somehow everything works first try.
    added effectiveness comments to battles
        added print_Battle_Box2()