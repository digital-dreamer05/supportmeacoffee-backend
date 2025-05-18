const User = require("../../models/userModel");

exports.completeProfile = async (req, res) => {
  const userId = req.user?._id; // فرض بر اینکه از middleware احراز هویت JWT استفاده می‌کنی

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { name, bio, socialLinks, profileImage } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.socialLinks = socialLinks || user.socialLinks;
    user.profileImage = profileImage || user.profileImage;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err });
  }
};
