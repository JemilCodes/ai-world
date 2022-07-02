const User = require("../Models/Data");
const registerNewUser = async (req, res) => {
  try {
    const {email} = req.body;
    const userExist = await User.findOne({email:email});
    if(!userExist){
      const users = await User.create(req.body);
     return res.status(201).json(users);
    }
    if(userExist){
     return res.json("userAlreadyExist");
    }
   } catch (err) {
    res.status(500).json("server-error");
  }
};

const loginUser = async (req, res) => {
  try {
    const userLogin = await User.find(req.body);
    if (userLogin) {
     return res.status(201).json(userLogin);
    } 
    else if (!userLogin) {
      return res.status(404).json("failedUser");
    }
  } catch (err) {
    res.status(500).json("server-error");
  }
};
const updateFaceEntries = async (req, res) => {
  try {
    const { faceEntries , id} = req.body;
    const count = faceEntries + 1;
    const newFaceEntries = await User.findByIdAndUpdate(
      id,
      {faceEntries:count},
      { new: true }
    );
    res.status(201).json(newFaceEntries);
  } catch (err) {
    res.status(501).json("serverError");
  }
};
const updateFoodEntries = async (req, res) => {
  try {
    const { foodEntries , id } = req.body;
    const count = foodEntries + 1;
    const newFoodEntries = await User.findOneAndUpdate(
      id,
      { foodEntries: count },
      { new: true }
    );
    console.log(newFoodEntries)
    res.status(201).json(newFoodEntries);
  } catch (err) {
    res.status(501).json("serverError");
  }
};
const updateColorEntries = async (req, res) => {
  try {
    const { colorEntries , id } = req.body;
    const count = colorEntries + 1;
    const newColorEntries = await User.findOneAndUpdate(
      id,
      { colorEntries: count },
      { new: true }
    );
    res.status(201).json(newColorEntries);
  }  catch (err) {
    res.status(501).json("serverError");
  }
};
const updateApparelEntries = async (req, res) => {
  try {
    const { apparelEntries , id} = req.body;
    const count = apparelEntries + 1;
    const newApparelEntries = await User.findOneAndUpdate(
      id,
      { apparelEntries: count },
      { new: true }
    );
    res.status(201).json(newApparelEntries);
  }  catch (err) {
    res.status(501).json("serverError");
  }
};
const updateGeneralEntries = async (req, res) => {
  try {
    const { generalEntries , id } = req.body;
    const count = generalEntries + 1;
    const newGeneralEntries = await User.findOneAndUpdate(
      id,
      { generalEntries: count },
      { new: true }
    );
    res.status(201).json(newGeneralEntries);
  } catch (err) {
    res.status(501).json("serverError");
  }
};
const DeleteAccount = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedUser = await User.findByIdAndDelete(id)
    if (deletedUser) {
     return res.status(201).json("yes")
    }
  } catch (err) {
    res.status(501).json("serverError");
  }

};
module.exports = {
  registerNewUser,
  loginUser,
  updateFaceEntries,
  updateFoodEntries,
  updateColorEntries,
  updateApparelEntries,
  updateGeneralEntries,
  DeleteAccount,
};
