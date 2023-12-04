#include<stdio.h>
#include<stdlib.h>
#include "utilities.h"
#include "timer.h"
#include <getopt.h>

void usage(char **argv) {
	printf("usage: %s -i <input filename>  \n", argv[0]);
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
	
	double start, finish;
	int **data = NULL;
	int rows = 0; 
	int cols = 0; 
	char *filename = NULL;
	GET_TIME(start);

	// parse the cmdline inputs
	setArgs(argc, argv, &filename);
	rows = determine_rows(filename);
	cols = determine_cols(filename);

	// must not change these calls to these functions 
	initialize_memory_from_file(&data, rows, cols, filename);
	print_memory(&data, rows, cols);
	// and the main work has to be done in them

	free2d_3(&data);

	GET_TIME(finish);

	printf("The code to be timed took %e seconds\n", finish-start);
	
	return 0;
}	
