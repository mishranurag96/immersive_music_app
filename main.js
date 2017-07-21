//below codes are for using rather activating loop and shuffle functionality

        var currentSongNumber = 1;
        var willLoop = 0;
        var willShuffle = 0; // will use this soon

       //for looping and changing the loop icon
        $('.fa-repeat').on('click',function() {
            $('.fa-repeat').toggleClass('disabled')
            willLoop = 1 - willLoop;
        });


    //for shuffling rather randomising and changing the shuffle icon
        $('.fa-random').on('click',function() {
            $('.fa-random').toggleClass('disabled')
            willShuffle = 1 - willShuffle;
        });


    //function to jump on the "total duration -5 second "of the song
        function timeJump() {
            var song = document.querySelector('audio')
            song.currentTime = song.duration - 5;
        }

        //function to randomly play the song

       function randomExcluded(min, max, excluded) {

        var n = Math.floor(Math.random() * (max-min) + min);
        if (n >= excluded) n++;
        return n;
    }
     var nextSongNumber = randomExcluded(1,4,currentSongNumber);




//master of all..helps in checking the condition and the applying loop or shuffle

        $('audio').on('ended',function() {
            var audio = document.querySelector('audio');

            if (willShuffle == 1) {

                var nextSongNumber = randomExcluded(1,4,currentSongNumber); // Calling our function from Stackoverflow
                var nextSongObj = songs[nextSongNumber-1];
                audio.src = nextSongObj.fileName;
                toggleSong();
                changeCurrentSongDetails(nextSongObj);
                currentSongNumber = nextSongNumber;
            }

            else if(currentSongNumber < 4) {

                var nextSongObj = songs[currentSongNumber];
                audio.src = nextSongObj.fileName;
                toggleSong();
                changeCurrentSongDetails(nextSongObj);
                currentSongNumber = currentSongNumber + 1;
            }

            else if(willLoop == 1) {

                var nextSongObj = songs[0];
                audio.src = nextSongObj.fileName;
                toggleSong();
                changeCurrentSongDetails(nextSongObj);
                currentSongNumber =  1;
            }

            else {

                $('.play-icon').removeClass('fa-pause').addClass('fa-play');
                audio.currentTime = 0;
            }
        })









// below line is a function which wraps the play pause function 
        function toggleSong() {
        var song = document.querySelector('audio');
            if(song.paused == true) {

             console.log('Playing');
              $('.play-icon').removeClass('fa-play').addClass('fa-pause');
              song.play();
        }

        else {

            console.log('Pausing');
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            song.pause();
             }
        } 



        // for calculating time in hr min and seconds
        function fancyTimeFormat(time)
         {   
            // Hours, minutes and seconds
            var hrs = ~~(time / 3600);
            var mins = ~~((time % 3600) / 60);
            var secs = time % 60;

            // Output like "1:01" or "4:03:59" or "123:03:59"
            var ret = "";

            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }

            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        }




        // for updating and printing duration by calling fancy time format
        function updateCurrentTime() {
            var song = document.querySelector('audio');
            var currentTime = Math.floor(song.currentTime);
            currentTime = fancyTimeFormat(currentTime);
            var duration = Math.floor(song.duration);
            duration = fancyTimeFormat(duration)
            $('.time-elapsed').text(currentTime);
            $('.song-duration').text(duration);
        }


            

   //list of songs along with details in an array

         var songs = [{
                'name': 'Badri Ki Dulhania (Title Track)',
                'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
                'album': 'Badrinath ki Dulhania',
                'duration': '2:56',
               'fileName': 'song1.mp3',
               'image': 'song1.jpg'
            },
            {
                'name': 'Humma Song',
                'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
                'album': 'Ok Jaanu',
                'duration': '3:15',
                'fileName': 'song2.mp3',
               'image': 'song2.jpg'
            },
            {
                'name': 'Nashe Si Chadh Gayi',
                'artist': 'Arijit Singh',
                'album': 'Befikre',
                'duration': '2:34',
                'fileName': 'song3.mp3',
               'image': 'song3.jpg'
            },
            {
                'name': 'The Breakup Song',
                'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
                'album': 'Ae Dil Hai Mushkil',
                'duration': '2:29',
                'fileName': 'song4.mp3',
               'image': 'song4.jpg'
            }]




             // image change with songName
            function changeCurrentSongDetails(songObj) {

                $('.current-song-image').attr('src','img/' + songObj.image)
                $('.current-song-name').text(songObj.name)
                $('.current-song-album').text(songObj.album)
            }

        


            

          // click and keypress events along with function call
          //the first thing which quickly loads as soon as browser runs is under windows.onload
             window.onload = function() {

             for(var i =0; i < songs.length;i++) {
                var obj = songs[i];
                var name = '#song' + (i+1);
                var song = $(name);
                song.find('.song-name').text(obj.name);
                song.find('.song-artist').text(obj.artist);
                song.find('.song-album').text(obj.album);
                song.find('.song-length').text(obj.duration);
                addSongNameClickEvent(obj , i+1)
                
                 
            }
             //initializing the data tables
                $('#songs').DataTable({
                    paging :false
                    
                });
               


            //updating the time on progress bar
                updateCurrentTime(); 
                setInterval(function() {
                updateCurrentTime();
                },1000);
             }
             


              // //for disabling the default function of data tables of going on next page etc.we want all the song in same list
              // $('#songs').DataTable({
              //   paging: false
              //  });

            

             

           
           // here we are playing song and if again clicked we will check if whether the song is same or not if same we will resume it else we will play the new clicked song and this is being done by finding the relative addres of the song beacuse earlier it wasnt working because we were getting absolute path of the song now we are trying to kind of serach the name of the song out of absolute link.if we get the name we get the adres else it returns -1 which says the song not found
            function addSongNameClickEvent(songObj,position) {

            var id = '#song' + position;

            $(id).click(function() {

             var songName = songObj.fileName; // New Variable
            var audio = document.querySelector('audio');
            var currentSong = audio.src;

            if(currentSong.search(songName) != -1)
            {
                toggleSong();
            }


            else 
            {
                audio.src = songName;
                toggleSong();
                changeCurrentSongDetails(songObj); // Function Call
            }
            });
            }


           

           //changing the icon according to play or pause


            $('.play-icon').on('click', function() {
            
              toggleSong();

            });

            $('body').on('keypress',function(event) {
                var target = event.target;
                if (event.keyCode == 32 && target.tagName !='INPUT')
                    {
                        toggleSong();
                    }
            });

            $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 2) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
        }
    });