
## 4. Media App

### Let's go through each requirement:

- Discord accounts are used for authorization ✅
- IPFS is used as the source of truth for storage ✅ (web3.storage)
- Users can add, list, view, and delete media files ✅ (except delete)
  <br/> &rarr; Due to time constrain, I couldn't commit a pleasant delete UI thus I skipped it.
- Images are queried in different sizes and formats to fit different devices. ✅
  <br/> &rarr; Working with centralized storage like s3, I'm used to CDN that allow resize image on the fly so this gave me a hard time at first. The temporary approach was compressed the image file and save it along with the original images. One used for thumbnail, the other used for detail view.
- Videos are streamed to the application.
  <br/> &rarr; Current only used video progressing, I believe HLS.js should be the best practice but I did not have enough time to dive into the documentation. The library hasn't released any official React support so I expected it would take a high learning curve.
- The application has a smooth user experience.
  <br/> &rarr; Love Tailwind but looking up all the complicated CSS properties conversion in its document took forever that some components were rather be written in plain CSS for time saving purpose 🥺

### Improvement

Tbh, there're lots of room for improvement with this open task.
<br/>1. First one is unit test for both FE and BE, I had experienced with this so it shouldn't be a problem.
<br/>2. If time allows, I can setup deployment with EKS to utilize the K8S resources management & auto-scaling, monitoring with Grafana, ...
<br/>3. For features, IPFS is a new playground for me so I want to dive in image optimization & video streaming.

## How to run

```
docker-compose up
```

Client: http://127.0.0.1:5173 <br/>
API Docs: http://127.0.0.1:3000/docs/shinka
<br/><br/>

## 3. ADA Price Tracker

I wouldn't expect that it took quite a while to reseach for some technologies/alternatives for task #4 that it left me with little time for this task. My health hasn't treated me well for this week to stay up too late. However the task seems overall in my capabilities (I'm half-way there), I will submit it ~24h late if that's allowed, once again my applogized for this 😢
