#include<stdio.h>
#include<stdlib.h>
#include "utilities.h"
#include "timer.h"
#include <getopt.h>

// Usage statement
void usage(char **argv) {
	printf("usage: %s 0x<nibble of hex data>\n", argv[0]);
}

// Main file
int main(int argc, char **argv){
    
    if(argc != 2){
        usage(argv);
        return 0;
    }

    char *nibble = argv[1];     // Data arrays


    // Start timer
    double start, finish;       // Create start and finish vars for timer
	GET_TIME(start);
    
    encodeHam(nibble);
    
    // End timer
	GET_TIME(finish);

    // Print runtime
	printf("The code to be timed took %e seconds\n", finish-start);
    return 0;
}
