

# for i in range(1,len(a)):
#     key = a[i]
#     print(key)
#     for j in range(i,0,-1):
#         if key <= a[j-1]:
#             a[j] = a[j-1]
#             a[j-1] = key
        
# print(a)

def insertionSort(list=[]):
    for i in range(1,len(list)):
        key = list[i]
        for j in range(i,0,-1):
            if key <= a[j-1]:
                a[j] = a[j-1]
                a[j-1] = key

    print(list)

a = [8,2,4,9,3,6]

insertionSort(a)
