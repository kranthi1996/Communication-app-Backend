const  taskModel  = require("../../models").task

const errorHandler = require("../../utils/errorHandler");
const responseSender = require("../../utils/responseSender");

async function createTask(req, res) {
   try {
    const { title, priority, finsihTime, description,  } = req.body;
    const task = await taskModel.create({
        title: title,
        priority: priority,
        date: finsihTime,
        description: description,
        created_by: "kranthi"
      });
      return responseSender(
        req,
        res,
        task,
        201,
        "Task created"
      );
   } catch (error) {
    const errObj = { errObj: error };
    return errorHandler(req, res, errObj, 500);
   }
};
async function getTask(req, res) {
  try {
    
  } catch (error) {
    
  }
}
module.exports = {createTask, getTask};