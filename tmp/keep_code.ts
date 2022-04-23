function stringifyArray(array: Array<Array<string>>): string {
    let result = "";
    for (let i = 0; i < array.length; i++) {
        for(let j = 0; j < array[0].length; j++) {
            result += array[i][j];
        }
    }
    return result;
}