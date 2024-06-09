import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../Config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { signOut } from "firebase/auth";

const LoginRegister = ({ insidereg }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Sign-up successful! You can now sign in.");
      signOut(auth);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Sign-in successful!");
      localStorage.setItem("currentUserid", auth.currentUser.uid);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Sign-in with Google successful!");
      localStorage.setItem("currentUserid", auth.currentUser.uid);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (insidereg) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="text-white px-10 py-10 rounded-3xl">
      <h1 className="text-5xl font-semibold text-start">Welcome to Docs.</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Please enter your details.
      </p>
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label className="text-lg font-medium">Email</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="text-lg font-medium">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your Password"
            required
          />
        </div>
        {insidereg && (
          <div>
            <label className="text-lg font-medium">Confirm Password</label>
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Re-enter your password"
              required
            />
          </div>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-8 flex flex-col gap-y-4">
          {insidereg ? (
            <button
              type="submit"
              className="bg-red-500 text-lg font-bold py-3 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
            >
              Sign Up
            </button>
          ) : (
            <button
              type="submit"
              className="bg-violet-500 text-lg font-bold py-3 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
            >
              Sign In
            </button>
          )}
          <hr />
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="flex border-2 border-gray-100 items-center justify-center gap-2 text-lg font-bold py-3 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
          >
            <FaGoogle />
            {insidereg ? "Sign Up with Google" : "Sign In with Google"}
          </button>
        </div>
      </form>
      {insidereg ? (
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Already have an account?</p>
          <button className="text-violet-500 text-base font-medium ms-2">
            <Link to={"/"}>Sign In</Link>
          </button>
        </div>
      ) : (
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Don't have an account?</p>
          <button className="text-violet-500 text-base font-medium ms-2">
            <Link to={"/register"}>Sign Up</Link>
          </button>
        </div>
      )}
      <ToastContainer
        position="bottom-left"
        theme="colored"
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
};

export default LoginRegister;
