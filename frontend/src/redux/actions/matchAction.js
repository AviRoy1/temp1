import { server } from "../store";
import axios from "axios";
import {
  matchSuccess,
  matchFailure,
  matchStart,
} from "../reducers/matchReducer";

export const matchuser = async (dispatch, accessToken) => {
  dispatch(matchStart());
  try {
    const res = await axios.post(
      `${server}/api/match/create`,
      {},
      {
        headers: {
          "Content-Type": "application/JSON",
          token: accessToken,
        },
      }
    );
    dispatch(matchSuccess(res.data));
  } catch (error) {
    dispatch(matchFailure(error.response.data.message));
  }
};
