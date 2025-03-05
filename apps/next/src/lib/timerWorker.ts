   // timerWorker.js
   let intervalId: NodeJS.Timeout | number | undefined;
   let timeLeft = 0;

   onmessage = function (e) {
     const { command, duration } = e.data;

     if (command === 'start') {
       timeLeft = duration;
       intervalId = setInterval(() => {
         timeLeft -= 1;
         postMessage({ timeLeft });

         if (timeLeft <= 0) {
           clearInterval(intervalId);
           postMessage({ command: 'done' });
         }
       }, 1000);
     } else if (command === 'stop') {
       clearInterval(intervalId);
     }
   };