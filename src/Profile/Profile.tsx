import {
  Avatar,
  Divider,
  FileInput,
  Overlay,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import Info from "./Info";
import { setProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experiences from "./Experiences";
import Certification from "./Certification";
import { useHover } from "@mantine/hooks";
import { successNotification } from "../Services/NotificationService";

interface RootState {
  user: {
    profileId: string;
  };
  profile: {
    picture?: string;
    // Add more profile fields as needed
  };
}

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const profile = useSelector((state: RootState) => state.profile);

  const [error, setError] = useState<string | null>(null);
  if (error) {
    console.error("Error:", error);
  }
  
  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (image: File | null) => {
    if (!image) return;
    try {
      const picture: string = await getBase64(image);
      const updatedProfile = { ...profile, picture: picture.split(",")[1] };
      dispatch(setProfile(updatedProfile));
      successNotification("Success", "Profile Picture Updated Successfully.");

      await updateProfile(updatedProfile);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again later.");
    }
  };

  useEffect(() => {
    if (user.profileId) {
      getProfile(user.profileId)
        .then((data) => {
          dispatch(setProfile(data));
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
          setError("Failed to fetch profile data. Please try again later.");
        });
    } else {
      setError("Invalid profile ID.");
    }
  }, [user.profileId, dispatch]);

  const { hovered, ref } = useHover();

  return (
    <div className="w-4/5 mx-auto bg-mine-shaft-950">
      <div>
        <div className="relative">
          <img className="rounded-t-2xl mt-5" src="/banner.jpg" alt="Background" />
          <div ref={ref} className="absolute flex items-center justify-center -bottom-1/3 left-3">
            <Avatar
              className="!w-48 !h-48 border-mine-shaft-950 border-8 rounded-full"
              src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : "/avatar.png"}
              alt="Profile"
            />
            {hovered && <Overlay color="#000" className="!rounded-full" backgroundOpacity={0.75} />}
            {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16" />}
            {hovered && (
              <FileInput
                onChange={handleFileChange}
                className="absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full !h-full w-full"
                variant="transparent"
                size="lg"
                radius="xl"
                accept="image/png,image/jpeg"
              />
            )}
          </div>
        </div>

        <div className="px-3 mt-20">
          <Info />
        </div>
        <Divider size="xs" my="md" color="mineShaft.7" />

        <About />
        <Divider my="md" color="mineShaft.7" />

        <Skills />
        <Divider my="md" color="mineShaft.7" />

        <Experiences />
        <Divider my="md" color="mineShaft.7" />

        <Certification />
      </div>
    </div>
  );
};

export default Profile;
