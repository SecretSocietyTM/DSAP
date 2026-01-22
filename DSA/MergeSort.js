import { ArrayList } from "./ArrayList.js";

function merge(array, l_start, l_end, end) {
    const size_left = (l_end - l_start) + 1;
    const size_right = end - l_end;

    const arr_left = new ArrayList(size_left + 1);
    const arr_right = new ArrayList(size_right + 1);

    for (let i = l_start; i < l_end + 1; i++) {
        arr_left.append(array[i]); 
        // traditionally, append is not a readily available array function, so instead 
        // of using append(), add to the new array starting from 0

        // arr_left.arr[i - l_start] = array[i];
        // arr_right.arr[i - l_end + 1]
    }
    arr_left.append(Number.MAX_VALUE);

    for (let i = l_end + 1; i < end + 1; i++) {
        arr_right.append(array[i]);
    }
    arr_right.append(Number.MAX_VALUE);

    let idx_l = 0;
    let idx_r = 0;

    for (let i = l_start; i < end + 1; i++) { // could also do i <= end
        if (arr_left.arr[idx_l] < arr_right.arr[idx_r]) {
            array[i] = arr_left.arr[idx_l];
            idx_l++;
        } else {
            array[i] = arr_right.arr[idx_r];
            idx_r++;
        }
    }
}

function recursiveMergeSort(array, start, end) {
    if (start < end) {
        let l_end = Math.floor((start + end) / 2);
        recursiveMergeSort(array, start, l_end);
        recursiveMergeSort(array, l_end + 1, end);
        merge(array, start, l_end, end);
    }
}

export function MergeSort(array) {
    recursiveMergeSort(array, 0, array.length - 1);
}