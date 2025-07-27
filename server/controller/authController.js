import { User } from "../quizModel/userModel.js";

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
   

    if ([username, password].some((field) => field?.trim() === "")) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existedUser = await User.findOne({ username });

    if (existedUser) {
      return res
        .status(409)
        .json({ success: false, message: "User with username already exists" });
    }

    const user = await User.create({
      username: username.toLowerCase(),
      password,
    });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while registering the user",
      });
    }

    return res.status(201).json({
      success: true,
      message: "User registered Successfully. Please login !",
      user,
    });
  } catch (error) {
    console.log("error in register controller. Error: ", error);
    return res.status(400).json({
      success: false,
      message: error || "error in registering user",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ success: false, message: "username is required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ success: false, message: "wrong password" });
    }

    let token = user.generateToken();
 

    const loggedInUser = await User.findById(user._id).select(
      "-password"
    );

    const options = {
  
      secure: true,
      sameSite: "None",
      httpOnly: true,
      domain: ".onrender.com"
    };

    return res.status(200).cookie("token", token, options).json({
      success: true,
      message: "user logged in successfully",
      user: loggedInUser,
    });
  } catch (error) {
    console.log("error in login. error: ", error);
    return res.status(500).json({
      success: false,
      message: error || "error in login user",
    });
  }
};

export { registerUser, loginUser };
