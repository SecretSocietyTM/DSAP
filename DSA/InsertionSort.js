export function InsertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        const temp = array[i];

        let cur_idx = i - 1;
        while (cur_idx >= 0 && temp < array[cur_idx]) {
            array[cur_idx + 1] = array[cur_idx];
            cur_idx--;
        }
        array[cur_idx + 1] = temp;
    }
}

/* TODO: temp, remove */
import { ArrayList } from "./ArrayList.js";
if (false) 
{

const test = new ArrayList(8);
test.append(43);
test.append(27);
test.append(45);
test.append(24);
test.append(35);
test.append(47);
test.append(22);
test.append(48);


ArrayList.print(test); // unsorted
InsertionSort(test.arr);
ArrayList.print(test); // sorted
}