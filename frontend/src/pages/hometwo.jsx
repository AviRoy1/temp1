import { Component, Fragment } from "react";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../component/layout/footer";
import HeaderTwo from "../component/layout/headertwo";
import AboutSection from "../component/section/about";
import AboutSectionThree from "../component/section/aboutthree";
import AboutSectionTwo from "../component/section/abouttwo";
import AppSectionTwo from "../component/section/appsectiontwo";
import BannerTwo from "../component/section/bannertwo";
import MemberSectionTwo from "../component/section/membertwo";
import StorySection from "../component/section/story";
import TransportationSection from "../component/section/transportation";
import WorkSectionTwo from "../component/section/worktwo";
import React from "react";

const HomePageTwo = () => {
  return (
    <Fragment>
      <HeaderTwo />
      <BannerTwo />
      <AboutSectionTwo />
      <AboutSectionThree />
      <AboutSection />
      <TransportationSection />
      <WorkSectionTwo />
      <AppSectionTwo />
      <Footer />
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
    </Fragment>
  );
};

export default HomePageTwo;
