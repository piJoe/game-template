import { ServerPacketType } from "../../common/types/packets";
import { globalState } from "./globalstate";
import { LoginScreen } from "./screens/login";
import { DOMScreen } from "./screens/screen";
import { socket } from "./websocket";

window.onbeforeunload = function (e) {
  e.preventDefault();
  return "are you sure?";
};

socket.on(ServerPacketType.ME, (me) => {
  globalState.me.id = me.id;
  globalState.me.name = me.name;
});

const login = DOMScreen.spawnScreen(new LoginScreen());
login.setActive();
