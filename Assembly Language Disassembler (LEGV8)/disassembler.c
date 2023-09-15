// AUTHOR: Colsen Selk @ceselk

#include <stdio.h>
#include <stdlib.h>
#include <endian.h>
#include <string.h>
#include <sys/stat.h>
#include <fcntl.h>

int binary_string_to_int(const char *binary_string, int bin_str_len) {
    int i;
    int sum = 0;
    int count = 1;
    for (i = bin_str_len - 1; i >= 0; i--) { // turns the string into an integer by doing binary to decimal conversion
        int val = (int)(binary_string[i]) - 48;
        //printf("val: %d\n", val); // for testing
        sum = sum + val * count;
        count = count * 2;
    }
    //printf("sum: %d\n", sum); // for testing
    return sum;
}

int binary_string_to_int_2(const char *binary_string, int bin_str_len) { // reads in 2's complement
    int i;
    int sum = 0;
    int count = 1;
    for (i = bin_str_len - 1; i >= 0; i--) { // turns the string into an integer by doing binary to decimal conversion
        int val = (int)(binary_string[i]) - 48;
        if (i == 0) { // 2's complement bit
            sum = sum - val * count;
            break;
        }
        //printf("val: %d\n", val); // for testing
        sum = sum + val * count;
        count = count * 2;
    }
    //printf("sum: %d\n", sum); // for testing
    return sum;
}

int decode_binary_string_to_instruction(const char *bin_str) {
    
    char subd[6]; // Rd R type I type D type CB type
    memcpy(subd, &bin_str[27], 5);
    subd[5] = '\0';



    char sub[6]; // d11111aaaaaaaaaaaaaaaaaaaaaaaaaa
    memcpy(sub, &bin_str[1], 5);
    sub[5] = '\0';
    //printf("sub: %s\n", sub); // for testing
    if (strcmp(sub, "00101") == 0) { // either B or BL
        if (bin_str[0] == '0') { // B
            printf("B ");

            char suba[27]; // BR_address
            memcpy(suba, &bin_str[6], 26);
            suba[26] = '\0';

            //printf("suba: %s\n", suba); // for testing
            //printf("sizeof: %d\n", (sizeof suba / sizeof suba[0]) - 1); // for testing
            printf("%d\n", binary_string_to_int_2(suba, 26)); // branch label

            return 0;
        }
        else if (bin_str[0] == '1') { // BL
            printf("BL ");
            
            char suba[27]; // BR_address
            memcpy(suba, &bin_str[6], 26);
            suba[26] = '\0';

            printf("%d\n", binary_string_to_int_2(suba, 26)); // branch label


            

            return 0;
        }
    }
    

    


    char subn[6]; // Rn R type I type D type
    memcpy(subn, &bin_str[22], 5);
    subn[5] = '\0';
            
    char subs[7]; //shamt R type
    memcpy(subs, &bin_str[16], 6);
    subs[6] = '\0';

    char subm[6]; // Rm R type
    memcpy(subm, &bin_str[11], 5);
    subm[5] = '\0';

    
    char sub4[7];
    memcpy(sub4, &bin_str[0], 6);
    sub4[6] = '\0';
    if (strcmp(sub4, "010101") == 0) {
        char tempstr[3] = "AA";
        switch (binary_string_to_int(subd, 5)) {
            case 0:
                strcpy(tempstr, "EQ");
                break;
            case 1:
                strcpy(tempstr, "NE");
                break;
            case 2:
                strcpy(tempstr, "HS");
                break;
            case 3:
                strcpy(tempstr, "LO");
                break;
            case 4:
                strcpy(tempstr, "MI");
                break;
            case 5:
                strcpy(tempstr, "PL");
                break;
            case 6:
                strcpy(tempstr, "VS");
                break;
            case 7:
                strcpy(tempstr, "VC");
                break;
            case 8:
                strcpy(tempstr, "HI");
                break;
            case 9:
                strcpy(tempstr, "LS");
                break;
            case 10:
                strcpy(tempstr, "GE");
                break;
            case 11:
                strcpy(tempstr, "LT");
                break;
            case 12:
                strcpy(tempstr, "GT");
                break;
            case 13:
                strcpy(tempstr, "LE");
                break;
            case 14:
                strcpy(tempstr, "ER");
                break;
            case 15:
                strcpy(tempstr, "ER");
                break;
            default:
                printf("Rt for B.cond = %d\n", binary_string_to_int_2(subd, 5));
                printf("Rt string for B.cond = %s\n", subd);
                strcpy(tempstr, "ER");
                break;
        }
        
        char suba[20]; //COND_BR_address    19 + 1 = 20
        memcpy(suba, &bin_str[8], 19); // 2222222daaaaaaaaaaaaaaaaaaabbbbb    19 a's, 5 b's, 7 2's
        suba[19] = '\0';

        printf("B.%s %d\n", tempstr, binary_string_to_int_2(suba, 19));
        return 0;
    }

    char sub2[8];
    memcpy(sub2, &bin_str[0], 7);
    sub2[7] = '\0';
    //printf("sub2: %s\n", sub2);


    if (strcmp(sub2, "1011010") == 0) { // either CBNZ or CBZ
        // note: format is CB(Z or NZ) Rt, COND_BR_address
        if (bin_str[7] == '1') { // CBNZ.      d
            printf("CBNZ X");

            char suba[20]; //COND_BR_address    19 + 1 = 20
            memcpy(suba, &bin_str[8], 19); // 2222222daaaaaaaaaaaaaaaaaaabbbbb    19 a's, 5 b's, 7 2's
            suba[19] = '\0';

            char subb[6]; // Rt
            memcpy(subb, &bin_str[27], 5); // 2222222daaaaaaaaaaaaaaaaaaabbbbb
            subb[5] = '\0';

            printf("%d, ", binary_string_to_int(subb, 5));
            printf("label%d\n", binary_string_to_int(suba, 19));

            return 0;
        }
        else if (bin_str[7] == '0') { // CBZ.      d
            printf("CBZ X");

            char suba[20]; //COND_BR_address    19 + 1 = 20
            memcpy(suba, &bin_str[8], 19); // 2222222daaaaaaaaaaaaaaaaaaabbbbb    19 a's, 5 b's, 7 2's
            suba[19] = '\0';

            char subb[6]; // Rt
            memcpy(subb, &bin_str[27], 5); // 2222222daaaaaaaaaaaaaaaaaaabbbbb
            subb[5] = '\0';

            printf("%d, ", binary_string_to_int(subb, 5));
            printf("%d\n", binary_string_to_int(suba, 19));
            
            return 0;
        }
    }

    if (strcmp(sub2, "1000101") == 0) { // ADD & AND
        if (bin_str[7] == '1') { // ADD
            printf("ADD X");

            printf("%d, X%d, X%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subm, 5));

            
            return 0;
        }
        else if (bin_str[7] == '0') { // AND
            printf("AND X");

            printf("%d, X%d, X%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subm, 5));

            
            return 0;
        }
    }


    if (strcmp(sub2, "1010101") == 0) { // ADDS & ORR
        if (bin_str[7] == '1') { // ADDS
            printf("ADDS X");

            printf("%d, X%d, X%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subm, 5));

            
            return 0;
        }
        else if (bin_str[7] == '0') { // ORR
            printf("ORR X");

            printf("%d, X%d, X%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subm, 5));

            
            return 0;
        }
    }

    if (strcmp(sub2, "1110101") == 0) { //SUBS & ANDS
        if (bin_str[7] == '1') { // SUBS
            printf("SUBS X");

            printf("%d, X%d, X%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subm, 5));

            
            return 0;
        }
        else if (bin_str[7] == '0') { // ANDS
            printf("ANDS X");

            printf("%d, X%d, X%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subm, 5));

            
            return 0;
        }
    }

    if (strcmp(sub2, "1101011") == 0) { // BR
        printf("BR X");

        printf("%d\n", binary_string_to_int(subn, 5));
        return 0;
    }

    if (strcmp(sub2, "1100101") == 0) { // EOR & SUB
        if (bin_str[7] == '1') { // SUB
            printf("SUB X");

            printf("%d, X%d, X%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subm, 5));
            return 0;
        }
        else if (bin_str[7] == '0') { // EOR
            printf("EOR X");

            printf("%d, X%d, X%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subm, 5));
            return 0;
        }
    }
    
    if (strcmp(sub2, "1101001") == 0 && bin_str[7] == '1') { //LSL & LSR
        if (bin_str[10] == '1') { // LSL
            printf("LSL X");

            printf("%d, X%d, X%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subm, 5));
            return 0;
        }
        if (bin_str[10] == '0') { // LSR
            printf("LSR X");

            printf("%d, X%d, X%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subm, 5));
            return 0;
        }
    }

    if (strcmp(sub2, "1001101") == 0) { // MUL
        printf("MUL X");

        printf("%d, X%d, X%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subm, 5));
        return 0;
    }

    char sub3[12];
    memcpy(sub3, &bin_str[0], 11);
    sub3[11] = '\0';
    if (strcmp(sub3, "11111111101") == 0) { //PRNT
        printf("PRNT X%d\n", binary_string_to_int(subd, 5));
        return 0;
    }

    if (strcmp(sub3, "11111111100") == 0) { // PRNL
        printf("PRNL\n");
        return 0;
    }

    if (strcmp(sub3, "11111111110") == 0) { // DUMP
        printf("DUMP\n");
        return 0;
    }

    if (strcmp(sub3, "11111111111") == 0) { // HALT
        printf("HALT\n");
        return 0;
    }


    

    // R format:        pppppppppppmmmmmssssssnnnnnddddd     d=Rd, n=Rn, s=shamt, m=Rm, p=opcode        NAME Rd, Rn, Rm
    // I format:        ppppppppppiiiiiiiiiiiinnnnnddddd     d=Rd, n=Rn, i=immediate, p=opcode          NAME Rd, Rn, #Imm
    // D format:        pppppppppppdddddddddppnnnnnttttt     t=Rt, n=Rn, d=DT_address, p=opcode         NAME Rt, [Rn, #DT]

    char subi[13]; // immediate I Type
    memcpy(subi, &bin_str[10], 12);
    subi[12] = '\0';

    char subdt[10]; // DT_address D Type
    memcpy(subdt, &bin_str[11], 9);
    subdt[9] = '\0';


    if (strcmp(sub2, "1001000") == 0) { // ADDI
        printf("ADDI X");

        printf("%d, X%d, #%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subi, 12));
        return 0;
    }

    if (strcmp(sub2, "1011000") == 0) { // ADDIS
        printf("ADDIS X");

        printf("%d, X%d, #%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subi, 12));
        return 0;
    }

    if (strcmp(sub2, "1001001") == 0) { // ANDI
        printf("ANDI X");

        printf("%d, X%d, #%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subi, 12));
        return 0;
    }

    if (strcmp(sub2, "1111001") == 0) { // ANDIS
        printf("ANDIS X");

        printf("%d, X%d, #%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subi, 12));
        return 0;
    }

    if (strcmp(sub2, "1111001") == 0 && bin_str[7] == '0') { // EORI
        printf("EORI X");

        printf("%d, X%d, #%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subi, 12));
        return 0;
    }

    if (strcmp(sub2, "1011001") == 0) { // ORRI
        printf("ORRI X");

        printf("%d, X%d, #%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subi, 12));
        return 0;
    }

    if (strcmp(sub2, "1101000") == 0) { // SUBI
        printf("SUBI X");

        printf("%d, X%d, #%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subi, 12));
        return 0;
    }
    
    if (strcmp(sub2, "1111000") == 0) { // SUBIS
        printf("SUBIS X");

        printf("%d, X%d, #%d\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subi, 12));
        return 0;
    }



    if (strcmp(sub2, "1111100") == 0) {
        if (bin_str[9] == '1') { // LDUR
            printf("LDUR X");
            printf("%d, [X%d, #%d]\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subdt, 9));
            return 0;
        }
        else if (bin_str[9] == '0') { // STUR
            printf("STUR X");
            printf("%d, [X%d, #%d]\n", binary_string_to_int(subd, 5), binary_string_to_int(subn, 5), binary_string_to_int(subdt, 9));
            return 0;
        }
    }




    

    return 1;
}

  
// modifies str to take the machine code into 32 bit opcodes
void prnt_int_to_bin(unsigned int n, char *str) { // str is modified by prnt_int_to_bin
    unsigned int i;
    char strstatic[] = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    int iterator = 0;
    for (i = 1 << 31; i > 0; i = i / 2) {
        (n & i) ? (strstatic[iterator] = '1') : (strstatic[iterator] = '0');
        iterator++;
    }
    for (i = 0; i < 33; i++) {
        *(str + i) = strstatic[i];
    }
    //printf("%s", str); // for testing
    //return strstatic;
}

int main(int argc,char* argv[]) {
	/*
	// struct for instructions and their opcodes
    instruction_t instruction[] = {
  { "ADD",     ADD_inst,    0b10001011000 },   r
  { "ADDI",    ADDI_inst,   0b1001000100  },   i
  { "ADDIS",   ADDIS_inst,  0b1011000100  },   i
  { "ADDS",    ADDS_inst,   0b10101011000 },   r
  { "AND",     AND_inst,    0b10001010000 },   r
  { "ANDI",    ANDI_inst,   0b1001001000  },   i
  { "ANDIS",   ANDIS_inst,  0b1111001000  },   i
  { "ANDS",    ANDS_inst,   0b11101010000 },   r
  { "B",       B_inst,      0b000101      },   b
  { "BL",      BL_inst,     0b100101      },   b
  { "BR",      BR_inst,     0b11010110000 },   r
  { "CBNZ",    CBNZ_inst,   0b10110101    },   cb
  { "CBZ",     CBZ_inst,    0b10110100    },   cb
  { "DUMP",    DUMP_inst,   0b11111111110 },   r
  { "EOR",     EOR_inst,    0b11001010000 },   r
  { "EORI",    EORI_inst,   0b1101001000  },   i
  { "HALT",    HALT_inst,   0b11111111111 },   r
  { "LDUR",    LDUR_inst,   0b11111000010 },   d
  { "LSL",     LSL_inst,    0b11010011011 },   r
  { "LSR",     LSR_inst,    0b11010011010 },   r
  { "MUL",     MUL_inst,    0b10011011000 },   r
  { "ORR",     ORR_inst,    0b10101010000 },   r
  { "ORRI",    ORRI_inst,   0b1011001000  },   i
  { "PRNL",    PRNL_inst,   0b11111111100 },   r
  { "PRNT",    PRNT_inst,   0b11111111101 },   r
  { "STUR",    STUR_inst,   0b11111000000 },   d
  { "SUB",     SUB_inst,    0b11001011000 },   r
  { "SUBI",    SUBI_inst,   0b1101000100  },   i
  { "SUBIS",   SUBIS_inst,  0b1111000100  },   i
  { "SUBS",    SUBS_inst,   0b11101011000 },   r
//   { "LDURB",   LDURB_inst,  0b00111000010 },
//   { "LDURD",   LDURD_inst,  0b11111100010 },
//   { "LDURH",   LDURH_inst,  0b01111000010 },
//   { "LDURS",   LDURS_inst,  0b10111100010 },
//   { "LDURSW",  LDURSW_inst, 0b10111000100 },
//   { "SDIV",    SDIV_inst,   0b10011010110 },
//   { "SMULH",   SMULH_inst,  0b10011011010 },
//   { "STURB",   STURB_inst,  0b00111000000 },
//   { "STURD",   STURD_inst,  0b11111100000 },
//   { "STURH",   STURH_inst,  0b01111000000 },
//   { "STURS",   STURS_inst,  0b10111100000 },
//   { "STURSW",  STURW_inst,  0b10111000000 },
//   { "UDIV",    UDIV_inst,   0b10011010110 },
//   { "UMULH",   UMULH_inst,  0b10011011110 },
//   { "FADDD",   FADDD_inst,  0b00011110011 },
//   { "FADDS",   FADDS_inst,  0b00011110001 },
//   { "FCMPD",   FCMPD_inst,  0b00011110011 },
//   { "FCMPS",   FCMPS_inst,  0b00011110001 },
//   { "FDIVD",   FDIVD_inst,  0b00011110011 },
//   { "FDIVS",   FDIVS_inst,  0b00011110001 },
//   { "FMULD",   FMULD_inst,  0b00011110011 },
//   { "FMULS",   FMULS_inst,  0b00011110001 },
//   { "FSUBD",   FSUBD_inst,  0b00011110011 },
//   { "FSUBS",   FSUBS_inst,  0b00011110001 },
};
    */

    //printf("spot0\n"); // for testing

    // checks to see if valid argument has been placed by user in terminal
	if (argc != 2) {
        printf("must have one argument\n");
        printf("argv[1]: %s\n", argv[1]);
        printf("argc: %d\n", argc);
        return 0;
    }
    
    FILE *machinefile;

    
    char *filename = argv[1];

    //printf("spot1\n"); // for testing

    
    machinefile = fopen(filename, "rb");

    if (machinefile == NULL) {
        printf("unable to open file \n");
        return 0;
    }

    //printf("spot2\n"); // for testing
    
    int fd = open(filename, O_RDONLY);
    struct stat finfo;
    fstat(fd, &finfo);
    int fileSize = finfo.st_size;
    //printf("fileSize = %d\n", fileSize); // for testing

    //printf("spot3\n"); // for testing
    
    //int32_t buffer[fileSize]; // 3 * fileSize?
    unsigned int buffer[fileSize];
    char binary_32[fileSize][33];
    
    int i;
    size_t check_size = fread(buffer, sizeof *buffer, fileSize, machinefile);
    //if (check_size = fileSize) {
        //printf("Array Successfully Read\n"); // use for testing
    //}
	
	fclose(machinefile); // closes the machinefile

    int count = 0;
    for (i = 0; i < fileSize; ++i) {
        buffer[i] = be32toh(buffer[i]);
        //printf("%d ", buffer[i]); // for testing
        prnt_int_to_bin(buffer[i], binary_32[i]);
        //printf(" "); // for testing
        //count++; // for testing
        //if (count == 3) { // for testing
            //count = 0;
            //printf("\n");
        //}
    }

    
    // using the information gathered from the file, decodes all the opcodes and prints to terminal
	printf("\n");
    for (i = 0; i < fileSize; i++) {
        if (decode_binary_string_to_instruction(binary_32[i]) == 1) { // if decode_binary_string_to_instruction doesn't find a matching instruction it will exit (exitcode will be made = to 1)
            break;
        }
    }

    




	
	




    return 0;
}
