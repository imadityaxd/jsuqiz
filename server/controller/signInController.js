import { User } from "../quizModel/userModel.js";

// const generateAccessAndRefereshTokens = async (userId) => {
//   try {
//     const user = await User.findById(userId);
//     const accessToken = user.generateAccessToken();
//     const refreshToken = user.generateRefreshToken();

//     user.refreshToken = refreshToken;
//     await user.save({ validateBeforeSave: false });

//     return { accessToken, refreshToken };
//   } catch (error) {
//     throw new ApiError(
//       500,
//       "Something went wrong while generating referesh and access token"
//     );
//   }
// };

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    //console.log("email: ", email);

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

    return res
      .status(201)
      .json({ success: true, message: "User registered Successfully", user });
  } catch (error) {
    console.log("error in register controller. Error: ", error);
    return res.status(400).json({
      success: false,
      message: error || "error in registering user",
    });
  }
};

// const loginUser = asyncHandler(async (req, res) => {
//   // req body -> data
//   // username or email
//   //find the user
//   //password check
//   //access and referesh token
//   //send cookie

//   const { email, username, password } = req.body;
//   console.log(email);

//   if (!username && !email) {
//     throw new ApiError(400, "username or email is required");
//   }

//   // Here is an alternative of above code based on logic discussed in video:
//   // if (!(username || email)) {
//   //     throw new ApiError(400, "username or email is required")

//   // }

//   const user = await User.findOne({
//     $or: [{ username }, { email }],
//   });

//   if (!user) {
//     throw new ApiError(404, "User does not exist");
//   }

//   const isPasswordValid = await user.isPasswordCorrect(password);

//   if (!isPasswordValid) {
//     throw new ApiError(401, "Invalid user credentials");
//   }

//   const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
//     user._id
//   );

//   const loggedInUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   );

//   const options = {
//     httpOnly: true,
//     secure: true,
//   };

//   return res
//     .status(200)
//     .cookie("accessToken", accessToken, options)
//     .cookie("refreshToken", refreshToken, options)
//     .json(
//       new ApiResponse(
//         200,
//         {
//           user: loggedInUser,
//           accessToken,
//           refreshToken,
//         },
//         "User logged In Successfully"
//       )
//     );
// });

// const logoutUser = asyncHandler(async (req, res) => {
//   await User.findByIdAndUpdate(
//     req.user._id,
//     {
//       $unset: {
//         refreshToken: 1, // this removes the field from document
//       },
//     },
//     {
//       new: true,
//     }
//   );

//   const options = {
//     httpOnly: true,
//     secure: true,
//   };

//   return res
//     .status(200)
//     .clearCookie("accessToken", options)
//     .clearCookie("refreshToken", options)
//     .json(new ApiResponse(200, {}, "User logged Out"));
// });

// const getCurrentUser = asyncHandler(async (req, res) => {
//   return res
//     .status(200)
//     .json(new ApiResponse(200, req.user, "User fetched successfully"));
// });

export { registerUser };
