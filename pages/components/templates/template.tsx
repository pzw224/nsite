import Header from "../../containers/home/components/header";
import Footer from "../footer";

const Template = (props: any) => {
  const { children } = props;
  return (
    <div>
      <Header />
      <div className="site-content layout-full">
        <div className="page-container">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Template;
