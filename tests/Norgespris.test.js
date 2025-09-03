import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import Norgespris from "../src/components/Norgespris.vue";

describe("Norgespris.vue", () => {
  it("renders FAQ header", () => {
    render(Norgespris, { data() { return { isLoading: false, showErrorMessage: false }; } });
    expect(screen.getByText("Spørsmål og svar om Norgespris")).to.exist;
  });

  it("renders main title", () => {
    render(Norgespris, { data() { return { isLoading: false, showErrorMessage: false, appview: false, desktopview: false }; } });
    expect(screen.getByText("Norgespris")).to.exist;
  });

  it("shows loader message when isLoading is true and loaderMessage is set", () => {
    render(Norgespris, { data() { return { isLoading: true, showErrorMessage: false, loaderMessage: "Laster inn", appview: false }; } });
    expect(screen.getByText(/Laster inn/i)).to.exist;
  });

  it("shows error message when showErrorMessage is true", () => {
    render(Norgespris, { data() { return { isLoading: false, showErrorMessage: true, loaderMessage: "Feil oppstod" }; } });
    expect(screen.getByText("Feil oppstod")).to.exist;
  });

  it("shows feedback form when not loading and not hidden", () => {
    render(Norgespris, { data() { return { isLoading: false, hideFeedback: false, feedbackScoreSubmitted: false, showErrorMessage: false }; } });
    expect(screen.getByText(/Hvordan er du fornøyd med dine tjenester fra Neas/i)).to.exist;
  });
});