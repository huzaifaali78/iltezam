const Profile = require("../models/profileModel");

const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const followUser = async (req, res) => {
  try {
    const { userId, targetId } = req.body;

    if (userId === targetId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const user = await Profile.findById(userId);
    const target = await Profile.findById(targetId);

    if (!user || !target) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.following.some(f => f.user.toString() === targetId)) {
      return res.status(400).json({ message: "Already following this user" });
    }

    user.following.push({ user: targetId, status: "pending" });
    await user.save();

    target.followers.push({ user: userId, status: "pending" });
    await target.save();

    res.json({ message: "Follow request sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { userId, targetId } = req.body;

    const user = await Profile.findById(userId);
    const target = await Profile.findById(targetId);

    if (!user || !target) {
      return res.status(404).json({ message: "User not found" });
    }

    user.following = user.following.filter(
      f => f.user.toString() !== targetId
    );
    await user.save();

    target.followers = target.followers.filter(
      f => f.user.toString() !== userId
    );
    await target.save();

    res.json({ message: "User unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acceptFollow = async (req, res) => {
  try{
    const userId = req.user.id;
    const { requestId } = req.body;
    const user = await Profile.findById(userId);
    const requestProfile = await Profile.findById(requestId);
    if (!user || !requestProfile) {
      return res.status(404).json({ message: "User or request profile not found" });
    }
    const followerIndex = user.followers.findIndex(f => f.user.toString() === requestId);
    if (followerIndex === -1) {
      return res.status(404).json({ message: "Follow request not found" });
    }
    user.followers[followerIndex].status = "active";
    // requestProfile.following.push({ user: userId, status: "active" });
    await user.save();
    await requestProfile.save();
    res.json({ message: "Follow request accepted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfiles,
  updateProfile,
  followUser,
  unfollowUser,
  acceptFollow
};
