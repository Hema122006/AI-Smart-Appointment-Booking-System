import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/profileService";

function Profile() {

  const userId = Number(localStorage.getItem("userId"));

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const res = await getProfile(userId);

    setUser({
      ...res.data,
      password: "",
    });
  };

  const saveProfile = async () => {

    await updateProfile(userId, user);

    localStorage.setItem("name", user.name);

    alert("Profile Updated Successfully");

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
                           "linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.35)), url('/images/hospital-bg.png')",

                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    overflowX: "auto",
        padding: "40px",
      }}
    >

      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          background: "white",
          padding: "35px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,.15)",
        }}
      >

        <h1 style={{ color: "#1976D2" }}>
          👤 My Profile
        </h1>

        <input
          style={input}
          placeholder="Name"
          value={user.name}
          onChange={(e)=>
            setUser({...user,name:e.target.value})
          }
        />

        <input
          style={input}
          placeholder="Email"
          value={user.email}
          onChange={(e)=>
            setUser({...user,email:e.target.value})
          }
        />

        <input
          style={input}
          placeholder="Mobile Number"
          value={user.mobileNumber}
          onChange={(e)=>
            setUser({...user,mobileNumber:e.target.value})
          }
        />

        <input
          type="password"
          style={input}
          placeholder="New Password (Optional)"
          value={user.password}
          onChange={(e)=>
            setUser({...user,password:e.target.value})
          }
        />

        <button
          onClick={saveProfile}
          style={{
            width:"100%",
            padding:"15px",
            background:"linear-gradient(135deg,#1976D2,#42A5F5)",
            color:"white",
            border:"none",
            borderRadius:"10px",
            cursor:"pointer",
            fontWeight:"bold",
            fontSize:"16px"
          }}
        >
          💾 Save Changes
        </button>

      </div>

    </div>

  );

}

const input = {
  width:"100%",
  padding:"12px",
  marginBottom:"20px",
  borderRadius:"8px",
  border:"1px solid #ccc",
  fontSize:"15px",
  boxSizing:"border-box" as const
};

export default Profile;