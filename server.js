const express = require('express');
const bodyParser = require('body-parser');
const ideas = require('./ideas');
const workshop = require('./workshop.js');
const app = express();

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

app.post('/ideas', (req, res) => {
    res.status(200).json({
        i_id: 12345,
    });
});

app.get('/ideas', (req, res) => {
    res.status(200).json([
        {
            i_id: 1,
            idea_type: 'teach',
            skill: '畫畫',
            goal: '素描',
            like_number: 12,
            liked: true,
        },
        {
            i_id: 2,
            idea_type: 'learn',
            skill: '攝影',
            goal: '用手機拍出高質感的相片',
            like_number: 9,
            liked: false,
        },
        {
            i_id: 3,
            idea_type: 'learn',
            skill: '',
            goal: '寫出 Facebook',
            like_number: 9,
            liked: false,
        },
    ]);
});

app.put('/ideas/:i_id', (req, res) => {
    res.status(200).send();
});

app.delete('/ideas/:i_id', (req, res) => {
    res.status(200).send();
});

app.post('/ideas/:i_id', (req, res) => {
    if (req.params.i_id === '12345') {
        res.status(200).json({
            i_id: 12345,
            like_number: 11,
            liked: false,
        });
    } else if (req.params.i_id === '12') {
        res.status(200).json({
            i_id: 12,
            like_number: 10,
            liked: true,
        });
    } else {
        res.status(400).send();
    }
});

app.get('/ideas/:i_id', (req, res) => {
    if (req.params.i_id === '12345') {
        res.status(200).json({
            i_id: 12345,
            idea_type: 'teach',
            skill: '畫畫',
            goal: '素描',
            like_number: 12,
            web_url: 'http://web_url/',
            image_url: 'http://image_url/',
            picture_url: 'https://scontent-hkg3-1.xx.fbcdn.net/v/t31.0-8/17917718_1336400693122300_4338329632218462346_o.jpg?oh=924f7d4d21a7d27f0470077355650667&oe=597B11F0',
            name: '賴詰凱',
            liked: true,
            isEditor: false,
            mostAvaiTime: [
                {time: 0, people: 12},
                {time: 4, people: 8},
                {time: 6, people: 4},
                {time: 9, people: 3},
                {time: 20, people: 1},
            ],
        });
    } else if (req.params.i_id === '12') {
        res.status(200).json({
            i_id: 12,
            idea_type: 'teach',
            skill: '寫程式',
            goal: '寫出 Facebook',
            like_number: 9,
            web_url: 'http://web_url/',
            image_url: 'http://image_url/',
            picture_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/14907205_1735976403393352_4070401399338628514_n.jpg?oh=a92d0f7cbf8c444eb53e3b93ba2a18dd&oe=597D50E5',
            name: '林軒毅',
            liked: false,
            isEditor: true,
            mostAvaiTime: [
                {time: 0, people: 17},
                {time: 5, people: 16},
                {time: 10, people: 10},
                {time: 15, people: 5},
                {time: 18, people: 1},
            ],
        });
    } else {
        res.status(400).send();
    }
});

app.get('/workshops', (req, res) => {
    res.status(200).json([
        {
            w_id: 12345,
            image_url: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=253%C3%97180&w=253&h=180',
            title: '生活攝影入門',
            start_datetime: new Date("2017/6/30 10:30:12").toString(),
            min_number: 30,
            max_number: 40,
            deadline: new Date("2017/5/14 10:30:12").toString(),
            pre_deadline: new Date("2017/5/21 10:30:12").toString(),
            introduction: '巴菲特重視的競爭優勢、執行團隊、管理階層、企業文化， 便是談判框架的態度、行為與過程。 如何透過談判維持個人和企業競爭優勢？',
            price: 0,
            phase: 'investigating',
            attendees_number: 25,
        },
        {
            w_id: 12,
            image_url: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=253%C3%97180&w=253&h=180',
            title: '程式設計入門',
            start_datetime: new Date("2017/5/30 10:30:12").toString(),
            min_number: 30,
            max_number: 50,
            deadline: new Date("2017/5/15 10:30:12").toString(),
            pre_deadline: new Date("2017/5/8 10:30:12").toString(),
            introduction: '巴菲特重視的競爭優勢、執行團隊、管理階層、企業文化， 便是談判框架的態度、行為與過程。 如何透過談判維持個人和企業競爭優勢？',
            price: 0,
            phase: 'reached',
            attendees_number: 35,
        },
    ]);
});

app.get('/profile', (req, res) => {
    res.status(200).json({
        availableTime: [false, true, true, false, false, true, false, true, false, true, true, true, false, false, true, false, true, false, true, true, true],
        propose: [
            {
                w_id: 12,
                title: '特務獲利模式：第二關 - 王者談判力',
                start_datetime: 'Sat May 13 2017 20:53:47 GMT+0800 (CST)',
                min_number: 10,
                max_number: 30,
                deadline: 'Sat May 10 2017 20:53:47 GMT+0800 (CST)',
                phase: 'judging',
                attendees_number: 0,
            },
            {
                w_id: 13,
                title: '天地人學堂：商業分析師的實戰工具與技巧培訓班#2',
                start_datetime: 'Sat May 16 2017 20:00:00 GMT+0800 (CST)',
                min_number: 10,
                max_number: 50,
                deadline: 'Sat May 15 2017 20:00:00 GMT+0800 (CST)',
                phase: 'judge_na',
                attendees_number: 12,
            },
            {
                w_id: 14,
                title: '荷蘭 x 台灣 跨界思維新創品牌工作坊 New Brand Workshop',
                start_datetime: 'Sat May 21 2017 09:00:00 GMT+0800 (CST)',
                min_number: 20,
                max_number: 40,
                deadline: 'Sat May 15 2017 20:00:00 GMT+0800 (CST)',
                phase: 'investigating',
                attendees_number: 15,
            },
        ],
        attend: [
            {
                w_id: 15,
                title: 'TYS 5/20 聯合就業徵才媒合活動　正職Ｘ大學實習Ｘ高中職體驗',
                start_datetime: 'Sat May 20 2017 20:53:47 GMT+0800 (CST)',
                phase: 'unreached',
            },
            {
                w_id: 16,
                title: 'TYS 5/20 聯合就業徵才媒合活動　正職Ｘ大學實習Ｘ高中職體驗',
                start_datetime: 'Sat May 20 2017 20:53:47 GMT+0800 (CST)',
                phase: 'reached',
            },
            {
                w_id: 17,
                title: 'TYS 5/20 聯合就業徵才媒合活動　正職Ｘ大學實習Ｘ高中職體驗',
                start_datetime: 'Sat May 20 2017 20:53:47 GMT+0800 (CST)',
                phase: 'over',
            },
        ],
        comeUpWith: [
            {
                i_id: 1,
                idea_type: 'teach',
                skill: '畫畫',
                like_number: '12',
            },
            {
                i_id: 2,
                idea_type: 'learn',
                skill: '寫程式',
                like_number: '9',
            },
        ],
        like: [
            {
                i_id: 3,
                idea_type: 'teach',
                skill: '攝影',
                like_number: '15',
            },
            {
                i_id: 4,
                idea_type: 'learn',
                skill: '跳舞',
                like_number: '3',
            },
        ],
    });
});


app.put('/profile', (req, res) => {
    res.status(200).json(req.body);
});

app.post('/profile', (req, res) => {
    res.status(200).send();
});




//////////
app.delete('/workshops/:w_id', (req, res) => {
    res.status(200).send();
});
app.post('/workshops',(req, res) => {
    res.status(200).json({
        w_id:123456789,
    });
});
app.post('/workshops/:w_id', (req, res) => {
    console.log("atteded req");
    res.status(200).json({
        attended: true,
    });
})
app.put('/workshops/:id',(req, res) => {
    console.log(req);
    res.status(200).json(req.body)
});
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
app.get('/workshops/:w_id',(req,res) => {
    console.log(req.params.w_id);
    if(req.params.w_id === '123456'){
        res.status(200).json(workshop[0]);
    }else{
        res.status(200).json(workshop[1]);
    }
})



const port = 3090;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});
