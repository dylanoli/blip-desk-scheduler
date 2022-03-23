# ⏱ Blip Desk Scheduler

## 🔌Intalação
Você pode instalar o Blip Desk Scheduler seguindo os passos abaixo:
1. Abra seu bot
3. Click em mais opções (icone de três pontos) no topo do menu e selecione Extensões;
4. Procure por Blip Desk Scheduler e o ative;

## 💻Uso
Depois da instalação do plugin é necessário configurá-lo em dois passos:
- 🟦 Configurações no Builder:

Antes de qualquer configuração no **plugin Blip Scheduler**, você precisa alterar a verificação de tempo de atendimendo dentro do seu fluxo para garantir que o bot  irá buscar as informações de atendimento nas configurações que o plugin Blip Scheduler criou.

No bloco anterior ao bloco de atendimento humano deverá conter o seguinte script:
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
