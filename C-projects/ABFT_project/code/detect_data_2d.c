#include<stdio.h>
#include<stdlib.h>
#include "utilities.h"
#include "timer.h"
#include <getopt.h>

void usage(char **argv) {
	printf("usage: %s -i <in file> \n", argv[0]);
}

void setArgs(int argc, char **argv, char **in){
	int opt;

	while((opt = getopt(argc, argv, "i:")) != -1){
		switch(opt){
			case 'i':
				*in = optarg;
				break;
			default:
				usage(argv);
				exit(1);
		}
	}
	if(*in == NULL){
		perror("File to read must be provided");
		exit(EXIT_FAILURE);
	}
	
}

int main(int argc, char **argv) {
    // Declare variables
    char *inFile = NULL;
    int rows;
    int cols;
    int **data = NULL;
    int x,y;

    // Set args
    setArgs(argc, argv, &inFile);
    rows = determine_rows(inFile);
    cols = determine_cols(inFile);


    // Start timer
    double start, finish;       // Create start and finish vars for timer
	GET_TIME(start);


    // Initialize space from file
    initialize_memory_from_file(&data, rows, cols, inFile);

    // Detect data
	if(!detect(&data, rows, cols, &x, &y)){
        printf("NO ERROR DETECTED\n");
	} else {
		printf("ERROR DETECTED AT (%d,%d)\n", x,y);
	}

    // Free data
    free2d_3(&data);
	

    // End timer
	GET_TIME(finish);

    // Print runtime
	printf("The code to be timed took %e seconds\n", finish-start);
    return 0;
}