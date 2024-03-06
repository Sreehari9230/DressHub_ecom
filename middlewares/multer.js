// // const path = require("path");
// // const multer = require("multer");

// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, path.join(__dirname, "..", "public", "myImages"))
// //     },
// //     filename: (req, file, cb) => {
       
// //         const name = Date.now() + '-' + file.originalname
// //         cb(null, name)
    
// //     }
// // })
// // const upload = multer({ storage: storage });


// // module.exports = {
// //     upload
// // }


// const path = require("path");
// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, "..", "public", "productImages")); // Input directory
//     },
//     filename: (req, file, cb) => {
//         const name = Date.now() + '_' + file.originalname;
//         console.log(name, 'dcvghvg');
//         console.log(file.originalname, 'fghcghfv');
//         cb(null, name); // Output directory
//     }
// });

// const upload = multer({ storage: storage });

// module.exports = {
//     upload: upload
// };

