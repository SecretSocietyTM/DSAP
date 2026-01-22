function exchange(array, index_a, index_b) {
    const temp = array[index_a];
    array[index_a] = array[index_b];
    array[index_b] = temp;
}

function partition(array, start, end) {
    let pivot = array[start];
    let start_idx = start;

    for (let i = start + 1; i < end + 1; i++) {
        if (array[i] < pivot) {
            start_idx++;
            exchange(array, start_idx, i);
        }
    }

    exchange(array, start_idx, start);
    return start_idx;
}

function recursiveQuickSort(array, start, end) {
    if (start < end) {
        let pivot_idx = partition(array, start, end);
        recursiveQuickSort(array, start, pivot_idx - 1);
        recursiveQuickSort(array, pivot_idx + 1, end);
    }
}

export function QuickSort(array) {
    recursiveQuickSort(array, 0, array.length);
}

/* TODO: temp, remove */
import { ArrayList } from "./ArrayList.js";
if (false) 
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
}