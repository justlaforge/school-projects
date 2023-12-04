#include<stdio.h>
#include<stdlib.h>
#include <unistd.h>
#include "timer.h"
#include "utilities.h"
#include <getopt.h>

// Usage
void usage(char **argv) {
	printf("usage: %s -r <#rows> -c <#cols> -l <low> -h <high> -o <output filename>  \n", argv[0]);
}

/* This program will make an array, fill it with random integer data, 
	of the specified length (from commandline) and place it in the 
	specified file, also from the commandline.
*/

// Parse the arguments
void setArgs(int argc, char **argv, int *rows, int *cols, int *low, int *high, char **out, int *pFlag){
	int opt;
	int lowflag = 0;  // Turns to true if low flag was set -- allows user to enter 0's
	int highflag = 0;  // Turns to true if high flag was set -- allows user to enter 0's

	while((opt = getopt(argc, argv, "r:c:l:h:o:p")) != -1){
		switch(opt){
			case 'r':
				*rows = atoi(optarg);
				break;
			case 'c':
				*cols = atoi(optarg);
				break;
			case 'l':
				*low = atoi(optarg);
				lowflag = 1;
				break;
			case 'h':
				*high = atoi(optarg);
				highflag = 1;
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
	if(*rows == 0){
		*rows = 3;
	}
	if(*cols == 0){
		*cols = 4;
	}
	if(!lowflag){
		*low = 0;
	}
	if(!highflag){
		*high = 9;
	}
	if(*out == NULL){
		perror("Output filename must be provided");
		exit(EXIT_FAILURE);
	}
}

// Run main
int main(int argc, char **argv) {
	int **data = NULL;
	int rows = 0; // need to get this from user at commandline
	int cols = 0; // need to get this from user at commandline
	int low; // need to get this from user at commandline
	int high; // need to get this from user at commandline
	int pFlag = 0;
	char *filename = NULL; // need to get this from the user at commandline


	// parse the cmdline arguments 
	setArgs(argc, argv, &rows, &cols, &low, &high, &filename, &pFlag);


    // Start timer
    double start, finish;       // Create start and finish vars for timer
	GET_TIME(start);
	

    // function calls
	allocate2d_3(&data, rows, cols);
	initialize(data, rows, cols, low, high);
	write_memory_to_file2d(data, rows, cols, filename);

	if(pFlag){
		print_memory(&data, rows, cols);
	}

	free2d_3(&data);  // Free the space allocated for data
	

    // End timer
	GET_TIME(finish);

    // Print runtime
	printf("The code to be timed took %e seconds\n", finish-start);
	return 0;
}	
