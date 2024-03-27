import * as fs from 'fs';
    function processNumbersFromFile(inputFilePath, operation) {
        fs.readFile(inputFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
    
            // Split the content by lines and convert each line to a number
            const numbers = data.trim().split('\n').map(Number);
    
            // Execute the provided operation on each number
            numbers.forEach(number => {
                operation(number);
                
            });
            // console.log(global.owner)
        });
    }
    
    // Define your operation function here
    function myOperationFunction(number) {
        
        let name = conn.getName(number + "@s.whatsapp.net")
        const arrayToFind = [ `${number}`, name, true ];
        const found = global.owner.some(item => 
            item.length === arrayToFind.length && 
            item.every((value, index) => value === arrayToFind[index])
        );
        if (found){
            // console.log(`${number} is already sudo`)
        } else {
            global.owner.push([`${number}`, name, true]);
            // console.log("Processing number:", number);
        }
    }
    
    // Usage example:
    const inputFilePath = 'number.txt';
    
    processNumbersFromFile(inputFilePath, myOperationFunction);
