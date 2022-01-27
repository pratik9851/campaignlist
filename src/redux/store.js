import { createStore } from "redux";
import CampaignReducer from "./CampaignReducer";

export const store = createStore(CampaignReducer);
