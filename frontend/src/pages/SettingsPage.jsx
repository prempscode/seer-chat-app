import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export default function SettingsPage() {
  const { authUser, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(authUser?.fullName || "");
  const [profilePicBase64, setProfilePicBase64] = useState(null); 
  const [previewUrl, setPreviewUrl] = useState(authUser?.profilePic || "");
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef(null);

  const handlePick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please pick an image file");
      return;
    }
    const base64 = await fileToBase64(file);
    setProfilePicBase64(base64);
    setPreviewUrl(base64); 
    e.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) return toast.error("Name can't be empty");

    setSaving(true);
    try {
      const payload = { fullName: fullName.trim() };
      if (profilePicBase64) payload.profilePic = profilePicBase64;

      await updateProfile(payload);

      setProfilePicBase64(null);
      
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="center-page" style={{ alignItems: "flex-start", paddingTop: 40 }}>
      <div className="settings-card">
        <h1>Profile settings</h1>
        <p className="sub">Update your name and profile picture.</p>

        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="avatar-row">
            <div className="avatar lg">
              {previewUrl ? (
                <img src={previewUrl} alt="preview" />
              ) : (
                fullName?.[0]?.toUpperCase() || "?"
              )}
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handlePick}
              />
              <button
                type="button"
                className="upload-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                Change picture
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="fullName"
              style={{ fontSize: 13, color: "var(--text-dim)", display: "block", marginBottom: 6 }}
            >
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              style={{ fontSize: 13, color: "var(--text-dim)", display: "block", marginBottom: 6 }}
            >
              Email (read-only)
            </label>
            <input id="email" type="email" value={authUser?.email || ""} disabled />
          </div>

          <button className="primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}