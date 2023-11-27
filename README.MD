<!--  include demo_video.we -->
## Demo Video
[![Watch the video](video-capture.png)](demo_video.mp4)

## db create file
[CreateDb.Sql](CreateDb.sql)
## Tech used
React & asp.net core

## Api Configuration
[vite.config](reactapp/vite.config.js)

```Js
     proxy: {
            '^/api/quiz': {
                target: 'https://localhost:7122/',
                secure: false
            }
        },
```
change target to the correct port "7122"  might be in use on your machine

## How to run client
```bash
cd reactapp
npm install
npm dev
```