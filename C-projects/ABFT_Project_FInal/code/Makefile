CC=gcc
PROGS=make_data_2d read_data_2d add_data_2d cs_rows_data_2d cs_cols_data_2d cs_data_2d mul_data_2d corrupt_data_2d detect_data_2d correct_data_2d simple_mbe_test mul_data_2d_faulty ham-encode-4
CFLAGS=-std=c99 -g -Wall -Wpedantic
LFLAGS=-lm 

all: $(PROGS)

utilities.o: utilities.c utilities.h
	$(CC) $(CFLAGS) -c utilities.c

make_data_2d.o: make_data_2d.c utilities.h utilities.c
	$(CC) $(CFLAGS) -c make_data_2d.c

make_data_2d: make_data_2d.o utilities.o 
	$(CC) -o make_data_2d ./make_data_2d.o utilities.o $(LFLAGS)
	
read_data_2d.o: read_data_2d.c utilities.h utilities.c
	$(CC) $(CFLAGS) -c read_data_2d.c

read_data_2d: read_data_2d.o utilities.o
	$(CC) -o read_data_2d ./read_data_2d.o utilities.o $(LFLAGS)

add_data_2d.o: add_data_2d.c utilities.h utilities.c
	$(CC) $(CFLAGS) -c add_data_2d.c

add_data_2d: add_data_2d.o utilities.o
	$(CC) -o add_data_2d ./add_data_2d.o utilities.o $(LFLAGS)

cs_rows_data_2d.o: cs_rows_data_2d.c utilities.h utilities.c
	$(CC) $(CFLAGS) -c cs_rows_data_2d.c

cs_rows_data_2d: cs_rows_data_2d.o utilities.o
	$(CC) -o cs_rows_data_2d ./cs_rows_data_2d.o utilities.o $(LFLAGS)

cs_cols_data_2d.o: cs_cols_data_2d.c utilities.h utilities.c
	$(CC) $(CFLAGS) -c cs_cols_data_2d.c

cs_cols_data_2d: cs_cols_data_2d.o utilities.o
	$(CC) -o cs_cols_data_2d ./cs_cols_data_2d.o utilities.o $(LFLAGS)

cs_data_2d.o: cs_data_2d.c utilities.h utilities.c
	$(CC) $(CFLAGS) -c cs_data_2d.c

cs_data_2d: cs_data_2d.o utilities.o
	$(CC) -o cs_data_2d ./cs_data_2d.o utilities.o $(LFLAGS)

mul_data_2d.o: mul_data_2d.c utilities.h utilities.c
	$(CC) $(CFLAGS) -c mul_data_2d.c

mul_data_2d: mul_data_2d.o utilities.o
	$(CC) -o mul_data_2d ./mul_data_2d.o utilities.o $(LFLAGS)

corrupt_data_2d.o: corrupt_data_2d.c utilities.h utilities.c
	$(CC) $(CFLAGS) -c corrupt_data_2d.c

corrupt_data_2d: corrupt_data_2d.o utilities.o
	$(CC) -o corrupt_data_2d ./corrupt_data_2d.o utilities.o $(LFLAGS)

detect_data_2d.o: detect_data_2d.c utilities.h utilities.c
	$(CC) $(CFLAGS) -c detect_data_2d.c

detect_data_2d: detect_data_2d.o utilities.o
	$(CC) -o detect_data_2d ./detect_data_2d.o utilities.o $(LFLAGS)

correct_data_2d.o: correct_data_2d.c utilities.h utilities.c
	$(CC) $(CFLAGS) -c correct_data_2d.c

correct_data_2d: correct_data_2d.o utilities.o
	$(CC) -o correct_data_2d ./correct_data_2d.o utilities.o $(LFLAGS) 

simple_mbe_test.o: simple_mbe_test.c utilities.h utilities.c
	$(CC) $(CFLAGS) -c simple_mbe_test.c

simple_mbe_test: simple_mbe_test.o utilities.o
	$(CC) -o simple_mbe_test ./simple_mbe_test.o utilities.o $(LFLAGS) 

mul_data_2d_faulty.o: mul_data_2d_faulty.c utilities.h utilities.c
	$(CC) $(CFLAGS) -c mul_data_2d_faulty.c

mul_data_2d_faulty: mul_data_2d_faulty.o utilities.o
	$(CC) -o mul_data_2d_faulty ./mul_data_2d_faulty.o utilities.o $(LFLAGS)

ham-encode-4.o: ham-encode-4.c utilities.h utilities.c
	$(CC) $(CFLAGS) -c ham-encode-4.c

ham-encode-4: ham-encode-4.o utilities.o
	$(CC) -o ham-encode-4 ./ham-encode-4.o utilities.o $(LFLAGS)

	
clean:
	rm -f *.o $(PROGS)

