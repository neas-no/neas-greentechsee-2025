import { render, screen } from "@testing-library/vue";
import Norgespris from "../src/components/Norgespris.vue";

test("renders props.msg when passed", () => {
  render(Norgespris, { props: { msg: "Spørsmål og svar om Norgespris" } });
  screen.getByText("Spørsmål og svar om Norgespris?"); // passes if text is found
});