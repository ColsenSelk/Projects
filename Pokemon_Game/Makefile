CC = gcc
CXX = g++
ECHO = echo
RM = rm -f

CFLAGS = -Wall -Werror -ggdb -funroll-loops -lstdc++ -DTERM=$(TERM)
CXXFLAGS = -Wall -Werror -ggdb -funroll-loops -g -DTERM=$(TERM)

LDFLAGS = -lncurses

BIN = poke327
OBJS = poke327.o heap.o character.o io.o db_parse.o poke_loader.o

OUT = poke327.exe

all: $(OBJS)
	$(CXX) -g $(OBJS) -o $(OUT) $(CXXFLAGS) -lm -lncurses

$(BIN): $(OBJS)
	@$(ECHO) Linking $@
	@$(CXX) $^ -o $@ $(LDFLAGS)

-include $(OBJS:.o=.d)

%.o: %.c
	@$(ECHO) Compiling $<
	@$(CC) $(CFLAGS) -MMD -MF $*.d -c $<

%.o: %.cpp
	@$(ECHO) Compiling $<
	@$(CXX) $(CXXFLAGS) -MMD -MF $*.d -c $<

.PHONY: all clean clobber etags

clean:
	@$(ECHO) Removing all generated files
	@$(RM) *.o $(BIN) *.d TAGS core vgcore.* gmon.out

clobber: clean
	@$(ECHO) Removing backup files
	@$(RM) *~ \#* *pgm

etags:
	@$(ECHO) Updating TAGS
	@etags *.[ch]
	
run: $(OUT)
	./$(OUT)
