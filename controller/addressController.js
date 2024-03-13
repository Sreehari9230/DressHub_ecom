const Cart = require('../model/cartModel')
const Category = require('../model/categoryModel')
const User = require('../model/userModel')
const Product = require('../model/productModel')
const Address = require('../model/addressModel')

const loadAddress = async(req,res)=>{
    try {
        const UserIn = req.session.userId
        const userId = await User.findOne({_id:req.session.userId})
        const userAddress = await Address.findOne({user:req.session.userId})
        res.render('user/address', { UserIn, userAddress })
    } catch (error) {
        console.log(error);
    }
}


const loadAddAddress = async(req,res)=>{
    try {
       const userIn = req.session.userId;
       res.render('user/addaddress', { userIn }) 
    } catch (error) {
        console.log(error.message);
    }
}


const postAddress = async (req,res)=>{
    try {
    const userData = await User.findOne({_id:req.session.userId});
    const {firstName,lastName,mobileNumber,email,address,city,postCode,isDefault}=req.body;
    const userIn = req.session.userId;

    if(userData){
        const Data = await Address.findOneAndUpdate(
            {user:userIn},
            {
              $push:{
                address:{
                fname:firstName,
                lname:lastName,
                city:city,
                mobile:mobileNumber,
                email:email,
                address:address,
                pin:postCode,
                isdifault:isDefault,
            },
        }
    },
    {new:true,upsert:true}
 )
 console.log("address here",Data);
   res.redirect('/address')
 }else{
    res.render("user/addaddress",{userIn});

 }
    } catch (error) {
        console.log(error.message);
    }
}

const editAddress = async(req,res)=>{
    try {
        const { id, addressFname, addressLname, addressValue, addressCity, addressEmail, addressPost, addressNumber } = req.body;

        // Find the address by its id
        const user = await Address.findOne({ user: req.session.userId });
        console.log(user)

        const address = user.address.find(
            address => address._id.toString() === id
          );
//
//updating the fields
        address.fname = addressFname;
        address.lname = addressLname;
        address.address = addressValue;
        address.city = addressCity;
        address.email = addressEmail;
        address.mobile = addressNumber;
        address.pin = addressPost;

        //saving to db
        await user.save()

        res.status(200).json({success:true})

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }
}

const deleteAddress = async(req,res)=>{
    try {
        const { id } = req.body
        console.log('the id is getting ', id);

        const userAddress = await Address.updateOne(
            {user: req.session.userId},
            {$pull: { address: {_id:id } } },
            { new: true}
        )

        res.status(500).json({ error: 'Internal Server Error'})

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    loadAddress,
    loadAddAddress,
    postAddress,
    editAddress,
    deleteAddress
    
}