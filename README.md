# ⏱ Blip Desk Scheduler

## 🔌Manual Installation
You can install Blip Desk Scheduler following the steps below:
1. Open your bot;
2. Click more options (three points icon) on the top menu and select Extensions;
3. Search for Blip Desk Scheduler;
4. Activate it;

## 💻Usage
After installing the plugin you'll need to configure it in two steps:
- 🟦 Builder configuration:

Before any configuration in **Blip Scheduler plugin**, you'll have to change the attendance time check inside your flow to assure that your flow will be fetching attendance information from the configurations that Blip Scheduler plugin will create.

Before your attendance box you'll use the following script:
[scheduler.js](https://github.com/dylanoli/blip-desk-scheduler/blob/master/public/scheduler.js)

- 📅 Plugin Configuration

To use the plugin, you need to click more options (three points icon) on the top menu and select Blip Desk Scheduler, so you will go to the scheduler panel, 
to configure the times work and days off in your attendiment. In the end, click **"Save"**. 

When you click "save", the plugin will generate in the bot resources a "workTime" variable that you can use to handle the attendiment work time, creating a script inside your bot (we have a script bellow and an bot Bot Exemple secsion that you can use). 

### workTime variable:
```
{
    "weekdays": [
        {
            "day": "day name",
            "workTimes": [
                {
                    "start": "hh:mm",
                    "end": "hh:mm"
                },
                ...
            ]
        },
        ...
    ],
    "noWorkDays": [
        "dd-MM",
        ...
    ],
    "schedulerMessage": "scheduler message"
}
```
**TIPS:** You can use the "schedulerMessage" variable to get a message to show in a block.

## 🤖Bot Exemple
We have a exemple bot that you can use with base project. he already has the scripts to handle with workTime variable to management of attending work times.

To use him, you just need import [this file](https://drive.google.com/file/d/1iRXAV0LjKnWnwq0BipmFRuu4iikrZ96P/view?usp=sharing) in your flow.

You can create your own bot and use this [script](https://github.com/dylanoli/blip-desk-scheduler/blob/master/public/scheduler.js).

## 🎥Extra content
[Tutorial video](https://www.linkedin.com/posts/dylan-oliveira-7a9113161_v%C3%ADdeo-de-apresenta%C3%A7%C3%A3oao-blip-desk-scheduler-activity-6895072700218650624-jfCH)
