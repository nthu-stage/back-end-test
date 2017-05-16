const express = require('express');
const bodyParser = require('body-parser');
var ideas = require('./ideas');
var workshop = require('./workshop.js');
const app = express();
var availableTime = [false, true, true, false, false, true, false, true, false, true, true, true, false, false, true, false, true, false, true, true, true];

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'userID, signedRequest, X-Requested-With, content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json())

// comeUpWith Idea
app.post('/ideas', (req, res) => {
    req.body.i_id = 3;
    req.body.like_number = 0;
    req.body.picture_url = 'https://scontent-tpe1-1.xx.fbcdn.net/v/t31.0-8/14876496_1735976403393352_4070401399338628514_o.jpg?oh=2243d5a80a7ff3ffc7de81ee04d2e91c&oe=5977FB56';
    req.body.name = '賴詰凱';
    req.body.liked = false;
    req.body.isEditor = true;
    req.body.mostAvaiTime = [
        {time: 0, people: 0},
        {time: 1, people: 0},
        {time: 2, people: 0},
        {time: 3, people: 0},
        {time: 4, people: 0},
    ]
    ideas.push(req.body);
    res.status(200).json({
        i_id: 3,
    });
});

// list Idea
app.get('/ideas', (req, res) => {
    res.status(200).json(ideas);
});


// update idea
app.put('/ideas/:i_id', (req, res) => {
    let i_id = parseInt(req.params.i_id, 10);
    ideas.forEach(e => {
        if (e.i_id === i_id) {
            e.skill = req.body.skill;
            e.goal = req.body.goal;
            e.web_url = req.body.web_url;
            e.image_url = req.body.image_url;
        }
    });
    res.status(200).send();
});

// delete idea
app.delete('/ideas/:i_id', (req, res) => {
    let i_id = parseInt(req.params.i_id, 10);
    next_ideas = [];
    ideas.forEach(e => {
        if (e.i_id !== i_id) {
            next_ideas.push(e);
        }
    });
    ideas = next_ideas;
    res.status(200).send();
});

// like idea
app.post('/ideas/:i_id', (req, res) => {
    let i_id = parseInt(req.params.i_id, 10);
    ideas.forEach(e => {
        if (e.i_id === i_id) {
            e.liked = !e.liked;
            e.like_number = e.liked ? e.like_number + 1 : e.like_number - 1;
            res.status(200).json({
                i_id: e.i_id,
                like_number: e.like_number,
                liked: e.liked,
            });
        }
    });
});

// read idea
app.get('/ideas/:i_id', (req, res) => {
    let i_id = parseInt(req.params.i_id, 10);
    ideas.forEach(e => {
        if (e.i_id === i_id) {
            res.status(200).json(e);
        }
    });
});

app.get('/workshops', (req, res) => {
    res.status(200).json(workshop);
});

app.get('/profile', (req, res) => {
    let propose = [], attend = [], comeUpWith = [], like = [];
    workshop.forEach(e => {
        if (e.name === '賴詰凱') {
            propose.push(e);
        }
        if (e.attended) {
            attend.push(e);
        }
    });
    ideas.forEach(e => {
        if (e.isEditor) {
            comeUpWith.push(e);
        }
        if (e.liked) {
            like.push(e);
        }
    });
    res.status(200).json({
        availableTime,
        propose,
        attend,
        comeUpWith,
        like,
    });
});

// update availableTime
app.put('/profile', (req, res) => {
    res.status(200).json(req.body);
});

// reg or login
app.post('/profile', (req, res) => {
    res.status(200).send();
});

// 刪除工作坊
app.delete('/workshops/:w_id', (req, res) => {
    let w_id = parseInt(req.params.w_id, 10);
    next_workshop = [];
    workshop.forEach(e => {
        if (e.w_id !== w_id) {
            next_workshop.push(e);
        }
    });
    workshop = next_workshop;
    res.status(200).send();
});

// 新增工作坊
app.post('/workshops',(req, res) => {
    req.body.w_id = 3;
    req.body.phase = 'judging';
    req.body.pre_deadline = '2017-5-24';
    req.body.attendees_number = 0;
    req.body.attended = false;
    req.body.name = '賴詰凱';
    workshop.push(req.body);
    res.status(200).json({
        w_id: req.body.w_id,
    });
});

// 參加工作坊
app.post('/workshops/:w_id', (req, res) => {
    let w_id = parseInt(req.params.w_id, 10);
    workshop.forEach(e => {
        if (e.w_id === w_id) {
            e.attended = !e.attended;
            e.attendees_number = e.attended ? e.attendees_number + 1 : e.attendees_number - 1;
            res.status(200).json(e.attended);
        }
    });
})

//update
app.put('/workshops/:id',(req, res) => {
    let w_id = parseInt(req.params.w_id, 10);
    workshop.forEach(e => {
        if (e.w_id === w_id) {
            for (var k in req.body) {
                if (e.hasOwnProperty(k)) {
                   e[k] = req.body[k];
                }
            }
            res.status(200).json(req.body)
        }
    });
});

//
app.get('/dashboard/:w_id', (req, res) => {
    res.status(200).json({
        list:[
            {
                name:"J.K",
                email:"abs@gmail.com",
            },
            {
                name:"JAHFIA",
                email:"listawqy@gmail.com",
            },
            {
                name:"Micky",
                email:"assifbi@gmail.com"
            }
        ]
    })
})

//
app.get('/workshops/:w_id',(req,res) => {
    let w_id = parseInt(req.params.w_id, 10);
    workshop.forEach(e => {
        if (e.w_id === w_id) {
            res.status(200).json(e);
        }
    });
    res.status(200).send();
})



const port = 3090;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});
