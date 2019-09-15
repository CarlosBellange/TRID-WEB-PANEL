<!-- If ctrl+save is not build the app autometically then use the following code  -->
sudo sysctl fs.inotify.max_user_watches=32768
<!-- then use -->
ng serve -o

<!-- if at the time of bould there is an error occured like memory problem then use the following code -->
node --max-old-space-size=4096 ./node_modules/@angular/cli/bin/ng build --prod

<!-- import database -->

mongorestore -d triddatabase /home/raja/Documents/dump/triddatabase