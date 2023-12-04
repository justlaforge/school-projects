#include<stdio.h>
#include<stdlib.h>
#include "utilities.h"
#include "timer.h"
#include <getopt.h>

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
    int **outData = NULL;    // 1d output array
    int rows, cols;         // 2d array rows and cols
    int pFlag = 0;

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
    allocate2d_3(&outData, rows+1, cols+1);                  // Allocate space for output data : Add additional rows and cols for sum data
    
	cs_rows(data, rows, cols, outData); // Add sum of rows
	cs_cols(outData, rows, cols+1, outData); // Add sum of cols
    
    write_memory_to_file2d(outData, rows+1, cols+1, output);    // write to file

	if(pFlag){
		print_memory(&outData, rows+1, cols+1);
	}

    free2d_3(&data);  // free data
    free2d_3(&outData);
	

    // End timer
	GET_TIME(finish);

    // Print runtime
	printf("The code to be timed took %e seconds\n", finish-start);
    return 0;
}
