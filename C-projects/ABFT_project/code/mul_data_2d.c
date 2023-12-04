#include<stdio.h>
#include<stdlib.h>
#include "utilities.h"
#include "timer.h"
#include <getopt.h>

// Usage statement
void usage(char **argv) {
	printf("usage: %s -a <in file1> -b <in file2> -c <out filename> \n", argv[0]);
}

// Set arguments
void setArgs(int argc, char **argv, char **A, char **B, char **C, int *pFlag){
	int opt;

	while((opt = getopt(argc, argv, "a:b:c:p")) != -1){
		switch(opt){
			case 'a':
				*A = optarg;
				break;
			case 'b':
				*B = optarg;
				break;
			case 'c':
				*C = optarg;
				break;
			case 'p':
				*pFlag = 1;
				break;
			default:
				usage(argv);
				exit(1);
		}
	}
	if(*A == NULL ||*B == NULL ||*C == NULL){
		perror("Files -a -b and -c must be provided");
		exit(EXIT_FAILURE);
	}
	
}

// Main file
int main(int argc, char **argv){

    // Declare variables
    char *input1 = NULL;    // Filenames
    char *input2 = NULL;
    char *outfile = NULL;

    int **data1 = NULL;     // Data arrays
    int **data2 = NULL;
    int **outData = NULL;

	int Arows = 0;      //Array columns and rows
	int Acols = 0;
	int Brows = 0;
	int Bcols = 0;
    
    int pFlag = 0;
    
    // set args
    setArgs(argc, argv, &input1, &input2, &outfile, &pFlag);


    // Start timer
    double start, finish;       // Create start and finish vars for timer
	GET_TIME(start);


	Arows = determine_rows(input1);     //determine array rows and cols
	Acols = determine_cols(input1);
	Brows = determine_rows(input2);
	Bcols = determine_cols(input2);

    if(Acols != Brows){     // check matrix multiplication compatability
        perror("Incompatible matrices: Matrix 1 cols must match Matrix 2 rows");
        exit(EXIT_FAILURE);
    }

    initialize_memory_from_file(&data1, Arows, Acols, input1);     //allocate space for arrays
    initialize_memory_from_file(&data2, Brows, Bcols, input2);
    allocate2d_3(&outData, Arows, Bcols); // output will be a matrix of the size Arows x Bcols

    mul_data(data1, data2, Arows, Acols, Bcols, outData);

    write_memory_to_file2d(outData, Arows, Bcols, outfile);

	if(pFlag){
		print_memory(&outData, Arows, Bcols);
	}

    free2d_3(&data1);
    free2d_3(&data2);
    free2d_3(&outData);
	

    // End timer
	GET_TIME(finish);

    // Print runtime
	printf("The code to be timed took %e seconds\n", finish-start);
    return 0;
}
