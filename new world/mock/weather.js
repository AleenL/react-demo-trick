import Mock from 'mockjs';


Mock.mock(/\/weather.mock/, {
    'data': {
        "status":"OK",
        "weather":[{
            "city_name": "重庆",
            "city_id": "CHCQ000000",
            "last_update": "2018-03-22T12:10:00+08:00",
            "now": {
                "text": "晴",
                "code": "0",
                "temperature": "21",
                "feels_like": "21",
                "wind_direction": "东",
                "wind_speed": "9.36",
                "wind_scale": "2",
                "humidity": "55",
                "visibility": "6.50",
                "pressure": "987",
                "pressure_rising": "未知",
                "air_quality": {
                    "city": {
                        "aqi": "62",
                        "pm25": "30",
                        "pm10": "74",
                        "so2": "16",
                        "no2": "58",
                        "co": "1.047",
                        "o3": "31",
                        "last_update": "2018-03-22T11:00:00+08:00",
                        "quality": "良"
                    }, "stations": null
                },
                "alarms": []
            },
            "today": {
                "sunrise": "06:58 AM",
                "sunset": "07:06 PM",
                "suggestion": {
                    "dressing": {"brief": "舒适", "details": "建议着长袖T恤、衬衫加单裤等服装。年老体弱者宜着针织长袖衬衫、马甲和长裤。"},
                    "uv": {"brief": "中等", "details": "属中等强度紫外线辐射天气，外出时建议涂擦SPF高于15、PA+的防晒护肤品，戴帽子、太阳镜。"},
                    "car_washing": {"brief": "较适宜", "details": "较适宜洗车，未来一天无雨，风力较小，擦洗一新的汽车至少能保持一天。"},
                    "travel": {"brief": "适宜", "details": "天气较好，温度适宜，是个好天气哦。这样的天气适宜旅游，您可以尽情地享受大自然的风光。"},
                    "flu": {"brief": "较易发", "details": "昼夜温差较大，较易发生感冒，请适当增减衣服。体质较弱的朋友请注意防护。"},
                    "sport": {"brief": "较适宜", "details": "天气较好，无雨水困扰，较适宜进行各种运动，但因气温较低，在户外运动请注意增减衣物。"}
                }
            },
            "future": [{
                "date": "2018-03-22",
                "high": "24",
                "low": "12",
                "day": "周四",
                "text": "晴/多云",
                "code1": "0",
                "code2": "4",
                "cop": "",
                "wind": "风力2级"
            }, {
                "date": "2018-03-23",
                "high": "21",
                "low": "13",
                "day": "周五",
                "text": "阵雨/小雨",
                "code1": "10",
                "code2": "13",
                "cop": "",
                "wind": "风力2级"
            }, {
                "date": "2018-03-24",
                "high": "19",
                "low": "15",
                "day": "周六",
                "text": "小雨/多云",
                "code1": "13",
                "code2": "4",
                "cop": "",
                "wind": "风力2级"
            }, {
                "date": "2018-03-25",
                "high": "21",
                "low": "14",
                "day": "周日",
                "text": "阴/阴",
                "code1": "9",
                "code2": "9",
                "cop": "",
                "wind": "风力2级"
            }, {
                "date": "2018-03-26",
                "high": "23",
                "low": "15",
                "day": "周一",
                "text": "多云/阴",
                "code1": "4",
                "code2": "9",
                "cop": "",
                "wind": "风力2级"
            }, {
                "date": "2018-03-27",
                "high": "19",
                "low": "16",
                "day": "周二",
                "text": "小雨/小雨",
                "code1": "13",
                "code2": "13",
                "cop": "",
                "wind": "风力2级"
            }, {
                "date": "2018-03-28",
                "high": "22",
                "low": "15",
                "day": "周三",
                "text": "阴/阴",
                "code1": "9",
                "code2": "9",
                "cop": "",
                "wind": "风力2级"
            }, {
                "date": "2018-03-29",
                "high": "27",
                "low": "16",
                "day": "周四",
                "text": "多云/小雨",
                "code1": "4",
                "code2": "13",
                "cop": "",
                "wind": "风力2级"
            }, {
                "date": "2018-03-30",
                "high": "22",
                "low": "17",
                "day": "周五",
                "text": "小雨/小雨",
                "code1": "13",
                "code2": "13",
                "cop": "",
                "wind": "风力2级"
            }, {
                "date": "2018-03-31",
                "high": "20",
                "low": "13",
                "day": "周六",
                "text": "小雨/阴",
                "code1": "13",
                "code2": "9",
                "cop": "",
                "wind": "风力2级"
            }]
        }]
    },
    'message': '操作成功',
    'systemDate': new Date().getTime(),
    'code':0
});

