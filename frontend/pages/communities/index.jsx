import { Link } from "@chakra-ui/react";

import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import {
  TitleBlock,
  ItemBlock,
  Spacer,
} from "../../components/StaticComponent";

export default function About() {
  return (
    <>
      <Navbar />
      <div style={{ height: "60px" }}></div>

      <TitleBlock
        title="Communities"
        url="https://www.arts.uci.edu/sites/default/files/Visit-StudentCenter.jpg"
      />

      <ItemBlock title="HotTake Home">
        Our homepage is an open space for any general HotTakes. If you have a
        HotTake specific to a community, make sure to post it there.
      </ItemBlock>
      <ItemBlock title="University of California, Irvine">
        The home of HotTake's original beta testers.
      </ItemBlock>
      <ItemBlock title="University of Illinois Urbana-Champaign"></ItemBlock>
      <ItemBlock title="Your University Space...">
        HotTake is always looking to expand the communities we offer. However,
        we require a certain amount of demand before officially establishing a
        community. To create a community, reach out to{" "}
        <Link color="teal.500" href="https://www.instagram.com/hottake.gg/">
          @hottake.gg
        </Link>{" "}
        on instagram.
      </ItemBlock>

      <Spacer size={100} />

      <Footer />
    </>
  );
}
