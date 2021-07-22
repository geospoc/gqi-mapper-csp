import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import HeaderComponent from "../../components/headerComponent";
import {Button} from "react-bootstrap";

export default function Schools() {
  return (
    <Layout myClass="intro">
      <Head>
        <title>Project Connect</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin&display=swap"
          rel="stylesheet"
        />
      </Head>

      <HeaderComponent inverse={false} />

      <div className="tips">
        <h4>
          What do hospitals look like?
          <br />
          Here&apos;s what you should know
        </h4>

        <p style={{paddingTop: "1em"}}>
          Despite their varied structures, many hospitals have features that can help you
          identify a building as a hospitals. When looking at an image, keep an eye out
          for these common hospitals patterns.
        </p>

        <h5 className="blueText">Pattern 1: Close to National Highway</h5>
        <img src="/tips/close_to_NH.png" width="100%" />
        <img src="/tips/close_to_NH_and_huge_parking_area.png" width="100%" />

        <h5 className="blueText">Pattern 2: Huge parking area</h5>
        <img src="/tips/huge_parking_area.png" width="100%" />
        <img src="/tips/close_to_NH_and_huge_parking_area.png" width="100%" />

        <h5 className="blueText">Pattern 3: Close to cross road junction</h5>
        <img src="/tips/close_to_cross_road_junction_1.png" width="100%" />
        <img src="/tips/close_to_cross_road_junction_2.png" width="100%" />
        <img src="/tips/close_to_cross_road_junction_3.png" width="100%" />
      </div>

      <div className="next-section">
        <Link href="/start-test/hospitals" passHref>
          <Button variant="primary">
            <span>
              Start Mapping hospitals <img className="white" src="/white.svg" />
            </span>
          </Button>
        </Link>
      </div>
    </Layout>
  );
}
