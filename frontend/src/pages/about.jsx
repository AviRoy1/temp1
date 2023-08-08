import { Component, Fragment } from "react";
import Footer from "../component/layout/footer";
import PageHeader from "../component/layout/pageheader";
import AboutSection from "../component/section/about";
import AboutSectionSix from "../component/section/aboutsix";
import StorySection from "../component/section/story";
import WorkSectionTwo from "../component/section/worktwo";
import AppSectionTwo from "../component/section/appsectiontwo";
import HeaderTwo from "../component/layout/headertwo";

class AboutPage extends Component {
  render() {
    return (
      <Fragment>
        <HeaderTwo />
        <PageHeader title={"About Our Ollya"} curPage={"About Us"} />
        <AboutSectionSix />
        <StorySection />
        <AboutSection />
        <WorkSectionTwo />
        <AppSectionTwo />
        <Footer />
      </Fragment>
    );
  }
}

export default AboutPage;
