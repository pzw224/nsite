import Head from "next/head";
import Image from "next/image";
import Footer from "./components/footer";
// import styles from '../styles/Home.module.css'
import HomePage from "./containers/home";
import Header from "./containers/home/components/header";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header mastheadClass="masthead--transparent" />

      <div className="site-content layout-full">
        <div className="page-container">
          <main className="site-main">
            <div className="page-content">
              <HomePage />
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
