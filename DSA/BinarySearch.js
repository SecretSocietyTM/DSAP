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