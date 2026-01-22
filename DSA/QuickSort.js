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