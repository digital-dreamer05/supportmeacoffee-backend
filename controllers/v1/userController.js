const User = require("../../models/userModel");

exports.completeProfile = async (req, res) => {
  const { fullName, bio, website, socialLink } = req.body;

  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    user.fullName = fullName || user.fullName;
    user.bio = bio || user.bio;
    user.website = website || user.website;
    user.socialLink = socialLink || user.socialLink;

    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
      redirectTo: "/dashboard",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
