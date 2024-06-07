import { errorWrapper } from "../helpers/Wrapper.js";
import Column from "../models/Column.js";

export const chooseColumn = errorWrapper(async (req, res) => {
  const { id: taskId } = req.params;

  const oldColumn = await Column.findById(taskId);

  console.log(oldColumn);

  res.json(oldColumn);
});
