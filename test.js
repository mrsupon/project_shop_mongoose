import {prompt, printArrayAt} from "./utils/utility.js"

const data = Array.from( prompt("input your data : ")); //get array of characters from input (index start from 0)
const isOdd = (data.length%2 === 0)? 0: 1;             //offset value (check odd and even amount of characters)
let m = Math.ceil(data.length/2) ;                      //get center position
for( let i=1; i< m; i++)                                //print top
    printArrayAt(10-i, data.slice(m-i, m+i-isOdd));         
printArrayAt(10-m, data);                               //print middle
for( let i=m-1; i>= 0; i--)                             //print bottom   
    printArrayAt(10-i, data.slice(m-i, m+i-isOdd));
                     

 
 

