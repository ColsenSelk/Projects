OBJS	= main.o mapgenerator.o
SOURCE	= main.c mapgenerator.c
HEADER	= mapgen.h
OUT	= main.exe
CC	 = gcc
FLAGS	 = -g -c -Wall
LFLAGS	 = 

all: $(OBJS)
	$(CC) -g $(OBJS) -o $(OUT) $(LFLAGS) -lm -lncurses

main.o: main.c
	$(CC) $(FLAGS) main.c -lm -lncurses
	

mapgenerator.o: mapgenerator.c
	$(CC) $(FLAGS) mapgenerator.c -lm -lncurses


clean:
	rm -f $(OBJS) $(OUT)

run: $(OUT)
	./$(OUT)