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