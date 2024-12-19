import React from "react";
import { FcGoogle } from "react-icons/fc";
import useInfo from "../../hook/useInfo";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = ({title='in'}) => {
    const {signInWithGoogle,setLoading,loading} = useInfo()
    const navigate = useNavigate()
    const location = useLocation()

    const handleGoogleSignIn = ()=>{
        signInWithGoogle()
        .then(() => {
          setLoading(false)
          navigate(`${location?.state || "/"}`);
        })
        .catch((err) => {
          setLoading(false)
          toast.error(err.message)
        });
    }

  return (
    <div>
      <button disabled={loading} onClick={handleGoogleSignIn} className="flex items-center justify-center w-full p-3 mb-4 border rounded-lg shadow-sm hover:shadow-md hover:text-PrimaryBlue gap-1">
        <FcGoogle />
        <span>Sign {title} with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
