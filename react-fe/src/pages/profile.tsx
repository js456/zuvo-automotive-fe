import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { fetchUserProfile } from "../api/userApi";
import { UserProfile } from "../models/UserProfile";

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 0,
    name: "Jitendra Saini",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUserProfile();
        console.log(data)
        console.log(data.id)
        const { id, name, email, phone } = data;
        console.log(data)
        setUserProfile({ id, name, email, phone });
        console.log("profile",userProfile)
      } catch (error) {
        setError("Failed to load profile");
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saving profile:", userProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) {
    return <div className="text-center mt-8 text-lg font-medium">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">My Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Name</label>
          <Input
            name="name"
            value={userProfile.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Email</label>
          <Input
            type="email"
            name="email"
            value={userProfile.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Phone</label>
          <Input
            type="tel"
            name="phone"
            value={userProfile.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
