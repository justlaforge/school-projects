#include<stdio.h>
#include<stdlib.h>
#include "utilities.h"
#include "timer.h"
#include <time.h>  // Used to create randomness
#include <getopt.h>

// Usage statement
void usage(char **argv) {
	printf("usage: %s -a <matrix A> -b <matrix B> -c <matrix C> -x <row index> -y <col index> -z <bit position> -k "
    "<product term to be corrupted> \n", argv[0]);
}

// Set arguments
void setArgs(int argc, char **argv, char **A, char **B, char **C, int *x, int *y, int *z, int *k, int *pFlag){
	int opt;
	srand(time(NULL));

	while((opt = getopt(argc, argv, "a:b:c:x:y:z:k:p")) != -1){
		switch(opt){
			case 'a':
				*A = optarg;    // Infile 1
				break;
			case 'b':
				*B = optarg;    // Infile 2
				break;
			case 'c':
				*C = optarg;    // Outfile
				break;
			case 'x':
				*x = atoi(optarg);     // row index
				break;
			case 'y':
				*y = atoi(optarg);     // col index
				break;
			case 'z':
				*z = atoi(optarg);     // bit position
				break;
			case 'k':
				*k = atoi(optarg);     // product term
				break;
			case 'p':
				*pFlag = 1;      // print option
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
    
    int Arows = determine_rows(*A);
    int rows = determine_rows(*B);
    int cols = determine_cols(*B);

    if(*x == -1){
			*x = rand() % (rows);
    }
    if(*y == -1){
			*y = rand() % (cols);
    }
    if(*z == -1){
			*z = rand() % (32);
    }
    if(*k == -1){
			*k = rand() % (3);
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
    if(*k < 0 || *k > Arows){
        fprintf(stderr, "k must be between 0 and A-cols - 1 [inclusive]\n");
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

    int x = -1;         // Row index
    int y = -1;         // Col index   
    int z = -1;         // Bit position
    int k = -1;         // Product term
    
    int pFlag = 0;
    
    // set args
    setArgs(argc, argv, &input1, &input2, &outfile, &x, &y, &z, &k, &pFlag);


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

    mul_data_faulty(data1, data2, Arows, Acols, Bcols, outData, x, y, z, k);           // Faulty multiplier

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
