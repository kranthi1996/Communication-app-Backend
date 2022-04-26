const taskModel = require("../../models").task;
const taskUsersModel = require("../../models").taskUsers;
const errorHandler = require("../../utils/errorHandler");
const responseSender = require("../../utils/responseSender");
const sequelize = require("sequelize");
const emailService = require("../../utils/emaiService");

async function sendEmail(res, email) {
  emailService.sendMail(
    email,
    `Task created`,
    `<h2>Hello, </h2>
    <p>Task has been created, please check it out</p>
    <a href=http://localhost:4200/login> Click here</a>
    </div>`,
    async function (err, response) {
      if (err) {
        // return res.status(401).send(err);
      }
    }
  );
}
async function createTask(req, res) {
  try {
    const { title, priority, date, time, description, taskUsers } = req.body;
    const task = await taskModel.create({
      title: title,
      priority: priority,
      date: date,
      time: time,
      description: description,
      created_by: req.user._id,
    });
    if (task && taskUsers.length >= 1) {
      //taskUsers.forEach(async (user) => {
      Promise.all([
        taskUsers.forEach(async (user) => {
          new Promise((resolve, reject) => {
            taskUsersModel
              .create({
                task_id: task.id,
                email: user,
                status: 1,
              })
              .then((resp) => {
                //send email to use that task as created for u
                sendEmail(res, user);
                resolve(resp);
              })
              .catch((err) => {
                reject(err);
              });
          });
        }),
      ])
        .then((resp) => {
          return responseSender(req, res, resp, 201, "Task created");
        })
        .catch((err) => {
          const errObj = { errObj: err };
          return errorHandler(req, res, errObj, 500);
        });
      //});
    } else if (task) {
      return responseSender(req, res, task, 201, "Task created");
    } else {
      const errObj = { errObj: "Task not created." };
      return errorHandler(req, res, errObj, 401);
    }
  } catch (error) {
    const errObj = { errObj: error };
    return errorHandler(req, res, errObj, 500);
  }
}
async function getTasks(req, res) {
  try {
    const current_user_email = req.user.email;
    let newTasks = [];
    let InprogressTasks = [];
    let doneTasks = [];
    const tasks = await taskModel.findAll({
      where: {},
      include: [
        {
          model: taskUsersModel,
          where: {
            email: current_user_email,
          },
        },
      ],
      order: sequelize.literal("id DESC"),
    });
    if (tasks) {
      tasks.forEach((task) => {
        if (task.taskUsers[0].dataValues.status == 1) {
          newTasks.push(task);
        } else if (task.taskUsers[0].dataValues.status == 2) {
          InprogressTasks.push(task);
        } else if (task.taskUsers[0].dataValues.status == 3) {
          doneTasks.push(task);
        }
      });
      let tasksSt = [
        {
          name: "New Tasks",
          tasks: newTasks,
        },
        {
          name: "Inprogress",
          tasks: InprogressTasks,
        },
        {
          name: "Done",
          tasks: doneTasks,
        },
      ];
      return responseSender(req, res, tasksSt, 200, "Tasks fetched.");
    } else {
      console.log("something wrong");
    }
  } catch (error) {
    const errObj = { errObj: error };
    return errorHandler(req, res, errObj, 500);
  }
}
async function updateTaskUserStatus(req, res) {
  try {
    const { id, status } = req.body;
    const update = await taskUsersModel.update(
      {
        status: status,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (update) {
      return responseSender(req, res, update, 200, "Task user status updated.");
    }
  } catch (error) {
    const errObj = { errObj: error };
    return errorHandler(req, res, errObj, 500);
  }
}
module.exports = { createTask, getTasks, updateTaskUserStatus };
