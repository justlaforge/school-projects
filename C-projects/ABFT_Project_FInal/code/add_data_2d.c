#include<stdio.h>
#include<stdlib.h>
#include "utilities.h"
#include "timer.h"
#include <getopt.h>

void usage(char **argv){
    printf("Usage: %s -a <in file1> -b <in file2> -c <out filename>\n", argv[0]);
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

int main(int argc, char **argv){
    char *filename = NULL;       // Output file name
    char *file1 = NULL;          // File1 name
    char *file2 = NULL;          // File2 name
	int pFlag = 0;

    //set args
    setArgs(argc, argv, &file1, &file2, &filename, &pFlag);

    double start, finish;       // Create start and finish vars for timer
	GET_TIME(start);

    add_data(&file1, &file2, filename, pFlag);  
    
	GET_TIME(finish);


	printf("The code to be timed took %e seconds\n", finish-start);
    return 0;
}