#Instructions

run "make all" to compile, and then "make run" to run. 'b' opens bag, '>' opens pokemarts and pokecenters. use arrow keys to move around in menus, enter and backspace.

if you have more than 6 pokemon in the storage you can continue hitting the down arrow to scroll down and see all of them. I gave 1000 pokebucks to start off to allow testing of buying items.
Must be ran with linux with C and C++ libraries



#About

added pokemon storage and pokecenter and pokemart implementation (see changelog for more detail). added effectiveness (type) to effects, if a move is not normal effectiveness it will be displayed as such. 

added greatballs ultraballs and masterballs, their chance is based off the wiki as specified.

added pokebucks which are gained upon winning battles.

pokemon are auto healed at the pokecenter, and the user is able to swap pokemon in the pokecenter.

the pokemart allows buying of items assuming the user has enough money (the ultraballs, greatballs, and masterballs cost more than 100 pokebucks)

Note: IO, Poke327, Heap, Character, parts of db_parse were given but have been modified by me. pokedex is an outside library. - Colsen Selk
