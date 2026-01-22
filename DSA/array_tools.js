import { ArrayList } from "./ArrayList.js";

const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateArray(size_min, size_max) {

    const size = randInt(size_min, size_max);

    const arr = new ArrayList(size);

    for (let i = 0; i < size; i++) {
        arr.append(randInt(0, 100));
    }

    return arr;
}

function printSection(array, section_size = 5) {

    const temp = [];

    for (let i = 0; i < section_size; i++) {
        temp.push(array.arr[i]);
    }

    console.log(temp);
}

function measureSortPerformance(array, sort_fn) {

    const start = performance.now();

    sort_fn(array);

    const end = performance.now();

    return end - start;
}

function averageSortTime(sort_fn, repeat_count, arr_size) {

    let sum_time = 0;

    for (let i = 0; i < repeat_count; i++) {
        const arr = generateArray(arr_size, arr_size)
        sum_time += measureSortPerformance(arr, sort_fn);
    }

    return sum_time / repeat_count;
}

export const ArrayTools = {
    generateArray,
    printSection,
    measureSortPerformance,
    averageSortTime
};