import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatCard from "../StatCard";

describe("StatCard", () => {
	it("affiche le label correctement", () => {
		render(<StatCard label="Tickets ouverts" value={12} color="#00e5ff" />);
		expect(screen.getByText("Tickets ouverts")).toBeInTheDocument();
	});

	it("affiche la valeur correctement", () => {
		render(<StatCard label="Tickets ouverts" value={12} color="#00e5ff" />);
		expect(screen.getByText("12")).toBeInTheDocument();
	});

	it("affiche une valeur à zéro", () => {
		render(<StatCard label="Résolus" value={0} color="#4caf50" />);
		expect(screen.getByText("0")).toBeInTheDocument();
	});

	it("affiche une grande valeur", () => {
		render(<StatCard label="Total" value={9999} color="#ff9800" />);
		expect(screen.getByText("9999")).toBeInTheDocument();
	});
});
