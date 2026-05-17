#include <stdio.h>

/*
    &: address of operator
    *: value at address operator

    pointer to int/char/float
    int/char/float *pointer_name = &variable_name 

    pointer to pointer
    int/char/float **pointer_name = &pointer_name
*/

void var_addr(int x);

int main(){
    // Question 1
    // int i= 6;
    // int *j = &i;
    // // printf("%d\n",&i);
    // printf("%d",*j);


    // Question 2
    int i = 6;
    printf("%d\n",&i);
    var_addr(i);





    return 0; 
}

void var_addr(int x){
    printf("%d\n",&x);
}