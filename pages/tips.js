import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import HeaderComponent from "../components/headerComponent";
import {Button} from "react-bootstrap";

export default function Tips() {
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
          What do schools look like?
          <br />
          Here&apos;s what you should know
        </h4>

        <p style={{paddingTop: "1em"}}>
          Despite their varied structures, many schools have features that can help you
          identify a building as a school. When looking at an image, keep an eye out for
          these common school patterns.
        </p>

        <h5 className="blueText">Pattern 1: Buildings with U-shape</h5>
        <img src="/tips/u_shape_1.png" width="100%" />
        <img src="/tips/u_shape_2.png" width="100%" />

        <h5 className="blueText">Pattern 2: Buildings with L-shape</h5>
        <img src="/tips/l_shape_1.png" width="100%" />
        <img src="/tips/l_shape_2.png" width="100%" />

        <h5 className="blueText">Pattern 3: Buildings with O-shape</h5>
        <img src="/tips/o_shape_1.png" width="100%" />
        <img src="/tips/o_shape_2.png" width="100%" />

        <h5 className="blueText">Pattern 4: Groups of buildings</h5>
        <img src="/tips/group_buildings_1.png" width="100%" />
        <img src="/tips/group_buildings_2.png" width="100%" />

        <h5 className="blueText">Pattern 5: Buildings with the same cover</h5>
        <img src="/tips/same_cover_1.png" width="100%" />
        <img src="/tips/same_cover_2.png" width="100%" />

        <h5 className="blueText">Pattern 6: Buildings with campus boundaries</h5>
        <img src="/tips/campus_boundaries_1.png" width="100%" />
        <img src="/tips/campus_boundaries_2.png" width="100%" />
        <img src="/tips/campus_boundaries_3.png" width="100%" />

        <h5 className="blueText">
          Pattern 7: Buildings with playgrounds or sport courts
        </h5>
        <img src="/tips/field.png" width="100%" />
        <img src="/tips/playground_1.png" width="100%" />
        <img src="/tips/playground_2.png" width="100%" />
      </div>

      <div className="next-section">
        <Link href="/start-test" passHref>
          <Button variant="primary">
            <span>
              Start Mapping Schools <img className="white" src="/white.svg" />
            </span>
          </Button>
        </Link>
      </div>
    </Layout>
  );
}
