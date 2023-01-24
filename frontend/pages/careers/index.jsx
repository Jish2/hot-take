// import Link from "next/link";
import { Link } from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { TitleBlock, ItemBlock, Spacer } from "../../components/StaticComponent";

export default function Jobs() {
	return (
		<>
			<Navbar />
			<div style={{ height: "60px" }}></div>

			<TitleBlock
				title="Careers"
				url="https://www.arts.uci.edu/sites/default/files/Visit-StudentCenter.jpg"
			/>

			<ItemBlock title="Software Engineers">
				Our developers at HotTake are currently working at polishing our MVP, however we are
				actively looking for more manpower to escalate our development process.
			</ItemBlock>
			<ItemBlock title="">
				We are looking for full stack development skills, with experience with non-relational
				databases, any backend framework as well as any frontend framework. Currently, our platform
				is built with MongoDB, Express and Next. Experience with these Technologies are appreciated,
				but not a requirement!{" "}
				<Link color="teal.500" href="#interest">
					I'm interested!
				</Link>
			</ItemBlock>
			<ItemBlock title="UI/UX Designer">
				Our team is actively looking for someone to fullfil a Designer role. We are looking for
				someone with a passion for design and experience with some design platform such as Figma or
				Adobe XD.{" "}
				<Link color="teal.500" href="#interest">
					I'm interested.
				</Link>
			</ItemBlock>
			<ItemBlock title="Marketing Specialist">
				HotTake is currently looking for more recruits on our Marketing Team. We have many
				positions, ranging from social media marketing (TikTok, YouTube, Instagram) to campus
				outreach. In the social media branch, we are seeking content creators to expand our brand on
				other platforms. If you are passionate about generating growth, then please apply!{" "}
				<Link color="teal.500" href="#interest">
					I'm interested!
				</Link>
			</ItemBlock>

			<ItemBlock title="Internship Opportunities">
				Currently we are recruiting for our Spring and Summer internship program. We are hiring for
				Software and Marketing positions. For more information, visit{" "}
				<Link color="teal.500" href="/internship">
					Internships
				</Link>
				.
			</ItemBlock>

			<div id="interest">
				<ItemBlock title="Interest">
					If you are interested in any of these roles, reach out to{" "}
					<Link color="teal.500" href="https://www.instagram.com/hottake.gg/">
						@hottake.gg
					</Link>{" "}
					on instagram or email a copy of your resume to{" "}
					<Link color="teal.500" href="mailto:careers@hottake.gg">
						careers@hottake.gg
					</Link>
					.
				</ItemBlock>
			</div>

			<Spacer size={100} />

			<Footer />
		</>
	);
}
