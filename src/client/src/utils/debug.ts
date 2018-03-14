import { diff } from "deep-object-diff";

// tslint:disable:no-console
export function printDiff(prevState: any, newState: any, name = "State") {
  if (process.env.NODE_ENV !== "production" && typeof console !== "undefined") {
    const difference = diff(prevState, newState);
    const jsonDiff = JSON.stringify(difference, null, 2);

    console.log(`%c----  ${name} changed  ----`, "color: gray");
    // tslint:disable-next-line:no-console
    console.log("%cprevState:", "color: gray;font-weight:bold", prevState);
    if (jsonDiff.length < 50) {
      console.log(
        "%c%s%c = %c%s",
        "color: #2557A2;font-weight:bold",
        "     diff:",
        "background:inherit;",
        "color: #0C3768;",
        jsonDiff
      );
    } else {
      console.log(
        "%c     diff:",
        "color: #2557A2;font-weight:bold",
        difference
      );
    }

    console.log("%c newState:", "color: #50DA7A;font-weight:bold", newState);
  }
}
// tslint:enable:no-console
