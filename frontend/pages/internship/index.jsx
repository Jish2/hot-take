import { Container, Heading, Text, Link } from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { TitleBlock, ItemBlock, Spacer } from "../../components/StaticComponent";

export default function Internships() {
	return (
		<>
			<Navbar />
			<div style={{ height: "10vh" }}></div>

			<TitleBlock
				title="Intern at HotTake"
				url="https://www.arts.uci.edu/sites/default/files/Visit-StudentCenter.jpg"
			/>

			<ItemBlock title="">Summarize Intern Opportunities</ItemBlock>
			<ItemBlock title="Software Engineer">Some text.</ItemBlock>
			<ItemBlock title="Marketing Intern">Some text.</ItemBlock>

			<Spacer size={100} />

			<Footer />
		</>
	);
}
