// //ADD PRODUCT
// const AddProduct = async (req, res) => {
//     try {
//         const filenames = [];

//   for (let item of req.files) {
//     const pathdata = Date.now() + '-' + item.originalname;
//     const imagePath = path.join(
//       __dirname,
//       '../public/productImages',
//       `${pathdata}`
//     );

//     const fileBuffer = await fs.readFile(item.path);

//     await sharp(fileBuffer)
//       .resize(1200, 1000, { fit: 'fill' })
//       .toFile(imagePath);

//     filenames.push(pathdata);
//   }
//   console.log('asdfghjklzxcvbnmqwertyuiop');
//   console.log("Product Category:", req.body.productcategory);

//   const newProduct = new products({
//     name: req.body.productname,
//     description: req.body.productdescription,
//     quantity: req.body.productquantity,
//     price: req.body.productprice,
//     Image: filenames,
//     category: req.body.productcategory,
//     date: new Date()
//   });
//    // Save the new product to the database
//         await newProduct.save();
//   console.log('this is the product',newProduct);
//   // // Redirect to product list page
//         res.redirect("/admin/productlist");
//     }

//     catch (error) {
//         console.error("Error adding product:", error);
//         res.status(500).send("Internal server error");
//     }
// };

// const editproduct = async (req, res) => {
//     try {
//       const id = req.body.id;
//       const { productName, description, quantity, categories, price } = req.body;

//       const Datas = await products.findOne({ _id: id });
//       const productData = await category.find({ is_Listed: 1 });
//       const imageData = [];
//       if (req.files) {
//         const existedimagecount = (await products.findById(id)).Image.length;
//         if (existedimagecount + req.files.length !== 4) {
//           return res.render("admin/editproduct", {
//             message: "4 Images Only Needed",
//             productData,
//             Datas,

//           });
//         } else {
//           for (let i = 0; i < req.files.length; i++) {
//             const resizedpath = path.join(
//               __dirname,
//               "../public/proImage",
//               req.files[i].filename
//             );
//             await sharp(req.files[i].path)
//               .resize(800, 1200, { fit: "fill" })
//               .toFile(resizedpath);

//             imageData.push(req.files[i].filename);
//           }
//         }
//       }

//       const selectcategory = await category.findOne({
//         name: categories,
//         is_Listed: 1,
//       });

//       const updateproduct = await products.findOneAndUpdate(
//         { _id: id },
//         {
//           name: productName,
//           description,
//           quantity: quantity,
//           price,
//           categories: selectcategory._id,
//           $push: { Image: { $each: imageData } },
//         },
//         {
//           new: true,
//         }
//       );
//       res.redirect("/admin/productlist");
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const productdetail = async(req,res)=>{
//     try {

//     const productId = req.query.id
//     console.log("uifvufvnfuvuvuivui",productId);
//     const product= await Product.findById({_id:productId}).populate({
//       path: 'category',
//       populate: { path: 'offers' }
//     }).populate("offers");

//     console.log("the productdetail may here",product);
//     res.render("user/productdetail",{data:product,user: req.session.userId})
//     } catch (error) {
//       console.log(error.message);
//     }

//   }

//   document.addEventListener('DOMContentLoaded', function () {
//     let countdown = 60;
//     const otpForm = document.getElementById('otpForm');
//     const timerDisplay = document.getElementById('timerDisplay');
//     const userMessage = document.getElementById('user-message');
//     let timer;
//     let timerRunning = false;

//     function updateTimerDisplay() {
//         const minutes = Math.floor(countdown / 60)
//         const seconds = countdown % 60;;
//         timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//     }

//     function startTimer() {
//         timerRunning = true;
//         timer = setInterval(function () {
//             countdown--;
//             updateTimerDisplay();
//             if (countdown <= 0) {
//                 clearInterval(timer)
//                 countdown = 0;
//                 updateTimerDisplay();
//                 timerRunning = false;
//             }
//         }, 1000)
//     }

//     updateTimerDisplay();
//     startTimer();

//     // Event delegation for the "RESEND OTP" button
//     document.addEventListener('click', function(event) {
//         if (event.target && event.target.id === 'resendOTPBtn') {
//             if (countdown <= 0) {
//                 fetch('/sendOtp');
//                 countdown = 60;
//                 updateTimerDisplay();
//                 event.target.disabled = true;
//                 event.target.classList.remove('afterTimer');
//                 userMessage.style.display = 'block';
//                 startTimer();
//             }
//         }
//     });
// })

userRoute.post("/updatecart", cartcontroller.updateCart);
userRoute.delete("/removecart", cartcontroller.removecart);

{
  /* <script>
        function updatecount(productId, count) {
            const data = { productId, count };
            fetch('/updatecart', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json()) // Parse the JSON response
    
                .then(response => {
                    if (response.success) {
                        // Reload the cart section and update subtotal
                        $('#reload').load('/cart  #reload');
                        $('#subtotal').load('/cart  #subtotal');
                    } else {
                        console.log("Error: ", response.error);
                    }
                })
                .catch(error => console.error("Error:", error)); // Handle any fetch errors
        }
</script> */
}

// <script>
//     function Total(input, id, price) {
//         const quantity = parseInt(input.value);
//         const total =  quantity * price;
//         // You can update the UI to display the total or send this information to the server if needed
//     }
// </script>

// <script>

//     function removecart(id) {
//         $.ajax({
//             url: "/removecart",
//             method: 'DELETE',
//             data: {
//                 productId: id,
//             },
//             success: (response) => {
//                 if (response.success) {
//                     Swal.fire({
//                         title: "Item Removed!",
//                         text: "The item has been successfully removed from your cart.",
//                         icon: "success",
//                         showConfirmButton: false,
//                     });
//                     $('#reload').load('/cart #reload')
//                     // Optionally, you can add logic here to update the UI after successful removal
//                 } else {
//                     console.error("Failed to remove item from cart.");
//                 }
//             },
//             error: (xhr, status, error) => {
//                 console.error("Error occurred:", error);
//             }
//         });
//     }

//  </script>

const updateCart = async (req, res) => {
  try {
    const product_id = req.body.productId;
    const user_id = req.session.userId;
    const count = req.body.count;

    // Fetch the product and user's cart data
    const product = await Product.findOne({ _id: product_id });
    const cartData = await Cart.findOne({ user: user_id });

    // Handle decrease in quantity
    if (count == -1) {
      const currentQuantity = cartData.product.find(
        (p) => p.productId == product_id
      ).quantity;
      if (currentQuantity <= 1) {
        return res.json({
          success: false,
          error: "Quantity cannot be decreased below 1",
        });
      }
    }

    // Handle increase in quantity
    if (count == 1) {
      const currentQuantity = cartData.product.find(
        (p) => p.productId == product_id
      ).quantity;
      if (currentQuantity + count > product.quantity) {
        return res.json({
          success: false,
          error: "Cannot add more than available quantity",
        });
      }
    }
    // Update the cart in the database
    const cartDetail = await Cart.findOneAndUpdate(
      {
        user: user_id,
        "product.productId": product_id,
      },
      {
        $inc: {
          "product.$.quantity": count, // Use $ to identify the correct element to update in the array
          "product.$.total": count * product.price, // Calculate the total based on the product's price
        },
      },
      { new: true } // Return the updated document
    );
    res.json({ success: true });
  } catch (error) {}
};

const removecart = async (req, res) => {
  try {
    const product_id = req.body.productId;
    const user_id = req.session.userId;

    const result = await Cart.findOneAndUpdate(
      { user: user_id },
      { $pull: { product: { productId: product_id } } },
      { new: true }
    );

    if (result) {
      res.json({ success: true });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Product not found in cart." });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//CHAT GPT
//         <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
// <script>
//     function updatecount(productId, count) {
//         console.log('count is updating', productId, count);
//         const data = { productId, count };

//         $.post('/updatecart', JSON.stringify(data), function(response) {
//             if (response.success) {
//                 // Reload the cart section and update subtotal
//                 $('#reload').load('/cart #reload');
//                 $('#subtotal').load('/cart #subtotal');
//             } else {
//                 console.log("Error: ", response.error);
//             }
//         }, 'json')
//         .fail(function(error) {
//             console.error("Error:", error);
//         });
//     }
// </script>
\














const mongoose = require('mongoose')

const addressModel = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    address: {
        type: [{
            fname: { 
                type: String,
                 required: true
                 },
            lname: {
                 type: String,
                  required: true 
                },
            city: { 
                type: String,
                 required: true
                 },
            mobile: { 
                type: Number,
                 required: true 
                },
            email: { 
                type: String,
                 required: true
                 },
            address: {
                 type: String,
                  required: true 
                },
            pin: {
                 type: String, 
                 required: true 
                },  
        }],

    }
});


module.exports = mongoose.model('Address',addressModel)