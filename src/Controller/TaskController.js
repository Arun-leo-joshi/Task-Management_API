import { Tasks } from "../Model/TaskModel.js";

export const Createtask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title || !status || !priority) {
      return res
        .status(400)
        .json({ message: "Title, status, and priority are required." });
    }

    const newtask = await Tasks.create({
      title,
      description,
      status,
      priority,
      dueDate,
    });
    return res
      .status(201)
      .json({ message: "task created successfully", newtask });
  } catch (err) {
    console.log("error in creating Task", err.message);
    return res.status(500).send("internal server error");
  }
};

export const GetTasks = async (req, res) => {
  try {
    const { status, priority, sort } = req.query;
    const page = 1;

    let query = { deleted: false };

    if (status) {
      query.status = status;
    }
    if (priority) {
      query.priority = priority;
    }

    const tasks = await Tasks.find(query)
      .sort(sort ? { [sort]: 1 } : { createdAt: -1 })
      .limit(10)
      .skip((page - 1) * 10);

    if (tasks.length === 0) {
      return res.status(404).json({ message: "no tasks found" });
    }
    return res
      .status(200)
      .json({ message: "tasks fetched successfully", tasks });
  } catch (err) {
    console.log("error in getting tasks", err.message);
    return res.status(500).send("internal server error");
  }
};

export const GetTaskById = async (req, res) => {
    try{
        const task =await Tasks.findById({_id:req.params.id, deleted:false});
        if(!task){
            return res.status(404).json({message:"task not found"});
        }
        return res.status(200).json({message:"task fetched successfully", task});
    }catch(err){
        console.log("error in getting task by id",err.message);
        return res.status(500).send("internal server error");}
}


export const UpdateTask = async (req, res) => {
    try{
        const UpdatedTask =await Tasks.findOneAndUpdate({_id:req.params.id, deleted:false},
            req.body,
            {new:true}
        );
        if(!UpdatedTask){
            return res.status(404).json({message:"task not found"});
        }
        return res.status(200).json({message:"task updated successfully", UpdatedTask});
    }catch(err){
        console.log("error in updating task",err.message);
        return res.status(500).send("internal server error");
    }
}

export const DeleteTask = async (req, res) => {
    try{
        const DeletedTask =await Tasks.findOneAndUpdate({_id:req.params.id, deleted:false},
            {deleted:true},
            {new:true}
        );
        if(!DeletedTask){
            return res.status(404).json({message:"task not found"});
        }
        return res.status(204)
    }catch(err){
        console.log("error in deleting task",err.message);
        return res.status(500).send("internal server error");
    }
}

