import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import registerAnimationData from "../../assets/lottie/Register_lottie.json"
import Lottie from "lottie-react";
import useInfo from "../../hook/useInfo";
import SocialLogin from "../../components/socialLogin/SocialLogin";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()
  const {createUser,updateUser, setUser} = useInfo()
 

  // Handle form submission
  const onSubmit = (data) => {

    const {username,email,password} = data

    createUser(email,password)
    .then(result=>{
        const user = result?.user
        setUser(user);
        toast.success("Registration Succesful !");
        navigate("/");
        updateUser(username)
  })
    .catch(error=>{
        toast.error(error.message)
    })
    
  };

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col-reverse lg:flex-row-reverse items-center justify-center px-4 lg:px-16 py-8 ">
        {/* Left - Form */}
        <div className="lg:w-1/2 w-full">
          <h1 className="font-semibold text-center mb-2 text-PrimaryBlue">Register</h1>
          <h2 className="text-3xl font-bold text-center mb-4">
            Start for free Today
          </h2>
         

          {/* Google Sign-in */}
          <SocialLogin title="up"/>

          <div className="divider">Or Continue With</div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username/Email */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Username *
              </label>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className={`w-full p-3 border rounded-lg ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your name"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            {/*Email */}
            <div>
              <label className="block mb-1 text-sm font-medium">Email *</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`w-full p-3 border rounded-lg ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Password *
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long",
                  },
                })}
                className={`w-full p-3 border rounded-lg ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="********"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 text-white bg-PrimaryBlue rounded-lg "
            >
              Register
            </button>
          </form>
          <p className="text-center mt-6">
            Already have an account?{" "}
            <Link to={"/signIn"} className="text-PrimaryBlue">
              Sign In
            </Link>{" "}
          </p>
        </div>
         {/* Right - Lottie Animation */}
      <div className="lg:w-1/2 w-full mt-8 lg:mt-0 ">
       <Lottie animationData={registerAnimationData}></Lottie>
      </div>
      </div>
    </div>
  );
};

export default Register;
