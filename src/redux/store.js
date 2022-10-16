import { configureStore } from "@reduxjs/toolkit";
import InfoSlice from "./InfoSlice";

export default configureStore({
  reducer: {
    info: InfoSlice
}
});
