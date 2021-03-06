// Workout component
var Workout = (function() {
    var $xhr
    var $workout

    // Class Api.
    function load(user_id) {
        $workout = {
            start: null,
            end: null,
            notes: null,
            feel: null,
            exercises: []
        }
    }

    function create() {
        // Record a linux timestamp.
        $workout.start = Math.round(+new Date() / 1000);
    }

    function get() {
        return $workout;
    }

    function complete() {
        // Record a linux timestamp.
        $workout.end = Math.round(+new Date() / 1000);

        console.log('sending workout request');
        console.log($workout);

        $xhr = new XMLHttpRequest();
        $xhr.addEventListener('load', function(event) {
            //console.log($xhr.status);
        });
        $xhr.onreadystatechange = function() {
            if ($xhr.readyState == XMLHttpRequest.DONE) {
                if (this.status == 201) {
                    console.log("Successful. Response code: "+this.status);
                } else {
                    console.log('Login failed. Response code: '+this.status);
                }
            }
        }
        $xhr.addEventListener('error', function(event) {
            console.log('There was an error with this request.');
        });
        $xhr.open("POST", siteApi + 'workouts/new');

        $xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // Send as a simple request to avoid preflight CORS policy checks
        //$xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        $xhr.send(JSON.stringify($workout));
    }

    function addExercise(exercise) {
        console.log('exercise ' + exercise.name + ' added.')
        delete exercise.name
        $workout.exercises.push(exercise)
    }

    return {
        init: load,
        create: create,
        get: get,
        complete: complete,
        addExercise: addExercise
    };
})();
