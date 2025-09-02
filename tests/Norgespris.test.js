import { render, screen } from "@testing-library/vue";
import Norgespris from "../src/components/Norgespris.vue";

test("renders props.msg when passed", () => {
  render(Norgespris, { props: { msg: "Kommer det tillegg utover 40 øre?" } });
  screen.getByText("Kommer det tillegg utover 40 øre?"); // passes if text is found
});