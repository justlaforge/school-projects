#include<stdio.h>
#include<stdlib.h>
#include <unistd.h> // Used to check if file exists
#include <time.h>  // Used to create randomness
#include "utilities.h"
#include <string.h>


/* Allocate space for rows and cols and return
	by reference
*/
void allocate2d_3(int ***A, int rows, int cols) {
    int header = rows * sizeof(int *);
    int data = rows * cols * sizeof(int);
    *A = (int **)malloc(header + data);
    int* array_data = (int *)((*A) + rows);
    for (int i = 0; i < rows; i++) {
        (*A)[i] = array_data + i * cols;
    }
}

void free2d_3(int ***A) {
    free(*A);
    *A = NULL;
}


/* Given the allocated space, initialize contents */
void initialize(int **A, int rows, int cols, int low, int high) {
	srand(0);
	if(low > high){
		perror("Lower bound me be less than greater bound");
		exit(EXIT_FAILURE);
	}
	for(int i =0; i<rows; i++){
		for(int j=0; j<cols; j++){
			A[i][j] = low + rand() % (high - low +1);
		}
	}
}

/*Given initialized space, write contents to file, binary format*/
void write_memory_to_file2d(int **A, int rows, int cols, char *fname) {
	if(A==NULL) {
		perror("Memory allocation error");
		exit(EXIT_FAILURE);
		return;
	} else if (rows <= 0 || cols <= 0){     // Exit program and return error description
		perror("Rows and cols must be above 0");
		exit(EXIT_FAILURE);
	}	

		FILE *file = fopen(fname, "w");
		if (file == NULL) {			// Checks if file was opened in the right mode
    		perror("Error opening file in write mode");
    		exit(EXIT_FAILURE);
		}

		// Write the number of rows and columns to the binary file
    	if(fwrite(&rows, sizeof(int), 1, file) == 0 || fwrite(&cols, sizeof(int), 1, file) == 0){
			perror("Error reading from file");
			fclose(file);
			exit(EXIT_FAILURE);
		}
    	

		// Write the data to the binary file
		for (int i = 0; i < rows; i++) {
			if(fwrite(A[i], sizeof(int), cols, file) == 0){
				perror("Error reading from file");
				fclose(file);
				exit(EXIT_FAILURE);
			}
		}

		fclose(file);
}

/* given the filename, determine size of file in units
	of number of integers.
*/
int determine_file_size(char *fn) {
	int num_elements = 0;
	if(fn==NULL) {
		// nothing to determine size
		perror("Error opening file");
		exit(EXIT_FAILURE);
	}
	// do the work here

		if(access(fn, F_OK) != -1){		// Check if file exists
			FILE *file = fopen(fn, "r");
									// File does exist
			if (fseek(file, 0, SEEK_END) != 0) {   // Finds the end of the file to determine length and file size
				fclose(file);
				return 1;
			}

			num_elements = ftell(file);    // sets num_elements equal to file size

			fclose(file);
			
		} else {						// File does not exist
			perror("File doesn't exist");	
			exit(EXIT_FAILURE);
		}

	return num_elements;
}


/* given the filename, determine amount of rows.
*/
int determine_rows(char *fn) {
    int rows = 0;

    FILE *file = fopen(fn, "rb");

    if (file == NULL) {
        perror("Unable to open file");
		exit(EXIT_FAILURE);
    }

    // Read the number of rows from the binary file
    if (fread(&rows, sizeof(int), 1, file) == 0) {
        perror("Error reading from file");
        fclose(file);
		exit(EXIT_FAILURE);
    }

    fclose(file);

    return rows;
}

/* given the filename, determine amount of collumns.
*/
int determine_cols(char *fn) {
    int cols = 0;

    FILE *file = fopen(fn, "rb");

    if (file == NULL) {
        perror("Unable to open file");
        return 1;
    }

	long position = 1 * sizeof(int); // Assuming item numbering starts from 0

    // Seek to the position of the second item
    if (fseek(file, position, SEEK_SET) != 0) {		
        perror("Seek error");
        fclose(file);
        return 1;
    }

    // Read the number of rows from the binary file
    if (fread(&cols, sizeof(int), 1, file) == 0) {
        perror("Read error");
        fclose(file);
		exit(EXIT_FAILURE);
    }

    fclose(file);

    return cols;
}


void initialize_memory_from_file(int ***A, int rows, int cols, char *fn) {
	if(!A||!fn) {
		// can't do it
		perror("Invalid arguments");
		exit(EXIT_FAILURE);
	}
	// do the work here
	FILE *file = fopen(fn, "rb");

    if (file == NULL) {
        perror("Unable to open file");
        exit(EXIT_FAILURE);
    }

	long position = 1 * sizeof(int); // Assuming item numbering starts from 0

    // Seek to the position of the third item
    if (fseek(file, position, SEEK_SET) != 0) {		
        perror("Seek error");
        fclose(file);
		exit(EXIT_FAILURE);
    }

    // Read the number of rows from the binary file
    if (fread(&cols, sizeof(int), 1, file) == 0) {
        perror("Read error");
        fclose(file);
		exit(EXIT_FAILURE);
    }

	allocate2d_3(A, rows, cols);
	for (int i = 0; i < rows; i++) {
		if(fread((*A)[i], sizeof(int), cols, file) == 0) {
        perror("Error reading from file");
        fclose(file);
		exit(EXIT_FAILURE);
    }
	}

	fclose(file);
	return;
}

/* print the contents of memory to the screen
*/
void print_memory(int ***A, int rows, int cols) {
	if(!A || !rows || !cols) {
		// nothing to do
		perror("Invalid arguments");
		exit(EXIT_FAILURE);
	} else if (rows < 0){     // Exit program and return error description
		perror("Length must be positive");
		exit(EXIT_FAILURE);
	}	

	// print the array
	for(int i=0; i<rows; i++){
		for(int j=0; j<cols; j++){
			printf("%d, ", (*A)[i][j]);
		}
		printf("\n");
	}
	return;
}

/* -- Function for Add data -- */
void add_data(char **file1, char **file2, char *filename, int pFlag){

    int **data1 = NULL;             // Data for file1
    int **data2 = NULL;             // Data for file2
    int **addedData = NULL;         // Data for new file

    int rows1 = determine_rows(*file1);      // Determine the rows and collumns of both arrays
    int cols1 = determine_cols(*file1);
    int rows2 = determine_rows(*file2);
    int cols2 = determine_cols(*file2);

    if(rows1 != rows2 || cols1 != cols2){           //Confirm rows and collumns are equal
        perror("2D arrays must have matching demensions");
        exit(EXIT_FAILURE);
    }
	
    initialize_memory_from_file(&data1, rows1, cols1, *file1);   // Allocate space for file1 data
    initialize_memory_from_file(&data2, rows2, cols2, *file2);   // Allocate space for file2 data
    allocate2d_3(&addedData, rows1, cols1);   // Allocate space for final array data
	
    for(int i=0; i<rows1; i++){     // loop through arrays and add corresponding elements together and insert into new list
        for(int j=0; j<cols1; j++){
            addedData[i][j] = data2[i][j]+data1[i][j];
        }
    }

    write_memory_to_file2d(addedData, rows1, cols1, filename);          // Add data from new list to a file
	
	if(pFlag){
		print_memory(&addedData, rows1, cols1);
	}

    free2d_3(&data1);
    free2d_3(&data2);           // Free all allocated memory
    free2d_3(&addedData);

	return;
}

// Function for row checksum
void cs_rows(int **A, int rows, int cols, int **Output){
	if(A==NULL) {
		perror("Memory allocation error");
		exit(EXIT_FAILURE);
	} else if (rows <= 0 || cols <= 0){     // Exit program and return error description
		perror("Rows and Cols must be above 0");
		exit(EXIT_FAILURE);
	}	

	int sum;
	for(int i = 0; i<rows; i++){	// Loop through rows
		sum = 0;
		for(int j = 0; j<cols; j++){	// Loop through cols
			Output[i][j] = A[i][j];
			sum += A[i][j];
		}
		Output[i][cols] = sum;
	}
}

// Function for col checksum
void cs_cols(int **A, int rows, int cols, int **Output){
	if(A==NULL) {
		perror("Memory allocation error");
		exit(EXIT_FAILURE);
	} else if (rows <= 0 || cols <= 0){     // Exit program and return error description
		perror("Rows and Cols must be above 0");
		exit(EXIT_FAILURE);
	}	
	
	int sum;
	for(int i = 0; i<cols; i++){	// Loop through cols
		sum = 0;
		for(int j = 0; j<rows; j++){	// Loop through rows
			Output[j][i] = A[j][i];
			sum += A[j][i];
		}
		Output[rows][i] = sum;
	}
}

void mul_data(int **A, int **B, int ar, int ac, int bc, int **Output){
	if(A==NULL ||B == NULL) {
		perror("Memory allocation error");
		exit(EXIT_FAILURE);
	} 

	int prod;
	for(int i = 0; i<ar; i++){	// loop A rows
		for(int j = 0; j<bc; j++){		// loop B cols
			prod = 0;
			for(int k = 0; k<ac; k++){		// loop items in A and B and multiply together
				prod += A[i][k] * B[k][j];
			}
			Output[i][j] = prod;
		}

	}
}

void corrupt(int ***A, int x, int y, int z){
	// Find the integer at x,y 
	int select = (*A)[x][y];

	// Flip the zth binary bit 
	/* 
	--- NOTE --- The 1<<z in this line creates a binary representation of 1 and shifts that bit left z times, 
	then the XOR statement takes that new binary number and XORs it with integer effectively converting the zth 
	bit to its complement. 
	*/
	select ^= (1 << z); // ^= combines the XOR operation with the Assignment opperation to perform two actions in one step
	
	// Replace the integer at x,y to the new integer
    (*A)[x][y] = select;
}

// Detect corrupted data -- Returns 1 if file is corrupted
int detect(int ***A, int rows, int cols, int *outX, int*outY){
	int x = -1;
	int y = -1;
	int **newData = NULL;

	// Allocate space for temp array
	allocate2d_3(&newData, rows, cols); // Create array for checksumm data copies

	// Detect data

	//check row sum
	cs_rows(*A,rows-1,cols-1,newData);
	for(int i=0; i<rows; i++){
		if(newData[i][cols-1]!=(*A)[i][cols-1]){
			x = i;
			break;
		}
	}
	
	//check col sum
	cs_cols(*A,rows-1,cols,newData);
	for(int j=0; j<cols; j++){
		if(newData[rows-1][j]!=(*A)[rows-1][j]){
			y = j;
			break;
		}
	}

	*outX = x;
	*outY = y; 

	// Free
	free2d_3(&newData);

	if(x == -1 || y == -1){
		return 0; // NO ERROR
	} else {
		return 1; // ERROR
	}
}

// given the data array, the size of the array, and the location of the error, correct the error and return the correct value
int correct(int ***A, int rows, int cols, int inX, int inY){
	// set variables
	int c = 0;
	int sum = 0;
	// calculate correct value
	for(int i=0; i<cols-1; i++){
		if(i!=inY){
			sum += (*A)[inX][i];
		}
	}
	if(cols-1 == inY){
		c = sum;
	} else {
		c = (*A)[inX][cols-1] - sum;
	}

	// Correct data
	(*A)[inX][inY] = c;

	return c;
	
}

// Faulty multiplication function
void mul_data_faulty(int **A, int **B, int ar, int ac, int bc, int **Output, int x, int y, int z, int kp){
	if(A==NULL ||B == NULL) {
		perror("Memory allocation error");
		exit(EXIT_FAILURE);
	} 

	int prod;
	for(int i = 0; i<ar; i++){	// loop A rows
		for(int j = 0; j<bc; j++){		// loop B cols
			prod = 0;
			for(int k = 0; k<ac; k++){		// loop items in A and B and multiply together
				if(i == x && j == y && k == kp){
					prod += mult_ints(A[i][k], B[k][j], z);		// THIS IS WHERE THE CORRUPTION WILL HAPPEN
				} else {
					prod += A[i][k] * B[k][j];		// no flip
				}
			}
			Output[i][j] = prod;
		}

	}
}

int mult_ints(int Aik, int Bkj, int z){
	Bkj ^= (1 << z);
	return Aik * Bkj;
}

void encodeHam(char *n){
	char *ptr;				
	long converted = strtol(n, &ptr, 16); // Convert hex to long
	if(strncmp(n, "0x", 2) != 0){			// Set boundaries
		printf("Value must be in 0x_ format where '_' is a character between 0-F.\n");
		exit(EXIT_FAILURE);
	}

	if(converted > 15){				// Set boundaries
		printf("Value must be represented as a hex character between 0x0 and 0xF\n");
		exit(EXIT_FAILURE);
	} else if(converted <= 0 && strcmp(n,"0x0")){
		printf("Value must be represented as a hex character between 0x0 and 0xF\n");
		exit(EXIT_FAILURE);
	}

	int Gtrans[7][4] = {{1,1,0,1},{1,0,1,1},{1,0,0,0},{0,1,1,1},{0,1,0,0},{0,0,1,0},{0,0,0,1}}; // G-Transpose
	int nibble[4][1];		// Matrix for nibble input
	int output[7][1];		// Matrix for hex output

	for(int i = 0; i<4; i++){		// Insert integer bits into matrix for multiplication
		nibble[3-i][0] = (converted & ( 1 << i )) >> i;
	}

	encode_matrices(Gtrans,nibble,7,4,1,output);	// Multiply the G-Transpose by new matrix

	char binary[8] = "";

	for(int i =0; i<7;i++){				// Convert to codeword representation (Mod by 2)
		output[i][0] = output[i][0] % 2;
		char bit[2];
		sprintf(bit, "%d", output[i][0]);
		strcat(binary,bit);
	}

    long hex = strtol(binary, NULL, 2);
	printf("CODEWORD = 0x%02lx = 0b%s\n",hex,binary);
	
}

// Program to multiply G-Transpose by a hex number represented as a matrix
void encode_matrices(int A[7][4], int B[4][1], int ar, int ac, int bc, int Output[7][1]){
	int prod;
	for(int i = 0; i<ar; i++){	// loop A rows
		for(int j = 0; j<bc; j++){		// loop B cols
			prod = 0;
			for(int k = 0; k<ac; k++){		// loop items in A and B and multiply together
				prod += A[i][k] * B[k][j];
			}
			Output[i][j] = prod;
		}

	}
}