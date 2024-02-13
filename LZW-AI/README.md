# LZW-AI

a unique version of LZW compression that uses AI to purge infrequently used dictionary nodes.
Trades a little bit of compression by needing to store a decoding dictionary, but this allows theoretically higher compression ratios by allowing the dictionary to learn by removing unused dictionary indexes.
Theoretically just as computationally fast (possibly faster as decoding is O(1) instead O(n). encoding remains O(n) with n being the max-depth of the encoding dictionary-tree) as LZW.

uses a tree of hashmap nodes for the encoding dictionary, and links to the decoding dictionary which is a 65k (max size an array can be indexing with a Short variable) element array.

Future TODO: TRIE implementation for encoding dictionary, memory debugging, pop-stack implementation or priority queue or FIFO for tree pruning in AI learning.

Still being worked on, does not work in current version.