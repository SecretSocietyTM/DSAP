function exchange(array, index_a, index_b) {
    const temp = array[index_a];
    array[index_a] = array[index_b];
    array[index_b] = temp;
}

function findMinValueIndex(array, start) {

    let min_index = start;

    for (let i = start; i < array.length; i++) {
        if (array[i] < array[min_index]) {
            min_index = i;
        }
    }
    
    return min_index;
}

export function SelectionSort(array) {

    for (let i = 0; i < array.length; i++) {
        const min_index = findMinValueIndex(array, i);
        exchange(array, min_index, i);
    }
}