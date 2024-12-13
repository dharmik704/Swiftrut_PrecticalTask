const Exam = require('../models/exam.model');
const Quiz = require('../models/quiz.model');

module.exports.getquiz = async (req, res) => {
    try {
        const quiz = await Quiz.find().select('title description question_list');
        if(quiz){
            return res.status(200).json({ msg: 'Your Quiz', status: 1, response: 'success', Quiz: quiz });
        }
        else{
            return res.status(400).json({ msg: 'Quiz not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}