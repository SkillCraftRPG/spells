import type { App } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAdjust, faArrowRotateLeft, faArrowUp, faBan, faCheck, faHome, faMoon, faSun, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";

library.add(faAdjust, faArrowRotateLeft, faArrowUp, faBan, faCheck, faHome, faMoon, faSquare, faSquareCheck, faSun, faXmark);

export default function (app: App) {
  app.component("font-awesome-icon", FontAwesomeIcon);
}
