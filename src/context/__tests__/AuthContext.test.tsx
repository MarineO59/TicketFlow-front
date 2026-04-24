import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AuthProvider, { useAuth } from "../AuthContext";

// Composant helper pour accéder au contexte dans les tests
function TestConsumer() {
	const { user, isLoading } = useAuth();
	if (isLoading) return <div>Chargement...</div>;
	if (!user) return <div>Non connecté</div>;
	return <div>Connecté : {user.firstname}</div>;
}

describe("AuthContext", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		localStorage.clear();
	});

	it("affiche 'Non connecté' si pas de token en localStorage", async () => {
		render(
			<AuthProvider>
				<TestConsumer />
			</AuthProvider>,
		);

		await waitFor(() => {
			expect(screen.getByText("Non connecté")).toBeInTheDocument();
		});
	});

	it("supprime un token invalide du localStorage", async () => {
		localStorage.setItem("token", "token_invalide");

		render(
			<AuthProvider>
				<TestConsumer />
			</AuthProvider>,
		);

		await waitFor(() => {
			expect(screen.getByText("Non connecté")).toBeInTheDocument();
		});

		expect(localStorage.getItem("token")).toBeNull();
	});

	it("supprime un token expiré du localStorage", async () => {
		// JWT expiré manuellement (exp dans le passé)
		const expiredPayload = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
		const expiredData = btoa(
			JSON.stringify({
				id: 1,
				role: "admin",
				firstname: "Alice",
				lastname: "Martin",
				email: "alice@test.com",
				exp: Math.floor(Date.now() / 1000) - 3600, // expiré il y a 1h
			}),
		);
		const fakeExpiredToken = `${expiredPayload}.${expiredData}.signature`;

		localStorage.setItem("token", fakeExpiredToken);

		render(
			<AuthProvider>
				<TestConsumer />
			</AuthProvider>,
		);

		await waitFor(() => {
			expect(screen.getByText("Non connecté")).toBeInTheDocument();
		});

		expect(localStorage.getItem("token")).toBeNull();
	});

	it("lève une erreur si useAuth est utilisé hors du provider", () => {
		// Supprime les erreurs console pour ce test
		const spy = vi.spyOn(console, "error").mockImplementation(() => {});

		expect(() => render(<TestConsumer />)).toThrow(
			"useAuth must be used within an AuthProvider",
		);

		spy.mockRestore();
	});
});
