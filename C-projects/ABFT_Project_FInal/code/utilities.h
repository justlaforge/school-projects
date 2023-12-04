/* Allocate space for num_elements and return
	by reference
*/
void allocate2d_3(int ***A, int rows, int cols);

/* Given the allocated space, initialize contents */
void initialize(int **A, int rows, int cols, int low, int high);

/*Given initialized space, write contents to file, binary format*/
void write_memory_to_file2d(int **A, int rows, int cols, char *fname);

// --Modified to code--
// Declaration of determine_file_size function
int determine_file_size(char *fn);
void free2d_3(int ***dtype);
int determine_rows(char *fn);
int determine_cols(char *fn);
// --------------------


void initialize_memory_from_file(int ***A, int rows, int cols, char *fn);

/* print the contents of memory to the screen
*/
void print_memory(int ***A, int rows, int cols);

/* add data from contents and inserts into new file */
void add_data(char **file1, char **file2, char *filename, int pFlag);

// Checksum rows
void cs_rows(int **A, int rows, int cols, int **Output);

//Checksum Cols
void cs_cols(int **A, int rows, int cols, int **Output);

// Multiply Data
void mul_data(int **A, int **B, int Ar, int Ac, int Bc, int **Output);

// Corrupt data
void corrupt(int ***A, int x, int y, int z);

// Detect data
int detect(int ***A, int rows, int cols, int *x, int *y);

// Correct data
int correct(int ***A, int rows, int cols, int inX, int inY);

// Corrupt data in multiplication
void mul_data_faulty(int **A, int **B, int ar, int ac, int bc, int **Output, int x, int y, int z, int k);

// Multiply ints with corruption
int mult_ints(int Aik, int Bkj, int z);

// Ham encoder
void encodeHam(char *n);

void encode_matrices(int A[7][4], int B[4][1], int ar, int ac, int bc, int Output[7][1]);