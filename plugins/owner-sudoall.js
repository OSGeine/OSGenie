import * as fs from 'fs';
let handler = async (m, { conn }) => {

    // Function to read numbers from file and perform an operation on each number
    function readNumbersAndOperate(inputFilePath, operation) {
        fs.readFile(inputFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }

            // Split the content by lines and convert each line to a number
            const numbers = data.trim().split('\n').map(Number);

            // Perform operation on each number
            numbers.forEach(number => {
                // Execute the operation on the number
                operation(number);
            });
        });
    }

    // Define your operation function here
    function executeOperationOnNumber(number) {
        if (global.owner.includes(number)) throw 'This person is already an sudo!';
    global.owner.push([number, number, true]);
     conn.reply("966530740094@s.whatsapp.net", "All numbers in the list have been successfully upgraded");
        // You can replace this with any code you want to execute on each number
    }

    // Usage example:
    const inputFilePath = 'number.txt';

    readNumbersAndOperate(inputFilePath, executeOperationOnNumber);
}
handler.help = ['sudoall']
handler.tags = ['owner']
handler.command = /^(sudoall)$/i;
handler.owner = true

export default handler;
