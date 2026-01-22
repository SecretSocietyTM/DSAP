export function BinarySearch(array, key) {
    let lo = 0;
    let hi = array.length - 1;

    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        
        if (key < array[mid]) {
            hi = mid - 1;
        } else if (key > array[mid]) {
            lo = mid + 1;
        } else {
            return array[mid];
        }
    }

    return -1;
}

/* TODO: temp, remove */
import { ArrayList } from "./ArrayList.js";
import { QuickSort } from "./QuickSort.js";
if (true) 
{

const test = new ArrayList(1);
test.append(43);
test.append(27);
test.append(45);
test.append(24);
test.append(35);
test.append(47);
test.append(22);
test.append(48);


ArrayList.print(test); // unsorted
QuickSort(test.arr);
ArrayList.print(test); // sorted
console.log(BinarySearch(test.arr, 24));
}