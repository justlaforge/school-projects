#include<stdio.h>
#include<stdlib.h>
#include "utilities.h"
#include "timer.h"
#include <time.h>  // Used to create randomness
#include <getopt.h>
#include <math.h>

void usage(char **argv){        // Usage
    printf("Usage: %s -n <number of samples> -p\n", argv[0]);
}

// Set arguments
void setArgs(int argc, char **argv, int *n, int *pFlag){
	int opt;

	while((opt = getopt(argc, argv, "n:p")) != -1){
		switch(opt){
			case 'n':       // Number of trials
				*n = atoi(optarg);
				break;
			case 'p':       // Print flag
				*pFlag = 1;
				break;
			default:
				usage(argv);
				exit(1);
		}
	}
	if(*n == -1){
        *n = 100;
	}
}

int main(int argc, char **argv){
    int trials = -1;
	int pFlag = 0;
    unsigned int n = 32;    // bit depth
    int masked_errors = 0;     // How many trias ended up in a masked error
    int total_trials = 0;       // the amount of trials tested for

	srand(time(NULL));      // Randomized seed for random numbers

    //set args
    setArgs(argc, argv, &trials, &pFlag);
    

    double start, finish;       // Create start and finish vars for timer
	GET_TIME(start);


    // Program here
    for(unsigned int a = 0; a<(int)pow(2,n)-1; a+=111111){ // loop through 32-bit unsigned integers
        for(int k = 0; k<trials; k++){      // loop through given integer and multiply it by a randomly selected number a given amount of times
            unsigned int b = rand() % (int)pow(2,n);    // make b a random number of 8 bits
            unsigned int c = a * b;                     // multiply this number with the given integer
            unsigned int bitPos = rand() % 32;                   // assign a random bit to flip
            unsigned int bprime = b ^ (1<<bitPos);          // flip that given bit
            unsigned int cprime = a * bprime;           // multiply the random corrupted number with a 
            total_trials += 1;                          // add 1 to amount of trials

            char hexA[9]; // 8 characters for a 32-bit integer, plus a null terminator
            char hexB[9];
            char hexC[9];
            char hexBp[9];
            char hexCp[9];

            // Use sprintf to convert the integer to a hexadecimal string
            sprintf(hexA, "%08X", a);
            sprintf(hexB, "%08X", b);
            sprintf(hexC, "%08X", c);
            sprintf(hexBp, "%08X", bprime);
            sprintf(hexCp, "%08X", cprime);
            if (c == cprime){                       // compare the regular multiplied value with the corrupted one
                masked_errors += 1;
                if(pFlag == 1){
                    printf("BP=, %d, A = %s, B= %s, C = %s, Bprime=%s, Cprime=%s\n",bitPos,hexA,hexB,hexC,hexBp,hexCp); // print data
                }
            }
        }

    }
    double p = (double)masked_errors/(double)total_trials;
    printf("Probability of Masked Benign Errors: %f\n", p);         // print results

    
	GET_TIME(finish);


	printf("The code to be timed took %e seconds\n", finish-start);
    return 0;
}