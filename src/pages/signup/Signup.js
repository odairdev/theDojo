import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";

export const Signup = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleFileChange = (e) => {
    setThumbnail(null);

    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError("Please select a file.");
      return;
    }

    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image.");
      return;
    }

    if (selected.size > 200000) {
      setThumbnailError("Image fille size must be less than 200kb.");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(displayName, email, password, thumbnail);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        <span>Username</span>
        <input
          type="text"
          value={displayName}
          required
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>
      <label>
        <span>Profile Thumbnail: </span>
        <input type="file" onChange={handleFileChange} />
        {thumbnailError && <p className="error">{thumbnailError}</p>}
      </label>
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && <button className="btn" disabled>Loading...</button>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};
