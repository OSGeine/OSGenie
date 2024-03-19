import * as fs from 'fs';
let handler = async (m, { conn }) => {

    // // Function to read numbers from file and perform an operation on each number
    // function readNumbersAndOperate(inputFilePath, operation) {
    //     fs.readFile(inputFilePath, 'utf8', (err, data) => {
    //         if (err) {
    //             console.error('Error reading file:', err);
    //             return;
    //         }

    //         // Split the content by lines and convert each line to a number
    //         const phoneNumbers = data.trim().split('\n').map(Number);

    //         // Perform operation on each number
    //         phoneNumbers.forEach(phoneNumber => {
    //             // Execute the operation on the phoneNumber
    //             console.log(phoneNumber)
    //         });
    //     });
    // }

    // // Define your operation function here
    // function executeOperationOnphoneNumber(phoneNumber) {
    // //     if (global.owner.includes(phoneNumber)) throw 'This person is already an sudo!';
    // // global.owner.push([`${phoneNumber}`, `Member Number ${phoneNumber}`, true]);
        
    //  conn.reply("966530740094@s.whatsapp.net", "All phoneNumbers in the list have been successfully upgraded");
    //     // You can replace this with any code you want to execute on each phoneNumber
    // }

    // // Usage example:
    // const inputFilePath = 'number.txt';

    // readNumbersAndOperate(inputFilePath, executeOperationOnphoneNumber);
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
        });
    }
    
    // Define your operation function here
    function myOperationFunction(number) {
        let name = conn.getName(number + "@s.whatsapp.net")
        if (!global.owner.includes(`${number}`)){
        global.owner.push([`${number}`, name, true]);}
        console.log("Processing number:", number);
        // Your code goes here
    }
    
    // Usage example:
    const inputFilePath = 'number.txt';
    
    processNumbersFromFile(inputFilePath, myOperationFunction);
    m.reply("Done ✅");

}
handler.help = ['sudoall']
handler.tags = ['owner']
handler.command = ['sudoall'];
handler.owner = true

export default handler;
