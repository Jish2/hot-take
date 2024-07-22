import { Link } from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import {
  TitleBlock,
  ItemBlock,
  Spacer,
} from "../../components/StaticComponent";

export default function Internships() {
  return (
    <>
      <Navbar />
      <div style={{ height: "60px" }}></div>

      <TitleBlock
        title="Intern at HotTake"
        url="https://www.arts.uci.edu/sites/default/files/Visit-StudentCenter.jpg"
      />
      <ItemBlock title="">Summarize Intern Opportunities</ItemBlock>
      <ItemBlock title="Software Engineer">
        Looking for those passionate about Web Development. Email your resume to{" "}
        <Link color="teal.500" href="mailto:careers@hottake.gg">
          careers@hottake.gg
        </Link>{" "}
        to apply.
      </ItemBlock>
      <ItemBlock title="Marketing Intern">
        Looking for those who can pursue growth at Hottake. Email your resume to{" "}
        <Link color="teal.500" href="mailto:careers@hottake.gg">
          careers@hottake.gg
        </Link>{" "}
        to apply.
      </ItemBlock>
      <Spacer size={100} />
      <Footer />
    </>
  );
}
