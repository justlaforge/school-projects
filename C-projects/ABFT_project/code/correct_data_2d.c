#include<stdio.h>
#include<stdlib.h>
#include "utilities.h"
#include "timer.h"
#include <getopt.h>
#include <math.h> // for log2(X)

// Usage statement
void usage(char **argv) {
	printf("usage: %s -i <in file> -o <out filename> \n", argv[0]);
}

// Set arguments
void setArgs(int argc, char **argv, char **in, char **out, int *pFlag){
	int opt;

	while((opt = getopt(argc, argv, "i:o:p")) != -1){
		switch(opt){
			case 'i':
				*in = optarg;
				break;
			case 'o':
				*out = optarg;
				break;
			case 'p':
				*pFlag = 1;
				break;
			default:
				usage(argv);
				exit(1);
		}
	}
	if(*in == NULL ||*out == NULL){
		perror("Files -i and -o must be provided");
		exit(EXIT_FAILURE);
	}
	
}

// Main file
int main(int argc, char **argv){
    // Declare variables
    char *input = NULL;     // input file with 2d array
    char *output = NULL;    // output file name
    int **data = NULL;      // 2d array from file
    int rows, cols;         // 2d array rows and cols
    int pFlag = 0;
    int x,y,z;
    int corr = 0;
    int badVal = 0;

    // Parse arguments
    setArgs(argc, argv, &input, &output, &pFlag);


    // Determine rows and cols
    rows = determine_rows(input);       // how many rows and cols of data
    cols = determine_cols(input);

    // Start timer
    double start, finish;       // Create start and finish vars for timer
	GET_TIME(start);


    // Allocate space for input and output arrays
    initialize_memory_from_file(&data, rows, cols, input);      // Enter data from file into 2d allocated array spave

    // Detect data
    if(!detect(&data, rows, cols, &x, &y)){
        printf("NO ERROR DETECTED\n");
    } else {
        // Determine corrupted bit
        badVal = data[x][y];
        z = log2(corr^badVal);

        // Correct Data
        corr = correct(&data, rows, cols, x, y);

		printf("ERROR DETECTED AT (%d,%d)\n", x,y);
		printf("AT BIT POSITION %d\n", z);
		printf("%d corrected to %d\n", badVal,corr);

    }

    // insert 1d array into file
    write_memory_to_file2d(data, rows, cols, output);

	if(pFlag){
        print_memory(&data, rows, cols);
	}

    // Free data
    free2d_3(&data);
	

    // End timer
	GET_TIME(finish);

    // Print runtime
	printf("The code to be timed took %e seconds\n", finish-start);
    return 0;
}
