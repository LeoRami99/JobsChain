import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
interface LayoutProps {
	children: React.ReactNode;
}
import { Toaster } from "react-hot-toast";

const LayoutCandidate = ({ children }: LayoutProps) => {
	return (
		<div>
			<Toaster />
			<Navbar />
			{/* Navbar */}
			<div>{children}</div>
			{/* Footer */}
			<Footer />
		</div>
	);
};

export default LayoutCandidate;
