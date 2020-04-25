// const mongoose = require('mongoose');

const taskController = function (Task) {
  const getTasks = (req, res) => {
    Task.find(
      {
        wbsId: { $in: [req.params.wbsId] },
      },
    )
      .then(results => res.status(200).send(results))
      .catch(error => res.status(404).send(error));
  };


  const postTask = function (req, res) {
    if (req.body.requestor.role !== 'Administrator') {
      res.status(403).send({ error: 'You are not authorized to create new projects.' });
      return;
    }

    if (!req.body.taskName || !req.body.isActive
    ) {
      res.status(400).send({ error: 'Task Name, Active status, Task Number are mandatory fields' });
      return;
    }


    const _task = new Task();
    _task.wbsId = req.params.wbsId;
    _task.taskName = req.body.taskName;
    _task.num = req.body.num;
    _task.task = req.body.task;
    _task.level = req.body.level;
    _task.priority = req.body.priority;
    _task.resources = req.body.resources;
    _task.isAssigned = req.body.isAssigned;
    _task.status = req.body.status;
    _task.hoursBest = req.body.hoursBest;
    _task.hoursWorst = req.body.hoursWorst;
    _task.hoursMost = req.body.hoursMost;
    _task.estimatedHours = req.body.estimatedHours;
    _task.startedDatetime = req.body.startedDatetime;
    _task.dueDatetime = req.body.dueDatetime;
    _task.links = req.body.links;
    _task.projectId = req.body.projectId;
    _task.parentId = req.body.parentId;
    _task.isActive = req.body.isActive;
    _task.createdDatetime = Date.now();
    _task.modifiedDatetime = Date.now();

    _task.save()
      .then(results => res.status(201).send(results))
      .catch(error => res.status(500).send({ error }));
  };


  const updateNum = function (req, res) {
    if (req.body.requestor.role !== 'Administrator') {
      res.status(403).send({ error: 'You are not authorized to create new projects.' });
      return;
    }


    if (!req.body.nums) {
      res.status(400).send({ error: 'Nums is a mandatory fields' });
      return;
    }

    const listOfNums = req.body.nums;
    listOfNums.forEach((elm) => {
      Task.findById(elm.id, (error, task) => {
        task.num = elm.num;
        task.save()
          .then().catch(errors => res.status(400).send(errors));
      });
    });
    res.status(200).send(true);
  };

  const swap = function (req, res) {
    if (req.body.requestor.role !== 'Administrator') {
      res.status(403).send({ error: 'You are not authorized to create new projects.' });
      return;
    }

    if (!req.body.taskId1 || !req.body.taskId2
    ) {
      res.status(400).send({ error: 'taskId1 and taskId2 are mandatory fields' });
      return;
    }


    Task.findById(req.body.taskId1, (error1, task1) => {
      if (error1 || task1 === null) {
        res.status(400).send('No valid records found');
        return;
      }

      Task.findById(req.body.taskId2, (error2, task2) => {
        if (error2 || task2 === null) {
          res.status(400).send('No valid records found');
          return;
        }


        if (task1.parentId.toString() === task2.parentId.toString()) {
          let tmpNum = '';
          tmpNum = task1.num;
          task1.num = task2.num;
          task2.num = tmpNum;
        } else {
          let tmpName = '';
          tmpName = task1.taskName;
          task1.taskName = task2.taskName;
          task2.taskName = tmpName;
        }

        task1.save()
          .then().catch(errors => res.status(400).send(errors));

        task2.save()
          .then().catch(errors => res.status(400).send(errors));


        Task.find(
          {
            wbsId: { $in: [task1.wbsId] },
          },
        )
          .then(results => res.status(200).send(results))
          .catch(error => res.status(404).send(error));
      });
    });
  };


  return {
    postTask,
    getTasks,
    swap,
    updateNum,
  };
};


module.exports = taskController;