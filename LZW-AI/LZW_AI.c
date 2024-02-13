// Author: Colsen Selk
// Latest Change: 2/13/2024

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define CAPACITY 256
#define CAPACITYDECODE 65535

unsigned short index_iter = 0; // keeps track of index of decoding dictionary

typedef struct dictionary_node_hash {
	unsigned short index; // play around with the size of index: unsigned short, unsigned int, etc.
	char append_value;

	//struct dictionary_node** nexthash; // the hashmap of the next sequence (append_value + next)
	//dictionary_node *prevNode; // the previous node. use in decoding to decipher all values based on index
}


typedef struct dictionary_node_hash_decoding { // does not require the knowledge of the nexthash in decoding
	//unsigned short index; // play around with the size of index: unsigned short, unsigned int, etc.
	char* value; // sequence of chars. when decoding: use index (encoded sequence = index) to find the node and then value will be the decoded sequence
	//struct dictionary_node *prevNode; // the previous node. use in decoding to decipher all values based on index
}

typedef struct dictionary_hash_item {
	char* index_hash; // should correspond to the last append_value. used as the key
	dictionary_node_hash* node; // 1 node
	dictionary_hash* next_hash_table;
}

typedef struct dictionary_hash {
	dictionary_hash_item** items;
	int size;
	int count;
}

unsigned char hash_function(char str) {
	return str % CAPACITY;
}

// MAIN TODO use TRIE for encoding dictionary
dictionary_hash* create_table(int size) { // create new hash table
	dictionary_hash* table = (dictionary_hash*) malloc(sizeof(dictionary_hash));
	table->size = size; // should be 256
	table->count = 0;
	table->items = (dictionary_hash_item**) calloc(table->size, sizeof(dictionary_hash_item*));
	for (int i = 0; i < table->size; i++)
        table->items[i] = NULL;

	return table;
} 


dictionary_hash_item* create_item(char* index_hash, dictionary_node_hash* node) {
	// creates pointer to new hashtable item
	dictionary_hash_item* item = (dictionary_hash_item*) malloc(sizeof(dictionary_hash_item));
	
	// assigns dynamic size
	item->index_hash = (char*) malloc(strlen(index_hash) + 1);
	item->node = (dictionary_node_hash*) malloc(sizeof(node));

	// places values
	strcpy(item->index_hash, index_hash);
	item->node = node; // should assign the node

	item->next_hash_table = create_table(256); // creates empty next_hash_table

	return item;
}
dictionary_hash_item* find_item(dictionary_hash* table, char* index_hash) { // assumes item exists
	return table->items[hash_function(index_hash)];
}

// clears items memory
void free_item(dictionary_hash_item* item) { // TODO implement free item

}

int hash_insert(dictionary_hash* table, char* index_hash, dictionary_node_hash* node) {
	dictionary_hash_item* item = create_item(index_hash, node);
	char index = hash_function(index_hash); // index = index_hash % 256 (== index_hash).
	dictionary_hash_item* current_item = table->items[index];

	if (current_item == NULL) {
		// key doesn't exist
		if (table->count == table->size || index_iter >= CAPACITYDECODE) { // TODO if index_iter isn't implemented this wont work properly
			free_item(item); // TODO: implement free_item
			return 0; // table is full
		}

		table->items[index] = item;
		table->count++;
		return 2; // new item created
	} else { // key does exist
		free_item(item); // TODO: implement free_item
		return 1;
	}
}

boolean hash_exists(dictionary_hash* table, char* index_hash) { // checks if the entry already exists
	if (table->items[hash_function(index_hash)] == NULL) {
		return false;
	} else {
		return true;
	}
}


/*
En
*/
//encode_sequence_node LZW_Encoder_Binary(FILE *BinaryInputFile, FILE *BinaryOutputFile) {
void LZW_Encoder_Binary(FILE *BinaryInputFile, FILE *BinaryOutputFile) {
	index_iter = 0;


	// TODO redo
	/*
	for (unsigned short i = 1; i < CAPACITY; i++) { // set up first layer of hashmap
		struct dictionary_node_hash *first_nodes = (struct dictionary_node_hash *)malloc(1 * sizeof(struct dictionary_node_hash));
		first_nodes[0].index = index_iter;
		first_nodes[0].append_value = i;
		dictionary
		index_iter++;
	}
	*/

	dictionary_node_hash_decoding *decode_dictionary = (dictionary_node_hash_decoding*) malloc(CAPACITYDECODE * sizeof(dictionary_node_hash_decoding));
	struct dictionary_hash dictionary = create_table(CAPACITY);
	char ichar = 0; // equal to i
	for (unsigned short i = 0; i < 256; i++) { // establishes the first hash table
		ichar++;
		dictionary_node_hash tempnode;
		tempnode.index = index_iter;
		tempnode.append_value = i;
		dictionary_node_hash_decoding tempdecodenode;
		tempdecodenode->value = ichar;
		decode_dictionary[index_iter] = tempdecodenode;

		index_iter++;
		hash_insert(dictionary, i, tempnode);
		//dictionary = create_item(i, )
	}

	//dictionary_hash_decode *decode_dictionary = (dictionary_hash_decode*) malloc(CAPACITYDECODE * sizeof(dictionary_hash_decode));
	dictionary = create_table(256);
	dictionary_hash* current_dictionary;
	current_dictionary = dictionary;
	char c = fgetc(BinaryInputFile);
	if (c == EOF  || c == NULL) {
		printf("Error File Empty");
		return -1;
	}
	while (c != EOF) {
		current_dictionary = dictionary;
		char* cur_sequence;
		strcat(cur_sequence, c);
		unsigned short cur_index = hash_function(c);
		if (hash_exists(current_dictionary, c)) { // if it does exist
			current_dictionary = find_item(current_dictionary, c)->next_hash_table; // set current_dictionary on the next hashtable
			
			while (c = fgetc(BinaryInputFile)) {
				
				if (c == EOF || c == NULL) {
					// TODO print cur_index to outputfile


					return;
				}
				if (hash_exists(current_dictionary, c)) {
					strcat(cur_sequence, c); // append c to cursequence
					cur_index = find_item(current_dictionary, c)->node->index;
					current_dictionary = find_item(current_dictionary, c)->next_hash_table; // set current_dictionary on the next hashtable
					continue;
				} else {
					// TODO print cur_index to outputfile


					if (index_iter >= CAPACITYDECODE) { // if dictionary is full
						// do nothing
					} else {
						strcat(cur_sequence, c); // append c to cursequence.
						// TODO adds new node to dictionaries
						dictionary_node_hash_decoding tempdecodenode;
						tempdecodenode->value = cur_sequence;
						decode_dictionary[index_iter] = tempdecodenode; // adds new decode dictionary node. TODO memory size may need updating if this doesn't work
						dictionary_node_hash tempnode;
						tempnode.index = index_iter;
						tempnode.append_value = c;
						hash_insert(current_dictionary, c, tempnode);
						index_iter++;

						
						

						break;
					}
				}
			}
			continue;
			//TODO? prob not.
		} else { // if it doesn't exist
			// error if here because root dictionary should have all elements exist.
			printf("Error: root dictionary missing elements\n");
			return;
		}
		
		
		//char c = fgetc(BinaryInputFile);
		if (c == EOF  || c == NULL) {
			printf("File Empty");
			return;
		}
	}

}
	
	
	
	char* decode(unsigned short index, dictionary_node_hash_decoding *LL_Dictionary) {
		printf(LL_Dictionary[index]);
		return LL_Dictionary[index];
	}

}