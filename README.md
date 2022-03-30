# ⏱ Blip Desk Scheduler

## 🔌Instalação
Você pode instalar o Blip Desk Scheduler seguindo os passos abaixo:
1. Abra seu bot
3. Clique em mais opções (icone de três pontos) no menu superior e selecione Extensões;
4. Procure por Blip Desk Scheduler e o ative;

## 💻Uso
Depois da instalação do plugin é necessário configurá-lo em dois passos:
- 🟦 Configurações no Builder:

Antes de qualquer configuração no **plugin Blip Scheduler**, você precisa alterar a verificação de tempo de atendimendo dentro do seu fluxo para garantir que o bot  irá buscar as informações de atendimento nas configurações que o plugin Blip Scheduler criou.

No bloco anterior ao bloco de atendimento humano deverá conter o seguinte script:
[scheduler.js](https://github.com/dylanoli/blip-desk-scheduler/blob/master/public/scheduler.js)

- 📅 Configurações do Plugin

Para usar o plugin, você precisa clicar em mais opções (icone de três pontos) no menu superior então e Blip Desk Scheduler, então você irá para o painel de agendamento, 
para configurar as horas de trabalho e dias de feriados em seu atendimento. No fim, clique em **"Save"**. 

Quando você clica em "save", o plugin irá criar no seu bot no resources uma variável "workTime" que você pode usar para gerenciar os horários de atendimento, crianto um script dentro do seu bot (temos um script e um bot na sessão Ememplo de Bot que você pode utilizar). 

### variável workTime :
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
**Dica:** Você pode usar a variável "schedulerMessage" para obter uma mensagem mostrando os horários de atendimento em um bloco.

## 🤖Exemplo de Bot
Temos um script para controlar os horários de atendimento, você pode usa-lo em um bloco antes do bloco de atendimento. O script pode ser baixado [aqui](https://github.com/dylanoli/blip-desk-scheduler/blob/master/public/scheduler.js).

 ou você pode simplemente usar nosso bot de exemplo que já configurado para ser a base do seu projeto, para isso você deve importar [esse arquivo](https://drive.google.com/file/d/1iRXAV0LjKnWnwq0BipmFRuu4iikrZ96P/view?usp=sharing) em seu fluxo.

## 🎥Conteúdo extra
[Video tutorial](https://www.linkedin.com/posts/dylan-oliveira-7a9113161_v%C3%ADdeo-de-apresenta%C3%A7%C3%A3oao-blip-desk-scheduler-activity-6895072700218650624-jfCH)
