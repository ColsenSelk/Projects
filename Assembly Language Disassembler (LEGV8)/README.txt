Best ran in linux, requires a LEGV8 emulater (needs placed in this folder) and C library
"assignment1.legv8asm" given as a example file
Made for a Computer Engineering class.

1. place legv8asm file to be run into this folder

2. run 'sh build.sh' in terminal to compile the disassembler

3. run './legv8emul assignment1.legv8asm' or any filename with .legv8asm to create a .legv8asm.machine file that holds the assembly language in binary opcode format

4. run 'sh run.sh assignment1.legv8asm.machine' or any filename with .legv8asm.machine to run the disassembler

terminal will then show the binary opcode language re-translated back into human-readable assembly language.