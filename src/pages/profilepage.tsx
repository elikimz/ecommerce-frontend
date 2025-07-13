import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import {
  useGetCurrentUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../features/login/loginAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/spinner";

interface UserProfile {
  name: string;
  email: string;
  address: string;
  phone: string;
  profile_image: string;
  gender: string;
  date_of_birth: string;
}

const ProfilePage = () => {
  const {
    data: userProfile,
    error,
    isLoading,
    refetch,
  } = useGetCurrentUserProfileQuery({});
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    email: "",
    address: "",
    phone: "",
    profile_image: "",
    gender: "",
    date_of_birth: "",
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        email: userProfile.email || "",
        address: userProfile.address || "",
        phone: userProfile.phone || "",
        profile_image: userProfile.profile_image || "",
        gender: userProfile.gender || "",
        date_of_birth: userProfile.date_of_birth
          ? userProfile.date_of_birth.split("T")[0]
          : "",
      });
    }
  }, [userProfile]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setFormData((prevState) => ({
            ...prevState,
            profile_image: result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData).unwrap();
      toast.success("Profile updated successfully!");
      refetch();
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error(
        "Failed to update profile: " +
          (err as { data?: { message?: string } }).data?.message ||
          "Unknown error",
      );
    }
  };

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error("Error loading profile: " + error.toString());
    return (
      <div className="text-red-600 text-center mt-4">Error loading profile</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-semibold text-center text-orange-600 mb-6">
        My Profile
      </h1>

      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500">
          {formData.profile_image ? (
            <img
              src={formData.profile_image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
          />
        </div>

        {[
          { label: "Name", name: "name" },
          { label: "Address", name: "address" },
          { label: "Phone", name: "phone" },
          { label: "Gender", name: "gender" },
          { label: "Date of Birth", name: "date_of_birth", type: "date" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name as keyof UserProfile]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
          />
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-md shadow-md disabled:opacity-50"
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
