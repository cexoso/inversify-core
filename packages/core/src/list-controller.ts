import { injectable } from "inversify";

@injectable()
export class ListController {
  load() {
    console.log("debugger 🐛 1", 1);
  }
}
