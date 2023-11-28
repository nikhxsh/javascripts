
main();

function main() {
    const input = [12, 13, 14, [11, 12, [55]], 66, 99, 150]
    console.log(input);
    let output = GetUniqueArray(input);
    console.log(output.sort());
}


function GetUniqueArray(input) {
    let output = [];

    input.forEach(value => {
        if (Array.isArray(value)) {
            var temp = GetUniqueArray(value)
            output = output.concat(temp.filter(x => output.indexOf(x) < 0));
            // let arr = [...arr1, ...arr2]; 
            // let mergedArr = [...new Set(arr)] 
        }
        else {
            if (!output.includes(value)) {
                output.push(value);
            }
        }
    });

    return output;
}