const User = require("../../models/userModel");
const messages = require("../../utils/messages/fa");

exports.completeProfile = async (req, res) => {
  const { fullName, bio, website, socialLink } = req.body;

  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: messages.user.not_found });
    }

    user.fullName = fullName || user.fullName;
    user.bio = bio || user.bio;
    user.website = website || user.website;
    user.socialLink = socialLink || user.socialLink;

    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.status(200).json({
      message: messages.user.profile_updated,
      user,
      redirectTo: "/dashboard",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: messages.common.server_error });
  }
};
