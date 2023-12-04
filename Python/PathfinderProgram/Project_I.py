# Justin LaForge
# Agit Yesiloz

import os

# Segment 1: Insert file data into a list
file = open("input1.txt", "r+")

theList = []
vertexes = []
fileSize = len(file.readlines())
file.close()

file = open("input1.txt", "r+")
for i in range(fileSize):
    theList.append(file.readline().replace("\n", "").split(" "))
    theList[i][0] = int(theList[i][0])
    theList[i][1] = int(theList[i][1])
    theList[i][2] = int(theList[i][2])
# End of segment 1

# Segment 2: Find starting point (smallest number)
pivot = theList[0][0]
for i in range(len(theList)):
    if theList[i][0] < pivot:
        pivot = theList[i][0]

print(pivot)
vertexes.append(pivot)
# End of segment 2

# Segment 3-5:
selectFrom = [] # Connections to select from
endList = [] # Final connections
while len(theList) > 0:
    # Segment 3: Insert all available paths from current vertexes
    j = 0
    for i in range(len(theList)):
        if theList[i-j][0] == vertexes[-1] or theList[i-j][1] == vertexes[-1]:
            selectFrom.append(theList[i-j])
            theList.remove(theList[i-j])
            j+=1
    # End of segment 3

    # Segment 4: Choose smallest path
    smallest = selectFrom[0]
    for item in selectFrom:
        if item[2] < smallest[2]:
            smallest = item


    if vertexes.__contains__(smallest[0]):
        vertexes.append(smallest[1])
    else:
        vertexes.append(smallest[0])

    pivot = vertexes[-1]


    endList.append(smallest)
    # End of segment 4


    # Segment 5: Remove vertexes
    for item in selectFrom:
        if item[0] == pivot or item[1] == pivot:
            selectFrom.remove(item)


for item in endList:
    print(item)
print(vertexes)

newFile = open("output_I.txt", "w")
total = 0
for item in endList:
    total += item[2]
newFile.write("Total Distance: " + str(total)+"\n")
newFile.write("Distance between cities:\n")
for item in endList:
    newFile.write(str(item[0]) + " " + str(item[1]) + " " + str(item[2]) + "\n")

newFile.write("Order of Cities:\n")
for item in vertexes:
    newFile.write(str(item) + " ")