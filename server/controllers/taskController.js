import User from "../models/userModel.js";


export const addTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const user = await User.findById(req.user._id);

        user.tasks.push({
            title,
            description,
            completed: false,
            createdAt: new Date(Date.now())
        })
        await user.save();
        const usertask = user.tasks

        res.status(201).json({
            message: "Task added Successfully",
            usertask
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        })

    }
}


export const removeTask = async (req, res) => {
    try {

        const { taskid } = req.params;

        const user = await User.findById(req.user._id);

        user.tasks = user.tasks.filter(task => task._id.toString() !== taskid.toString());

        await user.save();


        res.status(200).json({
            message: "Task removed successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })

    }
}


export const updateTask = async (req, res) => {
    try {
        const { taskid } = req.params;

        const user = await User.findById(req.user._id);

        const taskIndex = user.tasks.findIndex((task) => task._id.toString() === taskid.toString());

        user.tasks[taskIndex].completed = !user.tasks[taskIndex].completed;

        await user.save();


        res.status(200).json({
            message: "Task updated successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })

    }
}


