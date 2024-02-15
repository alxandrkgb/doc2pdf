const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/convert', upload.single('file'), (req, res) => {
    const filePath = path.resolve(req.file.path);
    const outputFilePath = `${req.file.destination}/${req.file.filename}.pdf`;

    exec(`docx-pdf ${filePath} ${outputFilePath}`, (error) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.status(500).send('Error converting file');
            return;
        }

        // Read the converted PDF file and send it as a response
        fs.readFile(outputFilePath, (err, data) => {
            if (err) {
                console.error(`readFile error: ${err}`);
                res.status(500).send('Error reading file');
                return;
            }

            res.contentType("application/pdf");
            res.send(data);
        });
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});