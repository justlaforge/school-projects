#include<stdio.h>
#include<stdlib.h>
#include "utilities.h"
#include "timer.h"
#include <time.h>  // Used to create randomness
#include <getopt.h>

// Usage statement
void usage(char **argv) {
	printf("usage: %s -i <in file> -x <row index> -y <col index> -z <bit position> -o <output filename> \n", argv[0]);
}

// Set arguments
void setArgs(int argc, char **argv, char **in, int *x, int *y, int *z, char **out, int *pFlag){
	int opt;
	srand(time(NULL));

	while((opt = getopt(argc, argv, "i:x:y:z:o:p")) != -1){
		switch(opt){
			case 'i':
				*in = optarg;
				break;
			case 'x':
				*x = atoi(optarg);
				break;
			case 'y':
				*y = atoi(optarg);
				break;
			case 'z':
				*z = atoi(optarg);
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
    
    int rows = determine_rows(*in);
    int cols = determine_cols(*in);

    if(*x == -1){
			*x = rand() % (rows);
    }
    if(*y == -1){
			*y = rand() % (cols);
    }
    if(*z == -1){
			*z = rand() % (32);
    }

    if(*x < 0 || *x > rows-1){
        fprintf(stderr, "x must be between 0 and rows-1 [inclusive]\n");
		exit(EXIT_FAILURE);
    }
    if(*y < 0 || *y > cols-1){
        fprintf(stderr, "y must be between 0 and rows-1 [inclusive]\n");
		exit(EXIT_FAILURE);
    }
    if(*z < 0 || *z > 31){
        fprintf(stderr, "z must be between 0 and 31 [inclusive]\n");
		exit(EXIT_FAILURE);
    }

	
}

// Main file
int main(int argc, char **argv){
    // Declare variables
    int x=-1, y=-1, z=-1;
    char *inFile = NULL;
    char *outFile = NULL;
    int pFlag = 0;

    // Parse args
    setArgs(argc, argv, &inFile, &x, &y, &z, &outFile, &pFlag);
    int rows = determine_rows(inFile);
    int cols = determine_cols(inFile);
    int **data = NULL;

    // Start timer
    double start, finish;       // Create start and finish vars for timer
	GET_TIME(start);

    // Create malloced array for file data
    initialize_memory_from_file(&data,rows,cols,inFile);
    // Corrupt data
    corrupt(&data, x, y, z);
    // Write corrupted data to new file
    write_memory_to_file2d(data,rows,cols,outFile);

    // print if -p
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


    return 0;
}