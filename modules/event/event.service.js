const eventModel = require("../../models").event;
//const taskUsersModel = require("../../models").taskUsers;
const errorHandler = require("../../utils/errorHandler");
const responseSender = require("../../utils/responseSender");
const sequelize = require("sequelize");
const emailService = require("../../utils/emaiService");

async function sendEmail(res, name, email) {
  emailService.sendMail(
    email,
    `Event ${name} created`,
    `<h2>Hello</h2>
    <p>Event has been created, please check it out</p>
    <a href=http://localhost:4200/login> Click here</a>
    </div>`,
    async function (err, response) {
      if (err) {
        // return res.status(401).send(err);
      }
    }
  );
}
async function createEvent(req, res) {
  console.log(req.file);
  try {
    const {
      name,
      type,
      eventaccess,
      attendees,
      timezone,
      startDate,
      startTime,
      endDate,
      endtime,
      link,
      description,
      address,
      venue,
      attachment,
    } = req.body;
    const event = await eventModel.create({
      name,
      type,
      eventaccess,
      attendees,
      timezone,
      startDate,
      startTime,
      endDate,
      endtime,
      link,
      description,
      address,
      venue,
    });
    if (event) {
      //stroing file to aws
      // const file_path = attachment;
      // await awsService.uploadFile(file_path);

      if (eventaccess === "PRIVATE") {
        // event members will get the email notification
        attendees.forEach(async (email) => {
          await sendEmail(res, name, email);
        });
      }
      return responseSender(req, res, event, 201, "Event created");
    }
  } catch (error) {
    console.log(error);
    const errObj = { errObj: error };
    return errorHandler(req, res, errObj, 500);
  }
}
async function getPublicEvents(req, res) {
  try {
    const events = await eventModel.findAll({
      where: {
        eventaccess: "PUBLIC",
      },
      order: sequelize.literal("id DESC"),
    });
    if (events) {
      return responseSender(req, res, events, 200, "Events fetched.");
    }
  } catch (error) {
    const errObj = { errObj: error };
    return errorHandler(req, res, errObj, 500);
  }
}
async function getPrivateEvents(req, res) {
  try {
    const events = await eventModel.findAll({
      where: {
        eventaccess: "PRIVATE",
      },
      order: sequelize.literal("id DESC"),
    });
    if (events) {
      const _events = events.filter(event=>event.attendees.includes(req.user.email));
      return responseSender(req, res, _events, 200, "Events fetched.");
    }

  } catch (error) {
    const errObj = { errObj: error };
    return errorHandler(req, res, errObj, 500);
  }
}
async function updateEvent(req, res) {
  try {
    const {
      id,
      name,
      type,
      eventaccess,
      attendees,
      timezone,
      startDate,
      startTime,
      endDate,
      endtime,
      link,
      description,
      address,
      venue,
    } = req.body;
    const { email } = req.user.email;
    const event = await eventModel.update(
      {
        name,
        type,
        eventaccess,
        attendees,
        timezone,
        startDate,
        startTime,
        endDate,
        endtime,
        link,
        description,
        address,
        venue,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (event) {
      if (eventaccess === "PRIVATE") {
        // event members will get the email notification
        attendees.forEach(async (email) => {
          await sendEmail(res, name, email);
        });
      }
      return responseSender(req, res, event, 201, "Event updated.");
    } else {
      return errorHandler(req, res, errObj, 500);
    }
  } catch (error) {
    const errObj = { errObj: error };
    return errorHandler(req, res, errObj, 500);
  }
}
async function deleteEvent(req, res) {
  try {
    const eventId = req.params.eventId;
    const event = await eventModel.destroy({
      where: {
        id: eventId,
      },
    });
    if (event) {
      return responseSender(req, res, event, 200, "Event deleted.");
    }
  } catch (error) {
    const errObj = { errObj: error };
    return errorHandler(req, res, errObj, 500);
  }
}
module.exports = {
  createEvent,
  updateEvent,
  getPublicEvents,
  getPrivateEvents,
  deleteEvent,
};
